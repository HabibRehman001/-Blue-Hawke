import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Arrow, Label } from "../components/ui";
import { services, site } from "../content/site";

export default function Contact() {
  const [params] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [draft, setDraft] = useState({ body: "", href: "" });
  const form = useRef(null);
  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = {};
    if (!data.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!data.service)
      nextErrors.service = "Choose the kind of project you have in mind.";
    if (data.description.trim().length < 20)
      nextErrors.description = "Tell us a little more—at least 20 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current.elements[Object.keys(nextErrors)[0]].focus();
      return;
    }
    setStatus("preparing");
    const body = `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nCompany: ${data.company.trim() || "Not provided"}\nProject: ${services.find((s) => s.id === data.service)?.name || "Let’s figure it out"}\nBudget: ${data.budget.trim() || "To be discussed"}\n\n${data.description.trim()}`;
    const subject = `Project enquiry from ${data.name.trim()}`;
    setDraft({
      body,
      href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    });
    setStatus("ready");
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([`To: ${site.email}\n\n${draft.body}`], { type: "text/plain" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "blue-hawke-project-brief.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="contact-page shell">
      <div className="contact-intro">
        <Label>LET’S START SOMETHING</Label>
        <h1>
          Your next
          <br />
          chapter.
          <br />
          <span className="blue">Starts here.</span>
        </h1>
        <p>
          An idea, a challenge, or a fresh start.
          <br />
          We’d love to hear what you have in mind.
        </p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email}
          <Arrow />
        </a>
        <div className="contact-note">
          <span className="mono">A LITTLE CONTEXT GOES A LONG WAY</span>
          <p>
            Tell us what you do, what you’re looking to build, and what a good
            outcome looks like for you.
          </p>
        </div>
      </div>
      <div className="contact-form-wrap">
        <div className="form-heading">
          <h2>A good conversation starts here.</h2>
          <p>Fields marked * are required.</p>
        </div>
        <form
          ref={form}
          onSubmit={submit}
          onChange={() => {
            if (status === "ready") setStatus("idle");
          }}
          noValidate
        >
          <div className="form-pair">
            <Field
              label="Your name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
          </div>
          <Field label="Company" name="company" autoComplete="organization" />
          <div className="form-field">
            <label htmlFor="service">What are we building? *</label>
            <select
              id="service"
              name="service"
              defaultValue={
                services.some((s) => s.id === params.get("service"))
                  ? params.get("service")
                  : ""
              }
              required
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
              <option value="other">Let’s figure it out together</option>
            </select>
            {errors.service && (
              <span id="service-error" className="field-error">
                {errors.service}
              </span>
            )}
          </div>
          <Field
            label="Budget or budget range (optional)"
            name="budget"
            placeholder="A rough idea is welcome"
          />
          <div className="form-field">
            <label htmlFor="description">A little about your project *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              required
              maxLength="4000"
              placeholder="What’s the idea? What would you like to change?"
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <span id="description-error" className="field-error">
                {errors.description}
              </span>
            )}
          </div>
          <p className="form-disclosure">
            Your details stay in this page until you choose to send them through
            your email app. This form prepares an email; it does not submit an
            enquiry automatically.
          </p>
          <button
            className="button"
            type="submit"
            disabled={status === "preparing"}
          >
            {status === "preparing"
              ? "Preparing your brief…"
              : "Prepare my enquiry"}
            <Arrow />
          </button>
          <div aria-live="polite">
            {status === "ready" && (
              <div className="form-result">
                <h3>Your brief is ready.</h3>
                <p>
                  Open your email app to review and send it to {site.email}.
                  Nothing has been sent yet.
                </p>
                <a className="button" href={draft.href}>
                  Open email app <Arrow />
                </a>
                <button
                  type="button"
                  className="download-brief"
                  onClick={download}
                >
                  Download your brief instead ↓
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
function Field({ label, name, error, required, ...props }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        maxLength={name === "email" ? 254 : 160}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
