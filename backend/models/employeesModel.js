const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
    {
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    EmployeentproId: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        trim: true
    },
    employeeFnames: {
    type: String,
    trim: true
    },
    employeeLname: {
        type: String,
        trim: true
    },
    employeeIdNo: {
        type: Number,
        trim: true
    },
    file_path: {
    type: String,
    },
    file_mimetype: {
    type: String,
    },
    employeeDesignation: {
    type: String,
    },
    contactNo: {
        type: Number,
    },
    employeeRole: {
    type: String,
    },
    employeeEmail: {
        type: String,
    },
    employmentType: {
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

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

// Employeee controller and model same fields