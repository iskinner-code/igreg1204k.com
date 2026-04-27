const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showNextSlide() {
  // Remove active from current
  slides[currentIndex].classList.remove("active");

  // Move to next
  currentIndex = (currentIndex + 1) % slides.length;

  // Add active to next
  slides[currentIndex].classList.add("active");
}

// Change slide every 4 seconds
setInterval(showNextSlide, 4000);
