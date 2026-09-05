// The public guide runs locally. No external AI service is configured.
export default function handler(_request, response) {
  response.setHeader("Cache-Control", "no-store");
  return response
    .status(410)
    .json({ error: "Este servicio no está disponible." });
}
