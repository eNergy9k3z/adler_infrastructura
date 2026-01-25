import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Normativa.css';
import '../index.css';
import { BookOpen, Layers, Zap, AlertTriangle, CheckSquare, Microscope, BarChart3, Globe } from 'lucide-react';

const Normativa = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="normativa-page">
            {/* Hero Section */}
            <header className="normativa-hero" style={{ backgroundImage: 'url("/images/conservacion-vial.png")' }}>
                <div className="normativa-hero-overlay"></div>
                <div className="normativa-hero-content">
                    <span className="normativa-badge">INNOVACIÓN TÉCNICA</span>
                    <h1 className="normativa-title">Hacia una Nueva Era de la <span className="text-gradient">Ingeniería Vial</span> en Venezuela</h1>
                    <p className="normativa-intro">
                        El desarrollo nacional exige infraestructuras que perduren. Proponemos una actualización profunda de los criterios normativos, adaptando los más altos estándares mundiales a nuestra realidad tropical y operativa.
                    </p>
                </div>
            </header>

            <div className="container">
                {/* Intro Section */}
                <section className="normativa-section">
                    <div className="highlight-box" style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '4px solid var(--color-accent)', background: '#111' }}>
                        <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '15px', textAlign: 'center' }}>El Desafío de la Durabilidad</h3>
                        <p className="technical-text" style={{ textAlign: 'center', marginBottom: 0 }}>
                            Las normativas técnicas vigentes en Venezuela han servido bien durante décadas, pero la tecnología de materiales y las cargas de tráfico han evolucionado. Seguir construyendo con especificaciones de hace 40 años resulta en pavimentos que fallan prematuramente.
                        </p>
                    </div>
                </section>

                {/* 1. Diagnóstico / Patología */}
                <section className="normativa-section">
                    <div className="normativa-grid reversed">
                        <div className="normativa-content-block">
                            <span className="section-label" style={{ color: '#f87171' }}><AlertTriangle size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Diagnóstico Crítico</span>
                            <h2 className="section-heading">Patologías Recurrentes: El Costo de la Inacción</h2>
                            <p className="technical-text">
                                El fenómeno conocido como "piel de cocodrilo" (fatiga por cargas repetidas) es el síntoma más común en nuestras vías. No es mala suerte; es una falla estructural. Ocurre cuando la base granular se satura por infiltración de agua a través de grietas no selladas.
                            </p>
                            <p className="technical-text">
                                Una vez que el agua penetra, la capacidad portante de la vía colapsa. El bacheo superficial es solo un maquillaje cosmético que desperdicia presupuesto público. Se requiere atacar la causa raíz: la impermeabilización y la flexibilidad de la capa de rodadura.
                            </p>
                            <div className="stat-row" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                                <div>
                                    <span style={{ fontSize: '2rem', fontWeight: '800', color: '#f87171', display: 'block' }}>60%</span>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Pérdida de vida útil por sellado deficiente</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '2rem', fontWeight: '800', color: '#f87171', display: 'block' }}>3 Años</span>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Durabilidad promedio actual sin mantenimiento</span>
                                </div>
                            </div>
                        </div>
                        <div className="normativa-img-wrapper">
                            <img src="/images/tech-pathology.png" alt="Patología Vial Piel de Cocodrilo" className="normativa-img" />
                            <div className="img-caption" style={{ color: '#f87171' }}>Evidencia de falla por fatiga estructural</div>
                        </div>
                    </div>
                </section>

                {/* 2. Tecnología SMA */}
                <section className="normativa-section">
                    <div className="normativa-grid">
                        <div className="normativa-content-block">
                            <span className="section-label"><Layers size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Evolución Material</span>
                            <h2 className="section-heading">Mezclas SMA: <span className="text-accent">Stone Mastic Asphalt</span></h2>
                            <p className="technical-text">
                                El asfalto convencional (denso) ya no es suficiente para autopistas de alto tráfico. Proponemos la transición hacia mezclas SMA, caracterizadas por un esqueleto mineral "piedra sobre piedra" que soporta las cargas mecánicas, unido por un mástico rico en betún y polímeros.
                            </p>
                            <ul className="technical-text" style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '10px' }}><strong>Resistencia al Ahuellamiento:</strong> El contacto directo entre piedras evita deformaciones plásticas.</li>
                                <li style={{ marginBottom: '10px' }}><strong>Durabilidad Extrema:</strong> Mayor contenido de ligante asfáltico (hasta 7%) retarda el envejecimiento y la oxidación.</li>
                                <li style={{ marginBottom: '10px' }}><strong>Seguridad Vial:</strong> Textura macro-rugosa que mejora la adherencia y reduce el spray en lluvia.</li>
                            </ul>
                        </div>
                        <div className="normativa-img-wrapper">
                            <img src="/images/tech-sma.png" alt="Textura Asfalto SMA" className="normativa-img" />
                            <div className="img-caption">Textura cerrada SMA: Esqueleto mineral de alta fricción</div>
                        </div>
                    </div>
                </section>

                {/* 3. Juntas (Existing but refined position) */}
                <section className="normativa-section">
                    <div className="normativa-grid reversed">
                        <div className="normativa-content-block">
                            <span className="section-label"><Zap size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Juntas y Uniones</span>
                            <h2 className="section-heading">El Eslabón Perdido: Tratamiento de Juntas</h2>
                            <p className="technical-text">
                                La unión entre el asfalto y estructuras rígidas (brocales, alcantarillas) es el punto más vulnerable. La práctica común de "pintar" con emulsión es ineficaz.
                            </p>

                            <div className="highlight-box">
                                <span className="highlight-title">La Solución Técnica: Cintas de Sellado Vertical</span>
                                <p className="highlight-desc">
                                    Proponemos implementar normativas estrictas para el uso de cintas prefabricadas de betún modificado, aplicadas verticalmente en la cara de contacto ("junta fría") antes de verter el asfalto. Esto garantiza una fusión hermética y flexible que previene la infiltración de agua.
                                </p>
                            </div>
                        </div>
                        <div className="normativa-img-wrapper">
                            <img src="/images/cinta-tecnica-3x1.png" alt="Cinta bituminosa perfil 30x10mm" className="normativa-img" />
                            <div className="img-caption">Solución: Perfil rectangular de 30x10mm adherido verticalmente</div>
                        </div>
                    </div>
                </section>

                {/* 4. Control de Calidad (Lab) */}
                <section className="normativa-section">
                    <div className="normativa-grid">
                        <div className="normativa-content-block">
                            <span className="section-label"><Microscope size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Rigor Científico</span>
                            <h2 className="section-heading">Del Ensayo Empírico al <span className="text-accent">Desempeño</span></h2>
                            <p className="technical-text">
                                No se puede gestionar lo que no se mide. Adler impulsa la modernización de los laboratorios de control de calidad, migrando de ensayos puramente volumétricos (Marshall) a ensayos de desempeño (Superpave).
                            </p>
                            <p className="technical-text">
                                Exigimos caracterización reológica del ligante (PG Grade) para asegurar que el asfalto escogido soporte las temperaturas reales de la zona del proyecto, evitando el "sangrado" o agrietamiento térmico.
                            </p>
                        </div>
                        <div className="normativa-img-wrapper">
                            <img src="/images/tech-lab.png" alt="Laboratorio de Control de Calidad" className="normativa-img" />
                            <div className="img-caption">Ensayos de desempeño dinámico para garantizar la inversión</div>
                        </div>
                    </div>
                </section>

                {/* 5. Ciclo de Vida (Gráfico) */}
                <section className="normativa-section" style={{ background: '#0a0a0a', borderRadius: '16px', padding: '60px' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <span className="section-label" style={{ textAlign: 'center' }}><BarChart3 size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Rentabilidad</span>
                        <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '10px' }}>Análisis de Ciclo de Vida (LCCA)</h2>
                        <p className="technical-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                            La inversión inicial en tecnología de polímeros y juntas prefabricadas (CAPEX) se recupera en los primeros 4 años al eliminar intervenciones correctivas (OPEX).
                        </p>

                        {/* Custom CSS Chart */}
                        <div className="lifecycle-chart" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Bar 1 */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#ccc', fontSize: '0.9rem' }}>
                                    <span>Pavimento Convencional</span>
                                    <span>Vida Útil: 3-4 Años</span>
                                </div>
                                <div style={{ height: '24px', background: '#333', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ width: '30%', height: '100%', background: '#555', borderRadius: '12px' }}></div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>Requiere bacheo al año 2. Reasfaltado al año 4. Costo acumulado alto.</div>
                            </div>

                            {/* Bar 2 */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                                    <span>Tecnología Adler (SMA + Juntas)</span>
                                    <span style={{ color: 'var(--color-accent)' }}>Vida Útil: 12+ Años</span>
                                </div>
                                <div style={{ height: '32px', background: '#333', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 0 15px rgba(255, 159, 28, 0.2)' }}>
                                    <div style={{ width: '95%', height: '100%', background: 'var(--color-accent)', borderRadius: '16px' }}></div>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '5px' }}>Mantenimiento cero por 8 años. Retorno de inversión garantizado.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Standards Grid */}
                <section className="normativa-section">
                    <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>Marco Normativo de Referencia</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                            { code: "ASTM D638", title: "Propiedades Tensiles", desc: "Estándar para membranas y plásticos de ingeniería." },
                            { code: "ZTV Fug-StB 15", title: "Uniones en Pavimentos", desc: "Normativa alemana (referente mundial) para juntas viales." },
                            { code: "AASHTO M320", title: "Superpave PG", desc: "Especificación de ligantes asfálticos por grado de desempeño." },
                            { code: "COVENIN 2000-87", title: "Norma Venezolana", desc: "Base nacional sobre la cual proponemos los anexos de modernización." }
                        ].map((std, i) => (
                            <div key={i} style={{ background: '#111', padding: '25px', borderRadius: '8px', borderTop: '2px solid #333' }}>
                                <Globe size={24} color="#666" style={{ marginBottom: '15px' }} />
                                <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>{std.code}</h4>
                                <h5 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'normal' }}>{std.title}</h5>
                                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>{std.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action for Institutions */}
                <section className="cta-section">
                    <div className="cta-box">
                        <BookOpen size={48} color="var(--color-accent)" style={{ marginBottom: '20px' }} />
                        <h2 className="section-heading">Colaboración Institucional</h2>
                        <p className="technical-text" style={{ textAlign: 'center' }}>
                            En Adler Infraestructura, estamos dispuestos a colaborar con el Ministerio, Colegios de Ingenieros y Universidades para mesas de trabajo técnicas. Ponemos nuestra experiencia internacional a disposición para la redacción de nuevos pliegos y normas que construyan el país que merecemos.
                        </p>
                        <Link to="/#contacto" className="cta-btn">
                            Contactar Dirección Técnica
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Normativa;
