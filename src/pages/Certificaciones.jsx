import React, { useEffect } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';

const Certificaciones = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: 'var(--color-bg-body)', minHeight: '100vh', padding: '120px 0 60px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <ShieldCheck size={48} className="text-accent" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.1 }}>Garantía de <span className="text-accent">Calidad</span></h1>
                    <p style={{ maxWidth: '600px', margin: '1rem auto', color: '#ccc' }}>
                        Nuestros procesos están auditados y certificados por organismos internacionales, asegurando que cada proyecto cumpla con los estándares más exigentes del sector.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

                    {/* Main Certificate Card */}
                    <div style={{
                        background: '#fff',
                        padding: '2rem',
                        borderRadius: '4px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        position: 'relative',
                        color: '#111'
                    }}>
                        <div style={{
                            border: '4px double #DAA520',
                            padding: '1.5rem',
                            height: '100%',
                            textAlign: 'center'
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <Award size={48} color="#DAA520" />
                            </div>
                            <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' }}>ISO 9001:2015</h2>
                            <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: '#555', marginBottom: '2rem' }}>Sistema de Gestión de Calidad</p>

                            <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                                "Por la excelencia en la prestación de servicios de ingeniería civil, gerencia de construcción y auditoría técnica de infraestructura."
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <span style={{ fontSize: '0.7rem', display: 'block', color: '#666' }}>ID Certificado</span>
                                    <span style={{ fontWeight: 'bold' }}>ADL-2024-QMS</span>
                                </div>
                                <div>
                                    <img src="/logo-placeholder.svg" alt="" style={{ width: '60px', opacity: 0.5 }} />
                                </div>
                            </div>
                        </div>
                        {/* Gold seal */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(45deg, #FFD700, #DAA520)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            transform: 'rotate(-15deg)'
                        }}>
                            <CheckCircle color="white" size={40} />
                        </div>
                    </div>

                    {/* Secondary Certs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--color-accent)' }}>
                            <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShieldCheck size={24} className="text-accent" /> ISO 14001:2015
                            </h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>Gestión Ambiental. Nos comprometemos a minimizar el impacto ecológico de nuestras operaciones mediante prácticas sostenibles y reciclaje de materiales (RAP).</p>
                        </div>

                        <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--color-accent)' }}>
                            <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShieldCheck size={24} className="text-accent" /> ISO 45001:2018
                            </h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>Seguridad y Salud Ocupacional. La integridad física de nuestro equipo y colaboradores es innegociable. Cero accidentes es nuestra meta permanente.</p>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Documentación Disponible</h4>
                            <Link to="/certificaciones/documentos/politica-calidad" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', padding: '10px', background: '#111', marginBottom: '10px', borderRadius: '4px', textDecoration: 'none' }}>
                                <FileText size={18} /> Política de Calidad Integrada (PDF)
                            </Link>
                            <Link to="/certificaciones/documentos/manual-buenas-practicas" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', padding: '10px', background: '#111', borderRadius: '4px', textDecoration: 'none' }}>
                                <FileText size={18} /> Manual de Buenas Prácticas (PDF)
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
                </div>
            </div>
        </div>
    );
};

export default Certificaciones;
