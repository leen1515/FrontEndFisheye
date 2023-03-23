async function getPhotographers() {


    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json
    return photographers;
}


const mediaSection = document.querySelector(".photos-section");

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const { name, id, tagline, city, country, price, portrait } = photographer;
        const photographerModel = new PhotographerFactory(name, id, tagline, city, country, price, portrait);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();