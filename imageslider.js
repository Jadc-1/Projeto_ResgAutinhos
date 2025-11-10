const wrapper = document.querySelector(".wrapper");
const cartoes = document.querySelector(".cartoes")
const botoes = document.querySelectorAll(".wrapper i")
const larguraPrimeiroCard = cartoes.querySelector(".cartao").offsetWidth;
const cartoesFilhos = [...cartoes.children]; //Faz um array dos LIs dentro de cartoes

let isArrastando = false, inicioX, inicioScrollEsquerda, timeoutId; //Só iniciará 

//Pega a quantidade de cartões que podem encaixar dentro do slider por vez 
let cartaoPorVista = Math.round(cartoes.offsetWidth / larguraPrimeiroCard);


//Adiciona cópias dos últimos cartões adicionados para o ínicio do slider novamente para ter um scroll infinito
cartoesFilhos.slice(-cartaoPorVista).reverse().forEach(cartao => {
    cartoes.insertAdjacentHTML("afterbegin", cartao.outerHTML)
});


//Adiciona cópias dos últimos cartões adicionados para o final do slider novamente para ter um scroll infinito
cartoesFilhos.slice(0, cartaoPorVista).forEach(cartao => {
    cartoes.insertAdjacentHTML("beforeend", cartao.outerHTML)
});

botoes.forEach(btn => {
    btn.addEventListener("click", () => {
        cartoes.scrollLeft += btn.id === "esquerda" ? -larguraPrimeiroCard : larguraPrimeiroCard; //Se clicou o da esquerda, subtraia, direita adicione
    });
});

const arrastarInicio = (e) => {
    isArrastando = true;
    cartoes.classList.add("arrastando");
    // Grava a posição inicial do cursor and "scrolla" da posição do imagem slider
    inicioX = e.pageX;
    inicioScrollEsquerda = cartoes.scrollLeft;
}

//Função lambda para o slide de imagens
const arrastando = (e) => {
    if (!isArrastando) return; //Se isArrastando for verdadeiro, ele retorna daqui
    //Atualiza a posição do scroll de acordo com a movimentação do cursor
    cartoes.scrollLeft = inicioScrollEsquerda - (e.pageX - inicioX);
}

const arrastarParar = () => {
    isArrastando = false;
    cartoes.classList.remove("arrastando"); //Remove a possibilidade de arrastar quando soltar o botão de pressionar
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; //retorna se a janela for menor que 800
    //Da autoplay no carrossel a cada 2,5 s
    timeoutId = setTimeout(() => cartoes.scrollLeft += larguraPrimeiroCard, 2500);
};



const scrollInfinito = () => {
    // Se o carrossel de imagens está no começo, scrolla até o final
    if(cartoes.scrollLeft === 0) {
        cartoes.classList.add("sem-transicao");
        cartoes.scrollLeft = cartoes.scrollWidth - (2 *cartoes.offsetWidth);
        cartoes.classList.remove("sem-transicao");
    //Se o carrossel de imagens está no final, scrolla até o começo
    } else if(Math.ceil(cartoes.scrollLeft) === cartoes.scrollWidth - cartoes.offsetWidth) {
        cartoes.classList.add("sem-transicao");
        cartoes.scrollLeft = cartoes.offsetWidth;
        cartoes.classList.remove("sem-transicao");  
    }

    //Se o mouse não está em hover no carrossel, da autoplay nele e limpa o autoplay existente
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover"))
        autoPlay();
};


cartoes.addEventListener("mousedown", arrastarInicio);
cartoes.addEventListener("mousemove", arrastando);
document.addEventListener("mouseup", arrastarParar)
cartoes.addEventListener("scroll", scrollInfinito)
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);