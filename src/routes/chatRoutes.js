const express = require("express");
const { createChat, getUserChats } = require("../controllers/chatController");
const router = express.Router();

router.post("/create", createChat);

router.get("/get/:userId", getUserChats);

module.exports = router;
