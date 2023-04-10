import { installerAttribute, verificationString, verificationEmail, closeModal } from '../utils/functions.js'
// class referente pour construire dynamiquement la modale pour chaque photographe
export class ModalContactBuilder {
  constructor (name) {
    this.name = name // travaille avec le nom correspondant à l'id du photographe de la page
  }

  formulaireContact () {
    // crée les balises nécessaires pour former la modal contact
    const modalContactForm = document.createElement('div')
    const formulaire = document.createElement('form')
    const erreurVisible = document.createElement('div')
    const enteteModal = document.createElement('div')
    const nomRecepteur = document.createElement('h1')
    const inputPrenom = document.createElement('input')
    const inputNom = document.createElement('input')
    const inputEmail = document.createElement('input')
    const inputMessage = document.createElement('textarea')
    const buttonEnvoyer = document.createElement('div')
    const buttonClose = document.createElement('div')

    const labelPrenom = document.createElement('label')
    const labelNom = document.createElement('label')
    const labelEmail = document.createElement('label')
    const labelMessage = document.createElement('label')

    // appel de la fonction installerAtribute(), créer spécialement pour me faciliter la mise en place
    // des attributs nécessaires
    installerAttribute(labelPrenom, { for: '3', class: 'formulaire__label' })
    installerAttribute(labelNom, { for: '5', class: 'formulaire__label' })
    installerAttribute(labelEmail, { for: '7', class: 'formulaire__label' })
    installerAttribute(labelMessage, { for: '9', class: 'formulaire__label' })

    // transmet les données au contenu html de la balise correspondante
    nomRecepteur.innerHTML = `Contactez-moi <br> ${this.name}`
    labelPrenom.textContent = 'Prénom'
    labelNom.textContent = 'Nom'
    labelEmail.textContent = 'Email'
    labelMessage.textContent = 'Votre message'
    buttonClose.innerHTML = "<i class='fa-solid fa-xmark fa-3x'></i>"
    buttonEnvoyer.innerText = 'Envoyer'

    modalContactForm.setAttribute('class', 'modal-contact-section--invisible')
    formulaire.setAttribute('class', 'modal-formulaire')
    erreurVisible.setAttribute('class', 'formulaire__erreur')

    enteteModal.setAttribute('class', 'formulaire__entete')
    nomRecepteur.setAttribute('class', 'entete__recepteur-titre')

    installerAttribute(inputPrenom, { class: 'formulaire__input', id: '3', type: 'text', minlength: '2', maxlength: '50', name: 'First name', tabindex: 0 })
    installerAttribute(inputNom, { class: 'formulaire__input', id: '5', type: 'text', minlength: '2', maxlength: '50', name: 'last name', tabindex: 1 })
    installerAttribute(inputEmail, { class: 'formulaire__input', id: '7', type: 'email', minlength: '2', maxlength: '50', name: 'Email', tabindex: 2 })
    installerAttribute(inputMessage, { role: 'text field', class: 'formulaire__input', id: '9', type: 'textarea', wrap: 'hard', rows: '50', cols: '50', minlength: '2', maxlength: '500', name: 'Your message', tabindex: 3 })

    installerAttribute(buttonEnvoyer, { class: 'input__envoyer-bouton', tabindex: 4 })
    installerAttribute(buttonClose, { class: 'entete__close-bouton', tabindex: 5 })

    buttonClose.addEventListener('click', closeModal)
    document.addEventListener('keydown', (e) => {
      const toucheCode = e.key
      if (toucheCode === 'Escape') {
        closeModal()
      }
    })
    // verifie les valeurs des champs remplie par l'utilisateur avant de renvoyer l'ensemble des valeur vers le console.log
    buttonEnvoyer.addEventListener('click', () => {
      if (verificationString(inputPrenom) && verificationString(inputNom) && verificationString(inputMessage) && verificationEmail(inputEmail)) {
        console.log(` Prenom: ${inputPrenom.value} | Nom: ${inputNom.value} | Email: ${inputEmail.value}, Votre message: ${inputMessage.value} `)
        erreurVisible.innerText = 'Votre message a été envoyé ! '
        setTimeout(() => { erreurVisible.innerText = '' }, 4000)
        // renitialise le formulaire
        document.querySelector('.modal-formulaire').reset()
      } else {
        erreurVisible.innerText = 'Données Incorrectes'
        setTimeout(() => { erreurVisible.innerText = '' }, 4000)
      }
    })

    // ajout des différentes balises les uns aux autres
    modalContactForm.appendChild(formulaire)

    enteteModal.appendChild(nomRecepteur)
    enteteModal.appendChild(buttonClose)
    formulaire.appendChild(enteteModal)

    formulaire.appendChild(labelPrenom)
    formulaire.appendChild(inputPrenom)

    formulaire.appendChild(labelNom)
    formulaire.appendChild(inputNom)

    formulaire.appendChild(labelEmail)
    formulaire.appendChild(inputEmail)

    formulaire.appendChild(labelMessage)
    formulaire.appendChild(inputMessage)

    formulaire.appendChild(erreurVisible)
    formulaire.appendChild(buttonEnvoyer)

    // retourne le noeud parent, cela permettra d'instancier l'objet buildé dans le dom pour le
    // photographe concerné
    return (modalContactForm)
  }
}
