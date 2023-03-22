class Tri {
    constructor(media) {
        this.media = media;
    }
    likeDecroissant() {
        let mediaTri = this.media.sort((a, b) => {
            return b.likes - a.likes;
        });
        return mediaTri;
    }
    dateDecroissant() {
        let mediaTri = this.media.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        return mediaTri;
    }
    alphabetiqueCroissant() {
        let mediaTri = this.media.sort((a, b) => {
            return a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
        });
        return mediaTri;
    }
}