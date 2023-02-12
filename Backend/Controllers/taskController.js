const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get task
const getTasks = async (req, res) => {
    const user_id = req.user._id

    const tasks = await Task.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(tasks)
}

// get single task
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: 'Task not found'})
    }

    res.status(200).json(task)
}


// create task
const createTask = async (req, res) => {
    const {title, description, priority} = req.body

    try {
        const user_id = req.user._id
        const task = await Task.create({title, description, priority, user_id})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: 'Task not found'})
    }
    
    res.status(200).json(task)
}

// update task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Task not found'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(404).json({error: 'Task not found'})
    }
    
    res.status(200).json(task)

}


module.exports ={
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}