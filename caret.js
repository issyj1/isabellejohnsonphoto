

var toggler = document.getElementsByClassName("caret");
var overlay = document.querySelector('.overlay');


for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    const currentNested = this.nextElementSibling;
    const isCurrentlyActive = currentNested.classList.contains("active");

    const allNested = document.querySelectorAll(".nested");
    const allCarets = document.querySelectorAll(".caret");
    allNested.forEach(el => {
      el.classList.remove("active");

      const fadeItems = el.querySelectorAll(".fade-item");
      fadeItems.forEach(item => {
        item.style.transitionDelay = "0s";
      });

      const paragraphs = el.querySelectorAll("p");
      paragraphs.forEach(p => {
        p.style.transitionDelay = "0s";
      });
    });
    allCarets.forEach(el => el.classList.remove("caret-down"));

    // ⬇️ Target slideshow nav buttons
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!isCurrentlyActive) {
      currentNested.classList.add("active");
      this.classList.add("caret-down");

      if (this.classList.contains("portfolio-caret")) {
        const fadeItems = currentNested.querySelectorAll(".fade-item");
        fadeItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.2}s`;
        });
        overlay.classList.remove("show");

        // Show slideshow buttons
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
      }

      if (this.classList.contains("about-caret") || this.classList.contains("contact-caret")) {
        const paragraphs = currentNested.querySelectorAll("p");
        paragraphs.forEach((p, index) => {
          p.style.transitionDelay = `${index * 0.3}s`;
        });
        overlay.classList.add("show");

        // Hide slideshow buttons
        nextBtn.style.zIndex = '-60';
prevBtn.style.zIndex = '-60';
footer.style.zIndex = '-60';
      }
    } else {
      overlay.classList.remove("show");

      // Show slideshow buttons
      nextBtn.style.display = 'inline-block';
      prevBtn.style.display = 'inline-block';
    }
  });
}





// Your existing caret + overlay toggle JS
var toggler = document.getElementsByClassName("caret");
var overlay = document.querySelector('.overlay');

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle('rotate');


  // Hide overlay whenever menu toggles
  overlay.classList.remove("show");
  // Reset all nested menus (close them)
  const allNested = document.querySelectorAll(".nested");
  allNested.forEach(nested => nested.classList.remove("active"));

  // Remove all caret-down classes
  const allCarets = document.querySelectorAll(".caret");
  allCarets.forEach(caret => caret.classList.remove("caret-down"));
});


/*const nestedAbout = document.querySelector("h1");
const backgroundTest = document.querySelector('.backgroundtest');

nestedAbout.addEventListener('click', () => {
  backgroundTest.classList.toggle('active');
})
/*TEST*/




function showMenu() {
  return;
  var items = document.getElementsByClassName("fade-item");
  for (let i = 0; i < items.length; ++i) {
    fadeIn(items[i], i * 500)
  }
  function fadeIn (item, delay) {
    setTimeout(() => {
      item.classList.add('fadein')
    }, delay)
  }
}

var items = document.getElementsByClassName("fade-item");
  for (let i = 0; i < items.length; ++i) {
    fadeIn(items[i], i * 50)
  }
  function fadeIn (item, delay) {
    setTimeout(() => {
      item.classList.add('fadein')
    }, delay)
  }

/*Ham menu javascript*/

/*const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
})*/

  /*BACKGROUND color test*/










document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.tooltip-container');

  containers.forEach(container => {
    const tooltip = container.querySelector('.tooltip-text');

    container.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    container.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.clientX + 15 + 'px';
      tooltip.style.top = e.clientY + 15 + 'px';
    });

    container.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
});


/* test slideshow */
const gallery = document.getElementById('img-gallery-portrait');
const images = Array.from(gallery.querySelectorAll('img')).map(img => img.src);

let currentIndex = 0;

const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');

const offscreenRight = 'translate(-50%, -50%) translateX(120vw) perspective(600px) rotateX(10deg) rotateY(30deg) translateY(-30px)';
const offscreenLeft  = 'translate(-50%, -50%) translateX(-100vw) perspective(600px) rotateX(10deg) rotateY(30deg) translateY(-30px)';
const centered       = 'translate(-50%, -50%) translateX(0)';

// Initial setup - no transition
slide1.style.transition = 'none';
slide2.style.transition = 'none';

slide1.style.backgroundImage = `url('${images[currentIndex]}')`;
slide1.style.transform = centered;
slide2.style.transform = offscreenRight;

void slide1.offsetWidth;
void slide2.offsetWidth;

slide1.style.transition = 'transform 0.6s ease';
slide2.style.transition = 'transform 0.6s ease';

let isSlide1Visible = true;

function nextSlide() {
  const nextIndex = (currentIndex + 1) % images.length;
  slideTransition(nextIndex, true);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  slideTransition(prevIndex, false);
}

function slideTransition(targetIndex, forward = true) {
  if (isSlide1Visible) {
    if (forward) {
      slide2.style.backgroundImage = `url('${images[targetIndex]}')`;
      slide2.style.transition = 'none';
      slide2.style.transform = offscreenRight;
    } else {
      slide2.style.backgroundImage = `url('${images[targetIndex]}')`;
      slide2.style.transition = 'none';
      slide2.style.transform = offscreenLeft;
    }

    void slide2.offsetWidth; // force reflow

    slide1.style.transition = 'transform 0.6s ease';
    slide2.style.transition = 'transform 0.6s ease';

    slide1.style.transform = forward ? offscreenLeft : offscreenRight;
    slide2.style.transform = centered;

    isSlide1Visible = false;
  } else {
    if (forward) {
      slide1.style.backgroundImage = `url('${images[targetIndex]}')`;
      slide1.style.transition = 'none';
      slide1.style.transform = offscreenRight;
    } else {
      slide1.style.backgroundImage = `url('${images[targetIndex]}')`;
      slide1.style.transition = 'none';
      slide1.style.transform = offscreenLeft;
    }

    void slide1.offsetWidth; // force reflow

    slide1.style.transition = 'transform 0.6s ease';
    slide2.style.transition = 'transform 0.6s ease';

    slide2.style.transform = forward ? offscreenLeft : offscreenRight;
    slide1.style.transform = centered;

    isSlide1Visible = true;
  }

  currentIndex = targetIndex;
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);


/*Art page btm */

function toggleText() {
  const box = document.getElementById("infoBox");
  
  const btn = document.querySelector(".expand-btn");
  

  box.classList.toggle("active");
  btn.textContent = box.classList.contains("active") ? "Hide Info" : "Show Info";
}

/*print store modal*/



document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.product-grid');
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalBuyButton = document.getElementById('modal-buy-button');
  const closeBtn = document.querySelector('.close');

  if (!gallery) return;

  const products = Array.from(gallery.querySelectorAll('.product'));
  let currentIndex = 0;

  function openModal(index) {
    const product = products[index];
    if (!product) return;

    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = product.querySelector('img').src;
    modalTitle.textContent = product.querySelector('h2').textContent;
    modalPrice.textContent = product.querySelector('p').textContent;

    const productId = product.dataset.productId;
    if (productId) {
      modalBuyButton.setAttribute('data-product-id', productId);
      if (window.GoCommerce && typeof GoCommerce.renderButtons === 'function') {
        GoCommerce.renderButtons();
      }
    }
  }

  products.forEach((product, index) => {
    product.addEventListener('click', () => openModal(index));
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'flex') return;

    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % products.length;
      openModal(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + products.length) % products.length;
      openModal(currentIndex);
    } else if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
});

/*Print store rendering*/
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.product-grid');
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalBuyButton = document.getElementById('modal-paypal-button');
  const sizeSelect = document.getElementById('size-select');
  const closeBtn = document.querySelector('.close');

  if (!gallery) return;

  const products = Array.from(gallery.querySelectorAll('.product'));
  let currentIndex = 0;

  function renderPayPalButton(description, price) {
    // Clear old button
    modalBuyButton.innerHTML = '';

    // Render new PayPal button
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 35
      },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          description: description,
          amount: { value: price }
        }]
      }),
      onApprove: (data, actions) => actions.order.capture().then(details => {
        alert(
          `Transaction completed by ${details.payer.name.given_name} for ${description} (${sizeSelect.options[sizeSelect.selectedIndex].text})!`
        );
      })
    }).render('#modal-paypal-button');
  }

  function openModal(index) {
    const product = products[index];
    if (!product) return;

    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = product.querySelector('img').src;
    modalTitle.textContent = product.querySelector('h2').textContent;

    // Default to current dropdown value
    const price = sizeSelect.value;
    modalPrice.textContent = `£${price}`;

    // Render PayPal button
    renderPayPalButton(modalTitle.textContent, price);
  }

  // Re-render PayPal button & update price when size changes
  sizeSelect.addEventListener('change', () => {
    const description = modalTitle.textContent;
    const price = sizeSelect.value;

    // Update visible price in modal
    modalPrice.textContent = `£${price}`;

    // Re-render PayPal button
    renderPayPalButton(description, price);
  });

  // Hook up product clicks
  products.forEach((product, index) => {
    product.addEventListener('click', () => openModal(index));
  });

  // Close modal
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'flex') return;

    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % products.length;
      openModal(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + products.length) % products.length;
      openModal(currentIndex);
    } else if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
});
