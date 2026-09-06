import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  LockKeyhole,
  MessageSquare,
  FolderOpen,
  UserRound,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "../supabaseClient";
import AccessFeedback from "../components/AccessFeedback";
import { accessFeedback } from "../auth/accessFeedback";
import "./Portal.css";
const registrationEnabled =
  import.meta.env.VITE_CLIENT_REGISTRATION_ENABLED === "true";

export default function ClientAccess({ register = false }) {
  const { state, signOut, refreshAccess, signOutError } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sent, setSent] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const pending = useRef(false);
  if (state === "authorized") return <Navigate to="/clientes" replace />;
  async function submit(event) {
    event.preventDefault();
    if (pending.current || (register && !registrationEnabled)) return;
    if (register && (!name.trim() || password !== confirmation)) {
      setFeedback({
        tone: "error",
        title: "Revisa tus datos",
        message: !name.trim()
          ? "Escribe tu nombre."
          : "Las dos contraseñas deben coincidir.",
      });
      return;
    }
    pending.current = true;
    setBusy(true);
    setFeedback(null);
    try {
      const { error } = register
        ? await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: { full_name: name.trim() },
              emailRedirectTo: `${window.location.origin}/clientes/acceso`,
            },
          })
        : await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
      if (error) {
        let message = accessFeedback(error, "password");
        if (error.code === "email_not_confirmed") {
          setNeedsConfirmation(true);
          message = {
            tone: "warning",
            title: "Verifica tu correo",
            message:
              "Abre el enlace de confirmación antes de entrar. Si no lo encuentras, puedes solicitar otro debajo.",
          };
        }
        if (
          register &&
          [
            "email_address_not_authorized",
            "unexpected_failure",
            "email_send_failed",
            "signup_disabled",
            "over_email_send_rate_limit",
          ].includes(error.code)
        ) {
          message = {
            tone: "warning",
            title: "No se pudo enviar la confirmación",
            message:
              "El servicio de correo de Adler todavía no permite completar este registro. Puedes contactarnos desde la web; no necesitas volver a enviar el formulario.",
          };
        } else if (register && error.code === "weak_password") {
          message = {
            tone: "error",
            title: "Revisa la contraseña",
            message: "Utiliza una contraseña propia de al menos 12 caracteres.",
          };
        }
        setFeedback(message);
      } else if (register) {
        setSent(true);
        setPassword("");
        setConfirmation("");
        setFeedback({
          tone: "success",
          title: "Revisa tu correo",
          message:
            "Si el registro puede completarse con este correo, recibirás un enlace para verificarlo. Si ya tienes cuenta, entra con tu contraseña o recupérala. Revisa también el correo no deseado.",
        });
      } else {
        setPassword("");
      }
    } catch (error) {
      setFeedback(accessFeedback(error, "password"));
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  async function resend() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setFeedback(null);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/clientes/acceso`,
        },
      });
      if (error) throw error;
      setNeedsConfirmation(false);
      setFeedback({
        tone: "success",
        title: "Solicitud aceptada",
        message:
          "Si tu cuenta necesita confirmación, recibirás otro correo. Abre el enlace más reciente.",
      });
    } catch {
      setFeedback({
        tone: "warning",
        title: "No se pudo reenviar la confirmación",
        message:
          "El envío de correo está limitado temporalmente. Revisa el mensaje más reciente o contacta con Adler desde la web.",
      });
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="client-access">
      <div className="client-access-story">
        <span className="eyebrow">ADLER / ÁREA DE CLIENTES</span>
        <h1>
          Tu contacto con Adler,
          <br />
          en un solo lugar.
        </h1>
        <p>Desde la primera pregunta hasta el seguimiento de tu solicitud.</p>
        <ul>
          <li>
            <FolderOpen />
            <span>Consulta tus solicitudes y su estado.</span>
          </li>
          <li>
            <MessageSquare />
            <span>Haz preguntas y recibe respuestas de Adler.</span>
          </li>
          <li>
            <UserRound />
            <span>Mantén tu perfil y tus datos al día.</span>
          </li>
        </ul>
        <Link to="/">
          Volver a Adler <ArrowRight size={17} />
        </Link>
      </div>
      <div className="client-access-form">
        <span className="portal-kicker">
          {register ? "CREA TU CUENTA" : "BIENVENIDO A ADLER"}
        </span>
        <h2>
          {register ? "Empecemos por conocernos." : "Entrar a mi espacio"}
        </h2>
        {state === "loading" ? (
          <p role="status">Comprobando tu sesión…</p>
        ) : state === "error" ? (
          <>
            <p role="alert">
              {signOutError
                ? "No se pudo cerrar la sesión. Vuelve a intentarlo antes de dejar el equipo."
                : "No se pudo comprobar tu sesión."}
            </p>
            <button className="portal-button" onClick={refreshAccess}>
              Reintentar
            </button>
            <button className="portal-text-button" onClick={signOut}>
              Cerrar sesión
            </button>
          </>
        ) : register && !registrationEnabled ? (
          <div className="client-registration-pending">
            <FolderOpen size={30} strokeWidth={1.5} />
            <h3>Registro de nuevas cuentas en preparación</h3>
            <p>
              Estamos terminando la activación del correo de verificación.
              Mientras tanto, puede plantear su consulta mediante el formulario
              de contacto, sin crear una cuenta.
            </p>
            <Link className="portal-button" to="/#contacto">
              Plantear una consulta <ArrowRight size={17} />
            </Link>
            <p>
              ¿Ya tiene una cuenta?{" "}
              <Link className="portal-text-button" to="/clientes/acceso">
                Iniciar sesión
              </Link>
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={submit}>
              {register && (
                <label>
                  Nombre y apellidos
                  <input
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={120}
                    disabled={busy || sent}
                  />
                </label>
              )}
              <label>
                Correo electrónico
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={200}
                  disabled={busy || sent}
                />
              </label>
              {!sent && (
                <>
                  <label>
                    Contraseña de Adler
                    <input
                      type="password"
                      autoComplete={
                        register ? "new-password" : "current-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={register ? 12 : undefined}
                      maxLength={128}
                      disabled={busy}
                    />
                  </label>
                  {register && (
                    <>
                      <span className="portal-hint">
                        Al menos 12 caracteres.
                      </span>
                      <label>
                        Repetir contraseña
                        <input
                          type="password"
                          autoComplete="new-password"
                          value={confirmation}
                          onChange={(e) => setConfirmation(e.target.value)}
                          required
                          minLength={12}
                          maxLength={128}
                          disabled={busy}
                        />
                      </label>
                    </>
                  )}
                  <button className="portal-button" disabled={busy}>
                    <LockKeyhole size={17} />
                    {busy
                      ? "Comprobando…"
                      : register
                        ? "Crear mi cuenta"
                        : "Entrar"}
                  </button>
                </>
              )}
            </form>
            <AccessFeedback feedback={feedback} />
            {(needsConfirmation || sent) && (
              <button
                type="button"
                className="portal-text-button"
                onClick={resend}
                disabled={busy}
              >
                Reenviar correo de verificación
              </button>
            )}
            <div className="client-access-links">
              {!register && (
                <Link to="/clientes/contrasena">He olvidado mi contraseña</Link>
              )}
              <p>
                {register ? "¿Ya tienes cuenta?" : "¿Es tu primera visita?"}{" "}
                <Link to={register ? "/clientes/acceso" : "/clientes/registro"}>
                  {register
                    ? "Iniciar sesión"
                    : registrationEnabled
                      ? "Crear una cuenta"
                      : "Información sobre nuevas cuentas"}
                </Link>
              </p>
              {sent && (
                <Link to="/clientes/contrasena">Recuperar contraseña</Link>
              )}
            </div>
            {register && (
              <p className="portal-hint">
                Usaremos tus datos para gestionar tu cuenta y atender tus
                consultas. Tu perfil y tus conversaciones son visibles para ti y
                el equipo de Adler.
              </p>
            )}
          </>
        )}
        <Link className="client-admin-link" to="/login">
          Acceso de administración
        </Link>
      </div>
    </section>
  );
}
