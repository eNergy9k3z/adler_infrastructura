import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./About.css";
const About = () => (
  <section id="nosotros" className="section about-section">
    <div className="container about-layout">
      <figure className="about-figure">
        <img
          src="/images/hero-slide-1.png"
          alt="Imagen ilustrativa de un enlace vial visto desde el aire"
          loading="lazy"
          width="1024"
          height="1024"
        />
        <figcaption>Imagen ilustrativa de infraestructura</figcaption>
      </figure>
      <div className="about-content">
        <span className="eyebrow">03 / La perspectiva Adler</span>
        <h2>
          Experiencia en Alemania.
          <br />
          Compromiso con Venezuela.
        </h2>
        <p>
          Adler Infrastructura nace de una trayectoria vinculada a la
          construcción vial, los productos de construcción y la gestión de
          contratos en Alemania.
        </p>
        <p>
          Aplicamos ese conocimiento a las decisiones de empresas y proyectos en
          Venezuela, incorporando también inteligencia artificial para mejorar
          sus procesos de trabajo.
        </p>
        <div className="about-principles">
          <div>
            <span>ENFOQUE</span>
            <p>Análisis técnico y documentación clara.</p>
          </div>
          <div>
            <span>FORMA DE TRABAJO</span>
            <p>
              Asesoría desde Alemania, con verificación local según el alcance.
            </p>
          </div>
        </div>
        <Link to="/equipo" className="text-link">
          Conocer la trayectoria <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);
export default About;
