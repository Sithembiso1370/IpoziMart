const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema(
  {
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
    }
  },
  {
    timestamps: true
  },
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;