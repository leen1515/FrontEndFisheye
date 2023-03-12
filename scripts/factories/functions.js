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

function chargement(img) {
    console.log("charge", "img");
    setTimeout(() => { img.setAttribute("src", img.getAttribute("data-src"), img.removeAttribute("data-src")) }, 2000);
}

function interactionPresenceLight(image) {
    

}


// function boutonGaucheDroite(indexMouvement, mediasParents) {
//     let indexMouvementModifie = indexMouvement;
//     let gauche = document.querySelector("#idGauche");
//     let droite = document.querySelector("#idDroite");
//     console.log("gauche", gauche);
    
//     gauche.addEventListener("click", () => { indexMouvementModifie = gaucheRecule(indexMouvementModifie, mediasParents); console.log("gauche index", indexMouvementModifie) });
//     droite.addEventListener("click", () => { indexMouvementModifie = droiteAvance(indexMouvementModifie, mediasParents); console.log("droite index", indexMouvementModifie) });
//     return (indexMouvementModifie);
// }

function gaucheRecule(indexMouvementModifie, mediasParents) {
    ((indexMouvementModifie > 0) ? indexMouvementModifie-- : indexMouvementModifie = mediasParents.length);
    return indexMouvementModifie;
}
function droiteAvance(indexMouvementModifie, mediasParents) {
    ((indexMouvementModifie <= mediasParents.length) ? indexMouvementModifie++ : indexMouvementModifie = 0);
    return indexMouvementModifie;
}

function recupereImageUrl(urlImage) {
    const url = new URL(urlImage);
    let idUrl="";
    if (new URLSearchParams(url.search)) {
        idUrl = url.searchParams.get("image");
    }
    else {
        idUrl = 0;
    }
    return idUrl;
}