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
                            Soy un ingeniero civil venezolano que ha forjado su carrera en el corazón de la ingeniería europea. Durante más de seis años, he gestionado proyectos de infraestructura vial de alta complejidad y contratos estratégicos para líderes globales de la industria como STRABAG y Eurovia en Alemania. Esta trayectoria me ha permitido dominar la técnica constructiva de vanguardia y la rigurosidad contractual que define al mercado más exigente del mundo.
                        </p>
                        <p>
                            Mi experiencia internacional no es solo un credencial, es una herramienta de transformación. He liderado equipos multiculturales y supervisado obras donde la precisión milimétrica y la eficiencia de costos no son opcionales. Ahora, canalizo todo este <em>know-how</em> hacia Adler Infraestructura con un objetivo claro: elevar el estándar de la ingeniería en Venezuela.
                        </p>
                        <p>
                            Entendemos que nuestra geografía y nuestros retos son únicos. Por eso, mi enfoque no se basa en copiar modelos, sino en adaptar la excelencia operativa alemana a la realidad venezolana. Implementamos protocolos de auditoría técnica y soluciones de pavimentación innovadoras que garantizan durabilidad real, combatiendo la obsolescencia prematura de nuestras vías.
                        </p>
                        <p>
                            Combinamos la disciplina en la ejecución con una visión estratégica profundamente comprometida con el desarrollo nacional. Cada proyecto que asumimos es una oportunidad para demostrar que en Venezuela se puede construir con calidad de exportación, transparencia absoluta y visión de largo plazo.
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
