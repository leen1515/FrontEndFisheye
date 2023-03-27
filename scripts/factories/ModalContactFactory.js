class ModalContactFactory {
    constructor(name) {
        this.name = name;
    }

    formulaireContact() {
        const modalContactForm = document.createElement("div");
        const formulaire = document.createElement("form");
        const enteteModal = document.createElement("div");
        const nomRecepteur = document.createElement("h1");
        const inputPrenom = document.createElement("input");
        const inputNom = document.createElement("input");
        const inputEmail = document.createElement("input");
        const inputMessage = document.createElement("input");
        const buttonEnvoyer = document.createElement("div");
        const buttonClose = document.createElement("div");

        const labelPrenom = document.createElement("label");
        const labelNom = document.createElement("label");
        const labelEmail = document.createElement("label");
        const labelMessage = document.createElement("label");

        labelPrenom.setAttribute("for", "3");
        labelNom.setAttribute("for", "5");
        labelEmail.setAttribute("for", "7");
        labelMessage.setAttribute("for", "9");

        nomRecepteur.innerHTML = `Contactez-moi <br> ${this.name}`;
        labelPrenom.textContent = "Prénom";
        labelNom.textContent = "Nom";
        labelEmail.textContent = "Email";
        labelMessage.textContent = "Message";
        buttonClose.innerHTML = "<i class='fa-regular fa-x fa-3x'></i>";
        buttonEnvoyer.innerText="Envoyer";

        modalContactForm.setAttribute("class", "modal-contact-section--invisible");
        formulaire.setAttribute("class", "modal-formulaire");
        
        

        enteteModal.setAttribute("class", "formulaire__entete");
        nomRecepteur.setAttribute("class", "entete__recepteur-titre");

        installerAttribute(inputPrenom, {"class": "formulaire__input", "id": "3", "type": "text", "minlength": "2", "name": "First name"});
        installerAttribute(inputNom, {"class": "formulaire__input", "id": "5", "type": "text", "minlength": "2", "name": "last name"});
        installerAttribute(inputMessage, {"class": "formulaire__input", "id": "7", "type": "text", "minlength": "2", "name": "Your message"});
        installerAttribute(inputEmail, {"class": "formulaire__input", "id": "9", "type": "text", "minlength": "2", "name": "Email"});

        
        installerAttribute(buttonEnvoyer, {"class": "input__envoyer-bouton"});
        installerAttribute(buttonClose, {"class": "entete__close-bouton"});
        
        buttonClose.addEventListener("click", closeModal);

        modalContactForm.appendChild(formulaire);

        enteteModal.appendChild(nomRecepteur);        
        enteteModal.appendChild(buttonClose);
        formulaire.appendChild(enteteModal);

        formulaire.appendChild(labelPrenom);
        formulaire.appendChild(inputPrenom);

        formulaire.appendChild(labelNom);
        formulaire.appendChild(inputNom);

        formulaire.appendChild(labelEmail);
        formulaire.appendChild(inputEmail);

        formulaire.appendChild(labelMessage);
        formulaire.appendChild(inputMessage);

        formulaire.appendChild(buttonEnvoyer);
        return (modalContactForm);
    }

}

