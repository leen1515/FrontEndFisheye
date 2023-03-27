
class EtiquetteFactory {
    constructor(likes, prix) {
        this.likes = likes;
        this.prix = prix;
    }
    etiquetteLikePrix() {
        const etiquette = document.createElement("div");
        const totalCoeur = document.createElement("div");
        const prix = document.createElement("div");

        etiquette.setAttribute("class", "photographe-etiquette");
        totalCoeur.setAttribute("class", "photographe-etiquette__coeur");
        prix.setAttribute("class", "photographe-etiquette__prix");

        totalCoeur.innerHTML = `${this.likes} <i class='fa-solid fa-heart'></i>`;
        prix.innerHTML = `${this.prix}€ / jour`;


        etiquette.appendChild(totalCoeur);
        etiquette.appendChild(prix);

        return (etiquette);
    }

}

