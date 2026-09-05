import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { servicesData } from "../data/services";
import { supabase } from "../supabaseClient";
import "./Contact.css";
const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };
const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("servicio") || "";
  const serviceValue = Object.hasOwn(servicesData, requestedService)
    ? requestedService
    : "";
  const [selectedService, setSelectedService] = useState(serviceValue);
  const [fieldErrors, setFieldErrors] = useState({});
  const requestRef = useRef(null);
  useEffect(() => {
    setSelectedService(serviceValue);
  }, [serviceValue]);
  useEffect(() => () => requestRef.current?.abort(), []);
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFieldErrors((previous) => ({ ...previous, [e.target.id]: null }));
    if (status !== "uploading") setStatus("idle");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requestRef.current) return;
    const errors = {};
    if (!formData.name.trim()) errors.name = "Indique su nombre.";
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
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name.trim(),
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
            <a href="mailto:info@adlerinfraestructura.com">
              info@adlerinfraestructura.com <ArrowUpRight size={17} />
            </a>
            <a href="tel:+491727751060">
              +49 172 7751060 <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
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
                <label htmlFor="name">Nombre *</label>
                <input
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Su nombre"
                  required
                  maxLength={120}
                />
                {fieldErrors.name && (
                  <p className="field-error" id="name-error">
                    {fieldErrors.name}
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
                placeholder="Describa brevemente su proyecto o necesidad."
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
          </fieldset>
          <div
            aria-live="polite"
            role="status"
            className={`form-status ${status}`}
          >
            {status === "success" &&
              "Su consulta se ha enviado correctamente. Gracias por escribirnos."}
            {status === "error" && (
              <>
                No se pudo enviar la consulta. Sus datos siguen en el
                formulario. Puede reintentarlo o escribir a{" "}
                <a href="mailto:info@adlerinfraestructura.com">
                  nuestro correo
                </a>
                .
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;
