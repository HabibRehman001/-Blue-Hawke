import { PageIntro, Button, Label } from "../components/ui";
import { services } from "../content/site";
import { Process, Difference } from "../components/Sections";

export function Services() {
  return (
    <>
      <PageIntro
        label="OUR CAPABILITIES"
        title={
          <>
            Big picture thinking.
            <br />
            <span className="blue">Detail by detail.</span>
          </>
        }
      >
        From the first question to the final interaction, we connect strategy,
        design, and development around what your business needs next.
      </PageIntro>
      <section className="services-detail shell">
        {services.map((service, i) => (
          <article id={service.id} key={service.id}>
            <span className="service-big-number">0{i + 1}</span>
            <div>
              <Label>{service.name}</Label>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Button secondary to={`/contact?service=${service.id}`}>
                Talk about your project
              </Button>
            </div>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <Process />
    </>
  );
}
export function About() {
  return (
    <>
      <PageIntro
        label="THE STUDIO / BLUE HAWKE"
        title={
          <>
            Independent thinking.
            <br />
            <span className="blue">Shared ambition.</span>
          </>
        }
      >
        We’re building a design and development studio around a simple idea: the
        best digital experiences make things clearer, more useful, and more
        human.
      </PageIntro>
      <section className="about-manifesto">
        <div className="shell">
          <div>
            <Label light>OUR POINT OF VIEW</Label>
            <h2>
              Good design asks why.
              <br />
              Great execution
              <br />
              follows through.
            </h2>
            <p>
              We bring a designer’s eye and a developer’s attention to detail to
              the same table. Because a website should feel considered all the
              way through—from the first impression to the smallest interaction.
            </p>
            <p>
              Our focus is simple: understand what matters, communicate it
              clearly, and build something useful around it.
            </p>
          </div>
        </div>
      </section>
      <Difference />
      <Process />
    </>
  );
}
export function Pricing() {
  return (
    <>
      <PageIntro
        label="PROJECT PRICING"
        title={
          <>
            The right scope.
            <br />
            <span className="blue">A considered proposal.</span>
          </>
        }
      >
        Every business starts somewhere different. We shape a project around
        your goals, requirements, and priorities rather than forcing it into a
        fixed package.
      </PageIntro>
      <section className="pricing-content shell">
        <div>
          <Label>WHAT GOES INTO A QUOTE</Label>
          <h2>
            Clarity before
            <br />
            commitment.
          </h2>
          <p>
            A useful proposal explains what we’re building, what’s included, and
            how we’ll get there together.
          </p>
          <Button>Discuss your brief</Button>
        </div>
        <div>
          {[
            [
              "The experience",
              "The number of pages, user journeys, content needs, and level of custom design.",
            ],
            [
              "The functionality",
              "Products, integrations, forms, content management, and any application features.",
            ],
            [
              "The collaboration",
              "Milestones, review stages, content responsibilities, and a realistic delivery schedule.",
            ],
            [
              "The next chapter",
              "Handover, training needs, and any agreed support after launch.",
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
