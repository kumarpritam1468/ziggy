const express = require('express');
const { addFood, allFoods, removeFood } = require('../controllers/foodController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage:storage});

router.get('/all', allFoods);
router.post('/add', upload.single('image'), addFood);
router.delete('/remove/:id', removeFood);

module.exports = router;