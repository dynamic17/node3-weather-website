const request = require('request');

const forecast = (latitude,longitude, callback) => {

    //get forcast
    const url = 'http://api.weatherstack.com/current?access_key=80f1d1b564de8759925044d219173e53&query='+latitude+','+longitude; 
 
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback('Unable to connect to weather service',undefined);
        }else if(body.error){
            console.log(body.error)
            callback('Unable to find location',undefined);
        }else{
            const data = body.current;
            callback(undefined,{
                description: 'It is ' + data.weather_descriptions[0] + ' and temperature currently is ' + data.temperature + 
                            ' degree. It feels like ' + data.feelslike + ' degree out. Humidity is '+data.humidity +'.'}
            )
        }

    })
};

module.exports = forecast;