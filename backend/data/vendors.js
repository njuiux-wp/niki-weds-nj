const vendors = {
  caterers: [
    {
      id: 1,
      name: "The Great Caterers",
      contact: "123-456-7890",
      cost: 5000,
      totalAmount: 5000,
      depositPaid: 1000,
      payments: [], // Array to store payment records
    },
  ],
  decorators: [
    {
      id: 1,
      name: "Decor Delights",
      contact: "987-654-3210",
      cost: 3000,
      totalAmount: 3000,
      depositPaid: 500,
      payments: [],
    },
  ],
  panditji: [
    {
      id: 1,
      name: "Pandit Shyam",
      contact: "444-555-6666",
      cost: 2000,
      totalAmount: 2000,
      depositPaid: 0,
      payments: [],
    },
  ],
};

module.exports = vendors;
