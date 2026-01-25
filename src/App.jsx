import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Valores from './pages/Valores';
import Especialidades from './pages/Especialidades';

import Chatbot from './components/Chatbot';
import Proyectos from './pages/Proyectos';
import Auditoria from './pages/Auditoria';
import Login from './pages/Login';
import Normativa from './pages/Normativa';
import Dashboard from './pages/Dashboard';
import ServiceDetail from './pages/ServiceDetail';
import Certificaciones from './pages/Certificaciones';
import PrintableSpec from './pages/PrintableSpec';
import PrintableDoc from './pages/PrintableDoc';
import Profile from './pages/Profile';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/empleos" element={<Jobs />} />
          <Route path="/valores" element={<Valores />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/normativa" element={<Normativa />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servicios/:id" element={<ServiceDetail />} />
          <Route path="/servicios/:id/ficha-tecnica" element={<PrintableSpec />} />
          <Route path="/certificaciones" element={<Certificaciones />} />
          <Route path="/certificaciones/documentos/:docId" element={<PrintableDoc />} />
          <Route path="/equipo" element={<Profile />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
