# arquivo: SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 04 — SELECAO_NIVEL_UI
- **objetivo da sprint original:** Implementar tela de seleção de nível com lista linear de ícones, desbloqueio por progresso.
- **arquivo de origem:** `/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 04 - SELECAO_NIVEL_UI/SPRINT_04_SELECAO_NIVEL_UI.md`
- **resumo do escopo:** Criar layout de seleção de nível com ícones em grid/lista. Ícones bloqueados em cinza, desbloqueados em verde #15803D. Usar espaçamentos 8px, 12px, 16px do UI_UX_GUIDE. Dados estáticos (hardcoded), sem conectar lógica de desbloqueio real.

## Análise da Sprint

### Objetivo da sprint

Criar a tela visual de seleção de níveis com itens estáticos exibindo estado bloqueado/desbloqueado, seguindo o UI_UX_GUIDE e usando os tokens de estilo já definidos em `src/ui/theme.ts`.

### Impacto UI/UX da sprint

Classificação: **Sim**.

Justificativa: A sprint cria uma nova tela inteira (componente visual, layout em grid/lista, cards de nível, cores de estado, espaçamento, responsividade). Toda decisão visual impacta diretamente a experiência do usuário.

Todas as tarefas com impacto direto devem obrigatoriamente:
- ler `docs/design/UI_UX_GUIDE.md`;
- seguir as regras de cores (especialmente verde #15803D), cards, espaçamento e tipografia;
- validar em mobile e desktop;
- evitar aparência genérica de IA;
- prever estados de loading, vazio e erro quando aplicável.

### Escopo identificado

- Criar tela de seleção de nível com layout em grid ou lista
- Cada nível exibido como card/ícone
- Ícones bloqueados em cinza (usar `colors.textMuted` = #64748B)
- Ícones desbloqueados em verde (usar `colors.success` = #15803D)
- Usar espaçamentos 8px, 12px e 16px do `theme.ts`
- Dados mockados (array estático de 5 níveis)
- Navegação temporária para visualização (montar no App.tsx)
- Seguir o `UI_UX_GUIDE.md` incluindo regra "não usar cor como único indicador de estado"

### Fora do escopo

- Não conectar a lógica de desbloqueio real (progresso do jogador)
- Não criar animações de desbloqueio
- Não gerar/sprites de ícones de nível (usar placeholder visual)
- Não implementar scroll infinito
- Não criar tela de gameplay ou HUD
- Não modificar `src/core/` (interfaces de dados)
- Não adicionar dependências externas

### Dependências entre partes

- A tarefa de componente LevelItem depende dos tokens de estilo já existentes em `theme.ts` (Sprint 03)
- A tarefa de LevelSelectionScreen depende do componente LevelItem
- A validação final depende de todas as tarefas anteriores
- Tarefas 1 e 2 (leitura) podem ser executadas isoladamente

### Riscos principais

- Usar cor verde como único indicador de estado (viola regra do UI_UX_GUIDE seção 4.2: "não usar cor como único indicador de estado")
- Espaçamentos inconsistentes entre itens da lista
- Tela pode não se adaptar bem a mobile se o grid não for responsivo
- Aparência genérica de IA se cards forem super-estilizados sem necessidade
- Navegação temporária pode ser confundida com funcionalidade final

### Estratégia de quebra

Quebrar em 6 tarefas sequenciais:

1. **Mapeamento** — reconhecer a codebase pós-Sprint 03 e confirmar tokens disponíveis
2. **Leitura do guia** — extrair regras específicas de cores, cards e espaçamento
3. **Dados mockados** — criar tipo LevelData e array estático de 5 níveis
4. **Componente LevelItem** — card visual de nível com locked/unlocked
5. **Tela LevelSelectionScreen** — layout com grid/lista e espaçamentos corretos
6. **Validação final** — typecheck, build, lint, visual mobile/desktop

---

# Tarefas da Sprint

## Tarefa 1 — Mapear estado atual da codebase e componentes disponíveis

### Objetivo

Inspecionar a codebase para verificar se os componentes e tokens de estilo criados na Sprint 03 estão disponíveis e funcionais, e confirmar que `src/ui/theme.ts` já possui as constantes necessárias (cores success, textMuted; espaçamentos xs, sm, md; borderRadius.card).

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: A tarefa é apenas de levantamento — nenhum arquivo é alterado ou criado.

### Pré-requisitos

- Sprint 03 concluída (tema, botão, menu criados)
- Acesso ao repositório do projeto

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/theme.ts`
- `/mnt/c/Dev/lemmings-style-game/src/ui/Button.tsx`
- `/mnt/c/Dev/lemmings-style-game/src/ui/MenuScreen.tsx`
- `/mnt/c/Dev/lemmings-style-game/src/App.tsx`
- `/mnt/c/Dev/lemmings-style-game/package.json`

### Passos

1. Navegar até a raiz do projeto
2. Ler `src/ui/theme.ts` e confirmar que `colors.success`, `colors.textMuted`, `spacing.xs` (8), `spacing.sm` (12), `spacing.md` (16), `borderRadius.card` (12) existem
3. Verificar se `src/ui/LevelSelectionScreen.tsx` já existe (não deve existir ainda)
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

- Se a Sprint 03 não estiver concluída (theme.ts ausente), esta tarefa identificará e reportará o bloqueio

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não instalar dependências

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inspecione a codebase para confirmar que `src/ui/theme.ts` contém os tokens `colors.success`, `colors.textMuted`, `spacing.xs` (8), `spacing.sm` (12), `spacing.md` (16) e `borderRadius.card` (12). Verifique se `src/ui/LevelSelectionScreen.tsx` NÃO existe. Execute `npx tsc --noEmit` e `npm run build` para confirmar que o projeto compila. Não altere nenhum arquivo.

---

## Tarefa 2 — Extrair regras do UI_UX_GUIDE.md para a tela de seleção de nível

### Objetivo

Ler `docs/design/UI_UX_GUIDE.md` e extrair especificamente as regras de cores (seção 4.2, especialmente verde `#15803D` e cinza `#64748B`), espaçamento (4.4), bordas/cantos/cards (4.5), seção 5.3 (cards), responsividade (7) e padrões proibidos (10) que serão aplicadas na tela de seleção de nível.

### Tipo da tarefa

documentação

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: A leitura do guia não altera a interface, mas fornece as regras que orientarão as tarefas seguintes. Sem essa extração o coder pode aplicar cores ou espaçamentos incorretos.

### Pré-requisitos

- Arquivo `docs/design/UI_UX_GUIDE.md` deve existir

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md`

### Passos

1. Ler as seções indicadas do guia:
   - 4.1 Layout
   - 4.2 Cores (atenção especial ao verde `#15803D` e à regra "não usar cor como único indicador de estado")
   - 4.4 Espaçamento
   - 4.5 Bordas, sombras e cantos
   - 5.3 Cards
   - 7 Responsividade
   - 8 Microcopy
   - 10 Padrões proibidos
2. Extrair regras específicas para a tela de seleção:
   - Cor de desbloqueado: `#15803D` (success)
   - Cor de bloqueado: `#64748B` (textMuted) — cinza claro para indicar bloqueio
   - Além da cor, usar outro indicador visual de estado (ex.: texto "Bloqueado", opacidade reduzida, ou borda tracejada)
   - Raio de card: 12-16px
   - Sombra: leve (shadow.card)
   - Espaçamento entre itens: 12px (spacing.sm)
   - Layout: grid ou lista com alinhamento consistente
3. **Não alterar nenhum arquivo** — apenas documentar mentalmente para uso nas tarefas seguintes

### Critérios de aceite

- As regras extraídas cobrem cores dos estados bloqueado/desbloqueado, espaçamento, cards e responsividade
- O coder sabe que "não usar cor como único indicador de estado" é uma regra obrigatória do guia
- Nenhum arquivo foi alterado

### Como validar

```bash
cat /mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md
```

### Riscos

- Pular a regra "não usar cor como único indicador de estado" pode resultar em inacessibilidade visual
- Interpretação incorreta dos espaçamentos

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não copiar trechos do guia para outros arquivos

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: leia `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md` e extraia as regras de cores (4.2), espaçamento (4.4), cards (5.3), bordas/cantos (4.5), responsividade (7) e padrões proibidos (10). Atenção especial à regra "não usar cor como único indicador de estado". Foque no que for relevante para uma tela de seleção de nível com cards bloqueados/desbloqueados. Não altere nenhum arquivo.

---

## Tarefa 3 — Criar tipo LevelData e dados mockados de níveis

### Objetivo

Definir uma interface `LevelData` com as propriedades necessárias para exibir um nível na tela de seleção e criar um array estático de 5 níveis (mockados, hardcoded) que será usado para renderizar a lista.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: **Não**.

Justificativa: A criação de tipos e dados mockados é infraestrutura — não altera tela, componente, texto de interface ou fluxo de usuário.

### Pré-requisitos

- Tarefa 1 concluída (tokens confirmados)
- Pasta `src/ui/` deve existir (criada na Sprint 03)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/levels.ts` (novo) — dados mockados
- ou dentro do próprio LevelSelectionScreen (a confirmar)

### Passos

1. Decidir o local do arquivo (recomendado: `src/ui/levels.ts` para separar dados do componente)
2. Criar ou editar o arquivo
3. Definir a interface `LevelData`:
   - `id: number` — identificador do nível
   - `nome: string` — nome exibido (ex.: "Nível 1", "Primeiros Passos")
   - `desbloqueado: boolean` — estado atual (hardcoded para mock)
4. Criar array `niveis: LevelData[]` com 5 itens:
   - Nível 1: desbloqueado = true
   - Nível 2: desbloqueado = true
   - Nível 3: desbloqueado = false
   - Nível 4: desbloqueado = false
   - Nível 5: desbloqueado = false
5. Exportar a interface e o array
6. Se o arquivo for separado, garantir que não importa nada de React (puro TS)

### Critérios de aceite

- Interface `LevelData` definida com `id`, `nome` e `desbloqueado`
- Array `niveis` exportado com 5 itens
- Compilação TypeScript passa sem erros
- Nenhum componente visual foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
```

### Riscos

- Se a interface for definida dentro do componente, ficará mais difícil de separar depois — prefira arquivo separado

### O que NÃO alterar

- Não modificar `src/ui/theme.ts`
- Não modificar `src/core/` (as interfaces de dados core)
- Não criar componentes visuais nesta tarefa

### Reversibilidade

Remover o arquivo `src/ui/levels.ts` e reverter qualquer importação adicionada.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o arquivo `src/ui/levels.ts` com a interface `LevelData` (id: number, nome: string, desbloqueado: boolean) e um array estático `niveis` com 5 níveis (nível 1 e 2 desbloqueados, 3 a 5 bloqueados). Exporte ambos. Não crie componentes visuais. Valide com `npx tsc --noEmit`.

---

## Tarefa 4 — Criar componente LevelItem (card de nível com estados bloqueado/desbloqueado)

### Objetivo

Criar o componente `LevelItem` que representa visualmente um nível na tela de seleção. Deve exibir o nome do nível e indicar visualmente se está bloqueado ou desbloqueado, seguindo as regras do UI_UX_GUIDE (incluindo "não usar cor como único indicador de estado").

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação de um componente visual (card) com dois estados visuais distintos (bloqueado/desbloqueado), cores, bordas, sombras e indicadores de estado.

Requisitos obrigatórios:
- deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- deve validar mobile e desktop
- deve evitar aparência genérica de IA
- **não usar cor como único indicador de estado** — usar cor + texto/ícone/opacidade para diferenciar bloqueado

### Pré-requisitos

- Tarefa 3 concluída (interface LevelData disponível)
- Tokens de estilo disponíveis em `theme.ts`
- Regras do UI_UX_GUIDE extraídas na Tarefa 2

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/LevelItem.tsx` (novo)

### Passos

1. Criar o arquivo `src/ui/LevelItem.tsx`
2. Importar `colors`, `spacing`, `borderRadius`, `fontSize`, `fontWeight`, `shadow` de `./theme`
3. Importar `LevelData` de `./levels`
4. Estruturar o componente como um card (div com estilos de card):
   - Raio: `borderRadius.card` (12px)
   - Sombra: `shadow.card`
   - Fundo: `colors.surface` (#FFFFFF)
   - Padding: `spacing.md` (16px)
5. Exibir o nome do nível (usar `fontSize.body` ou `fontSize.label`)
6. Se `desbloqueado === true`:
   - Fundo ou destaque: `colors.success` (#15803D) em um indicador (ex.: faixa lateral, badge, ou ícone)
   - Texto do nome: `colors.textPrimary`
   - Opcional: texto "Disponível" ou checkmark
7. Se `desbloqueado === false`:
   - Opacidade reduzida (ex.: `opacity: 0.5`)
   - Texto do nome: `colors.textMuted` (#64748B)
   - Exibir texto "Bloqueado" ou cadeado (texto, não ícone — manter sem dependências externas)
   - Borda mais sutil ou cinza
8. **Garantir que não se usa apenas cor para diferenciar** — o texto/opacidade/indicação textual deve deixar claro o estado mesmo sem enxergar cores
9. Estado hover (opcional, mas desejável para feedback):
   - Card desbloqueado: leve elevação de sombra
   - Card bloqueado: sem alteração (ou cursor not-allowed)
10. Exportar o componente

### Critérios de aceite

- Componente `LevelItem` renderiza corretamente com props `level: LevelData`
- Card desbloqueado: visível, nome em texto escuro, indicador verde, aparenta disponível
- Card bloqueado: opacidade reduzida, nome em cinza, texto "Bloqueado" visível, sem cor verde
- A diferença entre estados é perceptível mesmo sem cor (opacidade + texto)
- Raio 12px, sombra leve
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Teste visual: montar o componente em App.tsx temporariamente com ambos os estados.

### Riscos

- Usar cor como único diferenciador de estado — viola UI_UX_GUIDE. Usar opacidade + texto + cor
- Card muito decorativo — manter simples, sem gradientes ou sombras exageradas

### O que NÃO alterar

- Não modificar `theme.ts`
- Não modificar `levels.ts`
- Não adicionar dependências externas (sem ícones de bibliotecas)
- Não adicionar lógica de clique ou navegação

### Reversibilidade

Remover o arquivo `src/ui/LevelItem.tsx`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `LevelItem` em `src/ui/LevelItem.tsx` que recebe `level: LevelData` como prop e renderiza um card com nome do nível. Se `desbloqueado` for true, use destaque verde (`colors.success`) + nome em `textPrimary`. Se false, use opacidade 0.5 + texto "Bloqueado" + nome em `textMuted` — nunca use cor como único indicador de estado. Use borderRadius.card (12px), shadow.card, spacing.md. Valide com `npx tsc --noEmit`.

---

## Tarefa 5 — Criar LevelSelectionScreen com layout em grid e espaçamento correto

### Objetivo

Criar a tela `LevelSelectionScreen` que exibe o título "Selecionar Nível" e a lista de níveis em grid (2 colunas no desktop, 1 coluna no mobile), usando o componente `LevelItem` e os espaçamentos definidos no tema.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

Classificação: **Sim**.

Justificativa: Criação de uma tela completa com layout, grid responsivo, título, espaçamento entre itens, e integração com o componente visual LevelItem.

Requisitos obrigatórios:
- deve ler `docs/design/UI_UX_GUIDE.md` (já lido na Tarefa 2)
- deve validar mobile e desktop
- deve evitar aparência genérica de IA
- layout responsivo (grid 2 colunas desktop → 1 coluna mobile)

### Pré-requisitos

- Tarefa 4 concluída (LevelItem disponível)
- Tarefa 3 concluída (dados mockados disponíveis)
- Tokens de estilo disponíveis

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/LevelSelectionScreen.tsx` (novo)

### Passos

1. Criar o arquivo `src/ui/LevelSelectionScreen.tsx`
2. Importar `colors`, `spacing`, `fontSize`, `fontWeight` de `./theme`
3. Importar `LevelItem` de `./LevelItem`
4. Importar `niveis` de `./levels`
5. Estruturar o layout:
   - Container full-height com fundo `colors.background` (#F8FAFC)
   - Título "Selecionar Nível" no topo (usar `fontSize.sectionTitle` = 22px, peso 600)
   - Grid responsivo com os LevelItems:
     - Desktop (≥ 640px): grid de 2 colunas com gap `spacing.sm` (12px)
     - Mobile (< 640px): 1 coluna
   - Padding interno: `spacing.md` (16px)
6. Usar media query inline ou uma abordagem simples com `max-width` no container:
   - Container com `maxWidth: 600px` centralizado
   - Grid com `display: grid`, `gridTemplateColumns` ajustável
7. Espaçamento entre o título e o grid: `spacing.lg` (24px)
8. Adicionar padding inferior: `spacing.xl` (32px) para respiro
9. Exportar o componente

### Critérios de aceite

- Tela exibe título "Selecionar Nível" e 5 cards de nível
- Cards bloqueados e desbloqueados visualmente distintos
- Grid de 2 colunas em telas largas, 1 coluna em telas estreitas
- Espaçamento entre cards de 12px (spacing.sm)
- Espaçamento entre título e grid de 24px (spacing.lg)
- Layout não quebra em mobile (sem rolagem horizontal)
- Compilação TypeScript passa

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Visual: montar a tela no App.tsx e verificar em viewport mobile (375×667) e desktop (1280×720).

### Riscos

- Grid pode não se adaptar corretamente se a media query não for implementada
- Espaçamentos inconsistentes podem violar os tokens do tema
- Aparência genérica se cards forem muito decorativos

### O que NÃO alterar

- Não modificar `LevelItem.tsx` nesta tarefa (se precisar ajustar, pare e registre)
- Não modificar `theme.ts`
- Não modificar `levels.ts`
- Não adicionar navegação ou lógica de clique nos cards

### Reversibilidade

Remover o arquivo `src/ui/LevelSelectionScreen.tsx`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o componente `LevelSelectionScreen` em `src/ui/LevelSelectionScreen.tsx`. Deve exibir o título "Selecionar Nível" e um grid responsivo com os 5 níveis mockados de `levels.ts` usando `LevelItem`. Grid: 2 colunas no desktop, 1 coluna no mobile (use media query em CSS ou `gridTemplateColumns` com fallback). Gap entre cards: `spacing.sm` (12px). Margem entre título e grid: `spacing.lg` (24px). Fundo `colors.background`. Container centralizado com `maxWidth: 600px`. Valide com `npx tsc --noEmit`.

---

## Tarefa 6 — Validar compilação, lint, build e verificação visual mobile/desktop

### Objetivo

Executar a validação completa da sprint: compilação TypeScript, lint, build e verificação visual da tela de seleção de nível em mobile e desktop.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Tarefa de validação técnica e visual — nenhum arquivo é alterado.

### Pré-requisitos

- Todas as tarefas 1 a 5 concluídas
- Arquivos criados: `levels.ts`, `LevelItem.tsx`, `LevelSelectionScreen.tsx`
- `LevelSelectionScreen` montada no `App.tsx` para visualização (trocar `<MenuScreen />` por `<LevelSelectionScreen />` temporariamente)

### Arquivos prováveis

- Todos os arquivos criados nas tarefas anteriores
- `src/App.tsx` (para montar a tela temporariamente)

### Passos

1. Executar `npx tsc --noEmit` — verificar zero erros
2. Executar `npm run lint` — verificar sem novos erros (placeholder, aceitar)
3. Executar `npm run build` — verificar build bem-sucedido
4. Iniciar servidor dev (`npm run dev`) e abrir em:
   - Viewport mobile (375×667): cards em 1 coluna, sem rolagem horizontal, espaçamento adequado
   - Viewport desktop (1280×720): cards em 2 colunas, layout centralizado, proporções corretas
5. Verificar estados visuais:
   - Nível desbloqueado: verde + nome visível
   - Nível bloqueado: cinza + opacidade reduzida + texto "Bloqueado"
6. Verificar que todos os espaçamentos seguem os tokens do tema
7. Reverter `App.tsx` ao estado original (MenuScreen) se foi alterado para teste
8. Verificar que nenhum arquivo fora do escopo foi alterado

### Critérios de aceite

- `npx tsc --noEmit` → zero erros
- `npm run lint` → zero novos erros
- `npm run build` → build bem-sucedido
- Visual mobile: 1 coluna, cards ocupando largura total, sem quebras, botões acessíveis
- Visual desktop: 2 colunas, grid alinhado, espaçamento consistente
- Estado bloqueado visualmente diferente de desbloqueado (cor + opacidade + texto)
- Nenhum arquivo fora de `src/ui/` foi alterado (exceto App.tsx se usado para teste)

### Como validar

```bash
npx tsc --noEmit 2>&1
npm run lint 2>&1
npm run build 2>&1
```

Para validação visual: abrir o servidor dev e inspecionar em viewports mobile e desktop.

### Riscos

- Lint pode não estar configurado (placeholder) — registrar mas não bloquear
- Se App.tsx foi alterado para teste, deve ser revertido antes do commit final
- Pode haver diferenças de renderização entre navegadores

### O que NÃO alterar

- Não alterar nenhum arquivo durante a validação
- Não corrigir problemas não relacionados ao escopo da sprint
- Não adicionar novos recursos durante a validação

### Reversibilidade

Reverter App.tsx ao estado original se foi alterado. Tarefa de validação apenas.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide todo o sprint da tela de seleção de nível. Rode `npx tsc --noEmit`, `npm run lint` e `npm run build`. Monte temporariamente `<LevelSelectionScreen />` no `App.tsx` para testar visualmente em mobile (375×667) e desktop (1280×720). Verifique estados bloqueado/desbloqueado. Reverte `App.tsx` ao original (MenuScreen) após o teste. Confirme que nenhum arquivo fora de `src/ui/` foi alterado. Não modifique nenhum arquivo durante a validação.

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode ser isolada? | Checkpoint |
|-------|--------|-----------|-------------------|------------|
| 1 | Tarefa 1 (mapeamento) | — | Sim | Commit após Tarefa 1 (documentação do estado) |
| 2 | Tarefa 2 (leitura do guia) | — | Sim, paralelo à Tarefa 1 | Commit após Tarefa 2 (leitura concluída) |
| 3 | Tarefa 3 (dados mockados) | Tarefa 1 | Não (precisa saber estado do tema) | Commit após Tarefa 3 (dados criados) |
| 4 | Tarefa 4 (LevelItem) | Tarefa 3 | Não (precisa dos dados) | Commit após Tarefa 4 (componente criado) |
| 5 | Tarefa 5 (LevelSelectionScreen) | Tarefa 4 | Não (precisa do LevelItem) | Commit após Tarefa 5 (tela criada) |
| 6 | Tarefa 6 (validação) | Todas | Não | Commit final da sprint |

**Observações:**
- Tarefas 1 e 2 podem ser executadas em paralelo
- Recomenda-se fazer commit após cada tarefa (diff pequeno e reversível)
- A montagem temporária no App.tsx para validação visual é permitida, mas deve ser revertida
- A auditoria UI/UX deve ser feita na Tarefa 6 (validação visual)

# Checklist final da sprint

- [ ] Tarefa 1 — Mapeamento concluído e documentado
- [ ] Tarefa 2 — UI_UX_GUIDE.md lido e regras extraídas
- [ ] Tarefa 3 — Tipo LevelData e dados mockados criados em `src/ui/levels.ts`
- [ ] Tarefa 4 — Componente LevelItem criado em `src/ui/LevelItem.tsx`
- [ ] Tarefa 5 — Tela LevelSelectionScreen criada em `src/ui/LevelSelectionScreen.tsx`
- [ ] Tarefa 6 — Validação completa:
  - [ ] `npx tsc --noEmit` passou
  - [ ] `npm run lint` passou (ou sem novos erros)
  - [ ] `npm run build` passou
  - [ ] Visual mobile (375×667): grid 1 coluna, sem quebras
  - [ ] Visual desktop (1280×720): grid 2 colunas, proporcional
  - [ ] Estado bloqueado: cinza + opacidade + texto "Bloqueado"
  - [ ] Estado desbloqueado: verde + nome visível
  - [ ] Nenhum arquivo fora de `src/ui/` alterado (exceto App.tsx para teste, revertido)
  - [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas (Sim / Não / Indireto / Não aplicável)
- [ ] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (4 e 5)

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint exige modelo mais forte. Todas são implementações de interface visual com tokens de estilo definidos, dados estáticos, sem autenticação, banco de dados, pagamentos, segurança ou refatoração ampla. Modelo econômico é suficiente para todas as tarefas.
