import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./config/logger.js";
import routes from "./routes/index.route.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
