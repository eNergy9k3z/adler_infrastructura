
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Lock, ExternalLink } from 'lucide-react';

const Resources = () => {
    return (
        <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0f0f0f' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-eyebrow">Centro de Documentación</span>
                    <h2 className="section-title">Recursos <span className="text-accent">Estratégicos</span></h2>
                </div>

                <div className="grid grid-3">
                    <div className="resource-card" style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                        <FileText size={40} className="text-accent" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Normativa Legal</h3>
                        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Compendio actualizado de leyes de contrataciones públicas y normas COVENIN.</p>
                        <a href="/docs/guia_fiscalizacion_adler.html" target="_blank" rel="noopener noreferrer" className="card-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none', display: 'inline-block', color: '#ffc107', fontWeight: 'bold', position: 'relative', zIndex: 10 }}>Ver Guía de Fiscalización &rarr;</a>
                    </div>

                    <div className="resource-card" style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                        <Download size={40} className="text-accent" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Formatos Tipo</h3>
                        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Descargue modelos de valuaciones, actas de inicio y cuadros de cierre.</p>
                        <a href="/docs/pack_formatos_adler.html" target="_blank" rel="noopener noreferrer" className="card-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none', display: 'inline-block', color: 'inherit', fontWeight: 'bold' }}>Descargar Pack &rarr;</a>
                    </div>

                    <div className="resource-card" style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                        <Lock size={40} className="text-accent" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Sistema de Gestión Adler</h3>
                        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Plataforma segura para clientes. Seguimiento en tiempo real de sus contratos.</p>
                        <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Iniciar Sesión</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resources;
