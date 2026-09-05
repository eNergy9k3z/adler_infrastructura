import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "../data/services";
import "./ServiceDetail.css";
const ids = ["vialidad", "contratos", "materiales", "ia-construccion"];
export default function Especialidades() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / SERVICIOS</span>
          <h1>
            Conocimiento aplicado
            <br />a su empresa.
          </h1>
          <p>
            Cuatro líneas de consultoría para proyectos de infraestructura y
            empresas en Venezuela.
          </p>
        </div>
      </header>
      <section className="container section">
        <div className="adler-reference-grid">
          {ids.map((id) => (
            <article className="adler-reference-card" key={id}>
              <span className="eyebrow">{servicesData[id].code}</span>
              <h2>{servicesData[id].title}</h2>
              <p>{servicesData[id].description}</p>
              <Link to={`/servicios/${id}`} className="text-link">
                Explorar servicio <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
