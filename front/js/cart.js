//******** AFFICHER ET MODIFIER LES ELEMENTS DU PANIER ********/

// Fonction pour changer la quantité, enregistrer l'information et actualiser la page
const changeQty = (id, color, newQty) => {
    let itemsLocalStorage = getCart();
    for (let i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
            itemsLocalStorage[i].qty = newQty;
            localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
            window.location.reload();
        }
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
                const parser = new DOMParser();
                let sectionCart = document.querySelector(`#cart__items`);
                let detailProductItems = 
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
                const displayDetailProductItems = parser.parseFromString(detailProductItems, "text/html");
                sectionCart.appendChild(displayDetailProductItems.body.firstChild);
                    
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