// Définir le taux de conversion USD -> CDF
const conversionRate = 2850;

// Variables pour gérer le tableau des produits
let productList = [];

// Fonction pour ajouter un produit au tableau
function addProduct() {
    // Demander les informations du produit
    const productName = prompt("Nom du produit :");
    const productPrice = parseFloat(prompt("Prix du produit (USD) :"));
    const productQuantity = parseInt(prompt("Quantité à acheter :"));

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity)) {
        // Ajouter le produit dans la liste
        productList.push({
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            total: productPrice * productQuantity
        });

        // Mettre à jour le tableau affiché
        updateProductTable();
    } else {
        alert("Veuillez entrer des informations valides.");
    }
}

// Fonction pour mettre à jour le tableau des produits affiché
function updateProductTable() {
    const productTableBody = document.getElementById('productTable');
    productTableBody.innerHTML = ''; // Effacer le tableau actuel

    // Ajouter chaque produit dans le tableau HTML
    let totalAmount = 0;
    productList.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price.toFixed(2);
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        row.appendChild(quantityCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = product.total.toFixed(2);
        row.appendChild(totalCell);

        productTableBody.appendChild(row);

        // Ajouter au total général
        totalAmount += product.total;
    });

    // Afficher le total global
    document.getElementById('totalAmount').textContent = `Total: ${totalAmount.toFixed(2)} USD`;
}

// Fonction pour calculer le total
function calculateTotal() {
    updateProductTable();
}

// Fonction pour convertir la monnaie
function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const type = document.getElementById('currencyType').value;

    if (isNaN(amount)) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    let result;
    if (type === 'usdToCdf') {
        result = amount * conversionRate;
        document.getElementById('conversionResult').textContent = `${amount} USD = ${result.toFixed(2)} CDF`;
    } else {
        result = amount / conversionRate;
        document.getElementById('conversionResult').textContent = `${amount} CDF = ${result.toFixed(2)} USD`;
    }
}

// Fonction pour quitter l'application (sur un appareil natif avec Cordova)
function exitApp() {
    if (confirm("Voulez-vous vraiment quitter l'application ?")) {
        navigator.app.exitApp(); // Nécessite Cordova pour fonctionner
    }
}

// Fonction pour partager l'application (fonctionne sur navigateur mobile avec l'API Web Share)
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Nom de l\'Application',
            text: 'Partagez cette application avec vos amis!',
            url: window.location.href
        }).then(() => {
            console.log('Partage réussi!');
        }).catch((error) => {
            console.error('Erreur de partage: ', error);
        });
    } else {
        alert('Le partage n\'est pas supporté sur ce navigateur.');
    }
}

// Gestion de l'affichage de l'écran de chargement et de l'application
window.addEventListener('load', function() {
    // Simuler un temps de chargement avant de montrer l'application
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('appContent').style.display = 'block';
    }, 3000); // Le chargement dure 3 secondes
});

// Ajouter des événements aux boutons
document.getElementById('addProductBtn').addEventListener('click', addProduct);
document.getElementById('calculateTotalBtn').addEventListener('click', calculateTotal);
document.getElementById('convertCurrencyBtn').addEventListener('click', convertCurrency);
document.getElementById('shareAppBtn').addEventListener('click', shareApp);
document.getElementById('exitAppBtn').addEventListener('click', exitApp);
document.getElementById('backBtn').addEventListener('click', () => {
    alert("Retour aux options.");
    // Vous pouvez ajouter ici des actions de navigation si nécessaire
});