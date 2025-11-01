import Location from "../models/Location.model.js";

// ✅ CREATE LOCATION
export const createLocation = async (req, res) => {
  try {
    const { name, restaurant_id } = req.body;

    const newLocation = new Location({ name, restaurant_id });
    await newLocation.save();

    res
      .status(201)
      .json({ message: "Location created successfully", data: newLocation });
  } catch (error) {
    res.status(500).json({ message: "Failed to create location", error });
  }
};

// ✅ GET ALL LOCATIONS
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("restaurant_id");
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error });
  }
};

// ✅ GET SINGLE LOCATION BY ID
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate(
      "restaurant_id"
    );
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch location", error });
  }
};

// ✅ UPDATE LOCATION
export const updateLocation = async (req, res) => {
  try {
    const updates = req.body;
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedLocation)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json({
      message: "Location updated successfully",
      data: updatedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update location", error });
  }
};

// ✅ DELETE LOCATION
export const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete location", error });
  }
};
