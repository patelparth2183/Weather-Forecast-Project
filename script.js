"use strict";
const APIKey = '9ecb754eb02dcfe338f6b2a0a123e5ff';
const baseURL = 'https://api.openweathermap.org/data/2.5';
const iconURL = 'https://openweathermap.org/img/wn';
const defaultCity = 'Mumbai';
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
const iconSnow = document.getElementById('iconSnow');
const currentWeather = document.getElementById('currentWeather');

// TODAY'S WEATHER CARD GRID
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const sunRise = document.getElementById('sunRise');
const sunSet = document.getElementById('sunSet');

// 5-DAY FORECAST
var forecastContainer = document.getElementById('forecastContainer');

let iconBg = document.getElementsByClassName('iconBg');
let sunnyDay = document.getElementsByClassName('sunnyDay');
let cloudyDay = document.getElementsByClassName('cloudyDay');
let rainyDay = document.getElementsByClassName('rainyDay');
let thunderDay = document.getElementsByClassName('thunderDay');
let snowDay = document.getElementsByClassName('snowDay');

// ---------- EVENT LISTENERS ----------

searchButton.addEventListener('click', function () {
	fetchWeatherByCity();
});

cityInput.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		fetchWeatherByCity();
	}
});

closeAlert.addEventListener('click', function () {
	hideAlert();
});

myLocation.addEventListener('click', function () {
	requestGeolocation();
});

// btnC.addEventListener('click', function () {
// 	toggleTemperature('metric');
// });

// btnF.addEventListener('click', function () {
// 	toggleTemperature('imperial');
// });

// recentSearches.addEventListener('click', function () {
// 	toggleDropdown();
// });

// document.addEventListener('click', function (e) {
// 	if (!recentWrapper.contains(e.target)) {
// 		closeDropdown();
// 	}
// });



// ---------- FETCH WEATHER BY CITY ----------
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
	.then((data) => {
		displayCurrentWeather(weatherData);
		displayForecast(data);
		// saveRecentSearch(weatherData.name);
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

// ---------- SHOW ERROR ----------
function showError(message) {
	errorMsg.classList.remove('hidden');
	errorMsg.textContent = message;
}

// ---------- HIDE ERROR ----------
function hideError() {
	errorMsg.classList.add('hidden');
}

// ---------- DISPLAY CURRENT WEATHER ----------
function displayCurrentWeather(data) {
	
	mainLocation.innerHTML = data.name + ', ' + data.sys.country;
	dateToday.innerHTML = formatedDate();
	mainTemp.innerHTML = Math.round(data.main.temp);
	currentWeather.innerHTML = data.weather[0].description;
	humidity.innerHTML = data.main.humidity + " %";
	windSpeed.innerHTML = Math.round(data.wind.speed) + " m/s";

	// Temperature Alert
	hideAlert();
	if (data.main.temp > 40) {
		exceedTemp.innerHTML = 40;
		showAlert()
	}

	// Icon changes with weather condition
	if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
		iconSunny.classList.remove('hidden');
		iconCloudy.classList.add('hidden');
		iconRainy.classList.add('hidden');
		iconThunder.classList.add('hidden');
		iconSnow.classList.add('hidden');
	} else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n' || data.weather[0].icon === '03d' || data.weather[0].icon === '03n' || data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
		iconSunny.classList.add('hidden');
		iconCloudy.classList.remove('hidden');
		iconRainy.classList.add('hidden');
		iconThunder.classList.add('hidden');
		iconSnow.classList.add('hidden');
	} else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n' || data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
		iconSunny.classList.add('hidden');
		iconCloudy.classList.add('hidden');
		iconRainy.classList.remove('hidden');
		iconThunder.classList.add('hidden');
		iconSnow.classList.add('hidden');
	} else if (data.weather[0].icon === '11d' || data.weather[0].icon === '11n') {
		iconSunny.classList.add('hidden');
		iconCloudy.classList.add('hidden');
		iconRainy.classList.add('hidden');
		iconThunder.classList.remove('hidden');
		iconSnow.classList.add('hidden');
	} else {
		iconSunny.classList.add('hidden');
		iconCloudy.classList.add('hidden');
		iconRainy.classList.add('hidden');
		iconThunder.classList.add('hidden');
		iconSnow.classList.remove('hidden');
	}
}

// ---------- DATE FORMAT ----------
function formatedDate() {
	let date = new Date();
	return date.toLocaleString('en-US', {
		weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
	});
}

// ---------- SHOW ALERT ----------
function showAlert() {
	alertBanner.classList.remove('hidden');
}

// ---------- HIDE ALERT ----------
function hideAlert() {
	alertBanner.classList.add('hidden');
}

// ---------- DISPLAY FORECAST ----------
function displayForecast(data) {
	forecastContainer.innerHTML = "";
	let daily = filterDailyForecast(data.list);
	for (let i = 0; i < daily.length; i++) {
		forecastContainer.appendChild(createForecastCard(daily[i]));
		
		// Icon changes with weather condition
		if (daily[i].weather[0].icon === '01d' || daily[i].weather[0].icon === '01n') {
			iconBg[i].classList.add('bg-amber-400/20');
			sunnyDay[i].classList.remove('hidden');
		} else if (daily[i].weather[0].icon === '02d' || daily[i].weather[0].icon === '02n' || daily[i].weather[0].icon === '03d' || daily[i].weather[0].icon === '03n' || daily[i].weather[0].icon === '04d' || daily[i].weather[0].icon === '04n') {
			iconBg[i].classList.add('bg-sky-400/20');
			cloudyDay[i].classList.remove('hidden');
		} else if (daily[i].weather[0].icon === '09d' || daily[i].weather[0].icon === '09n' || daily[i].weather[0].icon === '10d' || daily[i].weather[0].icon === '10n') {
			iconBg[i].classList.add('bg-slate-400/20');
			rainyDay[i].classList.remove('hidden');
		} else if (daily[i].weather[0].icon === '11d' || daily[i].weather[0].icon === '11n') {
			iconBg[i].classList.add('bg-violet-400/20');
			thunderDay[i].classList.remove('hidden');
		} else {
			iconBg[i].classList.add('bg-amber-400/20');
			snowDay[i].classList.remove('hidden');
		}
	}
}

function filterDailyForecast(list) {
	let seen = {};
	let daily = [];

	for (let i = 0; i < list.length; i++) {
		let date = new Date(list[i].dt * 1000);
		let day = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

		if (!seen[day]) {
			seen[day] = true;
			daily.push(list[i]);

			if(daily.length == 5) break;
		}
	}

	return daily;
}

// ---------- CREAT FORECAST CARDS ----------
function createForecastCard(item) {
	let date = new Date(item.dt * 1000);
	let weekday = date.toLocaleDateString('en-US', {weekday: 'short'});
	let today = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
	let tempC = item.main.temp;
	let weatherDescription = item.weather[0].description;
	let humidity = item.main.humidity;
	let wind = item.wind.speed;

	let card = document.createElement('div');
	card.className = 'bg-glass rounded-2xl p-3 lg:p-4 flex flex-col items-center gap-2 hover:bg-white/12 hover:-translate-y-1 transition-all duration-200';
	card.innerHTML = 
	'<p class="text-xs font-semibold text-white/50 uppercase tracking-wide">' + weekday + '</p>' +
	'<p class="text-xs text-white/35">' + today + '</p>' +
	'<div class="iconBg w-12 h-12 rounded-xl flex items-center justify-center my-1">' +
		'<div class="hidden sunnyDay">' +
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-amber-300"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>' +
		'</div>' +
		'<div class="hidden cloudyDay">' +
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-sky-300"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>' +
		'</div>' +
		'<div class="hidden rainyDay">' +
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-7 h-7 text-slate-300"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>' +
		'</div>' +
		'<div class="hidden thunderDay">' +
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-violet-300"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path><path d="m13 12-3 5h4l-3 5"></path></svg>' +
		'</div>' +
		'<div class="hidden snowDay">' +
			'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 fill-gray-200"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>' +
		'</div>' +
	'</div>' +
	'<div class="text-center">' +
		'<p class="text-xl font-bold">' + '<span class="tempC">' + Math.round(tempC) + '</span>'  + '°' + '</p>' +
		'<p class="text-xs text-white/50 mt-0.5 capitalize">' + weatherDescription + '</p>' +
	'</div>' +
	'<div class="w-full border-t border-white/10 pt-2 mt-1 space-y-1">' +
		'<div class="flex items-center justify-between text-xs text-white/50">' +
			'<span class="flex items-center gap-1">' + '<i class="fa-solid fa-droplet text-[12px] text-sky-400"></i>' + humidity + '%' + '</span>' +
			'<span class="flex items-center gap-1">' + '<i class="fa-solid fa-wind text-[12px] text-teal-400"></i>' + Math.round(wind) + 'km/h' + '</span>' +
		'</div>' +
	'</div>'

	return card;
}

function requestGeolocation() {
	navigator.geolocation.getCurrentPosition(
		function currentLocation(pos) {
			fetchWeatherByCoordinates(pos.coords.latitude, pos.coords.longitude);
		},
		function faildToLocate(err) {
			let msg = 'Location access denied';
			if(err.code === err.POSITION_UNAVAILABLE) {
				msg = 'Location information is unavailable.'
			};
			showError(msg);
		}
	);
}

function fetchWeatherByCoordinates(latitude, longitude) {
	let weatherUrl  = baseURL + '/weather?lat='  + latitude + '&lon=' + longitude + '&units=metric&appid=' + APIKey;
  	let forecastUrl = baseURL + '/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + APIKey;
	
	let weatherData;

	fetch(weatherUrl)
	.then(function (response){
		if(!response.ok) {
			return response.json().then((err) => {
				throw new Error(err.message || 'City not found');
			});
		}
		return response.json();
	})
	.then(function (data) {
		weatherData = data;
		return fetch(forecastUrl);
	})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		displayCurrentWeather(weatherData);
		displayForecast(data);
		// saveRecentSearch(weatherData.name);
	})
	.catch(function (err) {
		showError(err.message || 'Failed to retrieve location weather. Please try again.');
	})
}

function init() {
	fetchWeatherByCity(defaultCity);
}

init();