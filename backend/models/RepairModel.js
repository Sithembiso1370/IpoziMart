const mongoose = require('mongoose');

const RepairSchema = new mongoose.Schema(
    {
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    RepairntproId: {
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
    suppliers: {
    type: String,
    },
    sparesNeeded: {
        type: String,
    },
    labourHours: {
    type: String,
    },
    troubleShootDescription: {
        type: String,
    },
    diagnosisDescription: {
        type: String,
    },
    status: {
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

const Repair = mongoose.model("Repair", RepairSchema);
module.exports = Repair;

 // Repair Controller and model speak same fields