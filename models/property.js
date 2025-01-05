const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");


const propertySchema = mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
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
    numOfBalcony: {
        type: Number,
        required: true,
    },
    numOfParking: {
        type: Number

    },
    ///Building/Property specification
    propertyArea: {
        type: Number,
        required: true,
    },
    propertyFurnished: {
        type: String,
        required: true,
    },
    propertyConstructionYear: {
        type: Number,

    },
    propertyFacing: {
        type: String,

    },
    propertyTransactionType: {
        type: String,

    },
    propertyResale: {
        type: String,

    },
    propertyStatus: {
        type: String,
        required: true

    },
    propertyType: {
        type: String,
        required: true

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"]
    }

});
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;