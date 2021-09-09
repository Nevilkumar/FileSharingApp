const router = require('express').Router();
const Filedatabase = require('../models/model');

router.get('/:uuid', async(req,res) => {

    const file = await Filedatabase.findOne({uuid: req.params.uuid});
    if(!file)
        return res.render('download',{error: 'Link has been expired'});

    const filepath = `${__dirname}/../${file.path}`;
    res.download(filepath);

});

module.exports = router;