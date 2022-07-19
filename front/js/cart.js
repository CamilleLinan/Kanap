// Si un panier existe --> Récupérer les infos du localStorage (id + couleur; mettre la qty a 0 pour calculs) et du produit

// Insérer les informations dans le HTML

// Afficher la quantité totale

// Calculer le prix total en fonction de la quantité

//******** TEST ********/

// Fonction pour récupérer le panier dans le localStorage
const getCart = () => {   
    let itemsLocalStorage = [];
    if (localStorage.getItem(`selectedProduct`) != null) { 
        itemsLocalStorage = JSON.parse(localStorage.getItem(`selectedProduct`));
    }
    return itemsLocalStorage;
}

// Si un panier existe --> Récupérer les éléments du localStorage et les infos produits --> les afficher avec fetch

let itemsLocalStorage = getCart();

if (localStorage.getItem(`selectedProduct`) != null) {
    for (let i = 0; i < itemsLocalStorage.length; i++) {
        let id = itemsLocalStorage[i][0];
        let color = itemsLocalStorage[i][1];
        let apiUrl = 'http://localhost:3000/api/products/' + id;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                let sectionCart = document.querySelector(`#cart__items`);
                sectionCart.innerHTML += 
                    // Si la quantité change --> Enregistrer la nouvelle quantité et actualiser la page
                    `<article class="cart__item" data-id="${id}" data-color="${color}">
                        <div class="cart__item__img">
                            <img src="${data.imageUrl}" alt="${data.altTxt}">
                        </div>
                        
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>Couleur : ${color}</p>
                                <p>Prix : ${data.price} $</p>
                            </div>
                            
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemsLocalStorage[i][2]}">
                                </div>
                            
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`
            })
    }
}