const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Officer = require('../models/Officer'); // Assuming the Officer model is in the models folder
const router = express.Router();

// JWT Secret Key
const JWT_SECRET = 'agya1403'; // Replace with your own secret key

// Officer Signup Route
router.post('/signup', async (req, res) => {
    const { email, password, uniqueId } = req.body;

    try {
        // Check if officer already exists
        const existingOfficer = await Officer.findOne({ email });
        if (existingOfficer) {
            return res.status(400).json({ message: 'Officer already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new officer
        const newOfficer = new Officer({
            email,
            password: hashedPassword,
            uniqueId
        });

        // Save the officer to the database
        await newOfficer.save();

        // Generate JWT token
        const token = jwt.sign({ id: newOfficer._id, email: newOfficer.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Officer Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if officer exists
        const officer = await Officer.findOne({ email });
        if (!officer) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: officer._id, email: officer.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get officer details (Protected Route)
router.get('/me', async (req, res) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const officer = await Officer.findById(decoded.id).select('-password'); // Exclude the password field
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found' });
        }

        res.status(200).json(officer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
