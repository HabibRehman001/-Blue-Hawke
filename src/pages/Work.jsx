import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../content/site";
import { PageIntro, Label, Arrow, Button } from "../components/ui";
import { ProjectCard } from "../components/Sections";
import { ProjectVisual } from "../components/ProjectVisual";

export function Work() {
  const [filter, setFilter] = useState("All explorations");
  const categories = [
    "All explorations",
    "Websites",
    "E-commerce",
    "Digital products",
  ];
  const visible = projects.filter(
    (p) => filter === categories[0] || p.category === filter,
  );
  return (
    <>
      <PageIntro
        label="THE WORK / DESIGN EXPLORATIONS"
        title={
          <>
            Different possibilities.
            <br />
            <span className="blue">The same attention to detail.</span>
          </>
        }
      >
        A collection of original design concepts exploring how thoughtful
        digital experiences can look, feel, and work. These are independent
        explorations, not client commissions.
      </PageIntro>
      <section className="work-gallery shell">
        <div className="filter-row" aria-label="Filter design concepts">
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
              {filter === category && <span>↗</span>}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {visible.length} concepts shown
        </p>
        <div className="gallery-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
export function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <section className="case-intro shell">
        <Link to="/work" className="back-link">
          ← All explorations
        </Link>
        <div className="case-title">
          <div>
            <Label>ILLUSTRATIVE DESIGN CONCEPT</Label>
            <h1>
              {project.name}
              <span className="blue">.</span>
            </h1>
            <p>{project.description}</p>
          </div>
          <div className="case-meta">
            <span className="mono">{project.industry}</span>
            <span>{project.type}</span>
            <span className="mono">INDEPENDENT EXPLORATION</span>
          </div>
        </div>
      </section>
      <div className={`case-visual stage-${project.slug}`}>
        <div className="shell">
          <ProjectVisual type={project.slug} hero large />
        </div>
      </div>
      <section className="case-story shell section">
        <aside>
          <Label>THE EXPLORATION</Label>
          <span className="mono">SCOPE</span>
          {project.scope.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <p>
            Concept only. No client relationship or measured business results
            are claimed.
          </p>
        </aside>
        <div>
          <article>
            <span className="mono">01 / THE OBJECTIVE</span>
            <h2>Start with a better question.</h2>
            <p>{project.objective}</p>
          </article>
          <article>
            <span className="mono">02 / THE APPROACH</span>
            <h2>Make every detail count.</h2>
            <p>{project.approach}</p>
            <p>{project.detail}</p>
          </article>
          <article>
            <span className="mono">03 / THE DIRECTION</span>
            <h2>A starting point for possibility.</h2>
            <p>
              This visual exploration demonstrates a design direction. A real
              project would build on discovery, content, user feedback, and
              functional requirements before development and launch.
            </p>
          </article>
        </div>
      </section>
      <section className="next-project shell">
        <span className="mono">UP NEXT / ANOTHER PERSPECTIVE</span>
        <Link to={`/work/${next.slug}`}>
          {next.name}
          <Arrow />
        </Link>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="shell not-found">
      <Label>404 / A LITTLE OFF COURSE</Label>
      <h1>
        Let’s find
        <br />
        your way back.
      </h1>
      <p>This page doesn’t exist, but there’s plenty to explore.</p>
      <Button to="/">Back to the studio</Button>
    </section>
  );
}
