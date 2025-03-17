// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}

//cart

let cart = [];
let totalAmount = 0;

function addToCart(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    totalAmount += price;

    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    // Update total amount
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function removeFromCart(index) {
    const product = cart[index];
    cart.splice(index, 1);
    totalAmount -= product.price;

    updateCart();
}

function checkout() {
    if (cart.length > 0) {
        alert("Proceeding to checkout with total: $" + totalAmount.toFixed(2));
        let userAddress = prompt("Enter your delivery address:");
        
        if (userAddress) { 
        var phoneNumber = "1234567890"; // Replace with actual WhatsApp number (without '+')
        var message = "Hello, I need help with my order. My total is $" + totalAmount.toFixed(2);
        
        // Construct the WhatsApp URL
        var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
        
        // Open WhatsApp in a new tab
        window.open(url, "_blank");

        // window.location.href = 'checkout.html'; // Uncomment if you also want to redirect to a checkout page
       
     } else {
            alert("You must enter a delivery address to proceed.");
        }
    } else {
        alert("Your cart is empty. Please add products before checking out.");
    }
}


/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// lightbox gallery
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});