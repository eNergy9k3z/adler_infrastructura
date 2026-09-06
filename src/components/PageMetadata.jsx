import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { servicesData } from "../data/services";

const origin = "https://adler-infrastructura.vercel.app";
const description =
  "Consultoría en carreteras, materiales, gestión contractual e inteligencia artificial para empresas en Venezuela, desde Alemania.";
const titles = {
  "/": "Infraestructura, contratos e IA",
  "/equipo": "Trayectoria profesional",
  "/proyectos": "Ámbitos de intervención",
  "/empleos": "Colaborar con Adler",
  "/valores": "Nuestros principios de trabajo",
  "/especialidades": "Especialidades técnicas",
  "/auditoria": "Consulta de auditoría",
  "/normativa": "Criterio técnico",
  "/certificaciones": "Criterios de gestión",
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const parts = pathname.split("/");
    const serviceRoute = /^\/servicios\/[^/]+(?:\/ficha-tecnica)?\/?$/.test(
      pathname,
    );
    const service =
      serviceRoute && Object.hasOwn(servicesData, parts[2])
        ? servicesData[parts[2]]
        : null;
    const documentTitle = {
      "/certificaciones/documentos/politica-calidad": "Principios de calidad",
      "/certificaciones/documentos/manual-buenas-practicas":
        "Buenas prácticas de consultoría",
    }[pathname];
    const privatePage =
      /^\/(clientes|dashboard|cuenta)(\/|$)/.test(pathname) ||
      pathname === "/login";
    const title = service
      ? `${service.title}${parts[3] === "ficha-tecnica" ? " · Ficha del servicio" : ""}`
      : privatePage
        ? pathname.startsWith("/dashboard") || pathname === "/login"
          ? "Administración"
          : "Área de clientes"
        : titles[pathname] || documentTitle || "Página no encontrada";
    document.title = `${title} | Adler Infrastructura`;
    function meta(name, content, property = false) {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    }
    meta("description", service?.description || description);
    meta(
      "robots",
      privatePage || title === "Página no encontrada"
        ? "noindex, nofollow"
        : "index, follow",
    );
    meta("og:title", document.title, true);
    meta("og:description", service?.description || description, true);
    meta("og:type", "website", true);
    meta(
      "og:url",
      `${origin}${privatePage ? "/clientes/acceso" : pathname}`,
      true,
    );
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${origin}${privatePage ? "/clientes/acceso" : pathname}`;
  }, [pathname]);
  return null;
}
