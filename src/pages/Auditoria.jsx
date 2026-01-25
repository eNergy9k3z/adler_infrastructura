import React, { useState, useEffect } from 'react';
import './Auditoria.css';
import '../index.css';
import { ClipboardCheck, FileText, Building2, HardHat, FileSearch } from 'lucide-react';

const Auditoria = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        nombre: '',
        cargo: '',
        email: '',
        telefono: '',
        empresa: '',
        tipoAuditoria: 'tecnica', // 'tecnica' or 'gestion'
        nombreProyecto: '',
        ubicacion: '',
        tipoObra: 'vialidad',
        otroTipoObra: '',
        presupuesto: '',
        descripcionProblema: '',
        // Technical Specifics
        fallasVisibles: '',
        ensayosDisponibles: 'no',
        // Contractual Specifics
        tipoContrato: 'precios_unitarios',
        estadoPagos: 'al_dia'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Gracias por su solicitud. Nuestro equipo de expertos revisará la información y le contactará en breve para coordinar la evaluación preliminar.');
        console.log("Form Data:", formData);
    };

    return (
        <div className="auditoria-page">
            {/* Hero Section */}
            <header className="auditoria-hero" style={{ backgroundImage: 'url("/images/conservacion-vial.png")' }}>
                <div className="auditoria-hero-content">
                    <h1 className="auditoria-title">Solicitud de <span className="text-gradient">Auditoría</span></h1>
                    <p className="auditoria-subtitle">
                        Evalúe el estado técnico y financiero de sus proyectos de infraestructura con los estándares más rigurosos de la ingeniería alemana.
                    </p>
                </div>
            </header>

            <section className="auditoria-container">
                <form className="audit-form-card" onSubmit={handleSubmit}>

                    {/* 1. Selección de Servicio */}
                    <div className="form-section">
                        <h3 className="form-section-title"><FileSearch size={24} /> Tipo de Servicio Requerido</h3>
                        <p style={{ marginBottom: '20px', color: '#ccc' }}>Seleccione el enfoque principal de la auditoría:</p>

                        <div className="audit-type-grid">
                            <label className="radio-card">
                                <input
                                    type="radio"
                                    name="tipoAuditoria"
                                    value="tecnica"
                                    checked={formData.tipoAuditoria === 'tecnica'}
                                    onChange={handleChange}
                                />
                                <div className="card-content">
                                    <HardHat className="audit-icon" />
                                    <span className="card-title">Auditoría Técnica</span>
                                    <span className="card-desc">Evaluación de calidad de materiales, ejecución, pavimentos, estructuras y cumplimiento de normas COVENIN/DIN.</span>
                                </div>
                            </label>

                            <label className="radio-card">
                                <input
                                    type="radio"
                                    name="tipoAuditoria"
                                    value="gestion"
                                    checked={formData.tipoAuditoria === 'gestion'}
                                    onChange={handleChange}
                                />
                                <div className="card-content">
                                    <FileText className="audit-icon" />
                                    <span className="card-title">Gestión de Contratos</span>
                                    <span className="card-desc">Revisión de valuaciones, reclamos financieros, cronogramas, análisis de precios y disputas contractuales.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* 2. Información del Contacto */}
                    <div className="form-section">
                        <h3 className="form-section-title"><Building2 size={24} /> Datos del Solicitante</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" name="nombre" className="form-input" placeholder="Ing. Juan Pérez" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cargo / Rol</label>
                                <input type="text" name="cargo" className="form-input" placeholder="Ej. Gerente de Proyecto" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Corporativo</label>
                                <input type="email" name="email" className="form-input" placeholder="juan@empresa.com" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Teléfono / WhatsApp</label>
                                <input type="tel" name="telefono" className="form-input" placeholder="+58 414 1234567" required onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label className="form-label">Empresa o Ente Contratante</label>
                                <input type="text" name="empresa" className="form-input" placeholder="Nombre de la Constructora o Institución Pública" required onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* 3. Información del Proyecto */}
                    <div className="form-section">
                        <h3 className="form-section-title"><ClipboardCheck size={24} /> Detalles del Proyecto</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Nombre del Proyecto</label>
                                <input type="text" name="nombreProyecto" className="form-input" placeholder="Ej. Rehabilitación Autopista Regional del Centro, Tramo Aragua" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Ubicación (Estado/Ciudad)</label>
                                <input type="text" name="ubicacion" className="form-input" placeholder="Ej. Valencia, Carabobo" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tipo de Infraestructura</label>
                                <select name="tipoObra" className="form-select" onChange={handleChange} value={formData.tipoObra}>
                                    <option value="vialidad">Vialidad / Autopista</option>
                                    <option value="puente">Puente / Viaducto</option>
                                    <option value="urbanismo">Urbanismo / Calles</option>
                                    <option value="movimiento_tierra">Movimiento de Tierras</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            {/* Campo condicional para OTRO tipo de obra */}
                            {formData.tipoObra === 'otro' && (
                                <div className="form-group full-width" style={{ animation: 'fadeIn 0.3s' }}>
                                    <label className="form-label" style={{ color: 'var(--color-accent)' }}>Especifique el Tipo de Infraestructura</label>
                                    <input
                                        type="text"
                                        name="otroTipoObra"
                                        className="form-input"
                                        placeholder="Ej. Túnel, Presa, Aeropuerto..."
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {/* Campos Condicionales - TÉCNICA */}
                            {formData.tipoAuditoria === 'tecnica' && (
                                <>
                                    <div className="form-group full-width">
                                        <label className="form-label">Descripción de las Fallas Observadas (Opcional)</label>
                                        <textarea name="fallasVisibles" className="form-textarea" placeholder="Ej. Piel de cocodrilo severa en km 10-15, hundimientos en hombrillos..." onChange={handleChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">¿Posee Ensayos de Laboratorio Recientes?</label>
                                        <select name="ensayosDisponibles" className="form-select" onChange={handleChange}>
                                            <option value="no">No, se requieren nuevos</option>
                                            <option value="si_parcial">Sí, pero incompletos</option>
                                            <option value="si_completo">Sí, dossier completo</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Campos Condicionales - GESTIÓN */}
                            {formData.tipoAuditoria === 'gestion' && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">Modalidad de Contratación</label>
                                        <select name="tipoContrato" className="form-select" onChange={handleChange}>
                                            <option value="precios_unitarios">Precios Unitarios</option>
                                            <option value="suma_global">Suma Global (Llave en Mano)</option>
                                            <option value="administracion">Administración Delegada</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Estatus Financiero</label>
                                        <select name="estadoPagos" className="form-select" onChange={handleChange}>
                                            <option value="al_dia">Pagos al día</option>
                                            <option value="retraso_leve">Retrasos menores (1-3 meses)</option>
                                            <option value="retraso_critico">Deuda acumulada / Paralización</option>
                                            <option value="disputa">En disputa legal</option>
                                        </select>
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="form-label">Descripción del Conflicto o Requerimiento (Opcional)</label>
                                        <textarea name="descripcionProblema" className="form-textarea" placeholder="Ej. Discrepancia en el cálculo de variaciones de precios del acero..." onChange={handleChange}></textarea>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                    <button type="submit" className="submit-btn" style={{ fontWeight: '800' }}>
                        Solicitar Evaluación Preliminar
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '0.9rem' }}>
                        Su información es confidencial y está protegida bajo nuestros acuerdos de no divulgación (NDA).
                    </p>

                </form>
            </section>
        </div>
    );
};

export default Auditoria;
