import express from "express";
import addressRoutes from "./Address.route.js";
import chatRoutes from "./Chat.route.js";
import commentRoutes from "./Comment.route.js";
import cuisineRoutes from "./Cuisine.route.js";
import locationRoutes from "./Location.route.js";
import recipeRoutes from "./Recipe.route.js";
import replyRoutes from "./Reply.route.js";
import restaurantRoutes from "./Restaurant.route.js";
import reviewRoutes from "./Review.route.js";
import userRoutes from "./User.route.js";
// import socialRoutes from "./Social.route";

const router = express.Router();

router.use("/address", addressRoutes);
router.use("/chat", chatRoutes);
router.use("/comment", commentRoutes);
router.use("/cuisine", cuisineRoutes);
router.use("/location", locationRoutes);
router.use("/recipe", recipeRoutes);
router.use("/reply", replyRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes);

export default router;
