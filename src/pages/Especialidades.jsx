import React from 'react';
import './Especialidades.css';

const Especialidades = () => {
    const specialties = [
        {
            id: 1,
            title: "Pavimentación Asfáltica",
            description: "Construcción y rehabilitación de carpetas asfálticas con tecnología de última generación. Mezclas asfálticas en caliente, frío y tibias para todo tipo de tránsito.",
            features: ["Autopistas y carreteras", "Vialidades urbanas", "Estacionamientos industriales", "Pistas de aeropuerto"],
            icon: "🛣️",
            image: "/images/pavimentacion-asfaltica.png"
        },
        {
            id: 2,
            title: "Puentes y Estructuras",
            description: "Diseño y construcción de puentes vehiculares, peatonales y estructuras especiales. Experiencia en concreto presforzado y estructuras metálicas.",
            features: ["Puentes vehiculares", "Pasos a desnivel", "Distribuidores viales", "Puentes peatonales"],
            icon: "🌉",
            image: "/images/puentes-estructuras.png"
        },
        {
            id: 3,
            title: "Obras Hidráulicas",
            description: "Sistemas de drenaje pluvial y sanitario, presas, bordos y obras de protección contra inundaciones. Soluciones integrales para manejo de agua.",
            features: ["Drenaje pluvial", "Alcantarillado", "Presas de control", "Canales de conducción"],
            icon: "💧",
            image: "/images/obras-hidraulicas.png"
        },
        {
            id: 4,
            title: "Terracerías",
            description: "Movimiento de tierras a gran escala con maquinaria pesada. Cortes, rellenos, compactación y estabilización de suelos para proyectos de cualquier magnitud.",
            features: ["Movimiento de tierras", "Estabilización de suelos", "Compactación especializada", "Rellenos estructurales"],
            icon: "🏗️",
            image: "/images/terracerias.png"
        },
        {
            id: 5,
            title: "Señalización Vial",
            description: "Señalamiento horizontal y vertical en carreteras y zonas urbanas. Sistemas de contención vehicular, iluminación y elementos de seguridad vial.",
            features: ["Pintura termoplástica", "Señales verticales", "Barreras de contención", "Iluminación LED"],
            icon: "🚧",
            image: "/images/senalizacion-vial.jpg"
        },
        {
            id: 6,
            title: "Conservación Vial",
            description: "Programas de mantenimiento preventivo y correctivo para preservar la infraestructura vial. Bacheo, sellado de grietas y reencarpetado.",
            features: ["Bacheo asfáltico", "Sellado de grietas", "Fresado y reencarpetado", "Mantenimiento rutinario"],
            icon: "🔧",
            image: "/images/conservacion-vial.png"
        },
        {
            id: 7,
            title: "Inteligencia Artificial en Construcción",
            description: "Revolucionamos la industria integrando IA para optimizar cronogramas, predecir riesgos y maximizar la eficiencia de recursos en cada etapa del proyecto.",
            features: ["Optimización predictiva", "Monitoreo inteligente", "Análisis de datos masivos", "Reducción de costos operativos"],
            icon: "🤖",
            image: "/images/ai-construction.png"
        }
    ];

    return (
        <div className="especialidades-page">
            {/* Hero Section with Background Image */}
            <section className="especialidades-hero">
                <div className="especialidades-hero-bg"></div>
                <div className="especialidades-hero-overlay"></div>
                <div className="container especialidades-hero-content">
                    <span className="especialidades-badge">Nuestras Capacidades</span>
                    <h1>Especialidades <span className="accent">Técnicas</span></h1>
                    <p className="especialidades-hero-subtitle">
                        Dominamos todas las disciplinas de la ingeniería vial y de infraestructura.
                        Cada especialidad cuenta con equipos expertos y maquinaria de última generación.
                    </p>
                </div>
            </section>

            {/* Specialties Grid with Images */}
            <section className="especialidades-grid-section">
                <div className="container">
                    <div className="especialidades-grid">
                        {specialties.map((specialty) => (
                            <div key={specialty.id} className="especialidad-card">
                                <div className="especialidad-image">
                                    <img src={specialty.image} alt={specialty.title} />
                                    <div className="especialidad-image-overlay"></div>
                                    <span className="especialidad-icon">{specialty.icon}</span>
                                </div>
                                <div className="especialidad-content">
                                    <h3>{specialty.title}</h3>
                                    <p className="especialidad-description">{specialty.description}</p>
                                    <ul className="especialidad-features">
                                        {specialty.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <span className="feature-check">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="especialidades-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿Tiene un proyecto en mente?</h2>
                        <p>
                            Nuestro equipo técnico está listo para analizar sus requerimientos
                            y proponer la mejor solución para su proyecto de infraestructura.
                        </p>
                        <div className="cta-buttons">
                            <a href="/#contacto" className="btn btn-primary">Solicitar Cotización</a>
                            <a href="tel:+525512345678" className="btn btn-outline">Llamar Ahora</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Especialidades;
