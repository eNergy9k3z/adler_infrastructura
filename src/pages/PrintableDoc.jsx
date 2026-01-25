import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import './PrintableSpec.css';

const docsData = {
    "politica-calidad": {
        title: "Política Integrada de Gestión",
        code: "DOC-ISO-001",
        version: "v4.2",
        content: (
            <>
                <h4>1. Declaración de Compromiso</h4>
                <p>
                    Adler Infraestructura C.A. se compromete a la excelencia en la ingeniería civil, garantizando la satisfacción del cliente y la sostenibilidad de sus operaciones. Nuestra gestión se basa en la mejora continua, el cumplimiento legal y la mitigación de riesgos.
                </p>
                <h4>2. Objetivos de Calidad (ISO 9001)</h4>
                <ul>
                    <li>Garantizar que el 100% de los proyectos cumplan con especificaciones técnicas contractuales.</li>
                    <li>Reducir las no conformidades en obra a menos del 2% anual.</li>
                    <li>Capacitar continuamente al personal técnico en nuevas tecnologías (BIM, Nuevos Materiales).</li>
                </ul>
                <h4>3. Gestión Ambiental (ISO 14001)</h4>
                <p>
                    Minimizamos nuestra huella ecológica priorizando el uso de concretos reciclados, asfalto fresado (RAP) y maquinaria de baja emisión. Nos comprometemos a prevenir la contaminación en todos nuestros frentes de trabajo.
                </p>
                <h4>4. Seguridad y Salud (ISO 45001)</h4>
                <p>
                    La vida humana es nuestro activo más valioso. Proveemos condiciones de trabajo seguras y saludables para prevenir lesiones. "Cero Accidentes" no es un lema, es nuestro estándar operativo diario.
                </p>
            </>
        )
    },
    "manual-buenas-practicas": {
        title: "Manual de Buenas Prácticas y Ética",
        code: "MAN-OPS-003",
        version: "v2.0",
        content: (
            <>
                <h4>1. Integridad en los Negocios</h4>
                <p>
                    Adler Infraestructura prohíbe estrictamente cualquier forma de soborno o corrupción. Todas las transacciones deben ser transparentes y estar debidamente registradas. Nuestros colaboradores no pueden aceptar regalos que comprometan su imparcialidad.
                </p>
                <h4>2. Relación con la Comunidad</h4>
                <p>
                    Respetamos el entorno social donde operamos. Mantenemos canales de comunicación abiertos con las comunidades locales para mitigar el impacto de nuestras obras (ruido, polvo, tráfico).
                </p>
                <h4>3. Calidad en la Ejecución</h4>
                <ul>
                    <li><strong>No improvisamos:</strong> Todo trabajo debe tener una planificación previa y un análisis de riesgos.</li>
                    <li><strong>No ocultamos errores:</strong> Cualquier falla constructiva se reporta, se analiza y se corrige de raíz.</li>
                    <li><strong>Limpieza:</strong> Un frente de trabajo ordenado es un frente de trabajo seguro y eficiente.</li>
                </ul>
                <h4>4. Confidencialidad</h4>
                <p>
                    Protegemos la información sensible de nuestros clientes y proyectos. Los planos, contratos y datos financieros se manejan con estricta reserva profesional.
                </p>
            </>
        )
    }
};

const PrintableDoc = () => {
    const { docId } = useParams();
    const doc = docsData[docId];

    const handlePrint = () => {
        window.print();
    };

    if (!doc) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Documento no encontrado</div>;

    return (
        <>
            {/* Force hide global UI elements for this view */}
            <style>{`
                .navbar, .footer, .whatsapp-button { display: none !important; }
                body { background-color: #525659; overflow-y: hidden; }
                .doc-viewer-container { height: 100vh; overflow-y: auto; }
            `}</style>

            <div className="doc-viewer-container">
                {/* Control Bar (Visible only on screen) */}
                <div className="doc-controls">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
                        <Link to="/certificaciones" className="btn-back">
                            &larr; Volver
                        </Link>
                        <button onClick={handlePrint} className="btn-print">
                            <Download size={18} /> Descargar / Imprimir PDF
                        </button>
                    </div>
                </div>

                {/* The Document Paper */}
                <div className="print-page">
                    <div className="print-header">
                        <div className="brand">
                            <h1 style={{ color: 'black', margin: 0 }}>ADLER<span style={{ color: '#aaa' }}>INFRAESTRUCTURA</span></h1>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>Sistema de Gestión Integrado</p>
                        </div>
                        <div className="doc-info">
                            <h3>DOCUMENTO CONTROLADO</h3>
                            <p><strong>Ref:</strong> {doc.code}</p>
                            <p><strong>Versión:</strong> {doc.version}</p>
                            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="print-content">
                        <h2 className="print-title" style={{ marginBottom: '40px', borderColor: '#333' }}>{doc.title}</h2>

                        <div className="desc-section doc-body">
                            {/* Inject definition list styles for this view */}
                            <style>{`
                                .doc-body ul { padding-left: 20px; margin-bottom: 20px; }
                                .doc-body li { margin-bottom: 5px; font-size: 14px; }
                            `}</style>
                            {doc.content}
                        </div>

                        <div className="footer-section" style={{ marginTop: '80px' }}>
                            <div className="footer-col" style={{ display: 'flex', gap: '50px' }}>
                                <div>
                                    <h5>Revisado Por:</h5>
                                    <div className="signature-line">Gerencia de Calidad</div>
                                </div>
                                <div>
                                    <h5>Aprobado Por:</h5>
                                    <div className="signature-line">Dirección General</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="print-footer">
                        <p>Este documento es propiedad intelectual de Adler Infraestructura C.A. Su reproducción total o parcial sin autorización está prohibida.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintableDoc;
