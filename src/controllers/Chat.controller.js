import Chat from "../models/Chat.model.js";

// ✅ CREATE CHAT (between two users)
export const createChat = async (req, res) => {
  try {
    const { client_1, client_2 } = req.body;

    // Check if chat already exists between these two users
    const existingChat = await Chat.findOne({
      $or: [
        { client_1, client_2 },
        { client_1: client_2, client_2: client_1 },
      ],
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = new Chat({ client_1, client_2, messages: [] });
    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat", error });
  }
};

// ✅ GET ALL CHATS
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("client_1", "first_name last_name email")
      .populate("client_2", "first_name last_name email")
      .populate("messages");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error });
  }
};

// ✅ GET SINGLE CHAT BY ID
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("client_1", "first_name last_name email")
      .populate("client_2", "first_name last_name email")
      .populate("messages");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat", error });
  }
};

// ✅ UPDATE CHAT (e.g., add new message)
export const updateChat = async (req, res) => {
  try {
    const { messages } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: { $each: messages } } },
      { new: true }
    ).populate("messages");

    if (!updatedChat)
      return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to update chat", error });
  }
};

// ✅ DELETE CHAT
export const deleteChat = async (req, res) => {
  try {
    const deletedChat = await Chat.findByIdAndDelete(req.params.id);
    if (!deletedChat)
      return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat", error });
  }
};
