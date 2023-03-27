async function getPhotographers() {


    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json
    return photographers;
}


const mediaSection = document.querySelector(".photos-section");
const modalSection = document.querySelector(".contact_modal");

async function displayData(photographers, medias) {
    const photographeHeader = document.querySelector(".photographe-header");
    const urlAffiche = window.location.href;
    const recupeIdLien = recupereIdUrl(urlAffiche);
    const mediasId = medias.filter((mediaId) => mediaId.photographerId == recupeIdLien);
    const idPhotographe = photographers.find((photographe) => photographe.id == recupeIdLien);
    const photographerName = idPhotographe.name;

    let mediasIdLikes = [];
    mediasId.forEach((media)=>{mediasIdLikes.push(media.likes)});
    const likesPhotos = totalCompteurLikes(mediasIdLikes);

    new Array(idPhotographe).forEach((chaquePhotographe) => {
        const { name, id, tagline, city, country, price, portrait } = chaquePhotographe;
        const photographerBanniereModel = new PhotographerFactory(name, id, tagline, city, country, price, portrait);
        const userBanniereCardDOM = photographerBanniereModel.getUserBanniereCardDOM();
        photographeHeader.appendChild(userBanniereCardDOM);
        
        const etiquetteModel = new EtiquetteFactory(likesPhotos, price).etiquetteLikePrix();
        mediaSection.appendChild(etiquetteModel);

        const modalModel = new ModalContactFactory(name).formulaireContact();
        modalSection.appendChild(modalModel);
    }
    )
    
    SelectDeclencheTri(mediasId, photographerName);
}

function triage(trierMedias, photographerNameTransfert) {
    let photosEnveloppe = document.createElement("div");
    photosEnveloppe.setAttribute("class", "section__enveloppe");
    trierMedias.map((media, index, mediasParents) => {
        const { id, photographerId, title, image, video, likes, date, price } = media;
        const mediaModel = new MediaFactory(mediasParents, index, id, photographerNameTransfert, photographerId, title, image, video, likes, date, price);
        const mediaDom = mediaModel.getPhotoDOM();
        photosEnveloppe.appendChild(mediaDom);
        mediaSection.appendChild(photosEnveloppe);
    }
    )

}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
}

init();