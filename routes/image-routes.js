const express = require('express');
const router = express.Router()
const authMiddleWare = require('../middleware/auth-middleware')
const adminMiddleWare = require('../middleware/admin-middleware')
const uploadMiddleWare = require('../middleware/upload-middleware');
const { uploadImage, home, fetchImages, deleteImage, fetchByLimit } = require('../controllers/image-controller')
router.post('/upload', authMiddleWare, adminMiddleWare, uploadMiddleWare.single('image'), uploadImage)
router.get('/home', home)
router.get('/fetch', authMiddleWare, fetchImages);
router.delete('/delete/:id', authMiddleWare, adminMiddleWare, deleteImage)
router.get('/fetchBylimit', authMiddleWare, adminMiddleWare, fetchByLimit)
module.exports = router;