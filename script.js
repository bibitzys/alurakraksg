let vidas = 3;
let pontos = 0;
let fase = 1;
let respondeu = false;

const desafios = [
    {
        titulo: "A Floresta dos Algoritmos",
        historia:
            "Você entrou em uma floresta misteriosa. Para encontrar o tesouro, precisa resolver desafios usando lógica e algoritmos.",
        pergunta:
            "Qual sequência representa melhor um algoritmo para fazer um sanduíche?",
        opcoes: [
            "A) Comer → Fazer → Pegar ingredientes",
            "B) Pegar ingredientes → Montar → Comer",
            "C) Comer → Montar → Comprar ingredientes"
        ],
        correta: 2
    },

    {
        titulo: "🌉 A Ponte da Decisão",
        historia:
            "Você chegou a uma ponte. O guardião pede que você tome uma decisão usando uma estrutura condicional.",
        pergunta:
            "Se o jogador tiver 10 pontos ou mais, o que o algoritmo deve fazer?",
        opcoes: [
            "A) Se pontos >= 10, avançar",
            "B) Se pontos < 10, ganhar automaticamente",
            "C) Sempre voltar para o início"
        ],
        correta: 1
    },

    {
        titulo: "🔢 A Caverna dos Loops",
        historia:
            "Dentro da caverna existem 5 tochas. Você precisa acender todas usando uma repetição.",
        pergunta:
            "Qual estrutura é adequada para repetir uma ação várias vezes?",
        opcoes: [
            "A) if",
            "B) for",
            "C) else"
        ],
        correta: 2
    },

    {
        titulo: "🧠 O Guardião da Lógica",
        historia:
            "O guardião encontrou um erro no seu algoritmo. Agora você precisa identificar a lógica correta.",
        pergunta:
            "O que é um algoritmo?",
        opcoes: [
            "A) Uma sequência de passos para resolver um problema",
            "B) Apenas uma linguagem de programação",
            "C) Um tipo de computador"
        ],
        correta: 1
    },

    {
        titulo: "💎 O Tesouro Final",
        historia:
            "Você chegou à sala do tesouro! Falta apenas um último desafio.",
        pergunta:
            "Qual destas características é importante em um bom algoritmo?",
        opcoes: [
            "A) Ser confuso e infinito",
            "B) Ter passos claros e organizados",
            "C) Não possuir nenhuma ordem"
        ],
        correta: 2
    }
];

function carregarFase() {

    respondeu = false;

    const desafioAtual = desafios[fase - 1];

    document.getElementById("fase").textContent = fase;
    document.getElementById("titulo").textContent = desafioAtual.titulo;
    document.getElementById("historia").textContent = desafioAtual.historia;

    const desafio = document.getElementById("desafio");

    desafio.innerHTML = `
        <h3>Desafio ${fase}</h3>
        <p>${desafioAtual.pergunta}</p>

        ${desafioAtual.opcoes.map((opcao, index) => `
            <button onclick="responder(${index + 1})">
                ${opcao}
            </button>
        `).join("")}
    `;

    document.getElementById("mensagem").textContent = "";
    document.getElementById("proximo").style.display = "none";
}

function responder(opcaoEscolhida) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const desafioAtual = desafios[fase - 1];
    const mensagem = document.getElementById("mensagem");

    if (opcaoEscolhida === desafioAtual.correta) {

        pontos += 10;

        mensagem.textContent =
            "🎉 Resposta correta! Você ganhou 10 pontos.";

        mensagem.className = "acerto";

    } else {

        vidas--;

        mensagem.textContent =
            "❌ Resposta errada! Você perdeu uma vida.";

        mensagem.className = "erro";

        document.getElementById("vidas").textContent = vidas;

        if (vidas <= 0) {
            fimDeJogo(false);
            return;
        }
    }

    document.getElementById("pontos").textContent = pontos;
    document.getElementById("proximo").style.display = "block";
}

function proximaFase() {

    if (fase < desafios.length) {

        fase++;

        carregarFase();

    } else {

        fimDeJogo(true);
    }
}

function fimDeJogo(vitoria) {

    const card = document.querySelector(".card");

    if (vitoria) {

        card.innerHTML = `
            <div class="final">
                <h2>🏆 Você encontrou o tesouro!</h2>

                <p>
                    Parabéns, aventureiro! Você completou todos os
                    desafios de algoritmos.
                </p>

                <p>
                    ⭐ Pontuação final:
                    <strong>${pontos} pontos</strong>
                </p>

                <p>
                    ❤️ Vidas restantes:
                    <strong>${vidas}</strong>
                </p>

                <button onclick="reiniciarJogo()">
                    Jogar novamente
                </button>
            </div>
        `;

    } else {

        card.innerHTML = `
            <div class="final">
                <h2>💀 Fim da aventura!</h2>

                <p>
                    Você ficou sem vidas, mas todo programador
                    aprende tentando novamente.
                </p>

                <p>
                    ⭐ Pontuação:
                    <strong>${pontos} pontos</strong>
                </p>

                <button onclick="reiniciarJogo()">
                    Tentar novamente
                </button>
            </div>
        `;
    }
}

function reiniciarJogo() {

    vidas = 3;
    pontos = 0;
    fase = 1;

    document.getElementById("vidas").textContent = vidas;
    document.getElementById("pontos").textContent = pontos;
    document.getElementById("fase").textContent = fase;

    carregarFase();
}

carregarFase();
