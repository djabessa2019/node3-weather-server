const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGF3aXRqYWJlc3NhIiwiYSI6ImNrZjhtYXdxaTBkaDQyeXJxZXR6OGFqODAifQ.ij5frK_BIzG6ue0e-Y5xOQ&limit=1'


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location Service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location try another service', undefined)
        } else {
            callback(undefined, {
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })

        }
    })

}
module.exports = geoCode
