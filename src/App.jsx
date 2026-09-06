import React, { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Navigate,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Valores from "./pages/Valores";
import Especialidades from "./pages/Especialidades";

import Chatbot from "./components/Chatbot";
import Proyectos from "./pages/Proyectos";
import Auditoria from "./pages/Auditoria";
import Login from "./pages/Login";
import Normativa from "./pages/Normativa";
import Dashboard from "./pages/Dashboard";
import ServiceDetail from "./pages/ServiceDetail";
import Certificaciones from "./pages/Certificaciones";
import PrintableSpec from "./pages/PrintableSpec";
import PrintableDoc from "./pages/PrintableDoc";
import Profile from "./pages/Profile";
import AuthProvider from "./auth/AuthProvider";
import AccountPassword from "./pages/AccountPassword";
import ClientAccess from "./portal/ClientAccess";
const ClientPortal = lazy(() => import("./portal/ClientPortal"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SiteWidgets() {
  const { pathname } = useLocation();
  if (
    pathname.startsWith("/clientes") ||
    pathname.startsWith("/dashboard") ||
    ["/login", "/cuenta/contrasena"].includes(pathname)
  )
    return null;
  return (
    <>
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}

function SiteHeader() {
  const { pathname } = useLocation();
  return (pathname.startsWith("/clientes") &&
    ![
      "/clientes/acceso",
      "/clientes/registro",
      "/clientes/contrasena",
    ].includes(pathname)) ||
    pathname.startsWith("/dashboard/clientes") ? null : (
    <Navbar />
  );
}
function SiteFooter() {
  const { pathname } = useLocation();
  return (pathname.startsWith("/clientes") &&
    ![
      "/clientes/acceso",
      "/clientes/registro",
      "/clientes/contrasena",
    ].includes(pathname)) ||
    pathname.startsWith("/dashboard/clientes") ? null : (
    <Footer />
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="app">
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          <Suspense
            fallback={
              <p className="portal-loading" role="status">
                Cargando tu espacio…
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/clientes/acceso"
                element={
                  <AuthProvider allowClients>
                    <ClientAccess key="access" />
                  </AuthProvider>
                }
              />
              <Route
                path="/clientes/registro"
                element={
                  <AuthProvider allowClients>
                    <ClientAccess key="register" register />
                  </AuthProvider>
                }
              />
              <Route
                path="/clientes/contrasena"
                element={
                  <AuthProvider allowClients>
                    <AccountPassword client />
                  </AuthProvider>
                }
              />
              <Route
                path="/clientes/*"
                element={
                  <AuthProvider allowClients>
                    <ClientPortal />
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/clientes/*"
                element={
                  <AuthProvider>
                    <ClientPortal administration />
                  </AuthProvider>
                }
              />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/empleos" element={<Jobs />} />
              <Route path="/valores" element={<Valores />} />
              <Route path="/especialidades" element={<Especialidades />} />
              <Route path="/auditoria" element={<Auditoria />} />
              <Route
                path="/login"
                element={
                  <AuthProvider>
                    <Login />
                  </AuthProvider>
                }
              />
              <Route path="/normativa" element={<Normativa />} />
              <Route
                path="/cuenta/contrasena"
                element={
                  <AuthProvider>
                    <AccountPassword />
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AuthProvider>
                    <Dashboard />
                  </AuthProvider>
                }
              />
              <Route path="/servicios/:id" element={<ServiceDetail />} />
              <Route
                path="/servicios/:id/ficha-tecnica"
                element={<PrintableSpec />}
              />
              <Route path="/certificaciones" element={<Certificaciones />} />
              <Route
                path="/certificaciones/documentos/:docId"
                element={<PrintableDoc />}
              />
              <Route path="/equipo" element={<Profile />} />
              <Route
                path="/resources"
                element={<Navigate to="/#recursos" replace />}
              />
              <Route
                path="*"
                element={
                  <div className="adler-page">
                    <section className="container section">
                      <h1>Página no encontrada</h1>
                      <p>Puede continuar desde los servicios de Adler.</p>
                      <a className="btn btn-primary" href="/">
                        Volver al inicio
                      </a>
                    </section>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <SiteFooter />
        <SiteWidgets />
      </div>
    </>
  );
}

const router = createBrowserRouter([{ path: "*", element: <AppContent /> }]);
export default function App() {
  return <RouterProvider router={router} />;
}
