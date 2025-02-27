const searchForm = document.querySelector("#form-input");
const cityInput = document.querySelector(".input");
const container = document.querySelector(".container");

async function fetchData(lat, lon) {
    const url = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v2/informers?lat=${lat}&lon=${lon}&lang=ru_RU`;
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "X-Yandex-Weather-Key": "69f750fa-3fe5-4b9e-bdf6-7bcf061f70ab",
        },
    });
    const data = await resp.json().catch(function(err){
        console.log(err)
    })
    
    showData(data)
}

async function getLatLon(city) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=941680796b6f40a7ad7746584d3d8949`;
    const resp = await fetch(url);
    const data = await resp.json();
    const lat = data.features[0].properties.lat;
    const lon = data.features[0].properties.lon;
    fetchData(lat, lon);
}

searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    if (!cityInput.value) {
        return;
    }
    getLatLon(cityInput.value);
});


function showData(data){
    const icon = data.fact.icon
    const city = cityInput.value
    const temperature = data.fact.temp
    const condition = data.fact.condition
    const windSpeed = data.fact.wind_speed
    const humidity = data.fact.humidity
    const weather = document.querySelector('.weather')
    weather.classList.remove('none')
    const imgEl = document.querySelector('.icon')
    const tempEl = document.querySelector('.temp')
    const cityEl = document.querySelector('.city')
    const conditionEl = document.querySelector('.condition')
    const humidityEl = document.querySelector('.humidity')
    const windEl = document.querySelector('.wind')
    imgEl.src = `https://yastatic.net/weather/i/icons/funky/dark/${icon}.svg`
    tempEl.innerText = temperature + '°C'
    cityEl.innerText = city
    conditionEl.innerText = condition
    humidityEl.innerText = humidity
    windEl.innerHTML = windSpeed + 'м/с'
    
}
