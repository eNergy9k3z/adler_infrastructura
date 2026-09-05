import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
const values = [
  [
    "Claridad",
    "Explicar el alcance, los supuestos y los límites de cada recomendación con un lenguaje que facilite decidir.",
  ],
  [
    "Rigor",
    "Revisar la información disponible, identificar lo que falta y documentar el fundamento del trabajo.",
  ],
  [
    "Independencia de criterio",
    "Comparar alternativas según las necesidades del proyecto y hacer explícitos los criterios de selección.",
  ],
  [
    "Colaboración",
    "Trabajar con el cliente y coordinar la participación de especialistas cuando el alcance lo requiera.",
  ],
  [
    "Responsabilidad",
    "Distinguir entre datos comprobados, estimaciones y asuntos pendientes antes de proponer una decisión.",
  ],
  [
    "Innovación útil",
    "Aplicar herramientas digitales e inteligencia artificial a tareas concretas, con revisión humana y evaluación de resultados.",
  ],
];
export default function Valores() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / PRINCIPIOS</span>
          <h1>Una forma de trabajar.</h1>
          <p>
            El valor de una consultoría está en ayudar al cliente a entender su
            situación y dar el siguiente paso con criterio.
          </p>
        </div>
      </header>
      <section className="container section">
        <div className="adler-reference-grid">
          {values.map(([title, text]) => (
            <article className="adler-reference-card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="adler-documents">
          <Link to="/#contacto" className="text-link">
            Conversemos sobre su proyecto <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
