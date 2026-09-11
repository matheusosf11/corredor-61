import type {
  AboutContent,
  Article,
  Author,
  Category,
  News,
  Supporter,
} from "./types";

export const categories: Category[] = [
  { slug: "legislativo", name: "Legislativo" },
  { slug: "judiciario", name: "Judiciário" },
  { slug: "politica", name: "Política" },
  { slug: "institucional", name: "Institucional" },
];

export const authors: Author[] = [
  {
    slug: "ana-ribeiro",
    name: "Ana Ribeiro",
    role: "Advogada e consultora legislativa",
    bio: "Atua em direito público e processo legislativo. Escreve sobre rito, comissões e segurança jurídica das normas.",
    initials: "AR",
    active: true,
    photoUrl: "/authors/ana-ribeiro.jpg",
  },
  {
    slug: "carlos-mendes",
    name: "Carlos Mendes",
    role: "Conselheiro e especialista em controle público",
    bio: "Dedica-se a accountability, tribunais de contas e desenho institucional da administração pública.",
    initials: "CM",
    active: true,
    photoUrl: "/authors/carlos-mendes.jpg",
  },
  {
    slug: "helena-costa",
    name: "Helena Costa",
    role: "Pesquisadora em direito e tecnologia",
    bio: "Estuda regulação de dados, transparência e o uso de informação no Estado.",
    initials: "HC",
    active: true,
    photoUrl: "/authors/helena-costa.jpg",
  },
  {
    slug: "paulo-andrade",
    name: "Paulo Andrade",
    role: "Procurador e professor",
    bio: "Escreve sobre processo, prazos digitais e previsibilidade para operadores do Direito.",
    initials: "PA",
    active: true,
  },
  {
    slug: "marina-lopes",
    name: "Marina Lopes",
    role: "Cientista política",
    bio: "Analisa bastidores técnicos de Brasília: consultorias, pareceres e a distância entre plenário e corredor.",
    initials: "ML",
    active: true,
  },
  {
    slug: "ricardo-nunes",
    name: "Ricardo Nunes",
    role: "Colunista convidado (arquivo)",
    bio: "Colaborou em ciclos anteriores. O perfil permanece acessível pelos artigos já publicados.",
    initials: "RN",
    active: false,
  },
];

export const news: News[] = [
  {
    slug: "ccj-analisa-rito-legislativo",
    title:
      "CCJ do Senado analisa proposta que altera regras de tramitação legislativa",
    dek: "O colegiado discute mudanças de rito que podem afetar a tramitação de projetos de interesse institucional. A matéria segue para o plenário se for aprovada na comissão.",
    authorName: "Equipe Corredor 61",
    category: "legislativo",
    publishedAt: "2026-09-03T11:00:00-03:00",
    status: "published",
    featured: true,
    cover: {
      alt: "Ilustração institucional do Congresso Nacional, em perspectiva de corredor.",
      motif: "legislativo",
    },
    body: [
      {
        type: "p",
        text: "A Comissão de Constituição e Justiça do Senado discute nesta semana um conjunto de ajustes no rito de tramitação de projetos. O texto em análise trata de prazos, urgência e do papel das comissões temáticas antes do plenário.",
      },
      {
        type: "h2",
        text: "O que está em jogo",
      },
      {
        type: "p",
        text: "Relatores defendem que regras mais claras reduzem impugnações posteriores e dão previsibilidade a assessorias e à sociedade. Críticos alertam para o risco de acelerar matérias complexas sem escrutínio suficiente.",
      },
      {
        type: "ul",
        items: [
          "Definição de hipóteses de urgência",
          "Prazo mínimo de vista em comissões",
          "Encaminhamento ao plenário após parecer da CCJ",
        ],
      },
      {
        type: "p",
        text: "Se aprovada, a proposta segue para o plenário. Esta matéria é conteúdo de demonstração do portal e será substituída pelas publicações da equipe.",
      },
    ],
  },
  {
    slug: "stf-pauta-orgaos-de-controle",
    title:
      "STF agenda julgamento sobre limites de atuação de órgãos de controle",
    dek: "A pauta reúne ações que tratam de competência e de segurança jurídica para gestores públicos.",
    authorName: "Equipe Corredor 61",
    category: "judiciario",
    publishedAt: "2026-09-02T16:20:00-03:00",
    status: "published",
    cover: {
      alt: "Composição geométrica em azul-marinho sugerindo as colunas de um tribunal.",
      motif: "judiciario",
    },
    body: [
      {
        type: "p",
        text: "O Supremo Tribunal Federal incluiu na pauta um conjunto de processos que discutem os limites da atuação de órgãos de controle sobre políticas públicas e contratos administrativos.",
      },
      {
        type: "p",
        text: "A expectativa de especialistas é de que o julgamento ofereça parâmetros mais estáveis para gestores, tribunais de contas e o próprio Poder Judiciário.",
      },
    ],
  },
  {
    slug: "congresso-calendario-votacoes",
    title:
      "Lideranças no Congresso articulam calendário de votações até o recesso",
    dek: "O acordo inclui projetos de impacto regulatório e matérias já debatidas em comissões temáticas.",
    authorName: "Equipe Corredor 61",
    category: "politica",
    publishedAt: "2026-09-02T09:40:00-03:00",
    status: "published",
    cover: {
      alt: "Faixa dourada em perspectiva, evocando o corredor institucional de Brasília.",
      motif: "politica",
    },
    body: [
      {
        type: "p",
        text: "Presidentes de partidos e líderes de governo e oposição tentam fechar uma agenda comum de votações antes do recesso. O pacote mistura matérias consensuais e textos que ainda dividem o plenário.",
      },
    ],
  },
  {
    slug: "tcu-orientacoes-convenios",
    title:
      "Tribunal de Contas reforça orientações sobre transparência em convênios",
    dek: "Nova cartilha reúne entendimentos recentes e recomendações para entes públicos e parceiros.",
    authorName: "Equipe Corredor 61",
    category: "institucional",
    publishedAt: "2026-09-01T15:10:00-03:00",
    status: "published",
    cover: {
      alt: "Blocos geométricos em creme e marinho, no estilo da identidade do Corredor 61.",
      motif: "institucional",
    },
    body: [
      {
        type: "p",
        text: "O tribunal divulgou uma cartilha com recomendações sobre publicidade de convênios, prestações de contas e critérios de seleção de entidades parceiras.",
      },
      {
        type: "p",
        text: "O material não cria obrigação nova, mas organiza entendimentos já adotados em julgados recentes.",
      },
    ],
  },
  {
    slug: "camara-marco-dados-publicos",
    title: "Câmara discute marco sobre uso de dados em políticas públicas",
    dek: "Relatoria deve apresentar substitutivo após audiências com especialistas e órgãos de defesa.",
    authorName: "Equipe Corredor 61",
    category: "legislativo",
    publishedAt: "2026-09-01T10:00:00-03:00",
    status: "published",
    cover: {
      alt: "Perspectiva de corredor com torres estilizadas ao fundo.",
      motif: "legislativo",
    },
    body: [
      {
        type: "p",
        text: "A Câmara dos Deputados avança no debate de um marco para o uso de bases de dados em políticas públicas, com foco em finalidade, transparência e salvaguardas de privacidade.",
      },
    ],
  },
  {
    slug: "tribunal-prazos-processuais-digitais",
    title:
      "Superior Tribunal uniformiza entendimento sobre prazos processuais digitais",
    dek: "A decisão busca reduzir divergências entre turmas e dar previsibilidade a advogados e serventias.",
    authorName: "Equipe Corredor 61",
    category: "judiciario",
    publishedAt: "2026-08-31T18:05:00-03:00",
    status: "published",
    cover: {
      alt: "Composição em marinho e creme representando autos digitais.",
      motif: "judiciario",
    },
    body: [
      {
        type: "p",
        text: "A corte uniformizou o marco inicial de prazos quando a intimação ocorre em ambiente eletrônico, reduzindo divergências práticas entre unidades judiciárias.",
      },
    ],
  },
  {
    slug: "estados-regra-transferencias",
    title:
      "Governos estaduais avaliam impactos de nova regra de transferências",
    dek: "Técnicos apontam efeitos no planejamento orçamentário e na execução de programas continuados.",
    authorName: "Equipe Corredor 61",
    category: "politica",
    publishedAt: "2026-08-31T08:30:00-03:00",
    status: "published",
    cover: {
      alt: "Linhas em perspectiva sugerindo o eixo monumental.",
      motif: "politica",
    },
    body: [
      {
        type: "p",
        text: "Secretarias de fazenda e planejamento de vários estados mapeiam os efeitos de uma nova regra de transferências voluntárias sobre programas já em execução.",
      },
    ],
  },
  {
    slug: "comissao-mista-medidas-provisorias",
    title: "Comissão mista discute relatório de medidas provisórias",
    dek: "O colegiado tenta enxugar a pauta acumulada e definir quais textos seguem com urgência.",
    authorName: "Equipe Corredor 61",
    category: "legislativo",
    publishedAt: "2026-09-04T18:00:00-03:00",
    status: "published",
    cover: {
      alt: "Ilustração de plenário estilizado em azul-marinho.",
      motif: "legislativo",
    },
    body: [
      {
        type: "p",
        text: "A comissão mista se reúne para apreciar relatórios de medidas provisórias com prazo de vigência próximo do fim. A expectativa é de um acordo de procedimento, e não de mérito unânime.",
      },
    ],
  },
  {
    slug: "agu-parecer-conflitos-federativos",
    title:
      "AGU publica parecer sobre conflitos federativos em convênios",
    dek: "O documento orienta a União em controvérsias com estados e municípios sobre execução de parcerias.",
    authorName: "Equipe Corredor 61",
    category: "institucional",
    publishedAt: "2026-09-04T16:00:00-03:00",
    status: "published",
    cover: {
      alt: "Blocos institucionais em creme e dourado sobre fundo marinho.",
      motif: "institucional",
    },
    body: [
      {
        type: "p",
        text: "A Advocacia-Geral da União consolidou entendimento sobre hipóteses em que o conflito federativo em convênios deve ser tratado administrativamente antes de eventual judicialização.",
      },
    ],
  },
  {
    slug: "senado-agenda-sabatinas-indicados",
    title: "Senado agenda sabatinas de indicados para agências reguladoras",
    dek: "A CAE e a CI têm nomes pendentes de análise; líderes tentam concentrar as arguições antes do recesso.",
    authorName: "Equipe Corredor 61",
    category: "politica",
    publishedAt: "2026-09-01T09:20:00-03:00",
    status: "published",
    cover: { alt: "Composição em marinho evocando o plenário do Senado.", motif: "politica" },
    body: [
      {
        type: "p",
        text: "As comissões temáticas do Senado organizam o calendário de sabatinas de indicados para diretorias de agências reguladoras. O objetivo é reduzir o número de cargos com mandato vencido.",
      },
    ],
  },
  {
    slug: "cnj-revisa-metas-produtividade",
    title: "CNJ revisa metas de produtividade para tribunais em 2027",
    dek: "A proposta ajusta indicadores de tempo de tramitação e prioriza processos mais antigos e de execução fiscal.",
    authorName: "Equipe Corredor 61",
    category: "judiciario",
    publishedAt: "2026-08-30T14:00:00-03:00",
    status: "published",
    cover: { alt: "Blocos geométricos em azul-marinho e creme.", motif: "judiciario" },
    body: [
      {
        type: "p",
        text: "O Conselho Nacional de Justiça discute a revisão das metas nacionais do Poder Judiciário, com foco em prazo de julgamento e no estoque de processos antigos.",
      },
    ],
  },
  {
    slug: "camara-aprova-urgencia-marco-licitacoes",
    title: "Câmara aprova urgência para ajustes no marco de licitações",
    dek: "O texto trata de prazos recursais e de critérios de julgamento técnico em contratações de grande porte.",
    authorName: "Equipe Corredor 61",
    category: "legislativo",
    publishedAt: "2026-08-28T18:30:00-03:00",
    status: "published",
    cover: { alt: "Perspectiva de corredor com torres estilizadas.", motif: "legislativo" },
    body: [
      {
        type: "p",
        text: "A Câmara dos Deputados aprovou requerimento de urgência para um projeto que altera pontos do marco de licitações, especialmente sobre recursos administrativos e dosimetria de sanções.",
      },
    ],
  },
  {
    slug: "tcu-audita-transferencias-fundo-a-fundo",
    title: "Tribunal de Contas audita transferências fundo a fundo a municípios",
    dek: "O levantamento verifica prestação de contas e execução de recursos repassados para programas continuados.",
    authorName: "Equipe Corredor 61",
    category: "institucional",
    publishedAt: "2026-08-26T11:10:00-03:00",
    status: "published",
    cover: { alt: "Blocos institucionais em creme e dourado sobre fundo marinho.", motif: "institucional" },
    body: [
      {
        type: "p",
        text: "O Tribunal de Contas da União conduz auditoria sobre transferências fundo a fundo destinadas a municípios, com atenção à regularidade das prestações de contas.",
      },
    ],
  },
  {
    slug: "governadores-discutem-pacto-federativo",
    title: "Governadores discutem pauta comum de pacto federativo",
    dek: "O encontro reúne propostas sobre partilha de receitas, dívida dos estados e regras de transferência voluntária.",
    authorName: "Equipe Corredor 61",
    category: "politica",
    publishedAt: "2026-08-24T16:45:00-03:00",
    status: "published",
    cover: { alt: "Linhas em perspectiva sugerindo o eixo monumental.", motif: "politica" },
    body: [
      {
        type: "p",
        text: "Governadores de diferentes regiões articulam uma pauta comum sobre pacto federativo, com itens ligados a receitas, endividamento e previsibilidade de repasses.",
      },
    ],
  },
  {
    slug: "rascunho-interno-nao-publicado",
    title: "Texto em rascunho — não deve aparecer no site",
    dek: "Matéria de teste para validar o filtro de status.",
    authorName: "Equipe Corredor 61",
    category: "institucional",
    publishedAt: "2026-09-04T20:00:00-03:00",
    status: "draft",
    cover: {
      alt: "Imagem de rascunho.",
      motif: "institucional",
    },
    body: [{ type: "p", text: "Este conteúdo permanece no CMS como rascunho." }],
  },
];

export const articles: Article[] = [
  {
    slug: "preco-institucional-do-rito",
    title: "O preço institucional de acelerar o rito legislativo",
    dek: "Quando a urgência vira regra, o Congresso perde capacidade de escrutínio — e o cidadão, previsibilidade.",
    authorSlug: "ana-ribeiro",
    category: "legislativo",
    publishedAt: "2026-09-03T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Caminho dourado em perspectiva, símbolo do corredor legislativo.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "Acelerar o rito parece eficiente. Na prática, transfere o custo para depois: vetos, judicialização e normas que ninguém consegue explicar com segurança.",
      },
      {
        type: "h2",
        text: "Urgência como exceção",
      },
      {
        type: "p",
        text: "O processo legislativo existe para filtrar. Quando a urgência vira hábito, o filtro deixa de funcionar e o corredor institucional se transforma em atalho.",
      },
    ],
  },
  {
    slug: "controle-publico-metodo",
    title: "Controle público não é obstáculo: é método",
    dek: "A tensão entre celeridade administrativa e accountability exige desenho normativo, não atalhos.",
    authorSlug: "carlos-mendes",
    category: "institucional",
    publishedAt: "2026-09-02T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Geometria institucional em marinho e creme.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "Tratar o controle como inimigo da gestão é um erro de premissa. Órgãos de contas e controladoria são parte do método republicano, não um obstáculo a ser contornado.",
      },
    ],
  },
  {
    slug: "dados-publicos-decisao-privada",
    title: "Dados públicos, decisão privada?",
    dek: "A regulação do uso de informação no Estado precisa separar inovação de opacidade.",
    authorSlug: "helena-costa",
    category: "institucional",
    publishedAt: "2026-08-28T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Grade de colunas em perspectiva, remetendo a arquivos e dados.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "Inovar com dados no setor público não autoriza esconder a finalidade, a base legal e os riscos. Transparência e proteção não são polos opostos — são condições da mesma decisão.",
      },
    ],
  },
  {
    slug: "seguranca-juridica-regimento",
    title: "Segurança jurídica começa no regulamento interno",
    dek: "Regras de tramitação pouco claras geram litígio antes mesmo da sanção da lei.",
    authorSlug: "paulo-andrade",
    category: "legislativo",
    publishedAt: "2026-08-25T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Torres estilizadas ao fundo de um corredor geométrico.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "Antes do mérito, há o rito. Um regimento ambíguo produz controvérsia procedimental, atrasa o debate público e empobrece a qualidade da norma.",
      },
    ],
  },
  {
    slug: "brasilia-alem-do-noticiario",
    title: "Brasília além do noticiário: o que o corredor não mostra",
    dek: "Bastidores técnicos — consultorias, comissões e pareceres — definem mais do que o discurso de plenário.",
    authorSlug: "marina-lopes",
    category: "politica",
    publishedAt: "2026-08-20T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Perspectiva do corredor rumo às torres do Congresso.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "O noticiário cobre o plenário. A decisão, muitas vezes, já foi desenhada no parecer, na nota técnica e na reunião que o leitor não vê. Este portal existe para aproximar esses dois planos.",
      },
    ],
  },
  {
    slug: "prazos-digitais-e-defesa",
    title: "Prazos digitais e o direito de defesa",
    dek: "Uniformizar a contagem eletrônica é medida de acesso à justiça, não de burocracia.",
    authorSlug: "paulo-andrade",
    category: "judiciario",
    publishedAt: "2026-08-18T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Composição em marinho sugerindo um processo eletrônico.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "A intimação eletrônica só amplia acesso se o prazo for inteligível. Divergência entre turmas é custo para o advogado e risco para a parte.",
      },
    ],
  },
  {
    slug: "arquivo-coluna-inativa",
    title: "Memória institucional: por que arquivo também é transparência",
    dek: "Coluna de arquivo, mantida no site mesmo com o autor inativo na listagem atual.",
    authorSlug: "ricardo-nunes",
    publishedAt: "2026-03-10T08:00:00-03:00",
    status: "published",
    cover: {
      alt: "Arquivo institucional em tons de creme.",
      motif: "opiniao",
    },
    body: [
      {
        type: "p",
        text: "Manter o histórico acessível é parte da credibilidade de um portal. Autores podem deixar de colaborar; os textos já publicados continuam no acervo.",
      },
    ],
  },
  {
    slug: "regra-fiscal-e-previsibilidade",
    title: "Regra fiscal só funciona se for previsível",
    dek: "Metas que mudam a cada ciclo orçamentário transferem incerteza para estados, municípios e para quem executa política pública.",
    authorSlug: "marina-lopes",
    category: "politica",
    publishedAt: "2026-08-14T08:00:00-03:00",
    status: "published",
    cover: { alt: "Gráfico estilizado em marinho sobre fundo creme.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "A previsibilidade é o principal produto de uma regra fiscal. Quando o parâmetro muda de interpretação a cada exercício, o efeito prático é o mesmo de não haver regra.",
      },
      {
        type: "p",
        text: "Gestores subnacionais planejam com base em expectativa de repasse. Alterar a régua no meio do caminho penaliza justamente quem se organizou para cumpri-la.",
      },
    ],
  },
  {
    slug: "sancao-administrativa-e-proporcionalidade",
    title: "Sanção administrativa sem proporcionalidade é arbítrio",
    dek: "A dosimetria da penalidade precisa de critério explícito; sem isso, a mesma conduta rende decisões incompatíveis entre órgãos.",
    authorSlug: "ana-ribeiro",
    category: "judiciario",
    publishedAt: "2026-08-08T08:00:00-03:00",
    status: "published",
    cover: { alt: "Composição geométrica sugerindo uma balança.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "Aplicar sanção é ato vinculado ao princípio da proporcionalidade. A ausência de parâmetros de dosimetria abre espaço para tratamento desigual de casos equivalentes.",
      },
    ],
  },
  {
    slug: "transparencia-ativa-alem-do-portal",
    title: "Transparência ativa não termina na publicação do dado",
    dek: "Publicar planilha não é o mesmo que tornar a informação compreensível. Formato e contexto fazem parte da obrigação.",
    authorSlug: "helena-costa",
    category: "institucional",
    publishedAt: "2026-07-29T08:00:00-03:00",
    status: "published",
    cover: { alt: "Grade de colunas em perspectiva, remetendo a bases de dados.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "Transparência ativa pressupõe informação utilizável. Dados sem dicionário, sem série histórica e sem formato aberto cumprem a formalidade e falham no objetivo.",
      },
    ],
  },
  {
    slug: "comissoes-e-o-tempo-da-lei",
    title: "As comissões e o tempo que a lei precisa",
    dek: "Prazo de vista existe para permitir escrutínio. Reduzi-lo por acordo recorrente esvazia a função revisora do colegiado.",
    authorSlug: "paulo-andrade",
    category: "legislativo",
    publishedAt: "2026-07-21T08:00:00-03:00",
    status: "published",
    cover: { alt: "Plenário estilizado em azul-marinho.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "O tempo de tramitação em comissão não é obstáculo: é a etapa em que o texto ganha consistência técnica antes do plenário. Encurtá-lo como regra desloca o debate para o momento errado.",
      },
    ],
  },
  {
    slug: "pareceres-que-viram-politica",
    title: "Pareceres que viram política pública sem passar pelo debate",
    dek: "Notas técnicas orientam decisões relevantes e raramente aparecem no noticiário. Falta rastreabilidade sobre quem decide o quê.",
    authorSlug: "carlos-mendes",
    category: "institucional",
    publishedAt: "2026-07-11T08:00:00-03:00",
    status: "published",
    cover: { alt: "Documentos empilhados em tons de creme e marinho.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "Parte das definições de política pública nasce em parecer, não em votação. Isso não é irregular, mas exige registro claro do caminho percorrido até a decisão.",
      },
    ],
  },
  {
    slug: "federalismo-e-repasse-voluntario",
    title: "Federalismo se mede na regra do repasse voluntário",
    dek: "Critérios pouco objetivos de transferência voluntária concentram poder de decisão e reduzem a autonomia de quem recebe.",
    authorSlug: "marina-lopes",
    category: "politica",
    publishedAt: "2026-06-30T08:00:00-03:00",
    status: "published",
    cover: { alt: "Linhas em perspectiva sugerindo o eixo monumental.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "A transferência voluntária é um dos pontos em que o federalismo brasileiro se define na prática. Quanto mais discricionário o critério, menor a previsibilidade para o ente que depende do recurso.",
      },
    ],
  },
  {
    slug: "vacatio-legis-nao-e-formalidade",
    title: "Vacatio legis não é formalidade: é condição de eficácia",
    dek: "Publicar a norma sem prazo razoável de adaptação transfere ao destinatário o custo de uma transição que deveria ter sido planejada.",
    authorSlug: "paulo-andrade",
    category: "legislativo",
    publishedAt: "2026-06-18T08:00:00-03:00",
    status: "published",
    cover: { alt: "Colunas em perspectiva sobre fundo creme.", motif: "opiniao" },
    body: [
      {
        type: "p",
        text: "O período entre a publicação e a vigência existe para que órgãos e regulados ajustem sistemas, contratos e rotinas. Suprimi-lo por pressa legislativa produz insegurança já no primeiro dia de aplicação.",
      },
    ],
  },
];

export const supporters: Supporter[] = [
  {
    slug: "instituto-estudos-legislativos",
    name: "Instituto de Estudos Legislativos",
    shortName: "IEL",
    url: "https://www.instagram.com/corredor61.br",
    order: 1,
    active: true,
  },
  {
    slug: "escritorio-publico-associados",
    name: "Público & Associados",
    shortName: "P&A",
    order: 2,
    active: true,
  },
  {
    slug: "fundacao-cidadania-institucional",
    name: "Fundação Cidadania Institucional",
    shortName: "FCI",
    order: 3,
    active: true,
  },
  {
    slug: "centro-pesquisa-direito-publico",
    name: "Centro de Pesquisa em Direito Público",
    shortName: "CPDP",
    order: 4,
    active: true,
  },
  {
    slug: "associacao-tecnica-brasilia",
    name: "Associação Técnica de Brasília",
    shortName: "ATB",
    order: 5,
    active: true,
  },
  {
    slug: "observatorio-legislativo",
    name: "Observatório Legislativo",
    shortName: "OL",
    order: 6,
    active: true,
  },
];

export const about: AboutContent = {
  title: "Sobre nós",
  proposal:
    "O Corredor 61 é um portal de conteúdo técnico, jurídico, legislativo e político que nasce com a proposta de conectar informação, análise e experiência prática sobre os principais temas que movimentam o poder público e o debate nacional.",
  intro: [
    "Mais do que um portal de notícias, o Corredor 61 reúne uma rede de especialistas que vivem a política e acompanham de perto a construção das decisões. Juristas, especialistas, autoridades, cientistas políticos, profissionais do setor público e convidados com reconhecida experiência contribuem com análises, artigos e informações qualificadas sobre o cenário brasileiro.",
    "O projeto também se diferencia pela articulação com os bastidores do poder, acompanhando de perto as discussões, negociações e decisões que acontecem nas três esferas dos entes federativos (União, Estados e Municípios) e nos diferentes Poderes e instituições públicas.",
    "O nome Corredor 61 remete a Brasília e ao ambiente institucional que conecta o debate público ao Congresso Nacional, ao Executivo, ao Judiciário e aos demais órgãos e instituições que participam da construção das políticas e decisões que impactam o país.",
    "A proposta é oferecer um endereço permanente para conteúdos que hoje estão dispersos entre redes sociais, assessorias, veículos especializados e meios de comunicação generalistas, reunindo em um mesmo ambiente informação, opinião qualificada e conhecimento técnico.",
  ],
  objectives: [
    "Informar: publicar notícias e informações com regularidade sobre os cenários político, jurídico e legislativo, com foco no que efetivamente influencia a tomada de decisões.",
    "Analisar: oferecer artigos, análises e conteúdos aprofundados produzidos por especialistas e convidados que conhecem, na prática, os temas sobre os quais escrevem.",
    "Conectar: aproximar o leitor dos ambientes onde as decisões são discutidas, construídas e negociadas, traduzindo os movimentos dos bastidores para o debate público.",
    "Reunir especialistas: formar uma equipe e uma rede de colaboradores composta por juristas, cientistas políticos, especialistas, autoridades, técnicos e profissionais com experiência direta na vida pública e institucional brasileira.",
    "Dar contexto: ir além da notícia factual, apresentando os diferentes aspectos técnicos, jurídicos, políticos e institucionais que envolvem cada tema.",
    "Construir credibilidade: manter uma identidade editorial marcada por seriedade, independência, conhecimento técnico e autoridade, com linguagem acessível e navegação moderna.",
    "Valorizar parceiros institucionais: dar visibilidade a apoiadores e parceiros de forma orgânica e institucional, sem transformar o conteúdo editorial em publicidade convencional.",
  ],
  whoMakes: [
    "O Corredor 61 é construído por uma equipe multidisciplinar de especialistas e profissionais que conhecem de perto a dinâmica do poder público e a tomada de decisões no Brasil.",
    "São profissionais que não apenas acompanham a política: vivem o ambiente institucional, participam das discussões, interpretam cenários e acompanham os processos decisórios de perto.",
    "A equipe reúne diferentes olhares e experiências. Do jurídico ao político. Do técnico ao institucional. A alternância de colaboradores permite que o portal ofereça conteúdo com profundidade, contexto e credibilidade.",
    "Ao lado da equipe permanente, o Corredor 61 contará com colaboradores convidados, entre juristas, autoridades, cientistas políticos, especialistas, técnicos, gestores públicos e personalidades com atuação relevante nos temas em debate.",
    "Essa combinação entre informação, conhecimento técnico, experiência institucional e articulação é o que pretende fazer do Corredor 61 um espaço diferenciado para quem quer compreender não apenas o que está acontecendo, mas também por que está acontecendo, quem está discutindo e quais decisões podem surgir a partir disso.",
  ],
  people: [],
};
