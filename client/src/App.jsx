import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "./api";

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

function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleString();
  } catch {
    return isoDate;
  }
}

function AdminPage() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadSubmissions() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/admin/waitlist`, {
        headers: { "x-admin-token": token },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Could not load submissions.");
      }
      setRows(data.entries || []);
    } catch (err) {
      setRows([]);
      setError(err.message || "Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  const csvHref = useMemo(() => {
    if (!token) return "";
    return `${apiUrl}/admin/waitlist.csv?token=${encodeURIComponent(token)}`;
  }, [token]);

  return (
    <div className="admin-shell">
      <h1>Waitlist Admin</h1>
      <p>Use your admin token to view submissions and export CSV.</p>

      <div className="admin-controls">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter ADMIN_TOKEN"
        />
        <button type="button" onClick={loadSubmissions} disabled={!token || loading}>
          {loading ? "Loading..." : "Load Submissions"}
        </button>
        <a href={csvHref || "#"} onClick={(e) => !token && e.preventDefault()}>
          Export CSV
        </a>
      </div>

      {error && <p className="status error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.email}</td>
                <td>{formatDate(row.createdAt)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={2}>No submissions loaded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/waitlist/stats`)
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (data?.total !== undefined) {
          setTotal(data.total);
        }
      })
      .catch(() => {});
  }, []);

  async function joinWaitlist(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Signup failed");
      }

      setStatus("You are on the list. We will confirm your seat in the beta.");
      setEmail("");
      if (typeof total === "number") {
        setTotal(total + 1);
      }
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

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
        <button
          type="button"
          className="nav-cta"
          onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
        >
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
          <p>
            Built for creators targeting their first 1,000 subscribers |{" "}
            {total === null ? "Loading creators..." : `${total.toLocaleString()}+ creators in waitlist`}
          </p>
          <button
            type="button"
            className="hero-cta"
            onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
          >
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
          <form onSubmit={joinWaitlist} className="form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <button disabled={loading} type="submit">
              {loading ? "Saving..." : "Reserve My Place"}
            </button>
          </form>
          {status && <p className="status">{status}</p>}
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

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (pathname === "/admin") {
    return <AdminPage />;
  }
  return <LandingPage />;
}

