const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    tasks: {
        type: Array,
        default: []
    }
})

const Folder = mongoose.model('Folder', folderSchema);

module.exports.Folder = Folder;