
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
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalBuyButton = document.getElementById('modal-paypal-button');
    const sizeSelect = document.getElementById('size-select');
    const closeBtn = modal.querySelector('.close');
  
    const fixedShipping = 5.00; // Fixed shipping cost
  
    // Product-specific prices
    const productPrices = {
      PRODUCT_ID_1: { small: 65.00, medium: 85.00 },
      PRODUCT_ID_2: { small: 65.00, medium: 85.00 },
      PRODUCT_ID_3: { small: 65.00, medium: 85.00 },
      PRODUCT_ID_4: { small: 65.00, medium: 85.00 },
      PRODUCT_ID_5: { small: 65.00, medium: 85.00 },
      PRODUCT_ID_6: { small: 65.00, medium: 85.00 }
    };
  
    function renderPayPalButton(description, totalPrice, productId) {
      if (!window.paypal) {
        setTimeout(() => renderPayPalButton(description, totalPrice, productId), 80);
        return;
      }
  
      modalBuyButton.innerHTML = '';
      modalBuyButton.style.maxWidth = '220px';
  
      paypal.Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'pay',
          height: 30
        },
        createOrder: (data, actions) => actions.order.create({
          purchase_units: [{
            description: `${description} — ${sizeSelect.value}`,
            custom_id: productId || '',
            amount: { value: totalPrice }
          }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
          console.log('PayPal details: ', details);
          alert(
            `Thanks ${details.payer.name.given_name}! Order received.\n` +
            `Item: ${description}\n` +
            `Size: ${sizeSelect.value}\n` +
            `Total: £${totalPrice}`
          );
          closeModal();
        }),
        onError: (err) => {
          console.error('PayPal Buttons error:', err);
          alert('PayPal error — check console for details.');
        }
      }).render('#modal-paypal-button');
    }
  
    function openModal(productEl) {
      sizeSelect.value = 'small';
  
      const img = productEl.querySelector('img');
      modalImage.src = img.src;
      modalTitle.textContent = productEl.querySelector('h2').textContent;
  
      const productId = productEl.dataset.productId;
      modal.dataset.productId = productId || '';
  
      const basePrice = (productPrices[productId] && productPrices[productId][sizeSelect.value]) || 25.00;
      const totalPrice = (basePrice + fixedShipping).toFixed(2);
  
      modalPrice.textContent = `£${basePrice.toFixed(2)} + £${fixedShipping.toFixed(2)} shipping = £${totalPrice}`;
  
      modal.setAttribute('aria-hidden', 'false');
  
      renderPayPalButton(modalTitle.textContent, totalPrice, productId);
    }
  
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      modalBuyButton.innerHTML = '';
    }
  
    // Product click
    products.forEach(p => p.addEventListener('click', () => openModal(p)));
  
    // Size change updates total and PayPal button
    sizeSelect.addEventListener('change', () => {
      const productId = modal.dataset.productId;
      if (!productId) return;
  
      const basePrice = (productPrices[productId] && productPrices[productId][sizeSelect.value]) || 25.00;
      const totalPrice = (basePrice + fixedShipping).toFixed(2);
      modalPrice.textContent = `£${basePrice.toFixed(2)} + £${fixedShipping.toFixed(2)} shipping = £${totalPrice}`;
  
      renderPayPalButton(modalTitle.textContent, totalPrice, productId);
    });
  
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  });
  
