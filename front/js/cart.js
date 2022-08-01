//******** AFFICHER ET MODIFIER LES ELEMENTS DU PANIER ********/

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
                    `<article class="cart__item" data-id="${id}" data-color="${id}">
                        <div class="cart__item__img">
                            <img src="${data.imageUrl}" alt="${data.altTxt}">
                        </div>
                        
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>Couleur : ${color}</p>
                                <p data-id="price-${id}-${color}">Prix : ${data.price} €</p>
                            </div>
                            
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', '${data.price}', this.value)" min="1" max="100" value="${itemsLocalStorage[i].qty}">
                                </div>
                            
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteItem('${id}', '${color}', '${data.price}','${itemsLocalStorage[i].qty}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                const displayDetailProductItems = parser.parseFromString(detailProductItems, "text/html");
                sectionCart.appendChild(displayDetailProductItems.body.firstChild);
                    
                // Afficher le prix total
                priceTotal += data.price * itemsLocalStorage[i].qty;
                document.querySelector('#totalPrice').innerHTML = priceTotal;

                // Afficher la quantité totale
                qtyTotal += parseInt(itemsLocalStorage[i].qty);
                document.querySelector('#totalQuantity').innerHTML = qtyTotal;
            })
            
            .catch((err) => 
                document.querySelector(`#cart__items`).innerText = `Oups ! Il y a eu une erreur lors de l'affichage du panier ! :(`);
    }

// Sinon affiche un message

} else {
    document.querySelector(`#cart__items`).innerText = `Votre panier est vide !`;
}

// Fonction pour changer la quantité
const changeQty = (id, color, price, newQty) => {
    let itemsLocalStorage = getCart();
    let item = itemsLocalStorage.find(
        (itemsLocalStorage) =>
            id === itemsLocalStorage.id && color === itemsLocalStorage.color
    );
    
    // Changer la quantité dans le localStorage
    let previousQty = item.qty;
    let newQuantity = parseInt(newQty);
    
    item.qty = newQuantity;
    localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
    
    // Changer la quantité totale
    let totalQtyBefore = parseInt(document.querySelector(`#totalQuantity`).innerHTML);
    let totalQtyAfter = totalQtyBefore - previousQty + newQuantity;
    
    document.querySelector(`#totalQuantity`).innerHTML = totalQtyAfter;

    // Changer le prix total
    let priceItem = parseInt(price);

    let totalPriceBefore = parseInt(document.querySelector(`#totalPrice`).innerHTML);
    let totalPriceAfter = totalPriceBefore - (priceItem * previousQty) + (priceItem * newQuantity);
    
    document.querySelector(`#totalPrice`).innerHTML = totalPriceAfter;
}

// Fonction pour supprimer un produit
const deleteItem = (id, color, price, qty) => {
    let itemsLocalStorage = getCart();
    for (i = 0; i < itemsLocalStorage.length; i++) {
        if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
            itemsLocalStorage.splice(i, 1);
            localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));

            let itemToDelete = document.querySelector(`.cart__item[data-id="${id}"][data-color="${color}"]`);
            itemToDelete.setAttribute("style", "display:none");

            // Changer la quantité dans le localStorage
            let qtyToDelete = qty;
            localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));

            // Changer la quantité totale
            let totalQtyBefore = parseInt(document.querySelector(`#totalQuantity`).innerHTML);
            let totalQtyAfter = totalQtyBefore - qtyToDelete;

            document.querySelector(`#totalQuantity`).innerHTML = totalQtyAfter;

            // Changer le prix total
            let priceItem = parseInt(price);
            let totalPriceBefore = parseInt(document.querySelector(`#totalPrice`).innerHTML);
            let totalPriceAfter = totalPriceBefore - (priceItem * qtyToDelete);

            document.querySelector(`#totalPrice`).innerHTML = totalPriceAfter;

            if (itemsLocalStorage.length == 0) {
                return alert(`Votre panier est vide !`);
            }
        }
    }
}