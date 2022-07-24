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
        if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
            itemsLocalStorage[i].qty = qty;
        }
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
        window.location.reload();
    }
}

// Fonction pour supprimer un produit, enregistrer l'information et actualiser la page
const deleteItem = (id, color) => {
    let itemsLocalStorage = getCart();
    for (i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
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
        let id = itemsLocalStorage[i].id;
        let color = itemsLocalStorage[i].color;
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
                                    <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', this.value)" min="1" max="100" value="${itemsLocalStorage[i].qty}">
                                </div>
                            
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteItem('${id}', '${color}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                    
                    // Afficher le prix total
                    priceTotal += data.price * itemsLocalStorage[i].qty;
                    document.querySelector('#totalPrice').innerHTML = priceTotal;
            })
            
            .catch((err) => 
                document.querySelector(`#cart__items`).innerText = `Oups ! Il y a eu une erreur lors de l'affichage du panier ! :(`);
        
        // Afficher la quantité totale
        qtyTotal += parseInt(itemsLocalStorage[i].qty);
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

// Regex et fonction pour validation des prénoms, noms et villes (uniquement des lettres)
const validName = function(inputName) {
    const namesRegEx = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i);
    return namesRegEx.test(inputName.value);
}

// Regex et fonction pour validation de l'adresse (chiffres et/ou lettres)
const validAddress = function(inputAddress) {
    const addressRegEx = new RegExp (/^[a-zA-Z0-9]*$/i);
    return addressRegEx.test(inputAddress.value);
}

// Regex et fonction pour validation de l'adresse (@ et .)
const validEmail = function(inputEmail) {
    const emailRegEx = new RegExp ('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return emailRegEx.test(inputEmail.value);
};

// Evenement d'ecoute de l'input prenom + validation ou erreur
prenom.addEventListener('change', function() {
    let valid = validName(this);

    if(valid) {
        let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
        firstNameErrorMsg.innerText = ``;
    } else {
        firstNameErrorMsg.innerText = `Veuillez renseigner votre prénom`;
    }
});

// Evenement d'ecoute pour l'input nom + validation ou erreur
nom.addEventListener('change', function() {
    let valid = validName(this);

    if(valid) {
        let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
        lastNameErrorMsg.innerText = ``;
    } else {
        lastNameErrorMsg.innerText = `Veuillez renseigner votre nom`;
    }
});

// Evenement d'ecoute pour l'input adresse + validation ou erreur
adresse.addEventListener('change', function() {
    let valid = validAddress(this);

    if(valid) {
        let addressErrorMsg = document.querySelector('#addressErrorMsg');
        addressErrorMsg.innerText = ``;
    } else {
        addressErrorMsg.innerText = `Veuillez renseigner le numéro et le nom de votre adresse`;
    }
});

// Evenement d'ecoute pour l'input ville + validation ou erreur
ville.addEventListener('change', function() {
    let valid = validAddress(this);

    if(valid) {
        let cityErrorMsg = document.querySelector('#cityErrorMsg');
        cityErrorMsg.innerText = ``;
    } else {
        cityErrorMsg.innerText = `Veuillez renseigner le code postal et le nom de votre ville`;
    }
});

// Evenement d'ecoute pour l'input email + validation ou erreur
email.addEventListener('change', function() {
    let valid = validEmail(this);

    if(valid) {
        let emailErrorMsg = document.querySelector('#emailErrorMsg');
        emailErrorMsg.innerText = ``;
    } else {
        emailErrorMsg.innerText = `Veuillez renseigner votre adresse email`;
    }
});