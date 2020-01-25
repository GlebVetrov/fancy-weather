import { getCityName } from './location';
import loadImage from './load-image';
import coordinate from './coordinate';

export default () => {
    const refreshImgButton = document.querySelector('.refresh-img-button');
    refreshImgButton.addEventListener('click', () => {
        loadImage(getCityName());
    });

    const searchField = document.querySelector('.search-field');
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
        coordinate(searchField.value);
        searchField.value = '';
    });

    const changeTemp = (temp) => {
        const temperature = document.querySelectorAll('.temperature-item');
        temperature.forEach(elem => {
            const [num] = elem.innerHTML.split(' ');
            if(temp === 'far') {
                elem.innerHTML = Math.round(num * 9 / 5 + 32) + ' &#8457;';
            } else {
                elem.innerHTML = Math.round((num - 32) * 5 / 9) + ' &#8451;';
            }
        });
    };

    let temperature = 'cel';

    const farengateButton = document.querySelector('.temperature-far');
    const celsiusButton = document.querySelector('.temperature-cel');
    const swichActiveClass = () => {
        farengateButton.classList.toggle('temperature-active');
        celsiusButton.classList.toggle('temperature-active');
    };
    farengateButton.addEventListener('click', () => {
        if (temperature === 'far') {
            return;
        }
        swichActiveClass();
        temperature = 'far';
        changeTemp('far');
    });
    celsiusButton.addEventListener('click', () => {
        if (temperature === 'cel') {
            return;
        }
        swichActiveClass();
        temperature = 'cel';
        changeTemp('cel');
    });
};
