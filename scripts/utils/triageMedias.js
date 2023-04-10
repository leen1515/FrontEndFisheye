import { installerAttribute } from '../utils/functions.js'
import { triage } from '../gestionJson/gestionJsonMedias.js'
import { navigationClavierGalerie } from './navigationClavier.js'
// une classe avec des methodes pour trier la galerie. la methode sort de js est utilisée pour réordonner l'affichage du tableau
// avant de le retourner
class Tri {
  constructor (media) {
    this.media = media
  }

  // réordonne le tableau selon le nombre de like de chaque media
  likeDecroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return b.likes - a.likes
    })

    return mediaTri
  }

  // réordonne le tableau selon la date de chaque média
  dateDecroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    return mediaTri
  }

  // réordonne le tableau selon son titre de manière alphabétique
  alphabetiqueCroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' })
    })
    return mediaTri
  }
}
// selectOrdre permet de gerer l'affichage et le comportement des boutons filtres par rapport à leur propre apparence
function selectOrdre () {
  const selectOptionPopularite = document.createElement('div')
  const selectOptionDate = document.createElement('div')
  const selectOptionTitre = document.createElement('div')

  const select = document.querySelector('.select-menu')
  const selectMenu = document.querySelector('.select-option')
  const optionMenuChoisie = document.querySelector('.option-menu-choisi')
  const selectInput = document.querySelector('.select-input')
  installerAttribute(select, { tabindex: '0' })
  installerAttribute(optionMenuChoisie, { tabindex: '2' })
  installerAttribute(selectOptionPopularite, { id: 'idPopularite', role: 'option', class: 'option-menu', 'aria-selected': false, tabindex: '0' })
  installerAttribute(selectOptionDate, { id: 'idDate', role: 'option', class: 'option-menu', 'aria-selected': false, tabindex: '0' })
  installerAttribute(selectOptionTitre, { id: 'idTitre', role: 'option', class: 'option-menu', 'aria-selected': false, tabindex: '0' })

  const tagPopularite = 'Popularité'
  const tagDate = 'Date'
  const tagTitre = 'Titre'

  selectOptionPopularite.textContent = tagPopularite
  selectOptionDate.textContent = tagDate
  selectOptionTitre.textContent = tagTitre

  selectMenu.appendChild(selectOptionPopularite)
  selectMenu.appendChild(selectOptionDate)
  selectMenu.appendChild(selectOptionTitre)
  selectMenu.style.display = 'none'
  // gère le comportement du bouton principal
  optionMenuChoisie.addEventListener('click', () => { (selectMenu.style.display === 'none' ? selectMenu.style.display = 'block' : selectMenu.style.display = 'none') })
  selectOptionPopularite.style.display = 'none'
  const selectAllOption = document.querySelectorAll('.option-menu')

  let i = 0
  select.addEventListener('focus', () => {
    document.addEventListener('keydown', (e) => {
      let ordreChoix
      const toucheCode = e.key
      if (toucheCode === 'Enter' && document.hasFocus && document.querySelector('.select-menu:focus') !== null && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.contact_button:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        selectMenu.style.display = 'block'
      } else if (toucheCode === 'ArrowDown' && selectMenu.style.display === 'block') {
        e.preventDefault();
        (i === selectAllOption.length - 1 ? i = 0 : i++)
        ordreChoix = selectAllOption[i].textContent
        selectAllOption[i].focus();
        (selectAllOption[i].style.display === 'none' ? selectInput.focus() : console.log(ordreChoix))
      } else if (toucheCode === 'ArrowUp' && selectMenu.style.display === 'block') {
        (i === 0 ? i = selectAllOption.length - 1 : i--)
        e.preventDefault()
        ordreChoix = selectAllOption[i].textContent
        selectAllOption[i].focus();
        (selectAllOption[i].style.display === 'none' ? selectInput.focus() : console.log(ordreChoix))
      } else if (toucheCode === 'Enter' && selectAllOption[i].textContent === 'Popularité' && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        optionMenuChoisie.value = tagPopularite
        selectOptionPopularite.style.display = 'none'
        selectOptionDate.style.display = 'block'
        selectOptionTitre.style.display = 'block'
        select.focus()
      } else if (toucheCode === 'Enter' && selectAllOption[i].textContent === 'Date' && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        optionMenuChoisie.value = tagDate
        selectOptionPopularite.style.display = 'block'
        selectOptionDate.style.display = 'none'
        selectOptionTitre.style.display = 'block'
        select.focus()
      } else if (toucheCode === 'Enter' && selectAllOption[i].textContent === 'Titre' && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        optionMenuChoisie.value = tagTitre
        selectOptionPopularite.style.display = 'block'
        selectOptionDate.style.display = 'block'
        selectOptionTitre.style.display = 'none'
        select.focus()
      } else if (toucheCode === 'Escape' && selectMenu.style.display === 'block') {
        selectMenu.style.display = 'none'
        select.blur()
        document.querySelectorAll('.photo-section__figure')[0].focus()
      }
    })
  })

  // ajout des écouteurs d'évenement sur chaque option
  selectOptionPopularite.addEventListener('click', () => {
    optionMenuChoisie.value = tagPopularite
    selectOptionPopularite.style.display = 'none'
    selectOptionDate.style.display = 'block'
    selectOptionTitre.style.display = 'block'
    selectMenu.style.display = 'none'
  })
  selectOptionDate.addEventListener('click', () => {
    optionMenuChoisie.value = tagDate
    selectOptionPopularite.style.display = 'block'
    selectOptionDate.style.display = 'none'
    selectOptionTitre.style.display = 'block'
    selectMenu.style.display = 'none'
  })
  selectOptionTitre.addEventListener('click', () => {
    optionMenuChoisie.value = tagTitre
    selectOptionPopularite.style.display = 'block'
    selectOptionDate.style.display = 'block'
    selectOptionTitre.style.display = 'none'
    selectMenu.style.display = 'none'
  })
}
// déclenche la fonction selectordre lors de lancement de ce fichier
selectOrdre()

// appelé dans le fichier médiaFactory.js, il permet de réordonner le tableau mediasatrier qu'il reçoit
export function SelectDeclencheTri (mediasaTrier, photographerName) {
  // par défaut, au chargement l'odre est reglé selon le nombre de like
  // un objet est crée et sa méthode enclenché dans la variable let
  let resultatTrie = new Tri(mediasaTrier).likeDecroissant()
  // la fonction triage est appelé depuis le fichier gestionJsonMedia, elle permet de se mettre en route après avoir réordonné les médias
  triage(resultatTrie, photographerName)
  const selectAllOption = document.querySelectorAll('.option-menu')
  // un evenement au focus est ajouté. si l'id des options de mon menu permettant le tri est dans le focus,
  // alors la touche entré devient réactive et permet de changer
  // l'odre d'affichage des médias
  document.getElementById('idPopularite').addEventListener('focus', (e) => {
    document.addEventListener('keydown', (e) => {
      const toucheCode = e.key
      if (toucheCode === 'Enter' && document.hasFocus && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        if (document.querySelector('div.section__enveloppe') !== null) {
          document.querySelector('div.section__enveloppe').remove()
        }
        resultatTrie = new Tri(mediasaTrier).likeDecroissant()
        triage(resultatTrie, photographerName)
      }
    })
  })
  document.getElementById('idDate').addEventListener('focus', (e) => {
    document.addEventListener('keydown', (e) => {
      const toucheCode = e.key
      if (toucheCode === 'Enter' && document.hasFocus && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        if (document.querySelector('div.section__enveloppe') !== null) {
          document.querySelector('div.section__enveloppe').remove()
        }
        resultatTrie = new Tri(mediasaTrier).dateDecroissant()
        triage(resultatTrie, photographerName)
      }
    })
  })
  document.getElementById('idTitre').addEventListener('focus', (e) => {
    document.addEventListener('keydown', (e) => {
      const toucheCode = e.key
      if (toucheCode === 'Enter' && document.hasFocus && document.querySelector('.like__icone-aime:focus') === null && document.querySelector('.input__envoyer-bouton:focus') === null) {
        if (document.querySelector('div.section__enveloppe') !== null) {
          document.querySelector('div.section__enveloppe').remove()
        }
        resultatTrie = new Tri(mediasaTrier).alphabetiqueCroissant()
        triage(resultatTrie, photographerName)
      }
    })
  })
  // ajout d'écouteur d'évenement à chaque element retourné de selectAllOption
  // l'element est selectionné grace au n° d'index communiqué entre ses crochets
  selectAllOption[0].addEventListener('click', () => {
    // pour afficher les médias nouvellement ordonné, les anciens sont effacé
    if (document.querySelector('div.section__enveloppe') !== null) {
      document.querySelector('div.section__enveloppe').remove()
      // la variable resultatTrie est mis à jour avec un nouvel objet retournant le tableau trié des médias
      // puis la fonction triage récupère le tableau trié, elle est appelé ici depuis gestionJsonMedias.js
    } resultatTrie = new Tri(mediasaTrier).likeDecroissant(); triage(resultatTrie, photographerName)
  })
  selectAllOption[1].addEventListener('click', () => {
    if (document.querySelector('div.section__enveloppe') !== null) {
      document.querySelector('div.section__enveloppe').remove()
    } resultatTrie = new Tri(mediasaTrier).dateDecroissant(); triage(resultatTrie, photographerName)
  })
  selectAllOption[2].addEventListener('click', () => {
    if (document.querySelector('div.section__enveloppe') !== null) {
      document.querySelector('div.section__enveloppe').remove()
    }
    resultatTrie = new Tri(mediasaTrier).alphabetiqueCroissant(); triage(resultatTrie, photographerName)
  })

  // navigation au clavier, situé dans la fonction triage pour éviter les undefined
  navigationClavierGalerie()
}
