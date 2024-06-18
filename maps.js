const apiKey = "16a1232114165e8af050a61b3931e1d9";
let map = L.map('map').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Weather data © OpenWeatherMap'
}).addTo(map);

let tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Weather data © OpenWeatherMap'
});

let windLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Weather data © OpenWeatherMap'
});

let baseLayers = {
    "Precipitation": precipitationLayer,
    "Temperature": tempLayer,
    "Wind": windLayer
};

L.control.layers(baseLayers).addTo(map);