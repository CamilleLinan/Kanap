// Récuperer l'id dans l'url

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// Si il y a un id, appeler le l'api pour chercher les informations du produit d'id

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
        let color = document.querySelector(`#colors`);
        for (i = 0; i < data.colors.length; i++) {
            color.innerHTML += `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
        }
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Oups ! Il y a eu une erreur lors de l'affichage du produit ! :(`);

// Récuperer les valeurs du HTML sélectionnées par l'utilisateur

// Récuperer la couleur choisie
function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function qtyValue() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

// Bouton d'ajout au panier
const addToCart = document.querySelector(`#addToCart`);

// Lors du 'click' on écoute la couleur et la quantité du produit sélectionné
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());

// Créer un objet de la sélection utlisateur avec l'id du produit
    const selectionUser = {
        colorChosen: color,
        qtyChosen: qty,
        productChosen: id,
    };

// Récupérer le panier dans le localStorage
    let cartInLocalStorage = JSON.parse(localStorage.getItem(`selectedProduct`));
    
    // Fonction pop up
    const popupConfirm = () => {
        if(window.confirm(`Le produit a bien été ajouté au panier.
Consulter le panier OK ou revenir à l'accueil ANNULER`)) {  
            window.location.href = "./cart.html";
        } else {
            window.location.href = "./index.html";
        }
    }

    // Fonction ajouté un produit dans le localStorage
    const addProductLocalStorage = () => {
        cartInLocalStorage.push(selectionUser);
        localStorage.setItem(`selectedProduct`, JSON.stringify(cartInLocalStorage));
    };

    // Si le panier existe dans le localStorage
    if (cartInLocalStorage) {
        console.log(`panier existe`);
        addProductLocalStorage();
        //popupConfirm();
    }

    // Sinon
    else {
        console.log(`panier n'existe pas`);
        cartInLocalStorage = [];
        addProductLocalStorage();
        //popupConfirm();
    }
});