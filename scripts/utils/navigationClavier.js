import { displayModal } from '../utils/functions.js'

export function navigationClavierModal () {
  document.addEventListener('keydown', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Enter' && document.querySelector('.contact_button:focus') && document.hasFocus) {
      displayModal()
    }
  })
}

export function navigationClavierGalerie () {
  const coeurChiffre = document.querySelector('.photographe-etiquette__coeur-chiffre')
  let i = 0
  let imgTitre
  let imgTitreAlt
  let videoTitreAlt
  let divLikes
  let divClickLike
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Tab' && document.hasFocus() && (document.querySelector('.photo-section__figure:focus') !== null || document.querySelector('.like__icone-aime:focus') !== null)) {
      if (document.querySelector('.like__icone-aime:focus') !== null) {
        i = parseInt(document.querySelector('.like__icone-aime:focus').getAttribute('name'))
        imgTitre = "'" + document.querySelectorAll('.legende__h2')[i].textContent + "'"
        imgTitreAlt = document.querySelector(`img[alt=${imgTitre}]`)
        videoTitreAlt = document.querySelector(`video[alt=${imgTitre}]`)
        // const videoTitreAlt = document.querySelector(`video[alt=${imgTitre}]`)
        divLikes = document.getElementById(`id-nombre-aime-${[i]}`)
        divClickLike = document.getElementById(`bouton-icone-aime-${[i]}`)
      }
    } else if (toucheCode === 'Enter' && document.hasFocus() && document.querySelectorAll('.like__icone-aime')[i] !== null && document.querySelector('photo-section__figure:focus') === null && imgTitreAlt) {
      if (imgTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`) {
        imgTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`)
        divLikes.textContent = parseInt(divLikes.textContent) + 1
        divClickLike.innerHTML = "<i class='fa-solid fa-heart fa-heart-margin'></i>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) + 1
      } else {
        imgTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent}`)
        divLikes.textContent = parseInt(divLikes.textContent) - 1
        divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) - 1
      }
    } else if (toucheCode === 'Enter' && document.hasFocus() && document.querySelectorAll('.like__icone-aime')[i] !== null && document.querySelector('photo-section__figure:focus') === null && videoTitreAlt) {
      if (videoTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`) {
        videoTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent} aimée`)
        divLikes.textContent = parseInt(divLikes.textContent) + 1
        divClickLike.innerHTML = "<i class='fa-solid fa-heart fa-heart-margin'></i>"
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) + 1
      } else {
        videoTitreAlt.setAttribute('alt', `${document.querySelectorAll('.legende__h2')[i].textContent}`)
        divLikes.textContent = parseInt(divLikes.textContent) - 1
        divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
        divClickLike.setAttribute('tabindex', 0)
        coeurChiffre.textContent = parseInt(coeurChiffre.textContent) - 1
      }
    }
  }
  )
}
export function navigationClavierIndex (id, index) {
  // navigation au clavier
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Enter' && document.hasFocus && document.querySelector(`article#id-${index}:focus`) !== null) {
      window.location.href = `./photos.html?id=${id}`
      location.reload()
    }
  })
}

export function navigationClavierEchap () {
  // navigation au clavier
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Escape' && document.hasFocus && document.querySelector('.select-option').getElementsByClassName.display === 'none') {
      document.querySelector('.logo').focus()
    }
  })
  document.addEventListener('keyup', (e) => {
    const toucheCode = e.key
    if (toucheCode === 'Enter' && document.hasFocus && document.querySelector('.logo:focus')) {
      window.location.href = './index.html'
      location.reload()
    }
  })
}
