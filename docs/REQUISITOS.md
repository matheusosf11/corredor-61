# Documento de requisitos — Corredor 61

**Versão:** 1.0  
**Data:** 3 de setembro de 2026  
**Status:** rascunho para validação com a cliente  
**Tipo:** PRD (Product Requirements Document) da v1 do portal

---

## 1. Visão do produto

### 1.1 O que é

O **Corredor 61** é um portal de conteúdo técnico, jurídico, legislativo e político, com identidade visual profissional, institucional e personalizada. O site funciona principalmente como **portal de informação e produção de conteúdo**, reunindo notícias e artigos de diferentes especialistas em um único ambiente.

O nome e a marca remetem a Brasília (DDD 61) e ao corredor institucional que liga o debate público às instâncias de decisão — Congresso, Executivo, Judiciário e demais órgãos.

### 1.2 Problema que resolve

Hoje, conteúdos jurídicos, legislativos e políticos de qualidade ficam dispersos entre redes sociais, assessorias e veículos generalistas. Falta um espaço próprio, com tom institucional, onde:

- notícias do cenário político-jurídico-legislativo sejam publicadas com regularidade;
- artigos aprofundados e opinativos de autoridades e especialistas tenham um endereço permanente;
- o projeto tenha uma vitrine institucional (Sobre Nós + apoiadores) compatível com o posicionamento profissional do portal.

### 1.3 Proposta de valor

Um portal credível, sério e de autoridade, com estética ligada aos universos jurídico, político e institucional, porém com navegação moderna e fácil. Não é jornal pago, não é vitrine comercial e não é cópia de outro veículo: combina referências do segmento com identidade própria.

### 1.4 Tom e posicionamento

| Deve transmitir | Não deve parecer |
| --- | --- |
| Credibilidade, seriedade, autoridade | Tabloide, viral, “clickbait” |
| Institucional e profissional | Anúncio, publicidade, marketplace |
| Ligado a Brasília e ao debate público | Blog pessoal genérico |
| Navegação moderna e clara | Portal antigo, pesado, difícil de usar |

**Paywall / assinatura:** fora da v1. Todo o conteúdo publicado é de acesso livre.

### 1.5 Público-alvo

- Advogados, escritórios e operadores do Direito
- Assessores parlamentares, técnicos e servidores
- Jornalistas e profissionais de comunicação política
- Políticos, ministros, conselheiros e autoridades convidadas (como autores)
- Leitores interessados no cenário de Brasília e no debate institucional brasileiro

### 1.6 O que já existe

| Item | Situação |
| --- | --- |
| Marca / logo | Entregue (arquivo da cliente) |
| Instagram | Ativo: [instagram.com/corredor61.br](https://www.instagram.com/corredor61.br) |
| Domínio | Comprado pela cliente; URL e acesso DNS ainda não recebidos |

---

## 2. Identidade visual

Diretrizes extraídas da logo oficial. O site deve usar essa paleta e essa linguagem — não uma paleta genérica de “portal de notícias”.

### 2.1 Paleta

| Papel | Cor | Uso previsto no site |
| --- | --- | --- |
| Primária | Azul-marinho | Header, navegação, títulos, moldura institucional, botões principais |
| Superfície / texto | Off-white / creme | Fundos claros, texto sobre azul, contraste de leitura |
| Acento | Dourado mostarda | Linhas, divisores, destaques pontuais, hover, caminho visual |
| Fundo institucional | Preto | Hero opcional, rodapé, versões da logo em fundo escuro |

Valores hexadecimais exatos serão extraídos da arte final da logo na etapa de design system. Até lá, a referência visual é o arquivo da marca.

### 2.2 Linguagem visual

- Geometria limpa, perspectiva e linhas arquitetônicas (corredor, colunas, Congresso).
- Referência a Brasília e à arquitetura institucional, sem ilustração literal excessiva.
- Tipografia sans-serif, caixa alta nos rótulos de marca (como no wordmark **CORREDOR 61**).
- Sem visual de banner publicitário, selo “anúncio” ou carrossel comercial na área de apoiadores.

### 2.3 Aplicação da logo

- Header: logo completa (emblema + wordmark) em desktop; versão compacta em mobile e no header fixo, se houver.
- Favicon: recorte do emblema (C + corredor + torres).
- Redes sociais e Open Graph: versão da logo em fundo escuro ou marinho, conforme a arte original.

---

## 3. Referências (o que aproveitar e o que não copiar)

A ideia não é reproduzir os sites abaixo, e sim combinar conceitos e criar identidade própria.

### 3.1 [JOTA](https://www.jota.info/)

**Aproveitar**

- Hierarquia clara de destaques na home (notícia principal com imagem, título e linha fina).
- Separação nítida entre **notícia** e **opinião/artigos/colunas**.
- Sensação de portal atualizado, com “últimas” e conteúdos mais lidos como padrão de mercado (o Corredor 61 na v1 usa “mais recentes”, não ranking de mais lidas).

**Não copiar na v1**

- Verticais pagas (PRO Poder, Tributos, Trabalhista etc.).
- Paywall, login de assinante, newsletters como produto.
- Coberturas especiais patrocinadas / estúdio comercial.
- Megamenu com dezenas de editorias.

### 3.2 [Eixo Político](https://eixopolitico.com.br/)

**Aproveitar**

- Home mais enxuta e legível.
- Bloco de análises/artigos com **nome do autor em evidência**.
- Seções com “veja mais” para listagens.

**Não copiar na v1**

- Seção de vídeos / YouTube.
- Tom de portal político generalista sem a marca visual própria do Corredor 61.

### 3.3 Síntese para o Corredor 61

Portal institucional com home de notícias em destaque no centro, colunistas/artigos na lateral (como um “corredor” de opinião), apoiadores no rodapé sem cara de anúncio, e busca no header. Visual da marca (marinho, creme, dourado), não o visual dos concorrentes.

---

## 4. Usuários e papéis

| Papel | Quem é | O que faz na v1 |
| --- | --- | --- |
| Visitante | Qualquer leitor | Navega, lê notícias e artigos, busca, acessa Sobre / Autores / Apoiadores, vai ao Instagram |
| Editor interno | Equipe do Corredor 61 (1 a 3 pessoas) | Entra no CMS, cria rascunho, faz preview, publica, edita, despublica |
| Autor / colunista externo | Políticos, técnicos, ministros, conselheiros, especialistas convidados | **Não tem login.** Envia o texto por e-mail/WhatsApp; a equipe cadastra o perfil, formata e publica |
| Apoiador institucional | Empresa, escritório, instituição | Não acessa o CMS. Aparece com logo e link, por cadastro da equipe |

Não há cadastro público, comentários nem área logada para leitores na v1.

---

## 5. Arquitetura de informação

### 5.1 Mapa de páginas (v1)

| Rota (sugestão) | Página | Observação |
| --- | --- | --- |
| `/` | Home / portal | Destaques, notícias, artigos, apoiadores |
| `/noticias` | Listagem de notícias | Mais recentes primeiro, com paginação |
| `/noticias/[slug]` | Matéria completa | |
| `/artigos` | Listagem de artigos | Mais recentes primeiro, com paginação |
| `/artigos/[slug]` | Artigo completo | Autor em destaque |
| `/autores` | Listagem de colunistas | |
| `/autores/[slug]` | Perfil do autor | Bio + lista de artigos |
| `/sobre` | Sobre Nós | Proposta, objetivos, pessoas |
| `/apoiadores` | Apoiadores Institucionais | Página própria + bloco na home |
| `/busca` | Resultados da busca | Filtro visual notícia vs artigo |
| `/privacidade` | Política de Privacidade | Placeholder na v1, se ainda não houver texto jurídico |
| `/termos` | Termos de uso | Placeholder na v1 |

### 5.2 Navegação global (header)

- Logo (volta à home)
- Notícias
- Artigos
- Autores
- Sobre
- Campo de **busca**
- Ícone/link do **Instagram** (abre em nova aba)

Apoiadores não precisam estar no menu principal: aparecem no rodapé da home, no footer global e na página `/apoiadores`.

### 5.3 Footer global

- Logo + linha curta do projeto
- Links: Notícias, Artigos, Autores, Sobre, Apoiadores, Privacidade, Termos
- Instagram (e outras redes, se a cliente informar)
- Crédito institucional discreto (ex.: © Corredor 61)

---

## 6. Home — layout da v1

A página inicial funciona como portal de conteúdo, com maior destaque às notícias mais recentes.

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Notícias  Artigos  Autores  Sobre    🔍    IG     │
├──────────────────────────────────┬──────────────────────────┤
│                                  │                          │
│  DESTAQUE PRINCIPAL (notícia)    │  ARTIGOS / COLUNISTAS    │
│  imagem + título + linha fina    │  título, autor, chamada  │
│                                  │  (lista recente)         │
│  Grade de notícias recentes      │                          │
│  (imagem, título, chamada,       │                          │
│   data, categoria)               │                          │
│                                  │                          │
├──────────────────────────────────┴──────────────────────────┤
│  Faixa “Mais recentes” ou destaques adicionais              │
├─────────────────────────────────────────────────────────────┤
│  Apoiadores Institucionais (logos, sem selo de anúncio)     │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 6.1 Blocos

1. **Header** — logo, menu, busca, Instagram.
2. **Destaque principal** — uma notícia em evidência (imagem grande, título, chamada). Pode ser a mais recente ou uma marcada como “destaque” no CMS.
3. **Grade central de notícias** — demais notícias recentes com imagem, título, chamada, data e categoria leve.
4. **Lateral direita (desktop)** — artigos e colunistas: itens recentes com título, nome do autor e chamada curta, link para o artigo completo. Comportamento de “corredor de opinião”, não de blog genérico.
5. **Faixa de recentes / destaques** — lista compacta para dar aparência de portal vivo (mistura notícias recentes ou itens marcados no CMS).
6. **Apoiadores Institucionais** — logos em faixa inferior, abordagem institucional.
7. **Footer**.

### 6.2 Mobile

Mobile-first. Não há sidebar clássica no celular: o bloco de artigos/colunistas aparece **abaixo** da grade de notícias, antes da faixa de recentes. Busca acessível no header (ícone que abre campo). Logos de apoiadores em grade ou carrossel discreto (sem autoplay agressivo).

### 6.3 Quantidades sugeridas (ajustáveis no CMS ou em constante)

| Bloco | Quantidade inicial |
| --- | --- |
| Destaque principal | 1 |
| Notícias na grade | 6 |
| Artigos na lateral | 5 |
| Itens na faixa “mais recentes” | 8 |
| Apoiadores visíveis na home | todos os ativos, ou até 12 com “ver todos” |

---

## 7. Requisitos funcionais (v1)

Cada requisito tem um ID para rastreio em aceite e desenvolvimento.

### 7.1 Home e navegação

| ID | Requisito |
| --- | --- |
| RF-01 | A home exibe destaque principal, grade de notícias, lateral de artigos, faixa de recentes e apoiadores, conforme a seção 6. |
| RF-02 | Header e footer estão em todas as páginas públicas, com os itens da seção 5.2 e 5.3. |
| RF-03 | Clique em notícia, artigo, autor ou apoiador (quando houver URL) leva à página correspondente. |
| RF-04 | Link do Instagram aponta para `https://www.instagram.com/corredor61.br` e abre em nova aba. |

### 7.2 Notícias

| ID | Requisito |
| --- | --- |
| RF-05 | Listagem `/noticias` mostra matérias publicadas, da mais recente para a mais antiga, com paginação. |
| RF-06 | Página da matéria exibe título, linha fina, autor interno, data, categoria, imagem de capa e corpo rico. |
| RF-07 | URL amigável baseada em slug (ex.: `/noticias/ccj-aprova-pec`). |
| RF-08 | Notícia só aparece no site se estiver com status **publicado** e data de publicação alcançada. |

**Campos da notícia (CMS)**

- Título
- Slug
- Linha fina / chamada
- Corpo (texto rico: parágrafos, subtítulos, listas, links, imagens no meio do texto)
- Imagem de capa + texto alternativo (alt)
- Autor interno (referência a pessoa da equipe ou campo simples de nome)
- Categoria (taxonomia leve; ver 7.7)
- Data de publicação
- Status: rascunho / publicado
- Flag opcional: destaque na home

### 7.3 Artigos

| ID | Requisito |
| --- | --- |
| RF-09 | Listagem `/artigos` mostra artigos publicados, da mais recente para a mais antiga, com paginação, título, autor e chamada. |
| RF-10 | Página do artigo exibe título, linha fina, autor (nome, foto, cargo, link para o perfil), data, imagem de capa e corpo rico. |
| RF-11 | Autor/colunista é **obrigatório** em todo artigo. |
| RF-12 | Artigo só aparece no site se estiver publicado. |

**Campos do artigo (CMS):** os mesmos da notícia, com autor/colunista obrigatório (referência ao perfil). Categoria opcional ou a mesma taxonomia leve.

### 7.4 Autores / colunistas

| ID | Requisito |
| --- | --- |
| RF-13 | Listagem `/autores` mostra colunistas ativos (foto, nome, cargo). |
| RF-14 | Perfil `/autores/[slug]` mostra foto, nome, cargo/bio e lista dos artigos publicados daquela pessoa. |
| RF-15 | A equipe cadastra autores no CMS; o autor externo não acessa o painel. |

**Campos do autor**

- Nome
- Slug
- Foto
- Cargo / afiliação (ex.: deputado, conselheiro, advogado)
- Bio curta
- Ativo (sim/não) — inativos não entram na listagem, mas perfis e artigos antigos continuam acessíveis por URL

### 7.5 Sobre Nós

| ID | Requisito |
| --- | --- |
| RF-16 | Página `/sobre` apresenta o projeto, a proposta, os objetivos e as pessoas envolvidas. |
| RF-17 | Conteúdo gerenciável no CMS (não hardcoded), para a cliente atualizar textos e fotos da equipe sem deploy. |

### 7.6 Apoiadores Institucionais

Nomenclatura adotada na v1: **Apoiadores Institucionais**.  
Objetivo: exposição institucional de empresas, escritórios, instituições e organizações que apoiam o projeto, **sem** abordagem de anúncio ou publicidade.

| ID | Requisito |
| --- | --- |
| RF-18 | Bloco na parte inferior da home com logos dos apoiadores ativos, na ordem definida no CMS. |
| RF-19 | Página `/apoiadores` lista os mesmos apoiadores com logo, nome e, se houver, link externo (nova aba). |
| RF-20 | Não há selo “anúncio”, “publi” ou “patrocinado” nessa seção. |
| RF-21 | Cadastro no CMS: logo, nome, URL opcional, ordem, ativo sim/não. Sem deploy para incluir/remover apoiador. |

### 7.7 Categorias (taxonomia leve)

Não há verticais estilo JOTA. Há uma lista curta, editável no CMS, para organizar notícias (e, se fizer sentido, artigos).

Sugestão inicial (a confirmar com a cliente):

- Legislativo
- Judiciário
- Política
- Institucional

| ID | Requisito |
| --- | --- |
| RF-22 | Toda notícia tem uma categoria. A categoria aparece como rótulo no card e na matéria. |
| RF-23 | Na v1 **não** é obrigatória uma página de arquivo por categoria; o rótulo é informativo. Filtro por categoria na listagem de notícias é desejável se couber no prazo, não bloqueante. |

### 7.8 Busca

Único recurso extra explicitamente incluído na v1 além do briefing de páginas.

| ID | Requisito |
| --- | --- |
| RF-24 | Campo de busca no header (todas as páginas públicas). |
| RF-25 | A busca cobre **notícias e artigos** publicados, nos campos título, chamada e corpo. |
| RF-26 | Página `/busca` lista resultados com título, tipo (Notícia ou Artigo), chamada curta e link. |
| RF-27 | Consulta vazia ou sem resultados mostra estado vazio compreensível (não uma página em branco). |
| RF-28 | Implementação inicial via consulta no CMS (GROQ/Sanity). Motor dedicado (Algolia etc.) fica para se o volume crescer. |

Autores, páginas estáticas e apoiadores **não** entram no índice da busca na v1.

### 7.9 CMS e fluxo editorial

| ID | Requisito |
| --- | --- |
| RF-29 | Apenas a equipe interna (1 a 3 editores) possui login no CMS. |
| RF-30 | O editor consegue criar, editar, salvar rascunho, pré-visualizar e publicar notícias, artigos, autores, apoiadores e o conteúdo de Sobre Nós. |
| RF-31 | Publicar no CMS deixa o conteúdo visível no site **sem novo deploy** do front-end (revalidação/ISR ou equivalente). |
| RF-32 | Não há cadastro público nem login de colunista na v1. |

**Fluxo editorial**

```
Autor externo (e-mail / WhatsApp)
        → Equipe interna formata e cadastra no CMS
            → Rascunho → Preview → Publicado
                → Visível no site
```

Conteúdo originado no Instagram só entra no portal se a equipe **republicar** como notícia ou artigo. Não há importação automática.

### 7.10 Redes sociais

| ID | Requisito |
| --- | --- |
| RF-33 | Header e footer têm link para o Instagram oficial. |
| RF-34 | Não há feed embedado do Instagram na v1. |
| RF-35 | Se a cliente informar outras redes (LinkedIn, X, YouTube), entram como ícones no footer, sem bloco de feed. |

---

## 8. Requisitos não-funcionais

Estes itens não são “features extra”; são qualidade mínima do portal.

### 8.1 SEO técnico

| ID | Requisito |
| --- | --- |
| RNF-01 | Cada página pública tem título e meta description próprios (com fallbacks). |
| RNF-02 | Open Graph (título, descrição, imagem) para compartilhamento em redes. |
| RNF-03 | URLs amigáveis (slugs), `sitemap.xml` e `robots.txt`. |
| RNF-04 | HTML semântico (headings, um `h1` por página). |

### 8.2 Performance e imagens

| ID | Requisito |
| --- | --- |
| RNF-05 | Imagens de capa e logos servidas de forma otimizada (tamanho, formato moderno quando possível). |
| RNF-06 | Home e matérias com carregamento adequado a portal de notícias (atenção ao LCP da imagem de destaque). |

### 8.3 Mobile e acessibilidade

| ID | Requisito |
| --- | --- |
| RNF-07 | Layout utilizável em celular, tablet e desktop (mobile-first). |
| RNF-08 | Contraste suficiente na paleta marinho/creme/dourado; não usar dourado como único meio de informação. |
| RNF-09 | `alt` obrigatório em imagens de capa, fotos de autor e logos de apoiadores. |
| RNF-10 | Navegação por teclado no header, busca e links principais. |

### 8.4 Privacidade (LGPD)

| ID | Requisito |
| --- | --- |
| RNF-11 | Sem banner de cookies na v1 **enquanto** não houver Analytics nem scripts de terceiros de rastreamento. |
| RNF-12 | Se Analytics (ou outro terceiro) for ligado no lançamento, entra aviso de cookies + textos em `/privacidade`. |
| RNF-13 | Google Analytics 4 é **recomendado e gratuito**, mas **opcional**: só entra com confirmação da cliente (ver seção 13). |

### 8.5 Custo e operação

| ID | Requisito |
| --- | --- |
| RNF-14 | Hospedagem e CMS da v1 cabem em planos gratuitos (ver seção 10). |
| RNF-15 | A equipe publica conteúdo sem depender de desenvolvedor no dia a dia. |

---

## 9. Fora da v1 (backlog)

Registrado para não entrar no escopo atual sem nova priorização.

- Newsletter / captura de e-mail
- Paywall, assinatura, área logada do leitor
- Verticais temáticas estilo JOTA (produtos/editorias pagas)
- Seção de vídeos / YouTube
- Feed embedado do Instagram
- Formulário de contato / sugestão de pauta
- Login de colunistas para envio de artigos
- Comentários
- Anúncios, publi, conteúdo patrocinado
- Ranking “mais lidas”
- Cobertura ao vivo
- Aplicativo mobile
- Busca avançada / Algolia
- Multilíngue
- Dark mode dedicado (o preto da marca pode aparecer em trechos, mas não é tema completo)

---

## 10. Stack e operação (custo mínimo)

Seção técnica para o desenvolvimento. A cliente não precisa operar essas ferramentas no dia a dia — só o CMS.

### 10.1 Recomendação da v1

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Front-end | **Next.js** (App Router) | Portal de conteúdo, SEO, preview, revalidação após publicar |
| Hospedagem do site | **Vercel Hobby** (gratuito) | Encaixa no Next.js; domínio customizado quando o DNS for liberado |
| CMS | **Sanity** (plano gratuito) | Editor visual adequado a redação; rascunho, preview, mídia |
| Busca | Consulta GROQ no Sanity | Zero custo extra no volume inicial |
| Repositório | Git (GitHub ou equivalente) | Deploy contínuo na Vercel |

**Alternativas avaliadas (não adotadas na v1)**

- WordPress clássico: a cliente não pediu essa ferramenta; o projeto optou por Next.js + headless.
- Payload/Strapi self-hosted: mais operação de servidor, risco de custo e manutenção.
- Markdown/git-only (sem CMS): a equipe não publicaria com autonomia.

### 10.2 Domínio

O domínio já foi comprado pela cliente. Enquanto a URL e o acesso ao painel DNS não forem entregues, o site pode subir em URL temporária da Vercel (`*.vercel.app`) e depois apontar o domínio definitivo (registro A/CNAME / nameservers, conforme o provedor).

### 10.3 Limites dos planos gratuitos (atenção)

O documento assume volume editorial de um portal nascente (dezenas a poucas centenas de peças no primeiro ciclo). Se o Sanity ou a Vercel baterem teto de uso (requisições, bandwidth, usuários do CMS), revisa-se o plano pago — fora do compromisso de “custo zero permanente”.

---

## 11. Critérios de aceite da v1

A v1 pode ser considerada pronta para a cliente validar quando **todos** os itens abaixo forem verdadeiros.

1. A home mostra **1 destaque** + grade de notícias + artigos na lateral (no mobile, artigos abaixo das notícias) + faixa de recentes + apoiadores no rodapé da página.
2. Publicar uma **notícia** no CMS a deixa visível na home e em `/noticias` sem novo deploy.
3. Publicar um **artigo** no CMS o deixa visível na lateral/home e em `/artigos`, com autor obrigatório.
4. Existe perfil de autor com bio e lista de artigos.
5. A página **Sobre Nós** é editável no CMS.
6. Um **apoiador** cadastrado (logo + nome + link opcional) aparece na home e em `/apoiadores`, **sem** selo de anúncio.
7. A **busca** no header encontra notícia e artigo pelo **título**; a página de resultados distingue os dois tipos.
8. O Instagram do header/footer abre o perfil `@corredor61.br`.
9. O site é utilizável no **celular**.
10. Páginas de matéria e artigo têm título, meta description e imagem para compartilhamento (Open Graph).
11. `/privacidade` e `/termos` existem (mesmo que como placeholder acordado).
12. Visual alinhado à marca: azul-marinho, creme, dourado; logo no header.

---

## 12. Modelo de conteúdo (resumo para o CMS)

```
Categoria (nome, slug)
Autor (nome, slug, foto, cargo, bio, ativo)
Notícia  → categoria, autor interno, mídia, corpo
Artigo   → autor (obrigatório), mídia, corpo
Apoiador (nome, logo, url, ordem, ativo)
Sobre    (conteúdo único da página)
Configuração do site (nome, Instagram, outras redes) — opcional
```

---

## 13. Pendências para a cliente

Itens que o desenvolvimento precisa receber ou confirmar. O restante do PRD pode seguir com as premissas deste documento.

| # | Pendência | Impacto |
| --- | --- | --- |
| P1 | URL do domínio e acesso ao painel DNS / provedor | Publicar no endereço definitivo |
| P2 | Arquivo da logo em boa resolução (PNG/SVG, versões clara e escura se existirem) | Header, favicon, Open Graph |
| P3 | Texto de **Sobre Nós** (proposta, objetivos, pessoas e fotos da equipe) | Conteúdo da página `/sobre` |
| P4 | Lista inicial de **apoiadores** (nome, logo, site) | Bloco e página de apoiadores |
| P5 | Confirmar categorias: Legislativo, Judiciário, Política, Institucional — ou outra lista | Taxonomia das notícias |
| P6 | Nomes da equipe interna que terá login no CMS (1 a 3 e-mails) | Acessos Sanity |
| P7 | Google Analytics no lançamento? Sim / não | Cookies, privacidade, RNF-12 |
| P8 | Outras redes além do Instagram? | Ícones no footer |
| P9 | Nomenclatura final: confirmar **Apoiadores Institucionais** (vs. Parceiros Institucionais) | Rótulos da UI |
| P10 | Textos jurídicos de Privacidade e Termos (ou autorização para placeholder até um advogado revisar) | Páginas legais |

---

## 14. Glossário rápido

| Termo | Significado neste projeto |
| --- | --- |
| Notícia | Conteúdo factual/informativo da equipe, ligado ao cenário político, jurídico e legislativo (inclusive temas que também circulam no Instagram) |
| Artigo | Conteúdo aprofundado ou opinativo, com autor/colunista identificado |
| Colunista / autor | Profissional ou autoridade convidada; não opera o CMS na v1 |
| CMS | Painel onde a equipe publica (Sanity) |
| Apoiador institucional | Marca exposta por apoio ao projeto, sem formato de anúncio |
| v1 | Primeira entrega pública do portal, limitada a este documento |

---

## 15. Histórico

| Versão | Data | Notas |
| --- | --- | --- |
| 1.0 | 2026-09-03 | Primeira versão a partir do briefing da cliente, da logo, do Instagram e das referências JOTA e Eixo Político. Decisões: Next.js + Sanity; publicação só pela equipe interna; busca na v1; custo mínimo. |
