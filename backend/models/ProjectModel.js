const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
    url: {
        type: String,
        trim: true
    },
    public_id: {
        type: String,
        trim: true
    },
    ProjectntproId: {
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
    projectValue: {
        type: String,
    },
    projectEstimatedCost: {
    type: String,
    },
    projectActualCost: {
        type: String,
    },
    projectStartDate: {
        type: String,
    },
    projectDuration: {
        type: String,
    },
    projectStatus: {
        type: String,
    },
    Comments: {
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

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

// Projects Controller and model communicatiing same fields