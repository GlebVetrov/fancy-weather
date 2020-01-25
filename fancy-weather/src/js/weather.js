const proxy = 'https://cors-anywhere.herokuapp.com/';
let forecast;
const iconArray = {
    'clear-day': 'fa-sun',
    'clear-night': 'fa-moon',
    'rain': 'fa-cloud-showers-heavy',
    'snow': 'fa-cloud-meatball',
    'sleet': 'fa-cloud-sleet',
    'wind': 'fa-wind',
    'fog': 'fa-smog',
    'cloudy': 'fa-cloud',
    'partly-cloudy-day': 'fa-cloud-sun',
    'partly-cloudy-night': 'fa-cloud-moon'
   };

const toCelsius = (temperature) => {
    return Math.round((temperature-32)*5/9)+' &#8451;';
};

const getDay = (date) => {
    const weekEn = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return weekEn[date.getDay()];
};

const getMonth = (date) => {
    const month = ['January','February','March','April','May','June','July',
        'August','September','October','November','December'];
    return month[date.getMonth()];
};

const getDate = (date) => {
    return `${getDay(date)} ${date.getDate()} ${getMonth(date)}  ${date.getHours()}:${date.getMinutes()}`;
};

const setWeather = (obj) => {
    const { summary, temperatureMax, icon, time } = obj,
        forecastTag = document.createElement('div'),
        dayTag = document.createElement('p'),
        iconTag = document.createElement('i'),
        summaryTag = document.createElement('p'),
        temperature = document.createElement('h3');
    forecastTag.classList.add('forecast__item');
    iconTag.classList.add('fas');
    iconTag.classList.add(iconArray[icon]);
    temperature.classList.add('temperature-item');
    dayTag.innerHTML = getDay(new Date(time * 1000));
    summaryTag.innerHTML = summary;
    temperature.innerHTML = toCelsius(temperatureMax);
    forecastTag.appendChild(iconTag);
    forecastTag.appendChild(dayTag);
    forecastTag.appendChild(temperature);
    forecastTag.appendChild(summaryTag);
    forecast.appendChild(forecastTag);
};

const setCurrentWeather = (obj) => {
    const { summary, temperature, icon, apparentTemperature, windSpeed, humidity} = obj,
        date = document.querySelector('.date'),
        currentDate = document.createElement('div'),
        iconTag = document.createElement('i'),
        summaryTag = document.createElement('p'),
        overcast = document.createElement('p'),
        dateStr = document.createElement('h3'),
        temperatureTag = document.createElement('h2');
    iconTag.classList.add('fas');
    iconTag.classList.add(iconArray[icon]);
    temperatureTag.classList.add('temperature-item');
    dateStr.innerHTML = getDate(new Date());
    summaryTag.innerHTML = summary;
    overcast.innerHTML = `Feel likes: ${toCelsius(apparentTemperature)}, 
        Wind: ${Math.round(windSpeed)}m/s, Humidity: ${Math.round(humidity)}%`;
    temperatureTag.innerHTML = toCelsius(temperature);
    currentDate.appendChild(dateStr);
    currentDate.appendChild(iconTag);
    currentDate.appendChild(temperatureTag);
    currentDate.appendChild(overcast);
    currentDate.appendChild(summaryTag);
    date.appendChild(currentDate);
};

export default (cor) => {
    const corStr = [...cor];
    corStr.join(',')
    forecast = document.querySelector('.forecast');
    fetch(`${proxy}https://api.darksky.net/forecast/${process.env.DARKSKY_TOKEN}/${corStr}?lang=en`)
        .then(data => data.json())
        .then(obj => {
            const { currently, daily } = obj,
                { data } = daily,
                forecast = data.slice(0, 4);
            setCurrentWeather(currently);
            forecast.forEach(elem => setWeather(elem));
        });
};
