// script.js — Animações e interações dinâmicas do portfólio

// 1) Efeito de digitação no título principal
// Pega o elemento que contém o texto "Eleve seu negócio digital a outro nível"
// e o que sofre o efeito de digitação
const tituloCompleto = "com um serviço de qualidade!";
const elementoTexto = document.querySelector('[data-typing]');
const cursor = document.querySelector('[data-cursor]');

if (elementoTexto) {
    let indice = 0;
    const digitar = () => {
        // Adiciona uma letra por vez ao texto
        elementoTexto.textContent = tituloCompleto.slice(0, indice);
        indice++;
        if (indice <= tituloCompleto.length) {
            // Continua digitando até terminar a frase
            setTimeout(digitar, 60);
        } else {
            // Esconde o cursor depois que termina
            if (cursor) cursor.style.display = 'none';
        }
    };
    // Espera 600ms para o restante da página aparecer antes de digitar
    setTimeout(digitar, 600);
}

// 2) Animações ao rolar a página (scroll reveal)
// Seleciona todos os elementos com a classe "reveal"
const elementosReveal = document.querySelectorAll('.reveal');

// Criamos um "observador" que detecta quando um elemento entra na tela
const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                // Quando o elemento aparece na tela, adiciona a classe "visible"
                entrada.target.classList.add('visible');
                // Depois de revelar, para de observar (evita re-animações)
                observer.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.15 } // elemento precisa estar pelo menos 15% visível
);

elementosReveal.forEach((el) => observer.observe(el));

// 3) Contadores animados (contagem quando entra na tela)
const contadores = document.querySelectorAll('[data-contador]');

const observerContadores = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                const elemento = entrada.target;
                const alvo = parseInt(elemento.dataset.contador, 10);
                let atual = 0;
                const passo = Math.ceil(alvo / 50); // quantidade por "tick"
                const intervalo = setInterval(() => {
                    atual += passo;
                    if (atual >= alvo) {
                        atual = alvo;
                        clearInterval(intervalo);
                    }
                    elemento.textContent = atual;
                }, 30);
                observerContadores.unobserve(elemento);
            }
        });
    },
    { threshold: 0.5 }
);

contadores.forEach((c) => observerContadores.observe(c));