const cloudinary = require("cloudinary").v2;
const CustomerDeliveryNote = require('../models/customerDeliveryNotesModel');
const dotenv = require('dotenv'); 
dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.saveCustomerDeliveryNote = async (req, res) => {
    // Try to get the request body 
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
        const customerDeliveryNote = await CustomerDeliveryNote.create({
          url,
          public_id,
          ...fields,
          createdBy,
          file_path: file.path,
          file_mimetype: file.mimetype,
          uploadedOnline
        });
        res.send('customer DeliveryNote uploaded successfully and saved to mongodb');
      }
      else{
        const public_id = '';
        const url = '';
        const uploadedOnline = 'no';
        const customerDeliveryNote = await CustomerDeliveryNote.create({
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
}



exports.getCustomerDeliveryNotes =async (req, res) => {
  try {
    const customerDeliveryNotes = await CustomerDeliveryNote.find({});
    const sortedcustomerDeliveryNotes = customerDeliveryNotes.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedcustomerDeliveryNotes);
  } catch (error) {
    res.status(400).send('Error while getting list of customer DeliveryNotes. Try again later.');
  }
}
    
 
exports.getOneCustomerDeliveryNote = async (req, res) => {
  try {
    const customerDeliveryNote = await CustomerDeliveryNote.findById(req.params.id);
    if (!customerDeliveryNote) return res.status(404).send('Enquiry not found');
    res.json(customerDeliveryNote);
  } catch (error) {
    res.status(500).send(error);
  }
}

//   Router.put("/:id", upload.single("enquiryupdate"), );
exports.updateOneCustomerDeliveryNote = async (req, res) => {
  try {
    const customerDeliveryNote = await CustomerDeliveryNote.findById(req.params.id);
    if (!customerDeliveryNote) return res.status(404).send('Enquiry not found');
    if (req.file) {
      await cloudinary.uploader.destroy(customerDeliveryNote.public_id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `images/${req.file.originalname}`,
        tags: 'images',
        resource_type: "image",
      });
      customerDeliveryNote.url = result.secure_url;
      customerDeliveryNote.public_id = result.public_id;
      customerDeliveryNote.file_path = req.file.path;
      customerDeliveryNote.file_mimetype = req.file.mimetype;
      const uploadedOnline = result ? 'yes' : 'no';
      customerDeliveryNote.uploadedOnline = uploadedOnline ;
    }
    customerDeliveryNote.createdBy = 'SithembisoUpdate';
    for (let key in req.body) {
      if (req.body[key] !== '') {
        customerDeliveryNote[key] = req.body[key];
      }
    }
    await customerDeliveryNote.save();
    res.send('customer DeliveryNote updated successfully.');
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.deleteOneCustomerDeliveryNote = async (req, res) => {
  try {
    // Get the enquiry ID from the request parameters
    const { id } = req.params;

    // Find the enquiry in the database by its ID
    const customerDeliveryNote = await CustomerDeliveryNote.findById(id);

    // If no enquiry was found, return a 404 response
    if (!customerDeliveryNote) {
      return res.status(404).send('customer DeliveryNote not found');
    }

    // If an enquiry was found, try to delete it from the database
    await customerDeliveryNote.remove();

    // Try to delete the attachment on Cloudinary
    await cloudinary.uploader.destroy(customerDeliveryNote.public_id);

    // Return a success response
    res.send('customer DeliveryNote deleted successfully.');
  } catch (error) {
    // If there was an error, return a 500 response
    console.log('Delete error:', error);
    res.status(500).send('Error while deleting customer DeliveryNote. Try again later.');
  }
}

//  Customer deliverynote controller and model same fields