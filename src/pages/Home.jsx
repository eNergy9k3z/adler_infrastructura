import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import About from '../components/About';
import Stats from '../components/Stats';
import Solutions from '../components/Solutions';
import Process from '../components/Process';
import Resources from '../components/Resources';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure rendering
            }
        }
    }, [location]);

    return (
        <>
            <Hero />
            <Stats />
            <About />
            <Solutions />
            <Services />
            <Process />
            <Resources />
            <Contact />
        </>
    );
};

export default Home;
