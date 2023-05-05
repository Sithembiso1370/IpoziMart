const path = require('path');
const express = require('express');
const multer = require('multer');
const { saveEnquiry, getEnquiries, getOneEnquiry, updateOne, deleteOne } = require('./EnquiryController');
const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './enquiries');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


// Router.post('/registerUser',upload.single('upload'),saveOne);

// Router.post('/loginUser',upload.single('upload'),loginOne);
// Get Users Info
// Router.get('/', getAll);
// Get User Info
// Router.get("/:id",getOne);
// Update user infor
Router.put("/updateUser/:id", upload.single("enquiryupdate"),updateOne );
// DeleteOneUser
Router.delete("/deleteUder/:id", deleteOne);
  
module.exports = Router;