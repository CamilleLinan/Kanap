// JS de la page détail: product.html

// 1/ recuperer l'id dans l'url

const str = window.location.search;

const urlParams = new URLSearchParams(str);

const id = urlParams.get('id');
console.log (id);

const apiUrl = 'http://localhost:3000/api/products/' + id;

// 2/ si il y a un id, alors on va appeler le back/l'api pour chercher les informations du produit d'id

let cardsFetch = function () {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            // Afficher les images
            let img = document.querySelector('.item__img');
            img.innerHTML = `<img src='${data.imageUrl}' alt='${data.altTxt}'>`;
            
            // Afficher les noms
            let name = document.querySelector('#title');
            name.innerHTML = `${data.name}`;
            
            // Afficher les prix
            let price = document.querySelector('#price');
            price.innerHTML = `${data.price}`;

            // Afficher les descriptions
            let desc = document.querySelector('#description');
            desc.innerHTML = `${data.description}`;

            // Afficher les couleurs
            let color = document.querySelector('#colors');
            for (i = 0; i < data.colors.length; i++) {
                color.innerHTML += `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
            }
        });
};

cardsFetch();
/*

fetch(url)
    .then(response => {
        si il y a un produit dans la reponse
        alors j'affiche le nom, l'image, etc...

        sinon
        affiche un message
    })

*/

// si pas d'id alors affiche un message
/* 

    .catch((err) => document.querySelector('#items').innerText = `Oups ! Il y a eu une erreur lors de l'affichage du produit :(`);

*/