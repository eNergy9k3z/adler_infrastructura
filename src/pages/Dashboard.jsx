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
  ChevronDown,
  Menu,
  Clock3,
  Flag,
  CircleCheck,
  MailOpen,
  Reply,
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
  const [foldersOpen, setFoldersOpen] = useState(false);
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
    if (!exportState.busy && leaveDetail()) {
      setFilter(value);
      setPage(0);
      setFoldersOpen(false);
      if (foldersOpen) requestAnimationFrame(() => document.getElementById("inbox-list-title")?.focus({ preventScroll: true }));
    }
  }
  const folderName = filter ? labels[filter] : "Bandeja de entrada";
  return (
    <section className={`inbox-page ${foldersOpen ? "folders-open" : ""}`}>
      <header className="inbox-appbar">
        <Link className="inbox-brand" to="/">ADLER<span>INFRASTRUCTURA</span></Link>
        <span className="inbox-app-name">Consultas</span>
        <form className="inbox-search" onSubmit={(event) => {
          event.preventDefault();
          if (leaveDetail()) { setQuery(search.trim()); setPage(0); setRevision((value) => value + 1); }
        }}>
          <button type="submit" aria-label="Buscar" disabled={exportState.busy}><Search size={19} /></button>
          <label className="sr-only" htmlFor="inbox-search">Buscar consultas</label>
          <input id="inbox-search" type="search" disabled={exportState.busy} maxLength={200} placeholder="Buscar en las consultas" value={search} onChange={(event) => setSearch(event.target.value)} />
        </form>
        <span className="inbox-account" title={session.user.email}><span>{session.user.email}</span><span className="inbox-account-avatar" aria-hidden="true"><UserRound size={18} /></span></span>
      </header>
      <nav className="inbox-app-rail" aria-label="Aplicaciones de Adler">
        <Link to="/dashboard" aria-current="page" aria-label="Consultas de la web" title="Consultas de la web"><Mail size={22} /></Link>
        <Link to="/dashboard/clientes" aria-label="Atención a clientes" title="Atención a clientes"><MessagesSquare size={22} /></Link>
        <Link to="/" aria-label="Ver página web" title="Ver página web"><ExternalLink size={21} /></Link>
      </nav>
      <div className="inbox-commandbar">
        <button className="inbox-folder-toggle" aria-label={foldersOpen ? "Ocultar carpetas" : "Mostrar carpetas"} aria-expanded={foldersOpen} aria-controls="inbox-folders" onClick={() => setFoldersOpen((value) => !value)}><Menu size={20} /></button>
        <button className="inbox-primary-button" disabled={exportState.busy || loading || error || !result.total} onClick={exportContacts} title="Descargar todos los resultados filtrados" aria-describedby="inbox-export-hint"><Download size={17} />{exportState.busy ? "Preparando…" : "Descargar Excel"}</button>
        <span className="inbox-command-divider" />
        <button className="inbox-toolbar-button" disabled={loading} onClick={() => { if (leaveDetail()) setRevision((value) => value + 1); }}><RefreshCw size={17} className={loading ? "sending-spinner" : ""} />Actualizar</button>
        <Link className="inbox-toolbar-button inbox-client-link" to="/dashboard/clientes"><MessagesSquare size={17} />Atención a clientes</Link>
        <span className="inbox-toolbar-caption"><ShieldCheck size={14} />Espacio privado</span>
      </div>
      <aside className="inbox-folders" id="inbox-folders" aria-label="Carpetas de consultas">
        <div className="inbox-mailbox"><ChevronDown size={14} /><span>Adler Infrastructura</span></div>
        <nav aria-label="Filtrar consultas por estado">
          {[["", "Bandeja de entrada", <Inbox size={18} />], ["pendiente", "Pendientes", <Clock3 size={18} />], ["seguimiento", "En seguimiento", <Flag size={18} />], ["resuelta", "Resueltas", <CircleCheck size={18} />]].map(([value, label, icon]) => <button key={value} aria-pressed={filter === value} disabled={exportState.busy} onClick={() => changeFilter(value)}>{icon}<span>{label}</span></button>)}
        </nav>
        <p className="inbox-folder-caption">Consultas del formulario web</p>
        <div className="inbox-folder-links">
          <Link to="/dashboard/clientes"><MessagesSquare size={18} />Conversaciones de clientes</Link>
        </div>
        <div className="inbox-sidebar-bottom">
          <Link to="/cuenta/contrasena"><KeyRound size={17} />Cambiar contraseña</Link>
          <button onClick={() => { if (leaveDetail()) signOut(); }}><LogOut size={17} />Cerrar sesión</button>
        </div>
      </aside>
      <div className="inbox-main">
        {exportState.message && <div className={`inbox-export-feedback ${exportState.error ? "is-error" : ""}`} role={exportState.error ? "alert" : "status"}>
          <span>{exportState.message}</span>
          {exportState.busy && <button onClick={() => { exportRequest.current?.abort(); setExportState({ busy: true, message: "Cancelando la descarga…", error: false }); }}>Cancelar</button>}
        </div>}
        <div className={`inbox-workspace ${selected ? "has-detail" : ""}`}>
          <section className="inbox-list" aria-label="Lista de consultas" aria-busy={loading}>
            <header className="inbox-list-header"><h1 id="inbox-list-title" tabIndex={-1}>{folderName}</h1><p role="status">{loading ? "Cargando…" : error ? "No disponible" : `${result.total} ${result.total === 1 ? "consulta" : "consultas"}`}</p></header>
            <div className="inbox-list-context"><span>{query ? `Resultados para «${query}»` : "Más recientes primero"}</span><span id="inbox-export-hint" className="sr-only">Excel incluye todos los resultados filtrados.</span></div>
            <div className="inbox-messages-scroll">
              {loading ? <div className="inbox-empty" role="status"><RefreshCw size={23} className="sending-spinner" />Cargando consultas…</div>
                : error ? <div className="inbox-empty" role="alert"><Inbox size={30} /><h2>No se pudo cargar la bandeja</h2><p>Comprueba tu conexión e inténtalo de nuevo.</p><button className="inbox-secondary-button" onClick={() => { refreshAccess(); setRevision((value) => value + 1); }}>Reintentar</button></div>
                : !result.items.length ? <div className="inbox-empty"><Inbox size={32} /><h2>{query || filter ? "No hay consultas con estos filtros" : "Aún no hay consultas"}</h2><p>{query || filter ? "Prueba otro término o abre la bandeja de entrada." : "Los mensajes del formulario aparecerán aquí."}</p></div>
                : <ul className="inbox-message-list">{result.items.map((item) => {
                  const summary = consultationSummary(item.message);
                  return <li key={item.id}><button id={`inbox-contact-${item.id}`} className={`inbox-message-row ${selected?.id === item.id ? "is-selected" : ""}`} onClick={() => openContact(item)} aria-label={`Abrir consulta de ${item.name || "Contacto sin nombre"}`} aria-expanded={selected?.id === item.id} aria-controls={selected?.id === item.id ? "inbox-contact-detail" : undefined}>
                    <span className="inbox-contact-avatar" aria-hidden="true">{initials(item.name)}</span>
                    <span className="inbox-message-summary">
                      <span className="inbox-message-top"><span className="inbox-contact-name" title={item.name || "Contacto sin nombre"}>{item.name || "Contacto sin nombre"}</span><time dateTime={item.created_at} title={date(item.created_at)}>{shortDate(item.created_at)}</time></span>
                      <span className="inbox-topic">{summary.service}</span>
                      <span className="inbox-cell-preview">{summary.message || "Sin texto adicional"}</span>
                      <span className="inbox-message-meta"><span className={`inbox-state-label status-${item.status}`}>{labels[item.status]}</span><span className="inbox-message-company">{item.company || item.email}</span></span>
                    </span>
                  </button></li>;
                })}</ul>}
            </div>
            {!loading && !error && result.total > 0 && <nav className="inbox-pagination" aria-label="Páginas de consultas">
              <span>{page * 50 + 1}–{Math.min((page + 1) * 50, result.total)} de {result.total}</span>
              <div><button aria-label="Página anterior" disabled={page === 0} onClick={() => { if (leaveDetail()) setPage((value) => value - 1); }}><ArrowLeft size={16} /></button><span>{page + 1} / {pages}</span><button aria-label="Página siguiente" disabled={page + 1 >= pages} onClick={() => { if (leaveDetail()) setPage((value) => value + 1); }}><ArrowRight size={16} /></button></div>
            </nav>}
          </section>
          {selected ? <ContactEditor key={`${selected.id}:${selected.revision}`} item={selected} onClose={closeDetail} onSaved={saved} onDirty={(value) => { dirty.current = value; }} onSaving={(value) => { saving.current = value; }} /> : <div className="inbox-reading-placeholder"><span><MailOpen size={46} strokeWidth={1.1} /></span><h2>Selecciona una consulta</h2><p>Lee el mensaje y gestiona su seguimiento aquí.</p></div>}
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
function shortDate(value) { return value ? new Intl.DateTimeFormat("es", { day: "2-digit", month: "short" }).format(new Date(value)) : "Sin fecha"; }

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
        <button aria-label="Cerrar detalle" onClick={onClose} disabled={saveState === "saving"}><ArrowLeft size={18} className="inbox-mobile-back" /><span className="inbox-mobile-back">Bandeja</span><X size={19} className="inbox-desktop-close" /></button>
      </header>
      <div className="inbox-detail-scroll">
        <h2 className="inbox-reading-subject">{consultationSummary(item.message).service}</h2>
        <div className="inbox-detail-identity">
          <span className="inbox-detail-avatar" aria-hidden="true">{initials(item.name)}</span>
          <div><h3>{item.name || "Contacto sin nombre"}</h3><p>{item.email || "Correo no registrado"}</p><p>Para: Adler Infrastructura</p></div>
          <time className="inbox-detail-date" dateTime={item.created_at}>{date(item.created_at)}</time>
        </div>
        <details className="inbox-contact-data"><summary>Datos del contacto<ChevronDown size={14} /></summary><dl>
          {item.first_name || item.last_name ? <><dt>Nombre</dt><dd>{item.first_name}</dd><dt>Apellidos</dt><dd>{item.last_name}</dd></> : <><dt>Nombre completo</dt><dd>{item.name || "No registrado"}</dd></>}
          <dt>Correo</dt><dd>{safeEmail ? <a href={`mailto:${encodeURIComponent(item.email)}`}>{item.email}</a> : item.email || "No registrado"}</dd>
          {item.company && <><dt>Empresa</dt><dd>{item.company}</dd></>}
          {item.phone && <><dt>Teléfono</dt><dd>{item.phone}</dd></>}
        </dl></details>
        <div className="inbox-reading-body"><p className="inbox-message">{consultationSummary(item.message).message || "Sin texto adicional."}</p>
          {safeEmail && <a className="inbox-reply-button" href={`mailto:${encodeURIComponent(item.email)}`} title="Abre tu aplicación de correo"><Reply size={17} />Responder por correo</a>}
        </div>
        <div className="inbox-followup-heading"><h3>Seguimiento de la consulta</h3><span><ShieldCheck size={14} />Solo Adler</span></div>
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
