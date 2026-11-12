export function ProjectVisual({ type = "form", hero = false, large = false }) {
  return (
    <div
      className={`project-visual visual-${type}`}
      role="img"
      aria-label={`${type === "form" ? "Architecture website with warm interior photography" : type === "fieldnotes" ? "Outdoor store with mountain photography" : "Project management dashboard"} — illustrative design concept`}
    >
      <div aria-hidden="true">
        <div className="browser-bar">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span>
            {type === "form"
              ? "form & space — a design exploration"
              : type === "fieldnotes"
                ? "fieldnotes — a design exploration"
                : "flow — a product exploration"}
          </span>
        </div>
        {type === "form" ? (
          <div className="form-preview">
            <div className="preview-nav">
              <strong>
                form<span>®</span>
              </strong>
              <span>Spaces &nbsp;&nbsp; Studio &nbsp;&nbsp; Journal</span>
              <span>Let’s talk</span>
            </div>
            <div className="architecture-hero">
              <img
                src="/images/interior-960.webp"
                srcSet="/images/interior-480.webp 480w, /images/interior-960.webp 960w, /images/interior-1400.webp 1400w"
                sizes={
                  large
                    ? "(max-width: 1100px) 90vw, 1000px"
                    : "(max-width: 600px) 90vw, (max-width: 900px) 80vw, 700px"
                }
                alt=""
                width="1400"
                height="933"
                loading={hero ? "eager" : "lazy"}
                fetchPriority={hero ? "high" : "auto"}
              />
              <div className="architecture-copy">
                <small>SPACES FOR A LIFE WELL LIVED</small>
                <div>
                  Less, but
                  <br />
                  <em>better.</em>
                </div>
                <span>Thoughtfully made. Naturally lived.</span>
              </div>
              <span className="image-footnote">
                A STUDY IN SPACE & FORM — 01
              </span>
            </div>
            <div className="preview-bottom">
              <span>Architecture with intention.</span>
              <span>Explore the collection</span>
            </div>
          </div>
        ) : type === "fieldnotes" ? (
          <div className="field-preview">
            <div className="preview-nav">
              <strong>fieldnotes®</strong>
              <span>Explore &nbsp; Essentials &nbsp; Our story</span>
              <span>Bag (0)</span>
            </div>
            <div className="field-image">
              <img
                src="/images/mountain-960.webp"
                srcSet="/images/mountain-480.webp 480w, /images/mountain-960.webp 960w"
                sizes={
                  large
                    ? "(max-width: 1100px) 90vw, 1000px"
                    : "(max-width: 600px) 90vw, 600px"
                }
                alt=""
                width="1000"
                height="667"
                loading={hero ? "eager" : "lazy"}
              />
              <div>
                <small>OUT THERE IS WHERE YOU FIND IT.</small>
                <p>
                  Take the
                  <br />
                  <em>long way.</em>
                </p>
                <span>Made for the everyday adventure.</span>
              </div>
            </div>
            <div className="preview-bottom">
              <span>Good things. Great outdoors.</span>
              <span>DESIGNED TO GO FURTHER</span>
            </div>
          </div>
        ) : (
          <div className="flow-preview">
            <aside>
              <strong>◈ flow</strong>
              <span>Workspace</span>
              <b>▧ &nbsp; Overview</b>
              <span>▦ &nbsp; Projects</span>
              <span>◷ &nbsp; Calendar</span>
              <span>☷ &nbsp; Notes</span>
              <div className="flow-avatar">A</div>
            </aside>
            <div className="flow-main">
              <div className="flow-top">
                WORKSPACE / OVERVIEW <span>⌕ &nbsp; ◉</span>
              </div>
              <h4>
                A little clarity.
                <br />A lot of possibility.
              </h4>
              <p>Make room for your best work.</p>
              <div className="flow-board">
                <div>
                  <small>
                    UP NEXT <i>2</i>
                  </small>
                  <article>
                    <span className="task-tag">DESIGN</span>
                    <b>Explore a new direction</b>
                    <p>Ideas start here.</p>
                    <span>○ &nbsp; ◷</span>
                  </article>
                  <article>
                    <span className="task-tag green">STRATEGY</span>
                    <b>Find the right questions</b>
                    <p>Discovery & direction</p>
                  </article>
                </div>
                <div>
                  <small>
                    IN PROGRESS <i>1</i>
                  </small>
                  <article>
                    <span className="task-tag">PRODUCT</span>
                    <b>Bring the details together</b>
                    <div className="mini-chart">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>○ &nbsp; ◷</span>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
