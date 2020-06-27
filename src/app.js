const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geoCode')

const app = express()
const port = process.env.PORT || 3000

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AparnAnkit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Aparna',
        title: 'CEO RITUJULU'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!!!',
        name: 'Because I am new to NODEJS'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You have not provided any address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {feelslike, humidity, icon, string}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: string,
                humidity,
                feelslike,
                icon,
                query: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help Article Not Found',
        name: 'RituJulu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found',
        name: 'RituJulu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})