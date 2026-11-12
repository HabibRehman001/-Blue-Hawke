import { Arrow, Button, Label } from "../components/ui";
import { ProjectVisual } from "../components/ProjectVisual";
import {
  Capabilities,
  FeaturedWork,
  Process,
  Difference,
  Voices,
  FAQ,
} from "../components/Sections";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-topline">
          <Label>INDEPENDENT DESIGN & DEVELOPMENT STUDIO</Label>
          <span className="hero-edition mono">THOUGHTFUL BY DESIGN.</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Your website
              <br />
              should <span className="hero-blue">do more.</span>
            </h1>
            <p>
              Not just look good. Earn trust. Open doors.
              <br className="desktop-break" /> Turn the right attention into
              real action.
            </p>
            <div className="hero-actions">
              <Button>Let’s build something</Button>
              <Button to="/work" secondary>
                Explore our work
              </Button>
            </div>
            <span className="hero-micro mono">
              GOOD DESIGN. CLEAR PURPOSE. REAL POSSIBILITIES.
            </span>
          </div>
          <div className="hero-art">
            <div className="art-grid" />
            <span className="visual-annotation mono">
              01 — ILLUSTRATIVE DESIGN CONCEPTS
            </span>
            <div className="hero-browser">
              <ProjectVisual hero />
            </div>
            <div className="floating-preview">
              <ProjectVisual type="flow" />
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>Websites. Digital products. Better experiences.</span>
          <a href="#services">
            A little further down <Arrow diagonal={false} />
          </a>
        </div>
      </section>
      <div className="capability-strip">
        <div className="shell">
          <span className="mono">ONE CONNECTED APPROACH</span>
          <div>
            <span>Strategy</span>
            <span>Design</span>
            <span>Development</span>
            <span>What’s next</span>
          </div>
        </div>
      </div>
      <Capabilities />
      <FeaturedWork />
      <section className="positioning shell">
        <Label>THE WAY WE SEE IT</Label>
        <p>You don’t need another website.</p>
        <h2>
          You need a better reason
          <br />
          for people to <span>choose you.</span>
        </h2>
        <div>
          <p>
            Clarity gets you noticed. Thoughtful design earns trust.
            <br />
            We bring them together to help your business move forward.
          </p>
        </div>
      </section>
      <Process />
      <Difference />
      <Voices />
      <FAQ />
    </>
  );
}
