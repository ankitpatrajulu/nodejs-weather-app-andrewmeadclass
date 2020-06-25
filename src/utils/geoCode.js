const request = require('postman-request')

const geoCode = (location, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYW5raXRwYXRyYTE5OTYiLCJhIjoiY2tiaHh1MHliMDl4azJ0cGo4b2Y2eXZ1biJ9.ALZgl2dX7s8wpgwwai5oYQ&limit=1'

    request({ url: geocodeURL, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode