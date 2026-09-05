import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./Footer.css";
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-wordmark">
            ADLER<span>INFRASTRUCTURA</span>
          </Link>
          <p>
            Consultoría técnica, gestión contractual e inteligencia artificial
            aplicada a empresas.
          </p>
          <span className="footer-location">ALEMANIA / VENEZUELA</span>
        </div>
        <div>
          <h3>Servicios</h3>
          <ul>
            <li>
              <Link to="/servicios/vialidad">Infraestructura vial</Link>
            </li>
            <li>
              <Link to="/servicios/contratos">Gestión contractual</Link>
            </li>
            <li>
              <Link to="/servicios/materiales">Materiales y soluciones</Link>
            </li>
            <li>
              <Link to="/servicios/ia-construccion">IA para empresas</Link>
            </li>
            <li>
              <Link to="/especialidades">Especialidades técnicas</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Adler</h3>
          <ul>
            <li>
              <Link to="/equipo">Trayectoria</Link>
            </li>
            <li>
              <Link to="/proyectos">Ámbitos de intervención</Link>
            </li>
            <li>
              <Link to="/valores">Valores</Link>
            </li>
            <li>
              <Link to="/empleos">Colaborar con Adler</Link>
            </li>
            <li>
              <Link to="/certificaciones">Criterios de gestión</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Conectar</h3>
          <ul>
            <li>
              <Link to="/#contacto">Plantear una consulta</Link>
            </li>
            <li>
              <Link to="/login">Área de clientes</Link>
            </li>
            <li>
              <Link to="/normativa">Normativa</Link>
            </li>
            <li>
              <Link to="/auditoria">Consulta de auditoría</Link>
            </li>
            <li>
              <a
                href="https://wa.me/491727751060"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Adler Infrastructura</span>
        <span>Infraestructura. Empresas. Desarrollo.</span>
        <a href="#contenido">Volver arriba ↑</a>
      </div>
    </div>
  </footer>
);
export default Footer;
