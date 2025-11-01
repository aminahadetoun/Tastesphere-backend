import Social from "../models/Social.model.js";

// ✅ CREATE SOCIAL LINK
export const createSocial = async (req, res) => {
  try {
    const { link, restaurant } = req.body;

    const newSocial = new Social({ link, restaurant });
    await newSocial.save();

    res.status(201).json(newSocial);
  } catch (error) {
    res.status(500).json({ message: "Failed to create social link", error });
  }
};

// ✅ GET ALL SOCIAL LINKS
export const getSocials = async (req, res) => {
  try {
    const socials = await Social.find().populate("restaurant");
    res.status(200).json(socials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch social links", error });
  }
};

// ✅ GET SINGLE SOCIAL BY ID
export const getSocialById = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id).populate("restaurant");
    if (!social)
      return res.status(404).json({ message: "Social link not found" });
    res.status(200).json(social);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch social link", error });
  }
};

// ✅ UPDATE SOCIAL LINK
export const updateSocial = async (req, res) => {
  try {
    const updates = req.body;
    const updatedSocial = await Social.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedSocial)
      return res.status(404).json({ message: "Social link not found" });
    res.status(200).json(updatedSocial);
  } catch (error) {
    res.status(500).json({ message: "Failed to update social link", error });
  }
};

// ✅ DELETE SOCIAL LINK
export const deleteSocial = async (req, res) => {
  try {
    const deletedSocial = await Social.findByIdAndDelete(req.params.id);
    if (!deletedSocial)
      return res.status(404).json({ message: "Social link not found" });
    res.status(200).json({ message: "Social link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete social link", error });
  }
};
