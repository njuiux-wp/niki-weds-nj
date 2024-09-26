const fs = require('fs');
const path = require('path');

// Path to the locations JSON file
const dataPath = path.join(__dirname, '../data/locations.json');

// Get all locations
exports.getAllLocations = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading locations data');
        res.json(JSON.parse(data));
    });
};

// Get location by ID
exports.getLocationById = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading locations data');
        const locations = JSON.parse(data);
        const location = locations.find(loc => loc.id == req.params.id);
        if (!location) return res.status(404).send('Location not found');
        res.json(location);
    });
};

// Add new location
exports.addLocation = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading locations data');
        const locations = JSON.parse(data);
        const newLocation = { id: locations.length + 1, ...req.body };
        locations.push(newLocation);
        fs.writeFile(dataPath, JSON.stringify(locations, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving location');
            res.status(201).json(newLocation);
        });
    });
};

// Update location
exports.updateLocation = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading locations data');
        const locations = JSON.parse(data);
        const index = locations.findIndex(loc => loc.id == req.params.id);
        if (index === -1) return res.status(404).send('Location not found');

        locations[index] = { id: locations[index].id, ...req.body };
        fs.writeFile(dataPath, JSON.stringify(locations, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving location');
            res.json(locations[index]);
        });
    });
};

// Delete location
exports.deleteLocation = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading locations data');
        let locations = JSON.parse(data);
        const index = locations.findIndex(loc => loc.id == req.params.id);
        if (index === -1) return res.status(404).send('Location not found');

        locations.splice(index, 1);
        fs.writeFile(dataPath, JSON.stringify(locations, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving location');
            res.send(`Location with id ${req.params.id} deleted`);
        });
    });
};
