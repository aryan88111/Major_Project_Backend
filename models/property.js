const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");


const propertySchema = mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    // location: {
    //     type: String,
    //     required: true
    // },
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

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },

    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String

    }],

    //House Document
    registrationCopy: {
        type: String,
        // required: true
    },
    bluePrintCopy: {
        type: String,
        // required: true
    },
    ///rooms Specification 
    numOfRooms: {
        type: Number,
        required: true,
    },
    numOfBathRoom: {
        type: Number,
        required: true,
    },

    numOfKitchen: {
        type: Number,
        required: true,
    },
    numOfBalcony: {
        type: Number,
        required: true,
    },
    numOfOther: {
        type: Number

    },
    ///Building/Property specification
    propertyArea: {
        type: Number,
        required: true,
    },
    propertyFurnished: {
        type: String,
        enum: ['semi-furnished', 'full-furnished', 'unfurnished'],
        required: true,
    },
    propertyConstructionYear: {
        type: Number,

    },
    features: [{
        type: String // Array of property features/amenities
    }],
    propertyFacing: {
        type: String,

    },
    propertyTransactionType: {
        type: String,

    },
    propertyResale: {
        type: String,
        enum: ['resale', 'new'],
        default: 'new'

    },
    propertyStatus: {
        type: String,

        enum: ['active', 'sold', 'pending'],
        required: true,
        default: "active"

    },
    propertyType: {
        type: String,
        enum: ['residential', 'commercial', 'land'],
        required: true

    },
    residentialType: {
        type: String,
        enum: ['rent', 'lease', 'sell'],
        // required: true

    },
    propertySellerIdType: {
        type: String,
        enum: ['aadhaar', 'passport', 'pan', 'DL'],

        required: true
    },
    propertySellerId: {
        type: Number,
        required: true
    },
    propertyDescription1: {
        type: String,


    },
    propertyDescription2: {
        type: String,


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

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"]
    }, // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false // Initially set to false, will be verified later by admin
    }

}, { timestamp: true });


propertySchema.index({
    propertyName: 'text',
    propertyDescription1: 'text',
    'address.city': 'text',
    'address.state': 'text'
});
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;