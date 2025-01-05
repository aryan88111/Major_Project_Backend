const Property = require('../models/property');

exports.addProperty = async(req, res) => {
    try {
        const newProperty = new Property(req.body);
        const savedProperty = await newProperty.save();

        res.status(201).json({
            message: 'Property added successfully',
            property: savedProperty
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error adding property',
            error: error.message
        });
    }
};

/*

// Add Property
exports.addProperty = async(req, res) => {
    // Destructure the request body
    const {
        propertyName,
        location,
        price,
        propertyFrontImg,
        propertyRightImg,
        propertyLeftImg,
        propertyInteriorImg1,
        propertyInteriorImg2,
        propertyInteriorImg3,
        registrationCopy,
        bluePrintCopy,
        numOfRooms,
        numOfBathRoom,
        numOfBalcony,
        numOfParking,
        propertyArea,
        propertyFurnished,
        propertyConstructionYear,
        propertyFacing,
        propertyTransactionType,
        propertyResale,
        propertyStatus,
        propertyType,
        userId
    } = req.body;

    try {
        // Create a new property instance
        const newProperty = new Property({
            propertyName,
            location,
            price,
            propertyFrontImg,
            propertyRightImg,
            propertyLeftImg,
            propertyInteriorImg1,
            propertyInteriorImg2,
            propertyInteriorImg3,
            registrationCopy,
            bluePrintCopy,
            numOfRooms,
            numOfBathRoom,
            numOfBalcony,
            numOfParking,
            propertyArea,
            propertyFurnished,
            propertyConstructionYear,
            propertyFacing,
            propertyTransactionType,
            propertyResale,
            propertyStatus,
            propertyType,
            userId
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();

        // Respond with the saved property
        res.status(201).json({
            message: 'Property added successfully',
            property: savedProperty
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error adding property',
            error: error.message
        });
    }
};
*/



// Get Properties by User ID Route
exports.userProperty = async(req, res) => {
    const { userId } = req.params; // Get user ID from request parameters

    try {
        const properties = await Property.find({ userId }); // Find properties by user ID

        if (properties.length === 0) {
            return res.status(404).json({ message: 'No properties found for this user' });
        }

        res.status(200).json(properties); // Respond with the found properties
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving properties', error: error.message });
    }
}