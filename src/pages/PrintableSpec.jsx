import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import './PrintableSpec.css';

// Reusing data (ideally should be in a shared context/file, but duplicating for safety in this demo)
const servicesData = {
    "vialidad": {
        title: "Vías de Alta Velocidad",
        code: "SPEC-001-VAV",
        image: "/images/service-detail-vialidad.png",
        description: "Diseño y construcción de corredores viales de alto desempeño...",
        full_desc: "Diseñamos y construimos corredores viales de alto desempeño, optimizados para soportar cargas pesadas y tráfico intenso. Nuestra metodología integra mezclas asfálticas modificadas (SMA) y sistemas de contención vehicular certificados bajo norma AASHTO MASH.",
        specs: [
            { label: "Diseño Geométrico", value: "AASHTO Green Book 2018" },
            { label: "Pavimento", value: "Mezclas SMA con polímeros SBS" },
            { label: "Señalización", value: "Retrorreflectividad Tipo IV o superior" },
            { label: "Drenaje", value: "Sistemas de cunetas revestidas" },
            { label: "IRI Objetivo", value: "< 1.5 m/km" },
            { label: "Vida Útil Diseño", value: "20 Años" }
        ],
    },
    "hidraulica": {
        title: "Infraestructura Hidráulica",
        code: "SPEC-002-HID",
        image: "/images/service-detail-hidraulica.png",
        full_desc: "Mitigación de riesgos en zonas urbanas mediante la canalización de cursos de agua con hormigón armado de alta resistencia. Diseñamos estructuras capaces de soportar crecidas milenarias, protegiendo a las comunidades aledañas.",
        specs: [
            { label: "Concreto", value: "f'c = 350 kg/cm² sulfato-resistente" },
            { label: "Acero de Refuerzo", value: "A-615 Grado 60" },
            { label: "Juntas", value: "Waterstop PVC + Sello Elastomérico" },
            { label: "Acabado Sup.", value: "Liso hidráulico (n=0.013)" },
            { label: "Periodo Retorno", value: "500 - 1000 Años" }
        ],
    },
    "paisajismo": {
        title: "Paisajismo Urbano",
        code: "SPEC-003-URB",
        image: "/images/service-detail-paisajismo.png",
        full_desc: "Transformación de espacios residuales en parques lineales modernos. Integración de infraestructura gris y verde con especies tropicales de bajo mantenimiento.",
        specs: [
            { label: "Pavimentos", value: "Adoquines permeables / Concreto estampado" },
            { label: "Iluminación", value: "LED Solar 60W IP66" },
            { label: "Mobiliario", value: "Concreto Arquitectónico Reforzado" },
            { label: "Riego", value: "Automatizado por goteo subterráneo" },
            { label: "Sostenibilidad", value: "Criterios LEED SITES" }
        ],
    },
    "rehabilitacion": {
        title: "Rehabilitación Vial",
        code: "SPEC-004-REH",
        image: "/images/service-detail-rehabilitacion.png",
        full_desc: "Ejecución de trabajos de fresado profundo y sustitución de carpeta asfáltica en horario nocturno con maquinaria Wirtgen de alta precisión.",
        specs: [
            { label: "Prof. Fresado", value: "Variable 5cm - 20cm" },
            { label: "Microfresado", value: "Textura fina para adherencia (3mm)" },
            { label: "Riego de Liga", value: "Emulsión termoadherente modificada" },
            { label: "Compactación", value: "Rodillos oscilatorios inteligentes" },
            { label: "Horario", value: "Nocturno (10pm - 5am)" }
        ],
    }
};

const PrintableSpec = () => {
    const { id } = useParams();
    const service = servicesData[id];

    const handlePrint = () => {
        window.print();
    };

    if (!service) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Servicio no encontrado</div>;

    return (
        <>
            {/* Force hide global UI elements for this view */}
            <style>{`
                .navbar, .footer, .whatsapp-button { display: none !important; }
                body { background-color: #525659; overflow-y: hidden; }
                .doc-viewer-container { height: 100vh; overflow-y: auto; }
            `}</style>

            <div className="doc-viewer-container">
                {/* Control Bar */}
                <div className="doc-controls">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
                        <Link to={`/servicios/${id}`} className="btn-back">
                            &larr; Volver al Servicio
                        </Link>
                        <button onClick={handlePrint} className="btn-print">
                            <Download size={18} /> Descargar / Imprimir PDF
                        </button>
                    </div>
                </div>

                <div className="print-page">
                    <div className="print-header">
                        <div className="brand">
                            <h1 style={{ color: 'black', margin: 0 }}>ADLER<span style={{ color: '#aaa' }}>INFRAESTRUCTURA</span></h1>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>Ingeniería de Precisión</p>
                        </div>
                        <div className="doc-info">
                            <h3>FICHA TÉCNICA</h3>
                            <p><strong>Código:</strong> {service.code}</p>
                            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="print-content">
                        <div className="hero-section">
                            <img src={service.image} alt={service.title} className="print-img" />
                            <h2 className="print-title">{service.title}</h2>
                        </div>

                        <div className="desc-section">
                            <h4>Descripción del Servicio</h4>
                            <p>{service.full_desc}</p>
                        </div>

                        <div className="specs-section">
                            <h4>Especificaciones Técnicas</h4>
                            <table className="specs-table">
                                <thead>
                                    <tr>
                                        <th>Parámetro</th>
                                        <th>Especificación / Estándar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {service.specs.map((spec, i) => (
                                        <tr key={i}>
                                            <td>{spec.label}</td>
                                            <td>{spec.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="footer-section">
                            <div className="footer-col">
                                <h5>Aprobado Por:</h5>
                                <div className="signature-line">Ing. Director Técnico</div>
                            </div>
                        </div>
                    </div>

                    <div className="print-footer">
                        <p>Adler Infraestructura C.A. | RIF: J-12345678-9 | Caracas, Venezuela</p>
                        <p>www.adler-infraestructura.com | contacto@adler.com</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintableSpec;
