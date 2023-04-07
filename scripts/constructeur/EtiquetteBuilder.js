
export class EtiquetteBuilder {
  constructor (prix, mediasIdIndex, mediasIdLike, mediasTitre) {
    this.prix = prix
    this.mediasIdIndex = mediasIdIndex
    this.mediasIdLike = mediasIdLike
    this.mediasTitre = mediasTitre
  }

  etiquetteLikePrix () {
    const etiquette = document.createElement('div')
    const totalCoeur = document.createElement('div')
    const prix = document.createElement('div')

    etiquette.setAttribute('class', 'photographe-etiquette')
    totalCoeur.setAttribute('class', 'photographe-etiquette__coeur')
    prix.setAttribute('class', 'photographe-etiquette__prix')
    prix.innerHTML = `${this.prix}€ / jour`
    let likeTotal = 0
    for (let i = 0; i < this.mediasIdIndex.length; i++) {
      const imgTitre = "'" + this.mediasTitre[i] + "'"
      const imgTitreAlt = document.querySelector(`img[alt=${imgTitre}]`)
      const groupeDivLike = document.getElementById(`${this.mediasTitre[i]}`)
      const divLikes = document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`)
      const divClickLike = document.getElementById(`bouton-icone-aime-${this.mediasIdIndex[i]}`)
      divLikes.textContent = `${this.mediasIdLike[i]}`
      divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
      let clique = false
      likeTotal += parseInt(document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`).textContent)
      totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`

      divClickLike.addEventListener('click', () => {
        (!clique ? clique = true : clique = false)
        if (clique) {
          imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]} aimée`)
          groupeDivLike.id += ' aimée'
          console.log(groupeDivLike)
          likeTotal += 1; divLikes.textContent = `${this.mediasIdLike[i] + 1} `; divClickLike.innerHTML = "<i class='fa-solid fa-heart fa-heart-margin'></i>"
          totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`
        } else {
          imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]}`)
          groupeDivLike.id = groupeDivLike.id.split(' ', 1)
          divLikes.textContent = `${this.mediasIdLike[i]} `
          likeTotal -= 1
          divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
          totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`
        }
      })
    }

    etiquette.appendChild(totalCoeur)
    etiquette.appendChild(prix)
    return (etiquette)
  }
}
