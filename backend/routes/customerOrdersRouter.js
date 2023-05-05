const path = require('path');
const express = require('express');
const multer = require('multer');
const { saveSupplierOrder, getSupplierOrders, getOneSupplierOrder, updateOneSupplierOrder, deleteOneSupplierOrder } = require('../controllers/supplierOrdersController');
const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/customerOrders');
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


Router.post('/',upload.single('upload'),saveSupplierOrder);

Router.get('/', getSupplierOrders);
    
Router.get("/:id",getOneSupplierOrder);

Router.put("/:id", upload.single("upload"),updateOneSupplierOrder );

Router.delete("/:id", deleteOneSupplierOrder);
  
module.exports = Router;