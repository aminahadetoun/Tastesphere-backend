import Address from "../models/Address.model.js";

// ✅ CREATE ADDRESS
export const createAddress = async (req, res) => {
  try {
    const { first_line, street_address, city, state, country } = req.body;

    const newAddress = new Address({
      first_line,
      street_address,
      city,
      state,
      country,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to create address", error });
  }
};

// ✅ GET ALL ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error });
  }
};

// ✅ GET SINGLE ADDRESS BY ID
export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch address", error });
  }
};

// ✅ UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const updates = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedAddress)
      return res.status(404).json({ message: "Address not found" });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update address", error });
  }
};

// ✅ DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress)
      return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address", error });
  }
};
