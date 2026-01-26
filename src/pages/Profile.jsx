import React, { useEffect } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Linkedin, Mail } from 'lucide-react';
import './Profile.css';
import profileImg from '../assets/cecil_profile.png';

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
                            <img
                                src={profileImg}
                                alt="M.Eng. Cecil Sebastian Tovar"
                                className="profile-photo"
                            />
                        </div>

                        {/* Text Information */}
                        <div className="profile-info">
                            <span className="profile-role">Ingeniero Civil</span>
                            <h1 className="profile-name">M.Eng. Cecil Sebastian Tovar</h1>
                            <p className="profile-intro">
                                Liderando la transformación de la infraestructura con excelencia técnica. Experto en gestión de proyectos de ingeniería civil y consultoría especializada.
                            </p>

                            <div className="profile-stats-row">
                                <div className="p-stat">
                                    <h4>15+</h4>
                                    <span>Años Exp.</span>
                                </div>
                                <div className="p-stat">
                                    <h4>$500M+</h4>
                                    <span>Gestionados</span>
                                </div>
                                <div className="p-stat">
                                    <h4>50+</h4>
                                    <span>Proyectos</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <a href="mailto:info@adlerinfraestructura.com" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                                    <Mail size={18} /> Contactar
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/cecil-sebastian-tovar-728724185/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{ gap: '0.5rem' }}
                                >
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
                            Como líder en Adler Infraestructura, enfoco mi práctica profesional en la integración de estándares internacionales de ingeniería con las necesidades específicas del desarrollo local. Mi formación académica avanzada (Master of Engineering) me permite abordar problemas complejos con soluciones técnicas robustas y sostenibles.
                        </p>
                        <p>
                            Mi experiencia abarca desde la planificación estratégica y auditoría técnica hasta la gestión integral de contratos de construcción, asegurando siempre el cumplimiento normativo y la eficiencia en la inversión.
                        </p>
                        <p>
                            Creo firmemente que la ingeniería civil no solo construye estructuras, sino que fundamenta el desarrollo económico y social de las comunidades.
                        </p>
                    </div>

                    {/* Credentials Sidebar */}
                    <div className="creds-section">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>Credenciales</h3>

                        <div className="cred-card" style={{ marginBottom: '1rem' }}>
                            <div className="cred-icon"><Award size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Master of Engineering (M.Eng.)</h5>
                            <p className="text-muted text-sm">Postgrado Especializado</p>
                        </div>

                        <div className="cred-card" style={{ marginBottom: '1rem' }}>
                            <div className="cred-icon"><GraduationCap size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Ingeniero Civil</h5>
                            <p className="text-muted text-sm">Universidad Central de Venezuela (UCV)</p>
                        </div>

                        <div className="cred-card">
                            <div className="cred-icon"><BookOpen size={24} /></div>
                            <h5 style={{ color: 'white', fontWeight: 'bold' }}>Gerencia de Proyectos</h5>
                            <p className="text-muted text-sm">Gestión Técnica y Administrativa</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
