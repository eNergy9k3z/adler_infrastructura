import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);
  const close = () => setIsOpen(false);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <header className="navbar">
        <div className="navbar-top">
          <div className="container">
            <span>Consultoría para Venezuela</span>
            <span>Infraestructura · Contratos · Inteligencia artificial</span>
          </div>
        </div>
        <nav
          className="container navbar-container"
          aria-label="Navegación principal"
        >
          <Link
            to="/"
            className="adler-brand"
            onClick={close}
            aria-label="Adler Infrastructura — Inicio"
          >
            <span className="brand-symbol">
              <img src={logo} alt="" width="72" height="72" />
            </span>
            <span className="brand-wordmark">
              ADLER<small>INFRASTRUCTURA</small>
            </span>
          </Link>
          <button
            type="button"
            ref={menuButton}
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="primary-links"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div
            id="primary-links"
            className={`nav-links ${isOpen ? "active" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                close();
                menuButton.current?.focus();
              }
            }}
          >
            <Link to="/#servicios" onClick={close}>
              Servicios
            </Link>
            <Link to="/#inteligencia-artificial" onClick={close}>
              IA para empresas
            </Link>
            <Link to="/#nosotros" onClick={close}>
              Adler
            </Link>
            <Link to="/#recursos" onClick={close}>
              Recursos
            </Link>
            <Link to="/login" className="nav-client" onClick={close}>
              Área de clientes
            </Link>
            <Link to="/#contacto" className="nav-contact" onClick={close}>
              Hablemos <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
