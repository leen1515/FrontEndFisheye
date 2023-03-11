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


function photographerFactory(data) {
    const { name, id, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;



    function getUserCardDOM() {
        const article = document.createElement('article');
        const urlPage = document.createElement('a');
        urlPage.setAttribute("href", `./photographer.html?${id}`);
        const img = document.createElement('img');
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`)
        img.setAttribute("data-src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        urlPage.appendChild(img);
        article.appendChild(urlPage);
        article.appendChild(h2);
        const text = document.createElement('p');
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${tagline}<br> localisation : ${city}, ${country} <br> tarif : ${price}€/jour`;
        article.appendChild(text);
        return (article);
    }
    return { name, id, picture, tagline, city, country, price, getUserCardDOM };
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


function photoFactory(data, photographerName) {
    const { photographerId, title, image, likes, date, price } = data;
    const name = garderPrenom(photographerName);

   
    const picturePhoto = `assets/images/${name}/${image}`;

    function getPhotoCardDOM() {

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.setAttribute("src", `${urlImageMiniature(picturePhoto)}_m.jpg`);
        img.setAttribute("class", "image");
        img.setAttribute("data-src", picturePhoto);
        const figCaption = document.createElement("figcaption");
        const h2 = document.createElement("h2");
        h2.textContent = title;
        figure.appendChild(img);
        figCaption.appendChild(h2);
        figure.appendChild(figCaption);
        console.log("imageminiature", img.getAttribute("src"));
        



        return (figure);
    }




    return { photographerId, title, image, likes, date, price, getPhotoCardDOM }
}







function photographeCarteFactory(data) {
    const { name, id, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getPhotoUserCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "header-img");
        const img = document.createElement('img');
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`);
        img.setAttribute("data-src", picture);
        img.setAttribute("class", "image-head");
        const h2 = document.createElement('h2');
        h2.textContent = name;
        div.appendChild(img);
        div.appendChild(h2);
        const text = document.createElement('p');
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${tagline}<br> localisation : ${city}, ${country}`;
        div.appendChild(text);
        return (div);
    }
    return { name, id, picture, tagline, city, country, price, getPhotoUserCardDOM };
}



