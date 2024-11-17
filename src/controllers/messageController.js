const Message = require("../models/Message");
const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  console.log("Initializing socket...");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { chatId, senderId, message } = data;

        const newMessage = await Message.create({ chatId, senderId, content: message });
        console.log("Message received and saved:", newMessage);

        io.to(chatId).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error saving message:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { initializeSocket, getChatHistory };
