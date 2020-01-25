export default () => {
    const currentDate = new Date();
    const tagDate = document.querySelector('.date');
    const stringDate = document.createTextNode(currentDate.toLocaleString());
    tagDate.appendChild(stringDate);
};
