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

function remplaceVideoImage(video, image){
    if (video){
        return video;
    }
    else{
        return image;
    }
}