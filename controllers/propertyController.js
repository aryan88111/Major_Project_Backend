const Property = require('../models/property');

exports.addProperty = async(req, res) => {
    try {
        const {
            propertyName,
            price,
            address,
            images,
            numOfRooms,
            numOfBathRoom,
            numOfKitchen,
            numOfBalcony,
            numOfParking,
            propertyArea,
            propertyFurnished,
            propertyConstructionYear,
            features,
            propertyFacing,
            propertyTransactionType,
            propertyResale,
            propertyStatus,
            propertyType,
            propertySellerIdType,
            propertySellerId,
            propertyDescription1,
            propertyDescription2,
            owner,
            location,

            registrationCopy,
            bluePrintCopy
        } = req.body;

        // Parse location if provided (longitude, latitude)
        // const parsedLocation = location ? JSON.parse(location) : { type: "Point", coordinates: [0, 0] };

        // Create New Property Entry
        const newProperty = new Property({
            propertyName,
            price,
            address,
            images,
            location,

            registrationCopy,
            bluePrintCopy,
            numOfRooms,
            numOfBathRoom,
            numOfKitchen,
            numOfBalcony,
            numOfParking,
            propertyArea,
            propertyFurnished,
            propertyConstructionYear,
            features, // Convert comma-separated string to array
            propertyFacing,
            propertyTransactionType,
            propertyResale,
            propertyStatus,
            propertyType,
            propertySellerIdType,
            propertySellerId,
            propertyDescription1,
            propertyDescription2,
            owner
        });

        await newProperty.save();

        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
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

exports.getAllProperty = async(req, res) => {
    try {
        // Fetch all properties with optional query parameters
        const properties = await Property.find(req.query).populate('owner', 'name email'); // Populate owner details
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
};


exports.getPropertyById = async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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