async function getPhotographers() {


    let photographersJson = await fetch("./data/photographers.json"); //lecture du lien json
    let photographers = await photographersJson.json(); //promet un objet json
    console.log("json base", photographers);
    return photographers;
}

async function displayData(photographers, medias) {
    const photographersSection = document.querySelector(".photographer-section");
    const photographeHeader = document.querySelector(".photographe-header");
    const mediaSection = document.querySelector(".photos-section");

    const urlAffiche = window.location.href;
    const recupeIdLien = recupereIdUrl(urlAffiche);
    console.log("urlAffiche", urlAffiche);

    if (!recupereIdUrl(urlAffiche)) {
        photographers.forEach((photographer) => {
            const { name, id, tagline, city, country, price, portrait } = photographer;
            console.log("description", name, id, tagline, city, country, price, portrait);
            const photographerModel = new PhotographerFactory(name, id, tagline, city, country, price, portrait);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
    else {
        const idPhotographe = photographers.find((photographe) => photographe.id == recupeIdLien);
        console.log("idPhotographe", idPhotographe);
        new Array(idPhotographe).forEach((unPhotographe) => {
            const { name, id, tagline, city, country, price, portrait } = unPhotographe;
            const photographerBanniereModel = new PhotographerFactory(name, id, tagline, city, country, price, portrait);
            const userBanniereCardDOM = photographerBanniereModel.getUserBanniereCardDOM();
            photographeHeader.appendChild(userBanniereCardDOM);
        }
        )

        const idUrl = recupereImageUrl(urlAffiche);
        console.log("id url", idUrl);

        const mediasId = medias.filter((mediaId) => mediaId.photographerId == recupeIdLien);
        const photographerName = idPhotographe.name;
        console.log("mediaId", mediasId);
        MediaDeclencheTri(mediasId);

        function triage(trierMedias) {
            let photosEnveloppe = document.createElement("div");
            photosEnveloppe.setAttribute("class", "section__enveloppe");
            trierMedias.map((media, index, mediasParents) => {
                const { id, photographerId, title, image, video, likes, date, price } = media;
                const mediaModel = new MediaFactory(mediasParents, index, id, photographerName, photographerId, title, image, video, likes, date, price);
                const mediaDom = mediaModel.getPhotoDOM();
                photosEnveloppe.appendChild(mediaDom);
                mediaSection.appendChild(photosEnveloppe);

            }
            )

        }

        function MediaDeclencheTri(mediasaTrier) {

            let resultatTrie = new Tri(mediasaTrier).likeDecroissant();
            triage(resultatTrie);
            let selectOption = document.querySelector('#select-tri');

            selectOption.addEventListener("change", (resultatTrie) => {
                if (selectOption.options[0].selected === true) {
                    if (document.querySelector('div.section__enveloppe') !== null) {
                        document.querySelector('div.section__enveloppe').remove();
                    } resultatTrie = new Tri(mediasaTrier).likeDecroissant(); triage(resultatTrie);
                }
            });

            selectOption.addEventListener("change", (resultatTrie) => {
                if (selectOption.options[1].selected === true) {
                    if (document.querySelector('div.section__enveloppe') !== null) {
                        document.querySelector('div.section__enveloppe').remove();
                    } resultatTrie = new Tri(mediasaTrier).dateDecroissant(), triage(resultatTrie);
                }
            });
            selectOption.addEventListener("change", (resultatTrie) => {
                if (selectOption.options[2].selected === true) {
                    if (document.querySelector('div.section__enveloppe') !== null) {
                        document.querySelector('div.section__enveloppe').remove();
                    } resultatTrie = new Tri(mediasaTrier).alphabetiqueCroissant(), triage(resultatTrie);
                }
            });
        }




    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
}

init();