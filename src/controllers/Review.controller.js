import Review from "../models/Review.model.js";

// ✅ CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { content } = req.body;

    const newReview = new Review({ content });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error });
  }
};

// ✅ GET ALL REVIEWS
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// ✅ GET SINGLE REVIEW BY ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review", error });
  }
};

// ✅ UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );

    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

// ✅ DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
