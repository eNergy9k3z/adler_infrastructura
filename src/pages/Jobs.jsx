import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
export default function Jobs() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / COLABORACIÓN</span>
          <h1>Conectar conocimientos.</h1>
          <p>
            La colaboración con profesionales de distintas disciplinas permite
            definir mejor el alcance de cada proyecto.
          </p>
        </div>
      </header>
      <section className="container section profile-body-copy">
        <h2>Cuéntenos sobre su experiencia.</h2>
        <p>
          Si trabaja en construcción, materiales, gestión de proyectos o
          aplicación de inteligencia artificial y quiere proponer una
          colaboración, puede presentarse mediante el formulario de contacto.
        </p>
        <p>
          Indique su especialidad, ubicación y el tipo de trabajo en el que
          podría participar.
        </p>
        <div className="adler-documents">
          <Link className="btn btn-primary" to="/#contacto">
            Proponer una colaboración <ArrowUpRight size={18} />
          </Link>
          <Link to="/#servicios" className="text-link">
            Conocer nuestros servicios <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
