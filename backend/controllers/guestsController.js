// guestsController.js
const guestList = require('../data/guests'); // Import the guestList

// Get all guests
const getAllGuests = (req, res) => {
  res.json(guestList);
};

// Get guests by category (NJ or Niki)
const getGuestsByCategory = (req, res) => {
  const category = req.params.category;
  const guests = guestList[category];

  if (guests) {
    res.json(guests);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

// Add a new guest
const addGuest = (req, res) => {
  const { category, name, familyMembers } = req.body;

  if (!guestList[category]) {
    return res.status(404).json({ message: "Category not found" });
  }

  const newId = guestList[category].length ? Math.max(guestList[category].map(g => g.id)) + 1 : 1;
  const newGuest = { id: newId, name, familyMembers };
  
  guestList[category].push(newGuest);
  res.status(201).json(newGuest);
};

// Update an existing guest
const updateGuest = (req, res) => {
  const { category, id } = req.params;
  const guest = guestList[category]?.find(g => g.id === parseInt(id));

  if (guest) {
    const { name, familyMembers } = req.body;
    guest.name = name !== undefined ? name : guest.name;
    guest.familyMembers = familyMembers !== undefined ? familyMembers : guest.familyMembers;

    res.json(guest);
  } else {
    res.status(404).json({ message: "Guest not found" });
  }
};

// Delete a guest
const deleteGuest = (req, res) => {
  const { category, id } = req.params;
  const guestIndex = guestList[category]?.findIndex(g => g.id === parseInt(id));

  if (guestIndex !== undefined && guestIndex >= 0) {
    guestList[category].splice(guestIndex, 1);
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: "Guest not found" });
  }
};

module.exports = {
  getAllGuests,
  getGuestsByCategory,
  addGuest,
  updateGuest,
  deleteGuest,
};