const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Use CORS
// Allow requests from your frontend's URL
app.use(cors());

app.use(express.json());  


// Import and use routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const vendorsRoutes = require('./routes/vendorsRoutes');
app.use('/vendors', vendorsRoutes);

const guestsRoutes = require('./routes/guestsRoutes');
app.use('/guests', guestsRoutes);

const locationRoutes = require('./routes/locationRoutes');
app.use('/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
