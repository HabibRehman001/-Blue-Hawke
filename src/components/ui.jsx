import { Link } from "react-router-dom";
import logoMark from "../assets/logo-mark.png";

export function Arrow({ diagonal = true, className = "" }) {
  return (
    <svg
      className={`arrow ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M3 12h17m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}
export function Mark({ className = "" }) {
  return (
    <img
      className={`logo-mark ${className}`.trim()}
      src={logoMark}
      alt=""
      width="48"
      height="33"
      decoding="async"
      aria-hidden="true"
    />
  );
}
export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Blue Hawke home">
      <Mark />
      <span>blue hawke</span>
    </Link>
  );
}
export function Button({
  to = "/contact",
  children,
  secondary = false,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`${secondary ? "text-link" : "button"} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Label({ children, number, light = false }) {
  return (
    <p className={`section-label ${light ? "light-label" : ""}`}>
      <span className="label-dot" />
      {number && <span>{number} /</span>}
      {children}
    </p>
  );
}
export function PageIntro({ label, title, children }) {
  return (
    <section className="page-intro shell">
      <Label>{label}</Label>
      <h1>{title}</h1>
      {children && <p className="intro-copy">{children}</p>}
    </section>
  );
}
