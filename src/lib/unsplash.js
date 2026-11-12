const UNSPLASH_ENDPOINT = "https://api.unsplash.com/search/photos";

const FALLBACK_PHOTOS = [
  {
    id: "interior-1",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Quiet interiors",
    href: "/work/form",
  },
  {
    id: "mountain-1",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Open landscape",
    href: "/work/fieldnotes",
  },
  {
    id: "workspace-1",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Workspace clarity",
    href: "/work/flow",
  },
  {
    id: "city-1",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&h=400&q=80",
    title: "City rhythm",
    href: "/work",
  },
  {
    id: "architecture-1",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Structure study",
    href: "/work/form",
  },
  {
    id: "coast-1",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Coastal study",
    href: "/work",
  },
  {
    id: "forest-1",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Outdoor path",
    href: "/work/fieldnotes",
  },
  {
    id: "light-1",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Soft light",
    href: "/work",
  },
  {
    id: "desk-1",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Product focus",
    href: "/work/flow",
  },
  {
    id: "material-1",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Material detail",
    href: "/work/form",
  },
  {
    id: "night-1",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Night city",
    href: "/work",
  },
  {
    id: "road-1",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Morning road",
    href: "/work/fieldnotes",
  },
  {
    id: "corner-1",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Quiet corner",
    href: "/work/form",
  },
  {
    id: "editorial-1",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Editorial frame",
    href: "/work",
  },
  {
    id: "studio-1",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Studio light",
    href: "/work/form",
  },
];

const ROUTE_CYCLE = ["/work/form", "/work/fieldnotes", "/work/flow", "/work"];

function mapPhoto(photo, index) {
  const image =
    photo.urls?.small ||
    photo.urls?.regular ||
    `${photo.urls?.raw}&w=600&h=400&fit=crop&q=80`;

  return {
    id: photo.id || `photo-${index}`,
    image,
    title: photo.alt_description || photo.description || `Study ${index + 1}`,
    href: ROUTE_CYCLE[index % ROUTE_CYCLE.length],
    credit: photo.user
      ? {
          name: photo.user.name,
          link: `${photo.user.links?.html}?utm_source=bluehawke&utm_medium=referral`,
        }
      : null,
  };
}

export function getFallbackWallItems() {
  return FALLBACK_PHOTOS.map((item) => ({ ...item }));
}

export async function fetchUnsplashWallItems({
  query = "architecture interior design landscape workspace",
  count = 15,
  signal,
} = {}) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!accessKey) return getFallbackWallItems();

  const url = new URL(UNSPLASH_ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(count));
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error (${response.status})`);
  }

  const data = await response.json();
  const results = Array.isArray(data.results) ? data.results : [];
  if (!results.length) return getFallbackWallItems();

  return results.map(mapPhoto);
}
