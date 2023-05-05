const express = require('express');
const router = express.Router();
const multer = require('multer');
const customerQuotesController = require('../controllers/customerQuotesController');
const { getAllSupplierQuotes, getOneSupplierQuote, createSupplierQuote, updateSupplierQuote, deleteSupplierQuote } = require('../controllers/supplierQuotesController');
// const { upload } = require('../middleware/upload');


const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './uploads/customerQuotes');
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



// GET all supplier quotes
router.get('/', getAllSupplierQuotes);

// GET one supplier quote
router.get('/:id', getOneSupplierQuote);

// CREATE a new supplier quote
router.post('/', upload.single('upload'), createSupplierQuote);

// UPDATE a supplier quote
router.put('/:id',upload.single('upload'), updateSupplierQuote);

// DELETE a supplier quote
router.delete('/:id', deleteSupplierQuote);

module.exports = router;
