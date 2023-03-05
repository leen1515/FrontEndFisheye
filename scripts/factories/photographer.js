function photographerFactory(data) {
    const { name, tagline, city, country, price, portrait } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const text = document.createElement('p');
        text.setAttribute("class", "textDescription");
        text.innerHTML = `${tagline}<br> localisation : ${city}, ${country} <br> tarif : ${price}€/heure`;
        article.appendChild(text);
        return (article);
    }
    return { name, picture, tagline, city, country, price, getUserCardDOM }
}