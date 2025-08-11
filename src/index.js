import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8080;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://pueba-web-dev.com";

app.use(express.json());
app.use(morgan("tiny"));

app.use((req, res, next) => {
  res.set('X-App-Host', req.headers.host || '');
  res.set('X-App-HTTP-Version', req.httpVersion);
  next();
});

app.get("/", (_req, res) => res.status(200).send("ok"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "api-backend", ts: new Date().toISOString() });
});
app.get("/solutions/ping", (_req, res) => {
  res.json({ ok: true, service: "solutions", ping: "pong", ts: new Date().toISOString() });
});
app.get("/delivery/info", (_req, res) => {
  res.json({ ok: true, service: "delivery", info: { items: 2 }, ts: new Date().toISOString() });
});
app.get("/status/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), ts: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
