const Chat = require("../models/Chat");

exports.createChat = async (req, res) => {
  const { isGroupChat, chatName, participants } = req.body;

  try {
    const chat = await Chat.create({
      isGroupChat,
      chatName: isGroupChat ? chatName : null,
      participants,
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserChats = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching chats for userId:", req.params); 
  try {
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email")
      .populate("latestMessage");
    res.json(chats);
  } catch (error) {
    console.error("Error in getUserChats:", error); 
    res.status(500).json({ error: error.message });
  }
};

