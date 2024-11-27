var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
  });
}


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

/* slideshow */

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
