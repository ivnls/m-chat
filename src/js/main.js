const formulario = document.getElementById('formulario');
const dadosConsulta = document.getElementById('dadosConsulta');

//dados do cadrasto inicial 
const nomeMae = localStorage.getItem("nomeMae");
const nomeCrianca = localStorage.getItem("nomeCrianca");
const idade = localStorage.getItem("idade");
const sexo = localStorage.getItem("sexo");

//Pegar a data e horario atual
const data = new Date();
const dataFormatada = data.toLocaleString("pt-BR");

dadosConsulta.querySelector('#nomeMae').textContent += nomeMae;
dadosConsulta.querySelector('#nomeCrianca').textContent += nomeCrianca;
dadosConsulta.querySelector('#idade').textContent += idade;
dadosConsulta.querySelector('#sexo').textContent += sexo;
dadosConsulta.querySelector('#inicio').textContent += dataFormatada;

//perguntas do formulario com as suas respostas esperadas
const perguntas = [
    { pergunta: "Seu filho gosta de se balançar, de pular no seu joelho, etc.?", resposta: "não" },
    { pergunta: "Seu filho tem interesse por outras crianças?", resposta: "não" },
    { pergunta: "Seu filho gosta de subir em coisas, como escadas ou móveis?", resposta: "não" },
    { pergunta: "Seu filho gosta de brincar de esconder e mostrar o rosto ou de esconde-esconde?", resposta: "não" },
    { pergunta: "Seu filho já brincou de faz-de-conta, como, por exemplo, fazer de conta que está falando no telefone ou que está cuidando da boneca, ou qualquer outra brincadeira de faz-de-conta?", resposta: "não" },
    { pergunta: "Seu filho já usou o dedo indicador dele para apontar, para pedir alguma coisa?", resposta: "não" },
    { pergunta: "Seu filho já usou o dedo indicador dele para apontar, para indicar interesse em algo?", resposta: "não" },
    { pergunta: "Seu filho consegue brincar de forma correta com brinquedos pequenos (ex. carros ou blocos), sem apenas colocar na boca, remexer no brinquedo ou deixar o brinquedo cair?", resposta: "não" },
    { pergunta: "O seu filho alguma vez trouxe objetos para você (pais) para lhe mostrar este objeto?", resposta: "não" },
    { pergunta: "O seu filho olha para você no olho por mais de um segundo ou dois?", resposta: "não" },
    { pergunta: "O seu filho já pareceu muito sensível ao barulho (ex. tapando os ouvidos)?", resposta: "sim" },
    { pergunta: "O seu filho sorri em resposta ao seu rosto ou ao seu sorriso?", resposta: "não" },
    { pergunta: "O seu filho imita você? (ex. você faz expressões/caretas e seu filho imita?)", resposta: "não" },
    { pergunta: "O seu filho responde quando você chama ele pelo nome?", resposta: "não" },
    { pergunta: "Se você aponta um brinquedo do outro lado do cômodo, o seu filho olha para ele?", resposta: "não" },
    { pergunta: "Seu filho já sabe andar?", resposta: "não" },
    { pergunta: "O seu filho olha para coisas que você está olhando?", resposta: "não" },
    { pergunta: "O seu filho faz movimentos estranhos com os dedos perto do rosto dele?", resposta: "sim" },
    { pergunta: "O seu filho tenta atrair a sua atenção para a atividade dele?", resposta: "não" },
    { pergunta: "Você alguma vez já se perguntou se seu filho é surdo?", resposta: "sim" },
    { pergunta: "O seu filho entende o que as pessoas dizem?", resposta: "não" },
    { pergunta: "O seu filho às vezes fica aéreo, “olhando para o nada” ou caminhando sem direção definida?", resposta: "sim" },
    { pergunta: "O seu filho olha para o seu rosto para conferir a sua reação quando vê algo estranho?", resposta: "não" }
];

//iterar sobre as perguntas e criar as suas divs
for (let i = 0; i < perguntas.length; i++) {
    criarPergunta(perguntas[i].pergunta, i)
}

//cria a pergunta com os dois checkboxes, texto e divisor
function criarPergunta(pergunta, index) {
    const container = document.createElement('div');
    container.className = "flex items-center justify-start gap-6 p-4 mb-3 rounded-lg shadow-sm border border-gray-200 bg-white";
    container.id = `container-q${index}`;

    const opcoes = document.createElement('div');
    opcoes.className = "flex items-center gap-4";


    const checkboxTrue = document.createElement('input');
    checkboxTrue.type = "checkbox";
    checkboxTrue.className = "true-checkbox w-5 h-5 accent-green-600";
    checkboxTrue.id = `q${index}-true`;

    const labelTrue = document.createElement('label');
    labelTrue.textContent = "Sim";
    labelTrue.setAttribute('for', checkboxTrue.id);
    labelTrue.className = "text-green-600 font-medium cursor-pointer";


    const checkboxFalse = document.createElement('input');
    checkboxFalse.type = "checkbox";
    checkboxFalse.className = "false-checkbox w-5 h-5 accent-red-600";
    checkboxFalse.id = `q${index}-false`;

    const labelFalse = document.createElement('label');
    labelFalse.textContent = "Não";
    labelFalse.setAttribute('for', checkboxFalse.id);
    labelFalse.className = "text-red-600 font-medium cursor-pointer";

    opcoes.appendChild(checkboxTrue);
    opcoes.appendChild(labelTrue);
    opcoes.appendChild(checkboxFalse);
    opcoes.appendChild(labelFalse);

    const texto = document.createElement('span');
    texto.className = "text-gray-800 text-base font-normal flex-1";
    texto.textContent = pergunta;

    container.appendChild(opcoes);
    container.appendChild(texto);

    formulario.insertBefore(container, formulario.querySelector('button'));

    //comportamento dos checkboxes
    checkboxTrue.addEventListener('change', () => {
        if (checkboxTrue.checked) checkboxFalse.checked = false;
        atualizarFundo(container, checkboxTrue.checked, checkboxFalse.checked);
    });

    checkboxFalse.addEventListener('change', () => {
        if (checkboxFalse.checked) checkboxTrue.checked = false;
        atualizarFundo(container, checkboxTrue.checked, checkboxFalse.checked);
    });
}

//função que atualiza o fundo da pagina correspondente ao checkbox marcado
function atualizarFundo(container, isTrue, isFalse) {
    container.classList.remove('bg-green-100', 'bg-red-100');
    if (isTrue) {
        container.classList.add('bg-green-100');
    } else if (isFalse) {
        container.classList.add('bg-red-100');
    }
}

//atualiza o aviso de resposta conforme as checkboxes vão sendo marcadas
document.querySelectorAll(".true-checkbox, .false-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const container = checkbox.closest(".flex");
      const aviso = container.querySelector(".aviso");
      const algumaMarcada = container.querySelector(".true-checkbox:checked, .false-checkbox:checked");
  
      if (algumaMarcada) {
        container.classList.remove("border", "border-red-500");
        if (aviso) aviso.remove();
      } else {
        container.classList.add("border", "border-red-500");
        if (!aviso) {
          container.insertAdjacentHTML("beforeend", `<p class="aviso text-red-500 text-sm absolute right-0">Por favor, responda esta pergunta.</p>`);
        }
      }
    });
});
  
//botão do formulário
const botao = document.getElementById("verificarRespostas");

botao.onclick = function () {
    let erro = false;
    let respostasErradas = 0; //contador de respostas que não correspondem

    document.querySelectorAll("[id^='container-q']").forEach((container, index) => {
        const trueCheckbox = container.querySelector(".true-checkbox");
        const falseCheckbox = container.querySelector(".false-checkbox");
        
        const isTrueChecked = trueCheckbox && trueCheckbox.checked;
        const isFalseChecked = falseCheckbox && falseCheckbox.checked;

        const aviso = container.querySelector(".aviso");
        const respostaEsperada = perguntas[index].resposta;

        //se nenhuma das checkboxes estiverem marcadas
        if (!isTrueChecked && !isFalseChecked) {
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

            //se a resposta não corresponde conta como respostaErrada
            if (
                (respostaEsperada === "não" && !isTrueChecked) ||
                (respostaEsperada === "sim" && !isFalseChecked)
            ) {
                respostasErradas++;
            }
        }
    });

    if (erro) return;

    alert("Número de respostas que não correspondem ao esperado: " + respostasErradas);

    //parte do cálculo de risco e da barra indicativa
    let widthPercentage;
    let probTextResult;
    let probColor;

    if (respostasErradas < 3) {
        widthPercentage = "25%";
        probTextResult = "Risco: Baixo";
        probColor = "#008000";
    } else if (respostasErradas < 7) {
        widthPercentage = "50%";
        probTextResult = "Risco: Médio";
        probColor = "#FFFF00";
    } else {
        widthPercentage = "100%";
        probTextResult = "Risco: Alto";
        probColor = "#FF0000";
    }

    //configurações do resultado
    const prob = document.getElementById("prob");
    const probText = document.getElementById("prob-text");

    probText.textContent = probTextResult;
    prob.style.transition = "width 0.5s ease, background-color 0.5s ease";
    prob.style.width = widthPercentage;
    prob.style.backgroundColor = probColor;
};