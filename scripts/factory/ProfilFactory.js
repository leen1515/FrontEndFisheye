import { garderPrenom } from '../utils/functions.js'

export class ProfilFactory {
  constructor (nameId) {
    this.name = nameId
  }

  surnameIsole () {
    const surname = garderPrenom(this.name)
    return surname
  }
}
