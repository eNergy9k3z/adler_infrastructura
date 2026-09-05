import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowRight, FileText } from "lucide-react";
import { servicesData } from "../data/services";
import "./ServiceDetail.css";
const ServiceDetail = () => {
  const { id } = useParams();
  const service = Object.hasOwn(servicesData, id) ? servicesData[id] : null;
  if (!service)
    return (
      <div className="adler-page">
        <div className="container section">
          <h1>Servicio no encontrado</h1>
          <Link to="/#servicios" className="text-link">
            Ver servicios <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <Link to="/#servicios" className="page-back">
            <ArrowLeft size={16} />
            Áreas de asesoría
          </Link>
          <span className="eyebrow">ADLER / SERVICIOS</span>
          <h1>{service.title}</h1>
          <p>{service.subtitle}</p>
        </div>
      </header>
      <div className="container section service-content">
        <div>
          <span className="eyebrow">El servicio</span>
          <h2>Una respuesta a su necesidad.</h2>
          <p className="service-description">{service.description}</p>
          <h3>Cómo delimitamos el trabajo</h3>
          <p>{service.scope}</p>
          <h3 className="deliverables-heading">Entregables posibles</h3>
          <ol className="deliverable-list">
            {service.deliverables.map((item, i) => (
              <li key={item}>
                <span>0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
        <aside className="service-sidebar">
          <span className="eyebrow">SU PRÓXIMO PASO</span>
          <h3>Conversemos sobre el alcance.</h3>
          <p>
            Cuéntenos la situación y qué necesita resolver. Acordaremos los
            documentos y la información para una primera revisión.
          </p>
          <Link
            to={`/?servicio=${encodeURIComponent(id)}#contacto`}
            className="btn btn-primary"
          >
            Plantear una consulta <ArrowUpRight size={18} />
          </Link>
          <Link to={`/servicios/${id}/ficha-tecnica`} className="service-print">
            <FileText size={17} />
            Ver ficha del servicio
          </Link>
        </aside>
      </div>
    </div>
  );
};
export default ServiceDetail;
