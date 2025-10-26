/* Classe utilizada para realizar a animação de abrir e fechar o menu mobile */

class MenuMobile {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this); /*Utilizado para não perder a referência do objeto, ao usar o EventListener*/
    }

    animarLinks() {
        this.navLinks.forEach((link, index) => {
            /* Uso diferentes velocidades para cada link */

            /* Mesma ideia de um if, utilizando um ternário para aplicar e retirar animação */
            link.style.animation ? (link.style.animation = "") : (link.style.animation = `mainNavFade 0.5s ease forwards ${index / 7 + 0.2}s`)
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass)
        this.animarLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick); /*"escuta o click" no botão e ativa a função handleClick*/
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const menuMobile = new MenuMobile(
    ".menu-celular",
    ".main-nav",
    ".main-nav li"
);

menuMobile.init();
