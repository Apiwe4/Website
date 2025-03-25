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

let cart = []; // Array to store cart items

// Function to add an item to the cart
function addToCart(productName, price) {
  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    // If the product exists, increment its quantity
    existingProduct.quantity += 1;
  } else {
    // If the product doesn't exist, add it to the cart
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  // Update the cart display, badge, and summary
  updateCartDisplay();
  updateCartBadge();
  updateCartSummary();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear the current cart items

  cart.forEach(item => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    productItem.innerHTML = `
      <img src="images/${item.name.toLowerCase().replace(' ', '-')}.png" alt="${item.name}" class="product-image">
      <div class="product-details">
        <h2 class="product-name">${item.name}</h2>
        <p class="product-price">$${(item.price * item.quantity).toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="decrementQuantity('${item.name}')">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="incrementQuantity('${item.name}')">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(productItem);
  });
}

// Function to update the cart badge
function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

// Function to update the cart summary
function updateCartSummary() {
  const itemCount = document.getElementById('item-count');
  const subtotal = document.getElementById('subtotal');
  const totalAmountElement = document.getElementById('totalAmount');

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  itemCount.textContent = totalItems;
  subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
  totalAmountElement.textContent = `$${(subtotalAmount + 4 - 2).toFixed(2)}`; // Including shipping and discount
}

// Function to increment quantity
function incrementQuantity(productName) {
  const product = cart.find(item => item.name === productName);
  if (product) {
    product.quantity += 1;
    updateCartDisplay();
    updateCartBadge();
    updateCartSummary();
  }
}

// Function to decrement quantity
function decrementQuantity(productName) {
  const product = cart.find(item => item.name === productName);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    updateCartDisplay();
    updateCartBadge();
    updateCartSummary();
  } else if (product && product.quantity === 1) {
    // Remove the product if the quantity is 0
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    updateCartBadge();
    updateCartSummary();
  }
}

function checkout() {
  if (cart.length > 0) {
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    alert("Proceeding to checkout with total: $" + totalAmount.toFixed(2));
    let userAddress = prompt("Enter your delivery address:");

    if (userAddress) {
      // Use a valid WhatsApp number (with country code but without '+' or '00')
      const phoneNumber = "0810450184"; 
      const message = `Hello, I need help with my order. My total is $${totalAmount.toFixed(2)}. Delivery Address: ${userAddress}`;

      // Construct the WhatsApp URL properly
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      // Try opening in the same tab first
      window.location.href = url;
      
      // Alternatively, try opening in a new tab (might be blocked by popup blockers)
      // const newWindow = window.open(url, '_blank');
      // if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      //   // Fallback if popup is blocked
      //   window.location.href = url;
      // }
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

// Switch between sidebar icons and tabs
        const sidebarIcons = document.querySelectorAll(".sidebar .icon");
        const tabContents = document.querySelectorAll(".tab-content");

        sidebarIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                // Hide all tab contents
                tabContents.forEach(content => content.classList.add("hidden"));
                // Show the selected tab content
                const targetTab = document.getElementById(icon.dataset.tab);
                targetTab.classList.remove("hidden");
            });
        });

        // Switch between nested tabs
        const tabButtons = document.querySelectorAll(".tab-button");

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove("active"));
                // Add active class to the clicked button
                button.classList.add("active");

                // Hide all nested tab contents
                const parentTab = button.closest(".tab-content");
                const nestedTabs = parentTab.querySelectorAll(".profile-card");
                nestedTabs.forEach(tab => tab.classList.add("hidden"));

                // Show the selected nested tab content
                const targetTab = document.getElementById(button.dataset.tab);
                targetTab.classList.remove("hidden");
            });
        });