import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Arrow, Button, Logo } from "./ui";
import { useLenis } from "lenis/react";
import { services, site } from "../content/site";

const navigation = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Process", "/#process"],
  ["About", "/about"],
  ["FAQs", "/#faq"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef(null);
  const toggle = useRef(null);
  const lenis = useLenis();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    menu.current.querySelector("a").focus();
    const close = () => {
      setOpen(false);
      toggle.current.focus();
    };
    const keyboard = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const nodes = [toggle.current, ...menu.current.querySelectorAll("a")];
        const index = nodes.indexOf(document.activeElement);
        event.preventDefault();
        nodes[
          (index + (event.shiftKey ? -1 : 1) + nodes.length) % nodes.length
        ].focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 900) close();
    };
    window.addEventListener("keydown", keyboard);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("resize", resize);
    };
  }, [open, lenis]);
  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <div className="shell nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([name, path]) => (
            <NavLink
              key={name}
              to={path}
              aria-current={path.includes("#") ? false : undefined}
              className={({ isActive }) =>
                isActive && !path.includes("#") ? "active" : ""
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <Button className="nav-cta">Start a project</Button>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="menu-lines">
            <i />
            <i />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          ref={menu}
          aria-label="Mobile navigation"
        >
          {navigation.map(([name, path], i) => (
            <Link key={name} to={path} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              {name}
              <Arrow />
            </Link>
          ))}
          <Link
            className="mobile-contact"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Start a project <Arrow />
          </Link>
          <span className="mono">GOOD THINGS START WITH A CONVERSATION.</span>
        </nav>
      )}
    </header>
  );
}
export function RouteEffects() {
  const { pathname, key } = useLocation();
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const main = document.getElementById("main");
      main?.focus({ preventScroll: true });
      const page =
        pathname === "/"
          ? "Design & development studio"
          : pathname.split("/").filter(Boolean).at(-1).replaceAll("-", " ");
      document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} — Blue Hawke`;
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname, key]);
  return null;
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="shell">
        <div className="cta-top">
          <span className="mono">YOUR NEXT CHAPTER STARTS HERE</span>
          <span className="mono">LET’S MAKE IT COUNT</span>
        </div>
        <div className="cta-composition">
          <h2>
            Let’s make your
            <br />
            next move <span>matter.</span>
          </h2>
        </div>
        <div className="cta-bottom">
          <p>
            Tell us what you’re building.
            <br />
            Let’s find the right way forward.
          </p>
          <Button>Start a conversation</Button>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  const lenis = useLenis();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>
              Independent thinking.
              <br />
              Thoughtful digital experiences.
            </p>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
              <Arrow />
            </a>
          </div>
          <div>
            <span className="mono">EXPLORE</span>
            <Link to="/work">Work</Link>
            <Link to="/about">About the studio</Link>
            <Link to="/#process">Our process</Link>
            <Link to="/pricing">Project pricing</Link>
          </div>
          <div>
            <span className="mono">WHAT WE DO</span>
            {services.map((s) => (
              <Link key={s.id} to={`/services#${s.id}`}>
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <span className="mono">LET’S TALK</span>
            <Link to="/contact">
              Start a project <Arrow />
            </Link>
            <Link to="/#faq">A few answers</Link>
            <button
              className="back-top"
              onClick={() =>
                lenis
                  ? lenis.scrollTo(0)
                  : window.scrollTo({
                      top: 0,
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                    })
              }
            >
              Back to top ↑
            </button>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          blue hawke
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Blue Hawke</span>
          <span>DESIGNED WITH INTENT. BUILT WITH CARE.</span>
          <span>Independent by design.</span>
        </div>
      </div>
    </footer>
  );
}
