import { useEffect } from "react";

const MIN_VISIBLE_MS = 900;

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

function waitForFonts() {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.catch(() => undefined);
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function PageLoader() {
  useEffect(() => {
    const boot = document.getElementById("boot-loader");
    if (!boot) return undefined;

    let cancelled = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dismiss = async () => {
      const started = performance.now();
      await Promise.all([waitForWindowLoad(), waitForFonts()]);
      const remaining = Math.max(
        0,
        MIN_VISIBLE_MS - (performance.now() - started),
      );
      if (remaining) await wait(remaining);
      if (cancelled) return;

      boot.classList.add("is-leaving");
      boot.setAttribute("aria-busy", "false");
      const theme = document.querySelector('meta[name="theme-color"]');
      if (theme) theme.setAttribute("content", "#f5f3ee");

      await wait(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 40
          : 560,
      );
      if (cancelled) return;
      boot.remove();
      document.body.style.overflow = previousOverflow;
    };

    dismiss();
    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return null;
}
