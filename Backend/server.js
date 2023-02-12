require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./Routes/Tasks')
const userRoutes = require('./Routes/User')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)


//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & listening on port", process.env.PORT)
        })        
    })
    .catch((error) => {
        console.log(error)
    })


