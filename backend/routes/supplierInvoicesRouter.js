const path = require('path');
const express = require('express');
const multer = require('multer');
const { saveSupplierInvoice, getSupplierInvoices, getOneSupplierInvoice, updateOneSupplierInvoice, deleteOneSupplierInvoice } = require('../controllers/supplierInvoicesController');

const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/supplierInvoices');
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


Router.post('/',upload.single('upload'),saveSupplierInvoice);

Router.get('/', getSupplierInvoices);
    
Router.get("/:id",getOneSupplierInvoice);

Router.put("/:id", upload.single("upload"),updateOneSupplierInvoice );

Router.delete("/:id", deleteOneSupplierInvoice);
  
module.exports = Router;