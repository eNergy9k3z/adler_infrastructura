import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Proyectos.css'; // Import the new specific styles
import '../index.css';

const Proyectos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 900 ? 3 : 1);
        };

        // Set initial
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const projects = [
        {
            id: 1,
            title: "Rehabilitación Autopista A3",
            location: "Heiligenroth - Limburg, Alemania",
            description: "Rehabilitación integral de la carpeta de rodadura en este tramo estratégico de alta velocidad. Se implementó tecnología de Asfalto Fundido (Gussasphalt) para garantizar máxima durabilidad, impermeabilidad y resistencia al tráfico pesado. El proyecto incluyó fresado de capas existentes y aplicación de nuevas capas de base y rodadura bajo estrictos estándares de calidad europeos.",
            tags: ["Autopistas", "Asfalto Fundido", "Rehabilitación"],
            image: "/images/projects/a3-autobahn.png"
        },
        {
            id: 2,
            title: "Renovación Urbana Ransbach-Baumbach",
            location: "Ransbach-Baumbach, Alemania",
            description: "Proyecto integral de renovación urbana que abarcó la modernización del sistema de canalización y drenaje de la ciudad. Se reconstruyeron calles principales y se mejoraron aceras utilizando adoquines de alta estética. La obra incluyó la instalación de nuevos postes de iluminación, red eléctrica y la creación de nuevas áreas verdes y paisajismo para revitalizar el entorno urbano.",
            tags: ["Canalización", "Urbanismo", "Adoquines", "Paisajismo"],
            image: "/images/projects/ransbach-baumbach.png"
        },
        {
            id: 3,
            title: "Gestión Contractual Kirchheimer Dreieck",
            location: "Bad Hersfeld, Alemania",
            description: "Servicios especializados de Gestión de Contratos y Manejo de Reclamos (Claim Management) para el proyecto de ampliación y mejora del nodo vial 'Kirchheimer Dreieck'. Se realizó el seguimiento contractual, control de costos, gestión de variaciones y resolución de disputas para asegurar el cumplimiento financiero y temporal de esta obra de infraestructura crítica.",
            tags: ["Gestión de Contratos", "Claim Management", "Consultoría"],
            image: "/images/projects/kirchheimer-dreieck.png"
        },
        {
            id: 4,
            title: "Asesoría Técnica Vial Colonia",
            location: "Colonia (Köln), Alemania",
            description: "Consultoría técnica experta para el programa de restauración de avenidas principales en la ciudad de Colonia. El alcance incluyó evaluación de pavimentos, diseño de soluciones de rehabilitación, optimización de procesos constructivos y supervisión técnica para extender la vida útil de la red vial metropolitana.",
            tags: ["Asesoría Técnica", "Vialidad Urbana", "Restauración"],
            image: "/images/projects/colonia.png"
        },
        {
            id: 5,
            title: "Restauración Puente Histórico Tajo",
            location: "Toledo, España",
            description: "Intervención delicada en patrimonio histórico, combinando ingeniería moderna con preservación arquitectónica. Se realizó el refuerzo estructural de los arcos de piedra mediante inyecciones de microcemento y la sustitución del tablero con concreto aligerado, asegurando la integridad del monumento por 50 años más sin alterar su estética original.",
            tags: ["Patrimonio", "Puentes", "Ingeniería Estructural"],
            image: "/images/projects/puente-espana.png"
        },
        {
            id: 6,
            title: "Autopista Corredor Biocéanico",
            location: "Darién, Panamá",
            description: "Desafío de ingeniería en ambiente tropical extremo. Construcción de 45km de autopista con especificaciones de alta durabilidad frente a la humedad. Implementación de mezclas asfálticas modificadas con polímeros y estabilización de suelos arcillosos. Gestión ambiental estricta para proteger la biodiversidad de la selva circundante.",
            tags: ["Carreteras", "Selva", "Sostenibilidad"],
            image: "/images/projects/autopista-panama.png"
        },
        {
            id: 7,
            title: "Estabilización Geotécnica Alpina",
            location: "Valais, Suiza",
            description: "Proyecto de alta complejidad geotécnica para asegurar la carretera de paso de montaña contra desprendimientos. Construcción de muros de contención anclados y pantallas dinámicas de protección. Uso de maquinaria especializada para terrenos de pendiente extrema y condiciones climáticas severas.",
            tags: ["Geotecnia", "Montaña", "Seguridad Vial"],
            image: "/images/projects/taludes-suiza.png"
        },
        {
            id: 8,
            title: "Corredor Vial Inteligente Sur",
            location: "Medellín, Colombia",
            description: "Modernización de la infraestructura urbana integrando carriles exclusivos para transporte masivo (BRT) y ciclorrutas. Renovación total de la carpeta asfáltica, implementación de semaforización inteligente y paisajismo urbano. Un modelo de movilidad sostenible y eficiencia constructiva en zonas densamente pobladas.",
            tags: ["Movilidad Urbana", "Smart City", "Transporte"],
            image: "/images/projects/vialidad-medellin.png"
        },
        {
            id: 9,
            title: "Barreras Acústicas A7",
            location: "Hamburgo, Alemania",
            description: "Construcción de modernas barreras de protección acústica (Lärmschutzwände) de hormigón absorbente a lo largo de 12km de la autopista A7. El proyecto incluyó cimentaciones profundas en suelo blando y la integración de paneles de vidrio transparente en viaductos para minimizar el impacto visual y sonoro en zonas residenciales.",
            tags: ["Medio Ambiente", "Estructuras", "Acústica"],
            image: "/images/projects/barreras-a7.png"
        }
    ];

    const testimonials = [
        {
            id: 1,
            text: "La capacidad técnica de Adler Infraestructura para manejar la complejidad del proyecto en la A3 fue impresionante. Su gestión del asfalto fundido cumplió con los estándares alemanes más exigentes. Un socio estratégico invaluable.",
            author: "Hans Jürgen Müller",
            role: "Director de Infraestructura, Autobahn GmbH"
        },
        {
            id: 2,
            text: "Transformaron por completo el centro de nuestra ciudad. La calidad de los acabados en adoquines y la rapidez de ejecución minimizó las molestias a nuestros ciudadanos. Altamente recomendados para obras urbanas.",
            author: "Michael Merz",
            role: "Alcalde, Ciudad de Ransbach-Baumbach"
        },
        {
            id: 3,
            text: "Su equipo de gestión de contratos nos ahorró millones en el proyecto Kirchheimer Dreieck. Su manejo de los reclamos y la documentación técnica es de primer nivel mundial.",
            author: "Sarah Schmidt",
            role: "Gerente de Proyecto Senior, DEGES"
        },
        {
            id: 4,
            text: "Adler trajo soluciones innovadoras para la estabilización de taludes que nunca habíamos visto. Su enfoque técnico salvó una carretera vital para el turismo en los Alpes.",
            author: "Heinrich Weber",
            role: "Jefe de Mantenimiento Vial, Canton du Valais"
        },
        {
            id: 5,
            text: "La ejecución de la autopista en Panamá fue impecable a pesar de las lluvias constantes. Entienden perfectamente cómo trabajar en ambientes tropicales agresivos.",
            author: "Ing. Roberto Castillo",
            role: "Ministerio de Obras Públicas, Panamá"
        },
        {
            id: 6,
            text: "Excelente coordinación en la obra de Medellín. La integración de los sistemas BRT con el tráfico mixto se realizó sin contratiempos. Grandes profesionales.",
            author: "Dra. Valentina López",
            role: "Secretaria de Movilidad, Medellín"
        },
        {
            id: 7,
            text: "La restauración del Puente Tajo requería una sensibilidad extrema. Adler logró reforzar la estructura sin dañar una sola piedra histórica. Un trabajo artesanal de ingeniería.",
            author: "Carlos Fernández",
            role: "Patrimonio Nacional, España"
        },
        {
            id: 8,
            text: "Su asesoría en Colonia fue vital para reorganizar nuestro plan de mantenimiento vial. Tienen una visión a largo plazo que ahorra costos futuros.",
            author: "Klaus Wagner",
            role: "Departamento de Obras Civiles, Köln"
        },
        {
            id: 9,
            text: "Profesionalismo puro. Cumplieron los plazos en la A7 y la calidad de las barreras acústicas ha mejorado significativamente la calidad de vida de los vecinos.",
            author: "Anke Schröder",
            role: "Planificación Urbana, Hamburgo"
        },
        {
            id: 10,
            text: "En Venezuela necesitamos empresas así, con estándares internacionales. La repavimentación de la ARC quedó perfecta, como una mesa de billar.",
            author: "Ing. Pedro Méndez",
            role: "Gerente de Operaciones, Vías de Aragua"
        },
        {
            id: 11,
            text: "Contratamos su auditoría técnica y descubrieron optimizaciones que pagaron sus honorarios diez veces. Expertos reales en contratos FIDIC.",
            author: "Luis Morales",
            role: "Director Jurídico, Consorcio Vial Sur"
        },
        {
            id: 12,
            text: "Rápidos, limpios y eficientes. La renovación de la Avenida Bolívar cambió la cara de la ciudad. La señalización nocturna es excelente.",
            author: "María Rodríguez",
            role: "Ingeniería Municipal, Caracas"
        }
    ];

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    // Reset slide if screen resize changes totalPages
    useEffect(() => {
        setCurrentSlide(0);
    }, [itemsPerPage]);

    return (
        <div className="proyectos-page">
            {/* Hero Section */}
            <header className="proyectos-hero" style={{ backgroundImage: 'url("/images/projects/kirchheimer-dreieck.png")' }}>
                <div className="proyectos-hero-content">
                    <h1 className="proyectos-title">Nuestros <span className="text-gradient">Proyectos</span></h1>
                    <p className="proyectos-subtitle">
                        Experiencia internacional comprobada en obras de alta complejidad, desde rehabilitación de autopistas en Alemania hasta gestión contractual estratégica.
                    </p>
                </div>
            </header>

            {/* Projects Grid */}
            <section className="container">
                <div className="proyectos-grid">
                    {projects.map((project) => (
                        <article key={project.id} className="proyecto-card">
                            <div className="proyecto-image-container">
                                <img src={project.image} alt={project.title} className="proyecto-image" />
                                <div className="proyecto-location-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    {project.location}
                                </div>
                            </div>
                            <div className="proyecto-content">
                                <h3 className="proyecto-title">{project.title}</h3>
                                <div className="proyecto-tags mb-3">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="proyecto-tag">{tag}</span>
                                    ))}
                                </div>
                                <p className="proyecto-description">
                                    {project.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-darker">
                <div className="container">
                    <h2 className="section-title">Lo que dicen nuestros <span className="text-gradient">Clientes</span></h2>

                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
                            <ChevronLeft size={32} />
                        </button>

                        <div className="carousel-track-container">
                            <div
                                className="carousel-track"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {testimonials.map((testimonio) => (
                                    <div key={testimonio.id} className="carousel-slide">
                                        <div className="testimonio-card">
                                            <div className="quote-icon">"</div>
                                            <div className="stars">★★★★★</div>
                                            <p className="testimonio-text">{testimonio.text}</p>
                                            <div className="testimonio-author">
                                                <div className="author-info">
                                                    <h4>{testimonio.author}</h4>
                                                    <span>{testimonio.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="carousel-btn next" onClick={nextSlide} aria-label="Siguiente">
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    <div className="carousel-dots">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Proyectos;
