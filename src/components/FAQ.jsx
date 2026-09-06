import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import "./FAQ.css";

const questions = [
  [
    "¿Cómo se trabaja desde Alemania con un proyecto en Venezuela?",
    "La revisión documental y las reuniones pueden realizarse a distancia. Si el encargo necesita inspecciones, ensayos o trabajo presencial, se define quién los realiza y cómo se coordina su participación antes de acordar el alcance.",
  ],
  [
    "¿Qué información necesito para empezar?",
    "Indique la ubicación, la fase del proyecto y la decisión que necesita tomar. Según el caso, acordaremos después qué planos, presupuestos, contratos, fichas de materiales o ejemplos de su proceso conviene revisar.",
  ],
  [
    "¿Los servicios de inteligencia artificial son solo para constructoras?",
    "No. También trabajamos sobre procesos de empresas de otros sectores: consultar documentación, extraer datos y preparar borradores de informes. El primer paso es elegir una tarea concreta y definir cómo evaluar el piloto.",
  ],
  [
    "¿Cómo se define el precio de un encargo?",
    "Tras conocer la necesidad, se delimitan los entregables, la información disponible, el calendario y los honorarios en una propuesta. Enviar una consulta no formaliza una contratación.",
  ],
  [
    "¿Adler también suministra materiales o ejecuta obras?",
    "La oferta de esta web se centra en asesoría y coordinación. La compra de productos, su instalación y la ejecución de obra requieren un alcance y unas responsabilidades acordados por separado.",
  ],
  [
    "¿Necesito una cuenta para hacer una consulta?",
    "Puede utilizar el formulario de contacto sin crear una cuenta. Los clientes que ya tienen acceso pueden consultar el estado de sus solicitudes, conversar con Adler y actualizar sus datos desde su espacio privado.",
  ],
];

export default function FAQ() {
  return (
    <section
      className="section faq-section"
      id="preguntas"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-layout">
        <div className="faq-intro">
          <span className="eyebrow">ANTES DE EMPEZAR</span>
          <h2 id="faq-heading">
            Un alcance claro desde la primera conversación.
          </h2>
          <p>
            Respuestas para preparar su consulta y entender cómo podemos
            trabajar juntos.
          </p>
          <Link to="/#contacto" className="text-link">
            Plantear mi consulta <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
