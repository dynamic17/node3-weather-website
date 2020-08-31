const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');
const message1 = document.querySelector('#message');
const message2 = document.querySelector('#errorMessage');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;
    message1.innerHTML = 'Loading...'
    message2.innerHTML = '';

    getWeather(location);
})

const getWeather = (location) =>{
    fetch('/weather?address='+location)
    .then((response) => {
        response.json().then((data)=>{
            if(data.error){
                message1.innerHTML = data.error;
            }
            else{
                message1.innerHTML = data.location;
                message2.innerHTML = JSON. stringify(data.forecast);
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });
}