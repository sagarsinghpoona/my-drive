const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const path = require('path');





/*const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Multer configuration to store files in memory (you can also use diskStorage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Route to upload file to Supabase Storage
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const { buffer, originalname } = req.file;

  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(originalname, buffer, {
        cacheControl: '3600',
        upsert: false, // Set to true if you want to overwrite files with the same name
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Return the URL of the uploaded file
    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${data.path}`;

    return res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
*/



  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    cb(null, Date.now() + path.extname(file.originalname)); // Adding timestamp to avoid filename collisions
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create the 'uploads' directory if it doesn't exist
const fs = require('fs');
const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Define an endpoint to handle file upload (single file)
router.post('/upload', upload.single('file'), (req, res) => {
  // If the file is uploaded successfully, send the file details in the response
  if (req.file) {
    res.json({
      message: 'File uploaded successfully!',
      file: req.file
    });
  } else {
    res.status(400).send('No file uploaded');
  }
});

// Set up the server to listen on a specific port



























router.get('/home',(req,res)=>{
    res.render('home')
})







module.exports =router;