const moment = require('moment');
const knex = require('../config/connection');

class UploadController {
    async uploadImage(req, res) {

        var data = {
            'originalname': req.file.originalname,
            'mimetype': req.file.mimetype,
            'destination': req.file.destination,
            'filename': req.file.filename,
            'path': req.file.path,
            'day': (req.body.day),
            'month': (req.body.month),
            'year': (req.body.year),
            'description': req.body.description
        }
        console.log(data)
        try {
            await knex('moments').insert(data);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    async ImageIndex(req, res) {
        try {
            const data = await knex('moments').select('*');
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = UploadController;