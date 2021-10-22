const form = document.getElementById('form');
const button = document.getElementById('button');
const divDica = document.getElementById('dica');
const tryAgain = document.getElementById('tentar-novamente');
const numberUser = document.getElementById('number-user');
const divHistorico = document.getElementById('historico');
const spanTentativas = document.getElementById('numero-tentativas');
const numberRandom = Math.round(Math.random() * (100 - 1) + 1);
let numeroTentativas = 10;
spanTentativas.innerText = numeroTentativas;

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (numeroTentativas > 0) {
        const valueNumberUser = Number(numberUser.value);
        dica(valueNumberUser, numberRandom);
        let ganhou = valueNumberUser === numberRandom;
        historico(valueNumberUser);
        spanTentativas.innerText = numeroTentativas;
        if (numeroTentativas === 0 && !ganhou) {
            buttonAgain();
            divDica.innerText = 'Número de tentativas esgotada';
        }
        
        if(ganhou){
            buttonAgain();
        }
    }
    numberUser.value = ''
})

tryAgain.addEventListener('click', function () {
    location.reload();
})

function historico(number) {
    if (number && number > 0 && number <= 100 && numeroTentativas !== 0) {
        const criarParagrafo = document.createElement('p');
        criarParagrafo.innerText += number;
        divHistorico.appendChild(criarParagrafo);
        numeroTentativas--;
    }
}

function dica(numUser, numRandom) {
    if (!numUser) {
        return createP(divDica, 'Digite um NÚMERO!', 'red')
    }

    if (numUser > 100 || numUser < 1) {
        return createP(divDica, 'Digite um número entre 1 e 100', 'red')
    }

    if (numUser > numRandom) {
        return createP(divDica, 'Digite um número menor que o anterior.', 'yellow')
    }
    if (numUser < numRandom) {
        return createP(divDica, 'Digite um número maior que o anterior.', 'yellow')
    }

    if (numUser === numberRandom) {
        return createP(divDica, 'Parabéns você acertou!', 'green')
    }
}

function createP(div, msg, color) {
    const paragrafo = document.getElementById('p-dica');
    paragrafo.classList.remove('green', 'red', 'yellow');
    paragrafo.classList.add(color);
    paragrafo.innerText = msg;
    div.appendChild(paragrafo);
}

function buttonAgain() {
    const botao = document.getElementById('button');
    botao.parentNode.removeChild(botao);
    const botaoNew = document.createElement('button');
    botaoNew.setAttribute('id', 'tentar-novamente');
    botaoNew.innerText = 'Tentar Novamente';
    form.appendChild(botaoNew);
}
