import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Updated Logo Link for Redirection */}
                <Link
                    to="/"
                    className="logo-wrapper"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsOpen(false);
                    }}
                >
                    <img src={logo} alt="Adler Logo" className="logo-img" />
                    {/* Text is usually part of logo, but if not, keep it or remove it if logo image has text */}
                    <div className="logo-text">
                        ADLER <span className="logo-accent">INFRAESTRUCTURA</span>
                    </div>
                </Link>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
                </div>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {/* Use absolute paths for home sections to work from other pages */}
                    <Link to="/#servicios" onClick={() => setIsOpen(false)}>Soluciones</Link>
                    <Link to="/proyectos" onClick={() => setIsOpen(false)}>Proyectos</Link>
                    <Link to="/#nosotros" onClick={() => setIsOpen(false)}>Nosotros</Link>

                    {/* New Page Links */}
                    <Link to="/valores" onClick={() => setIsOpen(false)}>Valores</Link>
                    <Link to="/especialidades" onClick={() => setIsOpen(false)}>Especialidades</Link>
                    <Link to="/normativa" onClick={() => setIsOpen(false)}>Normativa</Link>

                    {/* New Buttons */}
                    <Link to="/empleos" className="nav-btn nav-btn-outline" onClick={() => setIsOpen(false)}>
                        Empleos
                    </Link>

                    <Link to="/login" className="nav-btn nav-btn-primary" onClick={() => setIsOpen(false)}>
                        Acceso Clientes
                    </Link>
                    <Link to="/#contacto" onClick={() => setIsOpen(false)} className="nav-btn nav-btn-outline">
                        Contactar
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
