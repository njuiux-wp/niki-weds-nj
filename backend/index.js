const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Use CORS
// Allow requests from your frontend's URL
app.use(cors({
  origin: 'https://njuiux-wp.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received at: ${req.path}`);
  next();
});


// Import and use routes
const authRoutes = require('./routes/authRoutes');
app.use('/niki-weds-nj/auth', authRoutes);

const vendorsRoutes = require('./routes/vendorsRoutes');
app.use('/niki-weds-nj/vendors', vendorsRoutes);

const guestsRoutes = require('./routes/guestsRoutes');
app.use('/niki-weds-nj/guests', guestsRoutes);

const locationRoutes = require('./routes/locationRoutes');
app.use('/niki-weds-nj/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
