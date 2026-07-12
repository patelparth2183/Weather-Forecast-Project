"use strict";
const APIKey = '9ecb754eb02dcfe338f6b2a0a123e5ff';
const baseURL = 'https://api.openweathermap.org/data/2.5';
const currentAPI = fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric').then((response) => response.json());
const forcastAPI = fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric').then((response) => response.json());

currentAPI.then((data)=>console.log(data));
forcastAPI.then((data)=>console.log(data));

//---------- DOM Selection ----------
//TEMPARATURE UNIT
const tempUnit = document.getElementsByClassName('tempUnit');

// SEARCH BOX
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const myLocation = document.getElementById('myLocation');
const btnC = document.getElementById('btnC');
const btnF = document.getElementById('btnF');
const recentWrapper = document.getElementById('recentWrapper');
const recentSearches = document.getElementById('recentSearches');
const recentDropdown = document.getElementById('recentDropdown');
const recentIcon = document.getElementById('recentIcon');
const errorMsg = document.getElementById('errorMsg');

// WEATHER ALERT
const alertBanner = document.getElementById('alertBanner');
const exceedTemp = document.getElementById('exceedTemp');
const closeAlert = document.getElementById('closeAlert');

// TODAY'S WEATHER CARD
const mainTemp = document.getElementById('mainTemp');
const mainLocation = document.getElementById('mainLocation');
const dateToday = document.getElementById('dateToday');
const mainWeatherIcon = document.getElementById('mainWeatherIcon');
const iconSunny = document.getElementById('iconSunny');
const iconCloudy = document.getElementById('iconCloudy');
const iconRainy = document.getElementById('iconRainy');
const iconThunder = document.getElementById('iconThunder');
const currentWeather = document.getElementById('currentWeather');

// TODAY'S WEATHER CARD GRID
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const sunRise = document.getElementById('sunRise');
const sunSet = document.getElementById('sunSet');

// 5-DAY FORECAST
var forecastContainer = document.getElementById('forecastContainer');

// (Day 1)
const dayOneDay = document.getElementById('dayOneDay');
const dayOneDate = document.getElementById('dayOneDate');
const dayOneIcon = document.getElementById('dayOneIcon');
const dayOneTemp = document.getElementById('dayOneTemp');
const dayOneWeather = document.getElementById('dayOneWeather');
const dayOneHumidity = document.getElementById('DayOneHumidity');
const dayOneWind = document.getElementById('dayOneWind');

// (Day 2)
const dayTwoDay = document.getElementById('dayTwoDay');
const dayTwoDate = document.getElementById('dayTwoDate');
const dayTwoIcon = document.getElementById('dayTwoIcon');
const dayTwoTemp = document.getElementById('dayTwoTemp');
const dayTwoWeather = document.getElementById('dayTwoWeather');
const dayTwoHumidity = document.getElementById('DayTwoHumidity');
const dayTwoWind = document.getElementById('dayTwoWind');

// (Day 3)
const dayThreeDay = document.getElementById('dayThreeDay');
const dayThreeDate = document.getElementById('dayThreeDate');
const dayThreeIcon = document.getElementById('dayThreeIcon');
const dayThreeTemp = document.getElementById('dayThreeTemp');
const dayThreeWeather = document.getElementById('dayThreeWeather');
const dayThreeHumidity = document.getElementById('DayThreeHumidity');
const dayThreeWind = document.getElementById('dayThreeWind');

// (Day 4)
const dayFourDay = document.getElementById('dayFourDay');
const dayFourDate = document.getElementById('dayFourDate');
const dayFourIcon = document.getElementById('dayFourIcon');
const dayFourTemp = document.getElementById('dayFourTemp');
const dayFourWeather = document.getElementById('dayFourWeather');
const dayFourHumidity = document.getElementById('DayFourHumidity');
const dayFourWind = document.getElementById('dayFourWind');

// (Day 5)
const dayFiveDay = document.getElementById('dayFiveDay');
const dayFiveDate = document.getElementById('dayFiveDate');
const dayFiveIcon = document.getElementById('dayFiveIcon');
const dayFiveTemp = document.getElementById('dayFiveTemp');
const dayFiveWeather = document.getElementById('dayFiveWeather');
const dayFiveHumidity = document.getElementById('DayFiveHumidity');
const dayFiveWind = document.getElementById('dayFiveWind');


const defaultCity = 'Mumbai';

// --- EVENT LISTENERS ---

searchButton.addEventListener('click', function () {
	fetchWeatherByCity();
});

cityInput.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		fetchWeatherByCity();
	}
});


// FETCH WEATHER BY CITY

function fetchWeatherByCity(addedCity) {
	let city;
	if (addedCity) {
		city = addedCity.trim();
	} else {
		city = cityInput.value.trim();
	}

	if (!city) {
		showError('Please enter a valid city name.');
		return;
	}

	let weatherUrl  = baseURL + '/weather?q='  + encodeURIComponent(city) + '&units=metric&appid=' + APIKey;
  	let forecastUrl = baseURL + '/forecast?q=' + encodeURIComponent(city) + '&units=metric&appid=' + APIKey;

	let weatherData;

	fetch(weatherUrl)
	.then((response) => {
		if(!response.ok) {
			return response.json().then((err) => {
				throw new Error(err.message || 'City not found');
			});
		}
		return response.json();
	})
	.then((data) => {
		weatherData = data;
		return fetch(forecastUrl);
	})
	.then((response) => {
		if(!response.ok) {
			return response.json().then((err) => {
				throw new Error(err.message || 'Forecast not found');
			});
		}
		return response.json();
	})
	.then((forecastDataResult) => {
		displayCurrentWeather(weatherData);
		displayForecast(forecastDataResult);
		saveRecentSearch(weatherData.name);
	})
	.catch((err) => {
		const msg = err.message.toLowerCase()
		if (msg.indexOf('city not found') !== -1 || msg.indexOf('404') !== -1) {
			showError('City not found. Please check the spelling and try again');
		} else if (msg.indexOf('404') !== -1 || msg.indexOf('invalid api key') !== -1) {
			showError('Invalid API key. Please configure a valid API key.');
		} else if (msg.indexOf('failed to fetch') !== -1 || msg.indexOf('networkerror') !== -1) {
			showError('Network error. Please check your internet connection and try again.');
		} else {
			showError(err.message || 'An unexpected error occurred. Please try again.');
		}
	})

	hideError();
}

// SHOW ERROR
function showError(message) {
	errorMsg.classList.remove('hidden');
	errorMsg.textContent = message;
}

function hideError() {
	errorMsg.classList.add('hidden');
}