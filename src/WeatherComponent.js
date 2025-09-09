import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('Toronto'); // Stores the input field value
  const [searchedCity, setSearchedCity] = useState('Toronto'); // Stores the searched city name
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  const apiKey = '9c53b55b800834e99ba64fa9405cedbc';

  const fetchWeatherData = (cityName) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      .then((response) => {
        setCurrentWeather({
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          maxTemp: response.data.main.temp_max,
          minTemp: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed
        });
        setError('');
      })
      .catch(() => {
        setError('City not found');
      });

    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
      .then((response) => {
        const dailyData = response.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        ).map((item) => ({
          day: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: `${Math.round(item.main.temp)}°C`,
          description: item.weather[0].description,
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          icon: item.weather[0].icon
        }));

        setForecastData(dailyData);
      })
      .catch(() => {
        setError('Error fetching forecast');
      });
  };

  // Fetch initial weather data for Toronto
  useEffect(() => {
    fetchWeatherData('Toronto');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Please enter a city');
      return;
    }
    setSearchedCity(city); // Update the searched city on form submission
    fetchWeatherData(city); // Fetch data for the inputted city
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Weather in {searchedCity}</h1> {/* Display the searched city */}
      {currentWeather && (
        <div className="text-center mb-4">
          <h2>{`${Math.round(currentWeather.temp)}°C`}</h2>
          <p>{currentWeather.description.charAt(0).toUpperCase() + currentWeather.description.slice(1)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.description}
          />
         <div className="weather-details">
  <p>Max Temp: 24°C</p>
  <p>Min Temp: 21°C</p>
  <p>Humidity: 78%</p>
  <p>Wind Speed: 0.89 kph</p>
</div>

        </div>
      )}

      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="justify-content-center">
          <Col xs={8} md={6}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)} // Updates the input field
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      {error && <p className="text-danger text-center">{error}</p>}

      <h3 className="text-center">5-Day Forecast</h3>
      <Row>
        {forecastData.map((day, index) => (
          <Col key={index} xs={12} md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{day.day}</Card.Title>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                />
                <Card.Text>Temp: {day.temp}</Card.Text>
                <Card.Text>Condition: {day.description}</Card.Text>
                <Card.Text>Max Temp: {Math.round(day.maxTemp)}°C</Card.Text>
                <Card.Text>Min Temp: {Math.round(day.minTemp)}°C</Card.Text>
                <Card.Text>Humidity: {day.humidity}%</Card.Text>
                <Card.Text>Wind Speed: {day.windSpeed} kph</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherApp;
