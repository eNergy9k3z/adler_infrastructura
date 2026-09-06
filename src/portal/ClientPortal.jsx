import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
  FolderOpen,
  Plus,
  UserRound,
  LogOut,
  ArrowUpRight,
  LayoutDashboard,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "../supabaseClient";
import { useAvatar } from "./useAvatar";
import { portalError } from "./portalData";
import ClientProfile from "./ClientProfile";
import { RequestList, NewRequest, RequestConversation } from "./Requests";
import { ClientDirectory, ClientDirectoryProfile } from "./ClientDirectory";
import "./Portal.css";

export default function ClientPortal({ administration = false }) {
  const { state, session, signOut, isAdmin, refreshAccess, signOutError } =
    useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const base = administration ? "/dashboard/clientes" : "/clientes";
  const avatar = useAvatar(profile?.avatar_path, profile?.revision);
  function leaveSession() {
    if (
      window.dispatchEvent(
        new Event("adler:before-signout", { cancelable: true }),
      )
    )
      signOut();
  }
  useEffect(() => {
    if (state !== "authorized") return;
    let active = true;
    supabase
      .rpc("adler_portal_profile")
      .then(({ data, error: failure }) => {
        if (active) {
          setProfile(failure ? null : data);
          setError(failure ? portalError(failure) : "");
        }
      })
      .catch(() => {
        if (active) setError(portalError());
      });
    return () => {
      active = false;
    };
  }, [state, session?.user.id, retry]);
  if (state === "signed-out")
    return (
      <Navigate to={administration ? "/login" : "/clientes/acceso"} replace />
    );
  if (state === "denied" || state === "error")
    return (
      <section className="client-portal portal-gate">
        <h1>No se pudo abrir este espacio</h1>
        <p role="alert">
          {signOutError
            ? "No se pudo cerrar la sesión. Vuelve a intentarlo antes de dejar el equipo."
            : state === "denied"
              ? "Esta página requiere permisos de administración."
              : "No se pudo verificar tu acceso."}
        </p>
        <button className="portal-button" onClick={refreshAccess}>
          Reintentar
        </button>
        <button className="portal-text-button" onClick={signOut}>
          Cerrar sesión
        </button>
        <Link to="/clientes">Ir a mi espacio de cliente</Link>
      </section>
    );
  return (
    <section className="client-portal">
      <aside
        className={`portal-sidebar ${menuOpen ? "portal-menu-open" : ""}`}
        onClick={(event) => {
          if (event.target.closest("a")) setMenuOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <Link className="portal-brand" to="/">
          ADLER<span>INFRASTRUCTURA</span>
        </Link>
        <button
          className="portal-menu-toggle"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls={
            isAdmin
              ? "portal-extra-navigation portal-session-actions"
              : "portal-session-actions"
          }
          aria-label={
            menuOpen ? "Cerrar opciones del portal" : "Más opciones del portal"
          }
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <span className="portal-kicker">
          {administration ? "ATENCIÓN AL CLIENTE" : "MI ESPACIO"}
        </span>
        <nav aria-label="Área de clientes">
          <NavLink to={base} end>
            <FolderOpen size={19} />
            {administration ? "Solicitudes de clientes" : "Mis solicitudes"}
          </NavLink>
          {administration && (
            <NavLink to={`${base}/directorio`}>
              <Users size={19} />
              Directorio de clientes
            </NavLink>
          )}
          {!administration && (
            <>
              <NavLink to="/clientes/nueva">
                <Plus size={19} />
                Nueva consulta
              </NavLink>
              <NavLink to="/clientes/perfil">
                <UserRound size={19} />
                Mi perfil
              </NavLink>
            </>
          )}
        </nav>
        {isAdmin && (
          <div className="portal-admin-nav" id="portal-extra-navigation">
            <span className="portal-kicker">ADMINISTRACIÓN</span>
            <Link to="/dashboard">
              <LayoutDashboard size={17} />
              Consultas de la web
            </Link>
            <Link to={administration ? "/clientes" : "/dashboard/clientes"}>
              <ArrowUpRight size={17} />
              {administration ? "Mi espacio de cliente" : "Atender a clientes"}
            </Link>
          </div>
        )}
        <div className="portal-sidebar-bottom" id="portal-session-actions">
          <Link to="/">
            Volver a la web <ArrowUpRight size={16} />
          </Link>
          <button onClick={leaveSession} disabled={state === "loading"}>
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <div className="portal-main">
        <header className="portal-topbar">
          <span>
            {administration
              ? "Adler / Relaciones con clientes"
              : "Adler / Área de clientes"}
          </span>
          <Link to="/clientes/perfil" className="portal-identity">
            <span className="portal-avatar">
              {avatar ? (
                <img src={avatar} alt="Mi foto de perfil" />
              ) : (
                <UserRound size={20} />
              )}
            </span>
            <span>
              {profile?.full_name || session?.user.email || "Mi cuenta"}
            </span>
          </Link>
        </header>
        <div className="portal-content">
          {state === "loading" || (!profile && !error) ? (
            <p role="status" className="portal-loading">
              Preparando tu espacio…
            </p>
          ) : error ? (
            <div className="portal-empty">
              <h1>No pudimos cargar tu espacio</h1>
              <p role="alert">{error}</p>
              <button
                className="portal-button"
                onClick={() => setRetry((value) => value + 1)}
              >
                Reintentar
              </button>
            </div>
          ) : (
            <Routes>
              {administration && (
                <Route path="directorio" element={<ClientDirectory />} />
              )}
              {administration && (
                <Route
                  path="directorio/:clientId"
                  element={<ClientDirectoryProfile />}
                />
              )}
              <Route
                index
                element={
                  <RequestList administration={administration} base={base} />
                }
              />
              {!administration && (
                <Route path="nueva" element={<NewRequest />} />
              )}
              {!administration && (
                <Route
                  path="perfil"
                  element={
                    <ClientProfile profile={profile} onSaved={setProfile} />
                  }
                />
              )}
              <Route
                path="solicitudes/:requestId"
                element={
                  <RequestConversation
                    administration={administration}
                    base={base}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <div className="portal-empty">
                    <h1>Página no encontrada</h1>
                    <Link className="portal-button" to={base}>
                      Volver a las solicitudes
                    </Link>
                  </div>
                }
              />
            </Routes>
          )}
        </div>
        <footer className="portal-footer">
          Adler Infrastructura<span>Alemania · Venezuela</span>
        </footer>
      </div>
    </section>
  );
}
