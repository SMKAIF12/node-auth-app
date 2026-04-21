const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/auth-middleware')
router.get('/userhome', authMiddleWare, (req, res) => {
    const { userid, username, email, role } = req.userInfo;
    res.status(200).json({ success: true, message: 'Welcome to Homepage', user: { userid, username, role } });
})
module.exports = router;