const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherRouter = require('./routers/weather')

const app = express()
const port = process.env.PORT

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebar Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(weatherRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})