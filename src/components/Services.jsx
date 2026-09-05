import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import "./Services.css";
const steps = [
  [
    "Diagnóstico",
    "Identificar un proceso donde la IA tenga una aplicación útil y viable.",
  ],
  [
    "Implementación",
    "Probar herramientas con documentos y tareas de su empresa, y comprobar los resultados.",
  ],
  [
    "Formación",
    "Preparar al equipo para utilizar el proceso y revisar sus resultados con criterio.",
  ],
];
const Services = () => (
  <section id="inteligencia-artificial" className="section ai-section">
    <div className="container ai-layout">
      <div className="ai-intro">
        <span className="eyebrow">02 / Inteligencia artificial</span>
        <h2>
          La IA empieza con
          <br />
          un problema concreto.
        </h2>
        <p>
          Documentos dispersos, informes recurrentes, tareas administrativas.
          Ayudamos a empresas de distintos sectores a incorporar IA en su
          trabajo diario.
        </p>
        <Link to="/servicios/ia-construccion" className="ai-link">
          Conocer el servicio <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="ai-steps">
        {steps.map(([title, description], i) => (
          <div className="ai-step" key={title}>
            <span>0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <ArrowRight size={20} strokeWidth={1.2} />
          </div>
        ))}
        <p className="ai-note">
          Un piloto delimitado. Resultados revisables. Personas al mando.
        </p>
      </div>
    </div>
  </section>
);
export default Services;
