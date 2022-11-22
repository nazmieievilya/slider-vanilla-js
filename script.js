const carouselContainer = document.querySelector(".carousel");
const carouselSlidesArr = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".carousel-dots");
let currentSlide = 1;
const clickHandler = function (e) {
  if (!e.target.closest(".carousel-btn")) return;
  if (e.target.closest(".carousel-btn").classList.contains("carousel-right")) {
    nextSlide();
    return updateActiveDot();
  }
  if (e.target.closest(".carousel-btn").classList.contains("carousel-left")) {
    prevSlide();
    return updateActiveDot();
  }
};
function nextSlide() {
  if (currentSlide === carouselSlidesArr.length) {
    currentSlide = 1;
    return addOffset();
  }
  ++currentSlide;
  return addOffset();
}

function prevSlide() {
  if (currentSlide === 1) {
    currentSlide = carouselSlidesArr.length;
    return addOffset();
  }
  --currentSlide;
  return addOffset();
}
function addOffset(index = currentSlide) {
  carouselSlidesArr.forEach((slide, i) => {
    slide.style.transform = `translateX(${
      880 * i - 880 * (currentSlide - 1)
    }px)`;
  });
}
function addDots() {
  carouselSlidesArr.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      ` <button data-index="${++i}" class="carousel-dot ${
        i + 1 === currentSlide ? "carousel-dot--active" : null
      }">&nbsp;</button>`
    );
  });
}
addDots();
function updateActiveDot(index = currentSlide) {
  const dots = document.querySelectorAll(".carousel-dot");
  // removing active classes from all dots
  dots.forEach((d) => d.classList.remove("carousel-dot--active"));
  // adding active class to brand new one
  dots.forEach((d, i) => {
    if (i + 1 === index) d.classList.add("carousel-dot--active");
  });
}
function dotsClickHandler(e) {
  currentSlide = +e.target.dataset.index;
  addOffset(currentSlide);
  updateActiveDot();
}
addOffset();
updateActiveDot();
carouselContainer.addEventListener("click", clickHandler);
dotsContainer.addEventListener("click", dotsClickHandler);
