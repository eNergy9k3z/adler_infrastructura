import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./Solutions.css";
const areas = [
  {
    id: "vialidad",
    n: "01",
    title: "Infraestructura vial",
    desc: "Criterios para planificar, rehabilitar y conservar vías, accesos y pavimentos.",
    items: "Revisión técnica · Alternativas de intervención · Control de obra",
  },
  {
    id: "contratos",
    n: "02",
    title: "Gestión contractual",
    desc: "Alcances definidos y documentación ordenada para tomar decisiones durante la obra.",
    items: "Presupuestos · Valuaciones · Modificaciones y reclamaciones",
  },
  {
    id: "materiales",
    n: "03",
    title: "Materiales y soluciones",
    desc: "Selección técnica de productos según su aplicación, disponibilidad y mantenimiento.",
    items: "Especificaciones · Comparación de ofertas · Apoyo a la aplicación",
  },
  {
    id: "ia-construccion",
    n: "04",
    title: "IA aplicada a empresas",
    desc: "Herramientas de inteligencia artificial integradas en procesos concretos de su negocio.",
    items: "Diagnóstico · Pilotos de implementación · Formación",
  },
];
const Solutions = () => (
  <section id="servicios" className="section solutions-section">
    <div className="container">
      <div className="section-intro">
        <div>
          <span className="eyebrow">01 / Áreas de asesoría</span>
          <h2>
            Conocimiento que se convierte
            <br />
            en decisiones.
          </h2>
        </div>
        <p>
          Acompañamos a quienes construyen, contratan y dirigen empresas. Cada
          encargo parte de un problema concreto y un alcance acordado.
        </p>
      </div>
      <div className="adler-services">
        {areas.map((area) => (
          <Link
            className="adler-service"
            to={`/servicios/${area.id}`}
            key={area.id}
          >
            <div className="service-row-top">
              <span className="service-number">{area.n}</span>
              <ArrowUpRight size={23} strokeWidth={1.4} />
            </div>
            <h3>{area.title}</h3>
            <p>{area.desc}</p>
            <span className="service-deliverables">{area.items}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
export default Solutions;
