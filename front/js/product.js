// Récuperer l'id dans l'url

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// Si il y a un id, appeler l'api pour chercher les informations du produit d'id

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
        const parser = new DOMParser();
        const colors = document.querySelector('#colors');
        
        for (i = 0; i < data.colors.length; i++) {
            let productsColors = 
                `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
            const displayColors = parser.parseFromString(productsColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);
        }
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Oups ! Il y a eu une erreur lors de l'affichage du produit ! :(`);

//******** Récuperer les valeurs du HTML sélectionnées par l'utilisateur ********/

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

// Fonction ajouter un produit dans le localStorage
    const addToCartHTMLElement = (id, color, qty) => {
    
        // Si la couleur est vide --> Erreur
        if (color == "") {
            return alert(`Veuillez choisir une couleur SVP`);
        }

        // Si la quantité n'est pas entre 1 et 100 --> Erreur 
        if (qty <= 0 || qty >= 101) {
            return alert(`Veuillez choisir une quantité entre 1 et 100 SVP`)
        }
        
        let itemsLocalStorage = getCart();
        // Si le panier n'existe pas, le créer dans objet dans un tableau
        if (itemsLocalStorage.length == 0) {
            itemsLocalStorage = [{id: id, color: color, qty: qty}];
        
        // Si le panier existe
        } else {
            let found = false;
            // Si l'id et la couleur de l'item existe déjà dans le tableau du panier, incrémenter la quantité choisie à la quantité du panier
            for (let i = 0; i < itemsLocalStorage.length; i++) {
                if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
                    found = true;
                    itemsLocalStorage[i].qty += qty;
                }
            }
            // S'ils n'existent pas, créer un nouvel objet item dans le tableau du panier
            if (found == false) {
                let item = {id: id, color: color, qty: qty};
                itemsLocalStorage.push(item); 
            }
        }
        
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
        alert(`Produit(s) ajouté(s) au panier !`);
    }

// Bouton d'ajout au panier
const addToCart = document.querySelector(`#addToCart`);

// Lors du 'click' on écoute la couleur et la quantité du produit sélectionné et si elles sont valides, les ajouter au panier
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());
    addToCartHTMLElement(id, color, qty);
});
