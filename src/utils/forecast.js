const request = require('request')


const forcast = (a, b, callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=425df3a9fbb238ac9e65519d57424adf&query='+b+ ',' +a+'&units=f'
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to the weather service')
        } else if (body.error) {
            callback('unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] +
                '. it is currently '
                + body.current.temperature +
                 ' degrees out. it feels like ' + body.current.feelslike + 
                ' degrees out')
        }
    })
}

module.exports = forcast;