const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes for locations
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', locationController.addLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
