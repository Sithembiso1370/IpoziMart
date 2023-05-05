const path = require('path');
const express = require('express');
const multer = require('multer');
const { saveInventory, getInventories, getOneInventory, updateOneInventory, deleteOneInventory } = require('../controllers/inventoryController');


const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/inventory');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|webp|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx,webp, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


Router.post('/',upload.single('upload'),saveInventory);

Router.get('/', getInventories);

Router.get("/:id",getOneInventory);

Router.put("/:id", upload.single("upload"),updateOneInventory);

Router.delete("/:id", deleteOneInventory);
  
module.exports = Router;