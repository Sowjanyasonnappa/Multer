const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const image = require('./model')
const imageRoutes = require('./routes'); 


const app = express();
app.use(cors());
app.use("/api/image", imageRoutes); 

mongoose.connect('mongodb://127.0.0.1:27017/multer-demo',{
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const storage = multer.memoryStorage();
const upload = multer({ storage })

app.listen(3000, ()=>{
    console.log('Server is running ')
})