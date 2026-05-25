# arquivo: SPRINT_05_HUD_JOGO_UI_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 05 — HUD_JOGO_UI
- **objetivo da sprint original:** Implementar a HUD do gameplay contendo contador de criaturas, barra de tempo e 4 botões de habilidades.
- **arquivo de origem:** `/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 05 - HUD_JOGO_UI/SPRINT_05_HUD_JOGO_UI.md`
- **resumo do escopo:** Criar container HUD fixo na parte superior com contador de criaturas (texto "x5"), barra de tempo horizontal (100% inicial, cor primária #1D4ED8) e 4 botões de habilidade (escavar, construir, bloquear, empurrar) com bordas arredondadas de 8px e sombra leve. Dados mockados, sem conectar lógica de tempo real ou ações de habilidades.

## Análise da Sprint

### Objetivo da sprint

Criar a HUD visual do gameplay com contador de criaturas, barra de tempo e 4 botões de habilidade, usando tokens de estilo existentes e placeholders visuais — sem integrar lógica de jogo real.

### Impacto UI/UX da sprint

Classificação: **Sim**.

Justificativa: A sprint cria uma HUD inteira com componentes visuais (barra de tempo, botões de habilidade, contador, container fixo), cores, tipografia, sombras e responsividade — todos impactam diretamente a experiência do jogador.

Todas as tarefas com impacto visual direto devem obrigatoriamente:
- ler `docs/design/UI_UX_GUIDE.md`;
- seguir os tokens de estilo definidos em `src/ui/theme.ts`;
- validar em mobile (375×667) e desktop (1280×720);
- evitar aparência genérica de IA (sem gradientes chamativos, cards decorativos, textos de marketing);
- prever estados de loading, erro e vazio quando aplicável;
- respeitar a regra "não usar cor como único indicador de estado" (seção 4.2 do guia).

### Escopo identificado

- Container HUD fixo na parte superior da tela (`position: fixed`, `top: 0`)
- Contador de criaturas: texto "x5" ou "5" mockado
- Barra de tempo horizontal que ocupa 100% da largura inicialmente, na cor primária (#1D4ED8)
- 4 botões de habilidade com placeholder visual (texto ou emoji, sem PNG externo)
- Botões com raio `borderRadius.button` (8px) e `shadow.button` (leve)
- Layout horizontal dos botões na parte inferior da HUD
- Dados mockados (hardcoded), sem lógica de tempo real ou ações
- Seguir obrigatoriamente `docs/design/UI_UX_GUIDE.md`

### Fora do escopo

- Não conectar timer real (contagem regressiva)
- Não conectar botões a habilidades ou ações de jogo
- Não integrar com tela de gameplay (Sprint 06)
- Não gerar arquivos PNG/ícones de habilidade
- Não adicionar dependências externas (sem ícones de bibliotecas)
- Não modificar `src/core/` (interfaces de dados)
- Não modificar `src/ui/theme.ts`
- Não modificar ou remover componentes existentes (MenuScreen, LevelSelectionScreen, LevelItem, Button)
- Não criar animações complexas (hover simples permitido)

### Dependências entre partes

- O componente HUD (Tarefa 5) depende do TimerBar (Tarefa 3) e SkillButton (Tarefa 4)
- Tarefas 3 e 4 podem ser executadas em paralelo (não dependem uma da outra)
- A validação final (Tarefa 6) depende de todas as tarefas anteriores
- Tarefas 1 e 2 (leitura) podem ser executadas isoladamente, em paralelo

### Riscos principais

- Botões de habilidade podem ficar muito próximos ou ultrapassar a largura da tela em mobile — usar flex com wrap ou grid
- Container HUD fixo pode sobrepor conteúdo da tela de gameplay — definir z-index adequado
- Barra de tempo com texto sobreposto pode perder contraste — garantir contraste adequado
- Aparência genérica de IA se HUD for super-estilizada sem função

### Estratégia de quebra

Quebrar em 6 tarefas sequenciais, onde as tarefas de componente (3 e 4) são independentes entre si:

1. **Mapeamento** — reconhecer a codebase pós-Sprint 04 e confirmar tokens disponíveis
2. **Leitura do guia** — extrair regras específicas de cores, botões e tipografia para HUD
3. **TimerBar** — criar componente de barra de tempo horizontal com cor primária
4. **SkillButton** — criar componente de botão de habilidade com placeholder visual
5. **HUD** — criar container HUD integrando TimerBar, SkillButtons e contador de criaturas
6. **Validação final** — typecheck, build, lint, visual mobile/desktop

---

# Tarefas da Sprint

## Tarefa 1 — Mapear estado atual da codebase e componentes disponíveis

### Objetivo

Inspecionar a codebase para verificar se os componentes e tokens de estilo criados nas Sprints 03 e 04 estão disponíveis e funcionais, e confirmar que `src/ui/theme.ts` já possui as constantes necessárias para a HUD (cores primary, background, textPrimary, textMuted; espaçamentos xs, sm, md, lg; borderRadius.button; shadow.button; fontSize.label, button, body; fontWeight.medium, semibold).

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: A tarefa é apenas de levantamento — nenhum arquivo é alterado ou criado.

### Pré-requisitos

- Sprint 04 concluída (LevelItem, LevelSelectionScreen, dados mockados criados)
- Acesso ao repositório do projeto

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/theme.ts`
- `/mnt/c/Dev/lemmings-style-game/src/ui/Button.tsx`
- `/mnt/c/Dev/lemmings-style-game/src/ui/LevelItem.tsx` (referência de padrão)
- `/mnt/c/Dev/lemmings-style-game/src/ui/LevelSelectionScreen.tsx` (referência de padrão)
- `/mnt/c/Dev/lemmings-style-game/src/App.tsx`
- `/mnt/c/Dev/lemmings-style-game/package.json`

### Passos

1. Navegar até a raiz do projeto
2. Ler `src/ui/theme.ts` e confirmar que `colors.primary`, `colors.primaryHover`, `colors.background`, `colors.textPrimary`, `colors.textMuted`, `spacing.xs` (8), `spacing.sm` (12), `spacing.md` (16), `spacing.lg` (24), `borderRadius.button` (8), `shadow.button`, `fontSize.button` (14), `fontSize.label` (14), `fontSize.body` (15), `fontWeight.medium` (500), `fontWeight.semibold` (600) existem
3. Verificar se `src/ui/HUD.tsx`, `src/ui/TimerBar.tsx`, `src/ui/SkillButton.tsx` NÃO existem ainda
4. Executar `npx tsc --noEmit` para confirmar que o projeto compila sem erros
5. Executar `npm run build` para confirmar que o build funciona
6. Documentar brevemente o cenário encontrado
7. **Não alterar nenhum arquivo**

### Critérios de aceite

- Todos os tokens necessários para a sprint foram confirmados no `theme.ts`
- Projeto compila sem erros (typecheck e build)
- Nenhum arquivo foi alterado

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npx tsc --noEmit 2>&1
npm run build 2>&1
```

### Riscos

- Se a Sprint 04 não estiver concluída (falta de componentes ou tokens), esta tarefa identificará e reportará o bloqueio

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não instalar dependências

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inspecione a codebase para confirmar que `src/ui/theme.ts` contém os tokens `colors.primary`, `colors.primaryHover`, `colors.background`, `colors.textPrimary`, `colors.textMuted`, `spacing.xs` (8), `spacing.sm` (12), `spacing.md` (16), `spacing.lg` (24), `borderRadius.button` (8), `shadow.button`, `fontSize.button`, `fontSize.label`, `fontSize.body`, `fontWeight.medium`, `fontWeight.semibold`. Verifique se `src/ui/HUD.tsx`, `src/ui/TimerBar.tsx` e `src/ui/SkillButton.tsx` NÃO existem. Execute `npx tsc --noEmit` e `npm run build` para confirmar que o projeto compila. Não altere nenhum arquivo.

---

## Tarefa 2 — Extrair regras do UI_UX_GUIDE.md para a HUD de gameplay

### Objetivo

Ler `docs/design/UI_UX_GUIDE.md` e extrair especificamente as regras de cores (seção 4.2, especialmente primária #1D4ED8), tipografia (4.3), espaçamento (4.4), bordas/cantos (4.5, especialmente botões), responsividade (7) e padrões proibidos (10) que serão aplicadas na HUD, barra de tempo e botões de habilidade.

### Tipo da tarefa

documentação

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: A leitura do guia não altera a interface, mas fornece as regras que orientarão as tarefas de componente visual (TimerBar, SkillButton, HUD). Sem essa extração o coder pode aplicar cores, raios ou espaçamentos incorretos.

### Pré-requisitos

- Arquivo `docs/design/UI_UX_GUIDE.md` deve existir

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md`

### Passos

1. Ler as seções indicadas do guia:
   - 4.1 Layout
   - 4.2 Cores (atenção à primária #1D4ED8 e regra "não usar cor como único indicador de estado")
   - 4.3 Tipografia (escala de corpo, label, botão)
   - 4.4 Espaçamento
   - 4.5 Bordas, sombras e cantos (botões: raio 8-10px, sombra leve ou nenhuma)
   - 7 Responsividade
   - 8 Microcopy
   - 10 Padrões proibidos
2. Extrair regras específicas para a HUD:
   - Cor da barra de tempo: `#1D4ED8` (primary)
   - Cor do texto do contador: `#0F172A` (textPrimary) ou `#475569` (textSecondary)
   - Raio dos botões de habilidade: `borderRadius.button` (8px)
   - Sombra: `shadow.button` (leve)
   - Tamanho do texto dos botões: `fontSize.button` (14px)
   - Tamanho do contador: `fontSize.body` (15px) ou maior para destaque
   - Regra "não usar cor como único indicador de estado"
3. **Não alterar nenhum arquivo** — apenas documentar mentalmente para uso nas tarefas seguintes

### Critérios de aceite

- As regras extraídas cobrem cores da barra e botões, tipografia do contador, espaçamento entre elementos da HUD e responsividade
- O coder sabe que deve usar tokens do `theme.ts` em vez de valores hardcoded
- Nenhum arquivo foi alterado

### Como validar

```bash
cat /mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md
```

### Riscos

- Pular a regra de contraste pode tornar o texto do contador ilegível
- Usar tokens errados (ex.: borderRadius.card em vez de borderRadius.button)

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não copiar trechos do guia para outros arquivos

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: leia `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md` e extraia as regras de cores (4.2), tipografia (4.3), espaçamento (4.4), bordas/botões (4.5), responsividade (7) e padrões proibidos (10). Foque no que for relevante para uma HUD de gameplay: barra de tempo (cor primária #1D4ED8), botões de habilidade (raio 8px, sombra leve) e contador de criaturas (tipografia legível). Não altere nenhum arquivo.

---

## Tarefa 3 — Criar componente TimerBar (barra de tempo horizontal)

### Objetivo

Criar o componente `TimerBar` que renderiza uma barra horizontal representando o tempo restante. Inicialmente deve ocupar 100% da largura do container, na cor primária (#1D4ED8). Aceitará uma prop `porcentagem: number` (0–100) para controle futuro da largura. Exibirá opcionalmente o texto do tempo (ex.: "60s") sobreposto ou ao lado.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação de um componente visual (barra horizontal com cor e texto) usado diretamente na HUD do gameplay. A cor, altura, contraste do texto e comportamento responsivo afetam a experiência do jogador.

Requisitos obrigatórios:
- deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- deve validar mobile e desktop
- deve evitar aparência genérica de IA
- deve ter fundo que contraste com a barra preenchida

### Pré-requisitos

- Tarefa 1 concluída (tokens confirmados)
- Tarefa 2 concluída (regras extraídas)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/TimerBar.tsx` (novo)

### Passos

1. Criar o arquivo `src/ui/TimerBar.tsx`
2. Importar `colors`, `spacing`, `borderRadius`, `fontSize`, `fontWeight` de `./theme`
3. Definir a interface de props (se externa) ou inline:
   - `porcentagem: number` — valor entre 0 e 100
   - `tempoRestante?: number` — opcional, exibe texto "Xs" (ex.: "60s")
4. Estruturar o componente:
   - Container externo (track): fundo `colors.border` (#E2E8F0) ou fundo claro, ocupando 100% da largura
   - Altura: 8–12px (constante do componente, não precisa de token)
   - Raio: `borderRadius.button` (8px) para cantos arredondados
   - Overflow hidden
5. Barra interna (fill):
   - Largura: `porcentagem`% (inicialmente 100)
   - Fundo: `colors.primary` (#1D4ED8)
   - Transição suave: `transition: 'width 0.3s ease'`
6. Texto opcional do tempo:
   - Exibir "60s" dentro ou próximo à barra, usando `fontSize.helper` (13px) ou `fontSize.label` (14px)
   - Cor: `colors.textPrimary` ou branco dependendo do contraste
   - Posicionamento: centralizado ou à direita
7. Garantir que o componente funcione tanto em container estreito (mobile) quanto largo (desktop)
8. Exportar o componente

### Critérios de aceite

- Componente `TimerBar` renderiza corretamente com prop `porcentagem`
- Barra preenchida em 100% inicialmente, na cor `colors.primary`
- Track de fundo visível (contraste entre barra e fundo)
- Altura consistente (8–12px)
- Texto "60s" visível e legível
- Tipo `porcentagem` aceita valores 0–100 sem quebrar
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Teste visual: montar o componente em App.tsx temporariamente com porcentagem=100, porcentagem=50, porcentagem=0.

### Riscos

- Texto do tempo pode ficar ilegível se a barra estiver quase vazia (fundo claro + texto claro)
- Altura da barra pode ser inconsistente com outros elementos da HUD

### O que NÃO alterar

- Não modificar `theme.ts`
- Não modificar arquivos de outras tarefas
- Não adicionar dependências externas
- Não adicionar lógica de timer (setInterval, setTimeout)

### Reversibilidade

Remover o arquivo `src/ui/TimerBar.tsx`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `TimerBar` em `src/ui/TimerBar.tsx`. Deve aceitar `porcentagem: number` (0–100) como prop e exibir uma barra horizontal. Track: fundo `colors.border`, altura 10px, borderRadius 8px, overflow hidden. Fill: largura = porcentagem%, fundo `colors.primary`, transição suave. Opcional: texto "60s" centralizado ou à direita usando `fontSize.helper`. Use tokens de `./theme`. Não adicione lógica de timer. Valide com `npx tsc --noEmit`.

---

## Tarefa 4 — Criar componente SkillButton (botão de habilidade)

### Objetivo

Criar o componente `SkillButton` que representa visualmente um botão de habilidade na HUD. Deve exibir o nome da habilidade (ou placeholder visual) e estar disponível para receber cores/estados futuros. Usar tokens de estilo existentes: `borderRadius.button` (8px), `shadow.button`, `colors.primary` para destaque.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação de um componente visual de botão usado na HUD, com cor, raio, sombra, texto e hover state. O layout e a proporção dos botões impactam a usabilidade em mobile.

Requisitos obrigatórios:
- deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- deve validar mobile e desktop (espaçamento entre botões)
- deve evitar aparência genérica de IA
- botões devem ter área de toque confortável (min 44px)

### Pré-requisitos

- Tarefa 1 concluída (tokens confirmados)
- Tarefa 2 concluída (regras extraídas)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/SkillButton.tsx` (novo)

### Passos

1. Criar o arquivo `src/ui/SkillButton.tsx`
2. Importar `colors`, `spacing`, `borderRadius`, `fontSize`, `fontWeight`, `shadow` de `./theme`
3. Definir a interface de props:
   - `nome: string` — nome da habilidade (ex.: "Escavar")
   - `ativo?: boolean` — opcional, se a habilidade está disponível (default: true)
   - `onClick?: () => void` — opcional, sem lógica real
4. Estruturar o componente como um botão (elemento `<button>`):
   - Largura/altura proporcionais (ex.: 56×56px ou flexível com padding)
   - Raio: `borderRadius.button` (8px)
   - Fundo: `colors.surface` (#FFFFFF)
   - Borda: `1px solid colors.border` (#E2E8F0)
   - Sombra: `shadow.button`
   - Padding interno: `spacing.xs` (8px)
5. Placeholder visual da habilidade:
   - Exibir a primeira letra do nome ou emoji simples (⛏ 🧱 🔒 ➡️) como placeholder — sem PNG externo
   - Usar `fontSize.body` (15px) ou maior para o placeholder
   - Cor do texto: `colors.primary` (#1D4ED8)
6. Nome da habilidade:
   - Exibir abaixo do placeholder, em `fontSize.helper` (13px)
   - Cor: `colors.textSecondary` (#475569)
7. Estado `ativo === false`:
   - Opacidade reduzida (0.5) + cursor not-allowed
   - Texto em `colors.textMuted`
8. Hover (opcional, mas desejável):
   - Fundo mais escuro: `colors.primaryHover` ou `#F1F5F9` dependendo do estado
9. Exportar o componente

### Critérios de aceite

- Componente `SkillButton` renderiza com props `nome` e `ativo`
- Placeholder visual visível (emoji/letra + nome)
- Raio 8px, sombra leve, borda sutil
- Área de toque mínima de 44×44px
- Estado inativo com opacidade reduzida
- Hover state funcional
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Teste visual: montar 4 instâncias lado a lado em App.tsx temporariamente para verificar espaçamento.

### Riscos

- Botões podem ficar muito pequenos em mobile se tamanho fixo for insuficiente
- Placeholder com emoji pode renderizar diferente em cada plataforma (texto é mais seguro)
- Muitos botões lado a lado podem ultrapassar a largura da tela

### O que NÃO alterar

- Não modificar `theme.ts`
- Não modificar `Button.tsx` (componente existente)
- Não adicionar dependências externas
- Não usar PNG/SVG externos para ícones (apenas texto/emoji)

### Reversibilidade

Remover o arquivo `src/ui/SkillButton.tsx`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `SkillButton` em `src/ui/SkillButton.tsx`. Props: `nome: string`, `ativo?: boolean` (default true), `onClick?: () => void`. Renderize um botão quadrado (~56px) com raio `borderRadius.button` (8px), `shadow.button`, borda sutil. Exiba o primeiro caractere ou emoji simples como placeholder visual (ex.: E/Escavar, C/Construir) com `fontSize.body` em `colors.primary`, e o nome abaixo em `fontSize.helper` cor `colors.textSecondary`. Estado inativo: opacidade 0.5 + cursor not-allowed. Valide com `npx tsc --noEmit`.

---

## Tarefa 5 — Criar HUD container com contador de criaturas

### Objetivo

Criar o componente `HUD` que é o container principal da HUD de gameplay, fixo na parte superior da tela. Deve integrar o `TimerBar`, 4 instâncias de `SkillButton` e exibir o contador de criaturas. Usar dados mockados (hardcoded). Não conectar lógica de jogo.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação do container principal da HUD com posicionamento fixo, integração de múltiplos componentes visuais, layout responsivo, contador visível e organização dos botões. Impacta diretamente a experiência de jogo.

Requisitos obrigatórios:
- deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- deve validar mobile e desktop
- deve evitar aparência genérica de IA
- deve ter z-index adequado para não sobrepor conteúdo de forma incorreta

### Pré-requisitos

- Tarefa 3 concluída (TimerBar disponível)
- Tarefa 4 concluída (SkillButton disponível)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/HUD.tsx` (novo)

### Passos

1. Criar o arquivo `src/ui/HUD.tsx`
2. Importar `colors`, `spacing`, `fontSize`, `fontWeight`, `shadow` de `./theme`
3. Importar `TimerBar` de `./TimerBar`
4. Importar `SkillButton` de `./SkillButton`
5. Estruturar o layout da HUD:
   - Container principal: `position: fixed`, `top: 0`, `left: 0`, `right: 0`
   - `z-index: 100` (suficiente para ficar acima do conteúdo do jogo)
   - Fundo: `colors.surface` (#FFFFFF) com opacidade 0.95 ou fundo semi-transparente
   - Sombra inferior: `shadow.card` ou sombra leve para separar da tela
   - Padding: `spacing.md` (16px) nas laterais, `spacing.sm` (12px) vertical
6. Linha superior (informações):
   - Lado esquerdo: contador de criaturas "x5" com `fontSize.body` (15px) e `fontWeight.semibold`
   - Lado direito: texto opcional (ex.: "Nível 1") usando `fontSize.helper`
   - Disposição: flex com `justifyContent: 'space-between'`
7. Barra de tempo:
   - Abaixo das informações, com `marginTop: spacing.sm` (12px)
   - Passar `porcentagem={100}` (mockado)
   - Exibir "60s" via TimerBar
8. Botões de habilidade:
   - Abaixo da barra de tempo, com `marginTop: spacing.md` (16px)
   - Layout horizontal: `display: flex`, `gap: spacing.sm` (12px)
   - 4 instâncias: `Escavar`, `Construir`, `Bloquear`, `Empurrar`
   - Permitir wrap em mobile se necessário
9. Garantir que o container não ultrapasse a largura da tela (overflow hidden)
10. Exportar o componente

### Critérios de aceite

- HUD renderiza fixa no topo da tela
- Contador "x5" visível no canto superior esquerdo
- TimerBar visível abaixo das informações, com 100% preenchido
- 4 botões de habilidade visíveis em layout horizontal
- Botões com espaçamento adequado entre si
- HUD não quebra em mobile (sem rolagem horizontal)
- Fundo semi-transparente ou sólido com sombra
- z-index adequado (100+)
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Teste visual: montar o componente HUD no App.tsx temporariamente e verificar em viewport mobile (375×667) e desktop (1280×720).

### Riscos

- HUD fixa pode cobrir conteúdo futuro da tela de gameplay — z-index e padding devem ser testados
- Botões podem ficar apertados em mobile se a tela for muito estreita — testar com 4 botões lado a lado
- Contraste entre texto e fundo semi-transparente pode ser baixo

### O que NÃO alterar

- Não modificar `TimerBar.tsx` ou `SkillButton.tsx` nesta tarefa (se precisar ajustar, pare e registre)
- Não modificar `theme.ts`
- Não adicionar lógica de jogo (timer, ações, contagem real)
- Não modificar `App.tsx` permanentemente (pode alterar temporariamente para teste, deve reverter)

### Reversibilidade

Remover o arquivo `src/ui/HUD.tsx`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `HUD` em `src/ui/HUD.tsx`. Container fixo no topo (position: fixed, top:0, left:0, right:0, z-index:100, fundo branco semi-transparente, shadow.card). Exiba: contador "x5" (esquerda), TimerBar com porcentagem=100, 4 SkillButtons (Escavar, Construir, Bloquear, Empurrar) em linha com gap spacing.sm. Use dados mockados. Importe TimerBar de ./TimerBar e SkillButton de ./SkillButton. Valide com `npx tsc --noEmit`.

---

## Tarefa 6 — Validar compilação, lint, build e verificação visual mobile/desktop

### Objetivo

Executar a validação completa da sprint: compilação TypeScript, lint, build e verificação visual da HUD em mobile e desktop.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Tarefa de validação técnica e visual — nenhum arquivo é alterado.

### Pré-requisitos

- Todas as tarefas 1 a 5 concluídas
- Arquivos criados: `TimerBar.tsx`, `SkillButton.tsx`, `HUD.tsx`
- `HUD` montada no `App.tsx` para visualização (trocar `<MenuScreen />` por `<HUD />` temporariamente)

### Arquivos prováveis

- Todos os arquivos criados nas tarefas anteriores
- `src/App.tsx` (para montar a HUD temporariamente)

### Passos

1. Executar `npx tsc --noEmit` — verificar zero erros
2. Executar `npm run lint` — verificar sem novos erros (placeholder, aceitar)
3. Executar `npm run build` — verificar build bem-sucedido
4. Iniciar servidor dev (`npm run dev`) e abrir em:
   - Viewport mobile (375×667): HUD ocupa toda a largura, botões visíveis sem quebra, contador legível
   - Viewport desktop (1280×720): HUD centralizada ou ocupando largura proporcional, botões espaçados
5. Verificar estados visuais:
   - TimerBar: 100% preenchido, cor primária, texto "60s" visível
   - 4 botões: visíveis, com placeholder e nome, espaçamento adequado
   - Contador: "x5" visível e legível
6. Verificar que todos os tokens seguem o tema
7. Reverter `App.tsx` ao estado original (MenuScreen) se foi alterado para teste
8. Verificar que nenhum arquivo fora do escopo foi alterado

### Critérios de aceite

- `npx tsc --noEmit` → zero erros
- `npm run lint` → zero novos erros
- `npm run build` → build bem-sucedido
- Visual mobile (375×667): HUD sem quebras, botões com área de toque suficiente
- Visual desktop (1280×720): layout proporcional, sem esticamento
- TimerBar, SkillButtons e contador renderizam corretamente
- Nenhum arquivo fora de `src/ui/` foi alterado (exceto App.tsx se usado para teste)
- App.tsx revertido ao estado original (MenuScreen)

### Como validar

```bash
npx tsc --noEmit 2>&1
npm run lint 2>&1
npm run build 2>&1
```

Para validação visual: abrir o servidor dev e inspecionar em viewports mobile e desktop.

### Riscos

- Lint pode não estar configurado (placeholder) — registrar mas não bloquear
- Se App.tsx foi alterado para teste, deve ser revertido antes da conclusão
- Diferenças de renderização entre navegadores podem afetar botões

### O que NÃO alterar

- Não alterar nenhum arquivo durante a validação
- Não corrigir problemas não relacionados ao escopo da sprint
- Não adicionar novos recursos durante a validação

### Reversibilidade

Reverter App.tsx ao estado original se foi alterado. Tarefa de validação apenas.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide todo o sprint da HUD de gameplay. Rode `npx tsc --noEmit`, `npm run lint` e `npm run build`. Monte temporariamente `<HUD />` no `App.tsx` para testar visualmente em mobile (375×667) e desktop (1280×720). Verifique TimerBar (100%, cor primária), SkillButtons (4 botões visíveis) e contador "x5". Reverta `App.tsx` ao original (MenuScreen) após o teste. Confirme que nenhum arquivo fora de `src/ui/` foi alterado. Não modifique nenhum arquivo durante a validação.

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode ser isolada? | Checkpoint |
|-------|--------|-----------|-------------------|------------|
| 1 | Tarefa 1 (mapeamento) | — | Sim | Commit após Tarefa 1 (documentação do estado) |
| 2 | Tarefa 2 (leitura do guia) | — | Sim, paralelo à Tarefa 1 | Commit após Tarefa 2 (leitura concluída) |
| 3 | Tarefa 3 (TimerBar) | Tarefa 1 | Sim (não depende da Tarefa 4) | Commit após Tarefa 3 (componente criado) |
| 4 | Tarefa 4 (SkillButton) | Tarefa 1 | Sim (não depende da Tarefa 3) | Commit após Tarefa 4 (componente criado) |
| 5 | Tarefa 5 (HUD) | Tarefas 3 e 4 | Não (precisa dos dois componentes) | Commit após Tarefa 5 (HUD criada) |
| 6 | Tarefa 6 (validação) | Todas | Não | Commit final da sprint |

**Observações:**
- Tarefas 1 e 2 podem ser executadas em paralelo
- Tarefas 3 e 4 são independentes e podem ser executadas em paralelo
- Recomenda-se fazer commit após cada tarefa (diff pequeno e reversível)
- A montagem temporária no App.tsx para validação visual é permitida, mas deve ser revertida
- A auditoria UI/UX deve ser feita na Tarefa 6 (validação visual)

# Checklist final da sprint

- [ ] Tarefa 1 — Mapeamento concluído e documentado
- [ ] Tarefa 2 — UI_UX_GUIDE.md lido e regras extraídas
- [ ] Tarefa 3 — Componente TimerBar criado em `src/ui/TimerBar.tsx`
- [ ] Tarefa 4 — Componente SkillButton criado em `src/ui/SkillButton.tsx`
- [ ] Tarefa 5 — HUD criada em `src/ui/HUD.tsx`
- [ ] Tarefa 6 — Validação completa:
  - [ ] `npx tsc --noEmit` passou
  - [ ] `npm run lint` passou (ou sem novos erros)
  - [ ] `npm run build` passou
  - [ ] Visual mobile (375×667): HUD sem quebras, botões com área de toque
  - [ ] Visual desktop (1280×720): layout proporcional
  - [ ] TimerBar: 100% preenchido, cor primária, texto do tempo visível
  - [ ] SkillButtons: 4 botões visíveis com placeholder e nome
  - [ ] Contador "x5" legível
  - [ ] Nenhum arquivo fora de `src/ui/` alterado (exceto App.tsx para teste, revertido)
  - [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas (Sim / Não / Indireto / Não aplicável)
- [ ] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (3, 4 e 5)

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint exige modelo mais forte. Todas são implementações de componentes visuais com tokens de estilo definidos, placeholders de texto/emoji, dados mockados e sem integração de lógica de jogo, autenticação, banco de dados ou refatoração ampla. Modelo econômico é suficiente para todas as tarefas.
