const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Filedatabase = require('../models/model.js');
const { v4: uuid4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({

    storage: storage,
    limit: { fileSize: 1000000 * 100 } //100mb

}).single('myfile');



router.post('/', (req, res) => {

    upload(req, res, async(err) => {

        // console.log(req.file);

        if (!req.file) {
            return res.json({ error: "File required" })
        }

        if (err) {
            return res.status(500).send({ error: err.msg });
        }


        const file = new Filedatabase({

            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uuid: uuid4(),

        });

        const response = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });

    });

});






module.exports = router;