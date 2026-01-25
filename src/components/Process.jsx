import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, CheckSquare, ClipboardList, PenTool } from 'lucide-react';
import './Process.css';

const steps = [
    {
        icon: <FileSearch size={28} />,
        title: "1. Análisis Contractual",
        desc: "Revisión profunda de alcances, precios unitarios y cronogramas base."
    },
    {
        icon: <ClipboardList size={28} />,
        title: "2. Inspección en Sitio",
        desc: "Verificación física de avances. No confiamos en papel; validamos en campo."
    },
    {
        icon: <PenTool size={28} />,
        title: "3. Seguimiento y Control",
        desc: "Monitoreo continuo de curvas de inversión y control de calidad de materiales."
    },
    {
        icon: <CheckSquare size={28} />,
        title: "4. Cierre Administrativo",
        desc: "Auditoría final, finiquitos y entrega de memoria técnica de la obra."
    }
];

const Process = () => {
    return (
        <section className="section process-section">
            <div className="container">
                <div className="process-header">
                    <span className="process-eyebrow">Nuestro Método</span>
                    <h2 className="process-heading">Gerencia Activa de <span className="text-accent">Contratos</span></h2>
                    <p className="process-sub">
                        Un marco de trabajo riguroso para asegurar que los proyectos se entreguen a tiempo y dentro del presupuesto.
                    </p>
                </div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <div key={index} className="process-card">
                            <div className="process-icon">{step.icon}</div>
                            <h4 className="process-title">{step.title}</h4>
                            <p className="process-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Resource download buttons as requested */}
                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Recursos para Clientes</h3>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/#contacto" className="btn btn-primary" style={{ textDecoration: 'none', width: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Solicitar Presupuesto</Link>
                        <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none', width: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Acceso al Sistema de Gestión</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
