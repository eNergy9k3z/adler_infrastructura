import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

// Import images
import imgRoads from '../assets/service_road_construction.png';
import imgPipes from '../assets/service_pipelines.png';
import imgParks from '../assets/service_urban_parks.png';
import imgRepair from '../assets/service_road_repair.png';

const services = [
    {
        id: "vialidad",
        title: "Vías de Alta Velocidad",
        description: "Diseño y auditoría de autopistas inteligentes bajo criterios de desempeño. Enfoque en materiales SMA y seguridad vial activa.",
        image: imgRoads,
        icon: <Zap size={20} />,
        norma: "AASHTO / DIN 18315"
    },
    {
        id: "hidraulica",
        title: "Infraestructura Hidráulica",
        description: "Canalización de ríos y sistemas de drenaje urbano. Hormigón de alta resistencia para control de torrentes en valles.",
        image: imgPipes,
        icon: <ShieldCheck size={20} />,
        norma: "ASTM C14 / COVENIN"
    },
    {
        id: "paisajismo",
        title: "Paisajismo Urbano",
        description: "Integración de infraestructura gris y verde. Parques lineales que mitigan la isla de calor en zonas densas.",
        image: imgParks,
        icon: <BarChart3 size={20} />,
        norma: "Sostenibilidad LEED"
    },
    {
        id: "rehabilitacion",
        title: "Rehabilitación Vial",
        description: "Recuperación profunda de pavimentos mediante fresado y reciclaje. Ejecución nocturna para minimizar impacto en el tráfico.",
        image: imgRepair,
        icon: <Zap size={20} />,
        norma: "Superpave VZ"
    }
];

const Services = () => {
    return (
        <section id="servicios" className="section" style={{ backgroundColor: 'var(--color-bg-body)' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-eyebrow">Nuestras Capacidades</span>
                    <h2 className="section-title">
                        Competencias <span className="text-accent">Técnicas</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
                        Desde la planificación estratégica hasta la recepción definitiva. Cubrimos el ciclo completo con una visión de ingeniería forense y preventiva.
                    </p>
                </div>

                <div className="grid grid-2">
                    {services.map((service, index) => (
                        <div key={index} className="service-card-premium">
                            <div className="card-image-container">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="card-img"
                                />
                                <div className="card-overlay"></div>
                                <div className="card-icon-badge">
                                    {service.icon}
                                </div>
                                {/* Technical Badge Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0,0,0,0.8)',
                                    color: 'var(--color-accent)',
                                    padding: '4px 8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255, 193, 7, 0.3)'
                                }}>
                                    {service.norma}
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{service.title}</h3>
                                <p className="card-desc">{service.description}</p>
                                <Link to={`/servicios/${service.id}`} className="card-link">
                                    Ver Especificaciones <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
