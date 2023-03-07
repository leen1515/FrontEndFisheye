
//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {


    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json

    return photographers;
}

//ajout de l'argument media pour recuperer les photos respectives de chaque photographe
async function displayData(photographers, media) {
    const photosSection = document.querySelector(".photos_section");
    const photographeHeader = document.querySelector(".photograph-header");
    const id = isoleIdUrl(urlLien);
    const photoId = media.filter(photoRetour => photoRetour.photographerId === parseInt(id));//retourne une liste d'un tableau qui répond à la comparaison
    
    photoId.forEach((photo) => {
        const photographerName = photographers.find(photographer => photographer.id === parseInt(id));//retourne le premier resultat qui correspond à la comparaison
        const photoModel = photoFactory(photo, photographerName);
        const photoCardDOM = photoModel.getPhotoCardDOM();
        photosSection.appendChild(photoCardDOM);

    });

    const photographerId = photographers.filter(photographerId => photographerId.id === parseInt(id))
    photographerId.forEach((photographe)=>{
        console.log(photographe);
        const photoModel = photographeCarteFactory(photographe);
        const photoCardDOM = photoModel.getPhotoUserCardDOM();
        photographeHeader.appendChild(photoCardDOM);

    })



}


async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers(); //recupere en plus la partie media

    displayData(photographers, media); //retourne la partie photographers et media du tableau json
}

init();

const urlLien = window.location.href;

console.log(isoleIdUrl(urlLien));


function isoleIdUrl(urlLien) {
    var i;
    var urlId = "";
    for (i = urlLien.length - 1; i > -1; i--) {
        if (urlLien.charAt(i - 1) == "?")
            break;
    }
    urlId = urlLien.substring(i,);
    return (urlId);
}





