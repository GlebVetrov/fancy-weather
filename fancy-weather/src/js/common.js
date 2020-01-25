import {init} from './location';

export const initContent = ( eo, custom = true ) => {
    const body = document.body,
        header = document.createElement('header'),
        refreshButton = document.createElement('button'),
        refreshButtonIcon = document.createElement('i'),
        controlPanel = document.createElement('div'),
        searchPanel = document.createElement('div'),
        farAndCel = document.createElement('div'),
        celButton = document.createElement('button'),
        farButton = document.createElement('button'),
        searchField = document.createElement('input'),
        searchButton = document.createElement('button'),
        searchIconButton = document.createElement('i'),
        main = document.createElement('main'),
        cityTitle = document.createElement('h2'),
        date = document.createElement('div'),
        row = document.createElement('div'),
        forecast = document.createElement('div'),
        location = document.createElement('div'),
        mapContainer = document.createElement('div'),
        map = document.createElement('div'),
        coordinateTag = document.createElement('div');
    body.innerHTML = '';
    header.classList.add('header');
    refreshButtonIcon.classList.add('fas', 'fa-sync');
    refreshButton.classList.add('refresh-img-button');
    refreshButton.appendChild(refreshButtonIcon);
    controlPanel.classList.add('control-panel');
    searchPanel.classList.add('search-panel');
    searchIconButton.classList.add('fas', 'fa-search');
    searchButton.appendChild(searchIconButton);
    searchButton.classList.add('search-button');
    searchField.classList.add('search-field');
    farAndCel.classList.add('temperature-wrapper');
    celButton.classList.add('temperature-cel', 'temperature-active');
    farButton.classList.add('temperature-far');
    celButton.innerHTML = '&#8451;';
    farButton.innerHTML = '&#8457;';
    farAndCel.appendChild(celButton);
    farAndCel.appendChild(farButton);
    searchPanel.appendChild(searchField);
    searchPanel.appendChild(searchButton);
    controlPanel.appendChild(refreshButton);
    header.appendChild(controlPanel);
    header.appendChild(farAndCel);
    header.appendChild(searchPanel);
    body.appendChild(header);
    main.classList.add('main');
    cityTitle.classList.add('city-title');
    date.classList.add('date');
    row.classList.add('row');
    forecast.classList.add('forecast');
    location.classList.add('location');
    coordinateTag.classList.add('coordinate');
    map.id = 'map';
    map.style.width = '100%';
    main.appendChild(cityTitle);
    main.appendChild(date);
    main.appendChild(row);
    row.appendChild(forecast);
    row.appendChild(location);
    mapContainer.appendChild(map);
    mapContainer.classList.add('map-container');
    location.appendChild(mapContainer);
    location.appendChild(coordinateTag);
    body.appendChild(main);
    if (custom) {
        init();
    }
};

document.addEventListener('DOMContentLoaded', initContent);
