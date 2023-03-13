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

        //creation des élements pour le *DOM
        const article = document.createElement("article");
        const urlPage = document.createElement("a");
        const img = document.createElement("img");
        const text = document.createElement("div");
        const h2 = document.createElement("h2");
        const slogan = document.createElement("p");
        const localisation = document.createElement("p");
        const paragraphe = document.createElement("p");

        //style ajout des classes
        article.setAttribute("class", "article-photo");
        urlPage.setAttribute("class", "article-photo__lien-vignette");
        img.setAttribute("class", "lien-vignette__avatar");
        text.setAttribute("class", "article-photo__texte-description");
        h2.setAttribute("class", "texte-decription__h2");
        slogan.setAttribute("class", "texte-description__slogan");
        localisation.setAttribute("class", "texte-description__localisation")
        paragraphe.setAttribute("class", "texte-description__paragraphe");

        //style ajout des Ids aux vignettes par photographe
        img.setAttribute("id", `lien-vignette__avatar-${this.id}`);

        //attribut relatif aux variables et url et remplissage des contenus
        urlPage.setAttribute("href", `./photographer.html?id=${this.id}&image=${0}`);
        img.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`)
        img.setAttribute("data-src", picture);
        h2.textContent = `${this.name}`;
        localisation.textContent = `${this.city}, ${this.country}`;
        slogan.innerHTML = `${this.tagline}`;
        paragraphe.textContent = `${this.price}€/jour`;
        img.setAttribute("onload", chargement(img));

        //ajout des éléments les uns aux autres jusqu'au *DOM
        urlPage.appendChild(img);
        article.appendChild(urlPage);
        text.appendChild(h2);
        text.appendChild(localisation);
        text.appendChild(slogan);
        text.appendChild(paragraphe);
        article.appendChild(text);

        console.log("l'article", article);
        return (article);
    }

    getUserBanniereCardDOM() {
        const picture = `assets/photographers/${this.portrait}`;

        //creation des élements pour le *DOM
        const banniere = document.createElement("div");
        const h1 = document.createElement("h1");
        const text = document.createElement("div");
        const paragraphe = document.createElement("p");
        const location = document.createElement("p");
        const buttonContact = document.createElement("button");
        const divAvatar = document.createElement("div");
        const avatar = document.createElement("img");

        //style ajout des classes
        banniere.setAttribute("class", "banniere-entete");
        h1.setAttribute("class", "texte__nom");
        text.setAttribute("class", "banniere__texte");
        paragraphe.setAttribute("class", "texte__slogan");
        location.setAttribute("class", "texte__location")
        buttonContact.setAttribute("class", "contact_button");
        divAvatar.setAttribute("class","article-photo__lien-vignette")
        avatar.setAttribute("class", "lien-vignette__avatar");

        
        //style ajout des Ids aux vignettes par photographe
        avatar.setAttribute("id", `lien-vignette__avatar-${this.id}`);

        //attribut relatif aux variables et url et remplissage des contenus
        avatar.setAttribute("src", `${urlImageMiniature(picture)}_m.jpg`);
        avatar.setAttribute("data-src", picture);
        buttonContact.addEventListener("click", displayModal);
        buttonContact.textContent = "Contactez-moi";
        h1.textContent = this.name;
        paragraphe.textContent = `${this.tagline}`;
        location.textContent = `${this.city}, ${this.country}`;
        
        avatar.setAttribute("onload", chargement(avatar));

        //ajout des éléments les uns aux autres jusqu'au *DOM
        
        banniere.appendChild(text);
        text.appendChild(h1);
        text.appendChild(location);
        text.appendChild(paragraphe);
        banniere.appendChild(buttonContact);
        divAvatar.appendChild(avatar)
        banniere.appendChild(divAvatar);

        return (banniere);
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
        const filtreLien = urlImageMiniature(picturePhoto);

        //creation des élements pour le *DOM
        const figure = document.createElement("figure");
        const photo = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        const h2 = document.createElement("h2");
        const groupeLike = document.createElement("div");
        const divLikes = document.createElement("div");
        const divClickLike = document.createElement("div");
        const lienPhoto = document.createElement("a");

        //style ajout des classes
        figure.setAttribute("class", "photo-section__figure");
        lienPhoto.setAttribute("class", "figure__lien-photographie")
        photo.setAttribute("class", "lien-photographie__photographies");
        figCaption.setAttribute("class", "figure__legende");
        h2.setAttribute("class", "legende__h2");
        groupeLike.setAttribute("class", "legende__like");
        divLikes.setAttribute("class", "like__nombre-aime");
        divClickLike.setAttribute("class", "like__icone-aime");

        //attribut relatif aux variables et url et remplissage des contenus
        photo.setAttribute("onload", chargement(photo));
        photo.setAttribute("data-src", conserverMiniatureVideo(this.video, picturePhoto, `${filtreLien}_m.jpg`));
        photo.setAttribute("src", `${filtreLien}_m.jpg`);
        lienPhoto.addEventListener("click", () => {
            lienPhoto.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${this.index}`);
        });
        divLikes.textContent = this.likes;
        h2.textContent = this.title;

        //ajout des éléments les uns aux autres jusqu'au *DOM
        lienPhoto.appendChild(photo);
        figure.appendChild(lienPhoto);
        figCaption.appendChild(h2);
        figCaption.appendChild(groupeLike);
        groupeLike.appendChild(divClickLike);
        groupeLike.appendChild(divLikes);
        figure.appendChild(figCaption);

        console.log("imageminiature", photo.getAttribute("src"));
        return (figure);
    }


    ouvreLightbox(idImage) {

        let surname = garderPrenom(this.photographerName);

        let gauche = document.querySelector("#idGauche");
        let droite = document.querySelector("#idDroite");

        let indexMouvementModifie = idImage;
        console.log("gauche", indexMouvementModifie, idImage);

        
        gauche.addEventListener("click", () => { indexMouvementModifie = gaucheRecule(indexMouvementModifie, this.mediasParents); console.log("gauche", { indexMouvementModifie }); gauche.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${indexMouvementModifie}`) })

        droite.addEventListener("click", () => { indexMouvementModifie = droiteAvance(indexMouvementModifie, this.mediasParents); console.log("droite", { indexMouvementModifie }); droite.setAttribute("href", `./photographer.html?id=${this.photographerId}&image=${indexMouvementModifie}`) });

        if (!document.querySelector(".lightBox-element")&&!document.querySelector(".lightBox-element__photo")) {

            //creation des élements pour le *DOM
            const lightboxSection = document.querySelector(".lightBox_section");
            const lightbox = document.createElement("figure");
            const imageLightbox = document.createElement("img");
            const lightboxCaption = document.createElement("figcaption");
            const lightboxTitre = document.createElement("h3");

            //style ajout des classes
            lightbox.setAttribute("class", "lightBox-element");
            imageLightbox.setAttribute("class", "lightBox-element__photo");
            lightboxCaption.setAttribute("class", "lightBox-element__description");
            lightboxTitre.setAttribute("class", "description__h3");
            
            //attribut relatif aux variables et url et remplissage des contenus
            imageLightbox.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].image}`);
            
            //ajout des éléments les uns aux autres jusqu'au *DOM
            lightbox.appendChild(imageLightbox);
            lightboxSection.appendChild(lightbox);
            lightboxSection.appendChild(lightboxCaption);
            lightboxCaption.appendChild(lightboxTitre);
        }
    };
}

