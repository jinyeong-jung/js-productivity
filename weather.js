const weatherContainer = document.querySelector(".js-weather");

const API_KEY = "e4b0f6207cd091f8614b4500c63f3a7d";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = Math.ceil(json.main.temp);
        const place = json.name;
        weatherContainer.innerText = `${temperature}°C @${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErr() {
    console.log("cannot access your location data")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        parsedCoords = JSON.parse(loadedCoords);
        const latitude = parsedCoords.latitude;
        const longitude = parsedCoords.longitude;
        getWeather(latitude, longitude);
    }
}

function init() {
    loadCoords();
}

init();