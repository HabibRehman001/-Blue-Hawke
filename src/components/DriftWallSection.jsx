import { useEffect, useState } from "react";
import DriftWall from "./DriftWall";
import {
  fetchUnsplashWallItems,
  getFallbackWallItems,
} from "../lib/unsplash";

function columnsForWidth(width) {
  if (width < 600) return 4;
  if (width < 900) return 5;
  if (width < 1400) return 6;
  return 7;
}

export default function DriftWallSection() {
  const [columns, setColumns] = useState(() =>
    typeof window === "undefined" ? 5 : columnsForWidth(window.innerWidth),
  );
  const [items, setItems] = useState(getFallbackWallItems);

  useEffect(() => {
    const update = () => setColumns(columnsForWidth(window.innerWidth));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchUnsplashWallItems({ count: 15, signal: controller.signal })
      .then((photos) => {
        if (!controller.signal.aborted && photos.length) setItems(photos);
      })
      .catch(() => {
        if (!controller.signal.aborted) setItems(getFallbackWallItems());
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="drift-wall-section" aria-label="Selected visual studies">
      <DriftWall
        items={items}
        columns={columns}
        overlayColor="#12151b"
        grayscale
        dim={0.5}
        fade={0.2}
        speed={36}
        tilt={10}
        turn={-8}
        depth={80}
        tileWidth={columns < 5 ? 150 : 190}
        tileHeight={columns < 5 ? 100 : 126}
        gap={14}
        radius={10}
      />
      <p className="drift-wall-credit mono">
        Photos via{" "}
        <a
          href="https://unsplash.com/?utm_source=bluehawke&utm_medium=referral"
          target="_blank"
          rel="noreferrer noopener"
        >
          Unsplash
        </a>
      </p>
    </section>
  );
}
