import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { FileText, Calculator, Phone, Mail } from 'lucide-react';

const heroImages = [
    "/images/hero-slide-1.png", // Encrucijada
    "/images/hero-slide-2.png", // Canalización
    "/images/hero-slide-3.png", // Oficina
    "/images/hero-slide-4.png"  // Puente
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000); // 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-container">
            <div className="hero-background-image-wrapper">
                {heroImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Adler Infraestructura Slide ${index + 1}`}
                        className={`hero-bg-img ${index === currentImage ? 'active' : ''}`}
                        style={{ opacity: index === currentImage ? 1 : 0 }} // Inline style fallback/enforcement
                    />
                ))}
                <div className="hero-overlay-gradient">
                    <div className="hero-overlay-pattern"></div>
                </div>
            </div>

            <div className="container hero-content-wrapper">
                <div className="hero-content">
                    <div className="hero-badge">Consultoría & Gerencia de Proyectos</div>
                    <h1 className="hero-title">
                        Consultoría Técnica & <span className="text-gradient-gold">Gestión de Contratos</span>
                    </h1>
                    <p className="hero-subtitle">
                        Asesoría técnica especializada en ejecución de obras viales, gestión de contratos y auditoría de procesos constructivos para proyectos de infraestructura.
                    </p>

                    <div className="hero-actions-grid">
                        <Link to="/#contacto" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                            <Phone size={20} style={{ marginRight: '8px' }} /> Agendar Asesoría
                        </Link>
                        <Link to="/#servicios" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                            <FileText size={20} style={{ marginRight: '8px' }} /> Ver Servicios
                        </Link>
                        <Link to="/auditoria" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                            <Calculator size={20} style={{ marginRight: '8px' }} /> Solicitar Auditoría
                        </Link>
                        <Link to="/#contacto" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                            <Mail size={20} style={{ marginRight: '8px' }} /> Licitaciones
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
