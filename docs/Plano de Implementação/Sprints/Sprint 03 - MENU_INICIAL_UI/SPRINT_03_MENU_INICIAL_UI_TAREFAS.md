# arquivo: SPRINT_03_MENU_INICIAL_UI_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 03 — MENU_INICIAL_UI
- **objetivo da sprint original:** Implementar a tela de menu inicial com botões Jogar e Opções seguindo UI_UX_GUIDE.
- **arquivo de origem:** `/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 03 - MENU_INICIAL_UI/SPRINT_03_MENU_INICIAL_UI.md`
- **resumo do escopo:** Criar o componente visual da tela de menu inicial (botões Jogar e Opções), aplicar cores primária #1D4ED8 e secundária #475569, usar raio 8‑10px e sombra leve nos botões. Não conectar a lógica de jogo nem criar animações avançadas.

## Análise da Sprint

### Objetivo da sprint

Criar a tela de menu inicial do jogo com dois botões estilizados (Jogar, Opções), seguindo fielmente o `UI_UX_GUIDE.md` e sem conectar funcionalidades de jogo.

### Impacto UI/UX da sprint

Classificação: **Sim**.

Justificativa: A sprint cria uma tela do zero (componente visual, botões, layout, cores, tipografia, espaçamento). Toda decisão visual impacta diretamente a experiência do usuário.

Todas as tarefas com impacto direto devem obrigatoriamente:

- ler `docs/design/UI_UX_GUIDE.md`;
- seguir as regras de cores, botões, tipografia e espaçamento;
- validar em mobile e desktop;
- evitar aparência genérica de IA;
- prever carregamento e estado vazio quando aplicável.

### Escopo identificado

- Criar componente/tela de menu inicial
- Adicionar botão **Jogar** com cor primária `#1D4ED8`
- Adicionar botão **Opções** com cor secundária `#475569`
- Aplicar raio de borda 8‑10px nos botões
- Aplicar sombra leve nos botões
- Manter layout centralizado (coluna flexível)
- Seguir cores e regras do `UI_UX_GUIDE.md`

### Fora do escopo

- Não criar animações avançadas
- Não criar tela de Opções detalhada (apenas o botão)
- Não conectar botões a funcionalidades de jogo ou navegação real
- Não adicionar imagens, ícones ou sprites decorativos
- Não modificar arquivos de `src/core/` (interfaces de dados)

### Dependências entre partes

- O componente de menu depende da existência de um arquivo de tema/cores com as variáveis definidas (Tarefa 3)
- A validação final (Tarefa 7) depende de todas as tarefas anteriores
- Tarefa 1 (mapeamento) pode ser executada isoladamente a qualquer momento
- Tarefa 2 (leitura do guia) pode ser executada em paralelo com a Tarefa 1

### Riscos principais

- A tecnologia de renderização (React, Godot, Cocos2d‑x) ainda não está definida no projeto — o coder precisará confirmar durante a Tarefa 1
- Cores ou estilos fora do UI_UX_GUIDE podem ser aplicados inadvertidamente
- Layout pode não se adaptar a mobile se a responsividade não for considerada desde o início
- Aparência genérica de IA se estilos forem copiados de templates comuns

### Estratégia de quebra

Quebrar em 7 tarefas pequenas e seguras:

1. **Mapeamento** — entender a estrutura do projeto e a tecnologia de UI disponível (sem alterar nada)
2. **Leitura do guia** — extrair regras específicas para o menu
3. **Tema/cores** — criar o arquivo de tokens de estilo que todos os componentes usarão
4. **Container do menu** — criar a estrutura e layout base (sem botões)
5. **Botão Jogar** — adicionar o botão primário com cor e texto
6. **Botão Opções** — adicionar o botão secundário
7. **Validação final** — compilação, lint, verificação visual mobile/desktop

---

# Tarefas da Sprint

## Tarefa 1 — Mapear estrutura do projeto e tecnologia de UI

### Objetivo

Inspecionar a codebase para determinar qual tecnologia de renderização/UI está disponível (React, Godot, Cocos2d‑x, HTML puro, etc.), confirmar a estrutura de pastas real e verificar se há dependências de UI instaladas ou se será necessário instalá-las.

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: A tarefa é apenas de levantamento e diagnóstico — nenhum arquivo é alterado ou criado.

### Pré-requisitos

- Acesso ao repositório do projeto
- `package.json` e `tsconfig.json` já existentes (criados em sprints anteriores)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/package.json`
- `/mnt/c/Dev/lemmings-style-game/tsconfig.json`
- `/mnt/c/Dev/lemmings-style-game/src/`
- `/mnt/c/Dev/lemmings-style-game/src/ui/` (pode ou não existir)
- `/mnt/c/Dev/lemmings-style-game/docs/PRD/PRD_CONSOLIDADO.md`

**Nota:** Os caminhos exatos devem ser confirmados pelo coder durante a execução. A pasta `src/ui/` pode não existir ainda.

### Passos

1. Navegar até a raiz do projeto (`/mnt/c/Dev/lemmings-style-game/`)
2. Ler `package.json` para verificar dependências e scripts existentes
3. Listar o conteúdo de `src/` para verificar a estrutura atual
4. Verificar se `src/ui/` existe; se não, anotar que precisará ser criada
5. Verificar se há alguma engine/framework instalado (React, Vue, Godot export config, etc.)
6. Documentar brevemente o cenário encontrado (tecnologia, dependências, estrutura)
7. **Não alterar nenhum arquivo**

### Critérios de aceite

- A tecnologia de UI foi identificada (ex.: "projeto usa TypeScript puro, sem framework de UI instalado" ou "existe React 18 com react-dom")
- A estrutura de pastas foi documentada em 1‑2 frases
- Nenhum arquivo foi alterado

### Como validar

```bash
ls -la /mnt/c/Dev/lemmings-style-game/src/
cat /mnt/c/Dev/lemmings-style-game/package.json
ls /mnt/c/Dev/lemmings-style-game/src/ui/ 2>&1
```

### Riscos

- A engine ainda não foi decidida (PRD marca como ponto de decisão). O coder pode encontrar um projeto híbrido ou indefinido — nesse caso, deve reportar e assumir a abordagem mais coerente com o que já existe (TypeScript + HTML/Canvas ou React, por exemplo)

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não instalar dependências nesta tarefa

### Reversibilidade

A tarefa é apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inspecione a codebase do projeto em `/mnt/c/Dev/lemmings-style-game/` para identificar qual tecnologia de UI está disponível (React, Godot, Cocos2d‑x, etc.). Leia `package.json`, `tsconfig.json` e liste `src/`. Verifique se `src/ui/` existe. Não altere nenhum arquivo. Reporte o cenário encontrado em 2‑3 frases.

---

## Tarefa 2 — Ler UI_UX_GUIDE.md e extrair regras relevantes para o menu

### Objetivo

Ler `docs/design/UI_UX_GUIDE.md` e extrair especificamente as regras de cores (seção 4.2), botões (seção 5.1), tipografia (seção 4.3), espaçamento (seção 4.4), bordas e cantos (seção 4.5), e responsividade (seção 7) que serão aplicadas no menu inicial.

### Tipo da tarefa

documentação

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: A leitura do guia não altera a interface, mas fornece as regras que orientarão as tarefas seguintes. Sem essa extração, o coder pode aplicar estilos incorretos.

### Pré-requisitos

- Arquivo `docs/design/UI_UX_GUIDE.md` deve existir

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md`

### Passos

1. Ler as seções indicadas do guia:
   - 4.1 Layout
   - 4.2 Cores
   - 4.3 Tipografia
   - 4.4 Espaçamento
   - 4.5 Bordas, sombras e cantos
   - 5.1 Botões
   - 7 Responsividade
   - 8 Microcopy
   - 10 Padrões proibidos
2. Extrair as regras que se aplicam ao menu inicial:
   - Paleta de cores (primária `#1D4ED8`, secundária `#475569`, fundo `#F8FAFC`, texto `#0F172A`)
   - Raio de botão: 8‑10px
   - Sombra: leve ou nenhuma
   - Escala de espaçamento: usar valores consistentes (16px, 24px, 32px)
   - Tamanho de botão: 14‑15px, peso 500‑600
   - Regra de "aparência genérica de IA" a evitar
3. **Não alterar nenhum arquivo** — apenas documentar mentalmente para uso nas tarefas seguintes

### Critérios de aceite

- As regras extraídas cobrem cores, botões, tipografia, espaçamento e responsividade
- O coder consegue responder perguntas como "qual cor usar no botão primário?" sem consultar o guia novamente
- Nenhum arquivo foi alterado

### Como validar

```bash
cat /mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md
```

### Riscos

- Pular seções importantes do guia pode resultar em estilos inconsistentes
- Interpretação incorreta das regras

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não copiar trechos do guia para outros arquivos (a referência será usada diretamente)

### Reversibilidade

A tarefa é apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: leia `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md` e extraia as regras de cores (seção 4.2), botões (5.1), tipografia (4.3), espaçamento (4.4), bordas e cantos (4.5), responsividade (7) e padrões proibidos (10). Foque no que for relevante para uma tela de menu com dois botões. Não altere nenhum arquivo.

---

## Tarefa 3 — Criar arquivo de tema/cores com tokens de estilo

### Objetivo

Criar um arquivo centralizado com as constantes de estilo (cores, espaçamentos, raios, sombras) definidas no `UI_UX_GUIDE.md`, seguindo o padrão de organização do projeto.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: O arquivo de tema não é visível ao usuário, mas define os tokens que todos os componentes visuais usarão. A consistência visual depende diretamente deste arquivo.

### Pré-requisitos

- Tarefa 2 concluída (regras do guia já conhecidas)
- Estrutura de pastas mapeada na Tarefa 1

### Arquivos prováveis

- `src/ui/theme.ts` (ou `src/ui/styles.ts`, conforme Tarefa 1)
- `src/ui/index.ts` (se existir)

Caminho deve ser confirmado com base no resultado da Tarefa 1.

### Passos

1. Criar a pasta `src/ui/` se ainda não existir
2. Criar o arquivo `src/ui/theme.ts` (ou o nome mais adequado identificado na Tarefa 1)
3. Definir constantes para:
   - `colors.primary` → `#1D4ED8`
   - `colors.primaryHover` → `#1E40AF`
   - `colors.secondary` → `#475569`
   - `colors.background` → `#F8FAFC`
   - `colors.textPrimary` → `#0F172A`
   - `colors.textSecondary` → `#475569`
   - `colors.border` → `#E2E8F0`
   - `colors.success` → `#15803D`
   - `colors.error` → `#B91C1C`
   - `spacing.sm` → `8`
   - `spacing.md` → `16`
   - `spacing.lg` → `24`
   - `spacing.xl` → `32`
   - `borderRadius.button` → `8` (8‑10px, usar 8 como base)
   - `borderRadius.card` → `12`
   - `fontSize.button` → `14`
   - `fontWeight.button` → `600`
   - `shadow.button` → descrição ou valor de sombra leve
4. Exportar todas as constantes

### Critérios de aceite

- Arquivo de tema criado com todas as cores, espaçamentos e raios necessários
- Constantes exportadas e tipadas corretamente
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit src/ui/theme.ts 2>&1
```

Se `tsconfig.json` não incluir `src/ui/`, ajustar ou usar:

```bash
npx tsc --noEmit --skipLibCheck
```

### Riscos

- Caminho ou nome do arquivo diferente do esperado — confirmar na Tarefa 1
- Se o projeto usar outra engine (Godot, Cocos2d‑x), a abordagem de "tokens" precisará ser adaptada para a linguagem da engine

### O que NÃO alterar

- Não criar componentes visuais nesta tarefa
- Não alterar `src/core/`
- Não adicionar dependências externas

### Reversibilidade

Remover ou reverter o arquivo `src/ui/theme.ts` (ou o equivalente criado).

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o arquivo de tema do projeto em `src/ui/theme.ts` com as constantes de estilo do `UI_UX_GUIDE.md`. Inclua cores (primária `#1D4ED8`, secundária `#475569`, fundo `#F8FAFC`, texto `#0F172A`), espaçamentos (8, 16, 24, 32), raio de botão (8px) e peso de fonte (600). Exporte todas as constantes. Valide com `npx tsc --noEmit`.

---

## Tarefa 4 — Criar container do menu com layout base

### Objetivo

Criar o componente/tela `MenuScreen` com a estrutura de layout centralizada (flex column, centralizado horizontal e verticalmente), usando o fundo definido no tema (`#F8FAFC`). O container deve estar vazio (sem botões ainda).

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação de um componente visual que ocupará uma tela inteira. Define layout, cores de fundo e organização espacial — impacto direto na experiência.

Requisitos obrigatórios:

- Deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- Deve validar em mobile e desktop
- Deve evitar aparência genérica de IA
- Deve prever estado de carregamento (opcional para menu inicial)

### Pré-requisitos

- Tarefa 3 concluída (tema com cores disponível)
- Estrutura de pastas confirmada na Tarefa 1

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/MenuScreen.tsx` (React) ou equivalente na engine identificada
- `/mnt/c/Dev/lemmings-style-game/src/ui/index.ts` (se existir)

### Passos

1. Criar o arquivo `src/ui/MenuScreen.tsx` (ou equivalente)
2. Importar as constantes de `theme.ts`
3. Estruturar um container com `display: flex`, `flex-direction: column`, centralizado (`align-items: center`, `justify-content: center`)
4. Definir fundo: `#F8FAFC`
5. Adicionar um título de texto "Lemmings" (ou nome do jogo, seguindo a escala de tipografia do guia: 28‑36px, peso 600‑700)
6. **Não adicionar botões ainda**
7. Exportar o componente

### Critérios de aceite

- Container ocupa a tela inteira (viewport)
- Fundo `#F8FAFC` aplicado
- Título "Lemmings" visível e centralizado
- Layout é flex column centralizado
- Compilação TypeScript passa
- Em mobile, o layout não quebra (sem rolagem horizontal)

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Visualmente (se houver servidor de dev):

- Abrir em viewport mobile (375 × 667) e desktop (1280 × 720)
- Verificar fundo correto e título centralizado

### Riscos

- Se a engine não for React, a implementação precisará ser adaptada para a sintaxe da engine escolhida
- O título pode precisar de fonte personalizada se o guia definir uma específica

### O que NÃO alterar

- Não adicionar botões nesta tarefa
- Não alterar `theme.ts`
- Não alterar `src/core/`
- Não adicionar imagens ou ícones

### Reversibilidade

Remover o arquivo `src/ui/MenuScreen.tsx` e reverter qualquer importação adicionada.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `MenuScreen` em `src/ui/MenuScreen.tsx` com layout centralizado (flex column, centralizado vertical e horizontalmente), fundo `#F8FAFC` vindo do `theme.ts`, e um título "Lemmings" (28‑36px, peso 600‑700). Não adicione botões. Valide com `npx tsc --noEmit`.

---

## Tarefa 5 — Adicionar botão Jogar (primário)

### Objetivo

Adicionar o botão "Jogar" ao componente `MenuScreen` com cor primária `#1D4ED8`, texto "Jogar", raio 8‑10px e texto em branco.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Adiciona o principal elemento de ação da tela, com cor, formato e hierarquia visual definidos. Impacta diretamente a usabilidade do menu.

Requisitos obrigatórios:

- Deve seguir as regras de botões do `UI_UX_GUIDE.md` (seção 5.1)
- Texto deve começar com verbo ("Jogar")
- Raio 8‑10px, sombra leve ou nenhuma
- Deve evitar aparência genérica de IA
- Deve ter estado hover (primária hover `#1E40AF`)

### Pré-requisitos

- Tarefa 4 concluída (MenuScreen com layout base + tema)
- Tarefa 2 concluída (regras de botões conhecidas)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/MenuScreen.tsx`

### Passos

1. Abrir `MenuScreen.tsx`
2. Adicionar um botão "Jogar" abaixo do título
3. Aplicar estilos:
   - Cor de fundo: `#1D4ED8` (do tema)
   - Cor do texto: branca (`#FFFFFF`)
   - Raio: `8px` (do tema)
   - Sombra: leve (se definida no tema)
   - Padding vertical: `12px`, horizontal: `32px` (espaçamento confortável)
   - Fonte: `14px`, peso `600`
   - Estado hover: fundo `#1E40AF`
   - Cursor: pointer
4. Garantir que o botão não execute nenhuma ação ainda (apenas visual)

### Critérios de aceite

- Botão "Jogar" visível com cor primária `#1D4ED8`
- Raio de borda 8‑10px
- Texto "Jogar" em branco, 14px, peso 600
- Hover muda para `#1E40AF`
- Layout continua centralizado e sem quebras
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Visual:
- Verificar cor, raio e hover
- Verificar em mobile (botão com largura mínima confortável para toque ≥ 48px de altura)
- Verificar em desktop

### Riscos

- Se o hover não puder ser implementado por limitação da engine, usar fallback funcional
- Raio muito pequeno (< 8px) ou muito grande (> 10px) viola o guia

### O que NÃO alterar

- Não adicionar lógica de clique/navegação
- Não adicionar o botão Opções (Tarefa 6)
- Não alterar `theme.ts`
- Não alterar layout do container

### Reversibilidade

Reverter as linhas adicionadas em `MenuScreen.tsx` ou restaurar o arquivo do checkpoint anterior.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: adicione o botão "Jogar" ao `MenuScreen.tsx` com fundo `#1D4ED8`, texto branco, raio 8px, padding 12px vertical e 32px horizontal, fonte 14px peso 600, e hover `#1E40AF`. Use as constantes do `theme.ts`. Não adicione lógica de clique. Valide com `npx tsc --noEmit`.

---

## Tarefa 6 — Adicionar botão Opções (secundário)

### Objetivo

Adicionar o botão "Opções" ao componente `MenuScreen` abaixo do botão Jogar, com cor secundária `#475569` (texto) e fundo transparente ou leve, seguindo as regras de botão secundário do `UI_UX_GUIDE.md`.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Adiciona o segundo elemento de ação da tela, com peso visual menor que o botão primário, estabelecendo hierarquia correta entre as ações.

Requisitos obrigatórios:

- Botão secundário deve ter peso visual menor que o primário
- Deve usar cor secundária `#475569`
- Deve ter raio 8‑10px consistente com o botão primário
- Texto "Opções" claro e direto
- Deve evitar aparência genérica de IA

### Pré-requisitos

- Tarefa 5 concluída (botão Jogar funcionando)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/MenuScreen.tsx`

### Passos

1. Abrir `MenuScreen.tsx`
2. Adicionar um botão "Opções" abaixo do botão Jogar (com espaçamento de 16px entre eles)
3. Aplicar estilos de botão secundário:
   - Fundo: transparente ou `#FFFFFF` com borda `#475569`
   - Cor do texto: `#475569`
   - Raio: `8px`
   - Sem sombra (ou muito leve)
   - Padding consistente com o botão primário
   - Fonte: `14px`, peso `500`
   - Estado hover: fundo leve (`#F1F5F9` ou similar)
4. Garantir que o botão não execute nenhuma ação ainda

### Critérios de aceite

- Botão "Opções" visível abaixo do botão Jogar
- Espaçamento de 16px entre os botões
- Estilo secundário (texto `#475569`, fundo transparente ou com borda)
- Raio 8px consistente
- Hover sutil
- Hierarquia visual: Jogar (primário, destaque) → Opções (secundário, discreto)
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Visual:
- Verificar hierarquia visual (Jogar deve chamar mais atenção que Opções)
- Verificar em mobile (botões com altura mínima 48px)
- Verificar em desktop

### Riscos

- Botão secundário com peso visual muito próximo do primário — viola hierarquia
- Espaçamento inconsistente entre botões

### O que NÃO alterar

- Não alterar o botão Jogar já criado
- Não alterar `theme.ts`
- Não adicionar lógica de clique/navegação

### Reversibilidade

Reverter as linhas adicionadas em `MenuScreen.tsx` ou restaurar do checkpoint.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: adicione o botão "Opções" ao `MenuScreen.tsx` abaixo do botão Jogar com espaçamento de 16px. Use estilo secundário: fundo transparente, texto `#475569`, raio 8px, fonte 14px peso 500, hover com fundo `#F1F5F9`. Mantenha hierarquia visual (Jogar com mais destaque). Valide com `npx tsc --noEmit`.

---

## Tarefa 7 — Validar compilação, lint e verificação visual

### Objetivo

Executar a validação completa do sprint: compilação TypeScript, lint (se disponível), build (se disponível) e verificação visual da tela de menu em mobile e desktop.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Tarefa de validação técnica e visual — nenhum arquivo é alterado.

### Pré-requisitos

- Todas as tarefas 1 a 6 concluídas

### Arquivos prováveis

- Todos os arquivos criados nas tarefas anteriores

### Passos

1. Executar `npx tsc --noEmit` — verificar zero erros
2. Executar `npm run lint` (ou o comando de lint configurado) — verificar zero warnings/errors
3. Executar `npm run build` (se disponível e funcional) — verificar build bem-sucedido
4. Verificar visualmente a tela:
   - Em viewport mobile (375 × 667): botões acessíveis, sem rolagem horizontal, espaçamento adequado
   - Em viewport desktop (1280 × 720): layout centralizado, proporções corretas
5. Verificar se não há erros de responsividade
6. Verificar se nenhum arquivo fora do escopo foi alterado

### Critérios de aceite

- `npx tsc --noEmit` → zero erros
- `npm run lint` → zero erros (ou pelo menos não introduziu novos)
- Visual mobile: menu centralizado, botões clicáveis, sem quebras
- Visual desktop: proporcional, sem esticar conteúdo
- Nenhum arquivo fora de `src/ui/` foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
npm run lint 2>&1
npm run build 2>&1
```

Para validação visual, usar o servidor de desenvolvimento (se disponível) ou abrir o arquivo HTML gerado.

### Riscos

- Lint ou build podem não estar configurados (scripts placeholder no `package.json`)
- Se o projeto não tiver servidor de dev, a validação visual pode não ser possível nesta tarefa

### O que NÃO alterar

- Não alterar nenhum arquivo durante a validação
- Não corrigir problemas não relacionados ao escopo da sprint

### Reversibilidade

Tarefa de validação apenas — nenhuma alteração é feita.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide todo o sprint. Rode `npx tsc --noEmit`, `npm run lint` e `npm run build`. Verifique visualmente o menu em mobile (375 × 667) e desktop (1280 × 720). Confirme que nenhum arquivo fora de `src/ui/` foi alterado. Não modifique nenhum arquivo.

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode ser isolada? | Checkpoint |
|-------|--------|-----------|-------------------|------------|
| 1 | Tarefa 1 (mapeamento) | — | Sim | Commit após Tarefa 1 (documentação da estrutura) |
| 2 | Tarefa 2 (leitura do guia) | — | Sim, paralelo à Tarefa 1 | Commit após Tarefa 2 (leitura concluída) |
| 3 | Tarefa 3 (tema/cores) | Tarefa 2 | Não (precisa das regras) | Commit após Tarefa 3 (tema criado) |
| 4 | Tarefa 4 (container) | Tarefa 3 | Não (precisa do tema) | Commit após Tarefa 4 (container criado) |
| 5 | Tarefa 5 (botão Jogar) | Tarefa 4 | Não | Commit após Tarefa 5 (Jogar adicionado) |
| 6 | Tarefa 6 (botão Opções) | Tarefa 5 | Não | Commit após Tarefa 6 (Opções adicionado) |
| 7 | Tarefa 7 (validação) | Todas | Não | Commit final da sprint |

**Observações:**

- Tarefas 1 e 2 podem ser executadas em paralelo
- Recomenda-se fazer commit após cada tarefa (diff pequeno e reversível)
- Auditoria UI/UX deve ser feita na Tarefa 7 (validação visual)
- Se a engine identificada na Tarefa 1 for diferente de React/TSX, adaptar extensões e sintaxe dos arquivos conforme necessário, mantendo a mesma lógica

# Checklist final da sprint

- [ ] Tarefa 1 — Mapeamento concluído e documentado
- [ ] Tarefa 2 — UI_UX_GUIDE.md lido e regras extraídas
- [ ] Tarefa 3 — Tema/cores criado em `src/ui/theme.ts`
- [ ] Tarefa 4 — Container do menu criado em `src/ui/MenuScreen.tsx`
- [ ] Tarefa 5 — Botão Jogar adicionado com estilo primário
- [ ] Tarefa 6 — Botão Opções adicionado com estilo secundário
- [ ] Tarefa 7 — Validação completa:
  - [ ] `npx tsc --noEmit` passou
  - [ ] `npm run lint` passou (ou sem novos erros)
  - [ ] `npm run build` passou (ou confirmado que é placeholder)
  - [ ] Visual mobile validado (375×667, sem quebras)
  - [ ] Visual desktop validado (1280×720, proporcional)
  - [ ] Nenhum arquivo fora de `src/ui/` alterado
  - [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas (Sim / Não / Indireto / Não aplicável)
- [ ] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (1, 4, 5, 6)

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint exige modelo mais forte. Todas são implementações de interface simples com estilo definido, sem autenticação, banco de dados, pagamentos, segurança ou refatoração ampla. Modelo econômico é suficiente para todas as tarefas.
