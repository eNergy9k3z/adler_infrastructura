import { useParams, Link } from "react-router-dom";
import { Printer } from "lucide-react";
import { servicesData } from "../data/services";
import BrandLogo from "../components/BrandLogo";
import "./PrintableSpec.css";
const PrintableSpec = () => {
  const { id } = useParams();
  const service = Object.hasOwn(servicesData, id) ? servicesData[id] : null;
  if (!service)
    return (
      <div className="container section">
        <h1>Servicio no encontrado</h1>
        <Link to="/#servicios">Volver a servicios</Link>
      </div>
    );
  return (
    <div className="service-sheet">
      <div className="sheet-controls">
        <Link to={`/servicios/${id}`}>← Volver al servicio</Link>
        <button onClick={() => window.print()}>
          <Printer size={18} />
          Imprimir o guardar PDF
        </button>
      </div>
      <article className="sheet-paper">
        <header>
          <BrandLogo />
          <span>{service.code} · Ficha de servicio</span>
        </header>
        <h1>{service.title}</h1>
        <p>{service.subtitle}</p>
        <h2>Descripción</h2>
        <p>{service.description}</p>
        <h2>Alcance del trabajo</h2>
        <p>{service.scope}</p>
        <h2>Entregables posibles</h2>
        <ol>
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <footer className="sheet-footer">
          Adler Infrastructura · Alemania / Venezuela
          <br />
          adler-infrastructura.vercel.app · +49 172 7751060
        </footer>
      </article>
    </div>
  );
};
export default PrintableSpec;
