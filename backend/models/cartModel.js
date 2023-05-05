const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    rekaStockId: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    productDescription: {
    type: String,
    trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    supplier: {
    type: String,
    },
    manufacturepn: {
        type: String,
    },
    quantity: {
    type: Number,
    },
    specs: {
        type: String,
    },
    category: {
        type: Number, // These are Departments in this app, This should later be made to an array
    },
    brand: {
        type: String,
    },
    cost: {
        type: Number,
    },
    price: {
        type: Number,
    },
    inventoryDetails: {
        type: String,// This should later be made to an array
    },
    sourceLink: {
        type: String, // This should later be made to an array
    },
    sourcingLeadTimes: {
        type: String, // This should later be made to an array
    },
    sourceNames: {
        type: String, // This should later be made to an array
    },
    likes: {
        type: String, // This should later be made to an array
    },
    comments: {
        type: String, // This should later be made to an array
    }
    ,
    inventoryAttributes: {
        type: String, // This should later be made to an object/specs
    }
    ,
    addtoCarts: {
        type: String, // This should later be made to an array
    },
    shares: {
        type: String, // This should later be made to an array
    },
    stars: {
        type: Number, // This should later be made to an array
    },
    uploadedOnline: {
    type: String,// This should later be made to an array
    },     
    }
    ,
    {
        timestamps: true
    },
);

const Cart = mongoose.model("Cart", CartSchema );
module.exports = Cart;