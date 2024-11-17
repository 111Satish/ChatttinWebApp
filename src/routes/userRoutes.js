const express = require('express');
const {getUserProfile, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/get', getAllUsers);
router.get('/profile', getUserProfile);

module.exports = router;