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
    figure.setAttribute('tabindex', `${0}`)
    figure.setAttribute('id', `${this.index}`)
    lienPhoto.setAttribute('class', 'figure__lien-photographie')
    lienPhoto.setAttribute('name', 'Lilac breasted roller, closeup view')
    photo.setAttribute('class', 'lien-photographie__photographies--flou')
    photo.setAttribute('alt', `${this.title}`)
    videoDiv.setAttribute('class', 'lien-photographie__video')
    videoDiv.setAttribute('alt', `${this.title}`)
    figCaption.setAttribute('class', 'figure__legende')
    h2.setAttribute('class', 'legende__h2')
    groupeLike.setAttribute('class', 'legende__like')
    groupeLike.setAttribute('id', `${this.title}`)
    divLikes.setAttribute('class', 'like__nombre-aime')
    divLikes.setAttribute('id', `id-nombre-aime-${this.index}`)
    divLikes.textContent = this.likes
    divClickLike.setAttribute('class', 'like__icone-aime')
    divClickLike.setAttribute('id', `bouton-icone-aime-${this.index}`)
    divClickLike.setAttribute('name', `${this.index}`)
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
      if (toucheCode === 'Enter' && document.hasFocus() && document.querySelector('.contact_button:focus') === null && document.querySelector('.photo-section__figure:focus') !== null && document.querySelector('.modal-contact-section') === null) {
        const indexPhoto = document.querySelector('.photo-section__figure:focus').getAttribute('id')
        parentLightbox.className = 'lightBox__section__bouton'
        this.creerLightbox(indexPhoto)
      }
    })

    h2.textContent = this.title

    let picturePhoto
    let filtreLien
    let source
    // pour ajouter la balise video ou media selon ce que retourne le media
    // si le retour à l'index 1 est faux, il s'agit d'une image, le retour à l'index 0 de media est alors ajouté à l'url
    if (!this.media[1]) {
      picturePhoto = `assets/images/${this.surname}/${this.media[0]}`
      // stocke dans la variable la fonction pour trouver son équivalent en miniature
      filtreLien = urlImageMiniature(picturePhoto)
      source = picturePhoto
      // installe l'attribut src de l'image avec la photo originale
      photo.setAttribute('src', `${source}`)
      // au chargement de la source, la fonction chargement est lancé pour mettre dans l'attribut src le miniature en attendant son chargement au complet
      photo.addEventListener('onload', chargement(photo, source, filtreLien))
      // la balise est ajouté à son parent
      lienPhoto.appendChild(photo)
    } else if (this.media[1]) {
      // si le media retourne vrai, alors il s'agit d'une video, l'url est mis à jour
      videoSource.setAttribute('src', `assets/images/${this.surname}/${this.media[0]}`)
      // la balise source est ajouté à la balise video et l'ensemble rejoint leur parent
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
      const lightboxQuitte = document.createElement('button')
      const imageLightbox = document.createElement('img')
      const lightboxVideo = document.createElement('video')
      const lightboxVideoSource = document.createElement('source')
      // style ajout des classes pour l'image
      lightbox.setAttribute('class', 'lightBox-element')
      lightbox.setAttribute('tabindex', 1)
      lightbox.setAttribute('aria-label', 'image closeup view')
      lightboxCaption.setAttribute('class', 'lightBox-element__description')
      lightboxTitre.setAttribute('class', 'description__h3')
      lightboxTitre.setAttribute('tabindex', 0)
      lightboxQuitte.setAttribute('class', 'lightBox-quitter')
      lightboxQuitte.setAttribute('name', 'Close dialog')
      imageLightbox.setAttribute('class', 'lightBox-element__photo--flou')
      imageLightbox.setAttribute('alt', this.title)
      lightboxVideo.textContent = this.title
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
      if (videoVerification) {
        lightboxVideo.appendChild(lightboxVideoSource)
      }
      imageLightbox.setAttribute('class', 'lightBox-element__photo--flou')
      lightboxSection.appendChild(lightbox)
    }
  };
}
