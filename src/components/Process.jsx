import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Process.css";
const steps = [
  [
    "Definir la necesidad",
    "Revisamos la situación, los documentos disponibles y la decisión que necesita tomar. Acordamos un alcance de trabajo.",
  ],
  [
    "Preparar la solución",
    "Desarrollamos el análisis, las comparativas o el piloto. Incorporamos verificaciones de campo cuando el proyecto las requiere.",
  ],
  [
    "Entregar y acompañar",
    "Presentamos los resultados y definimos los siguientes pasos, con responsables y criterios para evaluar los avances.",
  ],
];
const Process = () => (
  <section id="metodo" className="section process-section">
    <div className="container">
      <div className="section-intro">
        <div>
          <span className="eyebrow">04 / Cómo trabajamos</span>
          <h2>
            Un alcance claro.
            <br />
            Un trabajo que puede revisar.
          </h2>
        </div>
        <div>
          <p>
            La relación empieza por entender qué necesita resolver. A partir de
            ahí, acordamos los entregables y la forma de trabajo.
          </p>
          <Link to="/#contacto" className="text-link">
            Plantear una consulta <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      <div className="process-grid">
        {steps.map(([title, desc], i) => (
          <article className="process-step" key={title}>
            <span className="process-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default Process;
