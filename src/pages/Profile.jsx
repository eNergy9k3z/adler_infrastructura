import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import profileImg from "../assets/cecil_profile.webp";
import "./ServiceDetail.css";
const Profile = () => (
  <div className="adler-page">
    <header className="adler-page-intro">
      <div className="container adler-profile">
        <div>
          <span className="eyebrow">ADLER / TRAYECTORIA</span>
          <h1>Cecil Sebastian Tovar</h1>
          <p>
            Construcción vial, gestión contractual e inteligencia artificial
            aplicada a empresas.
          </p>
          <div className="profile-links">
            <Link to="/#contacto" className="text-link">
              Conversemos <ArrowUpRight size={18} />
            </Link>
            <a
              href="https://www.linkedin.com/in/cecil-sebastian-tovar-728724185/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              LinkedIn <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <img
          src={profileImg}
          alt="Cecil Sebastian Tovar"
          width="1024"
          height="1024"
        />
      </div>
    </header>
    <div className="container section">
      <div className="profile-body-copy">
        <span className="eyebrow">LA BASE DEL PROYECTO</span>
        <h2>Conectar el conocimiento con su aplicación.</h2>
        <p>
          Mi trayectoria profesional en Alemania está vinculada a la
          construcción de carreteras, los productos de construcción y la gestión
          de contratos. Adler Infrastructura nace para aplicar ese conocimiento
          a las necesidades de empresas y proyectos en Venezuela.
        </p>
        <p>
          A esa base se suma la aplicación de inteligencia artificial en
          empresas: identificar oportunidades, probar herramientas en procesos
          concretos y acompañar a los equipos en su uso.
        </p>
        <h2>Un enfoque práctico.</h2>
        <p>
          Cada encargo necesita una pregunta clara, información suficiente y un
          alcance definido. El objetivo es entregar análisis y herramientas que
          ayuden al cliente a decidir y avanzar, con verificaciones locales o
          apoyo especializado cuando el trabajo lo requiera.
        </p>
      </div>
    </div>
  </div>
);
export default Profile;
