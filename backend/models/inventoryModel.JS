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
    rekaStockId: {
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
    supplier: {
    type: String,// ---
    },
    manufacturepn: {
        type: String,// ---
    },
    quantity: {
    type: Number,// ---
    },
    deliveryCost: {
        type: Number, // --
    },
    sourceCountry: {
        type: String, // --
    },
    specs: {
        type: String, // --
    },
    department: {
        type: String, // -- These are Departments in this app, This should later be made to an array
    },
    subdepartment: {
        type: String, // -- These are Departments in this app, This should later be made to an array
    },
    brand: {
        type: String,// --
    },
    color: {
        type: String,// ---
    },
    costPrice: {
        type: Number,// ---
    },
    salePrice: {
        type: Number, // --
    },
    inventoryDetails: {
        type: String,// -- This should later be made to an array
    },
    sourceLink: {
        type: String, // -- This should later be made to an array
    },
    sourcingLeadTimes: {
        type: String, // -- This should later be made to an array
    },
    store: {
        type: String, // --  This should later be made to an array
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
    category: {
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

const Inventory = mongoose.model("Inventory", InventorySchema );
module.exports = Inventory;

// Inventory model and controller fields the same
// category
// -- Gearmotors,Servo Motors,Motors and Gearboxes, And Spares
// -- Lights and Lighting equipment
// -- Ellectronics and Ellectrical Supplies
// -- Industrial Supplies        
// -- Security and Cameras
// 
// brand