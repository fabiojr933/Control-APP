const app = require('./app');
const env = require('dotenv');
env.config();
const port = process.env.PORT_NODE;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});