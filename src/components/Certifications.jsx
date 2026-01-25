
import React from 'react';
import './Certifications.css';

const Certifications = () => {
    return (
        <div className="certifications-ticker">
            <div className="container">
                <div className="cert-wrapper">
                    <span className="cert-label">Estándares Internacionales:</span>
                    <div className="cert-list">
                        <span className="cert-item">ISO 9001:2015</span>
                        <span className="cert-divider">•</span>
                        <span className="cert-item">FIDIC Member</span>
                        <span className="cert-divider">•</span>
                        <span className="cert-item">RNC Habilitado</span>
                        <span className="cert-divider">•</span>
                        <span className="cert-item">Cámara de la Construcción</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certifications;
