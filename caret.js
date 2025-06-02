var toggler = document.getElementsByClassName("caret");
var overlay = document.querySelector('.overlay');

for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    const currentNested = this.parentElement.querySelector(".nested");
    const isCurrentlyActive = currentNested.classList.contains("active");

    // Close all dropdowns and remove active classes
    const allNested = document.querySelectorAll(".nested");
    const allCarets = document.querySelectorAll(".caret");
    allNested.forEach(el => el.classList.remove("active"));
    allCarets.forEach(el => el.classList.remove("caret-down"));

    // Toggle current dropdown if not already open
    if (!isCurrentlyActive) {
      currentNested.classList.add("active");
      this.classList.add("caret-down");

      // Only show overlay for About or Contact
      if (this.classList.contains("about-caret") || this.classList.contains("contact-caret")) {
        overlay.classList.add("show");
      } else {
        overlay.classList.remove("show");
      }
    } else {
      overlay.classList.remove("show"); // If closing, hide overlay
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






