const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema(
    {
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    ntproId: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        trim: true
    },
    company: {
    type: String,
    trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    customerShipAddress: {
        type: String,
    },
    customerBillAddress: {
    type: String,
    },
    primaryContact: {
        type: String,
    },
    contactNo: {
    type: String,
    },
    contactEmail: {
        type: String,
    },
    paymentTerms: {
        type: String,
    },
    uploadedOnline: {
    type: String,
    },     
    }
    ,
    {
        timestamps: true
    },
);

const Customers = mongoose.model("Customers", CustomersSchema);
module.exports = Customers;

// Customers Model and controller working same fields