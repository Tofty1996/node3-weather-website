const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

const app = express()

app.set('view engine', 'hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: `How's the weather out?`,
        subtitle: 'Created by Jordan Toft',
        name: 'Jordan Toft'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        subtitle: "I'm Jordan Toft btw...",
        name: 'Jordan Toft'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help! I need somebody...',
        helpText: "How can we help you?",
        name: 'Jordan Toft'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error: 'No address provided!'})
    }

    geocode(req.query.address, (error, {longitude, latitude, placeName} = {}) => {
        if (error) {
            return res.send({error})
        } else {

            forecast(longitude, latitude, (error, {temperature, feelsLike, weather} = {}) => {
                if (error) {
                    return res.send({error})
                } else {

                    return res.send({
                        address: req.query.address,
                        location: placeName,
                        weather,
                        temperature,
                        feelsLike
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This help article does not exist.',
        name: 'Jordan Toft'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Jordan Toft'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})