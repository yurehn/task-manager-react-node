const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.get('/', async (req, res) => {
    const task = await Task.find();
    res.json(task);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { title, description, priority } = req.body;
    const task = new Task({ title, priority, description })
    await task.save();
    res.json({ status: 200, message: 'Task Saved' });
});

router.put('/:id', async (req, res) => {
    const newTask = { title, priority, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: 200});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({status: 200});
});

module.exports = router;
