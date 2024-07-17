const express = require('express');
const { addFood } = require('../controllers/foodController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage:storage});

router.post('/add', upload.single('image'), addFood);

module.exports = router;