const request = require('request');

const geoCoding = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZHluYW1pYzE3IiwiYSI6ImNrZHd1bDRibDJmcnoydG9kZ2l5azllNXAifQ.F5oJLbT-FcyTLa5mcadyoA&limit=1';

    request({url,json:true},(err,{body}) =>{
        if(err){
            callback('Unable to connect to geocoding service',undefined);
        }else if(body.features.length === 0){
            callback('Unable to connect to find place',undefined);
        }
        else{
            const data = body.features[0];
            callback(undefined,{
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            });
        }
    })
}

module.exports = geoCoding;