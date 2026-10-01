export class MenuItem {
    constructor(id, category, title, description, price, image) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    generateCard() {
        const card = document.createElement('div');
        card.className = 'menu-preview';
        card.setAttribute('data-id', this.id);
        card.setAttribute('data-category', this.category);
        
        card.innerHTML = `
            <img class="preview" src="${this.image}" alt="${this.title}">
            <div class="menu-description">
                <div class="menu-title">
                    <h2>${this.title}</h2>
                    <p>${this.description}</p>
                </div>
                <h2>$${this.price.toFixed(2)}</h2>
            </div>     
        `
        return card;
    }

    generateModal() {
    const modal = document.createElement("section");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-preview">
                <img class="modal-image" src="${this.image}" alt="${this.title}">
                <div class="modal-description">
                    <div class="modal-title">
                        <h2 class="modal-title-text">${this.title}</h2>
                        <p class="modal-description-text">${this.description}</p>
                    </div>
                    <div class="modal-options modal-size">
                        <p>Size</p>
                        <div class="modal-tabs">
                            <button class="btn-option active" data-price="-0.5">
                                <span class="modal-icon active">S</span>
                                200 ml
                            </button>
                            <button class="btn-option" data-price="0">
                                <span class="modal-icon">M</span>
                                300 ml
                            </button>
                            <button class="btn-option" data-price="1">
                                <span class="modal-icon">L</span>
                                400 ml
                            </button>
                        </div>
                    </div>
                    <div class="modal-options modal-additives">
                        <p>Additives</p>
                        <div class="modal-tabs">
                            <button class="btn-option" data-price="0.25">
                                <span class="modal-icon">1</span>
                                Sugar
                            </button>
                            <button class="btn-option" data-price="0.25">
                                <span class="modal-icon">2</span>
                                Cinnamon
                            </button>
                            <button class="btn-option" data-price="0.25">
                                <span class="modal-icon">3</span>
                                Syrup
                            </button>
                        </div>
                    </div>
                    <div class="modal-total">
                        <h2>Total:</h2>
                        <h2 class="modal-price">$${this.price.toFixed(2)}</h2>
                    </div>
                    <div class="modal-alert">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_147811_7961)">
                                <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_147811_7961">
                                <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p>
                            The cost is not final. Download our mobile app
                            to see the final price and place your order.
                            Earn loyalty points and enjoy your favorite coffee
                            with up to 20% discount.
                        </p>
                    </div>
                    <button class="modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    return modal;
}
}