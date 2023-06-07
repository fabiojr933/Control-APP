const knex = require('../config/connection');

class expenseController {

    async create(req, res) {

        try {
            if (!req.body.description || !req.body.status) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            const data = { description: req.body.description.toUpperCase(), status: req.body.status };
            await knex('expense').insert(data);
            return res.status(201).json(data);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro!' });
        }
    }

    async All(req, res) {
        try {
            const data = await knex('expense').select('*');
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro!' });
        }
    }
    async remove(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ error: 'É preciso informar uma receita' });
            }
            await knex('expense').where({ id: id }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro!' });
        }
    }
}
module.exports = expenseController