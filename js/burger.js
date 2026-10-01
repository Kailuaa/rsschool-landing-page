
// ------------ menu burger ------------
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerLinks = burgerMenu.querySelectorAll('a');

// открываем бургер
function openBurgerMenu() {
    burger.classList.toggle("open");
    burgerMenu.classList.toggle("open");
    if (burgerMenu.classList.contains('open')) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
}

// закрываем бургер
function closeBurgerMenu() {
    burger.classList.remove("open");
    burgerMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
}

// открывваем бургер по нажатию  
burger.addEventListener("click", openBurgerMenu);

// закрываем при выборе пункта навигации
burgerLinks.forEach(link => {
    link.addEventListener("click", closeBurgerMenu);
})

// закрываем через Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeBurgerMenu();
    }
});


