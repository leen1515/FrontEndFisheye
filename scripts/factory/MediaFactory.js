export class MediaFactory {
//   constructor (mediasParents, index, id, photographerName, photographerId, title, image, video, likes, date, price) {
//     this.mediasParents = mediasParents
//     this.index = index
//     this.id = id
//     this.photographerName = photographerName
//     this.photographerId = photographerId
//     this.title = title
//     this.image = image
//     this.video = video
//     this.likes = likes
//     this.date = date
//     this.price = price
  constructor (image, video) {
    this.image = image
    this.video = video
  }

  videoOuPhoto () {
    let video = true
    let media
    if (this.image === undefined) {
      video = true
      media = this.video
      const videoRetourVrai = [media, video]
      return videoRetourVrai
    } else {
      video = false
      media = this.image
      const videoRetourFaux = [media, video]
      return videoRetourFaux
    }
  }
}
