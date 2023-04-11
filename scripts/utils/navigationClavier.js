import { displayModal } from '../utils/functions.js'

export function navigationClavierModal () {
  let i = -1

  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Enter' && document.querySelector('.contact_button:focus') !== null && document.hasFocus) {
      displayModal()
    } else if (toucheCode === 'Tab' && document.querySelector('.modal-contact-section--invisible') === null && document.hasFocus && document.getElementsByClassName('formulaire__input') !== null) {
      if (i < document.querySelectorAll('.formulaire__input').length - 1) {
        i++
        document.querySelectorAll('.formulaire__input')[i].focus()
      } else if (i === document.querySelectorAll('.formulaire__input').length - 1) {
        document.querySelector('.input__envoyer-bouton').focus()
      } else if (i === document.querySelectorAll('.formulaire__input').length) {
        document.querySelector('.formulaire__erreur').focus()
      } else {
        document.querySelector('.entete__close-bouton').focus()
      }
    }
  }
  )
}

export function navigationClavierGalerie () {
  let i = 0
  let imgTitre
  let imgTitreAlt
  let videoTitreAlt
  let divLikes
  let divClickLike
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Tab' && document.hasFocus() && (document.querySelector('.photo-section__figure:focus') !== null || document.querySelector('.like__icone-aime:focus') !== null) && document.querySelector('.modal-contact-section') === null) {
      if (document.querySelector('.like__icone-aime:focus') !== null) {
        i = parseInt(document.querySelector('.like__icone-aime:focus').getAttribute('name'))
        imgTitre = "'" + document.querySelectorAll('.legende__h2')[i].textContent + "'"
        imgTitreAlt = document.querySelector(`img[alt=${imgTitre}]`)
        videoTitreAlt = document.querySelector(`video[alt=${imgTitre}]`)
        // const videoTitreAlt = document.querySelector(`video[alt=${imgTitre}]`)
        divLikes = document.getElementById(`id-nombre-aime-${[i]}`)
        divClickLike = document.getElementById(`bouton-icone-aime-${[i]}`)
      }
    } else if (toucheCode === 'Enter' && document.hasFocus() && document.querySelectorAll('.like__icone-aime')[i] !== null && document.querySelector('.photo-section__figure:focus') === null && imgTitreAlt && document.querySelector('.like__icone-aime:focus') !== null && document.querySelector('.contact_button:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null && document.querySelector('.modal-contact-section--invisible') !== null && document.querySelector('.photo-section__figure:focus') === null) {
      const coeurChiffre = document.querySelector('.photographe-etiquette__coeur-chiffre')
      if (imgTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`) {
        imgTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`)
        divLikes.textContent = parseInt(divLikes.textContent) + 1
        divClickLike.innerHTML = "<span class='fa-solid fa-heart fa-heart-margin' aria-label='likes'></span>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) + 1
      } else {
        imgTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent}`)
        divLikes.textContent = parseInt(divLikes.textContent) - 1
        divClickLike.innerHTML = "<span class='fa-regular fa-heart fa-heart-margin' aria-label='likes'></span>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) - 1
      }
    } else if (toucheCode === 'Enter' && document.hasFocus() && document.querySelectorAll('.like__icone-aime')[i] !== null && document.querySelector('.photo-section__figure:focus') === null && videoTitreAlt && document.querySelector('.like__icone-aime:focus') !== null && document.querySelector('.contact_button:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null && document.querySelector('.modal-contact-section--invisible') !== null && document.querySelector('.photo-section__figure:focus') === null) {
      const coeurChiffre = document.querySelector('.photographe-etiquette__coeur-chiffre')
      if (videoTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`) {
        videoTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`)
        divLikes.textContent = parseInt(divLikes.textContent) + 1
        divClickLike.innerHTML = "<span class='fa-solid fa-heart fa-heart-margin' aria-label='likes'></span>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) + 1
      } else {
        videoTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent}`)
        divLikes.textContent = parseInt(divLikes.textContent) - 1
        divClickLike.innerHTML = "<span class='fa-regular fa-heart fa-heart-margin' aria-label='likes'></span>"
        divClickLike.setAttribute('tabindex', 0)
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) - 1
      }
    }
  }
  )
}
export function navigationClavierIndex (id, index) {
  // navigation au clavier
  // l'id est mis dans l'url et la page est rechargé à la touche entrée à l'index sur la carte d'un des photographes
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Enter' && document.hasFocus && document.querySelector(`article#id-${index}:focus`) !== null) {
      window.location.href = `./photos.html?id=${id}`
      location.reload()
    }
  })
}
export function navigationClavierRetour () {
  document.addEventListener('keydown', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Escape' && document.hasFocus() && document.querySelector('.photographe-etiquette__prix:focus') !== null) {
      document.getElementsByClassName('logo').focus()
    } else if (toucheCode === 'Enter' && document.hasFocus() && document.getElementsByClassName('logo:focus') !== null) {
      window.location.href = '/index.html'
    }
  })
}

export function navigationClavierEchap () {
  // navigation au clavier
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Escape' && document.hasFocus && document.querySelector('.select-option').getElementsByClassName.display === 'none') {
      document.getElementsByClassName('logo').focus()
    }
  })
}
