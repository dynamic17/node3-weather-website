const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Neha'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        helpText:'This is helptext',
        name:'Neha'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Neha'
    });
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({error: 'You must provide the address'});
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast : 'It is ' + forecastData.description + ' and temperature currently is ' + forecastData.temperature + 
                            ' degree. It feels like ' + forecastData.feelslike + ' degree out. Humidity is '+forecastData.humidity,
                location,
                address: req.query.address
            });
        });
    })
})

app.get('/products',(req,res) => {
    res.send({
        products : []
     });
})

app.get('/help/*',(req,res) => {
    res.render('404',{ 
        title:'404',
        errorMessage:'Help article not found.',
        name:'neha' 
    });
})

app.get('*',(req,res) => {
    res.render('404',{ 
        title:'404',
        errorMessage:'Sorry incorrect route! Please try again.',
        name:'neha'
    });
})

app.listen(port, ()=>{
    console.log("Server started on port",port);
});