import "./Stats.css";
const items = [
  ["01", "Infraestructura vial"],
  ["02", "Gestión contractual"],
  ["03", "Materiales y soluciones"],
  ["04", "IA aplicada a empresas"],
];
const Stats = () => (
  <div className="practice-strip">
    <div className="container practice-grid">
      {items.map(([n, label]) => (
        <div className="practice-item" key={n}>
          <span>{n}</span>
          <p>{label}</p>
        </div>
      ))}
    </div>
  </div>
);
export default Stats;
