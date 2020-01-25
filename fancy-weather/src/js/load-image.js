export default (city) => {
    const searchUrl = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=${process.env.UNSPLASH_TOKEN}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            const body = document.body;
            const { urls } = data;
            const { full } = urls;
            body.style.backgroundImage = `url(${full})`;
        });
};
