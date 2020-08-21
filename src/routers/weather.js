const express = require('express')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geoCode')
const router = express.Router()

router.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AparnAnkit'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        name: 'Aparna',
        title: 'CEO RITUJULU'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!!!',
        name: 'Because I am new to NODEJS'
    })
})

router.get('/weather', (req,res) => {
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

router.get('/products', (req, res) => {
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

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help Article Not Found',
        name: 'RituJulu'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found',
        name: 'RituJulu'
    })
})

module.exports = router