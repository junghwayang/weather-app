const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/593b39e34bf77bc611391465598b5ddc/${lat},${lng}?units=si`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                weather: `${body.daily.data[0].summary} It's ${body.currently.temperature}℃ and there is a ${body.currently.precipProbability * 100}% chance of rain.`
            })
        }
    })
}

module.exports = forecast