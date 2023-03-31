import { installerAttribute, verificationString, verificationEmail, closeModal } from '../utils/functions.js'

export class ModalContactFactory {
  constructor (name) {
    this.name = name
  }

  formulaireContact () {
    const modalContactForm = document.createElement('div')
    const formulaire = document.createElement('form')
    const erreurVisible = document.createElement('div')
    const enteteModal = document.createElement('div')
    const nomRecepteur = document.createElement('h1')
    const inputPrenom = document.createElement('input')
    const inputNom = document.createElement('input')
    const inputEmail = document.createElement('input')
    const inputMessage = document.createElement('input')
    const buttonEnvoyer = document.createElement('div')
    const buttonClose = document.createElement('div')

    const labelPrenom = document.createElement('label')
    const labelNom = document.createElement('label')
    const labelEmail = document.createElement('label')
    const labelMessage = document.createElement('label')

    installerAttribute(labelPrenom, { for: '3', class: 'formulaire__label' })
    installerAttribute(labelNom, { for: '5', class: 'formulaire__label' })
    installerAttribute(labelEmail, { for: '7', class: 'formulaire__label' })
    installerAttribute(labelMessage, { for: '9', class: 'formulaire__label' })

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

    installerAttribute(inputPrenom, { class: 'formulaire__input', id: '3', type: 'text', minlength: '2', maxlength: '50', name: 'First name' })
    installerAttribute(inputNom, { class: 'formulaire__input', id: '5', type: 'text', minlength: '2', maxlength: '50', name: 'last name' })
    installerAttribute(inputMessage, { class: 'formulaire__input', id: '7', type: 'text', minlength: '2', maxlength: '500', name: 'Your message' })
    installerAttribute(inputEmail, { class: 'formulaire__input', id: '9', type: 'email', minlength: '2', maxlength: '50', name: 'Email' })

    installerAttribute(buttonEnvoyer, { class: 'input__envoyer-bouton' })
    installerAttribute(buttonClose, { class: 'entete__close-bouton' })

    buttonClose.addEventListener('click', closeModal)

    buttonEnvoyer.addEventListener('click', () => {
      if (verificationString(inputPrenom) && verificationString(inputNom) && verificationString(inputMessage) && verificationEmail(inputEmail)) {
        console.log(` Prenom: ${inputPrenom.value} | Nom: ${inputNom.value} | Email: ${inputEmail.value}, Votre message: ${inputMessage.value} `)
        erreurVisible.innerText = 'Votre message a été envoyé ! '
        setTimeout(() => { erreurVisible.innerText = '' }, 4000)
        document.querySelector('.modal-formulaire').reset()
      } else {
        erreurVisible.innerText = 'Données Incorrectes'
        setTimeout(() => { erreurVisible.innerText = '' }, 4000)
      }
    })

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
    return (modalContactForm)
  }
}
