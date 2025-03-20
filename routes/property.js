const express = require('express');
const { addProperty, getPropertyById, getAllProperty, userProperty } = require('../controllers/propertyController');

const router = express.Router();

// Add Property Route
router.post('/add-property', addProperty);
router.get('/', getAllProperty);
router.get('/:id', getPropertyById);



module.exports = router;

// Get Properties by User ID Route
router.get('/user/:userId', userProperty);

module.exports = router;