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
                description : data.weather_descriptions[0],
                temperature : data.temperature,
                feelslike: data.feelslike
            })
        }

    })
};

module.exports = forecast;
// const url = 'http://api.weatherstack.com/current?access_key=80f1d1b564de8759925044d219173e53&query=51.517,-0.106';

// request({url : url,json:true },(err,res)=>{
//     if(err){
//         console.log('Unable to connect to weather service');
//     }else if(res.body.error){
//         console.log('Unable to find location');
//     }else{
//         const data = res.body.current;
//         console.log(data.weather_descriptions[0],'.It is currently',data.temperature,'degree out. It feels like ',data.feelslike,'degree out');
//     }
// })