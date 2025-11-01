import Restaurant from "../models/Restaurant.model.js";

// ✅ CREATE RESTAURANT
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      address,
      rating,
      images,
      price_range,
      reviews,
      cuisine,
      socials,
    } = req.body;

    const newRestaurant = new Restaurant({
      name,
      address,
      rating,
      images,
      price_range,
      reviews,
      cuisine,
      socials,
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to create restaurant", error });
  }
};

// ✅ GET ALL RESTAURANTS
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("reviews")
      .populate("cuisine")
      .populate("socials");
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurants", error });
  }
};

// ✅ GET SINGLE RESTAURANT BY ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("reviews")
      .populate("cuisine")
      .populate("socials");
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurant", error });
  }
};

// ✅ UPDATE RESTAURANT
export const updateRestaurant = async (req, res) => {
  try {
    const updates = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to update restaurant", error });
  }
};

// ✅ DELETE RESTAURANT
export const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant", error });
  }
};
