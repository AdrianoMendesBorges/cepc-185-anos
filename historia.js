document.addEventListener("DOMContentLoaded", () => {
  iniciarAcessibilidadeHistoria();
  iniciarMenuHistoria();
  carregarHistoria();
});

function iniciarAcessibilidadeHistoria() {
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

function iniciarMenuHistoria() {
  const botao = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-principal");
  if (!botao || !nav) return;

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });
}

function carregarHistoria() {
  const historias = {
    "gaspar-viana": {
      categoria: "Personalidade • Ciência e Medicina Tropical",
      titulo: "Gaspar Viana",
      subtitulo: "Médico patologista e cientista paraense de projeção nacional na pesquisa biomédica.",
      iniciais: "GV",
      imagem: "img/gaspar-viana.jpg",
      legenda: "Gaspar Viana — referência da ciência e da medicina paraense.",
      paragrafos: [
        "Gaspar de Oliveira Vianna nasceu em Belém, no Pará, e destacou-se como um dos mais importantes cientistas brasileiros do início do século XX, com atuação marcante na patologia e na medicina tropical.",
        "No Instituto Oswaldo Cruz, em Manguinhos, realizou estudos fundamentais e ficou internacionalmente conhecido pelo emprego do tártaro emético no tratamento da leishmaniose tegumentar americana, salvando inúmeras vidas e transformando a terapêutica da doença.",
        "Sua trajetória inspira estudantes e pesquisadores ao mostrar como a formação inicial e o rigor científico podem gerar impacto profundo na saúde pública e no conhecimento."
      ]
    },
    "eneas-carneiro": {
      categoria: "Personalidade • Medicina, Magistério e Vida Pública",
      titulo: "Enéas Carneiro",
      subtitulo: "Médico cardiologista, professor, escritor e figura marcante dos debates nacionais.",
      iniciais: "EC",
      imagem: "img/eneas-carneiro.jpg",
      legenda: "Enéas Carneiro — médico, professor e escritor.",
      paragrafos: [
        "Enéas Ferreira Carneiro construiu uma carreira multifacetada unindo a medicina — com especialização em cardiologia —, o magistério, a produção escrita e a participação intensa na vida pública e política do país.",
        "Como professor e autor de obras didáticas e de análise, dedicou grande parte de sua atuação à defesa da educação, da ciência, da soberania nacional e da saúde pública.",
        "Seu percurso permanece como tema de debate e memória sobre a formação intelectual e o engajamento cívico de figuras que passaram pela educação pública."
      ]
    },
    "antonyo-juracy": {
      categoria: "Personalidade • Memória e Identidade Regional",
      titulo: "Antonyo Juracy",
      subtitulo: "Referência ligada à memória cultural e histórica da comunidade escolar e regional.",
      iniciais: "AJ",
      imagem: "img/antonyo-juracy.jpg",
      legenda: "Antonyo Juracy — memória e identidade regional.",
      paragrafos: [
        "Este espaço homenageia trajetórias e nomes ligados à memória cultural e à vivência coletiva que ajudam a compor o mosaico histórico da região.",
        "Ao registrar essas referências no portal dos 185 anos do CEPC, o projeto reforça a importância de preservar histórias locais que muitas vezes não recebem o devido destaque nos grandes acervos."
      ]
    },
    "lucio-flavio-pinto": {
      categoria: "Personalidade • Jornalismo Investigativo e Amazônia",
      titulo: "Lúcio Flávio Pinto",
      subtitulo: "Jornalista, escritor e pesquisador dedicado à análise crítica da Amazônia e do Pará.",
      iniciais: "LFP",
      imagem: "img/lucio-flavio-pinto.jpg",
      legenda: "Lúcio Flávio Pinto — jornalista e pesquisador da realidade amazônica.",
      paragrafos: [
        "Lúcio Flávio Pinto consolidou-se como um dos principais nomes do jornalismo investigativo e da reflexão crítica sobre a Amazônia, o Pará e a relação entre poder, economia e meio ambiente.",
        "Por meio de reportagens, livros e publicações independentes — como o Jornal Pessoal —, construiu um arquivo fundamental para compreender os processos históricos e políticos da região.",
        "Sua obra estimula o espírito crítico, a pesquisa documental e o olhar atento sobre os desafios contemporâneos da Amazônia."
      ]
    },
    "bettina-ferro": {
      categoria: "Personalidade • Educação, Cultura e Cidadania",
      titulo: "Bettina Ferro",
      subtitulo: "Trajetória associada ao ensino, à formação cidadã e à vida cultural no Pará.",
      iniciais: "BF",
      imagem: "img/bettina-ferro.jpg",
      legenda: "Bettina Ferro — referência na educação e na cultura paraense.",
      paragrafos: [
        "Bettina Ferro representa o compromisso com a educação, a formação humana e o fortalecimento das instituições de ensino e cultura no estado do Pará.",
        "Sua atuação evidencia o papel transformador da escola pública e da vida universitária na construção de cidadania, diálogo e oportunidades para novas gerações."
      ]
    },
    "dalcidio-jurandir": {
      categoria: "Personalidade • Literatura Amazônica",
      titulo: "Dalcídio Jurandir",
      subtitulo: "Autor do ciclo do 'Extremo Norte' e um dos maiores nomes da literatura brasileira.",
      iniciais: "DJ",
      imagem: "img/dalcidio-jurandir.jpg",
      legenda: "Dalcídio Jurandir — escritor paraense do ciclo do 'Extremo Norte'.",
      paragrafos: [
        "Dalcídio Jurandir nasceu em Ponta de Pedras, no arquipélago do Marajó, e construiu uma obra literária profunda e sensível sobre o cotidiano, as relações sociais e a memória do Pará e da Amazônia.",
        "Por meio de seu célebre ciclo romanesco do 'Extremo Norte' — iniciado com 'Chove nos campos de cachoeira' —, retratou com humanidade a vida de estudantes, famílias, rios e cidades paraenses.",
        "Sua escrita confere voz literária à experiência amazônica e ocupa lugar de destaque na história da literatura brasileira."
      ]
    },
    "patrimonio-arquitetonico": {
      categoria: "Galeria • Patrimônio Histórico",
      titulo: "Patrimônio Arquitetônico",
      subtitulo: "O edifício histórico como símbolo da arquitetura e da educação pública paraense.",
      iniciais: "PA",
      imagem: "img/11.jpeg",
      legenda: "Fachada histórica do Colégio Estadual Paes de Carvalho em Belém.",
      paragrafos: [
        "O edifício histórico do Colégio Estadual Paes de Carvalho faz parte da paisagem e da memória arquitetônica do centro de Belém, reunindo valor estético e significado educacional.",
        "Preservar esse patrimônio significa manter viva a relação entre a história urbana da capital paraense e a formação de milhares de estudantes ao longo das gerações."
      ]
    },
    "liceu-paraense-atualidade": {
      categoria: "Galeria • Trajetória Histórica (1841–2026)",
      titulo: "Do Liceu Paraense (1841) à Atualidade",
      subtitulo: "Uma trajetória marcada pela formação de gerações de paraenses.",
      iniciais: "LP",
      imagem: "img/2.jpg",
      legenda: "Registros e memória da transição do Liceu Paraense ao CEPC.",
      paragrafos: [
        "Criado em 1841 como Liceu Paraense, o colégio atravessou diferentes períodos da história do Brasil e do Pará, adaptando-se às transformações sociais e educacionais sem perder seu papel de referência.",
        "Ao longo de 185 anos, sua história se confunde com a própria consolidação do ensino público na Amazônia."
      ]
    },
    "educacao-profissional-tecnologica": {
      categoria: "Galeria • Formação Técnica",
      titulo: "Educação Profissional e Tecnológica",
      subtitulo: "Estudantes desenvolvendo conhecimentos e soluções digitais.",
      iniciais: "ET",
      imagem: "img/3.jpg",
      legenda: "Prática e aprendizado tecnológico no ambiente escolar.",
      paragrafos: [
        "A integração entre educação e tecnologia amplia as possibilidades de aprendizagem dos estudantes, estimulando o pensamento crítico, a criatividade e a resolução de problemas reais.",
        "Na vivência escolar e na parceria técnica, os alunos aplicam fundamentos de desenvolvimento web, organização da informação e inclusão digital."
      ]
    },
    "protagonismo-vii-mostra": {
      categoria: "Galeria • VII Mostra (2026)",
      titulo: "Protagonismo na VII Mostra (2026)",
      subtitulo: "Tecnologia, inclusão e sustentabilidade aplicadas pelos estudantes.",
      iniciais: "VM",
      imagem: "img/04.jpg",
      legenda: "Projetos desenvolvidos para a VII Mostra de Tecnologia, Inclusão e Novos Negócios.",
      paragrafos: [
        "Na VII Mostra de Tecnologia, Inclusão e Novos Negócios para um Mundo Sustentável, o portal celebra os 185 anos do CEPC unindo memória histórica e responsabilidade ambiental.",
        "A proposta prioriza o acesso digital, a leveza das páginas e recursos de acessibilidade para diferentes públicos."
      ]
    },
    "uniforme-paes-de-carvalho": {
      categoria: "Galeria • Identidade Escolar",
      titulo: "O Uniforme Paes de Carvalho",
      subtitulo: "Mais do que uma roupa escolar, representa tradição, identidade e pertencimento.",
      iniciais: "UP",
      imagem: "img/4.png",
      legenda: "Uniforme escolar associado à tradição e à identidade do colégio.",
      paragrafos: [
        "O uniforme escolar simboliza o pertencimento coletivo e a identificação dos alunos com a história da instituição que frequentam.",
        "Nas ruas e nos espaços de convivência de Belém, ele carrega a memória e o orgulho de fazer parte de uma escola centenária."
      ]
    },
    "banda-marcial-fanpac": {
      categoria: "Galeria • Cultura e Tradição",
      titulo: "A Banda Marcial — FANPAC",
      subtitulo: "A banda integra a identidade do colégio e participa de desfiles cívicos e apresentações escolares.",
      iniciais: "FN",
      imagem: "img/5.jpg",
      legenda: "Banda Marcial do Colégio Estadual Paes de Carvalho — FANPAC.",
      paragrafos: [
        "A Banda Marcial do Colégio Estadual Paes de Carvalho (FANPAC) é uma das expressões culturais mais marcantes da vida escolar e cívica da instituição.",
        "Por meio da música, do ritmo e da disciplina coletiva, fortalece o espírito de equipe e representa o colégio em celebrações e apresentações."
      ]
    },
    "antonino-castro": {
      categoria: "Governador do Pará • 1921–1925",
      titulo: "Antonino Emiliano de Sousa Castro",
      subtitulo: "Ex-aluno do ginásio e governador do estado do Pará (1921–1925).",
      iniciais: "AC",
      imagem: "img/antonino-castro.jpg",
      legenda: "Antonino Emiliano de Sousa Castro — Governador do Pará (1921–1925).",
      paragrafos: [
        "Antonino Emiliano de Sousa Castro teve sua formação escolar ligada ao ginásio e exerceu o governo do estado do Pará no período de 1921 a 1925, durante a Primeira República.",
        "Sua administração ocorreu em um momento de debates políticos e econômicos relevantes no estado, marcado pela busca de organização administrativa e atenção às demandas regionais.",
        "Sua trajetória integra o conjunto de nomes que passaram pela tradição ginasial e alcançaram o comando do Executivo estadual."
      ]
    },
    "dionisio-bentes": {
      categoria: "Governador do Pará • 1925–1929",
      titulo: "Dionísio Bentes",
      subtitulo: "Ex-aluno do ginásio e governador do estado do Pará (1925–1929).",
      iniciais: "DB",
      imagem: "img/dionisio-bentes.jpg",
      legenda: "Dionísio Bentes — Governador do Pará (1925–1929).",
      paragrafos: [
        "Dionísio Ausier Bentes estudou no ginásio e governou o estado do Pará de 1925 a 1929, sucedendo Antonino Emiliano de Sousa Castro na condução do governo estadual.",
        "Durante sua gestão, enfrentou os desafios financeiros e estruturais da economia paraense no pós-ciclo da borracha e participou das dinâmicas políticas da época.",
        "Seu percurso histórico ajuda a ilustrar como a formação escolar tradicional esteve presente em quadros da política e da administração paraense."
      ]
    },
    "eurico-vale": {
      categoria: "Governador do Pará • 1929–1930",
      titulo: "Eurico Vale",
      subtitulo: "Ex-aluno do ginásio e governador do estado do Pará entre 1929 e 1930.",
      iniciais: "EV",
      imagem: "img/eurico-vale.jpg",
      legenda: "Eurico Vale — Governador do Pará (1929–1930).",
      paragrafos: [
        "Eurico de Freitas Vale teve vínculo com o ginásio e assumiu o governo do Pará entre 1929 e 1930, no encerramento do período republicano conhecido como República Velha.",
        "Seu governo transcorreu em meio às tensões políticas e econômicas que antecederam as mudanças institucionais de 1930 no Brasil.",
        "Sua história compõe o registro de ex-alunos que chegaram à chefia do governo estadual no início do século XX."
      ]
    },
    "alacid-nunes": {
      categoria: "Governador do Pará • 1966–1971 e 1979–1983",
      titulo: "Alacid Nunes",
      subtitulo: "Ex-aluno do Paes de Carvalho e governador do Pará em dois períodos.",
      iniciais: "AN",
      imagem: "img/alacid-nunes.jpg",
      legenda: "Alacid Nunes — Governador do Pará em dois mandatos.",
      paragrafos: [
        "Alacid da Silva Nunes estudou no Paes de Carvalho e governou o Pará em dois períodos distintos (1966–1971 e 1979–1983), exercendo papel de destaque na política paraense da segunda metade do século XX.",
        "Em suas gestões, marcaram presença projetos de infraestrutura, obras urbanas, integração viária e políticas administrativas voltadas ao crescimento e à modernização do estado.",
        "Sua trajetória evidencia a ligação duradoura entre a escola e lideranças que ocuparam os principais cargos públicos do Pará."
      ]
    },
    "jader-barbalho": {
      categoria: "Governador do Pará • 1983–1987 e 1991–1994",
      titulo: "Jader Barbalho",
      subtitulo: "Ex-aluno do CEPC; relatou que sua trajetória política teve início na escola.",
      iniciais: "JB",
      imagem: "img/jader-barbalho.jpg",
      legenda: "Jader Barbalho — Governador do Pará em dois períodos.",
      paragrafos: [
        "Jader Fontenelle Barbalho é ex-aluno do Colégio Estadual Paes de Carvalho e governou o Pará em dois mandatos (1983–1987 e 1991–1994), além de ter atuado em outras funções políticas estaduais e nacionais.",
        "Em relatos históricos, destacou que os primeiros passos de sua militância estudantil e vocação política começaram ainda nos bancos escolares do CEPC.",
        "A memória de sua passagem pela escola ilustra o papel do ambiente estudantil como espaço de debate, liderança e formação política."
      ]
    },
    "simao-jatene": {
      categoria: "Governador do Pará • 2003–2007 e 2011–2019",
      titulo: "Simão Jatene",
      subtitulo: "Ex-aluno do CEPC e governador do estado do Pará em dois períodos.",
      iniciais: "SJ",
      imagem: "img/simao-jatene.jpg",
      legenda: "Simão Jatene — Governador do Pará em dois mandatos.",
      paragrafos: [
        "Simão Robison Oliveira Jatene é ex-aluno do CEPC e exerceu o governo do Pará em diferentes mandatos (2003–2007 e 2011–2019), aliando trajetória acadêmica e atuação na administração pública.",
        "Com formação na área econômica e experiência como professor e gestor, conduziu políticas públicas e projetos estaduais ao longo de mais de uma década no comando do Executivo paraense.",
        "Seu percurso reforça a presença de ex-estudantes do colégio na história recente da política e da gestão pública do Pará."
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "gaspar-viana";
  const dados = historias[slug] || historias["gaspar-viana"];

  document.title = `${dados.titulo} | CEPC 185 Anos`;

  const categoriaEl = document.getElementById("historia-categoria");
  const tituloEl = document.getElementById("historia-titulo");
  const subtituloEl = document.getElementById("historia-subtitulo");
  const paragrafosEl = document.getElementById("historia-paragrafos");

  if (categoriaEl) categoriaEl.textContent = dados.categoria;
  if (tituloEl) tituloEl.textContent = dados.titulo;
  if (subtituloEl) subtituloEl.textContent = dados.subtitulo;

  if (paragrafosEl) {
    paragrafosEl.replaceChildren();
    dados.paragrafos.forEach(texto => {
      const p = document.createElement("p");
      p.textContent = texto;
      paragrafosEl.appendChild(p);
    });
  }
}
