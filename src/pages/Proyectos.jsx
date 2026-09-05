import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
const areas = [
  [
    "Infraestructura privada",
    "Accesos, patios y estacionamientos",
    "Revisión de necesidades de mantenimiento y rehabilitación, con alternativas y criterios para contratar la intervención.",
    "vialidad",
  ],
  [
    "Empresas constructoras",
    "Ofertas, ejecución y cierre",
    "Apoyo para definir alcances, revisar cantidades y documentar cambios durante el desarrollo de una obra.",
    "contratos",
  ],
  [
    "Productos de construcción",
    "Selección y aplicación",
    "Comparación de soluciones técnicas y documentación para fundamentar la compra y la aplicación de materiales.",
    "materiales",
  ],
  [
    "Empresas de distintos sectores",
    "Procesos con inteligencia artificial",
    "Pilotos para organizar información, preparar documentos y apoyar tareas administrativas, con revisión de resultados.",
    "ia-construccion",
  ],
];
const Proyectos = () => (
  <div className="adler-page">
    <header className="adler-page-intro">
      <div className="container">
        <span className="eyebrow">ADLER / APLICACIONES</span>
        <h1>Ámbitos de intervención.</h1>
        <p>
          Situaciones en las que la asesoría técnica, contractual y tecnológica
          puede ayudar a tomar decisiones.
        </p>
      </div>
    </header>
    <div className="container section adler-reference-grid">
      {areas.map(([sector, title, description, id]) => (
        <article className="adler-reference-card" key={id}>
          <span className="eyebrow">{sector}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link to={`/servicios/${id}`} className="text-link">
            Explorar el servicio <ArrowUpRight size={18} />
          </Link>
        </article>
      ))}
    </div>
  </div>
);
export default Proyectos;
