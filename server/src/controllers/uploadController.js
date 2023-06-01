const moment = require('moment');
const knex = require('../config/connection');
const fs = require('fs');

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

    async ImageDelete(req, res) {
        var filename = req.body.filename;
        var id = req.body.id;
        try {
            await knex('moments').where({ id: id }).del();       

            var filePath = `./public/upload/${filename}`;

            fs.unlink(filePath, (error) => {
                if (!error) {
                  console.log(false);
                } else {
                  console.log('Erro ao deletar arquivo.');
                }
              });             

            res.status(200).json({ 'ok': 'ok' })
        } catch (error) {
            console.log(error);
        }
    }

        

}
module.exports = UploadController;