const { Folder } = require('../models/folder');
const express = require('express');
const router = express.Router();

// Get all folders in the database
router.get('/', async (req, res) => {
    const folders = await Folder.find();
    if (!folders) return res.status(400).send('No folder found');

    res.send(folders)
})

// Create a new folder in the database
router.post('/create', async (req, res) => {
    if (!req.body.name || req.body.name.length < 0) return res.status(404).send('Name is not provided');
    if (req.body.name.length < 5) return res.status(404).send('Name should be at least 5 characters');

    // Check if folder exist
    let folder = await Folder.findOne({ name: req.body.name });
    if (folder) return res.status(400).send('Task folder exist')

    // If folder don't exist, create a Folder object
    folder = new Folder({
        name: req.body.name
    })

    folder.save();
    res.send(folder)
})

// Update Task
router.post('/update', async (req, res) => {
    let id = req.body.id
    let taskName = req.body.name

    // Check if folder exist
    let folder = await Folder.findById({ _id : id })
    if (!folder) return res.status(400).send('Task folder not found');
    console.log(folder)

    // Update folder with new task
    try {
        let proneToUpdateTaskList = [...folder.tasks]
        proneToUpdateTaskList.push(taskName)
        folder.tasks = proneToUpdateTaskList
        folder.save();
        res.send(folder)
    }
    catch (error) {
        res.send('Error')
    }
})

// Delete a folder
router.delete('/delete', async (req, res) => {
    let id = req.body.id

    // Check if folder exist
    let folder = await Folder.findOne({ _id: id });
    let folderName = folder.name;
    if (!folder) return res.status(400).send('Task folder not found');

    try {
        const folder = await Folder.deleteOne({ _id: id })
        res.status(200).send(`${folderName} has been deleted`)
    }
    
    catch (error) {
        res.send('Error')
    }
})

// Delete a task
router.delete('/complete', async (req, res) => {
    let id = req.body.id
    let taskName = req.body.name

    // Check if folder exist
    let folder = await Folder.findById({ _id : id })
    if (!folder) return res.status(400).send('Task folder not found');
    console.log(folder)

    // Look for task within the task folder and delete it
    try {
        let taskList = folder.tasks
        for (let i=0; i<taskList.length; i++){
            if (taskList[i] === taskName) {
                taskList.splice(i,1)
                console.log(taskList)
            }
        }
        folder.save();
        res.send(folder)
    }
    catch (error) {
        res.send('Error')
    }
})

module.exports = router;