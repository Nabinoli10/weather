import React from 'react';
import WeatherComponent from './WeatherComponent';
import './App.css';

const weatherData = {
  "coord": { "lon": -89.1028, "lat": 30.438 },
  "weather": [{
    "id": 803,
    "main": "Clouds",
    "description": "broken clouds",
    "icon": "04d"
  }],
  "base": "stations",
  "main": {
    "temp": 82.15,
    "feels_like": 87.66,
    "temp_min": 81.95,
    "temp_max": 82.4,
    "pressure": 1012,
    "humidity": 74,
    "sea_level": 1012,
    "grnd_level": 1010
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.44,
    "deg": 230
  },
  "clouds": { "all": 75 },
  "dt": 1726600374,
  "sys": {
    "type": 2,
    "id": 2015175,
    "country": "US",
    "sunrise": 1726573336,
    "sunset": 1726617561
  },
  "timezone": -18000,
  "id": 4429197,
  "name": "Toronto",
  "cod": 200
};

function App() {
  return (
    <div className="App">
      <WeatherComponent weatherData={weatherData} />
    </div>
  );
}

export default App;
