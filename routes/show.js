const router = require('express').Router();
const Filedatabase = require('../models/model.js');
const dotenv = require('dotenv');
dotenv.config();

router.get('/:uuid', async(req,res) => {
    
    try{
        const file = await Filedatabase.findOne({uuid : req.params.uuid});
        if(!file){
            return res.render('download',{error: 'Link has been expired'});
        }

        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            downloadLink: `/files/download/${file.uuid}`
        });
    }
    catch(err){
        return res.render('download',{error: 'Something went wrong.'});
    }   

    
});


module.exports = router;