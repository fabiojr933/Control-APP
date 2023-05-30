const moment = require('moment');
const knex = require('../config/connection');

class UploadController {
    async uploadImage(req, res) {
       
        console.log(req.body)
        console.log(req.file)
        console.log(req.data)
        return;
        var data = {
            'originalname': req.file.originalname,
            'mimetype': req.file.mimetype,
            'destination': req.file.destination,
            'filename': req.file.filename,
            'path': req.file.path,
            'day': Number(req.body.day),
            'month': Number(req.body.month),
            'year': Number(req.body.year),
        }
        console.log(data)
        try {
            await knex('moments').insert(data);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = UploadController;