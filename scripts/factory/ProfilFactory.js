import { garderPrenom } from '../utils/functions.js'

export class ProfilFactory {
  constructor (nameId, id, tagline, city, country, price, portrait) {
    this.name = nameId
    this.id = id
    this.tagline = tagline
    this.city = city
    this.country = country
    this.price = price
    this.portrait = portrait
  }

  surnameIsole () {
    const surname = garderPrenom(this.name)
    return surname
  }
}
