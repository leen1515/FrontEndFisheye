import { installerAttribute } from './functions.js'
import { triage } from '../gestionJson/gestionJsonMedias.js'
class Tri {
  constructor (media) {
    this.media = media
  }

  likeDecroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return b.likes - a.likes
    })
    return mediaTri
  }

  dateDecroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    return mediaTri
  }

  alphabetiqueCroissant () {
    const mediaTri = this.media.sort((a, b) => {
      return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' })
    })
    return mediaTri
  }
}

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

  selectOptionPopularite.innerHTML = tagPopularite
  selectOptionDate.innerHTML = tagDate
  selectOptionTitre.innerHTML = tagTitre

  selectMenu.appendChild(selectOptionPopularite)
  selectMenu.appendChild(selectOptionDate)
  selectMenu.appendChild(selectOptionTitre)

  optionMenuChoisie.addEventListener('click', () => { (selectMenu.style.display === 'none' ? selectMenu.style.display = 'block' : selectMenu.style.display = 'none') })

  selectOptionPopularite.style.display = 'none'

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

selectOrdre()

export function SelectDeclencheTri (mediasaTrier, photographerName) {
  let resultatTrie = new Tri(mediasaTrier).likeDecroissant()
  triage(resultatTrie, photographerName)
  const selectOption = document.querySelector("input[name='option-choisie']")
  const selectAllOption = document.querySelectorAll('.option-menu')
  console.log('select', selectOption)

  selectAllOption[0].addEventListener('click', () => {
    if (document.querySelector('div.section__enveloppe') !== null) {
      document.querySelector('div.section__enveloppe').remove()
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
    } resultatTrie = new Tri(mediasaTrier).alphabetiqueCroissant(); triage(resultatTrie, photographerName)
  })
}
