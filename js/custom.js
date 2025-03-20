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

function incrementQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const priceElement = button.closest('.product-item').querySelector('.price');
    const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
    updatePrice(priceElement, basePrice, quantity);
  }
  
  function decrementQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const priceElement = button.closest('.product-item').querySelector('.price');
    const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity -= 1;
      quantityElement.textContent = quantity;
      updatePrice(priceElement, basePrice, quantity);
    }
  }
  
  function updatePrice(priceElement, basePrice, quantity) {
    const totalPrice = (basePrice * quantity).toFixed(2);
    priceElement.textContent = totalPrice;
  }
  
  // Initialize base prices on page load
  document.querySelectorAll('.price').forEach(priceElement => {
    const basePrice = parseFloat(priceElement.textContent);
    priceElement.setAttribute('data-base-price', basePrice);
  });

  // Function to update the product price and summary
function updateProductPrice(button, change) {
    const productItem = button.closest('.product-item');
    const quantityElement = productItem.querySelector('.quantity');
    const priceElement = productItem.querySelector('.product-price');
    const basePrice = parseFloat(priceElement.getAttribute('data-base-price')); // Use data attribute for base price
    let quantity = parseInt(quantityElement.textContent);
  
    // Update quantity
    quantity += change;
    if (quantity < 1) quantity = 1; // Ensure quantity doesn't go below 1
    quantityElement.textContent = quantity;
  
    // Update product price
    const totalPrice = (basePrice * quantity).toFixed(2);
    priceElement.textContent = `$${totalPrice}`;
  
    // Update the summary (Subtotal, Item Count, and Balance)
    updateSummary();
  }
  
  // Function to increment quantity
  function incrementQuantity(button) {
    updateProductPrice(button, 1); // Increase quantity by 1
  }
  
  // Function to decrement quantity
  function decrementQuantity(button) {
    updateProductPrice(button, -1); // Decrease quantity by 1
  }
  
  // Function to update the summary (Subtotal, Item Count, and Balance)
  function updateSummary() {
    const productItems = document.querySelectorAll('.product-item');
    let subtotal = 0;
    let totalItems = 0;
  
    // Calculate subtotal and total items
    productItems.forEach(item => {
      const price = parseFloat(item.querySelector('.product-price').textContent.replace('$', ''));
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      subtotal += price;
      totalItems += quantity;
    });
  
    // Update Subtotal and Item Count
    const subtotalElement = document.querySelector('.cart-summary li:nth-child(1)');
    subtotalElement.innerHTML = `Subtotal (${totalItems} ${totalItems === 1 ? 'item' : 'items'}) <span>$${subtotal.toFixed(2)}</span>`;
  
    // Update Balance
    const totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  
  // Initialize base prices and summary on page load
  document.querySelectorAll('.product-price').forEach(priceElement => {
    const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
    priceElement.setAttribute('data-base-price', basePrice); // Store base price in data attribute
  });
  
  updateSummary(); // Initialize summary

  // Function to update the cart badge
function updateCartBadge() {
    const productItems = document.querySelectorAll('.product-item');
    let totalItems = 0;
  
    // Calculate total items
    productItems.forEach(item => {
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      totalItems += quantity;
    });
  
    // Update the badge
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = totalItems;
  }
  
  // Call updateCartBadge whenever the quantity changes
  function updateProductPrice(button, change) {
    const productItem = button.closest('.product-item');
    const quantityElement = productItem.querySelector('.quantity');
    const priceElement = productItem.querySelector('.product-price');
    const basePrice = parseFloat(priceElement.getAttribute('data-base-price')); // Use data attribute for base price
    let quantity = parseInt(quantityElement.textContent);
  
    // Update quantity
    quantity += change;
    if (quantity < 1) quantity = 1; // Ensure quantity doesn't go below 1
    quantityElement.textContent = quantity;
  
    // Update product price
    const totalPrice = (basePrice * quantity).toFixed(2);
    priceElement.textContent = `$${totalPrice}`;
  
    // Update the summary and cart badge
    updateSummary();
    updateCartBadge();
  }
  
  // Initialize cart badge on page load
  updateCartBadge();

  document.getElementById('addressForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
  
    // Get the address from the textarea
    const addressNotes = document.getElementById('addressNotes').value;
  
    // Save the address (e.g., to localStorage or send to a server)
    localStorage.setItem('shippingAddress', addressNotes);
  
    // Notify the user
    alert('Address saved successfully!');
    console.log('Saved Address:', addressNotes);
  
    // Optionally, you can redirect or update the UI here
  });

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

// Function to open the login overlay
function openLoginOverlay() {
  const overlay = document.getElementById('loginOverlay');
  overlay.style.display = 'flex';
  switchToLoginForm(); // Show the login form by default
}

// Function to close the login overlay
function closeLoginOverlay() {
  const overlay = document.getElementById('loginOverlay');
  overlay.style.display = 'none';
}

// Function to switch to the signup form
function switchToSignupForm() {
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('signupFormContainer').style.display = 'block';
}

// Function to switch to the login form
function switchToLoginForm() {
  document.getElementById('signupFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }
  alert('Login successful!');
  closeLoginOverlay();
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!fullName || !email || !newPassword || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  alert('Account created successfully!');
  closeLoginOverlay();
});