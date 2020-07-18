const express = require('express');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const app = express();
const folder = require('./routes/folders');
const cors = require('cors');
const config = require('config')

const stringFromDB = config.get('db')

if (!stringFromDB){
    console.error('config in db is not defined');
    process.exit(1);
}

// const client = new MongoClient(stringFromDB, { useNewUrlParser: true });

mongoose.connect(stringFromDB, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongodb...'))
    .catch((error) => console.error('Error connecting to Mongodb...', error.message))

app.use(express.json());
app.use(cors());
app.use('/api/folder', folder);

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Listening on port ${port}..`) });