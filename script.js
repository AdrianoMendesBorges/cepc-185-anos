document.addEventListener("DOMContentLoaded", () => {
  iniciarAcessibilidade();
  iniciarMenuMobile();
  iniciarFiltroTimeline();
  iniciarCarrossel();
  iniciarPersonalidades();
  iniciarQuiz();
});

function iniciarAcessibilidade() {
  const html = document.documentElement;
  const aumentar = document.getElementById("btn-aumentar-fonte");
  const diminuir = document.getElementById("btn-diminuir-fonte");
  const contraste = document.getElementById("btn-contraste");
  let tamanho = 16;

  aumentar?.addEventListener("click", () => {
    if (tamanho < 21) html.style.fontSize = `${++tamanho}px`;
  });
  diminuir?.addEventListener("click", () => {
    if (tamanho > 13) html.style.fontSize = `${--tamanho}px`;
  });
  contraste?.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("alto-contraste");
    contraste.setAttribute("aria-pressed", String(ativo));
  });
}

function iniciarMenuMobile() {
  const botao = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-principal");
  if (!botao || !nav) return;

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu de navegação");
    });
  });
}

function iniciarFiltroTimeline() {
  const botoes = document.querySelectorAll(".filtro-btn");
  const itens = document.querySelectorAll(".timeline-item");
  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      botoes.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      const periodo = botao.dataset.periodo;
      itens.forEach(item => {
        item.classList.toggle("oculto", periodo !== "todos" && item.dataset.periodo !== periodo);
      });
    });
  });
}

function iniciarCarrossel() {
  const carrossel = document.querySelector(".carrossel");
  const trilho = document.getElementById("carrossel-trilho");
  const anterior = document.getElementById("btn-carrossel-anterior");
  const proximo = document.getElementById("btn-carrossel-proximo");
  const indicadores = document.getElementById("carrossel-indicadores");
  if (!carrossel || !trilho || !indicadores) return;

  const slides = Array.from(trilho.querySelectorAll(":scope > .carrossel-slide"));
  if (!slides.length) return;

  let atual = 0;
  let temporizador = null;
  const pontos = slides.map((_, i) => {
    const ponto = document.createElement("button");
    ponto.type = "button";
    ponto.className = "carrossel-dot";
    ponto.setAttribute("aria-label", `Ir para a imagem ${i + 1}`);
    ponto.setAttribute("aria-current", i === 0 ? "true" : "false");
    ponto.addEventListener("click", () => { mostrar(i); reiniciar(); });
    indicadores.appendChild(ponto);
    return ponto;
  });

  function mostrar(indice) {
    atual = (indice + slides.length) % slides.length;
    trilho.style.transform = `translate3d(-${atual * 100}%, 0, 0)`;
    pontos.forEach((p, i) => {
      p.classList.toggle("ativo", i === atual);
      p.setAttribute("aria-current", i === atual ? "true" : "false");
    });
  }
  function parar() {
    if (temporizador) window.clearInterval(temporizador);
    temporizador = null;
  }
  function iniciar() {
    parar();
    temporizador = window.setInterval(() => mostrar(atual + 1), 10000);
  }
  function reiniciar() { iniciar(); }

  anterior?.addEventListener("click", () => { mostrar(atual - 1); reiniciar(); });
  proximo?.addEventListener("click", () => { mostrar(atual + 1); reiniciar(); });
  carrossel.addEventListener("mouseenter", parar);
  carrossel.addEventListener("mouseleave", iniciar);
  carrossel.addEventListener("focusin", parar);
  carrossel.addEventListener("focusout", iniciar);
  carrossel.addEventListener("keydown", evento => {
    if (evento.key === "ArrowLeft") { mostrar(atual - 1); reiniciar(); }
    if (evento.key === "ArrowRight") { mostrar(atual + 1); reiniciar(); }
  });
  carrossel.tabIndex = 0;
  mostrar(0);
  iniciar();
}

function iniciarPersonalidades() {
  const carrossel = document.getElementById("carrossel-personalidades");
  const trilho = document.getElementById("carrossel-pers-trilho");
  const anteriorBtn = document.getElementById("btn-personalidade-anterior");
  const proximoBtn = document.getElementById("btn-personalidade-proximo");
  const pontosEl = document.getElementById("personalidade-indicadores");
  if (!carrossel || !trilho || !pontosEl) return;

  const slides = Array.from(trilho.querySelectorAll(":scope > .slide-personalidade"));
  if (!slides.length) return;

  let indice = 0;
  let timer = null;

  const dots = slides.map((slide, i) => {
    const nome = slide.querySelector("h3")?.textContent?.trim() || `Personalidade ${i + 1}`;
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "destaque-ponto";
    dot.setAttribute("aria-label", `Ver ${nome}`);
    dot.addEventListener("click", () => {
      mostrar(i);
      reiniciar();
    });
    pontosEl.appendChild(dot);
    return dot;
  });

  function mostrar(i) {
    indice = (i + slides.length) % slides.length;
    trilho.style.transform = `translate3d(-${indice * 100}%, 0, 0)`;
    dots.forEach((d, idx) => {
      d.classList.toggle("ativo", idx === indice);
      d.setAttribute("aria-current", idx === indice ? "true" : "false");
    });
  }

  function parar() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function iniciar() {
    parar();
    timer = window.setInterval(() => mostrar(indice + 1), 7000);
  }

  function reiniciar() {
    iniciar();
  }

  anteriorBtn?.addEventListener("click", () => { mostrar(indice - 1); reiniciar(); });
  proximoBtn?.addEventListener("click", () => { mostrar(indice + 1); reiniciar(); });
  carrossel.addEventListener("mouseenter", parar);
  carrossel.addEventListener("mouseleave", iniciar);
  carrossel.addEventListener("focusin", parar);
  carrossel.addEventListener("focusout", iniciar);
  carrossel.addEventListener("keydown", evento => {
    if (evento.key === "ArrowLeft") { mostrar(indice - 1); reiniciar(); }
    if (evento.key === "ArrowRight") { mostrar(indice + 1); reiniciar(); }
  });

  mostrar(0);
  iniciar();
}

function iniciarQuiz() {
  const questoes = [
    { pergunta: "1. Em que ano e com qual nome original foi fundado o Colégio Estadual Paes de Carvalho?", opcoes: ["1841, como Liceu Paraense", "1889, como Ginásio de Belém", "1822, como Instituto Imperial do Pará", "1905, como Escola Técnica Estadual"], correta: 0, explicacao: "A instituição foi criada em 1841 como Liceu Paraense." },
    { pergunta: "2. Quem foi José Paes de Carvalho?", opcoes: ["Um arquiteto francês", "Médico e ex-governador do Pará", "O primeiro diretor do curso de Informática", "Um navegador português"], correta: 1, explicacao: "José Paes de Carvalho foi médico e governador do Pará." },
    { pergunta: "3. Em qual cidade está localizado o CEPC?", opcoes: ["Santarém", "Belém", "Marabá", "Castanhal"], correta: 1, explicacao: "O Colégio Estadual Paes de Carvalho está localizado em Belém, Pará." },
    { pergunta: "4. Qual é o tema central deste portal?", opcoes: ["Impressão gráfica", "Memória Viva e Digital: preservação histórica com tecnologia inclusiva e sustentável", "Jogos comerciais", "Manutenção de hardware"], correta: 1, explicacao: "O portal reúne memória histórica, tecnologia, inclusão e sustentabilidade." },
    { pergunta: "5. Como o portal contribui para a sustentabilidade?", opcoes: ["Distribuindo panfletos", "Oferecendo acesso digital e reduzindo materiais impressos", "Exigindo computadores novos", "Usando materiais descartáveis"], correta: 1, explicacao: "O acesso digital via QR Code pode reduzir a necessidade de materiais impressos." }
  ];

  const progresso = document.getElementById("quiz-progresso");
  const placar = document.getElementById("quiz-placar");
  const pergunta = document.getElementById("quiz-pergunta");
  const opcoes = document.getElementById("quiz-opcoes");
  const feedback = document.getElementById("quiz-feedback");
  const proxima = document.getElementById("btn-proxima");
  if (!progresso || !placar || !pergunta || !opcoes || !feedback || !proxima) return;

  let indice = 0, pontos = 0, respondida = false;

  function renderizar() {
    respondida = false;
    const q = questoes[indice];
    progresso.textContent = `Pergunta ${indice + 1} de ${questoes.length}`;
    placar.textContent = `Pontuação: ${pontos}`;
    pergunta.textContent = q.pergunta;
    opcoes.replaceChildren();
    feedback.classList.add("oculto");
    proxima.classList.add("oculto");
    q.opcoes.forEach((texto, i) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "opcao-btn";
      botao.textContent = texto;
      botao.addEventListener("click", () => responder(i, botao));
      opcoes.appendChild(botao);
    });
  }

  function responder(escolha, clicado) {
    if (respondida) return;
    respondida = true;
    const q = questoes[indice];
    opcoes.querySelectorAll("button").forEach((b, i) => {
      b.disabled = true;
      if (i === q.correta) b.classList.add("correta");
    });
    if (escolha === q.correta) {
      pontos++;
      feedback.innerHTML = `<strong>Correto!</strong> ${q.explicacao}`;
    } else {
      clicado.classList.add("incorreta");
      feedback.innerHTML = `<strong>Resposta incorreta.</strong> ${q.explicacao}`;
    }
    placar.textContent = `Pontuação: ${pontos}`;
    feedback.classList.remove("oculto");
    proxima.textContent = indice === questoes.length - 1 ? "Ver resultado" : "Próxima pergunta";
    proxima.classList.remove("oculto");
  }

  function avancar() {
    indice++;
    if (indice < questoes.length) {
      renderizar();
    } else {
      progresso.textContent = "Quiz concluído!";
      pergunta.textContent = `Você acertou ${pontos} de ${questoes.length} perguntas!`;
      opcoes.replaceChildren();
      feedback.textContent = pontos >= 4
        ? "Parabéns! Você conhece muito bem a história do CEPC."
        : "Muito bem! Explore a linha do tempo e tente novamente.";
      feedback.classList.remove("oculto");
      proxima.textContent = "Reiniciar quiz";
      proxima.classList.remove("oculto");
      proxima.onclick = reiniciarQuiz;
    }
  }
  function reiniciarQuiz() {
    indice = 0;
    pontos = 0;
    proxima.onclick = avancar;
    renderizar();
  }
  proxima.addEventListener("click", avancar);
  renderizar();
}
