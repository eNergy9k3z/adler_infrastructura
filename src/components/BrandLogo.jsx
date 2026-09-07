import "./BrandLogo.css";

export default function BrandLogo({ light = false, className = "" }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={`/brand/adler-logo-${light ? "claro" : "morado"}.png`}
      alt="Adler Infrastructura"
      width="880"
      height="220"
      decoding="async"
    />
  );
}
