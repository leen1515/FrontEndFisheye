import { PhotographerBuilder } from '../constructeur/PhotographerBuilder.js'
import { navigationClavierIndex } from '../utils/navigationClavier.js'

async function getPhotographers () {
  const photographersJson = await fetch('./data/photographers.json') // lecture du lien json
  const photographers = await photographersJson.json() // promet un objet json
  return photographers
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer-section')

  photographers.forEach((photographer, index) => {
    // mets les valeurs spécifique à chaque photographe contenu dans le tableau photographer dans de nouvelles constantes
    const { name, id, tagline, city, country, price, portrait } = photographer
    // pour chaque photographe, une carte est construite avec comme argument, les constantes utilisés par chaque photographe
    const photographerModel = new PhotographerBuilder(name, id, tagline, city, country, price, portrait, index)
    // l'objet créé pour chaque photographe est mis dans une constante, nous appelons ainsi la methode pour construire la carte du photographe
    const userCardDOM = photographerModel.getUserCardDOM()
    // elle retourne un element div créé, qui est ensuite ajouté à la section des photographes dans le DOM.
    photographersSection.appendChild(userCardDOM)
    navigationClavierIndex(id, index)
  })
}

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
