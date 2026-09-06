import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { accessFeedback } from "../auth/accessFeedback";
import AccessFeedback from "../components/AccessFeedback";
import "./Login.css";

export default function Login() {
  const { state, signOut, refreshAccess, signOutError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("password");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const pending = useRef(false);
  if (state === "authorized") return <Navigate to="/dashboard" replace />;

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("sending");
    setFeedback(null);
    try {
      const { error } =
        mode === "password"
          ? await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            })
          : await supabase.auth.signInWithOtp({
              email: email.trim(),
              options: {
                shouldCreateUser: false,
                emailRedirectTo: `${window.location.origin}/login`,
              },
            });
      if (error) {
        setStatus("idle");
        setFeedback(accessFeedback(error, mode));
      } else {
        setStatus("sent");
        setPassword("");
        if (mode === "email")
          setFeedback({
            tone: "success",
            title: "Solicitud aceptada",
            message:
              "Si el correo tiene acceso, recibirás un enlace. Revisa también la carpeta de correo no deseado.",
          });
      }
    } catch (error) {
      setStatus("idle");
      setFeedback(accessFeedback(error, mode));
    } finally {
      pending.current = false;
    }
  }

  function switchMode() {
    setMode(mode === "password" ? "email" : "password");
    setPassword("");
    setFeedback(null);
    setStatus("idle");
  }

  return (
    <section className="private-login">
      <div className="container login-layout">
        <div className="login-intro">
          <span className="eyebrow">ADLER / ACCESO PRIVADO</span>
          <h1>Un espacio para dar seguimiento.</h1>
          <p>
            Las consultas de Adler, su estado y los próximos pasos, en un solo
            lugar.
          </p>
          <Link to="/">
            Volver a la página de Adler <ArrowRight size={17} />
          </Link>
        </div>
        <div className="login-card">
          <LockKeyhole size={27} aria-hidden="true" />
          <h2>Administración de consultas</h2>
          {state === "loading" ? (
            <p role="status">Comprobando acceso…</p>
          ) : state === "denied" || state === "error" ? (
            <>
              <p className="private-error" role="alert">
                {signOutError
                  ? "No se pudo cerrar la sesión. Comprueba la conexión y vuelve a intentarlo antes de dejar este equipo."
                  : state === "denied"
                    ? "Esta cuenta no tiene acceso al panel de Adler."
                    : "No se pudo comprobar tu acceso. Inténtalo de nuevo."}
              </p>
              {state === "error" && !signOutError && (
                <button className="btn btn-primary" onClick={refreshAccess}>
                  Reintentar
                </button>
              )}
              <button className="private-link-button" onClick={signOut}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <p>
                {mode === "password"
                  ? "Entra con tu correo autorizado y tu contraseña de Adler."
                  : "Recibe un enlace de acceso en tu correo autorizado."}
              </p>
              <form onSubmit={submit}>
                <label htmlFor="access-email">Correo de acceso</label>
                <input
                  id="access-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFeedback(null);
                    setStatus("idle");
                  }}
                  required
                  maxLength={200}
                  disabled={status === "sending"}
                />
                {mode === "password" && (
                  <>
                    <label htmlFor="access-password">Contraseña de Adler</label>
                    <input
                      id="access-password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFeedback(null);
                      }}
                      required
                      maxLength={128}
                      disabled={status === "sending"}
                    />
                  </>
                )}
                <button
                  className="btn btn-primary"
                  disabled={status === "sending" || status === "sent"}
                >
                  {mode === "email" ? (
                    <Mail size={18} />
                  ) : (
                    <LockKeyhole size={18} />
                  )}
                  {status === "sending"
                    ? "Comprobando…"
                    : mode === "password"
                      ? "Entrar al panel"
                      : "Recibir enlace de acceso"}
                </button>
              </form>
              <AccessFeedback feedback={feedback} />
              <div className="login-options">
                <Link to="/cuenta/contrasena">
                  Crear o recuperar contraseña
                </Link>
                <button
                  type="button"
                  onClick={switchMode}
                  disabled={status === "sending"}
                >
                  {mode === "password"
                    ? "Entrar con un enlace por correo"
                    : "Entrar con contraseña"}
                </button>
              </div>
              <p className="login-small">
                Acceso exclusivo para la administración de Adler. Si eres
                cliente, entra en{" "}
                <Link to="/clientes/acceso">tu espacio de cliente</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
