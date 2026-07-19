# Weather Forecast App
A fully responsive Weather Forecast Web Application built with HTML5, Tailwind CSS, and Vanilla JavaScript.


## Project Overview
Weather Forecast App delivers real-time weather conditions and a 5-day outlook for any city in the world, or your current GPS location. It features a dynamic backgrounds that change according to live weather conditions.


## Features
City Search - Search weather for any city worldwide
Geolocation - Auto-detect current location via browser GPS
Unit Toggle - Switch between °C and °F
5-Day Forecast - Daily cards with icon, temp, humidity & wind
Recent Searches - Saved in LocalStorage — max 5 cities
Dynamic Background - Background changes with weather condition
Weather Alerts - Extreme heat (>40°C) banners
Error Handling - Messages for all failure scenarios


## Technologies
HTML5 — Semantic markup
Tailwind CSS (CDN) — Utility-first styling, glassmorphism, responsive grid
Vanilla JavaScript — Fetch API, Geolocation API, LocalStorage
OpenWeatherMap API — Live weather + 5-day forecast data
Font Awesome 7.0.1 — Icons


## Folder Structure
weather-forecast-project
│── images/    ← custom images
│── src/
│     ├── input.css    ← Tailwind input CSS
│     ├── output.css     ← Output of Tailwind CSS
│── index.html       ← App Design and all UI sections
│── README.md        ← This file
│── script.js        ← All app logic, API calls, DOM manipulation


## Github Details
Github Link - https://github.com/patelparth2183/Weather-Forecast-Project.git


## API Setup
1. Visit [https://openweathermap.org/api] and create a free account.
2. Generate an API key from your dashboard.
3. Open `script.js` and replace the API key on line 2.

APIs used:
- `GET /data/2.5/weather` — Current weather
- `GET /data/2.5/forecast` — 5-day / 3-hour forecast

## How to Run
Simply open `index.html` in your browser:
Weather-Forecast-Project/index.html

## JavaScript Architecture
All logic lives in `script.js` and is organised into reusable functions:

- `fetchWeatherByCity()` - Fetch weather + forecast by city name
- `showError()` / `hideError()` - Control error notification
- `displayCurrentWeather()` - Populate current weather card
- `updateBackground()` - Apply dynamic background according to weather condition
- `formatDate()` - Format date
- `showAlert()` / `hideAlert()` - Control weather alert banner
- `displayForecast()` - Render 5-day forecast cards
- `filterDailyForecasts()` - Reduce 40 slots to 5 daily entries
- `createForecastCard()` - Build a single forecast card
- `requestGeolocation()` - Trigger browser GPS + error handling
- `fetchWeatherByCoordinates()` - Fetch weather + forecast by GPS coords
- `toggleTemperature()` - Switch °C ↔ °F without API call
- `saveRecentSearch()` - Save searched city to LocalStorage
- `loadRecentSearches()` - Read city history from LocalStorage
- `renderDropdown()` - Build recent-search dropdown UI
- `init()` - Execute on page load