import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./config/env.js";
import logger from "./config/logger.js";
import routes from "./routes/index.route.js";

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

app.use("/api/v1", routes);
app.get("/api/health", (req, res) => {
  res.send("Hellooo world!");
});

export default app;
