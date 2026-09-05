import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
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
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
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
      <section className="inbox-page">
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
    setSelected(filter && filter !== item.status ? null : item);
    setRevision((value) => value + 1);
    setResult((previous) => ({
      ...previous,
      items: previous.items.map((row) => (row.id === item.id ? item : row)),
    }));
  }
  const pages = Math.max(1, Math.ceil(result.total / 50));
  return (
    <section className="inbox-page">
      <div className="container">
        <header className="inbox-header">
          <div>
            <span className="eyebrow">ADLER / ADMINISTRACIÓN</span>
            <h1>Consultas recibidas.</h1>
            <p>Organiza cada conversación y define el siguiente paso.</p>
          </div>
          <div className="inbox-account">
            <span>{session.user.email}</span>
            <button
              onClick={() => {
                if (leaveDetail()) signOut();
              }}
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </header>
        <div className="inbox-toolbar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (leaveDetail()) {
                setQuery(search.trim());
                setPage(0);
                setRevision((value) => value + 1);
              }
            }}
          >
            <label className="sr-only" htmlFor="inbox-search">
              Buscar consultas
            </label>
            <input
              id="inbox-search"
              type="search"
              maxLength={200}
              placeholder="Nombre, empresa, correo o mensaje"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <Search size={20} />
            </button>
          </form>
          <div>
            <label htmlFor="inbox-filter">Estado</label>
            <select
              id="inbox-filter"
              value={filter}
              onChange={(e) => {
                if (leaveDetail()) {
                  setFilter(e.target.value);
                  setPage(0);
                }
              }}
            >
              <option value="">Todas las consultas</option>
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="inbox-refresh"
            disabled={loading}
            onClick={() => {
              if (leaveDetail()) setRevision((value) => value + 1);
            }}
          >
            <RefreshCw size={17} /> Actualizar
          </button>
        </div>
        <div className={`inbox-workspace ${selected ? "has-detail" : ""}`}>
          <div className="inbox-list" aria-busy={loading}>
            <div className="inbox-list-heading">
              <h2>{filter ? labels[filter] : "Bandeja de entrada"}</h2>
              <span>
                {loading
                  ? "Cargando…"
                  : `${result.total} ${result.total === 1 ? "consulta" : "consultas"}`}
              </span>
            </div>
            {loading ? (
              <div className="inbox-empty" role="status">
                Cargando consultas…
              </div>
            ) : error ? (
              <div className="inbox-empty" role="alert">
                <h3>No se pudo cargar la bandeja.</h3>
                <p>Comprueba tu conexión e inténtalo de nuevo.</p>
                <button
                  onClick={() => {
                    refreshAccess();
                    setRevision((value) => value + 1);
                  }}
                >
                  Reintentar
                </button>
              </div>
            ) : !result.items.length ? (
              <div className="inbox-empty">
                <Inbox size={32} />
                <h3>
                  {query || filter
                    ? "No hay consultas con estos filtros."
                    : "Tu bandeja está al día."}
                </h3>
                <p>
                  {query || filter
                    ? "Prueba otro término o muestra todos los estados."
                    : "Las solicitudes enviadas desde la web aparecerán aquí."}
                </p>
              </div>
            ) : (
              result.items.map((item) => (
                <button
                  className={`inbox-row ${selected?.id === item.id ? "is-selected" : ""}`}
                  key={item.id}
                  aria-pressed={selected?.id === item.id}
                  onClick={() => {
                    if (selected?.id === item.id) return;
                    if (leaveDetail()) setSelected(item);
                  }}
                >
                  <span className="inbox-row-top">
                    <strong>{item.name}</strong>
                    <span className={`status-pill status-${item.status}`}>
                      {labels[item.status]}
                    </span>
                  </span>
                  <span className="inbox-company">
                    {item.company || item.email}
                  </span>
                  <span className="inbox-preview">{item.message}</span>
                  <span className="inbox-date">{date(item.created_at)}</span>
                </button>
              ))
            )}
            {!loading && !error && pages > 1 && (
              <nav
                className="inbox-pagination"
                aria-label="Páginas de consultas"
              >
                <button
                  disabled={page === 0}
                  onClick={() => {
                    if (leaveDetail()) setPage((value) => value - 1);
                  }}
                >
                  <ArrowLeft size={16} /> Anterior
                </button>
                <span>
                  {page + 1} / {pages}
                </span>
                <button
                  disabled={page + 1 >= pages}
                  onClick={() => {
                    if (leaveDetail()) setPage((value) => value + 1);
                  }}
                >
                  Siguiente <ArrowRight size={16} />
                </button>
              </nav>
            )}
          </div>
          {selected && (
            <ContactEditor
              key={`${selected.id}:${selected.revision}`}
              item={selected}
              onClose={leaveDetail}
              onSaved={saved}
              onDirty={(value) => {
                dirty.current = value;
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
function ContactEditor({ item, onClose, onSaved, onDirty }) {
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.internal_notes || "");
  const [saveState, setSaveState] = useState("idle");
  const pending = useRef(null);
  const detail = useRef(null);
  useEffect(() => {
    detail.current?.focus();
  }, []);
  useEffect(() => () => pending.current?.abort(), []);
  const changed =
    status !== item.status || notes !== (item.internal_notes || "");
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
    }
  }
  const safeEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(item.email);
  return (
    <aside
      ref={detail}
      tabIndex={-1}
      className="inbox-detail"
      aria-label="Detalle de la consulta"
    >
      <header>
        <span className="eyebrow">DETALLE DE LA CONSULTA</span>
        <button
          aria-label="Cerrar detalle"
          onClick={onClose}
          disabled={saveState === "saving"}
        >
          <X size={21} />
        </button>
      </header>
      <h2>{item.name}</h2>
      <p className="inbox-company">{item.company}</p>
      <p className="inbox-date">Recibida el {date(item.created_at)}</p>
      <dl>
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
      <h3>Mensaje original</h3>
      <p className="inbox-message">{item.message}</p>
      <form onSubmit={save}>
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
            rows={6}
            maxLength={10000}
            placeholder="Acuerdos, documentación pendiente y próximos pasos."
          />
          <p className="inbox-private-hint">
            Solo la administración de Adler puede ver estas notas.
          </p>
          <button
            className="btn btn-primary"
            disabled={!changed || saveState === "saving"}
          >
            <Save size={17} />
            {saveState === "saving" ? "Guardando…" : "Guardar cambios"}
          </button>
        </fieldset>
      </form>
      {!changed && (
        <p className="inbox-saved" role="status">
          Cambios al día.
        </p>
      )}
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
    </aside>
  );
}
