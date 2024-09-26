// guestsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllGuests,
  getGuestsByCategory,
  addGuest,
  updateGuest,
  deleteGuest,
} = require('../controllers/guestsController');

router.get('/', getAllGuests); // Route to get all guests
router.get('/:category', getGuestsByCategory); // Route to get guests by category (NJ or Niki)
router.post('/', addGuest); // Route to add a new guest
router.put('/:category/:id', updateGuest); // Route to update an existing guest
router.delete('/:category/:id', deleteGuest); // Route to delete a guest

module.exports = router;