//******** AFFICHER ET MODIFIER LES ELEMENTS DU PANIER ********/

// Fonction pour récupérer le panier dans le localStorage
const getCart = () => {   
    let itemsLocalStorage = [];
    if (localStorage.getItem(`selectedProduct`) != null) { 
        itemsLocalStorage = JSON.parse(localStorage.getItem(`selectedProduct`));
    }
    return itemsLocalStorage;
}

// Fonction pour changer la quantité, enregistrer l'information et actualiser la page
const changeQty = (id, color, qty) => {
    let itemsLocalStorage = getCart();
    for (let i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i][0] && color === itemsLocalStorage[i][1]) {
            itemsLocalStorage[i][2] = qty;
        }
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
        window.location.reload();
    }
}

// Fonction pour supprimer un produit, enregistrer l'information et actualiser la page
const deleteItem = (id, color) => {
    let itemsLocalStorage = getCart();
    for (i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i][0] && color === itemsLocalStorage[i][1]) {
            itemsLocalStorage.splice(i, 1);
            localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
            window.location.reload();
        }
    }
}

// Si un panier existe --> Récupérer les éléments du localStorage et les infos produits

let itemsLocalStorage = getCart();
let qtyTotal = 0;
let priceTotal = 0;

if (localStorage.getItem(`selectedProduct`) != null) {
    for (let i = 0; i < itemsLocalStorage.length; i++) {
        let id = itemsLocalStorage[i][0];
        let color = itemsLocalStorage[i][1];
        let apiUrl = 'http://localhost:3000/api/products/' + id;
        // Afficher les données du produit avec fetch
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                let sectionCart = document.querySelector(`#cart__items`);
                sectionCart.innerHTML += 
                    // Changer la quantité --> Utiliser la fonction changeQty dans l'input avec l'evenement 'onchange'
                    // Supprimer un article --> Evenement onclick
                    `<article class="cart__item" data-id="${id}" data-color="${color}">
                        <div class="cart__item__img">
                            <img src="${data.imageUrl}" alt="${data.altTxt}">
                        </div>
                        
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>Couleur : ${color}</p>
                                <p>Prix : ${data.price} €</p>
                            </div>
                            
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', this.value)" min="1" max="100" value="${itemsLocalStorage[i][2]}">
                                </div>
                            
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteItem('${id}', '${color}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                    
                    // Afficher le prix total
                    priceTotal += data.price * itemsLocalStorage[i][2];
                    document.querySelector('#totalPrice').innerHTML = priceTotal;
            })
            
            .catch((err) => 
                document.querySelector(`#cart__items`).innerText = `Oups ! Il y a eu une erreur lors de l'affichage du panier ! :(`);
        
        // Afficher la quantité totale
        qtyTotal += parseInt(itemsLocalStorage[i][2]);
        document.querySelector('#totalQuantity').innerHTML = qtyTotal;
    }

// Sinon affiche un message

} else {
    document.querySelector(`#cart__items`).innerText = `Votre panier est vide !`;
}

//******** REMPLIR LE FORMULAIRE ********/

// Mise en place des RegEx classiques

// Variables associées aux différents inputs du formulaire
const prenom = document.querySelector('#firstName');
const nom = document.querySelector('#lastName');
const adresse = document.querySelector('#address');
const ville = document.querySelector('#city');
const email = document.querySelector('#email');

// Regex pour validation des prénoms, noms et villes (uniquement des lettres)
const namesRegEx = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i);

// Regex pour validation de l'adresse (chiffres et/ou lettres)
const adressRegEx = new RegExp (/^[a-zA-Z0-9]*$/i);

// Evenement d'ecoute de l'input prenom + validation
prenom.addEventListener('change', function() {
    validFirstName(this);
});

const validFirstName = function(inputFirstName) {
    let testFirstName = namesRegEx.test(inputFirstName.value);
    
    console.log(testFirstName);
};

// Evenement d'ecoute pour l'input nom + validation
nom.addEventListener('change', function() {
    validLastName(this);
});

const validLastName = function(inputLastName) {
    let testLastName = namesRegEx.test(inputLastName.value);
    
    console.log(testLastName);
};

// Evenement d'ecoute pour l'input adresse + validation
adresse.addEventListener('change', function() {
    validAdress(this);
});

const validAdress = function(inputAdress) {
    let testAdress = adressRegEx.test(inputAdress.value);
    
    console.log(testAdress);
};

// Evenement d'ecoute pour l'input ville + validation
ville.addEventListener('change', function() {
    validCity(this);
});

const validCity = function(inputCity) {
    let testCity = adressRegEx.test(inputCity.value);
    
    console.log(testCity);
};

// Evenement d'ecoute pour l'input email + validation
email.addEventListener('change', function() {
    validEmail(this);
});

const validEmail = function(inputEmail) {
    const emailRegEx = new RegExp ('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    let testEmail = emailRegEx.test(inputEmail.value);
    console.log(testEmail);
};