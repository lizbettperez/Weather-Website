const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const forecastTable = document.getElementById("forecastTable");
const forecastTableBody = forecastTable.querySelector("tbody");
const apiKey = "16a1232114165e8af050a61b3931e1d9";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            const forecastData = await getForecastData(city);
            displayForecastInfo(weatherData, forecastData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data. Please try again.");
        }
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error("Weather data not found");
    }
    
    return await response.json();
}

async function getForecastData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=imperial&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch forecast data");
    }
    return await response.json();
}

function displayForecastInfo(currentData, forecastData) {
    forecastTable.classList.remove("hidden");
    forecastTableBody.innerHTML = "";

    // Display current weather
    const { name: city } = currentData;
    const currentWeatherRow = document.createElement("tr");
    const currentDate = new Date().toLocaleDateString();
    currentWeatherRow.innerHTML = `
        <td colspan="5"><strong>5-Day Forecast for ${city}</strong></td>
    `;
    forecastTableBody.appendChild(currentWeatherRow);

    // Display 5-day forecast
    forecastData.list.forEach(day => {
        const { dt, main: { temp, humidity }, weather: [{ description, icon }] } = day;

        const date = new Date(dt * 1000).toLocaleDateString();
        const temperature = `${temp.toFixed(1)}°F`;
        const weatherIcon = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description} icon">`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${date}</td>
            <td>${temperature}</td>
            <td>${humidity}%</td>
            <td>${description}</td>
            <td>${weatherIcon}</td>
        `;
        forecastTableBody.appendChild(row);
    });
}

function displayError(message) {
    forecastTable.classList.add("hidden");
    forecastTableBody.innerHTML = "";

    const errorDisplay = document.createElement("p");
    errorDisplay.classList.add("errorDisplay");
    errorDisplay.textContent = message;

    forecastTable.parentNode.appendChild(errorDisplay);
    forecastTable.style.display = "none";
}
