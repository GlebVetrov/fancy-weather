import {setLocation, runFunctions, setCityName} from './location';
import {initContent} from './common';

export default (city) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.CAGE_TOKEN}&pretty=1&no_annotations=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {results} = data;
            const [city] = results;
            const {geometry, components} = city;
            const {lat, lng} = geometry;
            const country = components['ISO_3166-1_alpha-2'];
            const { state } = components;
            setCityName(state);
            initContent(null, false);
            setLocation(country, state);
            runFunctions(null, [lat, lng], state);
         })
        .catch(() => alert('Wrong city'));
};
