import React, { useEffect } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-hero">
                <div className="container">
                    <div className="profile-header-grid">
                        {/* Photo Section */}
                        <div className="profile-photo-wrapper">
                            <div className="photo-frame"></div>
                            {/* Placeholder for real photo */}
                            <div className="profile-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333' }}>
                                <span style={{ fontSize: '5rem', color: '#555' }}>IMG</span>
                            </div>
                        </div>

                        {/* Text Information */}
                        <div className="profile-info">
                            <span className="profile-role">Director General</span>
                            <h1 className="profile-name">Ing. Roberto Adler</h1>
                            <p className="profile-intro">
                                Liderando la transformación de la infraestructura venezolana con más de 20 años de experiencia en gestión de contratos FIDIC y auditoría técnica de alto nivel.
                            </p>

                            <div className="profile-stats-row">
                                <div className="p-stat">
                                    <h4>20+</h4>
                                    <span>Años Exp.</span>
                                </div>
                                <div className="p-stat">
                                    <h4>$500M+</h4>
                                    <span>Cartera Auditada</span>
                                </div>
                                <div className="p-stat">
                                    <h4>50+</h4>
                                    <span>Proyectos</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <a href="mailto:director@adler.com" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                                    <Mail size={18} /> Contactar
                                </a>
                                <a href="#" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container profile-body">
                <div className="grid grid-2" style={{ alignItems: 'start', gap: '4rem' }}>

                    {/* Biography */}
                    <div className="bio-section">
                        <h3>Trayectoria Profesional</h3>
                        <p>
                            Como fundador de Adler Infraestructura, he dedicado mi carrera a elevar los estándares de la ingeniería civil en la región. Mi enfoque combina la precisión técnica de las normativas internacionales con un profundo entendimiento de la realidad operativa local.
                        </p>
                        <p>
                            Antes de establecer Adler, lideré departamentos de control de calidad en megaproyectos viales, donde identifiqué la necesidad crítica de una auditoría técnica independiente que garantizara transparencia para los inversores.
                        </p>
                        <p>
                            Mi filosofía es simple: "La calidad no es un accidente, es el resultado de una intención inteligente".
                        </p>
                    </div>

                    {/* Credentials Sidebar */}
                    <div className="creds-section">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>Credenciales</h3>

                        <div className="cred-card" style={{ marginBottom: '1rem' }}>
                            <div className="cred-icon"><GraduationCap size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Ingeniería Civil</h5>
                            <p className="text-muted text-sm">Universidad Central de Venezuela (UCV)</p>
                        </div>

                        <div className="cred-card" style={{ marginBottom: '1rem' }}>
                            <div className="cred-icon"><Award size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Master en Gerencia de Proyectos</h5>
                            <p className="text-muted text-sm">IESA / PMI Certified</p>
                        </div>

                        <div className="cred-card">
                            <div className="cred-icon"><BookOpen size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Certificación FIDIC</h5>
                            <p className="text-muted text-sm">Gestión de Contratos Internacionales</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
