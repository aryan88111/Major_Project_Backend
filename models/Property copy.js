const mongoose = require('mongoose');

/**
 * Property Schema - Defines the structure for property listings
 * Includes property details, location information, and listing status
 */
const propertySchema = new mongoose.Schema({
    // Basic property information
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    // Property location details
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },

    // Property features and specifications
    features: [{
        type: String // Array of property features/amenities
    }],
    propertyType: {
        type: String,
        enum: ['residential', 'commercial', 'land'],
        required: true
    },

    // Listing status
    status: {
        type: String,
        enum: ['active', 'pending', 'sold'],
        default: 'active'
    },

    // Property media
    images: [{
        type: String // Store image URLs from Supabase
    }],
    virtualTour: {
        type: String // URL to virtual tour
    },

    // Geolocation data for map features
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere' // Enables geospatial queries
        }
    },

    // Property ownership and management
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    soldTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    soldAt: {
        type: Date
    },
    soldPrice: {
        type: Number
    },

    // Property specifications
    squareFootage: Number,
    bedrooms: Number,
    bathrooms: Number,
    yearBuilt: Number,

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for search functionality
propertySchema.index({
    title: 'text',
    description: 'text',
    'address.city': 'text',
    'address.state': 'text'
});

module.exports = mongoose.model('Property', propertySchema);
