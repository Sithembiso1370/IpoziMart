const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multer = require('multer');

const auth = require('../middleware/auth');
const { saveOne, getAll, getById, updateOneById, getByEmail } = require('../controllers/UserController');


const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

// Image Filture
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// 
const upload = multer({ storage: storage, fileFilter: imageFilter});

// Create a user
router.post('/', upload.single('image'),saveOne );
// Get all users
router.get('/', getAll);
// Get a user by ID
router.get('/id/:id', getById );
// Get a user by Email
router.get('/email/:email', getByEmail);
// Update a user by ID
router.put('/:id', auth, upload.single('image'), updateOneById);


module.exports = router;
