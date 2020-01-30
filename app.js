const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
dotenv.config({ path: './config.env' })

app.get('/', (req, res) => {
    res.render('index', {
        weather: null,
        error: null
    })
})
  
app.post('/', (req, res) => {
    let location = req.body.location

    geocode(location, (err, { lat, lng, location, city } = {}) => {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Oops, please try again.'
            })
        } else {
            forecast(lat, lng, (err, forecastData) => {
                if (err) {
                    res.render('index', {
                        weather: null,
                        error: 'Oops, please try again.'
                    })
                } else {
                    res.render('index', {
                        city,
                        location,
                        weather: forecastData.summary,
                        error: null
                    })
                }
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server has started.')
})