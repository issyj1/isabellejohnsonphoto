document.addEventListener("DOMContentLoaded", () => {
  const togglers = document.querySelectorAll(".caret");
  const overlays = {
    about: document.getElementById("about-overlay"),
    contact: document.getElementById("contact-overlay")
  };

  togglers.forEach(toggler => {
    toggler.addEventListener("click", function () {
      // Close all other dropdowns
      document.querySelectorAll(".nested").forEach(nested => {
        if (nested !== this.nextElementSibling) {
          nested.classList.remove("active");
        }
      });
      document.querySelectorAll(".caret").forEach(c => {
        if (c !== this) {
          c.classList.remove("caret-down");
        }
      });

      // Toggle this dropdown
      this.classList.toggle("caret-down");
      const nested = this.nextElementSibling;
      if (nested) nested.classList.toggle("active");

      // Handle overlays
      const isAbout = this.id === "about-toggle";
      const isContact = this.id === "contact-toggle";

      overlays.about.classList.toggle("show", isAbout && nested.classList.contains("active"));
      overlays.contact.classList.toggle("show", isContact && nested.classList.contains("active"));
    });
  });
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




/* Front page slideshow */

  let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
}



/* swipe out array trial */
let image2 = document.getElementById("image2");
let imageIndex2 = 0;
let images2 = [
  "image1.jpg", // Replace with your image paths
  "image2.jpg",
  "image3.jpg"
];

image2.addEventListener("click", () => {
  // When the image is clicked, begin the transition
  if (imageIndex2 % 2 === 0) {
    image2.classList.remove("center2");
    image2.classList.add("left2");

    // Wait for the animation to finish before switching the image
    setTimeout(() => {
      imageIndex2 = (imageIndex2 + 1) % images2.length; // Cycle images
      image2.src = images2[imageIndex2]; // Change image source
      image2.classList.remove("left2");
      image2.classList.add("right2"); // Move image to the right

      // Wait for the image to come in from the right
      setTimeout(() => {
        image2.classList.remove("right2");
        image2.classList.add("center2"); // Bring the image to the center
      }, 1000); // Match the duration of the transition
    }, 1000); // Match the transition duration for moving left
  } else {
    image2.classList.remove("center2");
    image2.classList.add("right2");

    setTimeout(() => {
      imageIndex2 = (imageIndex2 + 1) % images2.length; // Cycle images
      image2.src = images2[imageIndex2]; // Change image source
      image2.classList.remove("right2");
      image2.classList.add("left2"); // Move image to the left

      setTimeout(() => {
        image2.classList.remove("left2");
        image2.classList.add("center2"); // Bring the image back to the center
      }, 1000); // Match the duration of the transition
    }, 1000); // Match the transition duration for moving right
  }
});



/* test to EDIT*/

function toggleMenu() {
  var overlay = document.querySelector('.overlay');

  overlay.classList.toggle('show'); // Toggle the overlay background

}

