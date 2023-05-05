const cloudinary = require('cloudinary');
const User = require('../models/userModel');
const dotenv = require('dotenv'); 
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  });

exports.saveOne = async (req, res) => {
    // If there is a file in the incoming reguest upload it to cloudinary
    if (req.file) {
        cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
            if (err) return res.status(400).json({error: 'Unable to upload image to Cloudinary.'});
            req.body.image = result.secure_url;
            req.body.imageId = result.public_id;

            const user = new User(req.body);

            user.save()
                .then(user => res.json({message: 'succesfully created user on cloudinary and mongodb', data: user}))
                .catch(err => res.status(400).json({message: 'unable to  save user on cloudinary .', data: err}));
        });
        // if not just save the incoming request body as 
    } else {
        const user = new User(req.body);

        user.save()
            .then(user => res.json({message: 'succesfully created user on mongodb Only', data: user}))
            .catch(err => res.status(400).json({message: 'Unable to create user on mongodb Only', data: err}));
    }
}

exports.getAll = async (req, res) => {
    User.find()
        .then(users => res.json({message: 'succesfully retrieved users', data: users}))
        .catch(err => res.status(400).json({message: 'error retrievig users', data: err}));
}

exports.getById = async (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({error: 'User not found.'});
            res.json(user);
        })
        .catch(err => res.status(400).json({error: 'Unable to retrieve user.'}));
}

exports.getByEmail = async (req, res) => {
    const email = req.params.email;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        email: user.email,
        password: user.password,
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };
  


exports.updateOneById = async (req, res) => {
    User.findById(req.params.id)
    .then(user => {
    if (!user) return res.status(404).json({error: 'User not found.'});
        // Check if the authenticated user is the owner of the profile
        if (user.username !== req.user.username)
            return res.status(401).json({ error: "Unauthorized." });

        // Upload image to Cloudinary
        if (req.file) {
            cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
                if (err) return res.status(400).json({error: err.message});
                user.image = result.secure_url;
                user.image_id = result.public_id;
            });
        }

        // Save updated user information
        user.username = req.body.username;
        user.email = req.body.email;
        user.bio = req.body.bio;
        user.image = req.body.image;

        user.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json({error: 'Unable to update user.'}));
    })
    .catch(err => res.status(400).json({error: 'Unable to retrieve user.'}));
}

// UserModel and User controller communicating same fields
