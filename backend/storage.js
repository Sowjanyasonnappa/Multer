const multer = require('multer');

const storage = multer.memoryStorage({
    destination: (req, file, callback) =>{
        callback(null,('./uploads'))
    },
    filename: (req, file, callback) =>{
        callback(null, file.originalname);
    }
})

const uplode = multer({storage});

module.exports = uplode;