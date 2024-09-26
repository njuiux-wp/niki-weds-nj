const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/vendors.json');

// Function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Controller functions
const getVendors = (req, res) => {
  const vendors = readData();
  res.json(vendors);
};

const getVendorById = (req, res) => {
  const vendors = readData();
  const { category, vendorId } = req.params;
  if (!vendors[category]) {
    return res.status(400).send('Invalid category');
  }

  const vendor = vendors[category].find(v => v.id == vendorId);
  if (!vendor) {
    return res.status(404).send('Vendor not found');
  }
  res.json(vendor);
};

const addVendor = (req, res) => {
  const vendors = readData();
  const { category, newVendor } = req.body;
  
  if (!vendors[category]) {
    return res.status(400).send('Invalid category');
  }

  const newId = vendors[category].length > 0 ? vendors[category][vendors[category].length - 1].id + 1 : 1;
  vendors[category].push({ id: newId, ...newVendor });
  writeData(vendors);
  res.status(201).json(vendors[category]);
};

const updateVendor = (req, res) => {
  let vendors = readData();
  const { category, vendorId } = req.params;
  const updatedVendor = req.body;

  if (!vendors[category]) {
    return res.status(400).send('Invalid category');
  }

  const vendorIndex = vendors[category].findIndex(v => v.id == vendorId);
  if (vendorIndex === -1) {
    return res.status(404).send('Vendor not found');
  }

  vendors[category][vendorIndex] = { ...vendors[category][vendorIndex], ...updatedVendor };
  writeData(vendors);
  res.json(vendors[category][vendorIndex]);
};

const deleteVendor = (req, res) => {
  let vendors = readData();
  const { category, vendorId } = req.params;

  if (!vendors[category]) {
    return res.status(400).send('Invalid category');
  }

  const vendorIndex = vendors[category].findIndex(v => v.id == vendorId);
  if (vendorIndex === -1) {
    return res.status(404).send('Vendor not found');
  }

  vendors[category].splice(vendorIndex, 1);
  writeData(vendors);
  res.send(`Vendor with id ${vendorId} deleted`);
};

const addPayment = (req, res) => {
  let vendors = readData();
  const { category, vendorId } = req.params;
  const { amount, paidBy, paymentVia, date } = req.body;

  if (!vendors[category]) {
    return res.status(400).send('Invalid category');
  }

  const vendor = vendors[category].find(v => v.id == vendorId);
  if (!vendor) {
    return res.status(404).send('Vendor not found');
  }

  const newPayment = {
    amount,
    paidBy,
    paymentVia,
    date,
  };

  if (!vendor.payments) {
    vendor.payments = [];
  }

  vendor.payments.push(newPayment);
  writeData(vendors);
  res.status(201).json(vendor);
};

module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  addPayment,
};