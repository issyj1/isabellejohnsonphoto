/****************************************
 * CART SETUP
 ****************************************/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function cartTotal() {
  // Total of items only (without shipping)
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function addToCart(productId, name, size, price) {
  const existing = cart.find(p => p.productId === productId && p.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ productId, name, size, price, qty: 1 });
  }
  saveCart();
  updateCartCount();
}

/****************************************
 * UI ELEMENTS
 ****************************************/

const productModal = document.getElementById("product-modal");
const cartModal = document.getElementById("cart-modal");
const closeProduct = document.querySelector(".close-product");
const closeCart = document.querySelector(".close-cart");

const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const sizeSelect = document.getElementById("size-select");

let currentProduct = null;

/****************************************
 * PRICING TABLE
 ****************************************/

const prices = {
  small: 65.0,
  medium: 85.0,
};

/****************************************
 * PRODUCT MODAL OPEN
 ****************************************/

function openProductModal(productEl) {
  const img = productEl.querySelector("img").src;
  const name = productEl.querySelector("h2").textContent;

  currentProduct = productEl.dataset.id;

  modalImage.src = img;
  modalTitle.textContent = name;
  sizeSelect.value = "small";

  updateProductPrice();

  productModal.setAttribute("aria-hidden", "false");
}

/****************************************
 * UPDATE PRICE DISPLAY
 ****************************************/

function updateProductPrice() {
  const p = prices[sizeSelect.value];
  modalPrice.textContent = `£${p.toFixed(2)}`;
}

/****************************************
 * ADD TO CART BUTTON
 ****************************************/

document.getElementById("add-to-cart").addEventListener("click", () => {
  const name = modalTitle.textContent;
  const size = sizeSelect.value;
  const price = prices[size];

  addToCart(currentProduct, name, size, price);

  alert("Added to cart!");
});

sizeSelect.addEventListener("change", updateProductPrice);

/****************************************
 * MODAL CLOSE EVENTS
 ****************************************/

closeProduct.addEventListener("click", () =>
  productModal.setAttribute("aria-hidden", "true")
);

closeCart.addEventListener("click", () =>
  cartModal.setAttribute("aria-hidden", "true")
);

/****************************************
 * CLOSE MODAL BY CLICKING OUTSIDE CONTENT
 ****************************************/

window.addEventListener("click", function(event) {
  if (event.target === productModal) {
    productModal.setAttribute("aria-hidden", "true");
  }
  if (event.target === cartModal) {
    cartModal.setAttribute("aria-hidden", "true");
  }
});

/****************************************
 * OPEN CART
 ****************************************/

document.getElementById("open-cart").addEventListener("click", () => {
  renderCart();
  cartModal.setAttribute("aria-hidden", "false");
});

/****************************************
 * RENDER CART ITEMS
 ****************************************/

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  cart.forEach((item, i) => {
    container.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong> — ${item.size}<br>
        Qty: ${item.qty} — £${(item.qty * item.price).toFixed(2)}
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = (parseFloat(cartTotal()) + 5).toFixed(2);

  renderPayPalCheckout();
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

/****************************************
 * PAYPAL CHECKOUT (FULL CART WITH £5 SHIPPING)
 ****************************************/

function renderPayPalCheckout() {
  const container = document.getElementById("paypal-cart-checkout");
  container.innerHTML = "";

  if (!window.paypal) {
    setTimeout(renderPayPalCheckout, 200);
    return;
  }

  const itemTotal = parseFloat(cartTotal());
  const shipping = 5.0;

  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: (itemTotal + shipping).toFixed(2),
              currency_code: "GBP",
              breakdown: {
                item_total: { value: itemTotal.toFixed(2), currency_code: "GBP" },
                shipping: { value: shipping.toFixed(2), currency_code: "GBP" }
              }
            },
            items: cart.map(item => ({
              name: `${item.name} (${item.size})`,
              unit_amount: { value: item.price.toFixed(2), currency_code: "GBP" },
              quantity: item.qty
            }))
          }
        ]
      });
    },

    onApprove: (data, actions) => {
      return actions.order.capture().then((details) => {
        alert("Order completed! Thank you!");

        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
      });
    },
  }).render("#paypal-cart-checkout");
}

/****************************************
 * PRODUCT GRID CLICK
 ****************************************/

document.querySelectorAll(".product").forEach(p =>
  p.addEventListener("click", () => openProductModal(p))
);

/****************************************
 * INITIAL DISPLAY UPDATE
 ****************************************/

updateCartCount();
