import { chargement, urlImageMiniature } from './functions.js'

// permet de modifier le chiffre de l'index par rapport à la totalité des élements de l'ensemble des médias
// ici, diminu le chiffre
function gaucheRecule (indexMouvementModifie, mediasParents) {
  (indexMouvementModifie > 0 ? indexMouvementModifie-- : indexMouvementModifie = mediasParents.length - 1)
  return indexMouvementModifie
}
// ici, augmente le chiffre
function droiteAvance (indexMouvementModifie, mediasParents) {
  (indexMouvementModifie < mediasParents.length - 1 ? indexMouvementModifie++ : indexMouvementModifie = 0)
  return indexMouvementModifie
}

// appelé dans la fonction interactionClavierSouris, cela
// permet de verifier si la vidéo est vrai pour rajouter dans le dom, la balise video adéquate, ou la supprime et rajoute a la place
// la balise image, les arguments sont rempli à travers la fonction interactionClavierSouris, qui les récupères depuis la classe MediaBuilder,
// la ou interactionClavierSouris est appelée.
function lightboxMove (videoVerification, srcImg, srcVideo, titre, lightboxVideo, lightbox, imageLightbox, lightboxVideoSource, lightboxTitre, lightboxCaption) {
  if (videoVerification) {
    lightbox.appendChild(lightboxVideo)
    imageLightbox.remove()
    lightboxVideoSource.setAttribute('src', srcVideo)
    lightboxTitre.innerText = titre
    lightboxCaption.appendChild(lightboxTitre)
    lightbox.appendChild(lightboxCaption)
  } else {
    imageLightbox.setAttribute('src', srcImg)
    imageLightbox.addEventListener('onload', chargement(imageLightbox, srcImg, urlImageMiniature(srcImg), 'lightBox-element__photo--flou'))
    lightboxTitre.innerText = titre
    lightboxVideo.remove()
    lightbox.appendChild(imageLightbox)
    lightboxCaption.appendChild(lightboxTitre)
    lightbox.appendChild(lightboxCaption)
  }
}
// permet de se mouvoir au sein de la lightbox a la souris ou au clavier. Les arguments recupere l'idImage que lui transmet
// la classe MediaBuilder depuis sa méthode lightbox() ainsi que d'autre propriété pour pouvoir constuire la lightbox
// dynamiquement selon le retour de l'index (idImage)

export function interactionClavierSouris (idImage,
  surname,
  mediasParents,
  videoVerification,
  lightboxVideo,
  lightbox,
  imageLightbox,
  lightboxVideoSource,
  lightboxTitre,
  lightboxCaption,
  parentLightbox) {
  let indexMouvementModifie = idImage

  // selectionne les boutons gauche et droite de la lightbox
  const gauche = document.querySelector('#idGauche')
  const droite = document.querySelector('#idDroite')

  // detecte si une touche du clavier est pressée
  document.addEventListener('keydown', (e) => {
    const toucheCode = e.key
    // analyse le retour du code de l'evenement detecté de la touche et la compare au code correspondant à la touche que nous attendons.
    if (toucheCode === 'ArrowRight') {
      // si touche droite, l'index est modifié en appelant la fonction droiteAvance vu plus haut
      indexMouvementModifie = droiteAvance(indexMouvementModifie, mediasParents);
      // met à jour la variable videoVerification selon ce que retourne la propriete video, s'il retourne autre chose que undefined
      // alors vrai et vice et versa
      (mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false)
      // met à jour les sources selon la position de l'index pour être tranmises dans la fonction lightboxMove ci-dessous
      const imgSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].image}`
      const videoSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].video}`
      const titre = `${mediasParents[indexMouvementModifie].title}`
      lightboxMove(
        videoVerification,
        imgSrc,
        videoSrc,
        titre,
        lightboxVideo,
        lightbox,
        imageLightbox,
        lightboxVideoSource,
        lightboxTitre,
        lightboxCaption)
      // si la touche gauche est enclenché, nous remettons à jour les valeurs en relançant la fonction gaucheRecule et en réassignant
      // son retour, qui est le chiffre de l'index modifié, à la variable indexMouvementModifie
    } else if (toucheCode === 'ArrowLeft') {
      indexMouvementModifie = gaucheRecule(indexMouvementModifie, mediasParents);
      (mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false)
      const imgSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].image}`
      const videoSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].video}`
      const titre = `${mediasParents[indexMouvementModifie].title}`

      lightboxMove(
        videoVerification,
        imgSrc,
        videoSrc,
        titre,
        lightboxVideo,
        lightbox,
        imageLightbox,
        lightboxVideoSource,
        lightboxTitre,
        lightboxCaption)
    } else if (toucheCode === 'Escape') {
      // si la touche echap est enclenché, nous attribuons la classe invisble au parent de la lightbox et nous effacons l'élément enfant du DOM
      parentLightbox.className = 'lightBox__section__bouton--invisible'; document.querySelector('.lightBox-element').remove()
    }
  })

  // le shema est repeté et mis a jour cette fois-ci selon le bouton déclenché de la lightbox au click de la souris
  droite.addEventListener('click', () => {
    indexMouvementModifie = droiteAvance(indexMouvementModifie, mediasParents);
    (mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false)

    const imgSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].image}`
    const videoSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].video}`
    const titre = `${mediasParents[indexMouvementModifie].title}`
    lightboxMove(
      videoVerification,
      imgSrc,
      videoSrc,
      titre,
      lightboxVideo,
      lightbox,
      imageLightbox,
      lightboxVideoSource,
      lightboxTitre,
      lightboxCaption)
  })

  gauche.addEventListener('click', () => {
    indexMouvementModifie = gaucheRecule(indexMouvementModifie, mediasParents);
    (mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false)
    const imgSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].image}`
    const videoSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].video}`
    const titre = `${mediasParents[indexMouvementModifie].title}`

    lightboxMove(
      videoVerification,
      imgSrc,
      videoSrc,
      titre,
      lightboxVideo,
      lightbox,
      imageLightbox,
      lightboxVideoSource,
      lightboxTitre,
      lightboxCaption)
  }
  );
  // chargé au lancement de la lightbox. la fonction traite les valeurs et l'index au premier affichage provoqué par le clique de l'image depuis la galerie
  (mediasParents[indexMouvementModifie].video !== undefined ? videoVerification = true : videoVerification = false)
  const imgSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].image}`
  const videoSrc = `assets/images/${surname}/${mediasParents[indexMouvementModifie].video}`
  const titre = `${mediasParents[indexMouvementModifie].title}`

  lightboxMove(
    videoVerification,
    imgSrc,
    videoSrc,
    titre,
    lightboxVideo,
    lightbox,
    imageLightbox,
    lightboxVideoSource,
    lightboxTitre,
    lightboxCaption)
}
