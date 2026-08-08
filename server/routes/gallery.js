const express = require('express');
const router = express.Router();
const {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
  updateGalleryItem
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getGallery)
  .post(protect, admin, createGalleryItem);

router.route('/:id')
  .put(protect, admin, updateGalleryItem)
  .delete(protect, admin, deleteGalleryItem);

module.exports = router;
