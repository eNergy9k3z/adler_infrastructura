import React, { useEffect } from 'react';
import { Award, GraduationCap, Linkedin, Mail, Briefcase, Building } from 'lucide-react';
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
                            <span className="profile-role">Ingeniero Civil y Director General</span>
                            <h1 className="profile-name">M.Eng. Cecil Sebastian Tovar</h1>
                            <p className="profile-intro">
                                Liderando la transformación de la infraestructura con excelencia técnica. Experto en gestión de contratos, innovación en construcción vial y liderazgo de equipos multiculturales.
                            </p>

                            <div className="profile-stats-row">
                                <div className="p-stat">
                                    <h4>6+</h4>
                                    <span>Años Exp.</span>
                                </div>
                                <div className="p-stat">
                                    <h4>3</h4>
                                    <span>Multinacionales</span>
                                </div>
                                <div className="p-stat">
                                    <h4>M.Eng.</h4>
                                    <span>Especializado</span>
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

                    {/* Biography & Vision */}
                    <div className="bio-section">
                        <h3>Visión Profesional</h3>
                        <p>
                            Mi carrera se ha forjado en el exigente mercado de la construcción alemana, gestionando proyectos de infraestructura vial y contratos complejos para gigantes de la industria como STRABAG y Eurovia.
                        </p>
                        <p>
                            Esta experiencia internacional me ha permitido dominar no solo la técnica constructiva de vanguardia, sino también la gestión contractual precisa y la implementación de innovaciones tecnológicas en obra. Ahora, como Director General de Adler Infraestructura, aplico este rigor alemán a cada proyecto que lideramos.
                        </p>
                        <p>
                            Combinamos la precisión en la ejecución con una visión estratégica orientada a resultados, garantizando que cada obra sea un activo duradero.
                        </p>
                    </div>

                    {/* Right Column: Experience & Education */}
                    <div className="creds-section">

                        {/* Experience Card */}
                        <div className="cred-group-card">
                            <div className="cred-group-title">
                                <Briefcase className="text-accent" size={24} />
                                <h4 style={{ margin: 0, fontWeight: 700 }}>Experiencia Profesional</h4>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Gerente de Contratos (Contract Manager)</div>
                                <div className="exp-company">STRABAG SE | CML Construction Services</div>
                                <span className="exp-date">Nov 2024 - Presente · Colonia, Alemania</span>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Gerente de Producto (Vialidad)</div>
                                <div className="exp-company">DENSO Group Germany</div>
                                <span className="exp-date">Jul 2022 - Oct 2024 · Leverkusen</span>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Jefe de Obra (Site Manager)</div>
                                <div className="exp-company">Eurovia</div>
                                <span className="exp-date">Dic 2020 - Jun 2022 · Coblenza</span>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Ingeniero de Costos / Trainee</div>
                                <div className="exp-company">STRABAG Group</div>
                                <span className="exp-date">Jun 2019 - Dic 2020 · Limburg</span>
                            </div>
                        </div>

                        {/* Education Card */}
                        <div className="cred-group-card">
                            <div className="cred-group-title">
                                <GraduationCap className="text-accent" size={24} />
                                <h4 style={{ margin: 0, fontWeight: 700 }}>Formación Académica</h4>
                            </div>

                            <div className="edu-item">
                                <div className="edu-degree">Máster en Ingeniería de Construcción Industrial (M.Eng.)</div>
                                <div className="edu-school">Hochschule für angewandtes Management</div>
                            </div>

                            <div className="edu-item">
                                <div className="edu-degree">Ingeniería Civil (B.Eng.)</div>
                                <div className="edu-school">University of Applied Sciences Koblenz</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
