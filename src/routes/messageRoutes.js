const express = require("express");
const { getChatHistory } = require("../controllers/messageController");
const router = express.Router();

router.get("/get/:chatId", getChatHistory);

module.exports = router;
