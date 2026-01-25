import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Briefcase } from 'lucide-react';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Toggle Login/Register
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        company: ''
    });

    // Reset scroll on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulation of API Call
        setTimeout(() => {
            setLoading(false);
            if (isLogin) {
                // Login Success simulation
                alert("¡Bienvenido al Portal de Clientes Adler! Iniciando sesión...");
                // Here we would save tokens to localStorage/Context
                navigate('/dashboard'); // Redirect to dashboard logic
            } else {
                // Register Success simulation
                alert("Cuenta creada exitosamente. Por favor revise su correo para la verificación.");
                setIsLogin(true); // Switch to login
            }
        }, 1500);
    };

    return (
        <div className="login-page">
            <div className="login-bg-glow"></div>

            <div className="login-container">

                {/* Visual Side */}
                <div
                    className="login-image-side"
                    style={{ backgroundImage: 'url("/images/obras-hidraulicas.png")' }}
                >
                    <div className="login-image-overlay"></div>
                    <div className="login-brand-content">
                        <Link to="/" className="login-brand-logo" style={{ textDecoration: 'none' }}>
                            ADLER <span style={{ color: 'var(--color-accent)' }}>INFRAESTRUCTURA</span>
                        </Link>
                        <div className="brand-quote">
                            "La excelencia no es un acto, sino un hábito. Construimos el futuro con precisión alemana y pasión venezolana."
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="login-form-side">
                    <div className="login-header">
                        <h2 className="login-title">
                            {isLogin ? 'Bienvenido de nuevo' : 'Crear Cuenta Corporativa'}
                        </h2>
                        <p className="login-subtitle">
                            {isLogin
                                ? 'Acceda al panel de gestión de proyectos y auditorías.'
                                : 'Regístrese para solicitar auditorías y gestionar contratos.'}
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>

                        {!isLogin && (
                            <>
                                <div className="input-group">
                                    <label className="input-label">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="auth-input"
                                        placeholder="Ej. Ing. María Pérez"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Empresa / Institución</label>
                                    <input
                                        type="text"
                                        name="company"
                                        className="auth-input"
                                        placeholder="Ej. Constructora Vial S.A."
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="input-group">
                            <label className="input-label">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="nombre@empresa.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isLogin && (
                            <div className="forgot-password">
                                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>¿Olvidó su contraseña?</a>
                            </div>
                        )}

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? <span className="loading-spinner"></span> : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                        </button>

                    </form>

                    <div className="toggle-auth">
                        {isLogin ? "¿No tiene una cuenta?" : "¿Ya tiene una cuenta?"}
                        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Solicitar Acceso" : "Inicie Sesión"}
                        </span>
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <Link to="/" style={{ color: '#555', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <ArrowLeft size={16} /> Volver al Inicio
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
