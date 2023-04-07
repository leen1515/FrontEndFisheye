
import { PhotographerBuilder } from '../constructeur/PhotographerBuilder.js'
import { MediaBuilder } from '../constructeur/MediaBuilder.js'
import { recupereIdUrl } from '../utils/functions.js'
import { EtiquetteBuilder } from '../constructeur/EtiquetteBuilder.js'
import { ModalContactBuilder } from '../constructeur/ModalContactBuilder.js'
// import { LikeFactory } from '../factory/likeFactory.js'
import { ProfilFactory } from '../factory/profilFactory.js'
import { MediaFactory } from '../factory/mediaFactory.js'
import { SelectDeclencheTri } from '../utils/triageMedias.js'

async function getPhotographers () {
  const photographersJson = await fetch('./data/photographers.json') // lecture du lien json
  const photographers = await photographersJson.json() // promet un objet json
  return photographers
}

const mediaSection = document.querySelector('.photos-section')
const modalSection = document.querySelector('.contact_modal')

async function displayData (photographers, medias) {
  const photographeHeader = document.querySelector('.photographe-header')
  const urlAffiche = window.location.href
  const recupeIdLien = recupereIdUrl(urlAffiche)
  const mediasId = medias.filter((mediaId) => mediaId.photographerId === parseInt(recupeIdLien))
  const idPhotographe = photographers.find((photographe) => photographe.id === parseInt(recupeIdLien))
  const photographerName = idPhotographe.name

  new Array(idPhotographe).forEach((chaquePhotographe) => {
    const { name, id, tagline, city, country, price, portrait } = chaquePhotographe
    const photographerBanniereModel = new PhotographerBuilder(name, id, tagline, city, country, price, portrait)
    const userBanniereCardDOM = photographerBanniereModel.getUserBanniereCardDOM()
    photographeHeader.appendChild(userBanniereCardDOM)

    const modalModel = new ModalContactBuilder(name).formulaireContact()
    modalSection.appendChild(modalModel)
    SelectDeclencheTri(mediasId, photographerName)
  }
  )
}

export function triage (trierMedias, photographerNameTransfert) {
  const mediasIdLikes = []
  const mediasIdIndex = []
  const mediasTitre = []
  let prix
  const photosEnveloppe = document.createElement('div')
  photosEnveloppe.setAttribute('class', 'section__enveloppe')
  trierMedias.forEach((media, index, mediasParents) => {
    const { id, photographerId, title, image, video, likes, date, price } = media
    prix = price
    mediasIdLikes.push(likes)
    mediasIdIndex.push(index)
    mediasTitre.push(title)
    const photographeIdentification = new ProfilFactory(photographerNameTransfert).surnameIsole()
    const mediaVideoOuPhoto = new MediaFactory(image, video).videoOuPhoto()
    const mediaModel = new MediaBuilder(mediasParents, index, id, photographerId, title, mediaVideoOuPhoto, likes, date, price, photographeIdentification)
    const mediaDom = mediaModel.getPhotoDOM()

    photosEnveloppe.appendChild(mediaDom)
    mediaSection.appendChild(photosEnveloppe)
  }
  )
  const etiquetteModel = new EtiquetteBuilder(prix, mediasIdIndex, mediasIdLikes, mediasTitre).etiquetteLikePrix()
  mediaSection.appendChild(etiquetteModel)
}

async function init () {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers()
  displayData(photographers, media)
}

init()
