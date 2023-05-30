const knex = require("knex");
const path = require("path");

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: './src/database/financeiro.db'
    },
    useNullAsDefault: true,
});
module.exports = connection;