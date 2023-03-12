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
        const article = document.createElement("article");
        const urlPage = document.createElement("a");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const text = document.createElement("p");
        urlPage.setAttribute("href", `./photographer.html?id=${this.id}&image=${0}`);
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
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        const text = document.createElement("p");
        div.setAttribute("class", "header-img");
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`);
        img.setAttribute("data-src", picture);
        img.setAttribute("class", "image-head");
        h2.textContent = this.name;
        div.appendChild(img);
        div.appendChild(h2);
        text.setAttribute("class", "texte-description");
        text.innerHTML = `${this.tagline}<br> localisation : ${this.city}, ${this.country}`;
        div.appendChild(text);
        return (div);

    }

}

class MediaFactory {
    constructor(mediasParents, index, id, photographerName, photographerId, title, image, video, likes, date, price) {
        this.mediasParents = mediasParents;
        this.index = index;
        this.id = id;
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
        const divLikes = document.createElement("div");
        const divClickLike = document.createElement("div");
        const aImg = document.createElement("a");

        img.setAttribute("src", `${filtreLien}_m.jpg`);
        img.setAttribute("class", "image");
        img.setAttribute("data-src", conserverMiniatureVideo(this.video, picturePhoto, `${filtreLien}_m.jpg`));
        img.setAttribute("onload", chargement(img));


        aImg.addEventListener("click", () => {
            aImg.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${this.index}`);
           });

        
        aImg.appendChild(img);
        divLikes.setAttribute("class", "fig-caption__likes");
        divLikes.innerHTML = this.likes;

        h2.textContent = this.title;

        figure.appendChild(aImg);
        figCaption.appendChild(h2);
        figCaption.appendChild(divLikes);
        figure.appendChild(figCaption);

        console.log("imageminiature", img.getAttribute("src"));
        return (figure);
    }


    ouvreLightbox(idImage) {
        console.log(this.index);



        let gauche = document.querySelector("#idGauche");
        let droite = document.querySelector("#idDroite");
        let surname = garderPrenom(this.photographerName);

        let indexMouvementModifie = idImage;
        console.log("gauche", indexMouvementModifie, idImage);

        gauche.addEventListener("click", () => {indexMouvementModifie = gaucheRecule(indexMouvementModifie, this.mediasParents); console.log("gauche index", indexMouvementModifie); console.log("gauche",{indexMouvementModifie}); gauche.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${indexMouvementModifie}`)})

        droite.addEventListener("click", () => { indexMouvementModifie = droiteAvance(indexMouvementModifie, this.mediasParents); console.log("droite index", indexMouvementModifie); console.log("droite",{indexMouvementModifie}); droite.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${indexMouvementModifie}`)});

        if (!document.querySelector(".lightBox-element")) {

            const lightBoxSection = document.querySelector(".lightBox_section");
            const lightbox = document.createElement("figure");
            const imageLightbox = document.createElement("img");

            lightbox.setAttribute("class", "lightBox-element");
            lightbox.style.width = "300px";
            lightbox.style.height = "300px";
            lightbox.style.backgroundColor = "yellow";
            imageLightbox.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].image}`);
            imageLightbox.setAttribute("class", "lightbox-img");
            lightbox.appendChild(imageLightbox);
            lightBoxSection.appendChild(lightbox);
        }
        else {
            // document.querySelector(".lightBox-element").remove();
        }
    };





}

