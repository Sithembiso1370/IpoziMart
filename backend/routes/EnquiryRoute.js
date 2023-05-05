const path = require('path');
const express = require('express');
const multer = require('multer');
const { saveEnquiry, getEnquiries, getOneEnquiry, updateOne, deleteOne } = require('../controllers/EnquiryController');
const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/enquiries');
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


Router.post('/',upload.single('upload'),saveEnquiry);

Router.get('/', getEnquiries);
    
Router.get("/:id",getOneEnquiry);

Router.put("/:id", upload.single("upload"),updateOne );

Router.delete("/:id", deleteOne);
  
module.exports = Router;