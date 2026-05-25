# Contexto de Transferência

## 1. Identificação

- **Tema/projeto/assunto:** Projeto de jogo no estilo Lemmings (puzzle/platformer).
- **Data do resumo:** 2026-05-24
- **Etapa atual:** Em andamento — Sprint 04 (SELECAO_NIVEL_UI) planejada mas ainda não executada; Sprint 03 (MENU_INICIAL_UI) concluída.
- **Origem do contexto:** Execução das Sprints 00 a 03 e planejamento da Sprint 04, com stack definida (React + Vite + TypeScript).
- **Destinatário esperado:** Próximo responsável (modelo ou pessoa) que continuará o desenvolvimento, executando a Sprint 04 ou a Sprint 05.
- **Objetivo deste handoff:** Transferir o estado atual completo do projeto — incluindo estrutura de arquivos, stack tecnológica, decisões tomadas, sprints concluídas e pendências — para que outro agente ou modelo possa continuar o trabalho sem depender da memória da sessão anterior.

---

## 2. Objetivo principal

Criar um jogo estilo Lemmings que ofereça desafio competitivo e experiência nostálgica, com mecânicas de puzzle acessíveis para todas as idades (criança ao adulto) em plataformas mobile (iOS/Android) e PC, utilizando anúncios como modelo de monetização inicial e salvamento local do progresso.

O MVP contempla: 6–10 níveis fixos, 4 habilidades básicas, tela de menu, seleção de nível, HUD de gameplay, reinício rápido, telas de vitória/derrota, e integração com SDK de anúncios (Google AdMob).

---

## 3. Estado atual

### O que já existe

- Projeto React + Vite + TypeScript funcional, com dev server e build de produção
- `src/core/` — 3 interfaces de dados (ProgressoJogador, LvlConfig, Criatura) exportadas via index.ts
- `src/ui/` — pasta de componentes de UI criada
- `src/ui/theme.ts` — tokens de estilo completos (cores, espaçamentos, raios, fontes, sombras)
- `src/ui/Button.tsx` — componente de botão reutilizável (variants primary/secondary) com hover states
- `src/ui/MenuScreen.tsx` — tela de menu inicial com título "Lemmings" e botões "Jogar" (primário) e "Opções" (secundário)
- `src/App.tsx` — componente raiz renderizando MenuScreen
- `src/main.tsx` — entry point React
- `index.html` — HTML de entrada
- `vite.config.ts` — configuração Vite + React (porta 3000)
- `tsconfig.json` — configurado para React JSX, ES2020, moduleResolution bundler
- `package.json` — scripts dev, build, preview, typecheck; dependências: react 19, react-dom 19, vite 8, typescript 6
- `.env.example` — contém ADMOB_ID placeholder
- `.gitignore` — básico (node_modules, .env, *.log, .DS_Store)
- Pastas `android/`, `ios/`, `pc/`, `assets/` — vazias (placeholders para builds futuras)
- `docs/` — PRDs (MASTER, CONSOLIDADO, AUDITORIA, PRE_PRD_ESCOPO), design (UI_UX_GUIDE.md), plano de implementação (12 sprints)
- `dist/` — build de produção gerado

### O que já foi feito (sprints concluídas)

| Sprint | Status | Descrição |
|---|---|---|
| Sprint 00 | Concluída | Preparação: mapeamento inicial da codebase, verificação de dependências |
| Sprint 01 | Concluída | Estrutura do projeto: pastas, package.json, tsconfig.json, .gitignore, .env.example |
| Sprint 02 | Concluída | Estrutura de dados: interfaces ProgressoJogador, LvlConfig, Criatura em src/core/ |
| Sprint 03 | Concluída | Menu inicial: theme.ts, Button.tsx, MenuScreen.tsx, infraestrutura React + Vite |
| Sprint 04 | Planejada | Arquivo de tarefas criado (SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md), não executado |

### O que está em andamento

- **Sprint 04 — SELECAO_NIVEL_UI**: tarefas planejadas mas ainda não executadas. O arquivo `SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md` está criado em `docs/Plano de Implementação/Sprints/Sprint 04 - SELECAO_NIVEL_UI/`.

### O que está parcialmente resolvido

- Stack tecnológica definida (React + Vite + TypeScript) — mas o PRD marca engine como "ponto de decisão". A stack atual é funcional para UI, mas pode precisar de adaptação se a engine final for Godot ou Cocos2d-x.
- Lint não está configurado — `npm run lint` é placeholder.

### Bloqueios

- Nenhum bloqueio crítico no momento.

### Riscos importantes

- A engine final (Godot vs Cocos2d-x vs manter React) ainda não foi decidida. React + Vite foi a escolha pragmática para permitir UI em .tsx, mas pode gerar retrabalho se a decisão mudar.
- Lint não configurado pode permitir degradação de qualidade de código.
- Sem testes automatizados configurados (Sprint 10).

**Estado geral:** `Em andamento`

---

## 4. Impacto UI/UX

Classificação: **Sim**.

Justificativa: O projeto é um jogo com interface visual completa — telas de menu, seleção de nível, gameplay, HUD, pausa, vitória/derrota, anúncios. Todas as sprints de 3 a 8 envolvem componentes visuais e fluxos de usuário.

Regras para o próximo responsável:
- **deve ler** `docs/design/UI_UX_GUIDE.md` antes de qualquer alteração visual
- deve seguir os tokens de estilo definidos em `src/ui/theme.ts`
- deve validar telas em mobile (375×667) e desktop (1280×720)
- deve evitar aparência genérica de IA (sem gradientes chamativos, cards decorativos, textos de marketing)
- deve prever estados de loading, erro e vazio quando aplicável
- deve respeitar a regra "não usar cor como único indicador de estado" (seção 4.2 do guia)

---

## 5. Tarefa ou foco atual

**Sprint 04 — SELECAO_NIVEL_UI** (planejada, não executada)

**O que deve ser feito:**
6 tarefas sequenciais definidas em `docs/Plano de Implementação/Sprints/Sprint 04 - SELECAO_NIVEL_UI/SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md`:

1. Mapear estado atual da codebase
2. Extrair regras do UI_UX_GUIDE para a tela de seleção
3. Criar tipo LevelData e dados mockados (src/ui/levels.ts)
4. Criar componente LevelItem (card de nível com bloqueado/desbloqueado)
5. Criar LevelSelectionScreen (grid responsivo com espaçamento)
6. Validação final (typecheck, build, visual mobile/desktop)

**Por que isso importa:** A tela de seleção de nível é a segunda tela do fluxo do jogo (Menu → Seleção → Gameplay). Sem ela, o jogador não consegue escolher fases.

**O que já foi resolvido:** O arquivo de tarefas detalhado está criado e salvo no repositório.

**O que ainda falta resolver:** Executar as 6 tarefas da Sprint 04.

---

## 6. Decisões já tomadas

### Decisão 1 — Stack tecnológica

- **Decisão:** Usar React 19 + Vite 8 + TypeScript 6 como stack de UI.
- **Motivo:** O projeto já tinha TypeScript como dependência; as tarefas de UI exigiam .tsx; React é o ecossistema mais prático para componentes de UI.
- **Impacto:** Define que todas as telas serão componentes React com estilos inline usando tokens do theme.ts.
- **Status:** Confirmada (com ressalva: engine final ainda é ponto de decisão no PRD).

### Decisão 2 — Sistema de estilo

- **Decisão:** Usar tokens de estilo centralizados em `src/ui/theme.ts` com constantes tipadas.
- **Motivo:** Garantir consistência visual seguindo o UI_UX_GUIDE sem dependências de CSS-in-JS ou frameworks de estilo.
- **Impacto:** Todos os componentes importam cores, espaçamentos e raios do theme.ts.
- **Status:** Confirmada.

### Decisão 3 — Componente Button reutilizável

- **Decisão:** Criar `Button.tsx` com variants primary/secondary.
- **Motivo:** Evitar duplicação de estilos de botão entre telas.
- **Impacto:** Todas as telas futuras devem usar o mesmo componente Button.
- **Status:** Confirmada.

### Decisão 4 — Dados mockados vs reais

- **Decisão:** Usar dados mockados (hardcoded) nas telas iniciais, sem conectar a lógica de progresso real.
- **Motivo:** Permite validar visualmente as telas antes de implementar sistemas de estado e persistência.
- **Impacto:** Sprint 04 usará array estático em vez de dados do jogador.
- **Status:** Confirmada.

### Decisão 5 — Objetivo central do jogo

- **Decisão:** Oferecer desafio competitivo e experiência nostálgica.
- **Motivo:** Alinha o produto ao apelo clássico do gênero.
- **Impacto:** Direciona design de níveis, balanceamento e métricas.
- **Status:** Confirmada (do documento de transferência anterior).

### Decisão 6 — Monetização inicial

- **Decisão:** Gratuito com anúncios intersticiais (Google AdMob).
- **Motivo:** Permite lançamento rápido sem barreira de pagamento.
- **Impacto:** Define necessidade de integração de SDK de anúncios na Sprint 08.
- **Status:** Confirmada (do documento de transferência anterior).

### Decisão 7 — Salvamento local apenas

- **Decisão:** Progresso salvo localmente, sem nuvem ou login.
- **Motivo:** Reduz complexidade de backend.
- **Impacto:** Define Sprint 09 como implementação de AsyncStorage/localStorage.
- **Status:** Confirmada (do documento de transferência anterior).

---

## 7. Informações importantes

| Informação | Status | Observação |
|---|---|---|
| Stack: React 19 + Vite 8 + TypeScript 6 | Confirmada | Dev server na porta 3000 |
| Porta do servidor dev | Confirmada | 3000 |
| Script de dev | Confirmada | `npm run dev` |
| Script de build | Confirmada | `npm run build` (vite build) |
| Script de typecheck | Confirmada | `npm run typecheck` (tsc --noEmit) |
| Lint configurado | Não | `npm run lint` é placeholder |
| Testes configurados | Não | `npm run test` é placeholder |
| UI_UX_GUIDE.md | Confirmada | Em `docs/design/UI_UX_GUIDE.md` |
| Tema centralizado | Confirmada | Em `src/ui/theme.ts` |
| Componentes disponíveis | Confirmada | Button, MenuScreen |
| Interfaces de dados core | Confirmada | ProgressoJogador, LvlConfig, Criatura em `src/core/` |
| Níveis mockados | Não criado ainda | Será criado na Sprint 04 Tarefa 3 |
| Componente LevelItem | Não criado ainda | Será criado na Sprint 04 Tarefa 4 |
| Componente LevelSelectionScreen | Não criado ainda | Será criado na Sprint 04 Tarefa 5 |
| Path dos docs de sprint | Confirmada | `/docs/Plano de Implementação/Sprints/` |
| O projeto está em WSL | Confirmada | Path real: `/mnt/c/Dev/lemmings-style-game/` |

---

## 8. Materiais, arquivos ou referências relevantes

| Referência | Tipo | Relevância | Status |
|---|---|---|---|
| `docs/design/UI_UX_GUIDE.md` | arquivo Markdown | Diretrizes visuais obrigatórias para toda UI | existente |
| `docs/PRD/PRD_MASTER.md` | arquivo Markdown | PRD principal com escopo do MVP | existente |
| `docs/PRD/PRD_CONSOLIDADO.md` | arquivo Markdown | Versão consolidada com especificações técnicas | existente |
| `docs/PRD/PRD_AUDITORIA_LEMMINGS.md` | arquivo Markdown | Auditoria do projeto | existente |
| `docs/PRD/PRE_PRD_ESCOPO.md` | arquivo Markdown | Pré-PRD com perguntas críticas | existente |
| `docs/Plano de Implementação/PLANO_IMPLEMENTACAO.md` | arquivo Markdown | Visão geral das 12 sprints | existente |
| `src/ui/theme.ts` | arquivo TypeScript | Tokens de estilo centralizados | existente |
| `src/ui/Button.tsx` | arquivo React | Componente de botão reutilizável | existente |
| `src/ui/MenuScreen.tsx` | arquivo React | Tela de menu inicial | existente |
| `src/core/` | diretório | Interfaces de dados (Criatura, LvlConfig, ProgressoJogador) | existente |
| `package.json` | arquivo JSON | Dependências e scripts | existente |
| `docs/Plano de Implementação/Sprints/Sprint 04 - SELECAO_NIVEL_UI/SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md` | arquivo Markdown | Tarefas da Sprint 04 quebradas em detalhe | existente |
| `docs/Plano de Implementação/Sprints/Sprint 03 - MENU_INICIAL_UI/SPRINT_03_MENU_INICIAL_UI_TAREFAS.md` | arquivo Markdown | Tarefas da Sprint 03 (já executadas) | existente |
| `docs/Plano de Implementação/Sprints/Sprint 05 - HUD_JOGO_UI/SPRINT_05_HUD_JOGO_UI.md` | arquivo Markdown | Planejamento da próxima sprint (HUD) | existente |

---

## 9. Problemas encontrados

### Problema 1 — Lint não configurado

- **Descrição:** `npm run lint` é um placeholder (`echo 'lint placeholder'`). Não há ESLint ou Prettier configurado.
- **Onde ocorreu:** Durante a Sprint 03, ao validar a tarefa 7.
- **Causa provável:** A Sprint 01 criou apenas placeholders para lint, build e test. As sprints seguintes não configuraram ferramentas reais.
- **Impacto:** Baixo para o momento, mas pode permitir degradação de qualidade de código.
- **Status atual:** Ainda ativo.
- **Observações:** Recomenda-se configurar lint antes da Sprint 10 (testes) ou na Sprint 07.

### Problema 2 — Engine final não definida

- **Descrição:** O PRD marca engine/language como "ponto de decisão". A stack atual (React + Vite) foi escolhida pragmaticamente, mas pode não ser a definitiva.
- **Onde ocorreu:** Desde o início do projeto.
- **Causa provável:** O usuário ainda não decidiu entre Godot, Cocos2d-x, ou manter React para todas as plataformas.
- **Impacto:** Médio — se a engine final for Godot, os componentes React precisarão ser recriados em GDScript.
- **Status atual:** Ainda ativo — ponto de decisão pendente.
- **Observações:** É seguro continuar com React para as telas de UI (menu, seleção, opções). O gameplay (criaturas, física) pode ser implementado em Canvas ou outra engine separada.

### Problema 3 — Testes não configurados

- **Descrição:** `npm run test` é placeholder. Nenhum framework de teste está instalado.
- **Onde ocorreu:** Previsto na Sprint 01.
- **Causa provável:** Testes foram postergados para a Sprint 10.
- **Impacto:** Baixo agora, mas será bloqueante na Sprint 10.
- **Status atual:** Ainda ativo — planejado para Sprint 10.

---

## 10. Tentativas já feitas

### Tentativa 1 — Uso de TypeScript puro sem framework de UI

- **O que foi tentado:** Manter o projeto apenas com TypeScript, sem React ou framework de UI.
- **Por que foi tentado:** O projeto original só tinha TypeScript como dependência.
- **Resultado:** Inviável — as tarefas de UI exigiam componentes visuais (.tsx) e um framework de componentes.
- **Funcionou?** Não.
- **Observação importante:** Levou à decisão de instalar React + Vite na Sprint 03.

### Tentativa 2 — Criação do UI_UX_GUIDE.md

- **O que foi tentado:** Criar um guia completo de design visual para garantir consistência.
- **Por que foi tentado:** Evitar aparência genérica de IA e garantir padrões visuais.
- **Resultado:** Guia criado com sucesso, sendo usado como referência obrigatória em todas as tarefas de UI.
- **Funcionou?** Sim.
- **Observação importante:** O guia tem sido consultado em todas as tarefas com impacto UI/UX.

### Tentativa 3 — Criação do CONTEXTO_TRANSFERENCIA anterior

- **O que foi tentado:** Criar documento de transferência no início do projeto (antes das sprints).
- **Por que foi tentado:** Garantir continuidade entre sessões.
- **Resultado:** Documento criado e salvo em `CONTEXTO_TRANSFERENCIA_PROJETO_LEMMINGS/`.
- **Funcionou?** Sim, mas está desatualizado (reflete estado pré-sprints).
- **Observação importante:** O presente documento substitui e atualiza aquele registro.

---

## 11. O que funcionou

- Definição de tokens de estilo centralizados em `theme.ts` — fácil de manter e consistente.
- Componente Button reutilizável com variants — evita duplicação.
- React + Vite como stack — rápido, tipado, com dev server integrado.
- Separação entre `src/core/` (dados) e `src/ui/` (apresentação) — arquitetura limpa.
- Quebra de sprints em tarefas pequenas com formato detalhado — cada tarefa é executável independentemente.
- UI/UX_GUIDE.md como referência obrigatória — garante consistência visual entre sprints.
- Uso de inline styles com objetos tipados — sem dependências extras de CSS.

---

## 12. O que não funcionou

- TypeScript puro sem framework de UI — inviável para criar componentes visuais .tsx.
- Placeholder de lint — sem validação real de qualidade de código.
- Placeholder de teste — sem garantia de regressão.

---

## 13. Restrições importantes

- Não mudar o objetivo principal (jogo estilo Lemmings, nostálgico + competitivo) sem autorização.
- Não alterar decisões já confirmadas (stack React, tema centralizado, Button reutilizável, dados mockados).
- Não ampliar escopo do MVP sem autorização.
- Não remover ou modificar `src/core/` interfaces de dados sem necessidade explícita.
- Não criar telas fora da ordem das sprints (Menu → Seleção → HUD → Gameplay).
- Não adicionar dependências externas sem justificativa (sem ícones de bibliotecas, sem CSS-in-JS).
- Não ignorar `docs/design/UI_UX_GUIDE.md` quando houver impacto UI/UX.
- Não tratar dados mockados como dados reais de progresso.
- Não conectar lógica de desbloqueio real antes da Sprint 09 (save system).

---

## 14. Próxima ação recomendada

### Próxima ação principal

- **Ação:** Executar a Sprint 04 — SELECAO_NIVEL_UI, seguindo o arquivo `SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md`.
- **Objetivo:** Criar a tela de seleção de níveis com 5 cards (bloqueados/desbloqueados) em grid responsivo.
- **Por que esta ação vem agora:** A Sprint 03 criou o menu inicial. A próxima tela no fluxo do jogo é a seleção de nível. O arquivo de tarefas já está detalhado.
- **Informações necessárias:** Acesso à codebase, leitura do UI_UX_GUIDE.md, conhecimento dos tokens em theme.ts.
- **Resultado esperado:** Tela de seleção de nível funcional visualmente (dados mockados), com grid responsivo mobile/desktop.
- **Risco:** Se a engine final for Godot, a tela precisará ser recriada. Risco médio.
- **Impacto UI/UX:** Sim — nova tela, novos componentes visuais.
- **Quem deve executar:** modelo econômico (modelo coder).

### Próximas ações secundárias

- **Ação:** Configurar ESLint + Prettier no projeto (pode ser feito a qualquer momento, recomendado antes da Sprint 07).
- **Ação:** Revisar a decisão da engine final com o usuário antes da Sprint 06 (lógica de gameplay/skills).

---

## 15. O que o próximo responsável NÃO deve fazer

- Não recomeçar do zero — o projeto tem estrutura, componentes e tokens definidos.
- Não ignorar as interfaces de dados em `src/core/` — elas são a base dos tipos do projeto.
- Não modificar `src/ui/theme.ts` sem necessidade (as cores e espaçamentos já seguem o UI_UX_GUIDE).
- Não modificar `src/ui/Button.tsx` — componente já validado e funcionando.
- Não modificar `src/ui/MenuScreen.tsx` — tela já concluída na Sprint 03.
- Não conectar lógica de desbloqueio real — usar apenas dados mockados (hardcoded).
- Não criar animações de desbloqueio (fora do escopo da Sprint 04).
- Não gerar sprites/ícones de nível (fora do escopo).
- Não criar navegação real entre telas (Menu → Seleção) — ainda não há roteamento definido.
- Não adicionar dependências externas (ex.: react-router, icons library) sem autorização.
- Não tratar sugestões ou hipóteses como decisões aprovadas.
- Não ignorar o `UI_UX_GUIDE.md` nas tarefas com impacto visual.
- Não assumir que o próximo responsável leu o contexto anterior — este documento é a fonte principal.

---

## 16. Dúvidas abertas

| Dúvida | Impacto | Quem deve responder |
|---|---|---|
| Qual será a engine final do jogo (React + Canvas, Godot, Cocos2d-x)? | Alto — afeta toda a arquitetura de gameplay | Humano (usuário) |
| Será necessário react-router para navegação entre telas, ou será controlado por estado? | Médio — afeta como as telas se conectam | Modelo ou humano |
| Quantos níveis exatos no MVP (5, 6, 10)? | Médio — afeta o design da tela de seleção | Humano (produto) |
| Qual SDK de anúncios será usado (AdMob vs outro)? | Médio — afeta Sprint 08 | Humano |
| Quando será tomada a decisão sobre engine (antes ou depois das telas de UI)? | Alto — risco de retrabalho | Humano |

---

## 17. Sugestões fora do escopo

Nenhuma sugestão fora do escopo registrada.

---

## 18. Resumo executivo para continuidade

O projeto lemmings-style-game está em desenvolvimento ativo usando React 19 + Vite 8 + TypeScript 6. As Sprints 00 a 03 foram concluídas: estrutura de pastas, interfaces de dados (`src/core/`), tema centralizado (`src/ui/theme.ts`), componente Button reutilizável, e tela de menu inicial com botões "Jogar" e "Opções". A Sprint 04 (seleção de nível) está planejada em detalhes no arquivo `SPRINT_04_SELECAO_NIVEL_UI_TAREFAS.md`, mas ainda não foi executada. O UI_UX_GUIDE.md é obrigatório em todas as tarefas visuais. A engine final (React vs Godot vs Cocos2d-x) ainda é ponto de decisão. O lint e testes ainda são placeholders. A próxima ação é executar a Sprint 04 para criar a tela de seleção de níveis com dados mockados.
