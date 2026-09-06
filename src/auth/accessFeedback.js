export function accessFeedback(error, action = "email") {
  if (error?.code === "over_email_send_rate_limit") {
    return { tone: "warning", title: "Enlace no enviado", message: "Se alcanzó temporalmente el límite de envío de enlaces. Si tienes un enlace reciente sin usar, puedes abrirlo. Si ya tienes contraseña, vuelve al acceso e introduce tu correo y contraseña." };
  }
  if (error?.code === "over_request_rate_limit" || error?.status === 429) {
    return { tone: "warning", title: "Demasiados intentos", message: "Espera unos minutos antes de volver a intentarlo." };
  }
  if (["signup_disabled", "user_not_found", "email_not_confirmed"].includes(error?.code)) {
    return { tone: "warning", title: "Invitación necesaria", message: "Para tu primera entrada, abre la invitación más reciente de Adler que recibiste por correo." };
  }
  return {
    tone: "error",
    title: action === "password" ? "No se pudo iniciar sesión" : "Enlace no enviado",
    message: action === "password" && error?.code === "invalid_credentials"
      ? "El correo o la contraseña no son correctos. Si todavía no has creado una contraseña para Adler, utiliza «Crear o recuperar contraseña»."
      : "No se pudo completar la solicitud. Comprueba la conexión y vuelve a intentarlo.",
  };
}
