const express = require("express");

const cors = require("cors");
const app = express();
const PORT = 5000;

// Accept specific origins and always return 200 for OPTIONS
const allowedOrigins = [
  "http://localhost:5000",
  "https://afettah.github.io"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow localhost:5000, afettah.github.io, undefined, and any Google origin
      const googleOriginPattern = /^https?:\/\/(.*\.)?google\.[a-z]+(:\d+)?$/i;
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        googleOriginPattern.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log("--- Incoming Request ---");
  console.log("Time:", new Date().toISOString());
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("------------------------");
  next();
});

// Always return 200 for OPTIONS requests
app.options("/*", (req, res) => {
  res.sendStatus(200);
});

app.post("/", (req, res) => {
  res.status(200).json({ status: "received", data: req.body });
});

// Catch-all route: always return 200 for any request
app.all("*", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", method: req.method, path: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
