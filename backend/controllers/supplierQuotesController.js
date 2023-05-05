const cloudinary = require("cloudinary").v2;
const SupplierQuotes = require("../models/supplierQuotesModel");
const dotenv = require('dotenv'); 
dotenv.config();

// Set up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createSupplierQuote = async (req, res) => {
  try {
    const fields = req.body;
    const createdBy = 'Sithembiso Maphanga';
    if(req.file){
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `images/${file.originalname}`,
        tags: 'images',
        resource_type: "image",
      });
      const public_id = result.public_id;
      const url = result.secure_url;
      const uploadedOnline = result ? 'yes' : 'no';
      const enquiry = await SupplierQuotes.create({
        url,
        public_id,
        ...fields,
        createdBy,
        file_path: file.path,
        file_mimetype: file.mimetype,
        uploadedOnline
      });
      res.send('file uploaded successfully and saved to mongodb');
    }
    else{
      const public_id = '';
      const url = '';
      const uploadedOnline = 'no';
      const enquiry = await SupplierQuotes.create({
        url ,
        public_id,
        ...fields,
        createdBy,
        file_path: '',
        file_mimetype: '',
        uploadedOnline
      });
      res.send('file saved to mongodb only.');
    }

  } catch (error) {
    res.status(400).send('Error while uploading file. Try again later.');
  }
};

const getAllSupplierQuotes = async (req, res) => {
  try {
    const enquiries = await SupplierQuotes.find({});
    const sortedEnquiries = enquiries.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedEnquiries);
  } catch (error) {
    res.status(400).send('Error while getting list of SupplierQuotes. Try again later.');
  }
};

const getOneSupplierQuote = async (req, res) => {
  try {
    const enquiry = await SupplierQuotes.findById(req.params.id);
    if (!enquiry) return res.status(404).send('SupplierQuotes not found');
    res.json(enquiry);
  } catch (error) {
    res.status(500).send(error);
  }
};



const updateSupplierQuote = async (req, res) => {
  try {
    const enquiry = await SupplierQuotes.findById(req.params.id);
    if (!enquiry) return res.status(404).send('SupplierQuotes not found');
    if (req.file) {
      await cloudinary.uploader.destroy(enquiry.public_id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `images/${req.file.originalname}`,
        tags: 'images',
        resource_type: "image",
      });
      enquiry.url = result.secure_url;
      enquiry.public_id = result.public_id;
      enquiry.file_path = req.file.path;
      enquiry.file_mimetype = req.file.mimetype;
      const uploadedOnline = result ? 'yes' : 'no';
      enquiry.uploadedOnline = uploadedOnline ;
    }
    enquiry.createdBy = 'SithembisoUpdate';
    for (let key in req.body) {
      if (req.body[key] !== '') {
        enquiry[key] = req.body[key];
      }
    }
    await enquiry.save();
    res.send('SupplierQuotes updated successfully.');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteSupplierQuote = async (req, res) => {
  try {
    // Get the enquiry ID from the request parameters
    const { id } = req.params;

    // Find the enquiry in the database by its ID
    const enquiry = await SupplierQuotes.findById(id);

    // If no enquiry was found, return a 404 response
    if (!enquiry) {
      return res.status(404).send('SupplierQuotes not found');
    }

    // If an enquiry was found, try to delete it from the database
    await enquiry.remove();

    // Try to delete the attachment on Cloudinary
    await cloudinary.uploader.destroy(enquiry.public_id);

    // Return a success response
    res.send('SupplierQuotes deleted successfully.');
  } catch (error) {
    // If there was an error, return a 500 response
    console.log('Delete error:', error);
    res.status(500).send('Error while deleting SupplierQuotes. Try again later.');
  }
};

module.exports = {
  getAllSupplierQuotes,
  getOneSupplierQuote,
  createSupplierQuote,
  updateSupplierQuote,
  deleteSupplierQuote,
};


// Supplier quotes controller and model speaking same fields
