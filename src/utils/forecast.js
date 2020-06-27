const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f76ba8465189e71748f9e804ecd9a1e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the Weather Service',undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            const string = body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + ' degrees out. The wind speed is ' + body.current.wind_speed + ' and the chance for rain is ' + body.current.precip + ' %.'
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed,
                preceip: body.current.precip,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                icon: body.current.weather_icons,
                string: string
            })
        }
    })
}

module.exports = forecast