const request = require('postman-request');
const geocode = require('./geocode.js')

//I have refactored this slightly to use object destructuring/object property shorthand.

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=726984683abb096f67acfd8d99760171&query=${lat},${long}`;

    request({url, json: true}, (error, {body}) => {     //url prop has same name as url var, so I used object prop shorthand (url: url,  => url,)
        if (error) {                                            //Also destructured response as the only prop we need is the body prop,
            callback('Unable to reach weather API!', undefined);    //so response.body.current... => body.current...  etc.
        } else if (body.error) {
            callback('Unable to fetch weather data for this location, sorry!', undefined);
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
};

module.exports = forecast;

