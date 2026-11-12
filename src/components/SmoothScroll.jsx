import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const lenisOptions = {
  autoRaf: true,
  anchors: {
    offset: -110,
  },
  stopInertiaOnNavigate: true,
};

export function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export function LenisRouteSync() {
  const { pathname, hash, key } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (!lenis) return;
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          lenis.scrollTo(target, { immediate: true, offset: -110 });
          return;
        }
      }
      lenis.scrollTo(0, { immediate: true });
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname, hash, key, lenis]);

  return null;
}
