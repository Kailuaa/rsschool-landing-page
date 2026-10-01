


const slider = document.querySelector(".favorite-rawslider");
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide-content");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dots = document.querySelectorAll(".control-dot");

let currentSlide = 0;

// ------------ show slide ------------
function showSlide(index) {
    if (!slider || !track || !slides.length) {
        return;
    }
    currentSlide = index;
    const slideWidth = slider.clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

// ------------ next slide ------------
if (next) {
    next.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
}

// ------------ previous slide ------------
if (prev) {
    prev.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    });
}

// ------------ dots ------------
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});


// ------------ resize ------------

window.addEventListener("resize", () => {
    showSlide(currentSlide);
});


// initial slide 
showSlide(0);
