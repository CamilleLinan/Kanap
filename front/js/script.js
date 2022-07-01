const apiUrl = 'http://localhost:3000/api/products';

//---INDEX---
//Récupération des données de l'API + intégration dans le HTML
let cardsFetch = function () {

    fetch(apiUrl)
        .then((response) =>
            response.json()
        .then((data) => {
            console.log(data);
            
            let productsSection = document.querySelector('#items');

            for (i = 0; i < data.length; i ++) {
                let productCard = 
                    `<a href="./product.html?id=${data[i]._id}">
                        <article>
                            <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" />
                            <h3 class="productName">${data[i].name}</h3>
                            <p class="productDescription"> ${data[i].description}</p>
                        </article>
                    </a>`;
                productsSection.innerHTML += productCard;
            }
            console.log(document.querySelector('#items'));
        })
        )

        .catch((err) => console.log('Erreur : ' + err));
};

cardsFetch();