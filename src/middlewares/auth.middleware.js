import env from "../config/env.js";
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  // const token = req.cookies["token"];
  const { authorization } = req.headers;
  console.log("Authorization Header:", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new Error("Invalid Authentication"));
  }

  const token = authorization.split(" ")[1];
  console.log("Extracted Token:", token.trim());
  console.log("JWT Access Secret:", env.JWT_ACCESS_SECRET);

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
}