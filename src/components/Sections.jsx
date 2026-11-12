import { Link } from "react-router-dom";
import { Arrow, Button, Label } from "./ui";
import { ProjectVisual } from "./ProjectVisual";
import { services, projects, stages, principles, faqs } from "../content/site";

export function Capabilities() {
  return (
    <section className="capabilities section shell" id="services">
      <Label number="01">WHAT WE DO</Label>
      <div className="split-section">
        <div className="section-intro">
          <h2>
            From first
            <br />
            impression to
            <br />
            <span className="muted">lasting impact.</span>
          </h2>
          <p>
            Strategy, design, and development.
            <br />
            Connected from the very beginning.
          </p>
          <Button to="/services" secondary>
            Explore our capabilities
          </Button>
        </div>
        <div className="service-index">
          {services.map((service, i) => (
            <Link
              to={`/services#${service.id}`}
              className="service-row"
              key={service.id}
            >
              <span className="mono service-number">0{i + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.short}</p>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProjectCard({ project, index = 0 }) {
  return (
    <article className={`project-card project-${project.slug}`}>
      <Link
        className="project-image-link"
        to={`/work/${project.slug}`}
        aria-label={`Explore ${project.name} design concept`}
      >
        <div
          className={`project-stage stage-${project.slug}`}
          aria-hidden="true"
        >
          <span className="stage-label mono">
            {String(index + 1).padStart(2, "0")} / DESIGN EXPLORATION
          </span>
          <ProjectVisual type={project.slug} />
          <span className="project-open">
            <Arrow />
          </span>
        </div>
      </Link>
      <div className="project-caption">
        <div>
          <h3>
            <Link to={`/work/${project.slug}`}>
              {project.name}
              <Arrow />
            </Link>
          </h3>
          <p>
            {project.industry} <span>/</span> {project.category}
          </p>
        </div>
        <span className="concept-tag">ILLUSTRATIVE CONCEPT</span>
      </div>
    </article>
  );
}
export function FeaturedWork() {
  return (
    <section className="featured-work section" id="work">
      <div className="shell">
        <Label number="02" light>
          SELECTED EXPLORATIONS
        </Label>
        <div className="work-heading">
          <h2>
            Good design is seen.
            <br />
            <span>Great work is felt.</span>
          </h2>
          <div>
            <p>
              A closer look at our design thinking.
              <br />
              Original concepts. Considered down to the detail.
            </p>
            <Button to="/work" secondary>
              Explore all work
            </Button>
          </div>
        </div>
        <div className="featured-projects">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <p className="work-note">
          Independent design explorations, not commissioned client projects.
        </p>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="process section shell" id="process">
      <Label number="03">HOW WE GET THERE</Label>
      <div className="process-heading">
        <h2>
          A clear path.
          <br />
          <span className="muted">A shared ambition.</span>
        </h2>
        <p>
          Good work comes from good collaboration.
          <br />
          Here’s how we turn the right questions
          <br />
          into something worth launching.
        </p>
      </div>
      <div className="process-stages">
        {stages.map((stage, i) => (
          <article key={stage.title}>
            <div className="stage-number">0{i + 1}</div>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            <span className="mono">{stage.note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Difference() {
  return (
    <section className="difference section">
      <div className="shell split-section">
        <div className="section-intro">
          <Label number="04">A DIFFERENT KIND OF PARTNER</Label>
          <h2>
            Small details.
            <br />
            Shared goals.
            <br />
            <span className="blue">Better together.</span>
          </h2>
          <p>
            We believe the way we work should be as thoughtful as the work
            itself.
          </p>
          <Button to="/about" secondary>
            Meet the approach
          </Button>
        </div>
        <div className="principles">
          {principles.map(([title, description], i) => (
            <article key={title}>
              <span className="principle-icon" aria-hidden="true">
                {["◆", "⌘", "☷", "◎"][i]}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Voices() {
  return (
    <section className="voices shell">
      <Label>CLIENT VOICES</Label>
      <div>
        <h3>
          Good relationships.
          <br />
          Stories worth sharing.
        </h3>
        <p>
          Client stories will live here.
          <br />
          We’ll share them when we can do them justice, with verified words from
          the people behind the work.
        </p>
      </div>
      <span className="mono">STORIES TO COME</span>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="faq section shell" id="faq">
      <div className="split-section">
        <div className="section-intro">
          <Label number="05">A FEW ANSWERS</Label>
          <h2>
            Curious?
            <br />
            <span className="muted">Good place to start.</span>
          </h2>
          <p>
            Have something else in mind?
            <br />
            We’re always open to a conversation.
          </p>
          <Button secondary>Let’s talk</Button>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], i) => (
            <details key={question} name="faq">
              <summary>
                <span className="mono">0{i + 1}</span>
                <h3>{question}</h3>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
