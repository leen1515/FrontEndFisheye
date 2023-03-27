const urlLien = window.location.href;

function urlImageMiniature(imageM) {
    let i;
    let tmp = "";
    for (i = imageM.length - 1; i > -1; i--) {
        if (imageM.charAt(i) == ".")
            break;
    }
    tmp = imageM.substring(0, i);
    return tmp;
}

function recupereIdUrl(urlLien) {
    const url = new URL(urlLien);
    if (new URLSearchParams(url.search)) {
        let idUrl = url.searchParams.get("id");
        return idUrl;
    }
    else {
        return false;
    }
}

function garderPrenom(name) {
    let i;
    let tmp = "";
    for (i = name.length - 1; i > -1; i--) {
        if (name.charAt(i) == " ")
            break;
    }
    tmp = name.substring(0, i);
    return (tmp);
}

function verificationExtension(fichier) {
    const verif = new RegExp("/.mp4$");
    if (verif.test(fichier)) {
        return true;
    }
    else {
        return false;
    };
}

function remplaceVideoImage(video, image) {
    if (video) {
        return video;
    }
    else {
        return image;
    }
}

function conserverMiniatureVideo(video, image, imageMiniature) {
    if (video) {
        return imageMiniature;
    }
    else {
        return image;
    }
}

function chargePromise(source, filtreLien) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(source);
            reject(`${filtreLien}_m.jpg`);}, 4000)
    });
}
function chargement(photo, source, filtreLien, classNom) {
    photo.setAttribute("src", `${filtreLien}_m.jpg`);
    console.log("photo en attente", photo);
       chargePromise(source, filtreLien).then(result => {
            photo.setAttribute("src", source);
            photo.className = classNom;
            console.log("photo charge", photo);
        return result;
     }).catch(error => {
        photo.setAttribute("src", `${filtreLien}_m.jpg`);
        console.log("photo pas charge", photo);
       return error
     });     
}

function gaucheRecule(indexMouvementModifie, mediasParents) {
    ((indexMouvementModifie > 0) ? indexMouvementModifie-- : indexMouvementModifie = mediasParents.length - 1);
    return indexMouvementModifie;
}

function droiteAvance(indexMouvementModifie, mediasParents) {
    ((indexMouvementModifie < mediasParents.length - 1) ? indexMouvementModifie++ : indexMouvementModifie = 0);
    return indexMouvementModifie;
}

function recupereImageUrl(urlImage) {
    const url = new URL(urlImage);
    let idUrl = "";
    if (new URLSearchParams(url.search)) {
        idUrl = url.searchParams.get("image");
    }
    else {
        idUrl = 0;
    }
    return idUrl;
}

function installerParamId(uriImage, paramId, valeurId) {
    const uri = new URLSearchParams(uriImage.search);
    if (uri) { uri.set(paramId, valeurId); }
}

function totalCompteurLikes(likes){
    let totalLikes = 0;
    likes.forEach((like)=>{totalLikes += like});
    return totalLikes;
}


function displayModal() {
    let modalInvisible = document.querySelectorAll(".modal-contact-section--invisible");
    modalInvisible.forEach((element)=>element.className = "modal-contact-section");
}


function closeModal() {
    let modalVisible = document.querySelectorAll(".modal-contact-section");
    modalVisible.forEach((element)=>element.className = "modal-contact-section--invisible");
}


function installerAttribute(element, attribut){
    for(let key in attribut) {
        element.setAttribute(key, attribut[key]);}
}