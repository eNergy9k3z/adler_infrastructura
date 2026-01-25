import React from 'react';
import './Valores.css';

const Valores = () => {
    const coreValues = [
        {
            icon: "🛡️",
            title: "Seguridad",
            description: "La seguridad de nuestro equipo y comunidades es nuestra máxima prioridad. Cumplimos estrictamente con todas las normativas nacionales e internacionales de seguridad industrial.",
            highlight: "Cero accidentes es nuestra meta diaria"
        },
        {
            icon: "⭐",
            title: "Excelencia",
            description: "Nos esforzamos por superar los estándares de calidad en cada proyecto. Utilizamos tecnología de punta y las mejores prácticas de la industria para entregar resultados excepcionales.",
            highlight: "Calidad sin compromisos"
        },
        {
            icon: "🤝",
            title: "Integridad",
            description: "Actuamos con honestidad, transparencia y ética en todas nuestras operaciones. Nuestros clientes confían en nosotros porque cumplimos lo que prometemos.",
            highlight: "Nuestra palabra es nuestro contrato"
        },
        {
            icon: "🌱",
            title: "Sostenibilidad",
            description: "Desarrollamos infraestructura que respeta el medio ambiente. Implementamos prácticas sustentables y minimizamos nuestro impacto ecológico en cada obra.",
            highlight: "Construyendo un futuro verde"
        },
        {
            icon: "💡",
            title: "Innovación",
            description: "Invertimos constantemente en investigación y desarrollo para ofrecer soluciones vanguardistas. La tecnología es nuestra aliada para construir mejor.",
            highlight: "Pioneros en soluciones de ingeniería"
        },
        {
            icon: "👥",
            title: "Colaboración",
            description: "Creemos en el trabajo en equipo y las alianzas estratégicas. Juntos con nuestros clientes, proveedores y comunidades construimos el éxito.",
            highlight: "Juntos llegamos más lejos"
        }
    ];

    return (
        <div className="valores-page">
            {/* Hero Section with Background Image */}
            <section className="valores-hero">
                <div className="valores-hero-bg"></div>
                <div className="valores-hero-overlay"></div>
                <div className="container valores-hero-content">
                    <span className="valores-badge">Nuestra Filosofía</span>
                    <h1>Valores que nos <span className="accent">Definen</span></h1>
                    <p className="valores-hero-subtitle">
                        En Adler Infraestructura, nuestros valores no son solo palabras en una pared.
                        Son el fundamento de cada decisión, cada proyecto y cada relación que construimos.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="valores-grid-section">
                <div className="container">
                    <div className="valores-grid">
                        {coreValues.map((value, index) => (
                            <div key={index} className="valor-card">
                                <div className="valor-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                                <span className="valor-highlight">{value.highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Feature Section */}
            <section className="valores-feature">
                <div className="container">
                    <div className="feature-grid">
                        <div className="feature-image">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                                alt="Equipo de construcción trabajando"
                            />
                        </div>
                        <div className="feature-content">
                            <h2>Construimos con <span className="accent">Propósito</span></h2>
                            <p>
                                Cada proyecto que emprendemos tiene un impacto directo en la vida de miles de personas.
                                Por eso, nuestros valores no son negociables. Desde la primera piedra hasta la entrega final,
                                mantenemos los más altos estándares éticos y de calidad.
                            </p>
                            <ul className="feature-list">
                                <li>✓ Más de 25 años de experiencia</li>
                                <li>✓ Equipo certificado y capacitado</li>
                                <li>✓ Compromiso con la comunidad</li>
                                <li>✓ Tecnología de vanguardia</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="valores-commitment">
                <div className="container">
                    <div className="commitment-content">
                        <h2>Nuestro Compromiso</h2>
                        <p>
                            Más de <strong>25 años</strong> construyendo infraestructura con valores inquebrantables.
                            Cada carretera, cada puente, cada proyecto lleva impreso nuestro compromiso con
                            la excelencia y la integridad.
                        </p>
                        <div className="commitment-stats">
                            <div className="stat">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Proyectos Completados</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">98%</span>
                                <span className="stat-label">Satisfacción del Cliente</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Calidad Certificada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Valores;
