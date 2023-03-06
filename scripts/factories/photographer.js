function photographerFactory(data) {
    const { name, id, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;



    function getUserCardDOM() {
        const article = document.createElement('article');
        const urlPage = document.createElement('a');
        urlPage.setAttribute("href", `./photographer.html?${id}`);
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        urlPage.appendChild(img);
        article.appendChild(urlPage);
        article.appendChild(h2);
        const text = document.createElement('p');
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${tagline}<br> localisation : ${city}, ${country} <br> tarif : ${price}€/heure`;
        article.appendChild(text);
        return (article);
    }


    return { name, id, picture, tagline, city, country, price, getUserCardDOM };
}



function photoFactory(data, photographerName) {
    const { photographerId, title, image, likes, date, price } = data;
    const { name } = photographerName ;

    function garderPrenom (name){
    var i;
    var tmp="";
    for( i = name.length -1; i > -1; i--){
    if( name.charAt(i) == " ")
    break;
    }
    tmp = name.substring(0, i);
    return( tmp);
    } 


    const picturePhoto = `./assets/images/${garderPrenom(name)}/${image}`;

    function getPhotoCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picturePhoto)
        const h2 = document.createElement('h2');
        h2.textContent = title;
        article.appendChild(img);
        article.appendChild(h2);

        return (article);
    }

    return { photographerId, title, image, likes, date, price, getPhotoCardDOM }
}



