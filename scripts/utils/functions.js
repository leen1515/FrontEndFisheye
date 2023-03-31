export const urlLien = window.location.href

export function urlImageMiniature (imageM) {
  let i
  let imageChargement = ''
  for (i = imageM.length - 1; i > -1; i--) {
    if (imageM.charAt(i) === '.') { break }
  }
  imageChargement = imageM.substring(0, i)
  return imageChargement
}

export function recupereIdUrl (urlLien) {
  const url = new URL(urlLien)
  const urlSearch = new URLSearchParams(url.search)
  if (urlSearch) {
    const idUrl = url.searchParams.get('id')
    return idUrl
  } else {
    return false
  }
}

export function garderPrenom (name) {
  let i
  let tmp = ''
  for (i = name.length - 1; i > -1; i--) {
    if (name.charAt(i) === ' ') { break }
  }
  tmp = name.substring(0, i)
  return (tmp)
}

export function verificationExtension (fichier) {
  const verif = /\/.mp4$/
  if (verif.test(fichier)) {
    return true
  } else {
    return false
  };
}

export function remplaceVideoImage (video, image) {
  if (video) {
    return video
  } else {
    return image
  }
}

export function conserverMiniatureVideo (video, image, imageMiniature) {
  if (video) {
    return imageMiniature
  } else {
    return image
  }
}

function chargePromise (source) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(source)
      reject(new Error(undefined))
    }, 4000)
  })
}

export function chargement (photo, source, filtreLien, classNom) {
  photo.setAttribute('src', `${filtreLien}_m.jpg`)
  console.log('photo en attente', photo)
  chargePromise(source).then(result => {
    photo.setAttribute('src', source)
    photo.className = classNom
    console.log('photo charge', photo)
    return result
  }).catch(error => {
    photo.setAttribute('src', `${filtreLien}_m.jpg`)
    console.log('photo pas charge', photo)
    return error
  })
}

export function gaucheRecule (indexMouvementModifie, mediasParents) {
  ((indexMouvementModifie > 0) ? indexMouvementModifie-- : indexMouvementModifie = mediasParents.length - 1)
  return indexMouvementModifie
}

export function droiteAvance (indexMouvementModifie, mediasParents) {
  ((indexMouvementModifie < mediasParents.length - 1) ? indexMouvementModifie++ : indexMouvementModifie = 0)
  return indexMouvementModifie
}

export function recupereImageUrl (urlImage) {
  const url = new URL(urlImage)
  const urlSearch = new URLSearchParams(url.search)
  let idUrl = ''
  if (urlSearch) {
    idUrl = url.searchParams.get('image')
  } else {
    idUrl = 0
  }
  return idUrl
}

export function installerParamId (uriImage, paramId, valeurId) {
  const uri = new URLSearchParams(uriImage.search)
  if (uri) { uri.set(paramId, valeurId) }
}

export function totalCompteurLikes (likes) {
  let totalLikes = 0
  likes.forEach((like) => { totalLikes += like })
  return totalLikes
}

export function displayModal () {
  const modalInvisible = document.querySelectorAll('.modal-contact-section--invisible')
  modalInvisible.className = 'modal-contact-section'
}

export function closeModal () {
  const modalVisible = document.querySelector('.modal-contact-section')
  modalVisible.className = 'modal-contact-section--invisible'
}

export function installerAttribute (element, attribut) {
  for (const key in attribut) {
    element.setAttribute(key, attribut[key])
  }
}

export function verificationEmail (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,15}$/g.test(email.value)
}
export function verificationString (text) {
  return /^([a-zA-Z])+$/g.test(text.value)
}
