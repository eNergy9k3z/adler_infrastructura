import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Settings, MapPin, Briefcase } from 'lucide-react';
import './About.css';
import aboutImage from '../assets/venezuela_road.png';

const About = () => {
    return (
        <section id="nosotros" className="section" style={{ position: 'relative' }}>
            <div className="container">
                <div className="grid grid-2" style={{ alignItems: 'center', gap: '5rem' }}>
                    <div className="about-image-wrapper">
                        {/* Abstract "Blueprint" Overlay or similar logic */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '-20px',
                            width: '100px',
                            height: '100px',
                            borderTop: '4px solid var(--color-accent)',
                            borderLeft: '4px solid var(--color-accent)',
                            zIndex: 0,
                        }}></div>

                        <img
                            src={aboutImage}
                            alt="Proyecto Supervisado"
                            className="about-img_fluid"
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            borderBottom: '4px solid var(--color-accent)',
                            borderRight: '4px solid var(--color-accent)',
                            zIndex: 2,
                        }}></div>
                    </div>

                    <div className="about-content">
                        {/* Header Block with tight spacing */}
                        <div style={{
                            marginBottom: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', // Centers item horizontally in flex column
                            textAlign: 'center' // Centers text content
                        }}>
                            <span style={{
                                display: 'block',
                                color: 'var(--color-accent)',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontSize: '0.85rem',
                                marginBottom: '5px'
                            }}>
                                Sobre Nosotros
                            </span>
                            <h2 className="section-title" style={{ margin: 0, lineHeight: 1.1 }}>
                                Ingeniería de Precisión para el <span className="text-accent">Renacer de Venezuela</span>
                            </h2>
                        </div>
                        <p className="about-text">
                            Entendemos que la reconstrucción de la infraestructura nacional no admite improvisaciones. En Adler Infraestructura, aplicamos protocolos de calidad europeos a la realidad tropical venezolana, garantizando obras que perduran en el tiempo.
                        </p>
                        <p className="about-text" style={{ marginBottom: '2.5rem' }}>
                            No somos solo constructores; somos auditores técnicos. Nuestra metodología detecta y corrige las desviaciones antes de que se conviertan en costos para el Estado o el inversor privado.
                        </p>

                        <div className="grid grid-2" style={{ gap: '2rem' }}>
                            <div className="feature-item">
                                <Briefcase className="text-accent" size={28} style={{ marginBottom: '0.5rem' }} />
                                <h5 style={{ fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>Estándar Europeo</h5>
                                <p className="text-sm text-muted">Rigor normativo (DIN/ISO) en cada proceso.</p>
                            </div>
                            <div className="feature-item">
                                <Settings className="text-accent" size={28} style={{ marginBottom: '0.5rem' }} />
                                <h5 style={{ fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>Adaptación Tropical</h5>
                                <p className="text-sm text-muted">Materiales formulados para nuestro clima.</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <Link to="/equipo" className="btn btn-primary">Conozca al Equipo</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
