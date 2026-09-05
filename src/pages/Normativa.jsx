import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
const topics = [
  [
    "Requisitos del proyecto",
    "Identificar las especificaciones, los documentos contractuales y las referencias aplicables al alcance acordado.",
  ],
  [
    "Condiciones de la obra",
    "Relacionar la propuesta con el uso previsto, el estado de la infraestructura y la información técnica disponible.",
  ],
  [
    "Comparación de alternativas",
    "Revisar materiales y soluciones con criterios explícitos de aplicación, ejecución, mantenimiento y coste.",
  ],
  [
    "Documentación de la decisión",
    "Registrar fuentes, supuestos y verificaciones necesarias para que el cliente pueda revisar la recomendación.",
  ],
];
export default function Normativa() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / CRITERIO TÉCNICO</span>
          <h1>
            La solución empieza
            <br />
            por el contexto.
          </h1>
          <p>
            Los conocimientos de construcción en Alemania aportan una
            perspectiva para estudiar soluciones en Venezuela. Cada proyecto
            necesita su propia evaluación.
          </p>
        </div>
      </header>
      <section className="container section">
        <div className="adler-reference-grid">
          {topics.map(([title, text]) => (
            <article className="adler-reference-card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="adler-documents">
          <Link to="/servicios/materiales" className="text-link">
            Materiales y soluciones constructivas <ArrowUpRight size={18} />
          </Link>
          <Link to="/#contacto" className="text-link">
            Consultar un caso <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
