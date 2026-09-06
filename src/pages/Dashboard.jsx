import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Inbox,
  LogOut,
  Search,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  Mail,
  Download,
  MessagesSquare,
  ExternalLink,
  ShieldCheck,
  UserRound,
  ChevronRight,
  Building2,
  KeyRound,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import {
  collectContacts,
  createContactWorkbook,
  downloadContactWorkbook,
} from "../data/contactExport";
import { useUnsavedForm } from "../portal/useUnsavedForm";
import "./Dashboard.css";
const labels = {
  pendiente: "Pendiente",
  seguimiento: "En seguimiento",
  resuelta: "Resuelta",
};
const date = (value) =>
  value
    ? new Intl.DateTimeFormat("es", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "Fecha no registrada";
export default function Dashboard() {
  const { state } = useAuth();
  if (state === "loading")
    return (
      <section className="private-page">
        <div className="container" role="status">
          Comprobando acceso…
        </div>
      </section>
    );
  if (state !== "authorized") return <Navigate to="/login" replace />;
  return <ConsultationInbox />;
}
function ConsultationInbox() {
  const { session, signOut, refreshAccess } = useAuth();
  const [result, setResult] = useState({ items: [], total: 0 });
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [revision, setRevision] = useState(0);
  const [loadState, setLoadState] = useState({ key: "", error: false });
  const requestKey = JSON.stringify([query, filter, page, revision]);
  const loading = loadState.key !== requestKey;
  const error = !loading && loadState.error;
  const [selected, setSelected] = useState(null);
  const dirty = useRef(false);
  const saving = useRef(false);
  const selectedTrigger = useRef(null);
  const exportRequest = useRef(null);
  const [exportState, setExportState] = useState({
    busy: false,
    message: "",
    error: false,
  });
  useEffect(() => () => exportRequest.current?.abort(), []);
  async function exportContacts() {
    if (exportRequest.current) return;
    const controller = new AbortController();
    exportRequest.current = controller;
    setExportState({
      busy: true,
      message: "Preparando contactos…",
      error: false,
    });
    try {
      const rows = await collectContacts(supabase, {
        query,
        status: filter,
        signal: controller.signal,
        onProgress: (count, total) =>
          setExportState({
            busy: true,
            message: `Preparando ${count} de ${total} consultas…`,
            error: false,
          }),
      });
      if (!rows.length) {
        setExportState({
          busy: false,
          message: "No hay contactos para descargar con estos filtros.",
          error: false,
        });
        return;
      }
      const blob = await createContactWorkbook(rows);
      controller.signal.throwIfAborted();
      const accessTimer = setTimeout(() => controller.abort(), 20000);
      let access;
      try {
        access = await supabase
          .from("adler_admins")
          .select("user_id")
          .eq("user_id", session.user.id)
          .maybeSingle()
          .abortSignal(controller.signal);
      } finally {
        clearTimeout(accessTimer);
      }
      controller.signal.throwIfAborted();
      if (access.error || !access.data) throw new Error("access_changed");
      downloadContactWorkbook(blob);
      setExportState({
        busy: false,
        message: `Archivo preparado con ${rows.length} ${rows.length === 1 ? "consulta" : "consultas"}. Revisa las descargas de tu navegador.`,
        error: false,
      });
    } catch (failure) {
      if (controller.signal.aborted) {
        setExportState({
          busy: false,
          message:
            "Descarga cancelada o tiempo de espera agotado. Puedes volver a intentarlo.",
          error: false,
        });
        return;
      }
      const message =
        failure.message === "too_many_contacts"
          ? "La lista supera las 20.000 consultas por archivo. Usa la búsqueda o el estado para reducirla."
          : failure.message === "contacts_changed"
            ? "La lista cambió durante la preparación. Vuelve a descargarla."
            : "No se pudo preparar el archivo completo. Comprueba tu conexión y tu acceso e inténtalo de nuevo.";
      setExportState({ busy: false, message, error: true });
    } finally {
      exportRequest.current = null;
    }
  }
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    supabase
      .rpc("adler_search_contacts", {
        p_query: query,
        p_status: filter,
        p_page: page,
      })
      .abortSignal(controller.signal)
      .then(({ data, error: failure }) => {
        if (!active) return;
        if (failure) throw failure;
        const lastPage = Math.max(0, Math.ceil(data.total / 50) - 1);
        if (page > lastPage) {
          setPage(lastPage);
          return;
        }
        setResult(data);
        setLoadState({ key: requestKey, error: false });
      })
      .catch(() => {
        if (!active) return;
        setResult({ items: [], total: 0 });
        setSelected(null);
        dirty.current = false;
        setLoadState({ key: requestKey, error: true });
      })
      .finally(() => {
        clearTimeout(timeout);
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, filter, page, revision, requestKey]);
  function leaveDetail() {
    if (saving.current) return false;
    if (
      dirty.current &&
      !window.confirm("Tienes notas sin guardar. ¿Quieres descartarlas?")
    )
      return false;
    dirty.current = false;
    setSelected(null);
    return true;
  }
  function saved(item) {
    dirty.current = false;
    saving.current = false;
    setSelected(filter && filter !== item.status ? null : item);
    setRevision((value) => value + 1);
    setResult((previous) => ({
      ...previous,
      items: previous.items.map((row) => (row.id === item.id ? item : row)),
    }));
  }
  const pages = Math.max(1, Math.ceil(result.total / 50));
  function openContact(item) {
    if (selected?.id === item.id || !leaveDetail()) return;
    selectedTrigger.current = item.id;
    setSelected(item);
  }
  function closeDetail() {
    if (leaveDetail()) requestAnimationFrame(() => {
      const trigger = document.getElementById(`inbox-contact-${selectedTrigger.current}`) || document.getElementById("inbox-search");
      trigger?.focus({ preventScroll: true });
    });
  }
  function changeFilter(value) {
    if (!exportState.busy && leaveDetail()) { setFilter(value); setPage(0); }
  }
  return (
    <section className="inbox-page">
      <aside className="inbox-sidebar" aria-label="Administración de Adler">
        <Link className="inbox-brand" to="/">ADLER<span>INFRASTRUCTURA</span></Link>
        <span className="inbox-nav-caption">ESPACIO DE TRABAJO</span>
        <nav aria-label="Navegación de administración">
          <Link to="/dashboard" aria-current="page"><Inbox size={19} />Consultas de la web</Link>
          <Link to="/dashboard/clientes"><MessagesSquare size={19} />Atención a clientes</Link>
        </nav>
        <div className="inbox-sidebar-bottom">
          <Link to="/cuenta/contrasena"><KeyRound size={17} />Cambiar contraseña</Link>
          <Link to="/"><ExternalLink size={17} />Ver página web</Link>
          <button onClick={() => { if (leaveDetail()) signOut(); }}><LogOut size={17} />Cerrar sesión</button>
          <div className="inbox-admin-caption"><ShieldCheck size={15} />Acceso de administración</div>
        </div>
      </aside>
      <div className="inbox-main">
        <div className="inbox-topbar">
          <span>Administración <ChevronRight size={14} /> Consultas de la web</span>
          <span className="inbox-account"><UserRound size={17} /><span>{session.user.email}</span></span>
        </div>
        <div className="inbox-content">
          <header className="inbox-header">
            <div><h1>Bandeja de entrada</h1><p>Consultas recibidas desde el formulario de Adler.</p></div>
            <div className="inbox-header-actions">
              <button className="inbox-secondary-button" disabled={loading} onClick={() => { if (leaveDetail()) setRevision((value) => value + 1); }}>
                <RefreshCw size={17} className={loading ? "sending-spinner" : ""} />Actualizar
              </button>
              <button className="inbox-primary-button" disabled={exportState.busy || loading || error || !result.total} onClick={exportContacts} aria-describedby="inbox-export-hint">
                <Download size={17} />{exportState.busy ? "Preparando…" : "Descargar Excel"}
              </button>
            </div>
          </header>
          <div className="inbox-tools">
            <nav className="inbox-status-filters" aria-label="Filtrar consultas por estado">
              {[["", "Todas"], ...Object.entries(labels)].map(([value, label]) => <button key={value} aria-pressed={filter === value} disabled={exportState.busy} onClick={() => changeFilter(value)}>{label}</button>)}
            </nav>
            <form className="inbox-search" onSubmit={(event) => {
              event.preventDefault();
              if (leaveDetail()) { setQuery(search.trim()); setPage(0); setRevision((value) => value + 1); }
            }}>
              <label className="sr-only" htmlFor="inbox-search">Buscar consultas</label>
              <input id="inbox-search" type="search" disabled={exportState.busy} maxLength={200} placeholder="Buscar contacto, empresa o consulta" value={search} onChange={(event) => setSearch(event.target.value)} />
              <button type="submit" aria-label="Buscar" disabled={exportState.busy}><Search size={19} /></button>
            </form>
          </div>
          <div className="inbox-result-bar">
            <p role="status">{loading ? "Cargando consultas…" : error ? "Bandeja no disponible" : `${result.total} ${result.total === 1 ? "consulta" : "consultas"}${query ? ` para «${query}»` : ""}`}</p>
            <p id="inbox-export-hint">Excel incluye todos los resultados filtrados.</p>
          </div>
          {exportState.message && <div className={`inbox-export-feedback ${exportState.error ? "is-error" : ""}`} role={exportState.error ? "alert" : "status"}>
            <span>{exportState.message}</span>
            {exportState.busy && <button onClick={() => { exportRequest.current?.abort(); setExportState({ busy: true, message: "Cancelando la descarga…", error: false }); }}>Cancelar</button>}
          </div>}
          <div className={`inbox-workspace ${selected ? "has-detail" : ""}`}>
            <div className="inbox-list" aria-busy={loading}>
              {loading ? <div className="inbox-empty" role="status"><RefreshCw size={23} className="sending-spinner" />Cargando consultas…</div>
                : error ? <div className="inbox-empty" role="alert"><Inbox size={30} /><h2>No se pudo cargar la bandeja</h2><p>Comprueba tu conexión e inténtalo de nuevo.</p><button className="inbox-secondary-button" onClick={() => { refreshAccess(); setRevision((value) => value + 1); }}>Reintentar</button></div>
                : !result.items.length ? <div className="inbox-empty"><Inbox size={32} /><h2>{query || filter ? "No hay consultas con estos filtros" : "Aún no hay consultas"}</h2><p>{query || filter ? "Prueba otro término o muestra todos los estados." : "Los mensajes del formulario aparecerán aquí."}</p></div>
                : <div className="inbox-table-scroll"><table className="inbox-table">
                  <caption className="sr-only">Consultas recibidas desde la web. Selecciona un contacto para ver el detalle.</caption>
                  <colgroup><col className="inbox-col-contact" /><col className="inbox-col-message" /><col className="inbox-col-status" /><col className="inbox-col-date" /></colgroup>
                  <thead><tr><th scope="col">Contacto</th><th scope="col">Consulta</th><th scope="col">Estado</th><th scope="col">Recibida</th></tr></thead>
                  <tbody>{result.items.map((item) => {
                    const summary = consultationSummary(item.message);
                    return <tr key={item.id} className={selected?.id === item.id ? "is-selected" : ""} onClick={() => openContact(item)}>
                      <td><div className="inbox-contact-cell"><span className="inbox-contact-avatar" aria-hidden="true">{initials(item.name)}</span><div>
                        <button id={`inbox-contact-${item.id}`} className="inbox-contact-name" aria-label={`Abrir consulta de ${item.name || "Contacto sin nombre"}`} aria-expanded={selected?.id === item.id} aria-controls={selected?.id === item.id ? "inbox-contact-detail" : undefined} title={item.name || "Contacto sin nombre"}>{item.name || "Contacto sin nombre"}</button>
                        <span className="inbox-cell-secondary" title={item.company || item.email}>{item.company || item.email}</span>
                      </div></div></td>
                      <td><span className="inbox-topic" title={summary.service}>{summary.service}</span><span className="inbox-cell-preview" title={summary.message}>{summary.message}</span></td>
                      <td><span className={`status-pill status-${item.status}`}>{labels[item.status]}</span></td>
                      <td><time className="inbox-cell-date" dateTime={item.created_at} title={date(item.created_at)}>{shortDate(item.created_at)}<span>{shortTime(item.created_at)}</span></time></td>
                    </tr>;
                  })}</tbody>
                </table></div>}
              {!loading && !error && result.total > 0 && <nav className="inbox-pagination" aria-label="Páginas de consultas">
                <span>{page * 50 + 1}–{Math.min((page + 1) * 50, result.total)} de {result.total}</span>
                <div><button aria-label="Página anterior" disabled={page === 0} onClick={() => { if (leaveDetail()) setPage((value) => value - 1); }}><ArrowLeft size={17} /></button><span>{page + 1} / {pages}</span><button aria-label="Página siguiente" disabled={page + 1 >= pages} onClick={() => { if (leaveDetail()) setPage((value) => value + 1); }}><ArrowRight size={17} /></button></div>
              </nav>}
            </div>
            {selected && <ContactEditor key={`${selected.id}:${selected.revision}`} item={selected} onClose={closeDetail} onSaved={saved} onDirty={(value) => { dirty.current = value; }} onSaving={(value) => { saving.current = value; }} />}
          </div>
        </div>
      </div>
    </section>
  );
}
function consultationSummary(message = "") {
  const match = message?.match(/^Servicio de interés: ([^\r\n]+)\r?\n\s*/);
  return { service: match ? match[1] : "Consulta general", message: match ? message.slice(match[0].length) : message };
}
function initials(name) { return String(name ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A"; }
function shortDate(value) { return value ? new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Sin fecha"; }
function shortTime(value) { return value ? new Intl.DateTimeFormat("es", { hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : ""; }

function ContactEditor({ item, onClose, onSaved, onDirty, onSaving }) {
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.internal_notes || "");
  const [saveState, setSaveState] = useState("idle");
  const pending = useRef(null);
  const detail = useRef(null);
  useEffect(() => {
    detail.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => () => pending.current?.abort(), []);
  const changed =
    status !== item.status || notes !== (item.internal_notes || "");
  useUnsavedForm(changed);
  function change(nextStatus, nextNotes) {
    setStatus(nextStatus);
    setNotes(nextNotes);
    setSaveState("idle");
    onDirty(
      nextStatus !== item.status || nextNotes !== (item.internal_notes || ""),
    );
  }
  async function save(event) {
    event.preventDefault();
    if (pending.current || !changed) return;
    const controller = new AbortController();
    pending.current = controller;
    const timer = setTimeout(() => controller.abort(), 15000);
    setSaveState("saving");
    onSaving(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .update({ status, internal_notes: notes })
        .eq("id", item.id)
        .eq("revision", item.revision)
        .select()
        .single()
        .abortSignal(controller.signal);
      if (error || !data) {
        setSaveState(error?.code === "PGRST116" ? "conflict" : "error");
        return;
      }
      onSaved(data);
    } catch {
      setSaveState("error");
    } finally {
      clearTimeout(timer);
      pending.current = null;
      onSaving(false);
    }
  }
  const safeEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(item.email);
  return (
    <aside
      ref={detail}
      tabIndex={-1}
      className="inbox-detail"
      id="inbox-contact-detail"
      aria-label="Detalle de la consulta"
    >
      <header className="inbox-detail-header">
        <span>Consulta #{item.id}</span>
        <button
          aria-label="Cerrar detalle"
          onClick={onClose}
          disabled={saveState === "saving"}
        >
          <X size={21} />
        </button>
      </header>
      <div className="inbox-detail-scroll">
      <div className="inbox-detail-identity"><span className="inbox-detail-avatar" aria-hidden="true">{initials(item.name)}</span><div><h2>{item.name || "Contacto sin nombre"}</h2>{item.company && <p><Building2 size={15} />{item.company}</p>}</div></div>
      <p className="inbox-detail-date">Recibida el {date(item.created_at)}</p>
      <dl>
        {item.first_name || item.last_name ? (
          <>
            <dt>Nombre</dt>
            <dd>{item.first_name}</dd>
            <dt>Apellidos</dt>
            <dd>{item.last_name}</dd>
          </>
        ) : (
          <>
            <dt>Nombre completo</dt>
            <dd>{item.name}</dd>
          </>
        )}
        <dt>Correo</dt>
        <dd>
          {safeEmail ? (
            <a href={`mailto:${encodeURIComponent(item.email)}`}>
              <Mail size={15} />
              {item.email}
            </a>
          ) : (
            item.email
          )}
        </dd>
        {item.phone && (
          <>
            <dt>Teléfono</dt>
            <dd>{item.phone}</dd>
          </>
        )}
      </dl>
      <div className="inbox-detail-divider" />
      <h3>Mensaje de la consulta</h3>
      <p className="inbox-message">{item.message}</p>
      <form id="inbox-edit-form" onSubmit={save}>
        <fieldset disabled={saveState === "saving"}>
          <label htmlFor="detail-status">Estado de la consulta</label>
          <select
            id="detail-status"
            value={status}
            onChange={(e) => change(e.target.value, notes)}
          >
            {Object.entries(labels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <label htmlFor="detail-notes">Notas internas</label>
          <textarea
            id="detail-notes"
            value={notes}
            onChange={(e) => change(status, e.target.value)}
            rows={4}
            maxLength={10000}
            placeholder="Acuerdos, documentación pendiente y próximos pasos."
          />
          <p className="inbox-private-hint">
            Solo la administración de Adler puede ver estas notas.
          </p>

        </fieldset>
      </form>

      {saveState === "error" && (
        <p role="alert" className="private-error">
          No se pudo guardar. Tus notas siguen aquí; vuelve a intentarlo.
        </p>
      )}
      {saveState === "conflict" && (
        <p role="alert" className="private-error">
          La consulta cambió o tu acceso ya no está disponible. Copia tus notas
          y actualiza la bandeja antes de guardar.
        </p>
      )}
      </div>
      <footer className="inbox-detail-footer">
        <span role="status" className={changed ? "inbox-unsaved" : "inbox-saved"}>{saveState === "saving" ? "Guardando cambios…" : changed ? "Cambios sin guardar" : "Cambios al día"}</span>
        <button form="inbox-edit-form" className="inbox-primary-button" disabled={!changed || saveState === "saving"}><Save size={17} />Guardar cambios</button>
      </footer>
    </aside>
  );
}
