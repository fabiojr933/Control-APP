const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use('/api/v1/', routes);
app.use('/upload', express.static(path.resolve('public', 'upload')));
app.get('/api/v1/', (req, res) => {
    res.send('oi')
});

module.exports = app;