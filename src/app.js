const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dakota Dunn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dakota Dunn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dakota Dunn',
        message: 'Welcome to the Help section content. Let us know how we can assist you.'
    })
})

app.get('/weather', (req, res) => {
    
    const address = req.query.address;
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } else{
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
              if (error) {
                return console.log(error);
              }
              res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            });
        });
    }    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Dakota Dunn',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Dakota Dunn',
        errorMessage: 'Ya shit broke.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})