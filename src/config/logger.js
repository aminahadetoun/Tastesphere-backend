const { createLogger, transports, format } = require("winston");

module.exports = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp, ...meta }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}  ${
        meta.body ? "\n" + JSON.stringify(meta.body) : ""
      }`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.json()),
    }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});
