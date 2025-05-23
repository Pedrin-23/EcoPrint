//Declarações
const perguntas = [
  {
    pergunta:
      "Qual é o seu meio de transporte mais utilizado durante a semana?",
    alt1: "Carro sozinho",
    alt2: "Carro com carona",
    alt3: "Transporte público",
    alt4: "Bicicleta ou caminhada",
  },
  {
    pergunta: "Com que frequência você consome carne vermelha?",
    alt1: "Diariamente",
    alt2: "3 a 5 vezes por semana",
    alt3: "1 a 2 vezes por semana",
    alt4: "Raramente ou nunca",
  },
  {
    pergunta: "Como é o consumo de energia elétrica na sua casa?",
    alt1: "Alta",
    alt2: "Média",
    alt3: "Baixa",
    alt4: "Muito baixa",
  },
  {
    pergunta: "Qual é o seu nível de reciclagem de resíduos?",
    alt1: "Não reciclo nada",
    alt2: "Reciclo papel ou plástico",
    alt3: "Reciclo quase tudo",
    alt4: "Reciclo tudo corretamente",
  },
  {
    pergunta: "Com que frequência você compra roupas novas?",
    alt1: "Toda semana",
    alt2: "Todo mês",
    alt3: "A cada 2-3 meses",
    alt4: "Raramente",
  },
];
const imgs = [
  "img/img-body/placeholder.svg",
  "img/img-body/carne_vermelha.svg",
  "img/img-body/energia.svg",
  "img/img-body/recycle.svg",
  "img/img-body/clothes.svg",
];
let respostas = [];
let texto_principal = document.querySelector(".perguntas-p");
let pergunta_1 = document.querySelector(".alternativa_1");
let pergunta_2 = document.querySelector(".alternativa_2");
let pergunta_3 = document.querySelector(".alternativa_3");
let pergunta_4 = document.querySelector(".alternativa_4");
let value1 = document.querySelector(".alternativa_value1");
let value2 = document.querySelector(".alternativa_value2");
let value3 = document.querySelector(".alternativa_value3");
let value4 = document.querySelector(".alternativa_value4");
let botao_troca = document.querySelector(".action_button");
let radio_selecionado = document.querySelectorAll('input[name="escolha"]');
let sliders = document.querySelector(".imagem");
const botao_resultado = document.querySelector(".ver_resultado");
const container_perguntas = document.querySelector(".sumir");
cont = 1;
//
//Declarando Função
function desmarcarRadios() {
  const radios = document.querySelectorAll(".input");
  radios.forEach((radio) => {
    radio.checked = false;
  });
}
function armazenar() {
  radio_selecionado.forEach((radio) => {
    if (radio.checked) {
      respostas.push(radio.value);
    }
  });
}
function trocar() {
  radio_selecionado.forEach((radio) => {
    if (radio.checked) {
      armazenar();
      desmarcarRadios();

      //ATRiBUIÇÕES
      sliders.src = imgs[cont];
      texto_principal.innerHTML = perguntas[cont].pergunta;
      pergunta_1.innerHTML = perguntas[cont].alt1;
      pergunta_2.innerHTML = perguntas[cont].alt2;
      pergunta_3.innerHTML = perguntas[cont].alt3;
      pergunta_4.innerHTML = perguntas[cont].alt4;
      value1.value = perguntas[cont].alt1;
      value2.value = perguntas[cont].alt2;
      value3.value = perguntas[cont].alt3;
      value4.value = perguntas[cont].alt4;
      //
      cont += 1;
      if (cont === 5) {
        botao_troca.style.display = "none";
        botao_resultado.style.display = "initial";
      }
      console.log(respostas);
    }
  });
}
function calcular_resposta(respostas) {
  let pontuacao = 0;

  const pontuacoes = [
    {
      // Questão 1
      "Carro sozinho": 5,
      "Carro com carona": 3,
      "Transporte público": 2,
    },
    {
      // Questão 2
      Diariamente: 5,
      "3 a 5 vezes por semana": 3,
      "1 a 2 vezes por semana": 2,
    },
    {
      // Questão 3
      Alta: 5,
      Média: 3,
      Baixa: 2,
    },
    {
      // Questão 4
      "Não reciclo nada": 5,
      "Reciclo papel ou plástico": 3,
      "Reciclo quase tudo": 2,
    },
    {
      // Questão 5
      "Toda semana": 5,
      "Todo mês": 3,
      "A cada 2-3 meses": 2,
    },
  ];

  for (let i = 0; i < respostas.length; i++) {
    const resposta = respostas[i];
    pontuacao += pontuacoes[i][resposta] || 0;
  }

  return pontuacao;
}
function posicionar_resposta() {
  // SUMINDO COM O CONTAINER ANTIGO E APARECENDO O NOVO
  const container_p = document.querySelector(".perguntas-container");
  const container_f = document.querySelector(".final");
  container_p.style.display = "initial";
  container_f.style.display = "grid";
  container_perguntas.style.display = "none";
  sliders.style.display = "none";
  botao_resultado.style.display = "none";
  //
  //Pegando variaveis
  let texto = document.querySelector(".avaliacao");
  let nota = document.querySelector(".avaliacao_nota");
  let frase = document.querySelector(".avaliacao_frase");
  let imagem_avaliacao = document.querySelector(".imagem_avaliacao");

  const resposta = calcular_resposta(respostas);
  if (resposta <= 5) {
    texto.style.color = "#2E7D32";
    nota.style.color = "#4CAF50";
    texto.innerHTML = "EXCELENTE";
    nota.innerHTML = resposta.toString() + "/25";
    frase.innerHTML =
      "Você adota práticas altamente sustentáveis no dia a dia. Continue assim!";
    imagem_avaliacao.src = "img/img-body/excelente_emoji.svg";
  } else if (resposta <= 10) {
    texto.style.color = "#2E7D32";
    nota.style.color = "#81C784";
    texto.innerHTML = "BOM";
    nota.innerHTML = resposta.toString() + "/25";
    frase.innerHTML =
      "Seus hábitos são positivos para o meio ambiente, mas ainda há pequenas melhorias possíveis.";
    imagem_avaliacao.src = "img/img-body/bom-emoji.svg";
  } else if (resposta <= 15) {
    texto.style.color = "#FBC02D";
    nota.style.color = "#F9A825";
    texto.innerHTML = "MÉDIO";
    nota.innerHTML = resposta.toString() + "/25";
    frase.innerHTML =
      "Algumas escolhas sustentáveis são feitas, mas há espaço para mudanças que reduzam seu impacto.";
    imagem_avaliacao.src = "img/img-body/medio_emoji.svg";
  } else if (resposta <= 20) {
    texto.style.color = "#C62828";
    nota.style.color = "#F44336";
    texto.innerHTML = "RUIM";
    nota.innerHTML = resposta.toString() + "/25";
    frase.innerHTML =
      "É importante repensar certos hábitos e buscar alternativas mais sustentáveis.";
    imagem_avaliacao.src = "img/img-body/ruim_emoji.svg";
  } else {
    texto.style.color = "#C62828";
    nota.style.color = "#F44336";
    texto.innerHTML = "MUITO RUIM";
    nota.innerHTML = resposta.toString() + "/25";
    frase.innerHTML =
      "Seus hábitos causam grande impacto no meio ambiente. Tente adotar atitudes mais ecológicas.";
    imagem_avaliacao.src = "img/img-body/ruim_emoji.svg";
  }
}
function results() {
  //Sumindo com o site
  radio_selecionado.forEach((radio) => {
    if (radio.checked) {
      armazenar();
      posicionar_resposta();
      //
    }
  });
}

botao_troca.addEventListener("click", trocar);
botao_resultado.addEventListener("click", results);
