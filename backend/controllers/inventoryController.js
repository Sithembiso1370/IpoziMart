const cloudinary = require("cloudinary").v2;
const Inventory = require('../models/inventoryModel');
const dotenv = require('dotenv'); 
dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.saveInventory = async (req, res) => {
  try {
    const fields = req.body;
    console.log('fields = ',fields);
    console.log("req.file =",req.file)
    const createdBy = 'Sithembiso Maphanga';
    if(req.file){
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `images/${file.originalname}`,
        tags: 'images',
        resource_type: "image",
      });
      console.log("result = ", result)

      if(result){
        const public_id = result.public_id;
        const url = result.secure_url;
        const uploadedOnline = result ? 'yes' : 'no';
        const inventory = await Inventory.create({
          url,
          public_id,
          ...fields,
          createdBy,
          file_path: file.path,
          file_mimetype: file.mimetype,
          uploadedOnline
        });
        console.log("result = ",result);
        res.status(200).json({ status: "success", message: "success mongo and cloudinary", data: inventory});
        
      }
      else{
        const public_id = '';
        const url = '';
        const uploadedOnline = 'no';
        const inventory = await Inventory.create({
          url ,
          public_id,
          ...fields,
          createdBy,
          file_path: '',
          file_mimetype: '',
          uploadedOnline
        });
        console.log("result = ",result);
        res.status(200).json({ status: "success", message: "success mongo only", data: inventory});
        console.log("success mongo only");
      }
    }
    else{
      const public_id = '';
      const url = '';
      const uploadedOnline = 'no';
      const inventory = await Inventory.create({
        url ,
        public_id,
        ...fields,
        createdBy,
        file_path: '',
        file_mimetype: '',
        uploadedOnline
      });
      res.status(200).json({ status: "success", message: "success mongo only", data: inventory});
      console.log("success mongo only and cloudinary");
    }
  } catch (error) {
    res.status(400).json({ status: "failure", message: "Could not save data both mongodb and cloudinary", data: error});
    console.log("Could not save  mongo and cloudinary");
  }
}




exports.getInventories =async (req, res) => {
  try {
    const enquiries = await Inventory.find({});
    const sortedEnquiries = enquiries.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedEnquiries);
  } catch (error) {
    res.status(400).send('Error while getting list of Inventory. Try again later.');
  }
}
    
 
exports.getOneInventory = async (req, res) => {
  try {
    const enquiry = await Inventory.findById(req.params.id);
    if (!enquiry) return res.status(404).send('Inventory not found');
    res.json(enquiry);
  } catch (error) {
    res.status(500).send(error);
  }
}

//   Router.put("/:id", upload.single("enquiryupdate"), );
exports.updateOneInventory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("The ID is : ", id);
    const inventory = await Inventory.findById(id);
    console.log("The inventory old is : ", inventory);
    const newInventory = {};

    if (!inventory) {
      return res.status(404).send('Inventory not found');
    }

    if (req.file) {
      if (inventory.public_id) {
        // Delete the previous image from Cloudinary
        await cloudinary.uploader.destroy(inventory.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `images/${req.file.originalname}`,
        tags: 'images',
        resource_type: 'image',
      });

      inventory.url = result.secure_url;
      inventory.public_id = result.public_id;
      inventory.file_path = req.file.path;
      inventory.file_mimetype = req.file.mimetype;
      inventory.uploadedOnline = result ? 'yes' : 'no';
    }

    inventory.createdBy = 'SithembisoUpdate';

    // Update other fields from req.body if they exist
    for (let key in req.body) {
      if (
        req.body.hasOwnProperty(key) &&
        key !== '_id' &&
        inventory.schema.paths[key]
      ) {
        inventory[key] = req.body[key];
        newInventory[key] = req.body[key];
      }
    }
    console.log("The inventory New is : ", newInventory);

    // await inventory.save();
    const inventoryStatus = await Inventory.findByIdAndUpdate(id, newInventory, { new: true });

    // res.send('Inventory updated successfully.');
    res.status(200).json({ status: 'success', data: inventoryStatus });
  } catch (error) {
    res.status(500).send('Error while updating inventory. Try again later.');
  }
};




exports.deleteOneInventory = async (req, res) => {
  try {
    // Get the enquiry ID from the request parameters
    const { id } = req.params;

    // Find the enquiry in the database by its ID
    const enquiry = await Inventory.findById(id);

    // If no enquiry was found, return a 404 response
    if (!enquiry) {
      return res.status(404).send('Inventory not found');
    }

    // If an enquiry was found, try to delete it from the database
    await enquiry.remove();

    // Try to delete the attachment on Cloudinary
    await cloudinary.uploader.destroy(enquiry.public_id);

    // Return a success response
    res.send('Inventory deleted successfully.');
  } catch (error) {
    // If there was an error, return a 500 response
    console.log('Delete error:', error);
    res.status(500).send('Error while deleting Inventory. Try again later.');
  }
}

// Inventory model and controller fields the same