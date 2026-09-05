import { Link, useParams } from "react-router-dom";
import { Printer } from "lucide-react";
import "./ServiceDetail.css";
const docs = {
  "politica-calidad": {
    title: "Principios de calidad",
    items: [
      [
        "Acordar el alcance",
        "Definir el objetivo, los entregables, los plazos y las responsabilidades con el cliente.",
      ],
      [
        "Trabajar con información identificable",
        "Relacionar los análisis con los documentos y datos utilizados, indicando las limitaciones de la información.",
      ],
      [
        "Revisar antes de entregar",
        "Comprobar la coherencia del trabajo y distinguir los resultados de las cuestiones pendientes.",
      ],
      [
        "Facilitar el siguiente paso",
        "Entregar recomendaciones comprensibles y una lista de acciones que el cliente pueda revisar.",
      ],
    ],
  },
  "manual-buenas-practicas": {
    title: "Buenas prácticas de consultoría",
    items: [
      [
        "Inicio del trabajo",
        "Confirmar el problema a resolver, el interlocutor y el medio de intercambio de información.",
      ],
      [
        "Gestión documental",
        "Identificar versiones, fechas y fuentes; registrar cambios y decisiones relevantes.",
      ],
      [
        "Uso de inteligencia artificial",
        "Definir la información que puede utilizarse y revisar las salidas antes de incorporarlas a un entregable.",
      ],
      [
        "Cierre",
        "Revisar los entregables con el cliente, documentar observaciones y acordar el seguimiento necesario.",
      ],
    ],
  },
};
export default function PrintableDoc() {
  const { docId } = useParams();
  const doc = Object.hasOwn(docs, docId) ? docs[docId] : null;
  return (
    <div className="adler-page">
      <style>{`@media print{.navbar,.footer,.whatsapp-float,.chat-button,.chat-window,.document-actions{display:none!important}.adler-page{background:white}.adler-page-intro{padding:0 0 20px;background:white}.adler-page .section{padding:25px 0}.adler-page .container{width:100%;max-width:none}@page{size:A4;margin:20mm}}`}</style>
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">
            ADLER INFRASTRUCTURA / DOCUMENTO DE REFERENCIA
          </span>
          <h1>{doc?.title || "Documento no encontrado"}</h1>
          {doc && (
            <p>
              Principios para organizar el trabajo de consultoría y concretar el
              alcance de cada colaboración.
            </p>
          )}
        </div>
      </header>
      <section className="container section profile-body-copy">
        {doc?.items.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
        <div className="adler-documents document-actions">
          <Link className="text-link" to="/certificaciones">
            ← Volver a criterios de gestión
          </Link>
          {doc && (
            <button className="btn btn-primary" onClick={() => window.print()}>
              <Printer size={18} />
              Imprimir o guardar PDF
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
