const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9mdHkiLCJhIjoiY2t5YTJmbXh5MDFkeDJ1bGRsMzEwajgxMiJ9.U3ymkPfz7KQgZpIT8ZYenA&limit=1`
    
    request({url, json: true}, (error, {body}) => {   //url prop has same name as url var, so I used object prop shorthand (url: url,  => url,)
        if (error) {                                  //Also destructured response as the only prop we need is the body prop,
            callback('Unable to connect to location services!', undefined); //so response.body.current... => body.current...  etc.
        } else if (!body.hasOwnProperty('features') || body.features.length === 0) {
            callback('Unable to find location! Please try another search.', undefined)
        } else {
            let result = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            }
            callback(undefined, result)
        }
    })
}

module.exports = geocode;