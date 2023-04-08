import { chargement, urlImageMiniature } from '../utils/functions.js'
import { interactionClavierSouris } from '../utils/lightboxMove.js'

// création de la classe pour former les proprietes des objets qui seront utilisées pour la construction de la galerie et de la lightbox
export class MediaBuilder {
  constructor (mediasParents, index, id, photographerId, title, media, likes, date, price, surname) {
    this.mediasParents = mediasParents
    this.index = index
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.media = media
    this.likes = likes
    this.date = date
    this.price = price
    this.surname = surname
  }

  // méthode pour construire chaque média au sein de la galerie
  getPhotoDOM () {
    // construction des balises qui formeront chacune des photos affichées dans la galerie.
    const figure = document.createElement('figure')
    const photo = document.createElement('img')
    const videoDiv = document.createElement('video')
    const videoSource = document.createElement('source')
    const figCaption = document.createElement('figcaption')
    const h2 = document.createElement('h2')
    const groupeLike = document.createElement('div')
    const divLikes = document.createElement('div')
    const divClickLike = document.createElement('div')
    const lienPhoto = document.createElement('div')

    // style ajout des classes
    figure.setAttribute('class', 'photo-section__figure')
    // ajout de l'attribut tabindex dans la balise figure pour maitriser la navigation clavier par la touche tabulation
    figure.setAttribute('tabindex', `${this.index + 1}`)
    lienPhoto.setAttribute('class', 'figure__lien-photographie')
    photo.setAttribute('class', 'lien-photographie__photographies--flou')
    photo.setAttribute('alt', `${this.title}`)
    videoDiv.setAttribute('class', 'lien-photographie__video')
    figCaption.setAttribute('class', 'figure__legende')
    h2.setAttribute('class', 'legende__h2')
    groupeLike.setAttribute('class', 'legende__like')
    groupeLike.setAttribute('id', `${this.title}`)
    divLikes.setAttribute('class', 'like__nombre-aime')
    divLikes.setAttribute('id', `id-nombre-aime-${this.index}`)
    divClickLike.setAttribute('class', 'like__icone-aime')
    divClickLike.setAttribute('id', `bouton-icone-aime-${this.index}`)
    // récupère la div de la lightbox, qui est invisible tant que non cliqué.
    const parentLightbox = document.querySelector('.lightBox__section__bouton--invisible')

    // ajout de l'interaction au clique et au clavier pour déclencher la méthode this.creerlightbox de notre class. Nous y transmettons le parametre
    // this.index en argument.
    lienPhoto.addEventListener('click', () => { parentLightbox.className = 'lightBox__section__bouton'; this.creerLightbox(this.index) })
    document.addEventListener('keydown', (e) => {
      const toucheCode = e.key // récupère l'evenement de la touche et compare le code qu'elle retourne. Si ce dernier est égal à Entrer, et
      // que le focus est actif, alors nous sélectionnons la classe css des photos qui subissent le focus. Ainsi nous pouvons récuperer
      // l'index correspondant à son attribut tabindex et nous la transmettons en parametre dans la méthode appelée this.creerLightbox.
      // L'image dont le focus est actif s'ouvre dans la lightbox lorsque nous appuyons sur la touche Entrée.
      if (toucheCode === 'Enter' && document.hasFocus()) {
        const indexPhoto = document.querySelector('.photo-section__figure:focus').getAttribute('tabindex')
        parentLightbox.className = 'lightBox__section__bouton'; this.creerLightbox(indexPhoto - 1)
      }
    })

    h2.textContent = this.title

    let picturePhoto
    let filtreLien
    let source
    if (!this.media[1]) {
      picturePhoto = `assets/images/${this.surname}/${this.media[0]}`
      filtreLien = urlImageMiniature(picturePhoto)
      source = picturePhoto
      photo.setAttribute('src', `${source}`)
      photo.addEventListener('onload', chargement(photo, source, filtreLien, 'lien-photographie__photographies'))
      lienPhoto.appendChild(photo)
    } else if (this.media[1]) {
      videoSource.setAttribute('src', `assets/images/${this.surname}/${this.media[0]}`)
      videoDiv.appendChild(videoSource)
      lienPhoto.appendChild(videoDiv)
    }
    // ajout des éléments les uns aux autres jusqu'au DOM
    figure.appendChild(lienPhoto)
    figCaption.appendChild(h2)
    figCaption.appendChild(groupeLike)
    groupeLike.appendChild(divLikes)
    groupeLike.appendChild(divClickLike)
    figure.appendChild(figCaption)

    return (figure)
  }

  // réalisation de la méthode pour creer la lightbox au clique sur l'image. La propriété lié à l'index de l'image lui est communiqué en argument
  creerLightbox (idImage) {
    // vérifie ce que retourne la propriete media pour savoir si à l'index idImage il s'agit d'une vidéo ou d'une image
    let videoVerification
    if (this.media[1]) {
      videoVerification = true
    } else {
      videoVerification = false
    }
    // selectionne les boutons déjà présents dans le DOM
    const parentLightbox = document.querySelector('.lightBox__section__bouton')

    // verifie si la classe .lightbox-element n'existe pas pour creer les balises nécéssaire à la construction de la lightbox
    if (!document.querySelector('.lightBox-element')) {
      // creation des élements pour le DOM
      const lightboxSection = document.querySelector('.lightBox__section')
      const lightbox = document.createElement('figure')
      const lightboxCaption = document.createElement('figcaption')
      const lightboxTitre = document.createElement('h3')
      const lightboxQuitte = document.createElement('div')
      const imageLightbox = document.createElement('img')
      const lightboxVideo = document.createElement('video')
      const lightboxVideoSource = document.createElement('source')
      // style ajout des classes pour l'image
      lightbox.setAttribute('class', 'lightBox-element')
      lightboxCaption.setAttribute('class', 'lightBox-element__description')
      lightboxTitre.setAttribute('class', 'description__h3')
      lightboxQuitte.setAttribute('class', 'lightBox-quitter')
      imageLightbox.setAttribute('class', 'lightBox-element__photo--flou')

      // attribut relatif aux variables et url et remplissage des contenus
      lightboxQuitte.innerHTML = "<i class='fa-solid fa-xmark fa-4x'></i>"
      lightboxQuitte.addEventListener('click', () => { parentLightbox.className = 'lightBox__section__bouton--invisible'; document.querySelector('.lightBox-element').remove() })
      lightbox.appendChild(lightboxQuitte)

      // appel de la fonction interactionClavierSouris pour la navigation dans la lightbox, tranmission des proprietes necessaires aux fonctionnement de la lightbox en argument
      interactionClavierSouris(
        idImage,
        this.surname,
        this.mediasParents,
        videoVerification,
        lightboxVideo,
        lightbox,
        imageLightbox,
        lightboxVideoSource,
        lightboxTitre,
        lightboxCaption,
        parentLightbox)

      // ajout au 1er chargement de la lightbox des attributs necessaires + son installation dans le dom
      lightboxVideo.controls = true
      lightboxVideo.setAttribute('width', '90%')
      lightboxVideoSource.setAttribute('type', 'video/mp4')
      lightboxVideo.setAttribute('class', 'lightBox-element__video')
      lightboxVideo.appendChild(lightboxVideoSource)
      imageLightbox.setAttribute('class', 'lightBox-element__photo--flou')
      lightboxSection.appendChild(lightbox)
    }
  };
}
