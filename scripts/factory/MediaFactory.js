export class MediaFactory {
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
