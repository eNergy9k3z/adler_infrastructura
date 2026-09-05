import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ServiceDetail.css";
export default function Login() {
  return (
    <div className="adler-page">
      <header className="adler-page-intro">
        <div className="container">
          <span className="eyebrow">ADLER / CLIENTES</span>
          <h1>Coordinación de proyectos.</h1>
          <p>
            Para consultar un trabajo o coordinar la entrega de documentación,
            contacte directamente con Adler.
          </p>
        </div>
      </header>
      <section className="container section profile-body-copy">
        <h2>Un canal acordado para cada trabajo.</h2>
        <p>
          Al iniciar una colaboración definimos el contacto responsable, los
          entregables y el medio para compartir información. El acceso a un
          portal privado todavía no está habilitado.
        </p>
        <div className="adler-documents">
          <Link to="/#contacto" className="btn btn-primary">
            Contactar con Adler <ArrowUpRight size={18} />
          </Link>
          <a href="mailto:info@adlerinfraestructura.com" className="text-link">
            Escribir por correo <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
