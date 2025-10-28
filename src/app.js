const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const env = require("./config/env");
const logger = require("./config/logger");

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(`[morgan] ${message.trim()}`),
    },
  })
);
app.get("/girl", (req, res) => {
  res.send("Hellooo world!");
});

module.exports = app;
