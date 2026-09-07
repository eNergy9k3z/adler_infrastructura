const MAX_CONTACTS = 20000;
const statusLabels = {
  pendiente: "Pendiente",
  seguimiento: "En seguimiento",
  resuelta: "Resuelta",
};

export async function collectContacts(
  client,
  { query = "", status = "", signal, onProgress = () => {} } = {},
) {
  const rows = [];
  const ids = new Set();
  let until = null;
  let before = null;
  let expected = null;
  do {
    signal?.throwIfAborted();
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(abort, 20000);
    let response;
    try {
      response = await client
        .rpc("adler_export_contacts", {
          p_query: query,
          p_status: status,
          p_until: until,
          p_before: before,
        })
        .abortSignal(controller.signal);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
    }
    signal?.throwIfAborted();
    const { data, error } = response;
    if (error) throw error;
    if (
      !data ||
      !Array.isArray(data.items) ||
      !Number.isSafeInteger(data.total) ||
      data.total < 0 ||
      typeof data.until !== "string" ||
      !/^-?\d+$/.test(data.until) ||
      data.items.length > 500
    )
      throw new Error("invalid_export");
    if (data.total > MAX_CONTACTS) throw new Error("too_many_contacts");
    if (expected === null) {
      expected = data.total;
      until = data.until;
    }
    if (data.until !== until || data.total !== expected)
      throw new Error("contacts_changed");
    let previousId = before;
    for (const row of data.items) {
      if (
        typeof row.id !== "string" ||
        !/^-?\d+$/.test(row.id) ||
        ids.has(row.id) ||
        BigInt(row.id) > BigInt(until) ||
        (previousId !== null && BigInt(row.id) >= BigInt(previousId))
      )
        throw new Error("invalid_export");
      ids.add(row.id);
      rows.push(row);
      previousId = row.id;
    }
    if (rows.length > expected) throw new Error("contacts_changed");
    onProgress(rows.length, expected);
    if (
      data.next_before !== null &&
      (!data.items.length || data.next_before !== previousId)
    )
      throw new Error("invalid_export");
    before = data.next_before;
  } while (before !== null);
  if (rows.length !== expected) throw new Error("contacts_changed");
  return rows;
}

// XLSX string cells preserve telephone prefixes, accents and literal formula-like text.
// Do not infer first/last names for records submitted before the separate fields existed.
export function contactWorkbookRows(contacts) {
  const cell = (value) => ({ type: String, value: String(value ?? "") });
  const headers = [
    "ID de consulta",
    "Fecha (UTC)",
    "Nombre",
    "Apellidos",
    "Nombre completo recibido",
    "Correo electrónico",
    "Empresa",
    "Teléfono",
    "Estado",
    "Consulta",
  ];
  return [
    headers.map((value) => ({
      ...cell(value),
      fontWeight: "bold",
      textColor: "#FFFFFF",
      backgroundColor: "#4B246B",
    })),
    ...contacts.map((item) =>
      [
        item.id,
        item.created_at,
        item.first_name,
        item.last_name,
        item.name,
        item.email,
        item.company,
        item.phone,
        statusLabels[item.status] || item.status,
        item.message,
      ].map(cell),
    ),
  ];
}

export async function createContactWorkbook(contacts, { logoContent } = {}) {
  const { default: writeExcelFile } = await import("write-excel-file/browser");
  if (!logoContent) {
    const response = await fetch("/brand/adler-logo-morado.png", {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("export_logo_unavailable");
    logoContent = await response.blob();
  }
  // Reserve space above the table: the embedded image must never cover contact data.
  const rows = [
    [{ type: String, value: "", height: 44 }],
    [{ type: String, value: "", height: 44 }],
    [
      {
        type: String,
        value: "Contactos de Adler",
        fontWeight: "bold",
        height: 26,
      },
    ],
    ...contactWorkbookRows(contacts),
  ];
  return writeExcelFile(rows, {
    sheet: "Contactos Adler",
    columns: [20, 28, 24, 28, 38, 36, 32, 24, 22, 80].map((width) => ({
      width,
    })),
    stickyRowsCount: 4,
    images: [
      {
        content: logoContent,
        contentType: "image/png",
        width: 240,
        height: 96,
        dpi: 96,
        anchor: { row: 1, column: 1 },
        offsetX: 8,
        offsetY: 10,
        title: "Adler Infrastructura",
        description: "Logo de Adler Infrastructura",
      },
    ],
  }).toBlob();
}

export function downloadContactWorkbook(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Adler-contactos-${new Date().toISOString().replace(/[:.]/g, "-")}.xlsx`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
