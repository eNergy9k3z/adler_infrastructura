import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FileText,
  FolderOpen,
  MessagesSquare,
} from "lucide-react";
import "./Resources.css";
const Resources = () => (
  <section id="recursos" className="section resources-section">
    <div className="container">
      <div className="resources-heading">
        <span className="eyebrow">05 / Recursos</span>
        <h2>Documentación para el trabajo.</h2>
      </div>
      <div className="resource-list">
        <a
          href="/docs/guia_fiscalizacion_adler.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={22} strokeWidth={1.3} />
          <div>
            <h3>Guía de fiscalización</h3>
            <p>
              Material de consulta para organizar el seguimiento de una obra.
            </p>
          </div>
          <ArrowUpRight size={21} />
        </a>
        <a
          href="/docs/pack_formatos_adler.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FolderOpen size={22} strokeWidth={1.3} />
          <div>
            <h3>Formatos de trabajo</h3>
            <p>Modelos de valuaciones, actas y documentación de cierre.</p>
          </div>
          <ArrowUpRight size={21} />
        </a>
        <Link to="/login">
          <MessagesSquare size={22} strokeWidth={1.3} />
          <div>
            <h3>Coordinación con clientes</h3>
            <p>Contacto y entrega de documentación de proyectos.</p>
          </div>
          <ArrowUpRight size={21} />
        </Link>
      </div>
    </div>
  </section>
);
export default Resources;
