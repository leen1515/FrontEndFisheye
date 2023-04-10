
import { PhotographerBuilder } from '../constructeur/PhotographerBuilder.js'
import { MediaBuilder } from '../constructeur/MediaBuilder.js'
import { recupereIdUrl } from '../utils/functions.js'
import { EtiquetteBuilder } from '../constructeur/EtiquetteBuilder.js'
import { ModalContactBuilder } from '../constructeur/ModalContactBuilder.js'
import { navigationClavierModal, navigationClavierEchap } from '../utils/navigationClavier.js'
import { ProfilFactory } from '../factory/profilFactory.js'
import { MediaFactory } from '../factory/mediaFactory.js'
import { SelectDeclencheTri } from '../utils/triageMedias.js'

async function getPhotographers () {
  const photographersJson = await fetch('./data/photographers.json') // lecture du lien json
  const photographers = await photographersJson.json() // promet un objet json
  return photographers
}
// selectionne les éléments du dom qui seront utilisé pour accueillir les divs créées.
// la section des photos
const mediaSection = document.querySelector('.photos-section')
// la section de la modal
const modalSection = document.querySelector('.contact_modal')

async function displayData (photographers, medias) {
  // selectionne la div dans le dom correspondant au parent de la banniere créée
  const photographeHeader = document.querySelector('.photographe-header')
  // reccueille l'url de la page sur laquel nous nous situons
  const urlAffiche = window.location.href
  // cette fonction filtre l'url pour ne récupérer que l'id dans une constante
  const recupeIdLien = recupereIdUrl(urlAffiche)
  // filtre les données medias pour retourner uniquement l'ensemble des medias dont l'id photographe correspond à l'id de l'url récuperé
  const mediasId = medias.filter((mediaId) => mediaId.photographerId === parseInt(recupeIdLien))
  // retourne avec la methode js uniquement le photographe dont l'id correspond à l'id récuperé de l'url
  const idPhotographe = photographers.find((photographe) => photographe.id === parseInt(recupeIdLien))
  // récupère le nom du photographe correspondant à l'id de l'url.
  const photographerName = idPhotographe.name

  // parcours le tableau avec la methode forEach de js afin de créer un objet bannière pour chaque photographe, comprenant les proprietés lui
  // correspondant
  new Array(idPhotographe).forEach((chaquePhotographe) => {
    const { name, id, tagline, city, country, price, portrait } = chaquePhotographe
    const photographerBanniereModel = new PhotographerBuilder(name, id, tagline, city, country, price, portrait)
    const userBanniereCardDOM = photographerBanniereModel.getUserBanniereCardDOM()
    // la banniere de chaque photographe sera ajouté en haut du dom
    photographeHeader.appendChild(userBanniereCardDOM)

    // la modale est construite avec comme argument la propriété name pour chaque photographe
    const modalModel = new ModalContactBuilder(name).formulaireContact()
    // elle est ajouté à la section correspondante
    modalSection.appendChild(modalModel)
    // pour chaque photographe une gestion de tri sera ajouté, elle prend comme argument la propriete mediasId qui est un tableau retourné de
    // l'ensemble des propriete de chaque medias. ainsi que le nom correspondant au photographe de la page.
    SelectDeclencheTri(mediasId, photographerName)
  }
  )
}
// la fonction triage s'occupe de traiter le tableau retourné de l'ensemble des medias avant de l'envoyer au tri.
export function triage (trierMedias, photographerNameTransfert) {
  // constante global pour push les tableaux de nouvelles élèments, utilisé pour gerer le nombre de like et leur total.
  const mediasIdLikes = []
  const mediasIdIndex = []
  const mediasTitre = []
  let prix
  const photosEnveloppe = document.createElement('div')
  photosEnveloppe.setAttribute('class', 'section__enveloppe')
  trierMedias.forEach((media, index, mediasParents) => {
    // usage du destructuring pour enregistrer dans les constantes les valeurs du tableau media
    const { id, photographerId, title, image, video, likes, date, price } = media
    prix = price
    // a chaque média, son like est lu, puis ajouté au tableau mediasIdLikes
    mediasIdLikes.push(likes)
    mediasIdIndex.push(index)
    mediasTitre.push(title)
    // une nouvelle donnée est construite pour ne garder que le prenom de l'ensemble nom/prenom du photographe. Utile pour indiquer les urls
    // des images.
    const photographeIdentification = ProfilFactory(photographerNameTransfert)
    // deux données retourne deux valeurs, un media et une booleenne. soit l'image est non défini, et cela retourne un media video et une valeur true,
    // soit il s'agit de l'inverse.
    const mediaVideoOuPhoto = MediaFactory(image, video)
    // cree un objet pour chaque photo en lui faisant passer en argument leurs parametres
    const mediaModel = new MediaBuilder(mediasParents, index, id, photographerId, title, mediaVideoOuPhoto, likes, date, price, photographeIdentification)
    // construit les photos dans la galerie pour chaque photographe et les ajoute dans le dom
    const mediaDom = mediaModel.getPhotoDOM()

    photosEnveloppe.appendChild(mediaDom)
    mediaSection.appendChild(photosEnveloppe)
  }
  )
  // l'étiquette est sortie de la boucle des médias car il s'agit d'une seule étiquette par photographe, néanmoins, les tableaux sont au passage
  // récupérés et mis en argument, elles ont été remplies par la boucle précédente.
  // le tableau titre est récupéré et transmise aussi dans les arguments de l'etiquette car elle gère aussi l'interaction avec les likes de chaque
  // media.
  const etiquetteModel = new EtiquetteBuilder(prix, mediasIdIndex, mediasIdLikes, mediasTitre).etiquetteLikePrix()
  // à chaque fois que la fonction triage sera appellée, une etiquette sera ajouté a la page du photographe.
  // Elle est appele dans la fonction selectDeclencheTri, qui elle même est appelé plus haut, dans la boucle qui parcourt le tableau
  // des photographes. Ainsi, chaque photographe à son étiquette selon ses propres propriétées.
  mediaSection.appendChild(etiquetteModel)
}
// navigation au clavier
navigationClavierModal()
navigationClavierEchap()
async function init () {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers()
  displayData(photographers, media)
}

init()
