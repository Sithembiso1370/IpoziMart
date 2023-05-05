const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllRepairs, getRepairById, updateRepairById, deleteRepairById, createRepair } = require('../controllers/RepairController');


// Configure Multer
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './uploads/repairs');
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

// Create a new repair
router.post('/', upload.single('upload'), createRepair);

// Get all repairs
router.get('/', getAllRepairs);

// Get a repair by ID
router.get('/:id', getRepairById);

// Update a repair by ID
router.put('/:id', upload.single("upload"),updateRepairById);

// Delete a repair by ID
router.delete('/:id', deleteRepairById);

module.exports = router;