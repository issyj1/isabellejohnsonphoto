var toggler = document.getElementsByClassName("caret");
var overlay = document.querySelector('.overlay');

for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    const currentNested = this.nextElementSibling;
    const isCurrentlyActive = currentNested.classList.contains("active");

    // Close all nested and remove caret-down
    const allNested = document.querySelectorAll(".nested");
    const allCarets = document.querySelectorAll(".caret");
    allNested.forEach(el => {
      el.classList.remove("active");
      // Reset transition delays for portfolio fade-items
      const fadeItems = el.querySelectorAll(".fade-item");
      fadeItems.forEach(item => {
        item.style.transitionDelay = "0s";
      });
      // Reset delays for paragraphs (about/contact)
      const paragraphs = el.querySelectorAll("p");
      paragraphs.forEach(p => {
        p.style.transitionDelay = "0s";
      });
    });
    allCarets.forEach(el => el.classList.remove("caret-down"));

    if (!isCurrentlyActive) {
      currentNested.classList.add("active");
      this.classList.add("caret-down");

      if (this.classList.contains("portfolio-caret")) {
        // Stagger fade-items for portfolio
        const fadeItems = currentNested.querySelectorAll(".fade-item");
        fadeItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.2}s`;
        });
        overlay.classList.remove("show"); // No overlay for portfolio
      }

      if (this.classList.contains("about-caret") || this.classList.contains("contact-caret")) {
        // Stagger paragraphs for about/contact
        const paragraphs = currentNested.querySelectorAll("p");
        paragraphs.forEach((p, index) => {
          p.style.transitionDelay = `${index * 0.3}s`;
        });
        overlay.classList.add("show");
      }
    } else {
      overlay.classList.remove("show");
    }
  });
}




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
