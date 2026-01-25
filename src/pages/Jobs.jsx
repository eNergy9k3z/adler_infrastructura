import React from 'react';
import { Target, Users, ShieldCheck, Zap, MapPin, Clock, ArrowRight } from 'lucide-react';
import './Jobs.css';

const values = [
    {
        icon: <ShieldCheck size={40} />,
        title: "Seguridad Primero",
        desc: "No negociamos con la seguridad. Nuestros estándares superan la normativa internacional para proteger a cada miembro del equipo."
    },
    {
        icon: <Target size={40} />,
        title: "Excelencia Técnica",
        desc: "Nos obsesiona la precisión. Buscamos profesionales que no se conformen con 'lo suficiente', sino que busquen 'lo óptimo'."
    },
    {
        icon: <Users size={40} />,
        title: "Integridad Absoluta",
        desc: "Transparencia en cada reporte, en cada auditoría y en cada contrato. La confianza es nuestro activo más valioso."
    },
    {
        icon: <Zap size={40} />,
        title: "Innovación Constante",
        desc: "Cuestionamos los métodos tradicionales. Implementamos tecnología para optimizar la gestión de infraestructura."
    }
];

// Jobs array empty to demonstrate the empty state
const jobs = [
    /*
    {
        title: "Ingeniero Civil Senior",
        location: "Caracas, Venezuela",
        type: "Tiempo Completo",
        department: "Gerencia de Proyectos"
    },
    {
        title: "Especialista en Costos y Presupuestos",
        location: "Remoto / Híbrido",
        type: "Tiempo Completo",
        department: "Auditoría Técnica"
    },
    {
        title: "Asesor Legal de Contratos",
        location: "Valencia, Venezuela",
        type: "Tiempo Completo",
        department: "Consultoría"
    },
    {
        title: "Supervisor de Obra Vial",
        location: "En Sitio (Varios)",
        type: "Por Proyecto",
        department: "Operaciones"
    }
    */
];

const Jobs = () => {
    return (
        <div className="jobs-page">
            {/* Hero */}
            <section className="jobs-hero">
                <div className="container">
                    <span className="section-eyebrow">Carreras en Adler</span>
                    <h1 className="jobs-hero-title">Construye el Futuro de la <span className="text-accent">Infraestructura</span></h1>
                    <p className="jobs-hero-subtitle">
                        Buscamos mentes analíticas y apasionadas por la ingeniería de alto nivel. Si te motiva la excelencia y el rigor técnico, este es tu lugar.
                    </p>
                    <button className="btn btn-primary" onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}>
                        Ver Vacantes Disponibles
                    </button>
                </div>
            </section>

            {/* Values */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header center-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="section-eyebrow">Nuestra Cultura</span>
                        <h2 className="section-title">¿Por qué <span className="text-accent">Adler?</span></h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Más que un empleo, ofrecemos un entorno donde el rigor técnico y la ética profesional son la norma.
                        </p>
                    </div>
                    <div className="values-grid">
                        {values.map((val, idx) => (
                            <div key={idx} className="value-card">
                                <div className="value-icon">{val.icon}</div>
                                <h3 className="value-title">{val.title}</h3>
                                <p className="value-desc">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="jobs-list-section">
                <div className="container">
                    <h2 className="section-title" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Posiciones <span className="text-accent">Abiertas</span></h2>

                    <div className="jobs-list">
                        {jobs.length > 0 ? (
                            jobs.map((job, idx) => (
                                <div key={idx} className="job-card">
                                    <div className="job-info">
                                        <h3>{job.title}</h3>
                                        <div className="job-meta">
                                            <span><MapPin size={16} /> {job.location}</span>
                                            <span><Clock size={16} /> {job.type}</span>
                                            <span><Target size={16} /> {job.department}</span>
                                        </div>
                                    </div>
                                    <div className="job-actions">
                                        <button className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                            Aplicar Ahora <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state" style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: '#1a1a1a',
                                borderRadius: '12px',
                                border: '1px dashed #444',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ fontSize: '3rem' }}>👷‍♂️🚧</span>
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Por el momento no tenemos vacantes abiertas</h3>
                                <p style={{ color: '#aaa', maxWidth: '500px' }}>
                                    Estamos enfocados en nuestros proyectos actuales. Sin embargo, siempre estamos abiertos a conocer talento excepcional para el futuro.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* General Application */}
                    <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--color-secondary)', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--color-accent)' }}>
                        <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>¿No encuentras tu rol ideal?</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                            Siempre estamos buscando talento excepcional. Envíanos tu CV y cuéntanos cómo puedes aportar valor a nuestros proyectos consultivos.
                        </p>
                        <button className="btn btn-primary">Enviar Candidatura Espontánea</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Jobs;
