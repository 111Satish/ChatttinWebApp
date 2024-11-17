require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const { createServer } = require('http');
const connectDB = require('./src/config/db');
const { initializeSocket } = require("./src/controllers/messageController");
const corsOptions = require('./src/middleware/corsMiddleware'); 
const paymentRoutes = require('./src/routes/paymentRoutes');
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require("./src/routes/chatRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const server = createServer(app);

connectDB();
initializeSocket(server);

app.use(cors(corsOptions)); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
