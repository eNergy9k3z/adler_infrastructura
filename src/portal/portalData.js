export const portalServices = {
  general: "Consulta general",
  vialidad: "Infraestructura vial",
  contratos: "Gestión contractual",
  materiales: "Materiales y soluciones",
  ia: "Inteligencia artificial",
};
export const portalStatuses = {
  nueva: "Recibida",
  revision: "En revisión",
  curso: "En curso",
  espera: "Esperando tu respuesta",
  resuelta: "Resuelta",
  cerrada: "Cerrada",
};
export const portalDate = (value) =>
  new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
export function portalError(
  error,
  fallback = "No se pudo completar la operación. Revisa la conexión e inténtalo de nuevo.",
) {
  if (error?.code === "40001")
    return "Hay cambios más recientes. Actualiza la página antes de guardar; tu texto sigue aquí para que puedas copiarlo.";
  if (error?.code === "42501")
    return "No tienes acceso a esta información. Comprueba que hayas verificado tu correo e iniciado sesión con la cuenta correcta.";
  if (error?.code === "P0001") return error.message;
  if (error?.code === "23514")
    return "Revisa los campos: hay un dato vacío, demasiado largo o con un formato no permitido.";
  return fallback;
}
