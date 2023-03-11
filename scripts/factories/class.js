class PhotographerFactory {
    constructor(nameId, id, tagline, city, country, price, portrait) {
        this.name = nameId;
        this.id = id;
        this.tagline = tagline;
        this.city = city;
        this.country = country;
        this.price = price;
        this.portrait = portrait;
    }

    getUserCardDOM() {
        const picture = `assets/photographers/${this.portrait}`;
        const article = document.createElement('article');
        const urlPage = document.createElement('a');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const text = document.createElement('p');
        urlPage.setAttribute("href", `./photographer.html?id=${this.id}`);
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`)
        img.setAttribute("data-src", picture);
        h2.textContent = this.nameId;
        urlPage.appendChild(img);
        article.appendChild(urlPage);
        article.appendChild(h2);
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${this.tagline}<br> localisation : ${this.city}, ${this.country} <br> tarif : ${this.price}€/jour`;
        article.appendChild(text);
        console.log("l'article", article);
        return (article);
    }

    getUserBanniereCardDOM() {
        const picture = `assets/photographers/${this.portrait}`;
        const div = document.createElement('div');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const text = document.createElement('p');
        div.setAttribute("class", "header-img");
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`);
        img.setAttribute("data-src", picture);
        img.setAttribute("class", "image-head");
        h2.textContent = this.nameId;
        div.appendChild(img);
        div.appendChild(h2);
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${this.tagline}<br> localisation : ${this.city}, ${this.country}`;
        div.appendChild(text);
        return (div);

    }

}

class MediaFactory {
    constructor(photographerName, photographerId, title, image, video, likes, date, price) {
        this.photographerName = photographerName;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    getPhotoDOM() {
        const surname = garderPrenom(this.photographerName);
        const verifieRemplace = remplaceVideoImage(this.video, this.image);
        const picturePhoto = `assets/images/${surname}/${verifieRemplace}`;
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const filtreLien = urlImageMiniature(picturePhoto);
        const figCaption = document.createElement("figcaption");
        const h2 = document.createElement("h2");

        img.setAttribute("src", `${filtreLien}_m.jpg`);
        img.setAttribute("class", "image");     
        img.setAttribute("data-src", picturePhoto);
        
        h2.textContent = this.title;
        figure.appendChild(img);
        figCaption.appendChild(h2);
        figure.appendChild(figCaption);
        console.log("imageminiature", img.getAttribute("src"));
        return (figure);
    }
}