const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');

const app = express();
const upload = multer()
const port = 80;
const connection = mysql.createConnection({
    host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
    user: "CADEPEPPLEY",
    password: "3qCy3xb6kEMcDoPAFnud68sX3OJwhBMQ2nk",
    database: 'CADEPEPPLEY'
});
const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/getdata', (req, res) => {
    const query = 'SELECT id, name, date_time FROM alexa_intents';

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});