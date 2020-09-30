const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//express is a function, export that function
const express = require('express');
//store fuction into a new variable
const app = express()

const port = process.env.PORT || 3000


//define path for express config
const indexDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')


//setup handlebars engines and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPaths)


//setup static directory to serve
app.use(express.static(indexDirectory))

    app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather Application',
            name: 'Dawit Jabessa'
        })
    })
    

    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'DJ',
            name: 'Dawit Jabessa',
            age: '23'

        })
    })

    app.get('/help', (req, res) => {
        res.render('help', {
            title: 'Help',
            name: 'Dawit',
            help: 'Dawit Jabessa is going to help out',
            helpAge: '50'

        })
    })

    app.get('/weather', (req, res) => {

        if (!req.query.address) {
            return res.send({
                error: 'You must provide a valid location'
            })
        }

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                        return res.send({ error })
                    }
                        res.send({
                                forecast: forecastData,
                                location,
                                address: req.query.address
                        })
                  
                })
        })
    })

    

app.get('/product', (req, res) => {
    if (!req.query.search) {
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
        res.render('404',{
            title: 'Help',
            name:'Dawit',
            errorMessage: 'Help article not found',
        })
    })

    app.get('*', (req, res) => {
        res.render('404',{
            title: 'Error',
            name: 'Dawit',
            errorMessage: 'Page not found',
        })
    })

   
app.listen(port, () => {
    console.log('Server is Up and on port ' + port)
    })

