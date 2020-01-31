const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.geocode_api}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again 🥺', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].text,
                address: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode