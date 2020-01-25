import createMap from './map';
import weather from './weather';
import controls from './controls';
import loadImage from './load-image';
import fullNameCountry from './country';

let cityName;

export const getCityName = () => {
    return cityName;
};

export const setCityName = (name) => {
    cityName = name;
};

const setCoordinate = (cor) => {
    const [lon, lat] = cor;
    const coordinate = document.querySelector('.coordinate');
    const latitude = document.createElement('span');
    const longitude = document.createElement('span');
    latitude.innerHTML = `Longitude: ${lat}`;
    longitude.innerHTML = `Latitude: ${lon}`;
    latitude.classList.add('coordinate__item');
    longitude.classList.add('coordinate__item');
    coordinate.appendChild(latitude);
    coordinate.appendChild(longitude);
};

export const runFunctions = (city, locArray) => {
    loadImage(city);
    setCoordinate(locArray);
    weather(locArray);
    controls();
    createMap(locArray);
};

export const setLocation = (country, city) => {
    const location = document.querySelector('.city-title');
    location.innerHTML = `${fullNameCountry[country]}, ${city}`;
};

export const init = () => {
    fetch(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            const { city, country, loc } = data;
            cityName = city;
            const locArray = loc.split(',');
            setLocation(country, city);
            runFunctions(city, locArray);
        });
};
