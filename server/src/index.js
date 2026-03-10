import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import Waitlist from "./models/waitlist.js";

const app = express();
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/waitlist", async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Waitlist.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ error: "You are already on the waitlist." });
    }

    const created = await Waitlist.create({ email: normalizedEmail });
    res.status(201).json({ message: "Welcome aboard!", id: created._id });
  } catch (error) {
    console.error(error);
    if (error?.code === 11000) {
      return res.status(409).json({ error: "You are already on the waitlist." });
    }
    res.status(500).json({ error: "Server error, please try again." });
  }
});

app.get("/api/waitlist/stats", async (_req, res) => {
  const total = await Waitlist.countDocuments({});
  res.json({ total });
});

function isAuthorizedAdmin(req) {
  const tokenFromHeader = req.header("x-admin-token");
  const tokenFromQuery = typeof req.query.token === "string" ? req.query.token : "";
  const providedToken = tokenFromHeader || tokenFromQuery;
  return Boolean(ADMIN_TOKEN) && providedToken === ADMIN_TOKEN;
}

function escapeCsv(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

app.get("/api/admin/waitlist", async (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const entries = await Waitlist.find({}, { email: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean();

  res.json({
    total: entries.length,
    entries: entries.map((entry) => ({
      id: entry._id,
      email: entry.email,
      createdAt: entry.createdAt,
    })),
  });
});

app.get("/api/admin/waitlist.csv", async (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const entries = await Waitlist.find({}, { email: 1, createdAt: 1 }).sort({ createdAt: -1 }).lean();
  const lines = ["email,created_at"];

  for (const entry of entries) {
    lines.push(`${escapeCsv(entry.email)},${escapeCsv(entry.createdAt?.toISOString?.() || "")}`);
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="waitlist.csv"');
  res.send(lines.join("\n"));
});

const start = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://mongo:27017/youtube_growth";
  const port = process.env.PORT || 5000;

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`API running on ${port}`));
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

start();

