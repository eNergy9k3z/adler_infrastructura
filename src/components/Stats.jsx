
import React from 'react';
import './Stats.css';

const statsData = [
    { value: "+$500M", label: "Activos Gestionados" },
    { value: "120+", label: "Auditorías Técnicas" },
    { value: "45", label: "Contratos de Supervisión" },
    { value: "100%", label: "Cumplimiento Normativo" }
];

const Stats = () => {
    return (
        <div className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
