import React from 'react';
import { ClipboardCheck, Briefcase, FileText, Search, Shield, BarChart3, Users, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Solutions.css';

// Consultant focused services
const services = [
    {
        icon: <ClipboardCheck size={32} />,
        title: "Fiscalización de Obras",
        description: "Supervisión técnica rigurosa para asegurar que la construcción cumpla con las normativas COVENIN y los estándares de calidad contratados."
    },
    {
        icon: <Briefcase size={32} />,
        title: "Gerencia de Contratos",
        description: "Administración integral de contratos de infraestructura (FIDIC, Ley de Contrataciones Públicas), controlando plazos, costos y alcances."
    },
    {
        icon: <Search size={32} />,
        title: "Auditoría Técnica",
        description: "Evaluación forense de obras ejecutadas. Detectamos desviaciones presupuestarias, fallas ocultas y sobreprecios en valuaciones."
    },
    {
        icon: <FileText size={32} />,
        title: "Gestión de Licitaciones",
        description: "Asesoría estratégica en la preparación de pliegos, análisis de ofertas y conformación del Registro Nacional de Contratistas (RNC)."
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Valuaciones de Obra",
        description: "Cálculo y revisión precisa de avances de obra, ajustes de precios por inflación y cierre de cuadros de cierre."
    },
    {
        icon: <Scale size={32} />,
        title: "Peritaje Legal-Técnico",
        description: "Soporte experto en disputas contractuales y arbitrajes. Informes técnicos para defensa de intereses ante entes públicos."
    }
];

const Solutions = () => {
    return (
        <section className="section bg-card" id="servicios">
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-eyebrow">Nuestra Especialidad</span>
                    <h2 className="section-title">Consultoría Técnica de <span className="text-accent">Alto Nivel</span></h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
                        No somos constructores; somos los ojos expertos que garantizan la eficiencia y transparencia de su inversión. Protegemos sus intereses en cada etapa del proyecto.
                    </p>
                </div>

                <div className="solutions-grid">
                    {services.map((service, index) => (
                        <div key={index} className="solution-card">
                            <div className="solution-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="solution-title">{service.title}</h3>
                            <p className="solution-desc">{service.description}</p>
                            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
                                <a href="#contacto" className="card-link">Solicitar Asesoría &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Extra Action Buttons Section as requested */}
                <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/login" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', textDecoration: 'none' }}>
                        <Users size={20} /> Portal de Clientes
                    </Link>
                    <Link to="/certificaciones" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', textDecoration: 'none' }}>
                        <Shield size={20} /> Certificaciones ISO
                    </Link>
                    <a href="#contacto" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', textDecoration: 'none' }}>
                        Solicitar Presupuesto
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Solutions;
