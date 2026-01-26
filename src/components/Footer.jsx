import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Footer.css';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo-wrapper">
                            <img src={logo} alt="Adler Infraestructura" className="footer-logo-img" />
                            <div className="footer-logo-text">
                                ADLER <span className="footer-logo-accent">INFRAESTRUCTURA</span>
                            </div>
                        </div>
                        <p className="footer-description">
                            Soluciones integrales de ingeniería y gestión para el desarrollo vial de Venezuela.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-heading">Enlaces Rápidos</h4>
                        <ul className="footer-links">
                            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Inicio</Link></li>
                            <li><Link to="/#servicios">Servicios</Link></li>
                            <li><Link to="/#nosotros">Nosotros</Link></li>
                            <li><Link to="/#contacto">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Contacto</h4>
                        <ul className="footer-links">
                            <li>Caracas, Venezuela</li>
                            <li>info@adlerinfraestructura.com</li>
                            <li>+49 172 7751060</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Síguenos</h4>
                        <div className="social-links" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap' }}>
                            {/* Instagram */}
                            <div className="social-icon" style={{ backgroundColor: '#222', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', transition: 'background 0.3s', flexShrink: 0 }} title="Instagram">
                                <Instagram size={18} color="white" />
                            </div>

                            {/* X */}
                            <div className="social-icon" style={{ backgroundColor: '#222', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', transition: 'background 0.3s', flexShrink: 0 }} title="X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                            </div>

                            {/* TikTok */}
                            <div className="social-icon" style={{ backgroundColor: '#222', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', transition: 'background 0.3s', flexShrink: 0 }} title="TikTok">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                            </div>

                            {/* Facebook */}
                            <div className="social-icon" style={{ backgroundColor: '#222', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', transition: 'background 0.3s', flexShrink: 0 }} title="Facebook">
                                <Facebook size={18} color="white" />
                            </div>

                            {/* WhatsApp */}
                            <div className="social-icon" style={{ backgroundColor: '#25D366', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', transition: 'background 0.3s', flexShrink: 0 }} title="WhatsApp">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Adler Infraestructura. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
