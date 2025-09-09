const express = require('express');
const router = express.Router();
const uplode = require('./storage');
const {postingImage,singleImage} = require('./controller');

router.post('/upload',uplode.single('image'),postingImage);
router.get('/:id',singleImage);

module.exports = router;

