import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import "./Login.css";
export default function Login() {
  const { state, signOut, refreshAccess, signOutError } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const pending = useRef(false);
  if (state === "authorized") return <Navigate to="/dashboard" replace />;
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("sending");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      let nextStatus = "sent";
      if (error) {
        if (["signup_disabled", "user_not_found"].includes(error.code)) {
          nextStatus = "invitation";
        } else if (error.code === "over_email_send_rate_limit") {
          nextStatus = "email-limit";
        } else if (
          error.code === "over_request_rate_limit" ||
          error.status === 429
        ) {
          nextStatus = "request-limit";
        } else {
          nextStatus = "error";
        }
      }
      setStatus(nextStatus);
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
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
              <p role="alert">
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
                Introduce tu correo autorizado. Recibirás un enlace para entrar
                sin contraseña.
              </p>
              <form onSubmit={submit}>
                <label htmlFor="access-email">Correo de acceso</label>
                <input
                  id="access-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                  }}
                  required
                  maxLength={200}
                  disabled={status === "sending"}
                />
                <button
                  className="btn btn-primary"
                  disabled={status === "sending" || status === "sent"}
                >
                  <Mail size={18} />
                  {status === "sending"
                    ? "Solicitando enlace…"
                    : "Recibir enlace de acceso"}
                </button>
              </form>
              {status === "sent" && (
                <p className="private-notice" role="status">
                  Si el correo tiene acceso, recibirás un enlace. Revisa también
                  la carpeta de correo no deseado y ábrelo en este navegador.
                </p>
              )}
              {status === "error" && (
                <p className="private-error" role="alert">
                  No se pudo solicitar el enlace. Comprueba el correo o espera
                  unos minutos antes de intentarlo de nuevo.
                </p>
              )}
              {status === "invitation" && (
                <p className="private-notice" role="alert">
                  El acceso requiere una invitación de Adler. Para tu primera
                  entrada, abre el enlace de invitación más reciente que recibiste
                  por correo.
                </p>
              )}
              {status === "email-limit" && (
                <p className="private-notice" role="alert">
                  Se alcanzó temporalmente el límite de envío de enlaces. Revisa
                  tu correo: si tienes un enlace reciente sin usar, puedes
                  abrirlo. Si necesitas otro, vuelve a intentarlo más tarde.
                </p>
              )}
              {status === "request-limit" && (
                <p className="private-notice" role="alert">
                  Se han realizado demasiados intentos seguidos. Espera unos
                  minutos antes de volver a solicitar el enlace.
                </p>
              )}
              <p className="login-small">
                Acceso exclusivo para la administración de Adler. Para consultar
                un proyecto, <Link to="/#contacto">escríbenos aquí</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
