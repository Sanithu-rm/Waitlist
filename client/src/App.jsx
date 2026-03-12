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

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Updates", href: "#updates" },
  { label: "FAQ", href: "#faq" },
  { label: "Waitlist", href: "#waitlist-form" },
];

const STEPS = [
  {
    title: "Join",
    text: "Submit your email and tell us your creator goal.",
  },
  {
    title: "Learn",
    text: "Follow simple frameworks for content, retention, and consistency.",
  },
  {
    title: "Scale",
    text: "Get monthly updates and live feedback to keep improving.",
  },
];

const AUDIENCE = [
  "New creators starting from zero followers",
  "Creators stuck below their first growth milestone",
  "Personal brands building an audience on multiple platforms",
  "Small teams turning content into a repeatable growth system",
];

const FAQS = [
  {
    q: "Is this only for YouTube?",
    a: "No. The training and systems are built for social media creators across platforms.",
  },
  {
    q: "How often is new content added?",
    a: "Fresh implementation updates are added every month.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. The roadmap is designed for beginners and improving creators.",
  },
];

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
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="nav-cta" onClick={openTally}>
          Join Waitlist
        </button>
      </nav>

      <header className="hero" id="home">
        <div className="hero-particles" aria-hidden="true">
          <span className="particle p1" />
          <span className="particle p2" />
          <span className="particle p3" />
          <span className="particle p4" />
          <span className="particle p5" />
          <span className="particle p6" />
          <span className="particle p7" />
          <span className="particle p8" />
        </div>
        <div className="hero-inner centered">
          <div className="hero-copy centered">
            <h1>Grow as a Social Media Creator</h1>
            <p>Live reviews, practical systems, and monthly updates to help you grow faster.</p>
            <button type="button" className="hero-cta" onClick={openTally}>
              Reserve My Spot
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="card" id="features">
          <h2>What You Get</h2>
          <ul className="feature-list">
            <li>Weekly live creator reviews from growth experts.</li>
            <li>Full course from setup to your first major milestone.</li>
            <li>Monthly new training videos and implementation playbooks.</li>
            <li>Positioning, retention, and conversion systems.</li>
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

        <section className="card full" id="how">
          <h2>How It Works</h2>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <article key={step.title} className="step-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card full" id="updates">
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

        <section className="card full">
          <h2>Built For</h2>
          <ul className="audience-list">
            {AUDIENCE.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="card full" id="faq">
          <h2>FAQ</h2>
          <div className="faq-grid">
            {FAQS.map((item) => (
              <article key={item.q} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>CreatorGrowth.io</p>
        <a href={TALLY_FORM_URL} target="_blank" rel="noreferrer">
          Join Waitlist
        </a>
      </footer>
    </div>
  );
}
