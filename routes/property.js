const express = require('express');
const { addProperty, userProperty } = require('../controllers/propertyController');

const router = express.Router();

// Add Property Route
router.post('/add-property', addProperty);



module.exports = router;

// Get Properties by User ID Route
router.get('/user/:userId', userProperty);

module.exports = router;