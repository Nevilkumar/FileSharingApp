const express = require('express');
const app = express();
const path = require('path');
require('./config/db.js');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.render('index');
});

//static files
app.use(express.static('./public'));

//view engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

//Routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


app.listen(8000,() => console.log('Listening'));