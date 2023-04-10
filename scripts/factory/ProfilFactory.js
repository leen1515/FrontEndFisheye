import { garderPrenom } from '../utils/functions.js'

export function ProfilFactory (nameId) {
  const surname = garderPrenom(nameId)
  return surname
}
