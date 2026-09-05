import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
const criteria = [
  [
    "Alcance acordado",
    "Definir los entregables, la información necesaria y las responsabilidades antes de comenzar.",
  ],
  [
    "Trazabilidad documental",
    "Relacionar observaciones y recomendaciones con los documentos, datos y verificaciones que las sustentan.",
  ],
  [
    "Revisión del trabajo",
    "Comprobar los resultados y registrar los asuntos que requieren información adicional o revisión especializada.",
  ],
];
const Certificaciones = () => (
  <div className="adler-page">
    <header className="adler-page-intro">
      <div className="container">
        <span className="eyebrow">ADLER / FORMA DE TRABAJO</span>
        <h1>Criterios de gestión.</h1>
        <p>
          La calidad del asesoramiento empieza con información clara,
          responsabilidades definidas y resultados revisables.
        </p>
      </div>
    </header>
    <div className="container section">
      <div className="adler-criteria">
        {criteria.map(([title, desc]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <div className="adler-documents">
        <Link
          to="/certificaciones/documentos/politica-calidad"
          className="text-link"
        >
          Principios de calidad <ArrowUpRight size={18} />
        </Link>
        <Link
          to="/certificaciones/documentos/manual-buenas-practicas"
          className="text-link"
        >
          Buenas prácticas <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  </div>
);
export default Certificaciones;
