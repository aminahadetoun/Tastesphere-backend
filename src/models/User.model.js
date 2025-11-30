import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "../config/env.js";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: [true, "Kindly provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  location: String,
  profilePicture: { type: String, default: null },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.verifyPassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  const jwtSecret = env.JWT_REFRESH_SECRET;
  return jwt.sign({ id: this._id }, jwtSecret, {
    expiresIn: "1d", // 1 day
  });
};

userSchema.methods.generateAccessToken = function () {
  const jwtSecret = env.JWT_ACCESS_SECRET;
  const jwtExpiresIn = env.JWT_ACCESS_EXPIRES_IN;

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    jwtSecret,
    {
      expiresIn: "15m",
    }
  );
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
