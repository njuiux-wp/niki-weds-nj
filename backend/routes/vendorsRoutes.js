const express = require('express');
const router = express.Router();
const {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  addPayment,
} = require('../controllers/vendorsController');

// Define routes
router.get('/', getVendors); // GET all vendors
router.get('/:category/:vendorId', getVendorById); // GET a specific vendor
router.post('/', addVendor); // Add a new vendor
router.put('/:category/:vendorId', updateVendor); // Update a vendor
router.delete('/:category/:vendorId', deleteVendor); // Delete a vendor
router.post('/:category/:vendorId/payments', addPayment); // Add a payment to a vendor

module.exports = router;
