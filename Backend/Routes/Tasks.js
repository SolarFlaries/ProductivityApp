const express = require('express')
const { createTask, getTask, getTasks, deleteTask, updateTask } = require('../Controllers/taskController')

const requireAuth = require('../Middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getTasks)

router.get('/:id', getTask)

router.post('/', createTask)

router.delete('/:id', deleteTask)

router.patch('/:id', updateTask)

module.exports = router