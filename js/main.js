import "./burger.js";
import "./slider.js";
import "./theme-switcher.js";

import { MenuItems } from "./menu-data.js";

const menuGrid = document.querySelector('.menu-grid');
const categoryButtons = document.querySelectorAll('.menu-tabs .btn-menu');
const moreButton = document.querySelector('.menu-more');

let currentCategory = 'coffee';
const cardsPerPage = 4;
let showAll = false;

// рендерим меню (убираем старые карточки и вставляем новые)
function renderMenu(items) {
    menuGrid.innerHTML = "";

    items.forEach(item => {
        const card = item.generateCard();
        card.addEventListener('click', () => {
            openModal(item);
        })
        menuGrid.append(card);  
    });
}

//проверяем ширину экрана
function isMobileOrTablet() {
    return window.innerWidth <= 768;
}

// фильтруем по категориям
function showCategory(category) {
    currentCategory = category;

    const filteredItems = MenuItems.filter(item => {
        return item.category === category;
    });

    if (isMobileOrTablet() && !showAll && filteredItems.length > cardsPerPage) {        
        renderMenu(filteredItems.slice(0,cardsPerPage));
        moreButton.style.display = 'block';
    } else {
        renderMenu(filteredItems);
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

if (moreButton) {
    moreButton.addEventListener('click', () => {
        showAll = true;
        showCategory(currentCategory);
    })
}

// по умолчанию категория кофе
showCategory(currentCategory);


// генерируем модалку в html + setup
function openModal(item) {
    const modal = item.generateModal();

    document.body.append(modal);
    modal.classList.add("open");

    setupModal(modal, item);
}

function setupModal(modal, item) {
    const sizeButtons = modal.querySelectorAll(".modal-size .btn-option");
    const additiveButtons = modal.querySelectorAll(".modal-additives .btn-option");
    const modalPrice = modal.querySelector(".modal-price");
    const closeButton = modal.querySelector(".modal-btn");

    // пересчитываем итоговую цену
    function updateModalPrice() {
        let total = item.price;

        // добавляем прайс за размер
        const activeSize = modal.querySelector(".modal-size .btn-option.active");
        if (activeSize) {
            total += Number(activeSize.dataset.price);
        }

        // добавляем прайс за добавки
        additiveButtons.forEach(button => {
            if (button.classList.contains("active")) {
                total += Number(button.dataset.price);
            }
        });

        modalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // выбираем размер (только один)
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            sizeButtons.forEach(button => {
                button.classList.remove("active");
                const icon = button.querySelector(".modal-icon");
                if (icon) {
                    icon.classList.remove("active");
                }
            });

            button.classList.add("active");
            const icon = button.querySelector(".modal-icon");
            if (icon) {
                icon.classList.add("active");
            }

            updateModalPrice();
        });
    });

    // выбираем добавки (можно несколько)
    additiveButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            const icon = button.querySelector(".modal-icon");
            if (icon) {
                icon.classList.toggle("active");
            }

            updateModalPrice();
        });
    });

    // закрываем по кнопке Close
    closeButton.addEventListener("click", () => {
        modal.remove();
    });

    // закрываем кликом вне модалки
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.remove();
        }
    });

    // закрываем через Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            modal.remove();
        }
    });

    // начальная цена
    updateModalPrice();
}


