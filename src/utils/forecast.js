const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c8babfae78d2e449a9524e80a9e236f4/' + lat + ',' + long
  
    request({url, json: true}, (error, {body}) => {
      if(error){
        callback('Unable to connect to weather services!', undefined)
      } else if (body.error === 0){
        callback('Unable to find location. Try another search.', undefined)
      } else {
        callback(undefined, 
                  body.daily.data[0].summary +
                  " It is currently " +
                  body.currently.temperature +
                  " degrees out. There is a " +
                  body.currently.precipProbability +
                  "% chance of rain."
        )
      }
    })
  }

module.exports = forecast