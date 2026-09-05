import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import "./Hero.css";
const Hero = () => (
  <section className="adler-hero" aria-labelledby="hero-heading">
    <div className="container hero-layout">
      <div className="hero-copy">
        <span className="eyebrow">Criterio técnico. Visión empresarial.</span>
        <h1 id="hero-heading">
          Decisiones claras.
          <br />
          <span>Proyectos con dirección.</span>
        </h1>
        <p>
          Consultoría en infraestructura, gestión contractual e inteligencia
          artificial para empresas en Venezuela. Con experiencia desarrollada en
          Alemania y atención a la realidad local.
        </p>
        <div className="hero-actions">
          <Link to="/#contacto" className="hero-primary">
            Conversemos sobre su proyecto <ArrowRight size={18} />
          </Link>
          <Link to="/#servicios" className="hero-secondary">
            Explorar servicios <ArrowDown size={16} />
          </Link>
        </div>
        <div className="hero-footnote">
          <span>DESDE ALEMANIA</span>
          <span className="hero-rule" />
          <span>PARA VENEZUELA</span>
        </div>
      </div>
      <figure className="hero-figure">
        <img
          src="/images/hero-slide-4.png"
          alt="Imagen ilustrativa de un puente en construcción y su entorno"
          fetchPriority="high"
        />
        <figcaption>
          <span>IMAGEN ILUSTRATIVA DE INFRAESTRUCTURA</span>
          <span>01 / ADLER</span>
        </figcaption>
      </figure>
    </div>
  </section>
);
export default Hero;
