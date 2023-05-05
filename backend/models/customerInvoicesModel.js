const mongoose = require('mongoose');

const customerInvoicesSchema = new mongoose.Schema(
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
    description: {
    type: String,
    trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    customer: {
        type: String,
    },
    supplier: {
    type: String,
    },
    paymentRecieved: {
        type: String,
        },
    status: {
        type: String,
    },
    comments: {
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

const customerInvoices = mongoose.model("CustomerInvoices", customerInvoicesSchema);
module.exports = customerInvoices;

// // Customer Invoice controller and model same fields