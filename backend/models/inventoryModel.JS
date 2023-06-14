const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
    {
    url: {
        type: String,
        trim: true
    },
    public_id: {
        type: String,
        trim: true
    },
    KhonaMartStockId: {
        type: String, // ---
        trim: true
    },
    createdBy: {
        type: String,// ---
        trim: true
    },
    title: {
        type: String,// ---
        trim: true
    },
    productDescription: {
    type: String,// ---
    trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    inventoryType: {
    type: String,// ---
    },
    manufacturepn: {
        type: String,// ---
    },
    source: {
        type: String,// ---
    },
    quantity: {
    type: Number,// ---
    },
    quantityInside: {
        type: Number,// ---
    },
    quantitySold: {
        type: Number,// ---
    },
    quantityRemaining: {
        type: Number,// ---
    },
    deliveryCost: {
        type: Number, // --
    },
    sourceAddress: {
        type: String, // --
    },
    UseCases: {
        type: Array, // --
    },
    brand: {
        type: String, // -- These are Departments in this app, This should later be made to an array
    },
    productLifeSpan: {
        type: Number, // -- These are Departments in this app, This should later be made to an array
    },
    productPackageID: {
        type: Number, // -- These are Departments in this app, This should later be made to an array
    },
    brand: {
        type: String,// --
    },
    sourceContactno: {
        type: String,// ---
    },
    costValue: {
        type: Number,// ---
        trim: true
    },
    saleValue: {
        type: Number, // --
        trim: true
    },
    profit: {
        type: Number, // --
    },
    sourceWebsite: {
        type: String,// -- This should later be made to an array
    },
    sourceEmail: {
        type: String, // -- This should later be made to an array
    },
    sourcingLeadTimes: {
        type: String, // -- This should later be made to an array
    },
    storesDeployed: {
        type: Array, // --  This should later be made to an array
    },
    BallanceNow: {
        type: Number, // This should later be made to an array
    }
    ,
    addtoCarts: {
        type: Array, // This should later be made to an array
    },
    likes: {
        type: Array, // This should later be made to an array
    },
    category: {
        type: String, // This should later be made to an array
    },
    deliveringCost: {
        type: Number, // --
    },
    status: {
        type: String, // This should later be made to an array
    },
    stars: {
        type: Array, // This should later be made to an array
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

const Inventory = mongoose.model("Inventory", InventorySchema );
module.exports = Inventory;

