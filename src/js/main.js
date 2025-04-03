const formulario = document.getElementById('formulario');

//Parâmetros do cadrasto inicial 
/*
const nomeMae = localStorage.getItem("nomeMae");
const nomeCrianca = localStorage.getItem("nomeCrianca");
const idade = localStorage.getItem("idade");
const sexo = localStorage.getItem("sexo");

*/

//perguntas do formulario

const perguntas = [
    "Gosta de brincar ao colo fazendo de “cavalinho”, etc.?",
    "Gosta de subir objectos, como por exemplo, cadeiras, mesas?",
    "Gosta de jogar às escondidas?",
    "Brinca ao faz-de-conta, por exemplo, falar ao telefone ou dar de comer a uma boneca, etc.?",
    "Aponta com o indicador para pedir alguma coisa?",
    "Brinca apropriadamente com brinquedos (carros ou Legos) sem levá-los à boca, abanar ou deitá-los ao chão?",
    "A criança mantém contacto visual por mais de um ou dois segundos?",
    "É muito sensível aos ruídos (ex. tapa os ouvidos)?",
    "Sorri como resposta às suas expressões faciais ou ao seu sorriso?",
    "Já anda?",
    "Olha para as coisas para as quais o adulto está a olhar?",
    "Faz movimentos estranhos com as mãos/dedos próximo da cara?",
    "Tenta chamar a sua atenção para o que está a fazer?",
    "Alguma vez se preocupou quanto à sua audição?",
    "Compreende o que as pessoas lhe dizem?",
    "Por vezes fica a olhar para o vazio ou deambula ao acaso pelos espaços?",
    "Procura a sua reacção facial quando se vê confrontada com situações desconhecidas?"
];
  
const perguntasCruciais = [
    "Interessa-se pelas outras crianças?",
    "Aponta com o indicador para mostrar interesse em alguma coisa?",
    
    "Alguma vez lhe trouxe objectos (brinquedos) para lhe mostrar alguma coisa?",
    "Imita o adulto (ex. faz uma careta e ela imita)?",
    "Responde/olha quando o(a) chamam pelo nome?",
    "Se apontar para um brinquedo do outro lado da sala, a criança acompanha com o olhar?"
];

let indexPerguntasFalsas = [];


//iterar sobre as perguntas
for (let i = 0; i < perguntas.length; i++) {
    criarPergunta(perguntas[i], i)
}

for (let i = 0; i < perguntasCruciais.length; i++) {
    criarPergunta(perguntasCruciais[i], perguntas.length + i);
}

//Gerar as divs das perguntas

//implementar a centralizacao da div do formulario com base na maior pergunta, podendo assim definir o tamanho
function criarPergunta(pergunta, index) {
    const container = document.createElement('div');
    container.className = "flex items-center p-3 mb-2 rounded-md transition-colors";
    container.id = `container-q${index}`;

    const checkboxTrue = document.createElement('input');
    checkboxTrue.type = "checkbox";
    checkboxTrue.className = "true-checkbox m-2 w-6 h-6 accent-green-600";
    checkboxTrue.id = `q${index}-true`;

    const labelTrue = document.createElement('span');
    labelTrue.textContent = "Sim";
    labelTrue.className = "ms-0.5 mr-2 text-green-600 font-medium";

    const checkboxFalse = document.createElement('input');
    checkboxFalse.type = "checkbox";
    checkboxFalse.className = "false-checkbox m-2 w-6 h-6 accent-red-600";
    checkboxFalse.id = `q${index}-false`;

    const labelFalse = document.createElement('span');
    labelFalse.textContent = "Não";
    labelFalse.className = "ms-0.5 mr-2 text-red-600 font-medium";

    const separator = document.createElement('div');
    separator.className = "h-6 w-px bg-gray-400 mx-3";

    const label = document.createElement('label');
    label.className = "ms-2 text-sm font-medium text-gray-900";
    label.textContent = pergunta;

    container.appendChild(checkboxTrue);
    container.appendChild(labelTrue);
    container.appendChild(checkboxFalse);
    container.appendChild(labelFalse);
    container.appendChild(separator);
    container.appendChild(label);

    formulario.insertBefore(container, formulario.querySelector('button'));

    // Cor das divs em relação com o checkbox
    checkboxTrue.addEventListener('change', () => {
        if (checkboxTrue.checked) checkboxFalse.checked = false;
        atualizarFundo(container, checkboxTrue.checked, checkboxFalse.checked);
    });

    checkboxFalse.addEventListener('change', () => {
        if (checkboxFalse.checked) checkboxTrue.checked = false;
        atualizarFundo(container, checkboxTrue.checked, checkboxFalse.checked);
    });
}


function atualizarFundo(container, isTrue, isFalse) {
    container.classList.remove('bg-green-100', 'bg-red-100');
    if (isTrue) container.classList.add('bg-green-100');
    else if (isFalse) container.classList.add('bg-red-100');
}


document.querySelectorAll(".true-checkbox, .false-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        const container = this.closest(".flex");
        const aviso = container.querySelector(".aviso");

        //erifica se pelo menos uma checkbox está marcada
        const isChecked = container.querySelector(".true-checkbox").checked || 
                          container.querySelector(".false-checkbox").checked;

        if (isChecked) {
            container.classList.remove("border", "border-red-500");
            if (aviso) aviso.remove();
        } else {
            container.classList.add("border", "border-red-500");

            if (!aviso) {
                const novoAviso = document.createElement("p");
                novoAviso.className = "aviso text-red-500 text-sm absolute right-0";
                novoAviso.textContent = "Por favor, responda esta pergunta.";
                container.appendChild(novoAviso);
            }            
            
        }
    });
});

//listener do botão do formulário
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("verificarRespostas");

    botao.addEventListener("click", () => {
        let erro = false;
        let indexPerguntasFalsas = [];

        document.querySelectorAll(".flex").forEach((container, index) => {
            const isTrue = container.querySelector(".true-checkbox").checked;
            const isFalse = container.querySelector(".false-checkbox").checked;
            const aviso = container.querySelector(".aviso");
            
            //se não responder a pergunta
            if (!isTrue && !isFalse) {
                erro = true;
                container.classList.add("border", "border-red-500");

                if (!aviso) {
                    const novoAviso = document.createElement("p");
                    novoAviso.className = "aviso text-red-500 text-sm text-right";
                    novoAviso.textContent = "Por favor, responda esta pergunta.";
                    container.appendChild(novoAviso);
                }
            } else {
                container.classList.remove("border", "border-red-500");
                if (aviso) aviso.remove();

                if (isFalse) {
                    indexPerguntasFalsas.push(index);
                }
            }
        });

        if (erro) return;

        console.log("Perguntas marcadas como falso: " + indexPerguntasFalsas.join(", "));

        const prob = document.getElementById("prob");
        const probText = document.getElementById("prob-text");

        const fL = indexPerguntasFalsas.length;

        console.log(fL);

        let widthPercentage;
        let probTextResult;
        let probColor;

        if (fL <= 2) {
            widthPercentage = "25%";
            probTextResult = "Risco: Baixo";
            probColor = "#008000";
        } else if (fL < 7) {
            widthPercentage = "50%";
            probTextResult = "Risco: Médio";
            probColor = "#FFFF00";
        } else {
            widthPercentage = "100%";
            probTextResult = "Risco: Alto";
            probColor = "#FF0000";
        }

        //configurações do resultado
        probText.textContent = probTextResult;
        prob.style.transition = "width 0.5s ease, background-color 0.5s ease";
        prob.style.width = widthPercentage;
        prob.style.backgroundColor = probColor;
    });
});



