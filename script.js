// theme switcher
const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");
const logo = document.querySelector(".logo");
const savedTheme = localStorage.getItem("theme");

lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    logo.src = "icons/logo-light.svg";
});

darkBtn.addEventListener("click", () => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    logo.src = "icons/logo-dark.svg";
});

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    logo.src = "icons/logo-dark.svg";
} else {
    document.body.classList.remove("dark-theme");
    logo.src = "icons/logo-light.svg";
}

// slider
const slides = document.querySelectorAll(".slide-content");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dots = document.querySelectorAll(".control-dot");

