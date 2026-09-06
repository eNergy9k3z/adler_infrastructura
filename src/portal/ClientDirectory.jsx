import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Search,
  Users,
  UserRound,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { useAvatar } from "./useAvatar";
import {
  portalDate,
  portalError,
  portalServices,
  portalStatuses,
} from "./portalData";
import {
  DIRECTORY_PAGE_SIZE,
  PROFILE_FIELDS,
  literalNamePattern,
  profileWebsite,
} from "./directoryData";
import "./ClientDirectory.css";

const base = "/dashboard/clientes";
const accountsUrl =
  "https://supabase.com/dashboard/project/hdkdizoodcnznifvikpp/auth/users";

function ProfileAvatar({ profile }) {
  const avatar = useAvatar(profile.avatar_path, profile.revision);
  return (
    <span className="directory-avatar">
      {avatar ? <img src={avatar} alt="" /> : <UserRound size={23} />}
    </span>
  );
}

function Pages({ page, total, size, onChange, label }) {
  if (total <= size) return null;
  return (
    <nav className="portal-pagination" aria-label={label}>
      <button
        className="portal-button secondary"
        disabled={!page}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </button>
      <span>
        Página {page + 1} de {Math.ceil(total / size)}
      </span>
      <button
        className="portal-button secondary"
        disabled={(page + 1) * size >= total}
        onClick={() => onChange(page + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}

function DirectoryNotice() {
  return (
    <aside className="directory-notice">
      <div>
        <strong>Perfiles y cuentas de acceso</strong>
        <p>
          El perfil aparece después de la primera entrada al portal. Las cuentas
          que aún no han entrado, sus correos y sus accesos se gestionan en
          Supabase.
        </p>
      </div>
      <a href={accountsUrl} target="_blank" rel="noopener noreferrer">
        Gestionar cuentas <ExternalLink size={16} />
        <span className="sr-only"> (abre Supabase en otra pestaña)</span>
      </a>
    </aside>
  );
}

export function ClientDirectory() {
  const { session } = useAuth();
  const [draft, setDraft] = useState("");
  const [searchError, setSearchError] = useState("");
  const [filter, setFilter] = useState({ search: "", page: 0, revision: 0 });
  const [result, setResult] = useState(null);
  const ready =
    result?.filter === filter && result?.userId === session?.user.id;
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    async function load() {
      try {
        let query = supabase
          .from("adler_client_profiles")
          .select(PROFILE_FIELDS, { count: "exact" });
        if (filter.search)
          query = query.ilike("full_name", literalNamePattern(filter.search));
        const { data, count, error } = await query
          .order("full_name")
          .order("user_id")
          .range(
            filter.page * DIRECTORY_PAGE_SIZE,
            (filter.page + 1) * DIRECTORY_PAGE_SIZE - 1,
          )
          .abortSignal(controller.signal);
        if (
          active &&
          filter.page > 0 &&
          (error?.code === "PGRST103" ||
            (!error && filter.page * DIRECTORY_PAGE_SIZE >= (count || 0)))
        ) {
          setFilter((current) =>
            current === filter ? { ...current, page: 0 } : current,
          );
          return;
        }
        if (active)
          setResult({
            filter,
            userId: session?.user.id,
            items: data || [],
            total: count || 0,
            error: error ? portalError(error) : "",
          });
      } catch (error) {
        if (active)
          setResult({
            filter,
            userId: session?.user.id,
            error: portalError(error),
          });
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [filter, session?.user.id]);
  return (
    <>
      <header className="directory-heading">
        <div>
          <span className="portal-kicker">RELACIONES CON CLIENTES</span>
          <h1>Directorio de clientes</h1>
          <p>Perfiles, datos de contacto y solicitudes en un solo lugar.</p>
        </div>
        <Users size={34} strokeWidth={1.4} />
      </header>
      <DirectoryNotice />
      <form
        className="directory-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (draft.includes("*")) {
            setSearchError(
              "Busca por una parte del nombre sin asteriscos (*).",
            );
            return;
          }
          setSearchError("");
          setFilter({
            search: draft.trim(),
            page: 0,
            revision: filter.revision + 1,
          });
        }}
      >
        <label htmlFor="directory-search">
          Nombre y apellidos
          <input
            id="directory-search"
            type="search"
            value={draft}
            maxLength={160}
            aria-invalid={!!searchError}
            aria-describedby={
              searchError ? "directory-search-error" : undefined
            }
            onChange={(event) => {
              setDraft(event.target.value);
              setSearchError("");
            }}
            placeholder="Buscar por nombre…"
          />
        </label>
        <button className="portal-button">
          <Search size={18} />
          Buscar
        </button>
        {filter.search && (
          <button
            type="button"
            className="portal-button secondary"
            onClick={() => {
              setDraft("");
              setSearchError("");
              setFilter({ search: "", page: 0, revision: filter.revision + 1 });
            }}
          >
            Ver todos
          </button>
        )}
      </form>
      {searchError && (
        <p id="directory-search-error" role="alert">
          {searchError}
        </p>
      )}
      <div aria-live="polite">
        {!ready ? (
          <p className="portal-loading" role="status">
            Cargando perfiles…
          </p>
        ) : result.error ? (
          <div className="portal-empty">
            <p role="alert">{result.error}</p>
            <button
              className="portal-button"
              onClick={() =>
                setFilter({ ...filter, revision: filter.revision + 1 })
              }
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <p className="directory-count">
              {result.total} {result.total === 1 ? "perfil" : "perfiles"}
              {filter.search ? ` para «${filter.search}»` : " disponibles"}
            </p>
            {!result.items.length ? (
              <div className="portal-empty">
                <Users size={32} />
                <h2>
                  {filter.search
                    ? "No hay coincidencias"
                    : "Todavía no hay perfiles"}
                </h2>
                <p>
                  {filter.search
                    ? "Prueba con otro nombre o consulta todos los perfiles."
                    : "Los perfiles aparecerán cuando los usuarios entren por primera vez al portal."}
                </p>
              </div>
            ) : (
              <div className="directory-list">
                <div className="directory-columns" aria-hidden="true">
                  <span>CLIENTE</span>
                  <span>EMPRESA Y CARGO</span>
                  <span>UBICACIÓN</span>
                  <span />
                </div>
                {result.items.map((profile) => (
                  <Link
                    className="directory-row"
                    key={profile.user_id}
                    to={`${base}/directorio/${profile.user_id}`}
                  >
                    <span className="directory-person">
                      <ProfileAvatar profile={profile} />
                      <span>
                        <strong>
                          {profile.full_name || "Perfil sin nombre"}
                        </strong>
                        {profile.user_id === session?.user.id && (
                          <small>Tu cuenta</small>
                        )}
                      </span>
                    </span>
                    <span>
                      <span>{profile.company || "Empresa no indicada"}</span>
                      <small>{profile.job_title}</small>
                    </span>
                    <span>
                      {[profile.city, profile.country]
                        .filter(Boolean)
                        .join(", ") || "Ubicación no indicada"}
                    </span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            )}
            <Pages
              page={filter.page}
              total={result.total}
              size={DIRECTORY_PAGE_SIZE}
              label="Páginas del directorio"
              onChange={(page) => setFilter({ ...filter, page })}
            />
          </>
        )}
      </div>
    </>
  );
}

export function ClientDirectoryProfile() {
  const { clientId } = useParams();
  // Changing the URL discards previous profile/request state immediately.
  return <ProfileDetail key={clientId} clientId={clientId} />;
}

function ProfileDetail({ clientId }) {
  const { session } = useAuth();
  const [query, setQuery] = useState({ page: 0, retry: 0 });
  const [result, setResult] = useState(null);
  const ready = result?.query === query && result?.userId === session?.user.id;
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    async function load() {
      try {
        const [profile, requests] = await Promise.all([
          supabase
            .from("adler_client_profiles")
            .select(PROFILE_FIELDS)
            .eq("user_id", clientId)
            .maybeSingle()
            .abortSignal(controller.signal),
          supabase
            .from("adler_client_requests")
            .select("id,subject,status,service,updated_at", { count: "exact" })
            .eq("client_id", clientId)
            .order("updated_at", { ascending: false })
            .order("id")
            .range(query.page * 10, query.page * 10 + 9)
            .abortSignal(controller.signal),
        ]);
        const error = profile.error || requests.error;
        if (
          active &&
          !profile.error &&
          query.page > 0 &&
          (requests.error?.code === "PGRST103" ||
            (!requests.error && query.page * 10 >= (requests.count || 0)))
        ) {
          setQuery((current) =>
            current === query ? { ...current, page: 0 } : current,
          );
          return;
        }
        if (active)
          setResult({
            query,
            userId: session?.user.id,
            profile: profile.data,
            items: requests.data || [],
            total: requests.count || 0,
            error: error ? portalError(error) : "",
          });
      } catch (error) {
        if (active)
          setResult({
            query,
            userId: session?.user.id,
            error: portalError(error),
          });
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [clientId, query, session?.user.id]);
  return (
    <>
      <Link to={`${base}/directorio`} className="directory-back">
        <ArrowLeft size={18} />
        Directorio de clientes
      </Link>
      {!ready ? (
        <p className="portal-loading" role="status">
          Cargando ficha…
        </p>
      ) : result.error ? (
        <div className="portal-empty">
          <h1>No se pudo cargar la ficha</h1>
          <p role="alert">{result.error}</p>
          <button
            className="portal-button"
            onClick={() => setQuery({ ...query, retry: query.retry + 1 })}
          >
            Reintentar
          </button>
        </div>
      ) : !result.profile ? (
        <div className="portal-empty">
          <h1>Perfil no disponible</h1>
          <p>El perfil no existe o no está disponible para esta cuenta.</p>
        </div>
      ) : (
        <>
          <header className="directory-heading">
            <div className="directory-profile-title">
              <ProfileAvatar profile={result.profile} />
              <div>
                <span className="portal-kicker">
                  FICHA DE CLIENTE
                  {clientId === session?.user.id ? " / TU CUENTA" : ""}
                </span>
                <h1>{result.profile.full_name || "Perfil sin nombre"}</h1>
                <p>
                  {[result.profile.job_title, result.profile.company]
                    .filter(Boolean)
                    .join(" · ") || "Datos profesionales pendientes"}
                </p>
              </div>
            </div>
          </header>
          <div className="directory-detail-layout">
            <aside className="portal-card directory-profile-data">
              <h2>Datos del perfil</h2>
              <dl>
                {[
                  ["Empresa", result.profile.company],
                  ["Cargo", result.profile.job_title],
                  ["Teléfono", result.profile.phone],
                  ["País", result.profile.country],
                  ["Ciudad", result.profile.city],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value || "No indicado"}</dd>
                  </div>
                ))}
                <div>
                  <dt>Sitio web</dt>
                  <dd>
                    {profileWebsite(result.profile.website) ? (
                      <a
                        href={profileWebsite(result.profile.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.profile.website}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      "No indicado"
                    )}
                  </dd>
                </div>
              </dl>
              {result.profile.bio && (
                <>
                  <h3>Presentación</h3>
                  <p className="directory-bio">{result.profile.bio}</p>
                </>
              )}
              <p className="portal-hint">
                El cliente actualiza estos datos desde su perfil. Su correo y su
                cuenta de acceso se gestionan por separado.
              </p>
              <a
                className="portal-text-button"
                href={accountsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir cuentas en Supabase <ExternalLink size={14} />
              </a>
            </aside>
            <section className="directory-history">
              <h2>
                Solicitudes y preguntas <span>({result.total})</span>
              </h2>
              {!result.items.length ? (
                <div className="portal-empty">
                  <h3>Aún no hay solicitudes</h3>
                  <p>
                    Las consultas de este cliente aparecerán aquí cuando las
                    cree desde su cuenta.
                  </p>
                </div>
              ) : (
                <div className="directory-list">
                  {result.items.map((item) => (
                    <Link
                      to={`${base}/solicitudes/${item.id}`}
                      key={item.id}
                      className="directory-request"
                    >
                      <div>
                        <strong>{item.subject}</strong>
                        <small>
                          {portalServices[item.service]} ·{" "}
                          {portalDate(item.updated_at)}
                        </small>
                      </div>
                      <span className={`portal-status status-${item.status}`}>
                        {item.status === "espera"
                          ? "Esperando al cliente"
                          : portalStatuses[item.status]}
                      </span>
                      <ArrowRight size={18} />
                    </Link>
                  ))}
                </div>
              )}
              <Pages
                page={query.page}
                total={result.total}
                size={10}
                label="Páginas de solicitudes del cliente"
                onChange={(page) => setQuery({ ...query, page })}
              />
            </section>
          </div>
        </>
      )}
    </>
  );
}
