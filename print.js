
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
  
  /*button rendering*/
  document.addEventListener('DOMContentLoaded', () => {
    function renderButtons() {
      if (!window.paypal) {
        setTimeout(renderButtons, 50); // retry until SDK loads
        return;
      }
  
      const products = [
        { id: 'paypal-button-container-1', description: 'Print 1', amount: '25.00' },
        { id: 'paypal-button-container-2', description: 'Print 2', amount: '30.00' },
        { id: 'paypal-button-container-3', description: 'Print 3', amount: '20.00' }
      ];
  
      products.forEach(product => {
        const container = document.getElementById(product.id);
        if (container) { // make sure the div exists
          paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'pay',
              height: 45
            },
            createOrder: (data, actions) => actions.order.create({
              purchase_units: [{ description: product.description, amount: { value: product.amount } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(details => {
              alert(`Transaction completed by ${details.payer.name.given_name} for ${product.description}!`);
            })
          }).render(`#${product.id}`);
        }
      });
    }
  
    renderButtons();
  });
  
  /*modal button rendering*/
  const modalBuyButton = document.getElementById('modal-paypal-button');
  
  function openModal(index) {
    const product = products[index];
    if (!product) return;
  
    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = product.querySelector('img').src;
    modalTitle.textContent = product.querySelector('h2').textContent;
    modalPrice.textContent = product.querySelector('p').textContent;
  
    // Clear previous PayPal button
    modalBuyButton.innerHTML = '';
  
    // Render PayPal button for this product
    if (window.paypal) {
      const price = product.querySelector('p').textContent.replace('£',''); // strip £
      paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', height: 45 },
        createOrder: (data, actions) => actions.order.create({
          purchase_units: [{ description: product.querySelector('h2').textContent, amount: { value: price } }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
          alert(`Transaction completed by ${details.payer.name.given_name} for ${product.querySelector('h2').textContent}!`);
        })
      }).render('#modal-paypal-button');
    }
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
    const products = document.querySelectorAll('.product');
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalBuyButton = document.getElementById('modal-paypal-button');
    const sizeSelect = document.getElementById('size-select');
    const closeBtn = document.querySelector('.close');
  
    function renderPayPalButton(description, price) {
      // Wait until PayPal SDK is loaded
      if (!window.paypal) {
        setTimeout(() => renderPayPalButton(description, price), 50);
        return;
      }
  
      modalBuyButton.innerHTML = '';
  
      paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', height: 45 },
        createOrder: (data, actions) => actions.order.create({
          purchase_units: [{ description, amount: { value: price } }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
          alert(`Transaction completed by ${details.payer.name.given_name} for ${description} (${sizeSelect.options[sizeSelect.selectedIndex].text})!`);
        })
      }).render('#modal-paypal-button');
    }
  
    function openModal(product) {
      modal.style.display = 'flex';
      modalImage.src = product.querySelector('img').src;
      modalTitle.textContent = product.querySelector('h2').textContent;
  
      // Default price from dropdown
      const price = sizeSelect.value;
      modalPrice.textContent = `£${price}`;
  
      renderPayPalButton(modalTitle.textContent, price);
    }
  
    products.forEach(product => {
      product.addEventListener('click', () => openModal(product));
    });
  
    sizeSelect.addEventListener('change', () => {
      const price = sizeSelect.value;
      modalPrice.textContent = `£${price}`;
      renderPayPalButton(modalTitle.textContent, price);
    });
  
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
  
  /* render buttons */
  
  
  
