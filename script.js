/**
 * Portal CEPC 185 Anos - Script Principal
 * VII Mostra de Tecnologia, Inclusão e Novos Negócios para um Mundo Sustentável
 * Curso Técnico em Informática
 */

document.addEventListener("DOMContentLoaded", () => {
  iniciarAcessibilidade();
  iniciarMenuMobile();
  iniciarFiltroTimeline();
  iniciarCarrossel();
  iniciarQuiz();
});

/* ==========================================================================
   1. CONTROLES DE ACESSIBILIDADE (TAMANHO DA FONTE E ALTO CONTRASTE)
   ========================================================================== */
function iniciarAcessibilidade() {
  const htmlEl = document.documentElement;
  const btnAumentar = document.getElementById("btn-aumentar-fonte");
  const btnDiminuir = document.getElementById("btn-diminuir-fonte");
  const btnContraste = document.getElementById("btn-contraste");

  let tamanhoFonte = 16; // Tamanho padrão em pixels

  btnAumentar.addEventListener("click", () => {
    if (tamanhoFonte < 20) {
      tamanhoFonte += 1;
      htmlEl.style.fontSize = `${tamanhoFonte}px`;
    }
  });

  btnDiminuir.addEventListener("click", () => {
    if (tamanhoFonte > 13) {
      tamanhoFonte -= 1;
      htmlEl.style.fontSize = `${tamanhoFonte}px`;
    }
  });

  btnContraste.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("alto-contraste");
    btnContraste.setAttribute("aria-pressed", ativo);
  });
}

/* ==========================================================================
   2. MENU RESPONSIVO PARA DISPOSITIVOS MÓVEIS
   ========================================================================== */
function iniciarMenuMobile() {
  const btnMenu = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-principal");

  btnMenu.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", aberto);
  });

  // Fecha o menu ao clicar em um link no celular
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. FILTRO INTERATIVO DA LINHA DO TEMPO
   ========================================================================== */
function iniciarFiltroTimeline() {
  const botoesFiltro = document.querySelectorAll(".filtro-btn");
  const itensTimeline = document.querySelectorAll(".timeline-item");

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Atualiza botão ativo
      botoesFiltro.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      const periodoSelecionado = botao.getAttribute("data-periodo");

      // Mostra ou oculta os marcos históricos conforme o filtro
      itensTimeline.forEach((item) => {
        const periodoItem = item.getAttribute("data-periodo");
        if (periodoSelecionado === "todos" || periodoSelecionado === periodoItem) {
          item.classList.remove("oculto");
        } else {
          item.classList.add("oculto");
        }
      });
    });
  });
}

/* ==========================================================================
   4. CARROSSEL AUTOMÁTICO (10 SEGUNDOS) E NAVEGAÇÃO MANUAL
   ========================================================================== */
function iniciarCarrossel() {
  const carrosselEl = document.querySelector(".carrossel");
  const trilho = document.getElementById("carrossel-trilho");
  const slides = document.querySelectorAll(".carrossel-slide");
  const btnAnterior = document.getElementById("btn-carrossel-anterior");
  const btnProximo = document.getElementById("btn-carrossel-proximo");
  const indicadoresContainer = document.getElementById("carrossel-indicadores");

  if (!trilho || slides.length === 0) return;

  let slideAtual = 0;
  const TEMPO_TROCA_MS = 10000; // 10 segundos (10.000 milissegundos)
  let intervaloAutomatico = null;

  // Cria os botões indicadores dinamicamente conforme o número de slides
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === 0 ? "carrossel-dot ativo" : "carrossel-dot";
    dot.setAttribute("aria-label", `Ir para a foto ${index + 1} de ${slides.length}`);
    dot.addEventListener("click", () => {
      irParaSlide(index);
      reiniciarTemporizador();
    });
    indicadoresContainer.appendChild(dot);
  });

  const dots = indicadoresContainer.querySelectorAll(".carrossel-dot");

  function irParaSlide(indice) {
    if (indice < 0) {
      slideAtual = slides.length - 1;
    } else if (indice >= slides.length) {
      slideAtual = 0;
    } else {
      slideAtual = indice;
    }

    // Desloca o trilho horizontalmente via CSS transform
    trilho.style.transform = `translateX(-${slideAtual * 100}%)`;

    // Atualiza o indicador ativo
    dots.forEach((dot, idx) => {
      dot.classList.toggle("ativo", idx === slideAtual);
    });
  }

  function iniciarTemporizador() {
    pararTemporizador();
    intervaloAutomatico = setInterval(() => {
      irParaSlide(slideAtual + 1);
    }, TEMPO_TROCA_MS);
  }

  function pararTemporizador() {
    if (intervaloAutomatico) {
      clearInterval(intervaloAutomatico);
      intervaloAutomatico = null;
    }
  }

  function reiniciarTemporizador() {
    iniciarTemporizador();
  }

  // Botões manuais (reiniciam os 10s ao clicar para não trocar logo em seguida)
  btnAnterior.addEventListener("click", () => {
    irParaSlide(slideAtual - 1);
    reiniciarTemporizador();
  });

  btnProximo.addEventListener("click", () => {
    irParaSlide(slideAtual + 1);
    reiniciarTemporizador();
  });

  // Pausa a rotação automática ao passar o mouse ou focar (acessibilidade)
  carrosselEl.addEventListener("mouseenter", pararTemporizador);
  carrosselEl.addEventListener("mouseleave", iniciarTemporizador);
  carrosselEl.addEventListener("focusin", pararTemporizador);
  carrosselEl.addEventListener("focusout", iniciarTemporizador);

  // Permite navegar usando as setas esquerda/direita do teclado
  carrosselEl.setAttribute("tabindex", "0");
  carrosselEl.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") {
      irParaSlide(slideAtual - 1);
      reiniciarTemporizador();
    }
    if (evento.key === "ArrowRight") {
      irParaSlide(slideAtual + 1);
      reiniciarTemporizador();
    }
  });

  // Inicia o carrossel automático de 10 segundos
  iniciarTemporizador();
}

/* ==========================================================================
   5. QUIZ HISTÓRICO INTERATIVO (5 PERGUNTAS SOBRE O CEPC)
   ========================================================================== */
function iniciarQuiz() {
  const questoes = [
    {
      pergunta: "1. Em que ano e com qual nome original foi fundado o Colégio Estadual Paes de Carvalho?",
      opcoes: [
        "1841, como Liceu Paraense",
        "1889, como Ginásio de Belém",
        "1822, como Instituto Imperial do Pará",
        "1905, como Escola Técnica Estadual"
      ],
      correta: 0,
      explicacao: "O colégio foi fundado em 28 de junho de 1841 como Liceu Paraense, completando 185 anos em 2026."
    },
    {
      pergunta: "2. Quem foi José Paes de Carvalho, que dá nome à instituição?",
      opcoes: [
        "Um arquiteto francês que projetou o Teatro da Paz",
        "Médico, abolicionista, republicano e ex-governador do Pará",
        "O primeiro diretor do curso de Informática em 2010",
        "Um navegador português do século XVII"
      ],
      correta: 1,
      explicacao: "Dr. José Paes de Carvalho foi médico, liderança abolicionista e governador do Pará no início da República."
    },
    {
      pergunta: "3. Onde está localizado o histórico prédio neoclássico do CEPC em Belém?",
      opcoes: [
        "Na Praça da República",
        "Na Praça Saldanha Marinho",
        "Na Estação das Docas",
        "No Complexo do Ver-o-Peso"
      ],
      correta: 1,
      explicacao: "O edifício histórico do Paes de Carvalho situa-se na tradicional Praça Saldanha Marinho, no centro de Belém."
    },
    {
      pergunta: "4. Qual é o subtema deste projeto web na VII Mostra de Tecnologia, Inclusão e Novos Negócios?",
      opcoes: [
        "Impressão Gráfica e Panfletagem Escolar",
        "Memória Viva e Digital: Preservação do Patrimônio Histórico por meio da Tecnologia Sustentável e Inclusiva",
        "Jogos Digitais Comerciais na Amazônia",
        "Manutenção de Hardware Antigo"
      ],
      correta: 1,
      explicacao: "O projeto une a preservação digital dos 185 anos do CEPC à inclusão e à sustentabilidade (redução de papel)."
    },
    {
      pergunta: "5. Como o desenvolvimento deste portal contribui para a sustentabilidade na VII Mostra?",
      opcoes: [
        "Utilizando servidores que consomem muita energia",
        "Substituindo folders e cartilhas de papel por acesso digital via QR Code e código leve",
        "Distribuindo panfletos plásticos no estande",
        "Exigindo computadores de última geração para abrir o site"
      ],
      correta: 1,
      explicacao: "Ao substituir materiais impressos por uma página leve em HTML5, CSS3 e JS puro, evitamos resíduos e reduzimos o consumo de dados."
    }
  ];

  let indiceAtual = 0;
  let pontuacao = 0;

  const progressoEl = document.getElementById("quiz-progresso");
  const placarEl = document.getElementById("quiz-placar");
  const perguntaEl = document.getElementById("quiz-pergunta");
  const opcoesEl = document.getElementById("quiz-opcoes");
  const feedbackEl = document.getElementById("quiz-feedback");
  const btnProxima = document.getElementById("btn-proxima");

  function renderizarPergunta() {
    const q = questoes[indiceAtual];
    progressoEl.textContent = `Pergunta ${indiceAtual + 1} de ${questoes.length}`;
    placarEl.textContent = `Pontuação: ${pontuacao}`;
    perguntaEl.textContent = q.pergunta;

    opcoesEl.innerHTML = "";
    feedbackEl.classList.add("oculto");
    btnProxima.classList.add("oculto");

    q.opcoes.forEach((textoOpcao, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opcao-btn";
      btn.textContent = textoOpcao;
      btn.addEventListener("click", () => verificarResposta(index, btn));
      opcoesEl.appendChild(btn);
    });
  }

  function verificarResposta(indiceEscolhido, botaoClicado) {
    const q = questoes[indiceAtual];
    const todosBotoes = opcoesEl.querySelectorAll(".opcao-btn");

    // Desabilita todos os botões após a escolha
    todosBotoes.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correta) {
        b.classList.add("correta");
      }
    });

    if (indiceEscolhido === q.correta) {
      pontuacao++;
      placarEl.textContent = `Pontuação: ${pontuacao}`;
      feedbackEl.innerHTML = `<strong>Correto!</strong> ${q.explicacao}`;
    } else {
      botaoClicado.classList.add("incorreta");
      feedbackEl.innerHTML = `<strong>Não foi dessa vez.</strong> ${q.explicacao}`;
    }

    feedbackEl.classList.remove("oculto");
    btnProxima.textContent = indiceAtual < questoes.length - 1 ? "Próxima Pergunta" : "Ver Resultado Final";
    btnProxima.classList.remove("oculto");
  }

  function mostrarResultadoFinal() {
    progressoEl.textContent = "Quiz Concluído!";
    perguntaEl.textContent = `Você acertou ${pontuacao} de ${questoes.length} perguntas sobre os 185 anos do CEPC!`;
    opcoesEl.innerHTML = "";
    feedbackEl.innerHTML =
      pontuacao >= 4
        ? "Parabéns! Você domina a história do Colégio Estadual Paes de Carvalho e os pilares da VII Mostra."
        : "Muito bem! Explore a Linha do Tempo acima e tente novamente para gabaritar o desafio.";
    feedbackEl.classList.remove("oculto");

    btnProxima.textContent = "Reiniciar Quiz";
    btnProxima.onclick = () => {
      indiceAtual = 0;
      pontuacao = 0;
      btnProxima.onclick = avancar;
      renderizarPergunta();
    };
  }

  function avancar() {
    indiceAtual++;
    if (indiceAtual < questoes.length) {
      renderizarPergunta();
    } else {
      mostrarResultadoFinal();
    }
  }

  btnProxima.onclick = avancar;
  renderizarPergunta();
}
