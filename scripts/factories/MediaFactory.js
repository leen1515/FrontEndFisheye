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
        const lienPhoto = document.createElement("div");

        //style ajout des classes
        figure.setAttribute("class", "photo-section__figure");
        lienPhoto.setAttribute("class", "figure__lien-photographie")
        photo.setAttribute("class", "lien-photographie__photographies--flou");
        figCaption.setAttribute("class", "figure__legende");
        h2.setAttribute("class", "legende__h2");
        groupeLike.setAttribute("class", "legende__like");
        divLikes.setAttribute("class", "like__nombre-aime");
        divClickLike.setAttribute("class", "like__icone-aime");

        const parentLightbox = document.querySelector(".lightBox__section__bouton--invisible");

        lienPhoto.addEventListener("click", () => { parentLightbox.className = "lightBox__section__bouton"; this.creerLightbox(this.index); });


        //attribut relatif aux variables et url et remplissage des contenus
        let source = conserverMiniatureVideo(this.video, picturePhoto, `${filtreLien}_m.jpg`);

        photo.setAttribute("src", `${source}`);
        photo.addEventListener('onload', chargement(photo, source, filtreLien, "lien-photographie__photographies"));
        
        divLikes.innerHTML = `${this.likes} `;
        divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>";
        let clique = false;
        divClickLike.addEventListener("click", ()=>{(!clique?clique = true:clique = false); 
            if (clique){divLikes.innerHTML = `${this.likes+1} `; divClickLike.innerHTML = "<i class='fa-solid fa-heart fa-heart-margin'></i>";}
            else{
                divLikes.innerHTML = `${this.likes} `;
                divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>";
            }
        }
        );

       

        h2.textContent = this.title;

        //ajout des éléments les uns aux autres jusqu'au *DOM
        lienPhoto.appendChild(photo);
        figure.appendChild(lienPhoto);
        figCaption.appendChild(h2);
        figCaption.appendChild(groupeLike);
        groupeLike.appendChild(divLikes);
        groupeLike.appendChild(divClickLike);
        figure.appendChild(figCaption);

        return (figure);
    }


    creerLightbox(idImage) {

        let indexMouvementModifie = idImage;
        let surname = garderPrenom(this.photographerName);

        let videoVerification;

        if (this.video !== undefined) {
            videoVerification = true;
        }
        else {
            videoVerification = false;
        }

        let gauche = document.querySelector("#idGauche");
        let droite = document.querySelector("#idDroite");
        const parentLightbox = document.querySelector(".lightBox__section__bouton");

        gauche.addEventListener("click", () => { indexMouvementModifie = gaucheRecule(indexMouvementModifie, this.mediasParents); });
        droite.addEventListener("click", () => { indexMouvementModifie = droiteAvance(indexMouvementModifie, this.mediasParents); });


        if (!document.querySelector(".lightBox-element")) {

            //creation des élements pour le *DOM
            const lightboxSection = document.querySelector(".lightBox__section");
            const lightbox = document.createElement("figure");
            const lightboxCaption = document.createElement("figcaption");
            const lightboxTitre = document.createElement("h3");
            const lightboxQuitte = document.createElement("div");
            const imageLightbox = document.createElement("img");
            const lightboxVideo = document.createElement("video");
            const lightboxVideoSource = document.createElement("source");
            //style ajout des classes pour l'image
            lightbox.setAttribute("class", "lightBox-element");
            lightboxCaption.setAttribute("class", "lightBox-element__description");
            lightboxTitre.setAttribute("class", "description__h3");
            lightboxQuitte.setAttribute("class", "lightBox-quitter");

            //attribut relatif aux variables et url et remplissage des contenus
            lightboxQuitte.innerHTML = "<i class='fa-solid fa-xmark fa-3x'></i>";
            lightboxQuitte.addEventListener("click", () => { parentLightbox.className = "lightBox__section__bouton--invisible"; document.querySelector(".lightBox-element").remove() });
            lightbox.appendChild(lightboxQuitte);
            //ajout des éléments les uns aux autres jusqu'au *DOM

            droite.addEventListener("click", () => {
                (this.mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false);
                if (videoVerification) {
                    lightbox.appendChild(lightboxVideo);
                    imageLightbox.remove();
                    lightboxVideoSource.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].video}`);
                    lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;
                    lightboxCaption.appendChild(lightboxTitre);
                    lightbox.appendChild(lightboxCaption);
                } else {
                    imageLightbox.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].image}`);
                    lightbox.appendChild(imageLightbox);
                    lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;
                    lightboxCaption.appendChild(lightboxTitre);
                    lightbox.appendChild(lightboxCaption);
                    lightboxVideo.remove();
                }
            })

            gauche.addEventListener("click", () => {
                (this.mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false);
                if (videoVerification) {
                    imageLightbox.remove();
                    lightbox.appendChild(lightboxVideo);
                    lightboxVideoSource.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].video}`);
                    lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;
                    lightboxCaption.appendChild(lightboxTitre);
                    lightbox.appendChild(lightboxCaption);
                } else {
                    imageLightbox.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].image}`);
                    lightbox.appendChild(imageLightbox);
                    lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;
                    lightboxCaption.appendChild(lightboxTitre);
                    lightbox.appendChild(lightboxCaption);
                    lightboxVideo.remove();
                }
            })

            if (videoVerification) {
                imageLightbox.remove();
                lightbox.appendChild(lightboxVideo);
                lightboxVideoSource.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].video}`);
                lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;
                lightboxCaption.appendChild(lightboxTitre);
            } else {
                lightboxVideo.remove();
                imageLightbox.setAttribute("src", `assets/images/${surname}/${this.mediasParents[indexMouvementModifie].image}`);
                lightboxVideoSource.setAttribute("src", " ");
                lightbox.appendChild(imageLightbox);
                
                lightboxTitre.innerText = `${this.mediasParents[indexMouvementModifie].title}`;        
                lightboxCaption.appendChild(lightboxTitre);
                lightbox.appendChild(lightboxCaption);
            }

            lightboxVideo.controls = true;
            lightboxVideo.setAttribute("width", "90%");
            lightboxVideoSource.setAttribute("type", "video/mp4");
            lightboxVideo.setAttribute("class", "lightBox-element__video");
            lightboxVideo.appendChild(lightboxVideoSource);

            imageLightbox.setAttribute("class", "lightBox-element__photo");
            lightboxSection.appendChild(lightbox);
        }
    };
}