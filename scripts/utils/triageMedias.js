import { installerAttribute } from '../utils/functions.js'
import { triage } from '../gestionJson/gestionJsonMedias.js'

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
// selectOrdre permet de gerer l'affichage et le comportement des boutons filtres
function selectOrdre () {
  const selectOptionPopularite = document.createElement('div')
  const selectOptionDate = document.createElement('div')
  const selectOptionTitre = document.createElement('div')

  const selectMenu = document.querySelector('.select-option')
  const optionMenuChoisie = document.querySelector('.option-menu-choisi')

  installerAttribute(selectOptionPopularite, { role: 'option', class: 'option-menu', 'aria-selected': false })
  installerAttribute(selectOptionDate, { role: 'option', class: 'option-menu', 'aria-selected': false })
  installerAttribute(selectOptionTitre, { role: 'option', class: 'option-menu', 'aria-selected': false })

  const tagPopularite = 'Popularité'
  const tagDate = 'Date'
  const tagTitre = 'Titre'

  selectOptionPopularite.textContent = tagPopularite
  selectOptionDate.textContent = tagDate
  selectOptionTitre.textContent = tagTitre

  selectMenu.appendChild(selectOptionPopularite)
  selectMenu.appendChild(selectOptionDate)
  selectMenu.appendChild(selectOptionTitre)

  // gère le comportement du bouton principal
  optionMenuChoisie.addEventListener('click', () => { (selectMenu.style.display === 'none' ? selectMenu.style.display = 'block' : selectMenu.style.display = 'none') })

  selectOptionPopularite.style.display = 'none'
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
// initialise la fonction seleordre lors de l'appel de ce fichier js
selectOrdre()

// appelé dans le fichier médiaFactory.js, il permet de réordonner le tableau mediasatrier qu'il reçoit
export function SelectDeclencheTri (mediasaTrier, photographerName) {
  // par défaut, au chargement l'odre est selon le nombre de like
  // un objet est crée et sa méthode enclenché dans la variable let
  let resultatTrie = new Tri(mediasaTrier).likeDecroissant()
  // la fonction triage est appelé depuis le fichier gestionJsonMedia, elle permet de se mettre en route après avoir réordonné les médias
  triage(resultatTrie, photographerName)
  const selectAllOption = document.querySelectorAll('.option-menu')
  // ajout d'écouteur d'évenement à chaque element retourné de selectAllOption
  // l'element est selectionné grace au n° d'index que je lui communique entre ses crochets
  selectAllOption[0].addEventListener('click', () => {
    // pour afficher les médias nouvellement ordonné, les anciens sont effacé
    if (document.querySelector('div.section__enveloppe') !== null) {
      document.querySelector('div.section__enveloppe').remove()
      // la variable resultatTrie est mis à jour avec un nouvel objet retournant le tableau trié
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
}
