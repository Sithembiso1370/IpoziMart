const mongoose = require('mongoose');

const SuppliersSchema = new mongoose.Schema(
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
    name: {
    type: String,
    trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    supplierAddress: {
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

const Suppliers = mongoose.model("Suppliers", SuppliersSchema);
module.exports = Suppliers;
// Supplier model and controller same fields