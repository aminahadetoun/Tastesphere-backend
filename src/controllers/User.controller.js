import User from "../models/User.model.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, location, password } = req.body;

    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({
      firstName,
      lastName,
      email,
      location,
      password,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// ✅ GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// ✅ GET SINGLE USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// ✅ UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.verifyPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    console.log(user);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    res.status(200).json({
      status: "Successful",
      token: { accessToken, refreshToken },
      user: {_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, location: user.location },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
