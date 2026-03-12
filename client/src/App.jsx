const TALLY_FORM_URL =
  import.meta.env.VITE_TALLY_FORM_URL || "https://tally.so/r/3j4V8B";

const MONTHLY_VIDEOS = [
  {
    title: "YouTube Growth Blueprint 2026",
    date: "April 2026",
    desc: "A complete roadmap for creators from 0 to 5k subscribers.",
  },
  {
    title: "Shorts vs Longs: What Actually Converts",
    date: "March 2026",
    desc: "Format and length experiments that increase watch time fast.",
  },
  {
    title: "Channel Brand Systems in 60 Minutes",
    date: "March 2026",
    desc: "How to create a channel identity people remember.",
  },
];

const NAV_LINKS = ["Home", "Course", "Live Reviews", "Monthly Updates", "About", "Waitlist"];

function openTally() {
  window.open(TALLY_FORM_URL, "_blank", "noopener,noreferrer");
}

export default function App() {
  return (
    <div className="site-shell">
      <nav className="top-nav">
        <div className="brand">
          CreatorGrowth<span>.io</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="nav-cta" onClick={openTally}>
          Join Waitlist
        </button>
      </nav>

      <header className="hero">
        <div className="hero-smoke" aria-hidden="true" />
        <div className="hero-content">
          <h1>
            YouTube creator platform helping channels grow with live expert reviews,
            structured learning and monthly implementation updates.
          </h1>
          <p>Built for creators targeting their first 1,000 subscribers.</p>
          <button type="button" className="hero-cta" onClick={openTally}>
            Reserve Your Spot
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="card">
          <h2>What You Get</h2>
          <ul className="feature-list">
            <li>Weekly live channel reviews from growth experts.</li>
            <li>Full YouTube course from setup to first 1,000 subscribers.</li>
            <li>Monthly new training videos and implementation playbooks.</li>
            <li>Channel positioning, retention, and thumbnail systems.</li>
            <li>Founder-led accountability and milestone tracking.</li>
          </ul>
        </section>

        <section className="card" id="waitlist-form">
          <h2>Join the Waitlist</h2>
          <p className="form-helper">Email only. Takes less than 5 seconds.</p>
          <a className="tally-link" href={TALLY_FORM_URL} target="_blank" rel="noreferrer">
            Open Waitlist Form
          </a>
          <iframe
            className="tally-embed"
            title="CreatorGrowth Waitlist"
            src={TALLY_FORM_URL}
            loading="lazy"
          />
        </section>

        <section className="card full">
          <h2>Monthly Updated Videos</h2>
          <div className="grid">
            {MONTHLY_VIDEOS.map((video) => (
              <article key={video.title} className="video-card">
                <span>{video.date}</span>
                <h3>{video.title}</h3>
                <p>{video.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
