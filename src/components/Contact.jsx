import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { servicesData } from "../data/services";
import "./Contact.css";
const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};
const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("servicio") || "";
  const serviceValue = Object.hasOwn(servicesData, requestedService)
    ? requestedService
    : "";
  const [selectedService, setSelectedService] = useState(serviceValue);
  const [fieldErrors, setFieldErrors] = useState({});
  const requestRef = useRef(null);
  const confirmationRef = useRef(null);
  useEffect(() => {
    setSelectedService(serviceValue);
  }, [serviceValue]);
  useEffect(() => () => requestRef.current?.abort(), []);
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (status === "success") {
      confirmationRef.current?.focus({ preventScroll: true });
      confirmationRef.current?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    }
  }, [status]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFieldErrors((previous) => ({ ...previous, [e.target.id]: null }));
    if (status !== "uploading") setStatus("idle");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requestRef.current) return;
    const errors = {};
    if (!formData.first_name.trim()) errors.first_name = "Indique su nombre.";
    if (!formData.last_name.trim()) errors.last_name = "Indique sus apellidos.";
    if (!formData.message.trim())
      errors.message = "Describa brevemente su consulta.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setStatus("uploading");
    try {
      const { supabase } = await import("../supabaseClient");
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message:
              (selectedService
                ? `Servicio de interés: ${servicesData[selectedService].title}\n\n`
                : "") + formData.message.trim(),
            company: formData.subject.trim(),
          },
        ])
        .abortSignal(controller.signal);
      if (error) throw error;
      setStatus("success");
      setFormData(emptyForm);
      setSelectedService("");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
    }
  };
  return (
    <section id="contacto" className="section contact-section">
      <div className="container contact-layout">
        <div className="contact-intro">
          <span className="eyebrow">06 / Conversemos</span>
          <h2>
            ¿Qué necesita
            <br />
            resolver su empresa?
          </h2>
          <p>
            Cuéntenos sobre su proyecto de infraestructura o el proceso de su
            empresa que quiere mejorar. Revisaremos cómo podemos acompañarle.
          </p>
          <div className="contact-details">
            <span>ALEMANIA / VENEZUELA</span>
            <a
              href="https://wa.me/491727751060"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar por WhatsApp <ArrowUpRight size={17} />
            </a>
            <a href="tel:+491727751060">
              +49 172 7751060 <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-next-step">
            <span>DESPUÉS DE SU CONSULTA</span>
            <p>
              Revisamos el contexto, aclaramos la información necesaria y
              definimos un posible alcance de trabajo.
            </p>
            <Link to="/clientes/acceso">
              ¿Ya tiene cuenta? Ir al área de clientes{" "}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        {status === "success" ? (
          <div
            className="contact-confirmation"
            ref={confirmationRef}
            tabIndex={-1}
            role="status"
          >
            <CheckCircle2 size={34} strokeWidth={1.5} aria-hidden="true" />
            <h3>Su consulta ha sido recibida.</h3>
            <p>
              Revisaremos la información y utilizaremos el correo o el teléfono
              que nos indicó para continuar la conversación.
            </p>
            <p className="contact-data-note">
              No necesita volver a enviar esta consulta.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setStatus("idle");
                window.setTimeout(
                  () => document.getElementById("first_name")?.focus(),
                  0,
                );
              }}
            >
              Plantear otra consulta <ArrowRight size={18} />
            </button>
            <Link className="text-link" to="/#recursos">
              Explorar las guías de Adler
            </Link>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-label="Consulta a Adler"
          >
            <fieldset
              disabled={status === "uploading"}
              className="contact-fields"
            >
              <div className="form-group">
                <label htmlFor="service">Servicio de interés</label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Quiero orientación general</option>
                  {Object.entries(servicesData)
                    .filter(([id]) =>
                      [
                        "vialidad",
                        "contratos",
                        "materiales",
                        "ia-construccion",
                        serviceValue,
                      ].includes(id),
                    )
                    .map(([id, service]) => (
                      <option key={id} value={id}>
                        {service.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="contact-form-grid">
                <div className="form-group">
                  <label htmlFor="first_name">Nombre *</label>
                  <input
                    aria-invalid={!!fieldErrors.first_name}
                    aria-describedby={
                      fieldErrors.first_name ? "first-name-error" : undefined
                    }
                    id="first_name"
                    name="first_name"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Su nombre"
                    required
                    maxLength={120}
                  />
                  {fieldErrors.first_name && (
                    <p className="field-error" id="first-name-error">
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Apellidos *</label>
                  <input
                    aria-invalid={!!fieldErrors.last_name}
                    aria-describedby={
                      fieldErrors.last_name ? "last-name-error" : undefined
                    }
                    id="last_name"
                    name="last_name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Sus apellidos"
                    required
                    maxLength={120}
                  />
                  {fieldErrors.last_name && (
                    <p className="field-error" id="last-name-error">
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@empresa.com"
                    required
                    maxLength={200}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Empresa</label>
                  <input
                    id="subject"
                    name="company"
                    autoComplete="organization"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Nombre de la empresa"
                    maxLength={160}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Código de país y número"
                    maxLength={40}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">¿En qué podemos ayudarle? *</label>
                <textarea
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={
                    fieldErrors.message ? "message-error" : undefined
                  }
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Indique dónde se desarrolla el proyecto, en qué fase está y qué decisión necesita tomar."
                  required
                  maxLength={5000}
                  rows={4}
                />
                {fieldErrors.message && (
                  <p className="field-error" id="message-error">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              <div className="contact-submit">
                <p>Los campos con * son obligatorios.</p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "uploading"}
                >
                  {status === "uploading" ? (
                    <>
                      <Loader2 size={18} className="sending-spinner" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar consulta <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              <p className="contact-data-note">
                Usaremos estos datos para atender su consulta.
              </p>
            </fieldset>
            <div
              aria-live="polite"
              role="status"
              className={`form-status ${status}`}
            >
              {status === "error" && (
                <>
                  No se pudo enviar la consulta. Sus datos siguen en el
                  formulario. Puede reintentarlo o contactarnos por{" "}
                  <a
                    href="https://wa.me/491727751060"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  .
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
export default Contact;
