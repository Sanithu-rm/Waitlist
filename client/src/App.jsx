const TALLY_FORM_URL =
  import.meta.env.VITE_TALLY_FORM_URL || "https://tally.so/r/3j4V8B";

function openTally() {
  window.open(TALLY_FORM_URL, "_blank", "noopener,noreferrer");
}

export default function App() {
  return (
    <div className="site-shell">
      <nav className="top-nav">
        <div className="brand">Huzzlo</div>
        <button type="button" className="cta-btn" onClick={openTally}>
          Join Waitlist
        </button>
      </nav>

      <header className="hero" id="home">
        <div className="hero-waves" aria-hidden="true"></div>
        <div className="hero-aura" aria-hidden="true"></div>
        <div className="hero-inner centered">
          <div className="hero-copy centered">
            <h1>
              Masterclass To Become
              <br />
              A Scroll-Stopper
            </h1>
            <p>Live reviews, practical systems, and monthly updates to help you grow faster.</p>
            <button type="button" className="cta-btn hero-cta" onClick={openTally}>
              Reserve My Spot
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
