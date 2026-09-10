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
import PageMetadata from "./components/PageMetadata";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
const Jobs = lazy(() => import("./pages/Jobs"));
const Valores = lazy(() => import("./pages/Valores"));
const Especialidades = lazy(() => import("./pages/Especialidades"));

import Chatbot from "./components/Chatbot";
const Proyectos = lazy(() => import("./pages/Proyectos"));
const Auditoria = lazy(() => import("./pages/Auditoria"));
const Login = lazy(() => import("./pages/Login"));
const Normativa = lazy(() => import("./pages/Normativa"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
import ServiceDetail from "./pages/ServiceDetail";
const Certificaciones = lazy(() => import("./pages/Certificaciones"));
const PrintableSpec = lazy(() => import("./pages/PrintableSpec"));
const PrintableDoc = lazy(() => import("./pages/PrintableDoc"));
const Profile = lazy(() => import("./pages/Profile"));
const AuthProvider = lazy(() => import("./auth/AuthProvider"));
const AccountPassword = lazy(() => import("./pages/AccountPassword"));
const ClientAccess = lazy(() => import("./portal/ClientAccess"));
const ClientPortal = lazy(() => import("./portal/ClientPortal"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SiteWidgets() {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
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
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  return (pathname.startsWith("/clientes") &&
    ![
      "/clientes/acceso",
      "/clientes/registro",
      "/clientes/contrasena",
    ].includes(pathname)) ||
    pathname.startsWith("/dashboard") ? null : (
    <Navbar />
  );
}
function SiteFooter() {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  return (pathname.startsWith("/clientes") &&
    ![
      "/clientes/acceso",
      "/clientes/registro",
      "/clientes/contrasena",
    ].includes(pathname)) ||
    pathname.startsWith("/dashboard") ? null : (
    <Footer />
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <PageMetadata />
      <div className="app">
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          <Suspense
            fallback={
              <p className="portal-loading" role="status">
                Cargando página…
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

function PageLoadError() {
  return (
    <main className="adler-page" id="contenido">
      <section className="container section">
        <span className="eyebrow">ADLER INFRASTRUCTURA</span>
        <h1>No pudimos abrir esta vista.</h1>
        <p>
          Compruebe su conexión y vuelva a cargar la página. Si el problema
          continúa, puede regresar al inicio.
        </p>
        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Volver a cargar
          </button>
          <a className="text-link" href="/">
            Ir al inicio
          </a>
        </div>
      </section>
    </main>
  );
}
const router = createBrowserRouter([
  { path: "*", element: <AppContent />, errorElement: <PageLoadError /> },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
