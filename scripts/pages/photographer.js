
//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
 

    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json

    return photographers;
}

//ajout de l'argument media pour recuperer les photos respectives de chaque photographe
async function displayData(photographers, media) {
    const photosSection = document.querySelector(".photos_section");

    media.forEach((photo) => {
        const photographerName = photographers.find(photographer => photographer.id === photo.photographerId);
        const photoModel = photoFactory(photo, photographerName);
        const photoCardDOM = photoModel.getPhotoCardDOM();
        photosSection.appendChild(photoCardDOM);

     

    });



}


var pathname = window.location.href;
console.log(pathname);



async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(); //recupere en plus la partie media

    displayData(photographers, media); //retourne la partie photographers et media du tableau json
}

init();