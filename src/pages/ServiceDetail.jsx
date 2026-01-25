import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText, Zap } from 'lucide-react';
import './ServiceDetail.css';

const servicesData = {
    "vialidad": {
        title: "Vías de Alta Velocidad",
        subtitle: "Autopistas Inteligentes y Corredores Viales",
        image: "/images/service-detail-vialidad.png",
        description: "Diseñamos y construimos corredores viales de alto desempeño, optimizados para soportar cargas pesadas y tráfico intenso. Nuestra metodología integra mezclas asfálticas modificadas (SMA) y sistemas de contención vehicular certificados bajo norma AASHTO MASH.",
        specs: [
            "Diseño Geométrico: AASHTO Green Book 2018",
            "Pavimento: Mezclas SMA con polímeros SBS",
            "Señalización: Retrorreflectividad Tipo IV o superior",
            "Drenaje: Sistemas de cunetas revestidas de alta capacidad"
        ],
        scope: "Desde el movimiento de tierras masivo hasta la demarcación termoplástica final. Incluye estudios de tráfico y diseño de intercambiadores."
    },
    "hidraulica": {
        title: "Infraestructura Hidráulica",
        subtitle: "Canalización y Control de Torrentes",
        image: "/images/service-detail-hidraulica.png",
        description: "Mitigación de riesgos en zonas urbanas mediante la canalización de cursos de agua con hormigón armado de alta resistencia. Diseñamos estructuras capaces de soportar crecidas milenarias, protegiendo a las comunidades aledañas.",
        specs: [
            "Concreto: f'c = 350 kg/cm² sulfato-resistente",
            "Acero: A-615 Grado 60",
            "Juntas: Waterstop de PVC con sello elastomérico",
            "Acabado: Liso hidráulico para maximizar velocidad de flujo"
        ],
        scope: "Construcción de muros de contención, losas de fondo, disipadores de energía y sistemas de drenaje pluvial macro."
    },
    "paisajismo": {
        title: "Paisajismo Urbano",
        subtitle: "Renovación de Espacios Públicos",
        image: "/images/service-detail-paisajismo.png",
        description: "Transformamos espacios residuales en parques lineales modernos. Integramos infraestructura gris (concreto aparente) con infraestructura verde, seleccionando especies vegetales tropicales de bajo mantenimiento y alta captación de CO2.",
        specs: [
            "Pavimentos: Adoquines permeables y concreto estampado",
            "Iluminación: LED Solar antivandálica",
            "Mobiliario: Concreto arquitectónico (Groc)",
            "Riego: Sistemas automatizados por goteo"
        ],
        scope: "Rehabilitación de plazas, bulevares y parques. Diseño de mobiliario urbano y planes de arborización."
    },
    "rehabilitacion": {
        title: "Rehabilitación Vial",
        subtitle: "Mantenimiento Mayor y Fresado",
        image: "/images/service-detail-rehabilitacion.png",
        description: "Ejecución de trabajos de fresado profundo y sustitución de carpeta asfáltica en horario nocturno. Utilizamos maquinaria de última generación (Wirtgen) para garantizar la nivelación perfecta (IRI < 2.0) y minimizar la afectación al usuario.",
        specs: [
            "Fresado: Microfresado de precisión (3mm)",
            "Riego de Liga: Emulsión de rotura rápida termoadherente",
            "Compactación: Rodillos oscilatorios inteligentes",
            "Logística: Operatividad nocturna 100%"
        ],
        scope: "Recuperación funcional y estructural de pavimentos envejecidos. Corrección de baches, ahuellamiento y grietas."
    }
};

const ServiceDetail = () => {
    const { id } = useParams();
    const service = servicesData[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>
                <h2>Servicio no encontrado</h2>
                <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div className="service-detail-page">
            {/* Hero Header */}
            <div className="sd-hero" style={{ backgroundImage: `url(${service.image})` }}>
                <div className="sd-hero-overlay"></div>
                <div className="container sd-hero-content">
                    <Link to="/#servicios" className="back-link"><ArrowLeft size={16} /> Volver a Servicios</Link>
                    <span className="sd-badge">ESPECIFICACIONES TÉCNICAS</span>
                    <h1 className="sd-title">{service.title}</h1>
                    <p className="sd-subtitle">{service.subtitle}</p>
                </div>
            </div>

            <div className="container">
                <section className="section sd-content-grid">
                    {/* Main Content */}
                    <div className="sd-main">
                        <h2 className="section-title">Descripción del <span className="text-accent">Alcance</span></h2>
                        <p className="sd-text">{service.description}</p>

                        <div className="sd-scope-box">
                            <h4 style={{ color: 'white', marginBottom: '10px' }}>Alcance Operativo</h4>
                            <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{service.scope}</p>
                        </div>

                        <h3 className="section-title" style={{ fontSize: '1.8rem', marginTop: '3rem' }}>Detalles Técnicos</h3>
                        <div className="specs-grid">
                            {service.specs.map((spec, index) => (
                                <div key={index} className="spec-card">
                                    <CheckCircle size={24} className="text-accent" style={{ marginBottom: '10px' }} />
                                    <p>{spec}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <aside className="sd-sidebar">
                        <div className="cta-card">
                            <Zap size={32} className="text-accent" style={{ marginBottom: '15px' }} />
                            <h3>¿Necesita este servicio?</h3>
                            <p>Nuestros ingenieros están listos para evaluar su requerimiento técnico.</p>
                            <Link to="/#contacto" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                                Solicitar Cotización
                            </Link>
                            <Link to={`/servicios/${id}/ficha-tecnica`} target="_blank" className="download-link">
                                <FileText size={16} /> Descargar Ficha Técnica (PDF)
                            </Link>
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
};

export default ServiceDetail;
