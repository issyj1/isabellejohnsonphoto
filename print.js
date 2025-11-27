/****************************************
 * CART SETUP
 ****************************************/

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const prices = { small: 35, medium: 55 };
let currentProduct = null;

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = count;
}

function addToCart(productId, name, size, price) {
  const existing = cart.find(p => p.productId === productId && p.size === size);
  if (existing) existing.qty++;
  else cart.push({ productId, name, size, price, qty: 1 });
  saveCart();
  updateCartCount();
}

/****************************************
 * PRODUCT MODAL
 ****************************************/

const productModal = document.getElementById("product-modal");
const closeProduct = productModal?.querySelector(".close-product");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const sizeSelect = document.getElementById("size-select");

function openProductModal(productEl) {
  currentProduct = productEl.dataset.id;
  modalImage.src = productEl.querySelector("img").src;
  modalTitle.textContent = productEl.querySelector("h2").textContent;
  sizeSelect.value = "small";
  updateProductPrice();
  productModal?.setAttribute("aria-hidden", "false");
}

function updateProductPrice() {
  if (modalPrice) modalPrice.textContent = `£${prices[sizeSelect.value].toFixed(2)}`;
}

sizeSelect?.addEventListener("change", updateProductPrice);
closeProduct?.addEventListener("click", () => productModal.setAttribute("aria-hidden", "true"));

document.getElementById("add-to-cart")?.addEventListener("click", () => {
  addToCart(currentProduct, modalTitle.textContent, sizeSelect.value, prices[sizeSelect.value]);
  alert("Added to cart!");
});

/****************************************
 * PRODUCT GRID CLICK
 ****************************************/

document.querySelectorAll(".product").forEach(p =>
  p.addEventListener("click", () => openProductModal(p))
);

/****************************************
 * CART MODAL (Optional, just for viewing items)
 ****************************************/

const cartModal = document.getElementById("cart-modal");
const closeCart = cartModal?.querySelector(".close-cart");

closeCart?.addEventListener("click", () => cartModal.setAttribute("aria-hidden", "true"));

document.getElementById("open-cart")?.addEventListener("click", () => {
  renderCart();
  cartModal?.setAttribute("aria-hidden", "false");
});


window.addEventListener("click", (e) => {
  if (productModal && e.target === productModal) {
    productModal.setAttribute("aria-hidden", "true");
  }
});
/****************************************
 * RENDER CART ITEMS
 ****************************************/

function renderCart(containerId = "cart-items", totalId = "cart-total") {
  const container = document.getElementById(containerId);
  if (!container) return;

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

  const totalEl = document.getElementById(totalId);
  if (totalEl) {
    const itemTotal = parseFloat(cartTotal());
    const finalTotal = cart.length > 0 ? itemTotal + 5 : 0;
    totalEl.textContent = finalTotal.toFixed(2);
  }
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

/****************************************
 * CHECKOUT BUTTON REDIRECT
 ****************************************/

const checkoutBtn = document.getElementById("checkout-button");
checkoutBtn?.addEventListener("click", () => {
  saveCart();
  window.location.href = "checkout.html";
});

/****************************************
 * PAYPAL BUTTON RENDER (For checkout.html)
 ****************************************/

function renderPayPalButton(containerId = "paypal-button-container") {
  const container = document.getElementById(containerId);
  if (!container || !window.paypal) return;

  const shipping = 5; // fixed shipping cost
  const subtotal = parseFloat(cartTotal());
  const total = (subtotal + shipping).toFixed(2);

  paypal.Buttons({
    style: { layout: 'vertical', label: 'pay' },
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: (parseFloat(cartTotal()) + 5).toFixed(2),
            currency_code: "GBP",
            breakdown: {
              item_total: { value: cartTotal(), currency_code: "GBP" },
              shipping: { value: "5.00", currency_code: "GBP" }
            }
          },
          items: cart.map(item => ({
            name: `${item.name} (${item.size})`,
            unit_amount: { value: item.price.toFixed(2), currency_code: "GBP" },
            quantity: item.qty
          }))
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(() => {
        document.getElementById("order-message").textContent =
        "Thank you! Your order is complete.";
           // Add Back to Printstore button
    document.getElementById("post-order-buttons").innerHTML = `
    <a href="printstore.html" class="back-to-store-btn">
        ← Back to Printstore
      </a>
  `;

  // Hide cart details and PayPal buttons
  document.getElementById("cart-details").classList.add("hidden");
  document.getElementById("paypal-button-container").classList.add("hidden");

        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
      });
    }
  }).render(`#${containerId}`);
}

/****************************************
 * INITIAL UPDATE
 ****************************************/

updateCartCount();
