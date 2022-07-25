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