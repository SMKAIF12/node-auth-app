const image = require('../models/image')
const { uploadToCloudinary } = require('../helper/cloudinaryHelper')
const cloudinary = require('../config/cloudinary')
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File missing, please upload an image'
            })
        }

        // using cloudinary to uploadimage and save the uploaded details in mongodb
        const { url, publicId } = await uploadToCloudinary(req.file.path);
        const newImage = await image.create({
            url: url,
            publicId: publicId,
            uploadedBy: req.userInfo.userid
        })

        return res.status(200).json({ success: true, message: 'Image uploaded', image: newImage })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error occured: ${error}` })
    }
}
const fetchImages = async (req, res) => {
    try {
        const images = await image.find({});
        if (!images || images.length === 0) {
            return res.status(400).json({ success: false, message: 'No Images found' })
        }
        return res.status(200).json({ message: 'Images found', images: images })
    } catch (error) {
        return res.status(500).json({ success: true, message: error })
    }
}
const deleteImage = async (req, res) => {
    const imageid = req.params.id;
    const currentImage = await image.findById(imageid);
    if (!currentImage) {
        return res.status(400).json({ success: false, message: 'Image not found!!' })
    }
    // whether the authorised user is deleting the image
    if (currentImage.uploadedBy.toString() !== req.userInfo.userid) {
        return res.status(403).json({ success: false, message: 'You are not authorised to delete the image' })
    }
    // delete from cloudinary
    await cloudinary.uploader.destroy(currentImage.publicId);
    await image.findByIdAndDelete(imageid);
    return res.status(200).json({ success: true, message: 'Image Deleted Successfully!!' })
}
const fetchByLimit = async (req, res) => {
    try {
        // currentpagenumber
        const page = parseInt(req.query.page) || 1;
        // max no of data to be displayed per page.
        const limit = parseInt(req.query.limit) || 3;
        // if we are in 2nd page need to skip already fetched data
        const skip = parseInt(page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const count = await image.countDocuments()
        // no of data divided by limit per page gives total number of pages.
        const totalPages = Math.ceil(count / limit);
        const sortObj = {sortBy:sortOrder};
        const images = await image.find().sort(sortObj).skip(skip).limit(limit);
        return res.status(200).json({
            success: true,
            message: 'Images fetched',
            currentPage: page,
            totalPages: totalPages,
            totalImages: count,
            data: images
        })
    } catch (error) {
        return res.status(500).json({ success: true, message: error })
    }
}
const home = (req, res) => {
    return res.status(200).json('Home page of image upload')
}
module.exports = { uploadImage, home, fetchImages, deleteImage, fetchByLimit }