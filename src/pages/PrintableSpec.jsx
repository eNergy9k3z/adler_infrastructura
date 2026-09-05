import { useParams, Link } from "react-router-dom";
import { Printer } from "lucide-react";
import { servicesData } from "../data/services";
import "./PrintableSpec.css";
const PrintableSpec = () => {
  const { id } = useParams();
  const service = Object.hasOwn(servicesData, id) ? servicesData[id] : null;
  if (!service)
    return (
      <div className="container section">
        <h1>Servicio no encontrado</h1>
        <Link to="/#servicios">Volver a servicios</Link>
      </div>
    );
  return (
    <div className="service-sheet">
      <style>{`.service-sheet{background:#eaf0f3;color:#182f3b;min-height:100vh;padding:30px 20px 60px}.sheet-controls{max-width:820px;margin:0 auto 25px;display:flex;justify-content:space-between;gap:20px;align-items:center;font-size:.875rem}.sheet-controls button{display:flex;align-items:center;gap:10px;border:1px solid #385461;background:white;padding:12px 18px;cursor:pointer}.sheet-paper{max-width:820px;margin:auto;padding:60px;background:white}.sheet-paper>header{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #adbdc5;padding-bottom:25px;margin-bottom:40px}.sheet-paper h1{font-size:2rem}.sheet-paper h2{font-size:1.2rem;margin-top:30px}.sheet-paper p,.sheet-paper li{color:#4b6470;font-size:1rem}.sheet-paper ol{padding-left:22px}.sheet-paper li{padding:8px 0}.sheet-footer{border-top:1px solid #adbdc5;margin-top:40px;padding-top:20px;font-size:.875rem;color:#526c78}@media(max-width:600px){.sheet-paper{padding:28px 22px}.sheet-paper>header{flex-direction:column}.sheet-controls{flex-wrap:wrap}}@media print{.navbar,.footer,.whatsapp-float,.chat-button,.chat-window,.sheet-controls{display:none!important}.service-sheet{background:white;padding:0}.sheet-paper{max-width:none;padding:0;box-shadow:none}@page{size:A4;margin:20mm}body{background:white!important}.sheet-paper h1,.sheet-paper h2{break-after:avoid}.sheet-paper li{break-inside:avoid}}`}</style>
      <div className="sheet-controls">
        <Link to={`/servicios/${id}`}>← Volver al servicio</Link>
        <button onClick={() => window.print()}>
          <Printer size={18} />
          Imprimir o guardar PDF
        </button>
      </div>
      <article className="sheet-paper">
        <header>
          <strong>ADLER INFRASTRUCTURA</strong>
          <span>{service.code} · Ficha de servicio</span>
        </header>
        <h1>{service.title}</h1>
        <p>{service.subtitle}</p>
        <h2>Descripción</h2>
        <p>{service.description}</p>
        <h2>Alcance del trabajo</h2>
        <p>{service.scope}</p>
        <h2>Entregables posibles</h2>
        <ol>
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <footer className="sheet-footer">
          Adler Infrastructura · Alemania / Venezuela
          <br />
          info@adlerinfraestructura.com · +49 172 7751060
        </footer>
      </article>
    </div>
  );
};
export default PrintableSpec;
