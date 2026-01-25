import React, { useEffect } from 'react';
import './Dashboard.css';
import { LayoutDashboard, FileText, Activity, AlertCircle, Settings, LogOut, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
        // Clear auth logic here
        navigate('/');
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar Navigation */}
            <aside className="dash-sidebar">
                <h4 style={{ color: '#fff', marginBottom: '1rem', paddingLeft: '16px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu Principal</h4>

                <a href="#" className="dash-nav-item active">
                    <LayoutDashboard className="dash-nav-icon" /> Dashboard
                </a>
                <a href="#" className="dash-nav-item">
                    <FileText className="dash-nav-icon" /> Mis Contratos
                </a>
                <a href="#" className="dash-nav-item">
                    <Activity className="dash-nav-icon" /> Avance Físico
                </a>
                <a href="#" className="dash-nav-item">
                    <Download className="dash-nav-icon" /> Reportes
                </a>
                <a href="#" className="dash-nav-item">
                    <Settings className="dash-nav-icon" /> Configuración
                </a>

                <div className="user-profile">
                    <div className="avatar">MP</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: '0.9rem' }}>Ing. María Pérez</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>Constructora Vial S.A.</div>
                    </div>
                </div>

                <button onClick={handleLogout} className="dash-nav-item" style={{ marginTop: '10px', color: '#f87171', border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}>
                    <LogOut className="dash-nav-icon" /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main className="dash-main">
                <div className="dash-header">
                    <div>
                        <h1 className="dash-title">Resumen del Proyecto</h1>
                        <p className="dash-subtitle">Rehabilitación Autopista Regional del Centro - Tramo IV</p>
                    </div>
                    <div className="status-badge status-active">
                        EN EJECUCIÓN
                    </div>
                </div>

                {/* KPIs Grid */}
                <div className="kpi-grid">
                    <div className="kpi-card">
                        <div className="kpi-label">Avance Físico Acumulado</div>
                        <div className="kpi-value">68.4%</div>
                        <div className="kpi-trend trend-up">
                            <Activity size={14} /> +2.1% esta semana
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Valuaciones Aprobadas</div>
                        <div className="kpi-value">No. 12</div>
                        <div className="kpi-trend" style={{ color: '#aaa' }}>
                            Próxima corte: 30 Ene
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Alertas de Calidad</div>
                        <div className="kpi-value" style={{ color: '#fcb900' }}>2 Pendientes</div>
                        <div className="kpi-trend trend-down">
                            <AlertCircle size={14} /> Requiere atención
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Días Restantes</div>
                        <div className="kpi-value">45 Días</div>
                        <div className="kpi-trend">
                            Fecha fin: 15 Mar 2026
                        </div>
                    </div>
                </div>

                {/* Active Project Details */}
                <div className="project-panel">
                    <div className="panel-header">
                        <h3 style={{ color: 'white', margin: 0 }}>Desglose de Actividades Recientes</h3>
                        <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Descargar Informe Semanal</button>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: '#ccc' }}>
                                <span>Colocación de Carpeta Asfáltica (Rodamiento)</span>
                                <span>85% Completado</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: '#ccc' }}>
                                <span>Instalación de Juntas Elásticas (Puente Las Tejerías)</span>
                                <span>40% Completado</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '40%', backgroundColor: '#fcb900' }}></div>
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: '#ccc' }}>
                                <span>Demarcación y Señalización</span>
                                <span>10% Completado</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '10%', backgroundColor: '#666' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="project-panel" style={{ padding: '2rem', textAlign: 'center', borderStyle: 'dashed' }}>
                        <AlertCircle size={48} color="#444" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: '#888' }}>Solicitudes de Inspección</h4>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>No hay solicitudes pendientes de aprobación.</p>
                        <button className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Nueva Solicitud</button>
                    </div>
                    <div className="project-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <FileText size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: 'white' }}>Biblioteca Técnica</h4>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>Acceda a los planos aprobados y especificaciones técnicas del proyecto.</p>
                        <Link to="/resources" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>Ir a Biblioteca</Link>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
