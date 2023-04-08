
// la class construit la structure des proprietes pour les objets par rapport à l'etiquette :
// les proprietes sont le prix, les trois tableaux, index, like et titre
export class EtiquetteBuilder {
  constructor (prix, mediasIdIndex, mediasIdLike, mediasTitre) {
    this.prix = prix
    this.mediasIdIndex = mediasIdIndex
    this.mediasIdLike = mediasIdLike
    this.mediasTitre = mediasTitre
  }

  // une methode pour construire l'element étiquette et gerer le système de like des photos
  etiquetteLikePrix () {
    // creation des balises div
    const etiquette = document.createElement('div')
    const totalCoeur = document.createElement('div')
    const prix = document.createElement('div')

    etiquette.setAttribute('class', 'photographe-etiquette')
    totalCoeur.setAttribute('class', 'photographe-etiquette__coeur')
    prix.setAttribute('class', 'photographe-etiquette__prix')
    prix.innerHTML = `${this.prix}€ / jour`
    // une variable globale à l'exterieur de la boucle pour comptabilisé les likes des utilisateurs et l'utiliser hors de la boucle
    let likeTotal = 0
    // la boucle se répetera autant de fois qu'il y'a d'element index dans le tableau mediasIdIndex
    for (let i = 0; i < this.mediasIdIndex.length; i++) {
      const imgTitre = "'" + this.mediasTitre[i] + "'"
      // la constante imgTitre informe l'attribut alt des images, pour pouvoir, plus bas, rajouté une information quant à son état : aimée ou pas.
      const imgTitreAlt = document.querySelector(`img[alt=${imgTitre}]`)
      // selectionne l'id correspondant au titre en vue de modifier
      const groupeDivLike = document.getElementById(`${this.mediasTitre[i]}`)
      // récupère l'id de chaque media
      const divLikes = document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`)
      // récupère l'id des boutons correspondant à l'index selectionné
      const divClickLike = document.getElementById(`bouton-icone-aime-${this.mediasIdIndex[i]}`)
      // insère dans l'element la valeur correspondante aux nombres de like selon l'index
      divLikes.textContent = `${this.mediasIdLike[i]}`
      // ajoute l'icone coeur vide
      divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
      // informe si l'utilisateur répète son clique ou non : utile dans le cas d'un like et d'un dislike
      // la variable est en dehors des évenements pour pouvoir la mettre à jour
      let clique = false
      // la variable likeTotal s'additionne en lisant la valeur numérique du nombre de like de chaque media tout au long de la boucle
      // au chargement de l'étiquette
      likeTotal += parseInt(document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`).textContent)
      // la balise dans totalCoeur s'écrit avec la variable likeTotal + l'icone
      totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`
      // ajoute un évenement sur le bouton pour liker et gère son comportement
      divClickLike.addEventListener('click', () => {
        // lors du clique de l'utilisateur, si la variable clique est fausse, alors elle devient vrai, sinon, elle devient fausse
        (!clique ? clique = true : clique = false)
        // si la variable clique est vrai : l'attribut alt est enrichi du titre du média + d'un statut aimée
        if (clique) {
          imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]} aimée`)
          // concatene avec la string aimée l'id parent des elements en rapport avec les likes.
          groupeDivLike.id += ' aimée'
          // la variable likeTotal s'additionne lui même avec un +1, le contenu like du media cliqué s'additionne aussi de 1
          // l'icone du coeur change
          likeTotal += 1; divLikes.textContent = `${this.mediasIdLike[i] + 1} `; divClickLike.innerHTML = "<i class='fa-solid fa-heart fa-heart-margin'></i>"
          // dans la balise totalCoeur est écrite la valeur numérique de likeTotal + l'icone coeur
          totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`
        } else {
          // si le clique retourne faux, cela est considéré comme un deuxième clique, donc il s'agit d'un dislike
          imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]}`)
          // l'id du parent div du groupe des élèments likes retire le mot : aimée
          groupeDivLike.id = groupeDivLike.id.split(' ', 1)
          // le text de la div des likes se réinitialise à la valeur du json selon l'index du média récupéré
          divLikes.textContent = `${this.mediasIdLike[i]} `
          // likeTotal se désincrémente à chaque média décliqué
          likeTotal -= 1
          // l'icone du coeur est mis à jour en se vidant
          divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
          // la balise totalCoeur est mis à jour
          totalCoeur.innerHTML = `${likeTotal} <i class='fa-solid fa-heart'></i>`
        }
      })
    }

    etiquette.appendChild(totalCoeur)
    etiquette.appendChild(prix)
    // la totalité est retourné comme élement html pour pouvoir être ajouté avec le fichier gestionJsonMedias.js au DOM
    return (etiquette)
  }
}
