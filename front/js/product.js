// 1/ recuperer l'id dans l'url

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// 2/ si il y a un id, alors on va appeler le back/l'api pour chercher les informations du produit d'id

fetch(apiUrl)
    .then((response) => response.json()
    .then((data) => {
            
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
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Oups ! Il y a eu une erreur lors de l'affichage du produit ! :(`);
