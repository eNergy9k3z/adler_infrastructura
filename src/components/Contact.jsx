import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '' // Using 'subject' as 'company' or similar if needed, adjusting payload
    });
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('uploading');

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        company: formData.subject // Mapping subject input to company or just storing as extra field if schema allows
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

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

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-input"
                                    placeholder="Su nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="correo@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="subject">Asunto / Empresa</label>
                            <input
                                type="text"
                                id="subject"
                                className="form-input"
                                placeholder="Interés en servicios..."
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Mensaje</label>
                            <textarea
                                id="message"
                                className="form-textarea"
                                placeholder="Describa su proyecto o consulta..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={status === 'uploading'}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {status === 'uploading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Enviando...
                                </>
                            ) : status === 'success' ? (
                                '¡Mensaje Enviado!'
                            ) : status === 'error' ? (
                                'Error al enviar'
                            ) : (
                                <>
                                    Enviar Mensaje <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
