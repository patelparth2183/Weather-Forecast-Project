const currentAPI = fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric');
const forcastAPI = fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9ecb754eb02dcfe338f6b2a0a123e5ff&units=metric')

async function calling() {
    try {
        const api = await forcastAPI;
        const result = api.json();
        console.log(result);
    } catch {
        console.log(error);
    }
}

calling();

//---------- DOM Selection ----------
//TEMPARATURE UNIT
const tempUnit = document.getElementsByClassName('tempUnit');

// SEARCH BOX
const citySearch = document.getElementById('citySearch');
const myLocation = document.getElementById('myLocation');
const recentSearches = document.getElementById('recentSearches');
const searchButton = document.getElementById('searchButton');
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