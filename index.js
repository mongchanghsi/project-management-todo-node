const express = require('express');
const mongoose = require('mongoose');
const app = express();
const folder = require('./routes/folders');
const cors = require('cors');
const config = require('config')

if (!config.get('db')){
    console.error('config in db is not defined');
    process.exit(1);
}
mongoose.connect(config.get('db'))
    .then(() => console.log('Connected to Mongodb...'))
    .catch((error) => console.error('Error connecting to Mongodb...', error.message))

app.use(express.json());
app.use(cors());
app.use('/api/folder', folder);

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Listening on port ${port}..`) });