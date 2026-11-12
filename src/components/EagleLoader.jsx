import "./EagleLoader.css";

export function EagleLoaderMark() {
  return (
    <div className="eagle-loader__mark" role="status" aria-label="Loading">
      <div className="eagle-loader__ring" />
      <div className="eagle-loader__spin">
        <div className="eagle-loader__trail" />
        <div className="eagle-loader__led" />
      </div>
      <svg
        className="eagle-loader__bird"
        viewBox="0 0 70.4 46.9"
        aria-hidden="true"
      >
        <defs>
          <path
            id="eagle-loader-path"
            fillRule="evenodd"
            d="M5.9 17.4 L5.9 18.4 L8.0 21.1 L14.4 26.9 L18.9 29.4 L26.5 32.6 L25.6 33.2 L22.6 33.4 L15.4 32.1 L15.4 33.1 L17.5 34.9 L24.9 38.8 L27.2 45.4 L28.1 46.8 L29.1 46.8 L32.1 39.6 L37.8 30.9 L37.9 29.5 L26.9 27.0 L14.1 21.8 L6.9 17.4Z M0.0 0.0 L0.0 1.0 L5.9 9.0 L12.4 14.8 L16.9 17.6 L23.4 20.9 L30.8 23.4 L46.8 26.5 L46.6 27.2 L43.4 30.6 L38.1 37.9 L35.6 42.2 L35.6 43.2 L36.9 43.1 L42.6 38.4 L47.5 35.1 L57.1 30.2 L59.6 29.5 L64.8 29.4 L67.4 30.4 L68.2 32.0 L69.2 32.0 L69.9 31.2 L70.2 28.6 L69.1 26.1 L65.5 23.0 L63.8 20.2 L61.1 18.4 L57.2 16.9 L49.1 15.2 L37.8 14.9 L33.5 14.0 L20.9 9.8 L10.1 4.9 L1.1 0.0Z M54.0 20.4 L56.5 20.0 L60.6 21.0 L62.8 22.1 L64.4 24.0 L62.0 23.4 L57.5 24.0Z"
          />
        </defs>
        <g className="eagle-loader__glow">
          <use href="#eagle-loader-path" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}

export default function EagleLoader({ className = "" }) {
  return (
    <div className={`eagle-loader ${className}`.trim()}>
      <EagleLoaderMark />
    </div>
  );
}
