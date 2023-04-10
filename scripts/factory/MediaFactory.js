export function MediaFactory (image, videoDonnee) {
  let video = true
  let media
  if (image === undefined) {
    video = true
    media = videoDonnee
    const videoRetourVrai = [media, video]
    return videoRetourVrai
  } else {
    video = false
    media = image
    const videoRetourFaux = [media, video]
    return videoRetourFaux
  }
}
