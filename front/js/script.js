const apiUrl = 'http://localhost:3000/api/products';

//---INDEX---
//Récupération des données de l'API + intégration dans le HTML

fetch(apiUrl)
    .then((response) => response.json()
    .then((data) => {
        const parser = new DOMParser();
        const items = document.querySelector('#items');

        for (i = 0; i < data.length; i ++) {
            let productsItems = 
                `<a href="./product.html?id=${data[i]._id}">
                    <article>
                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" />
                        <h3 class="productName">${data[i].name}</h3>
                        <p class="productDescription">${data[i].description}</p>
                    </article>
                </a>`;
            const displayItems = parser.parseFromString(productsItems, "text/html");
            items.appendChild(displayItems.body.firstChild);
        }
    }))

    .catch((err) => 
        document.querySelector('#items').innerText = `Oups ! Il y a eu une erreur lors de l'affichage des produits :(`);
