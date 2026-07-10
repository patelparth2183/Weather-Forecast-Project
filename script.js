const currentAPI = fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric');
const forcastAPI = fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric');

// currentAPI
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
//     console.log(data.main.temp);
//     console.log(data.main.humidity);
//     console.log(data.wind.speed);
//     console.log(data.weather[0].description);
//     console.log(data.weather[0].icon);
//     console.log("Break");
// });


// forcastAPI
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
//     console.log(data.cod);
//     console.log(data.list[0]);
// });

//---------- DOM Selection ----------
//TEMPARATURE UNIT
const tempUnit = document.getElementsByClassName('tempUnit');

// SEARCH BOX
const cityInput = document.getElementById('cityInput');
const myLocation = document.getElementById('myLocation');
const recentSearches = document.getElementById('recentSearches');
const searchButton = document.getElementById('searchButton');
const errorMsg = document.getElementById('errorMsg');
const btnC = document.getElementById('btnC');
const btnf = document.getElementById('btnf');

// WEATHER ALERT
const exceedTemp = document.getElementById('exceedTemp');
const closeAlert = document.getElementById('closeAlert');

// TODAY'S WEATHER CARD
const mainLocation = document.getElementById('mainLocation');
const dateToday = document.getElementById('dateToday');
const mainWeatherIcon = document.getElementById('mainWeatherIcon');
const iconSunny = document.getElementById('iconSunny');
const iconCloudy = document.getElementById('iconCloudy');
const iconRainy = document.getElementById('iconRainy');
const iconThunder = document.getElementById('iconThunder');
const mainTemp = document.getElementById('mainTemp');
const currentWeather = document.getElementById('currentWeather');

// TODAY'S WEATHER CARD GRID
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const sunRise = document.getElementById('sunRise');
const sunSet = document.getElementById('sunSet');

// 5-DAY FORECAST
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



// Search City
searchButton.addEventListener('click', validateSearch);

function validateSearch() {
    const city = cityInput.value.trim();
    errorMsg.textContent = "";
    if (city === "") {
        errorMsg.style = 'display: block;';
        errorMsg.innerHTML = "Please enter a city.";
        return
    }

    const cityRegex = /^[A-Za-z\s]+$/;

    if (!cityRegex.test(city)) {
        errorMsg.innerHTML = "Enter a valid city name.";
        return;
    }
    console.log(city);
}