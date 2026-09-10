import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/Contact";
import About from "../components/About";
import Stats from "../components/Stats";
import Solutions from "../components/Solutions";
import Process from "../components/Process";
import Resources from "../components/Resources";
import FAQ from "../components/FAQ";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    let id = location.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* Keep an invalid escape as a literal identifier. */
    }
    const element = document.getElementById(id);
    if (!element) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(() => {
      element.setAttribute("tabindex", "-1");
      element.focus({ preventScroll: true });
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div className="home-page">
      <Hero />
      <Stats />
      <Solutions />
      <Services />
      <About />
      <Process />
      <Resources />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;
