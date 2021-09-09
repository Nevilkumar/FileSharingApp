const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FileSharingApp', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
    })
    .then(() => console.log('Connection Sucessfull'))
    .catch((err) => console.log(err));

