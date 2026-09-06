import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Check, LockKeyhole, Save, UserRound } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { useAvatar } from "./useAvatar";
import { useUnsavedForm } from "./useUnsavedForm";
import { portalError } from "./portalData";
const profileFields = [
  ["full_name", "Nombre y apellidos", 120, "name"],
  ["company", "Empresa u organización", 160, "organization"],
  ["job_title", "Cargo o profesión", 120, "organization-title"],
  ["phone", "Teléfono", 40, "tel"],
  ["country", "País", 80, "country-name"],
  ["city", "Ciudad", 100, "address-level2"],
  ["website", "Página web", 250, "url"],
];
const pickFields = (profile) =>
  Object.fromEntries(
    [...profileFields.map(([key]) => key), "bio"].map((key) => [
      key,
      profile[key] || "",
    ]),
  );

export default function ClientProfile({ profile, onSaved }) {
  const { session } = useAuth();
  const [form, setForm] = useState(() => pickFields(profile));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [removePhoto, setRemovePhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailNotice, setEmailNotice] = useState("");
  const [emailError, setEmailError] = useState("");
  const pending = useRef(false);
  const fileInput = useRef(null);
  const avatar = useAvatar(profile.avatar_path, profile.revision);
  const dirty =
    JSON.stringify(form) !== JSON.stringify(pickFields(profile)) ||
    Boolean(file) ||
    removePhoto;
  useUnsavedForm(dirty);
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  async function choosePhoto(event) {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;
    setError("");
    setNotice("");
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(selected.type) ||
      selected.size > 2097152
    ) {
      setError("Elige una imagen JPG, PNG o WebP de hasta 2 MB.");
      return;
    }
    try {
      const image = await createImageBitmap(selected);
      if (image.width > 8000 || image.height > 8000) {
        image.close();
        throw new Error("size");
      }
      image.close();
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setRemovePhoto(false);
    } catch {
      setError(
        "No pudimos abrir esa imagen. Prueba con otra foto de hasta 8.000 píxeles por lado.",
      );
    }
  }
  async function save(event) {
    event.preventDefault();
    if (pending.current) return;
    if (!form.full_name.trim()) {
      setError("Escribe tu nombre.");
      return;
    }
    pending.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    let uploadedPath = null;
    try {
      let path = removePhoto ? null : profile.avatar_path;
      if (file) {
        path = `${session.user.id}/${crypto.randomUUID()}`;
        const { error: uploadError } = await supabase.storage
          .from("adler-avatars")
          .upload(path, file, {
            upsert: false,
            contentType: file.type,
            cacheControl: "0",
          });
        if (uploadError) throw uploadError;
        uploadedPath = path;
      }
      const { data, error: failure } = await supabase.rpc(
        "adler_portal_save_profile",
        {
          p_revision: profile.revision,
          p_profile: { ...form, avatar_path: path },
        },
      );
      if (failure) throw failure;
      onSaved(data);
      setForm(pickFields(data));
      setFile(null);
      setPreview("");
      setRemovePhoto(false);
      setNotice("Perfil actualizado.");
      if (profile.avatar_path && profile.avatar_path !== path) {
        const { error: removeError } = await supabase.storage
          .from("adler-avatars")
          .remove([profile.avatar_path]);
        if (removeError)
          setNotice(
            "Perfil actualizado. No se pudo eliminar la versión anterior de la foto, que permanece privada.",
          );
      }
    } catch (failure) {
      if (uploadedPath && ["40001", "23514", "42501"].includes(failure?.code)) {
        await supabase.storage
          .from("adler-avatars")
          .remove([uploadedPath])
          .catch(() => {});
      }
      setError(portalError(failure));
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  async function changeEmail(event) {
    event.preventDefault();
    if (emailBusy) return;
    setEmailBusy(true);
    setEmailError("");
    setEmailNotice("");
    try {
      const { error: failure } = await supabase.auth.updateUser(
        { email: email.trim() },
        { emailRedirectTo: `${window.location.origin}/clientes/acceso` },
      );
      if (failure) throw failure;
      setEmailNotice(
        "Cambio solicitado. Revisa el correo actual y el nuevo, y completa las confirmaciones que recibas. El correo de acceso no cambia hasta terminar la verificación.",
      );
      setEmail("");
    } catch {
      setEmailError(
        "No se pudo solicitar el cambio. Revisa el correo o inténtalo más tarde; el servicio de envío puede estar limitado.",
      );
    } finally {
      setEmailBusy(false);
    }
  }
  return (
    <>
      <div className="portal-heading">
        <div>
          <span className="portal-kicker">TU CUENTA EN ADLER</span>
          <h1>Mi perfil</h1>
          <p>Tu información de contacto, siempre al día.</p>
        </div>
      </div>
      <div className="portal-profile-layout">
        <form className="portal-card portal-form" onSubmit={save}>
          <div className="portal-photo-editor">
            <span className="portal-avatar large">
              {!removePhoto && (preview || avatar) ? (
                <img src={preview || avatar} alt="Vista previa de mi foto" />
              ) : (
                <UserRound size={40} />
              )}
            </span>
            <div>
              <h2>Foto de perfil</h2>
              <p className="portal-hint">JPG, PNG o WebP · Hasta 2 MB</p>
              <input
                ref={fileInput}
                className="sr-only"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label="Seleccionar foto de perfil"
                onChange={choosePhoto}
                disabled={busy}
              />
              <button
                type="button"
                className="portal-button secondary"
                onClick={() => fileInput.current?.click()}
                disabled={busy}
              >
                <Camera size={17} />
                Cambiar foto
              </button>
              {(file || profile.avatar_path) && !removePhoto && (
                <button
                  type="button"
                  className="portal-text-button"
                  disabled={busy}
                  onClick={() => {
                    setRemovePhoto(true);
                    setFile(null);
                    setPreview("");
                  }}
                >
                  Quitar foto
                </button>
              )}
            </div>
          </div>
          <div className="portal-form-grid">
            {profileFields.map(([key, label, maxLength, autoComplete]) => (
              <label key={key}>
                {label}
                <input
                  value={form[key]}
                  onChange={(e) =>
                    setForm((values) => ({ ...values, [key]: e.target.value }))
                  }
                  required={key === "full_name"}
                  type={
                    key === "website" ? "url" : key === "phone" ? "tel" : "text"
                  }
                  maxLength={maxLength}
                  autoComplete={autoComplete}
                  disabled={busy}
                  placeholder={key === "website" ? "https://" : undefined}
                />
              </label>
            ))}
          </div>
          <label>
            Sobre ti o tu empresa
            <textarea
              rows={4}
              value={form.bio}
              maxLength={1000}
              onChange={(e) =>
                setForm((values) => ({ ...values, bio: e.target.value }))
              }
              disabled={busy}
            />
          </label>
          <span className="portal-hint">
            {form.bio.length} / 1.000 caracteres
          </span>
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
          <div className="portal-save-row">
            <span className="portal-hint">
              {dirty
                ? "Tienes cambios sin guardar."
                : "Tu perfil está actualizado."}
            </span>
            <button className="portal-button" disabled={busy || !dirty}>
              <Save size={17} />
              {busy ? "Guardando…" : "Guardar perfil"}
            </button>
          </div>
        </form>
        <aside className="portal-profile-security">
          <section className="portal-card">
            <LockKeyhole size={24} />
            <h2>Acceso y seguridad</h2>
            <p className="portal-hint">Correo de acceso</p>
            <p className="portal-account-email">{session.user.email}</p>
            <Link className="portal-button secondary" to="/clientes/contrasena">
              Cambiar contraseña
            </Link>
          </section>
          <form className="portal-card portal-form" onSubmit={changeEmail}>
            <h2>Cambiar mi correo</h2>
            <p className="portal-hint">
              Verificaremos la nueva dirección antes de usarla para entrar.
            </p>
            <label>
              Nuevo correo electrónico
              <input
                type="email"
                autoComplete="email"
                value={email}
                maxLength={200}
                required
                disabled={emailBusy}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {emailError && (
              <p className="portal-error" role="alert">
                {emailError}
              </p>
            )}
            {emailNotice && (
              <p className="portal-success" role="status">
                {emailNotice}
              </p>
            )}
            <button
              className="portal-button secondary"
              disabled={
                emailBusy ||
                !email.trim() ||
                email.trim().toLowerCase() === session.user.email.toLowerCase()
              }
            >
              {emailBusy ? "Solicitando…" : "Solicitar cambio"}
            </button>
          </form>
          <p className="portal-hint">
            Solo tú y el equipo de Adler podéis consultar tu perfil. Tu foto no
            se publica en la web.
          </p>
        </aside>
      </div>
    </>
  );
}
