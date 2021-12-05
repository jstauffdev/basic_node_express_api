const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Create express app
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Import Routes
const todo = require('./Routes/todo')

// Connect Routes to url
app.use('/api/todo', todo)

// Set port
const port = process.env.PORT || 5000
// Open server listener
app.listen(port, () => console.log(`Server started on port ${port}`))
