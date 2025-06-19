const vermelho = document.getElementById('vermelho');
const amarelo = document.getElementById('amarelo');
const verde = document.getElementById('verde');
const botao = document.getElementById('botao');
const reiniciar = document.getElementById('reiniciar');
const resultado = document.getElementById('resultado');
const rankingTable = document.querySelector('#ranking tbody');

let podeClicar = false;
let inicioTempo;
let ranking = [];

function iniciarSemaforo() {
    resultado.textContent = '';
    botao.disabled = false;
    botao.style.display = 'inline-block';
    reiniciar.style.display = 'none';

    vermelho.classList.add('ativo');
    amarelo.classList.remove('ativo');
    verde.classList.remove('ativo');
    podeClicar = false;

    setTimeout(() => {
        vermelho.classList.remove('ativo');
        amarelo.classList.add('ativo');
    }, 1000);

    setTimeout(() => {
        amarelo.classList.remove('ativo');
        verde.classList.add('ativo');
        inicioTempo = Date.now();
        podeClicar = true;
    }, 2000 + Math.random() * 2000);   // Tempo aleatório entre 2s e 4s
}

function atualizarRanking(tempo) {
    ranking.push(tempo);
    ranking.sort((a, b) => a - b);
    if (ranking.length > 5) {
        ranking = ranking.slice(0, 5); // Mantém só os 5 melhores
    }

    rankingTable.innerHTML = '';
    ranking.forEach((tempo, index) => {
        const linha = `<tr><td>${index + 1}</td><td>${tempo} ms</td></tr>`;
        rankingTable.innerHTML += linha;
    });
}

botao.addEventListener('click', () => {
    if (podeClicar) {
        let tempoReacao = Date.now() - inicioTempo;
        resultado.textContent = `Seu tempo de reação foi: ${tempoReacao} ms!`;
        atualizarRanking(tempoReacao);
        podeClicar = false;
        botao.disabled = true;
        // Make the 'botao' disappear after a valid click
        botao.style.display = 'none';
        reiniciar.style.display = 'inline-block';
    } else {
        resultado.textContent = 'Você clicou antes de ficar verde! Tente novamente.';
        botao.disabled = true;
        // Make the 'botao' disappear even if clicked too early
        botao.style.display = 'none';
        reiniciar.style.display = 'inline-block';
    }
});

reiniciar.addEventListener('click', iniciarSemaforo);

window.onload = iniciarSemaforo;