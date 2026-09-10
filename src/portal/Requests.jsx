import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  FolderOpen,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import {
  portalDate,
  portalError,
  portalServices,
  portalStatuses,
} from "./portalData";
import { useUnsavedForm } from "./useUnsavedForm";

export function RequestList({ administration, base }) {
  const [result, setResult] = useState({
    items: [],
    total: 0,
    unread: 0,
    active: 0,
  });
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    supabase
      .rpc("adler_portal_list", {
        p_scope: administration ? "all" : "mine",
        p_query: search,
        p_status: status,
        p_page: page,
      })
      .abortSignal(controller.signal)
      .then(({ data, error: failure }) => {
        if (!active) return;
        if (failure) throw failure;
        if (page > 0 && data.items.length === 0 && data.total > 0) {
          setPage(0);
          return;
        }
        setResult(data);
        setError("");
      })
      .catch((failure) => {
        if (active) setError(portalError(failure));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [administration, search, status, page, retry]);
  function refresh() {
    setLoading(true);
    setRetry((n) => n + 1);
  }
  return (
    <>
      <div className="portal-heading">
        <div>
          <span className="portal-kicker">
            {administration
              ? "CLIENTES / SEGUIMIENTO"
              : "TUS CONVERSACIONES CON ADLER"}
          </span>
          <h1>
            {administration ? "Solicitudes de clientes" : "Mis solicitudes"}
          </h1>
          <p>
            {administration
              ? "Responde a cada cliente y mantén actualizado el estado de su consulta."
              : "Consulta el avance de tus peticiones y continúa la conversación."}
          </p>
        </div>
        {!administration && (
          <Link className="portal-button" to="/clientes/nueva">
            <Plus size={18} />
            Nueva consulta
          </Link>
        )}
      </div>
      <div className="portal-summary">
        <div>
          <FolderOpen size={21} />
          <span>
            Solicitudes<strong>{loading ? "—" : result.total}</strong>
          </span>
        </div>
        <div>
          <RefreshCw size={21} />
          <span>
            En seguimiento<strong>{loading ? "—" : result.active}</strong>
          </span>
        </div>
        <div>
          <MessageSquare size={21} />
          <span>
            Con novedades<strong>{loading ? "—" : result.unread}</strong>
          </span>
        </div>
      </div>
      <div className="portal-toolbar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setSearch(query.trim());
            setPage(0);
            setRetry((n) => n + 1);
          }}
        >
          <Search size={19} />
          <input
            aria-label="Buscar solicitudes"
            placeholder="Buscar por asunto o texto…"
            value={query}
            maxLength={200}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="portal-text-button">
            Buscar
          </button>
        </form>
        <label>
          <span className="sr-only">Filtrar por estado</span>
          <select
            value={status}
            onChange={(e) => {
              setLoading(true);
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Todos los estados</option>
            {Object.entries(portalStatuses).map(([key, label]) => (
              <option key={key} value={key}>
                {administration && key === "espera"
                  ? "Esperando al cliente"
                  : label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="portal-icon-button"
          title="Actualizar solicitudes"
          aria-label="Actualizar solicitudes"
          onClick={refresh}
          disabled={loading}
        >
          <RefreshCw size={19} />
        </button>
      </div>
      {loading ? (
        <p role="status" className="portal-loading">
          Cargando solicitudes…
        </p>
      ) : error ? (
        <div className="portal-empty">
          <p role="alert">{error}</p>
          <button className="portal-button" onClick={refresh}>
            Reintentar
          </button>
        </div>
      ) : !result.items.length ? (
        <div className="portal-empty">
          <FolderOpen size={38} />
          <h2>
            {search || status
              ? "No hay coincidencias"
              : "Aquí empieza tu contacto con Adler"}
          </h2>
          <p>
            {search || status
              ? "Prueba con otro texto o cambia el filtro."
              : administration
                ? "Las nuevas solicitudes aparecerán aquí cuando los clientes las envíen."
                : "Crea una solicitud o plantea una pregunta. Sus respuestas y próximos pasos quedarán reunidos aquí."}
          </p>
          {!administration && !search && !status && (
            <Link className="portal-button" to="/clientes/nueva">
              <Plus size={18} />
              Crear mi primera consulta
            </Link>
          )}
        </div>
      ) : (
        <div className="portal-request-list">
          <div className="portal-list-caption">
            <span>ASUNTO Y SERVICIO</span>
            <span>ÚLTIMA ACTIVIDAD</span>
          </div>
          {result.items.map((item) => (
            <Link
              to={`${base}/solicitudes/${item.id}`}
              className="portal-request-row"
              key={item.id}
            >
              <span className="portal-request-icon">
                {item.kind === "pregunta" ? (
                  <CircleHelp size={21} />
                ) : (
                  <FolderOpen size={21} />
                )}
              </span>
              <span className="portal-request-title">
                <span>
                  {item.unread && <span className="portal-new">Nuevo</span>}
                  <strong>{item.subject}</strong>
                </span>
                <small>
                  {administration
                    ? `${item.full_name || "Cliente"}${item.company ? " · " + item.company : ""} · `
                    : ""}
                  {portalServices[item.service]}
                </small>
              </span>
              <span className={`portal-status status-${item.status}`}>
                {administration && item.status === "espera"
                  ? "Esperando al cliente"
                  : portalStatuses[item.status]}
              </span>
              <time dateTime={item.updated_at}>
                {portalDate(item.updated_at)}
              </time>
              <ArrowRight size={19} />
            </Link>
          ))}
        </div>
      )}
      {!loading && !error && result.total > 20 && (
        <nav className="portal-pagination" aria-label="Páginas de solicitudes">
          <button
            className="portal-button secondary"
            disabled={page === 0}
            onClick={() => {
              setLoading(true);
              setPage((n) => n - 1);
            }}
          >
            Anterior
          </button>
          <span>
            Página {page + 1} de {Math.ceil(result.total / 20)}
          </span>
          <button
            className="portal-button secondary"
            disabled={(page + 1) * 20 >= result.total}
            onClick={() => {
              setLoading(true);
              setPage((n) => n + 1);
            }}
          >
            Siguiente
          </button>
        </nav>
      )}
    </>
  );
}

export function NewRequest() {
  const navigate = useNavigate();
  const [kind, setKind] = useState("solicitud");
  const [service, setService] = useState("general");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const requestId = useRef(crypto.randomUUID());
  const allowNavigation = useUnsavedForm(Boolean(subject || description));
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    if (!subject.trim() || !description.trim()) {
      setError("Escribe un asunto y explica tu consulta.");
      return;
    }
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const { data, error: failure } = await supabase.rpc(
        "adler_portal_create_request",
        {
          p_id: requestId.current,
          p_subject: subject.trim(),
          p_description: description.trim(),
          p_service: service,
          p_kind: kind,
        },
      );
      if (failure) throw failure;
      allowNavigation();
      setSubject("");
      setDescription("");
      navigate(`/clientes/solicitudes/${data.id}`, { replace: true });
    } catch (failure) {
      const ambiguous = !["42501", "23514", "40001", "P0001"].includes(
        failure?.code,
      );
      setUncertain(ambiguous);
      setError(
        ambiguous
          ? "No se pudo confirmar el envío. Conservamos tu consulta; pulsa de nuevo para comprobarla sin duplicarla."
          : portalError(failure),
      );
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return (
    <>
      <Link className="portal-back" to="/clientes">
        <ArrowLeft size={17} />
        Mis solicitudes
      </Link>
      <div className="portal-heading">
        <div>
          <span className="portal-kicker">HABLEMOS DE TU PROYECTO</span>
          <h1>Nueva consulta</h1>
          <p>
            Cuéntanos qué necesitas. Podrás seguir la conversación desde tu
            espacio.
          </p>
        </div>
      </div>
      <div className="portal-compose-layout">
        <form className="portal-card portal-form" onSubmit={submit}>
          <fieldset disabled={busy || uncertain}>
            <legend>¿Qué quieres plantear?</legend>
            <div className="portal-kind-options">
              {[
                ["solicitud", "Una solicitud"],
                ["pregunta", "Una pregunta"],
              ].map(([value, label]) => (
                <label key={value} className={kind === value ? "selected" : ""}>
                  <input
                    type="radio"
                    name="kind"
                    value={value}
                    checked={kind === value}
                    onChange={() => setKind(value)}
                  />
                  {value === "solicitud" ? (
                    <FolderOpen size={19} />
                  ) : (
                    <CircleHelp size={19} />
                  )}
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            Área de interés
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={busy || uncertain}
            >
              {Object.entries(portalServices).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Asunto
            <input
              value={subject}
              maxLength={160}
              required
              onChange={(e) => setSubject(e.target.value)}
              disabled={busy || uncertain}
              placeholder="Por ejemplo: revisión de un contrato de obra"
            />
          </label>
          <label>
            Tu consulta
            <textarea
              rows={8}
              value={description}
              maxLength={10000}
              required
              onChange={(e) => setDescription(e.target.value)}
              disabled={busy || uncertain}
              placeholder="Describe el proyecto, tu pregunta y lo que necesitas de Adler."
            />
          </label>
          <span className="portal-hint">
            {description.length.toLocaleString("es")} / 10.000 caracteres
          </span>
          {error && (
            <p className="portal-error" role="alert">
              {error}
            </p>
          )}
          <button className="portal-button" disabled={busy}>
            <Send size={18} />
            {busy
              ? "Comprobando…"
              : uncertain
                ? "Comprobar envío"
                : "Enviar a Adler"}
          </button>
        </form>
        <aside className="portal-note">
          <MessageSquare size={25} />
          <h2>Una conversación con contexto</h2>
          <p>
            La consulta y las respuestas quedarán en el mismo hilo. Puedes
            añadir información después de enviarla.
          </p>
          <p>
            El estado te indicará si Adler está revisándola o necesita tu
            respuesta.
          </p>
        </aside>
      </div>
    </>
  );
}

export function RequestConversation(props) {
  const { requestId } = useParams();
  return <Conversation key={requestId} requestId={requestId} {...props} />;
}
function Conversation({ administration, base, requestId }) {
  const { session } = useAuth();
  const [request, setRequest] = useState(null);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [loadingOlder, setLoadingOlder] = useState(false);
  const generation = useRef(0);
  const olderPending = useRef(false);
  const serverStatus = useRef("");
  const [refreshing, setRefreshing] = useState(false);
  const pending = useRef(false);
  const messageId = useRef(crypto.randomUUID());
  const activeId = useRef(requestId);
  useEffect(() => {
    activeId.current = requestId;
  }, [requestId]);
  const load = useCallback(async () => {
    const version = ++generation.current;
    const isCurrent = () =>
      activeId.current === requestId && generation.current === version;
    setRefreshing(true);
    try {
      const [
        { data, error: requestError },
        { data: rows, error: messageError },
      ] = await Promise.all([
        supabase
          .from("adler_client_requests")
          .select("*")
          .eq("id", requestId)
          .maybeSingle(),
        supabase
          .from("adler_client_messages")
          .select("*")
          .eq("request_id", requestId)
          .order("sequence", { ascending: false })
          .limit(51),
      ]);
      if (!isCurrent()) return;
      if (requestError) throw requestError;
      if (messageError) throw messageError;
      if (!data) {
        setRequest(null);
        setError(
          "No encontramos esta conversación o no tienes permiso para abrirla.",
        );
        return;
      }
      setRequest(data);
      const previousStatus = serverStatus.current;
      setSelectedStatus((draft) =>
        !draft || draft === previousStatus ? data.status : draft,
      );
      serverStatus.current = data.status;
      setMessages(rows.slice(0, 50).reverse());
      setMore(rows.length > 50);
      setError("");
      const { data: client } = await supabase
        .from("adler_client_profiles")
        .select("*")
        .eq("user_id", data.client_id)
        .maybeSingle();
      if (!isCurrent()) return;
      setProfile(client);
      const seenAt = rows
        .slice(0, 50)
        .reduce(
          (latest, message) =>
            message.created_at > latest ? message.created_at : latest,
          data.created_at,
        );
      await supabase.rpc("adler_portal_mark_read", {
        p_id: requestId,
        p_seen_at: seenAt,
      });
    } catch (failure) {
      if (isCurrent()) setError(portalError(failure));
    } finally {
      if (isCurrent()) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [requestId]);
  useEffect(() => {
    load();
    return () => {
      activeId.current = null;
    };
  }, [load]);
  useUnsavedForm(
    Boolean(body) ||
      Boolean(administration && request && selectedStatus !== request.status),
  );
  async function send(event) {
    event.preventDefault();
    if (pending.current || !body.trim()) return;
    pending.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { error: failure } = await supabase.rpc(
        "adler_portal_send_message",
        {
          p_id: messageId.current,
          p_request_id: requestId,
          p_body: body.trim(),
        },
      );
      if (failure) throw failure;
      setBody("");
      setUncertain(false);
      messageId.current = crypto.randomUUID();
      setNotice("Mensaje enviado.");
      await load();
    } catch (failure) {
      const ambiguous = !["42501", "23514", "40001", "P0001"].includes(
        failure?.code,
      );
      setUncertain(ambiguous);
      setError(
        ambiguous
          ? "No se pudo confirmar el mensaje. Reintenta con el botón para comprobar el envío sin duplicarlo."
          : portalError(failure),
      );
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  async function saveStatus() {
    if (pending.current) return;
    pending.current = true;
    setSavingStatus(true);
    setError("");
    setNotice("");
    try {
      const { data, error: failure } = await supabase.rpc(
        "adler_portal_set_status",
        {
          p_id: requestId,
          p_revision: request.revision,
          p_status: selectedStatus,
        },
      );
      if (failure) throw failure;
      setRequest(data);
      serverStatus.current = data.status;
      setSelectedStatus(data.status);
      setNotice("Estado actualizado.");
    } catch (failure) {
      setError(portalError(failure));
    } finally {
      pending.current = false;
      setSavingStatus(false);
    }
  }
  async function older() {
    if (olderPending.current || refreshing || !messages.length) return;
    olderPending.current = true;
    const version = generation.current;
    const isCurrent = () =>
      activeId.current === requestId && generation.current === version;
    setLoadingOlder(true);
    try {
      const { data, error: failure } = await supabase
        .from("adler_client_messages")
        .select("*")
        .eq("request_id", requestId)
        .lt("sequence", messages[0].sequence)
        .order("sequence", { ascending: false })
        .limit(51);
      if (!isCurrent()) return;
      if (failure) throw failure;
      setMessages((rows) => [...data.slice(0, 50).reverse(), ...rows]);
      setMore(data.length > 50);
    } catch (failure) {
      if (isCurrent()) setError(portalError(failure));
    } finally {
      olderPending.current = false;
      if (activeId.current === requestId) setLoadingOlder(false);
    }
  }
  if (loading)
    return (
      <p className="portal-loading" role="status">
        Cargando conversación…
      </p>
    );
  if (!request)
    return (
      <div className="portal-empty">
        <h1>Conversación no disponible</h1>
        <p role="alert">{error}</p>
        <Link className="portal-button" to={base}>
          Volver a las solicitudes
        </Link>
      </div>
    );
  return (
    <>
      <Link className="portal-back" to={base}>
        <ArrowLeft size={17} />
        Volver a las solicitudes
      </Link>
      <div className="portal-heading">
        <div>
          <span className="portal-kicker">
            {request.kind === "pregunta" ? "PREGUNTA" : "SOLICITUD"} ·{" "}
            {portalServices[request.service]}
          </span>
          <h1>{request.subject}</h1>
          <p>Creada el {portalDate(request.created_at)}</p>
        </div>
        <span className={`portal-status status-${request.status}`}>
          {administration && request.status === "espera"
            ? "Esperando al cliente"
            : portalStatuses[request.status]}
        </span>
      </div>
      <div className="portal-conversation-layout">
        <div className="portal-conversation">
          <div className="portal-conversation-heading">
            <h2>Conversación</h2>
            <button
              className="portal-text-button"
              onClick={load}
              disabled={busy || savingStatus || refreshing}
            >
              <RefreshCw size={15} />
              {refreshing ? "Actualizando…" : "Actualizar"}
            </button>
          </div>
          <article className="portal-message original">
            <header>
              <strong>{profile?.full_name || "Cliente"}</strong>
              <span>Consulta inicial</span>
            </header>
            <p>{request.description}</p>
          </article>
          {more && (
            <button
              className="portal-text-button portal-load-older"
              onClick={older}
              disabled={loadingOlder || refreshing}
            >
              {loadingOlder ? "Cargando…" : "Cargar mensajes anteriores"}
            </button>
          )}
          <div
            className="portal-messages"
            aria-label="Mensajes de la conversación"
          >
            {messages.map((message) => (
              <article
                key={message.id}
                className={`portal-message ${message.from_adler ? "adler-message" : "client-message"}`}
              >
                <header>
                  <strong>
                    {message.from_adler
                      ? "Adler Infrastructura"
                      : message.sender_id === session.user.id
                        ? "Tú"
                        : profile?.full_name || "Cliente"}
                  </strong>
                  <time dateTime={message.created_at}>
                    {portalDate(message.created_at)}
                  </time>
                </header>
                <p>{message.body}</p>
              </article>
            ))}
          </div>
          {error && (
            <p className="portal-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="portal-success" role="status">
              <Check size={17} />
              {notice}
            </p>
          )}
          {request.status === "cerrada" ? (
            <div className="portal-closed">
              <p>
                Esta conversación está cerrada. Conservas todo su historial.
              </p>
              {!administration && (
                <Link to="/clientes/nueva">
                  Crear otra consulta <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ) : (
            <form className="portal-reply" onSubmit={send}>
              <label htmlFor="reply-body">
                {administration ? "Responder al cliente" : "Añadir un mensaje"}
              </label>
              <textarea
                id="reply-body"
                rows={4}
                maxLength={10000}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={busy || uncertain}
                placeholder={
                  administration
                    ? "Escribe la respuesta de Adler…"
                    : "Escribe tu pregunta o añade información…"
                }
              />
              <div>
                <span className="portal-hint">
                  {body.length.toLocaleString("es")} / 10.000
                </span>
                <button
                  className="portal-button"
                  disabled={busy || savingStatus || refreshing || !body.trim()}
                >
                  <Send size={16} />
                  {busy
                    ? "Comprobando…"
                    : uncertain
                      ? "Comprobar envío"
                      : "Enviar mensaje"}
                </button>
              </div>
            </form>
          )}
        </div>
        <aside className="portal-detail-sidebar">
          <div className="portal-card">
            <span className="portal-kicker">SEGUIMIENTO</span>
            <h2>
              {administration && request.status === "espera"
                ? "Esperando al cliente"
                : portalStatuses[request.status]}
            </h2>
            <p className="portal-hint">
              Última actividad: {portalDate(request.updated_at)}
            </p>
            {administration ? (
              <>
                <label htmlFor="request-status">Cambiar estado</label>
                <select
                  id="request-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={busy || savingStatus || refreshing}
                >
                  {Object.entries(portalStatuses).map(([value, label]) => (
                    <option key={value} value={value}>
                      {value === "espera" ? "Esperando al cliente" : label}
                    </option>
                  ))}
                </select>
                <button
                  className="portal-button secondary"
                  onClick={saveStatus}
                  disabled={
                    busy ||
                    savingStatus ||
                    refreshing ||
                    selectedStatus === request.status
                  }
                >
                  {savingStatus ? "Guardando…" : "Guardar estado"}
                </button>
              </>
            ) : (
              <p>
                {request.status === "espera"
                  ? "Adler necesita información adicional. Revisa la conversación y añade tu respuesta."
                  : request.status === "resuelta"
                    ? "Tu solicitud figura como resuelta. Puedes escribir si queda alguna duda."
                    : "Aquí verás los cambios de estado de tu consulta."}
              </p>
            )}
          </div>
          {administration && profile && (
            <div className="portal-card">
              <span className="portal-kicker">CLIENTE</span>
              <h2>{profile.full_name || "Sin nombre de perfil"}</h2>
              <p>
                {[profile.job_title, profile.company]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p>
                {[profile.city, profile.country].filter(Boolean).join(", ")}
              </p>
              {profile.phone && <p>{profile.phone}</p>}
              {profile.bio && <p className="portal-hint">{profile.bio}</p>}
              <Link
                className="portal-text-button"
                to={`/dashboard/clientes/directorio/${profile.user_id}`}
              >
                Ver ficha y todas sus solicitudes
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
