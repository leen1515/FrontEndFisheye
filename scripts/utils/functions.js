// les fonctions utilitaire réutilisable

// Lis l'url de la barre d'adresse et la place dans une constante
export const urlLien = window.location.href

// prend le nom de l'image et le retourne en tant que nom de sa version miniature
export function urlImageMiniature (imageM) {
  let i
  let imageChargement = ''
  for (i = imageM.length - 1; i > -1; i--) {
    if (imageM.charAt(i) === '.') { break }
  }
  imageChargement = imageM.substring(0, i)
  return imageChargement
}

// recherche le parametre id dans l'url transmis en argument et retourne sa valeur
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

// filtre l'ensemble nom/prenom et ne retourne que le prenom
export function garderPrenom (name) {
  let i
  let tmp = ''
  for (i = name.length - 1; i > -1; i--) {
    if (name.charAt(i) === ' ') { break }
  }
  tmp = name.substring(0, i)
  return (tmp)
}

// réalise une promesse pour gerer le chargement
function chargePromise (source) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(source)
      reject(new Error(undefined))
    }, 1000)
  })
}

// charge la promesse et agit selon ce qu'elle retourne, si elle est undefined, la miniature sera affiché à la place
export function chargement (photo, source, filtreLien, classNom) {
// affiche la miniature en attendant que la source d'origine se charge
  photo.setAttribute('src', `${filtreLien}_m.jpg`)
  chargePromise(source).then(result => {
    photo.setAttribute('src', source)
    photo.className = classNom
    return result
  }).catch(error => {
    photo.setAttribute('src', `${filtreLien}_m.jpg`)
    return error
  })
}

// le tableau likes est parcouru et la somme est calculé avec la methode reduce avant d'être retournée, utilisé dans la classe EtiquetteBuilder
export function totalCompteurLikes (likes) {
  const somme = (accumulator, curr) => accumulator + curr
  const sommeTotal = Array.from(likes).reduce(somme)
  console.log('sg', sommeTotal)
  return sommeTotal
}

// affiche la modale en changeant sa classe
export function displayModal () {
  const modalInvisible = document.querySelector('.modal-contact-section--invisible')
  modalInvisible.className = 'modal-contact-section'
}

// ferme la modale et réinitialise le formulaire
export function closeModal () {
  const formulaire = document.querySelector('form')
  formulaire.reset()
  const modalVisible = document.querySelector('.modal-contact-section')
  modalVisible.className = 'modal-contact-section--invisible'
}

// la fonction installerAtrtribute est codé pour faciliter l'ajout d'attribut nombreux
export function installerAttribute (element, attribut) {
  for (const key in attribut) {
    element.setAttribute(key, attribut[key])
  }
}

// verifie le mail et retourne une valeur boleenne
export function verificationEmail (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,15}$/g.test(email.value)
}

// pour verifier les champs du formulaire
export function verificationString (text) {
  return /^([a-zA-Z])+$/g.test(text.value)
}
