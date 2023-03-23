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

function SelectDeclencheTri(mediasaTrier, photographerName) {
    let resultatTrie = new Tri(mediasaTrier).likeDecroissant();
    triage(resultatTrie, photographerName);
    let selectOption = document.querySelector('#select-tri');

    selectOption.addEventListener("change", () => {
        if (selectOption.options[0].selected === true) {
            if (document.querySelector('div.section__enveloppe') !== null) {
                document.querySelector('div.section__enveloppe').remove();
            } resultatTrie = new Tri(mediasaTrier).likeDecroissant(); triage(resultatTrie, photographerName);
        }
    });
    selectOption.addEventListener("change", (resultatTrie) => {
        if (selectOption.options[1].selected === true) {
            if (document.querySelector('div.section__enveloppe') !== null) {
                document.querySelector('div.section__enveloppe').remove();
            } resultatTrie = new Tri(mediasaTrier).dateDecroissant(), triage(resultatTrie, photographerName);
        }
    });
    selectOption.addEventListener("change", (resultatTrie) => {
        if (selectOption.options[2].selected === true) {
            if (document.querySelector('div.section__enveloppe') !== null) {
                document.querySelector('div.section__enveloppe').remove();
            } resultatTrie = new Tri(mediasaTrier).alphabetiqueCroissant(), triage(resultatTrie, photographerName);
        }
    });
}

