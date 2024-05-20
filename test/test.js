// script.js

document.getElementById('get-weather').addEventListener('click', function() {
  const city = document.getElementById('city-input').value;
  if (city) {
      getWeather(city);
  }
});

async function getWeather(city) {
  const apiKey = 'YOUR_API_KEY'; // 替换为你的API密钥
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      updateWeather(data);
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

function updateWeather(data) {
  if (data.cod === 200) {
      document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('temperature').textContent = `${data.main.temp}°C`;
      document.getElementById('description').textContent = data.weather[0].description;

      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById('icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
  } else {
      alert('City not found');
  }
}