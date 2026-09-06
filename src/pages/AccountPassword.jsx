import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { accessFeedback } from "../auth/accessFeedback";
import AccessFeedback from "../components/AccessFeedback";
import "./Login.css";

export default function AccountPassword() {
  const { state, session, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const pending = useRef(false);
  const authorized = state === "authorized";

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    if (authorized && password !== confirmation) {
      setFeedback({ tone: "error", title: "Las contraseñas no coinciden", message: "Escribe la misma contraseña en ambos campos." });
      return;
    }
    pending.current = true; setStatus("sending"); setFeedback(null);
    try {
      const { error } = authorized
        ? await supabase.auth.updateUser({ password })
        : await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/cuenta/contrasena` });
      if (error) {
        setStatus("idle");
        setFeedback(authorized ? {
          tone: "error", title: "Contraseña no guardada",
          reauthenticate: error.code === "reauthentication_needed",
          message: error.code === "weak_password" ? "Elige una contraseña más segura, con al menos 12 caracteres."
            : error.code === "same_password" ? "Esa contraseña ya está configurada. Puedes volver al panel."
              : error.code === "reauthentication_needed" ? "Necesitamos confirmar de nuevo tu acceso. Cierra esta sesión con el botón de abajo y solicita un enlace de recuperación."
              : "No se pudo guardar. Si tu sesión ha caducado, solicita un nuevo enlace de recuperación desde la página de acceso.",
        } : accessFeedback(error));
      } else {
        setStatus(authorized ? "password-saved" : "sent"); setPassword(""); setConfirmation("");
        setFeedback(authorized
          ? { tone: "success", title: "Contraseña guardada", message: "A partir de ahora puedes entrar con tu correo y esta contraseña, sin solicitar un enlace en cada visita." }
          : { tone: "success", title: "Solicitud aceptada", message: "Si tienes una cuenta de Adler, recibirás un correo para crear o recuperar tu contraseña. Abre el enlace más reciente y revisa también el correo no deseado." });
      }
    } catch (error) {
      setStatus("idle");
      setFeedback(authorized ? { tone: "error", title: "Contraseña no guardada", message: "Comprueba la conexión y vuelve a intentarlo." } : accessFeedback(error));
    } finally { pending.current = false; }
  }

  return <section className="private-login">
    <div className="container login-layout">
      <div className="login-intro">
        <span className="eyebrow">ADLER / TU CUENTA</span>
        <h1>Un acceso para cada día.</h1>
        <p>Crea una contraseña propia para entrar a Adler con tu correo habitual.</p>
        <Link to="/login">Volver al acceso <ArrowRight size={17} /></Link>
      </div>
      <div className="login-card">
        <LockKeyhole size={27} aria-hidden="true" />
        <h2>{authorized ? "Crear o cambiar contraseña" : "Crear o recuperar contraseña"}</h2>
        {state === "loading" ? <p role="status">Comprobando acceso…</p>
          : state === "denied" || state === "error" ? <>
              <p className="private-error" role="alert">{state === "denied" ? "Esta cuenta no tiene acceso a la administración de Adler." : "No se pudo comprobar tu acceso."}</p>
              <Link className="private-link-button" to="/login">Revisar acceso</Link>
            </> : <>
              <p>{authorized ? `Cuenta: ${session.user.email}. Usa una contraseña propia para Adler, de al menos 12 caracteres.`
                : "Primero confirmaremos tu acceso mediante un correo. Después podrás elegir tu contraseña de Adler."}</p>
              {status !== "password-saved" && <form onSubmit={submit}>
                {authorized ? <>
                  <label htmlFor="new-password">Nueva contraseña de Adler</label>
                  <input id="new-password" type="password" autoComplete="new-password" required minLength={12} maxLength={128}
                    value={password} onChange={(e) => setPassword(e.target.value)} disabled={status === "sending"} />
                  <label htmlFor="confirm-password">Repetir contraseña</label>
                  <input id="confirm-password" type="password" autoComplete="new-password" required minLength={12} maxLength={128}
                    value={confirmation} onChange={(e) => setConfirmation(e.target.value)} disabled={status === "sending"} />
                </> : <>
                  <label htmlFor="reset-email">Correo de acceso</label>
                  <input id="reset-email" type="email" autoComplete="email" required maxLength={200}
                    value={email} onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setFeedback(null); }} disabled={status === "sending"} />
                </>}
                <button className="btn btn-primary" disabled={status === "sending" || (!authorized && status === "sent")}>
                  {status === "sending" ? "Comprobando…" : authorized ? "Guardar contraseña" : "Recibir enlace para crear contraseña"}
                </button>
              </form>}
              <AccessFeedback feedback={feedback} />
              {authorized && feedback?.reauthenticate && <button className="private-link-button" type="button" onClick={async () => {
                setEmail(session.user.email); setPassword(""); setConfirmation(""); setFeedback(null); setStatus("idle");
                await signOut();
              }}>Cerrar sesión para recuperar acceso</button>}
              {authorized && <Link className="private-link-button" to="/dashboard">Entrar al panel</Link>}
            </>}
      </div>
    </div>
  </section>;
}
