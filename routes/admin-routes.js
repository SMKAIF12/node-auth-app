const express = require('express');
const authMiddleWare = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const router = express.Router();
router.get('/adminhome', authMiddleWare, isAdminUser, (req, res) => {
    return res.status(200).json({ message: 'Welcome to admin page.' })
})
module.exports = router;