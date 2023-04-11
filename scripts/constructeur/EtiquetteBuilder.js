
// la class construit la structure des proprietes pour les objets par rapport à l'etiquette :
// les proprietes sont le prix, les trois tableaux, index, like et titre
export class EtiquetteBuilder {
  constructor (prix, mediasIdIndex, mediasIdLike, mediasTitre, likeClavier) {
    this.prix = prix
    this.mediasIdIndex = mediasIdIndex
    this.mediasIdLike = mediasIdLike
    this.mediasTitre = mediasTitre
    this.likeClavier = likeClavier
  }

  // une methode pour construire l'element étiquette et gerer le système de like des photos
  etiquetteLikePrix () {
    // creation des balises div
    const etiquette = document.createElement('div')
    const totalCoeur = document.createElement('div')
    const prix = document.createElement('div')
    const coeurChiffre = document.createElement('div')

    coeurChiffre.setAttribute('class', 'photographe-etiquette__coeur-chiffre')
    coeurChiffre.setAttribute('tabindex', 0)
    coeurChiffre.setAttribute('alt', 'nombre total de photo aimée')
    etiquette.setAttribute('class', 'photographe-etiquette')
    totalCoeur.setAttribute('class', 'photographe-etiquette__coeur')
    prix.setAttribute('class', 'photographe-etiquette__prix')
    prix.innerHTML = `${this.prix}€ / jour`
    prix.setAttribute('tabindex', 0)
    prix.setAttribute('alt', 'Le prix par jour pour le service du photographe')
    // une variable globale à l'exterieur de la boucle pour comptabilisé les likes des utilisateurs et l'utiliser hors de la boucle
    let likeTotal = 0

    // la boucle se répetera autant de fois qu'il y'a d'element index dans le tableau mediasIdIndex
    for (let i = 0; i < this.mediasIdIndex.length; i++) {
      const imgTitre = "'" + this.mediasTitre[i] + "'"
      // la constante imgTitre informe l'attribut alt des images, pour pouvoir, plus bas, rajouté une information quant à son état : aimée ou pas.
      const imgTitreAlt = document.querySelector(`img[alt=${imgTitre}]`)
      const videoTitreAlt = document.querySelector(`video[alt=${imgTitre}]`)
      // récupère l'id de chaque media
      const divLikes = document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`)
      // récupère l'id des boutons correspondant à l'index selectionné
      const divClickLike = document.getElementById(`bouton-icone-aime-${this.mediasIdIndex[i]}`)
      // insère dans l'element la valeur correspondante aux nombres de like selon l'index
      divLikes.textContent = `${this.mediasIdLike[i]}`
      // ajoute l'icone coeur vide
      divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin' aria-label=”likes”></i>"
      divClickLike.setAttribute('tabindex', 0)
      // informe si l'utilisateur répète son clique ou non : utile dans le cas d'un like et d'un dislike
      // la variable est en dehors des évenements pour pouvoir la mettre à jour
      let clique = false
      // la variable likeTotal s'additionne en lisant la valeur numérique du nombre de like de chaque media tout au long de la boucle
      // au chargement de l'étiquette
      likeTotal += parseInt(document.getElementById(`id-nombre-aime-${this.mediasIdIndex[i]}`).textContent)
      // la balise dans totalCoeur s'écrit avec la variable likeTotal + l'icone

      totalCoeur.innerHTML = " <i class='fa-solid fa-heart' aria-label=”likes”></i>"
      coeurChiffre.textContent = `${likeTotal}`

      // pour maitriser le focus entre l'image et la partie like => cela permet de sauter d'image en image avec la touche Tab
      document.addEventListener('keydown', (e) => {
        const toucheCode = e.key
        if (toucheCode === 'Tab' && document.hasFocus() && document.querySelector('.select-menu:focus') === null && document.querySelectorAll('.like__icone-aime:focus')[i]) {
          document.querySelectorAll('figure')[i].addEventListener('blur', () => {
            document.querySelectorAll('.like__icone-aime')[i].focus()
          })
          document.querySelectorAll('.like__icone-aime')[i].addEventListener('blur', () => {
            document.querySelectorAll('figure')[i + 1].focus()
          })
        } else if (toucheCode === 'Tab' && document.hasFocus() && document.querySelector('.photographe-etiquette__prix:focus') !== null) {
          document.querySelector('.photographe-etiquette__prix:focus').blur()
          document.querySelector('.logo').focus()
        }
      })

      // ajoute un évenement sur le bouton pour liker et gère son comportement
      divClickLike.addEventListener('click', (e) => {
        e.preventDefault()
        // verification au clique de chaque contenu du nombre de like, dans le cas ou l'utilisateur aurait aimée une photo avec le clavier
        let likeTotalVerifierAuClique = 0
        for (let i = 0; i < document.querySelectorAll('.like__nombre-aime').length; i++) {
          likeTotalVerifierAuClique += parseInt(document.querySelectorAll('.like__nombre-aime')[i].textContent)
        };

        // lors du clique de l'utilisateur, si la variable clique est fausse, alors elle devient vrai, sinon, elle devient fausse
        if (imgTitreAlt) {
          (!clique && imgTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée` ? clique = true : clique = false)
        } else if (videoTitreAlt) {
          (!clique && videoTitreAlt.getAttribute('alt') !== `${document.querySelectorAll('.legende__h2')[i].textContent} aimée` ? clique = true : clique = false)
        }
        // si la variable clique est vrai : l'attribut alt est enrichi du titre du média + d'un statut aimée
        if (clique) {
          if (imgTitreAlt) {
            imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]} aimée`)
          } else {
            videoTitreAlt.setAttribute('alt', `${this.mediasTitre[i]} aimée`)
          }
          // la variable likeTotal s'additionne lui même avec un +1, le contenu like du media cliqué s'additionne aussi de 1
          // l'icone du coeur change
          likeTotalVerifierAuClique += 1; divLikes.textContent = `${this.mediasIdLike[i] + 1} `; divClickLike.innerHTML = " <i class='fa-solid fa-heart fa-heart-margin' aria-label='likes' ></i>"
          // dans la balise totalCoeur est écrite la valeur numérique de likeTotal + l'icone coeur

          totalCoeur.innerHTML = " <i class='fa-solid fa-heart' aria-label='likes'></i>"
          coeurChiffre.textContent = `${likeTotalVerifierAuClique}`

          totalCoeur.appendChild(coeurChiffre)
        } else {
          // si le clique retourne faux, cela est considéré comme un deuxième clique, donc il s'agit d'un dislike
          if (imgTitreAlt) {
            imgTitreAlt.setAttribute('alt', `${this.mediasTitre[i]}`)
          } else {
            videoTitreAlt.setAttribute('alt', `${this.mediasTitre[i]}`)
          }
          // le text de la div des likes se réinitialise à la valeur du json selon l'index du média récupéré
          divLikes.textContent = `${this.mediasIdLike[i]} `
          // likeTotal se désincrémente à chaque média décliqué
          likeTotalVerifierAuClique -= 1
          // l'icone du coeur est mis à jour en se vidant
          divClickLike.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin' aria-label='likes'></i>"
          divClickLike.setAttribute('tabindex', 0)
          // la balise totalCoeur est mis à jour

          totalCoeur.innerHTML = " <i class='fa-solid fa-heart' aria-label='likes'></i>"
          coeurChiffre.textContent = `${likeTotalVerifierAuClique}`

          totalCoeur.appendChild(coeurChiffre)
        }
      })
    }

    totalCoeur.appendChild(coeurChiffre)
    etiquette.appendChild(totalCoeur)
    etiquette.appendChild(prix)
    // la totalité est retourné comme élement html pour pouvoir être ajouté avec le fichier gestionJsonMedias.js au DOM
    return (etiquette)
  }
}
