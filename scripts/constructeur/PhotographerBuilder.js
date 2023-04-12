import { chargement, urlImageMiniature, displayModal } from '../utils/functions.js'
import { navigationClavierIndex } from '../utils/navigationClavier.js'

// création de la classe model de la bannière du photographe, construit et associe les proprietes
export class PhotographerBuilder {
  constructor (nameId, id, tagline, city, country, price, portrait, index) {
    this.name = nameId
    this.id = id
    this.tagline = tagline
    this.city = city
    this.country = country
    this.price = price
    this.portrait = portrait
    this.index = index
  }

  // création d'une méthode pour réaliser les cartes des photographes sur la page Index.html
  getUserCardDOM () {
    const picture = `assets/photographers/${this.portrait}`

    // creation des élements pour le *DOM
    const article = document.createElement('article')
    const urlPage = document.createElement('a')
    const img = document.createElement('img')
    const text = document.createElement('div')
    const h2 = document.createElement('h2')
    const slogan = document.createElement('p')
    const localisation = document.createElement('p')
    const paragraphe = document.createElement('p')

    // style ajout des classes
    article.setAttribute('class', 'article-photo')
    article.setAttribute('tabindex', this.index)
    article.setAttribute('id', `id-${this.index}`)
    urlPage.setAttribute('class', 'article-photo__lien-vignette')
    img.setAttribute('class', 'lien-vignette__avatar--flou')
    img.setAttribute('alt', ` une photo représentant l'artiste : ${this.name}, son slogan : ${this.tagline}`)
    text.setAttribute('class', 'article-photo__texte-description')
    h2.setAttribute('class', 'texte-decription__h2')
    slogan.setAttribute('class', 'texte-description__slogan')
    localisation.setAttribute('class', 'texte-description__localisation')
    paragraphe.setAttribute('class', 'texte-description__paragraphe')

    // attribut relatif aux variables et url et remplissage des contenus
    urlPage.setAttribute('href', `./photos.html?id=${this.id}`)
    urlPage.setAttribute('alt', `ce lien conduit vers la galerie du photographe ${this.name}`)
    img.setAttribute('src', picture)
    h2.textContent = `${this.name}`
    localisation.textContent = `${this.city}, ${this.country}`
    slogan.textContent = `${this.tagline}`
    paragraphe.textContent = `${this.price}€/jour`
    img.addEventListener('onload', chargement(img, picture, urlImageMiniature(picture)))

    navigationClavierIndex(this.id, this.index)
    // ajout des éléments les uns aux autres jusqu'au *DOM
    urlPage.appendChild(img)
    article.appendChild(urlPage)
    text.appendChild(h2)
    text.appendChild(localisation)
    text.appendChild(slogan)
    text.appendChild(paragraphe)
    article.appendChild(text)
    return (article)
  }

  // création de la méthode pour créer la bannière au dessus de la page de chaque photographe spécifique
  getUserBanniereCardDOM () {
    const picture = `assets/photographers/${this.portrait}`

    // creation des élements pour le *DOM
    const banniere = document.createElement('div')
    const h1 = document.createElement('h1')
    const text = document.createElement('div')
    const paragraphe = document.createElement('p')
    const location = document.createElement('p')
    const buttonContact = document.createElement('div')
    const divAvatar = document.createElement('div')
    const avatar = document.createElement('img')

    // style ajout des classes
    banniere.setAttribute('class', 'banniere-entete')
    banniere.setAttribute('tabindex', 0)
    h1.setAttribute('class', 'texte__nom')
    text.setAttribute('class', 'banniere__texte')
    paragraphe.setAttribute('class', 'texte__slogan')
    location.setAttribute('class', 'texte__location')
    buttonContact.setAttribute('class', 'contact_button')
    divAvatar.setAttribute('class', 'article-photo__lien-vignette')
    avatar.setAttribute('class', 'lien-vignette__avatar--flou')
    avatar.setAttribute('alt', `une photographie représentant l'artiste selectionné : ${this.name}`)

    buttonContact.setAttribute('tabindex', 0)
    buttonContact.setAttribute('name', 'Contact Me')
    buttonContact.addEventListener('click', displayModal)

    // style ajout des Ids aux vignettes correspondant au photographe parcouru
    avatar.setAttribute('id', `lien-vignette__avatar-${this.id}`)

    // attribut relatif aux variables et url et remplissage des contenus
    avatar.setAttribute('src', `${urlImageMiniature(picture)}_m.jpg`)
    avatar.setAttribute('data-src', picture)
    buttonContact.textContent = 'Contactez-moi'
    h1.textContent = this.name
    paragraphe.textContent = `${this.tagline}`
    location.textContent = `${this.city}, ${this.country}`

    avatar.addEventListener('onload', chargement(avatar, picture, urlImageMiniature(picture)))

    // ajout des éléments les uns aux autres jusqu'au *DOM

    banniere.appendChild(text)
    text.appendChild(h1)
    text.appendChild(location)
    text.appendChild(paragraphe)
    banniere.appendChild(buttonContact)
    divAvatar.appendChild(avatar)
    banniere.appendChild(divAvatar)

    // retourne l'element div parent pour qu'il soit rajouté à la création de chaque page du photographe du coté de gestionJsonMedia.js
    return (banniere)
  }
}
