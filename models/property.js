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
    price: {
        type: Number,
        required: true
    },
    // property/building Images
    propertyFrontImg: {
        type: String,

    },
    propertyRightImg: {
        type: String,
    },
    propertyLeftImg: {
        type: String,
    },
    /// property Interior Images
    propertyInteriorImg1: {
        type: String,
    },
    propertyInteriorImg2: {
        type: String,
    },
    propertyInteriorImg3: {
        type: String,
    },
    //House Document
    registrationCopy: {
        type: String,
        required: true
    },
    bluePrintCopy: {
        type: String,
        required: true
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
    }

}, { timestamp: true });
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;