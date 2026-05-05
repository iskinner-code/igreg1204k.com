function startSlideshow() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length === 0) return;

  let currentIndex = 0;

  setInterval(() => {
    slides[currentIndex].classList.remove("slide-active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("slide-active");
  }, 4000);
}

window.addEventListener("load", () => {
  // small delay ensures includes finish injecting DOM
  setTimeout(startSlideshow, 100);
});
