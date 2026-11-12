import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, RouteEffects, ContactCTA } from "./components/Layout";
import DriftWallSection from "./components/DriftWallSection";
import { EagleLoaderMark } from "./components/EagleLoader";
import PageLoader from "./components/PageLoader";
import {
  LenisRouteSync,
  SmoothScroll,
} from "./components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./App.css";
import "./components/EagleLoader.css";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() =>
  import("./pages/Work").then((module) => ({ default: module.Work })),
);
const CaseStudy = lazy(() =>
  import("./pages/Work").then((module) => ({ default: module.CaseStudy })),
);
const NotFound = lazy(() =>
  import("./pages/Work").then((module) => ({ default: module.NotFound })),
);
const Services = lazy(() =>
  import("./pages/Studio").then((module) => ({ default: module.Services })),
);
const About = lazy(() =>
  import("./pages/Studio").then((module) => ({ default: module.About })),
);
const Pricing = lazy(() =>
  import("./pages/Studio").then((module) => ({ default: module.Pricing })),
);
const Contact = lazy(() => import("./pages/Contact"));

function RouteFallback() {
  return (
    <div className="route-loader" role="status" aria-label="Loading page">
      <EagleLoaderMark />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <PageLoader />
        <RouteEffects />
        <LenisRouteSync />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex="-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <DriftWallSection />
        <ContactCTA />
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
