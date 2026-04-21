const express = require('express');
const router = express.Router();
const { login, register, changePassword } = require('../controllers/auth-controller');
const authMiddleWare = require('../middleware/auth-middleware');
router.post('/login', login);
router.post('/register', register);
router.post('/changepass', authMiddleWare, changePassword)
module.exports = router;