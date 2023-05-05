const express = require("express");
const router = express.Router();
const multer = require('multer');
const { createInventory, getInventories, getInventory, updateInventory, deleteInventory } = require("../controllers/inventoryController");



const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './uploads/inventories');
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


router.post("/inventory", upload.single("file"), createInventory);
router.get("/inventory",  getInventories);
router.get("/inventory/:id", getInventory);
router.put("/inventory/:id",upload.single("file"), updateInventory);
router.delete("/inventory/:id" ,deleteInventory);

module.exports = router;