const accessKey = "YOUR_ACCESS_KEY"; // Replace with your actual access key from weatherstack.com or some other weather API provider 

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const weatherInfo = document.getElementById("weatherInfo");

      if (!data.current) {
        weatherInfo.innerHTML = "<p>City not found.</p>";
        return;
      }

      const desc = data.current.weather_descriptions[0].toLowerCase();
      const tip = getWeatherTip(desc);
      const iconPath = getWeatherIcon(desc);

      weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${iconPath}" alt="Weather Icon" class="weather-img">
        <p><strong>${data.current.weather_descriptions[0]}</strong></p>
        <p>🌡 Temperature: ${data.current.temperature} °C</p>
        <p>🤒 Feels Like: ${data.current.feelslike} °C</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>🌬 Wind: ${data.current.wind_speed} km/h</p>
        <p>📡 Pressure: ${data.current.pressure} mb</p>
        <p>👁 Visibility: ${data.current.visibility} km</p>
        <p>🕓 Local Time: ${data.location.localtime}</p>
        <hr />
        <p class="tip"><strong>🌈 Tip:</strong> ${tip}</p>
      `;
    })
    .catch(() => {
      document.getElementById("weatherInfo").innerHTML = "<p>Error fetching data.</p>";
    });
}

function getWeatherTip(desc) {
  if (desc.includes("sunny") || desc.includes("clear")) return "☀️ It’s sunny! Don’t forget your sunglasses.";
  if (desc.includes("rain") || desc.includes("shower")) return "🌧 Carry an umbrella.";
  if (desc.includes("snow") || desc.includes("cold")) return "❄️ Stay warm and drive safely.";
  if (desc.includes("cloud") || desc.includes("overcast")) return "☁️ Cloudy skies ahead.";
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) return "🌫 Drive carefully in low visibility.";
  if (desc.includes("storm") || desc.includes("thunder")) return "⛈ Stay indoors during storms.";
  return "🌤 Have a great day!";
}

function getWeatherIcon(desc) {
  if (desc.includes("storm") || desc.includes("thunder")) return "Gifs/storm.gif";
  if (desc.includes("wind") || desc.includes("breeze")) return "Gifs/wind.gif";
  if (desc.includes("sunny") || desc.includes("clear")) return "Gifs/sun.gif";
  if (desc.includes("rain") || desc.includes("shower")) return "Gifs/rain.gif";
  if (desc.includes("snow") || desc.includes("cold")) return "Gifs/snow.gif";
  if (desc.includes("cloud") || desc.includes("overcast")) return "Gifs/clouds.gif";
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) return "Gifs/foggy.gif";
  return "Gifs/hot.gif";
}

