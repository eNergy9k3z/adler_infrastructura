import Contact from "../components/Contact";
import "./ServiceDetail.css";
export default function Auditoria() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / REVISIÓN DE PROYECTOS</span>
          <h1>
            Una mirada al estado
            <br />
            de su proyecto.
          </h1>
          <p>
            Describa la situación técnica o contractual que necesita revisar. A
            partir de esa información podremos delimitar el alcance, los
            documentos necesarios y los siguientes pasos.
          </p>
        </div>
      </header>
      <Contact />
    </div>
  );
}
