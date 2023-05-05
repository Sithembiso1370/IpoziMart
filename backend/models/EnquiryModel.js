const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema(
    {
    url: {
        type: String,
        trim: true
    },
    public_id: {
        type: String,
        trim: true
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

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;