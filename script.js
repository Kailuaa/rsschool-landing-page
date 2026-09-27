// ------------ theme switcher ------------
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

// ------------ menu burger ------------
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerLinks = burgerMenu.querySelectorAll('a');

function openBurgerMenu() {
    burger.classList.toggle("open");
    burgerMenu.classList.toggle("open");
    if (burgerMenu.classList.contains('open')) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
}

function closeBurgerMenu() {
    burger.classList.remove("open");
    burgerMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
}

burger.addEventListener("click", openBurgerMenu);

burgerLinks.forEach(link => {
    link.addEventListener("click", closeBurgerMenu);
})

// ------------ slider ------------
const slides = document.querySelectorAll(".slide-content");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dots = document.querySelectorAll(".control-dot");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    })

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    })   
}

if (next && prev) {
    next.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
    
    prev.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide <= 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    });
}

if (dots.length) {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            dot.classList.toggle('active');
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// ------------ menu category ------------
const categoryButtons = document.querySelectorAll('.btn-menu');
const menuCards = document.querySelectorAll('.menu-preview');
const moreButton = document.querySelector('.menu-more');

const cardsPerPage = 4;
let showAll = false;


function showCategory(category) {
    let categoryCards = [];

    // сортируем по категориям
    menuCards.forEach(card => {
        card.style.display = 'none';
        if (card.dataset.category === category) {
            categoryCards.push(card);
        }
    })

    // показываем только 4
    categoryCards.forEach((card, index) => {
        if (showAll || index < cardsPerPage) {
            card.style.display = 'flex';
        }
    })

    // показываем кнопку если много карточек 
    if (categoryCards.length > cardsPerPage && !showAll) {
        moreButton.style.display = 'block';
    } else {
        moreButton.style.display = 'none';
    }
}

// настройка переключения категорий
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        categoryButtons.forEach(button => {
            button.classList.remove('active');
        })

        button.classList.add('active');
        showAll = false;
        showCategory(category);
    });
})

// кнопка загрузки еще 
moreButton.addEventListener("click", () => {
    showAll = true;
    const activeButton = document.querySelector('.btn-menu.active');
    const category = activeButton.dataset.category;
    showCategory(category);
})

showCategory('coffee'); // категория по умолчанию

// ------------ modal window ------------
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-btn');

const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title-text');
const modalDescription = document.querySelector('.modal-description-text');
const modalPrice = document.querySelector('.modal-price');

const sizeButtons = document.querySelectorAll('.modal-size .btn-option');
const additiveButtons = document.querySelectorAll('.modal-additives .btn-option');

let basePrice = 0;
let sizePrice = 0;
let additivesPrice = 0;

// считаем прайс
function updateModalPrice() {
    const totalPrice = basePrice + sizePrice + additivesPrice;
    modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// обнуляем выбор
function resetModalOptions() {
    sizeButtons.forEach(button => {
        button.classList.remove('active');
        button.querySelector('.modal-icon').classList.remove('active');
    });
    
    additiveButtons.forEach(button => {
        button.classList.remove('active');
        button.querySelector('.modal-icon').classList.remove('active');
    });

    // size по умолчанию М
    sizeButtons[1].classList.add('active');
    sizeButtons[1].querySelector('.modal-icon').classList.add('active');

    // сброс цен
    sizePrice = 0;
    additivesPrice = 0;
}

// подставляем инфу с карточек 
menuCards.forEach (card => {
    card.addEventListener('click', () => {
        const image = card.querySelector('.preview');
        const title = card.querySelector('h2');
        const description = card.querySelector('p');
        const price = card.querySelector('.menu-description > h2');

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = title.textContent;
        modalDescription.textContent = description.textContent;

        basePrice = parseFloat(price.textContent.replace('$', ''));

        resetModalOptions();
        updateModalPrice();

        modal.classList.add('open');
        document.body.classList.add('modal-open');
    })
})

// выбираем размер (только один)
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(button => {
            button.classList.remove('active');
            button.querySelector('.modal-icon').classList.remove('active');
        });
        button.classList.add('active');
        button.querySelector('.modal-icon').classList.add('active');
    
        sizePrice = Number(button.dataset.price);
    
        updateModalPrice();
    });
}); 

// выбираем добавки (можно несколько)
additiveButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        button.querySelector('.modal-icon').classList.toggle('active');
    
        if (button.classList.contains('active')) {
            additivesPrice += Number(button.dataset.price);
        } else {
            additivesPrice -= Number(button.dataset.price);
        }
    
        updateModalPrice();
    });
});

// закрыть окно
function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
}

modalClose.addEventListener('click', () => {
    closeModal();
})

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

