import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contacto" className="section contact-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Contáctenos</h2>
                    <p className="section-subtitle">
                        Estamos listos para asistirle en sus proyectos de infraestructura.
                    </p>
                </div>

                <div className="contact-layout">
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <MapPin className="contact-icon" size={24} />
                            <div>
                                <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.25rem' }}>Ubicación</h4>
                                <p style={{ color: 'var(--color-text-muted)' }}>Caracas, Venezuela</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <Mail className="contact-icon" size={24} />
                            <div>
                                <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.25rem' }}>Email</h4>
                                <p style={{ color: 'var(--color-text-muted)' }}>info@adlerinfraestructura.com</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <Phone className="contact-icon" size={24} />
                            <div>
                                <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.25rem' }}>Teléfono</h4>
                                <p style={{ color: 'var(--color-text-muted)' }}>+49 172 7751060</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', padding: '1.5rem', borderLeft: '3px solid var(--color-accent)', background: 'rgba(255,255,255,0.03)' }}>
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                "La calidad de la infraestructura define el progreso de una nación."
                            </p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Nombre</label>
                                <input type="text" id="name" className="form-input" placeholder="Su nombre" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-input" placeholder="correo@ejemplo.com" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="subject">Asunto</label>
                            <input type="text" id="subject" className="form-input" placeholder="Interés en servicios..." />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Mensaje</label>
                            <textarea id="message" className="form-textarea" placeholder="Describa su proyecto o consulta..."></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
