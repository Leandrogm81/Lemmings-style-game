# AUDIT_EVIDENCE.md

## 1. Identificação

- **Projeto:** Lemmings Style Game
- **Data:** 2026-05-24
- **Auditoria preparada por:** Hermes Agent (sessão de continuidade + Sprint 12)
- **Origem das evidências:** 
  - Execução direta de comandos (lint, typecheck, testes, build, coverage)
  - Inspeção de código via browser snapshots (MenuScreen, LevelSelectionScreen, AdScreen)
  - Arquivos de continuidade (`HANDOFF.md`, `CURRENT_STATE.md`, `DECISIONS.md`, `CHANGELOG.md`)
  - PRDs (`PRD_MASTER.md`, `PRD_CONSOLIDADO.md`, `PRD_AUDITORIA_LEMMINGS.md`)
  - Plano de implementação (`PLANO_IMPLEMENTACAO.md`, 12 sprints documentadas)
  - Relatórios de auditoria (`auditoria/` — 8 arquivos)
- **Estado geral:** MVP como "shell navegável" — UI, navegação, anúncios e testes sólidos. Gameplay (engine) não implementado. Arquiteura divergente do plano original (React web em vez de Godot/Cocos2d-x).

---

## 2. Resumo do que foi implementado

| Item implementado | Requisito relacionado | Evidência | Status |
|---|---|---|---|
| MenuScreen com botões Jogar/Opções | PRD Tela 1 — Menu inicial | Browser snapshot + `src/ui/MenuScreen.tsx` | Confirmado |
| LevelSelectionScreen com 5 níveis (2 desbloq.) | PRD Tela 2 — Seleção de nível | Browser snapshot + `src/ui/LevelSelectionScreen.tsx` | Confirmado |
| Button com variantes primary/secondary | PRD — Botões UI/UX (#1D4ED8) | `src/ui/Button.tsx` + teste de componente | Confirmado |
| HUD com TimerBar + 4 SkillButtons | PRD Tela 3 — Gameplay/HUD | `src/ui/HUD.tsx` (não integrado ao App) | Parcial |
| SkillManager com cooldown (4 skills) | PRD — Habilidades especiais | `src/game/skills.ts` + 13 testes (95.74% coberto) | Confirmado |
| LevelManager com restart | PRD — Reinício rápido | `src/game/level_manager.ts` + 4 testes (100% coberto) | Confirmado |
| AdScreen com loading/erro/default | PRD Tela 6 — Anúncio intersticial | Browser snapshot confirmado + `src/ui/AdScreen.tsx` | Confirmado |
| ads_manager com streaks (2 vitórias/3 derrotas) | PRD — Regra de anúncios | `src/ads/ads_manager.ts` + 8 testes (100% coberto) | Confirmado |
| sdk_adapter com provider placeholder | PRD — SDK de anúncios | `src/ads/sdk_adapter.ts` + 7 testes (100% coberto) | Confirmado |
| save/load com localStorage | PRD — Salvamento local | `src/storage/progress.ts` + 6 testes (95% coberto) | Confirmado |
| Níveis mockados (5 níveis) | PRD — Dados de nível | `src/ui/levels.ts` | Confirmado |
| Tipos core (Criatura, LvlConfig, ProgressoJogador) | PRD — Entidades | `src/core/*.ts` | Confirmado |
| Tokens de tema (cores, spacing, fontes) | PRD — UI_UX_GUIDE | `src/ui/theme.ts` + 8 testes (100% coberto) | Confirmado |
| ESLint flat config | Plano — Qualidade de código | `eslint.config.js`, `npm run lint` → zero warnings | Confirmado |
| Vitest com 70 testes | PRD — Cobertura ≥ 80% | `npx vitest run` → 70/70 passando | Confirmado |
| Cobertura 74/68/76/75 | PRD — Cobertura ≥ 80% | `npx vitest run --coverage` | Parcial (abaixo da meta) |
| Build de produção (vite) | Plano — Build | `npm run build` → 367ms, dist/ OK | Confirmado |
| GameScreen / engine do jogo | PRD — Gameplay (moveCreatures, checkVictory) | **Não existe.** `App.tsx` case `'game'` retorna null | Não implementado |
| Movimentação de criaturas | PRD — Controle de grupo | `moveCreatures` não existe | Não implementado |
| Detecção de vitória/derrota | PRD — Feedback | `checkVictory` não existe | Não implementado |
| Pixel art (32×32 sprites) | PRD — Arte | `assets/art/` — não verificado (não acessado) | Não verificado |
| Builds mobile/desktop (iOS/Android/PC) | PRD — Plataformas | Projeto web-only (Vite). Sem Capacitor/Cordova | Fora de escopo real |
| Google AdMob SDK real | PRD — Monetização | Placeholder com delay simulado (SIMULATED_DELAY_MS = 1500) | Parcial |

---

## 3. Arquivos alterados

| Arquivo | Tipo de alteração | Relevância | Evidência |
|---|---|---|---|
| `package.json` | Criado | Stack: React 19 + Vite 8 + TS 6 + Vitest 4.1.7 | Leitura direta |
| `eslint.config.js` | Criado | ESLint flat config com typescript-eslint + react-hooks | Sprint 11 |
| `vite.config.ts` | Criado | Config Vite, porta 3000 | Leitura em HANDOFF |
| `vitest.config.ts` | Criado | Thresholds: 70/65/70/70 | Leitura em HANDOFF/DECISIONS |
| `tsconfig.json` | Criado | strict: true | Leitura em HANDOFF |
| `src/App.tsx` | Criado/Alterado | Navegação: menu ↔ levelSelect. Sem case 'game' | Leitura direta; alterado na continuidade |
| `src/main.tsx` | Criado | Entry point React | HANDOFF |
| `src/ui/theme.ts` | Criado | Tokens de estilo conforme UI_UX_GUIDE | Leitura direta |
| `src/ui/Button.tsx` | Criado/Alterado | onClick corrigido na continuidade (bug) | Leitura direta + patch |
| `src/ui/MenuScreen.tsx` | Criado | Tela inicial com debug buttons | Leitura via HANDOFF |
| `src/ui/LevelSelectionScreen.tsx` | Criado/Alterado | Integrado ao App.tsx + prop onBack | Leitura direta + patch |
| `src/ui/LevelItem.tsx` | Criado | Card de nível com distinção bloqueado/desbloqueado | Leitura direta |
| `src/ui/HUD.tsx` | Criado | HUD com TimerBar + 4 SkillButtons | HANDOFF |
| `src/ui/TimerBar.tsx` | Criado | Barra de progresso do timer | HANDOFF |
| `src/ui/SkillButton.tsx` | Criado | Botão de skill com emoji | HANDOFF |
| `src/ui/AdScreen.tsx` | Criado | Overlay de anúncio com 3 estados | Leitura direta |
| `src/ui/levels.ts` | Criado | Dados mockados de 5 níveis | Leitura direta |
| `src/ads/ads_manager.ts` | Criado | Streaks de vitória/derrota | HANDOFF |
| `src/ads/sdk_adapter.ts` | Criado/Alterado | Provider placeholder; _timeoutMs corrigido | HANDOFF |
| `src/game/skills.ts` | Criado | SkillManager com cooldown (bug linha 61) | Leitura direta |
| `src/game/level_manager.ts` | Criado | Gerenciador de estado de nível | HANDOFF |
| `src/storage/progress.ts` | Criado | Save/load localStorage | HANDOFF |
| `src/core/criatura.ts` | Criado | Interface Criatura | HANDOFF |
| `src/core/lvl_config.ts` | Criado | Interface LvlConfig | HANDOFF |
| `src/core/progresso_jogador.ts` | Criado | Interface ProgressoJogador | HANDOFF |
| `src/game/skills.test.ts` | Criado | 13 testes SkillManager | Execução de testes |
| `src/game/level_manager.test.ts` | Criado | 4 testes LevelManager | Execução de testes |
| `src/ads/ads_manager.test.ts` | Criado | 8 testes ads_manager | Execução de testes |
| `src/ads/sdk_adapter.test.ts` | Criado | 7 testes sdk_adapter | Execução de testes |
| `src/storage/__tests__/progress.test.ts` | Criado | 6 testes progress | Execução de testes |
| `src/ui/components.test.tsx` | Criado | 19 testes de componentes (renderToString) | Execução de testes |
| `src/ui/theme.test.ts` | Criado | 8 testes de tokens | Execução de testes |
| `src/ui/levels.test.ts` | Criado | 5 testes de dados de níveis | Execução de testes |
| `auditoria/` (8 arquivos) | Criado | Relatórios Sprints 11 e 12 | Listagem de diretório |
| `docs/agent/` (4 arquivos) | Criado | HANDOFF, CURRENT_STATE, DECISIONS, CHANGELOG | Leitura direta |
| `docs/design/UI_UX_GUIDE.md` | Criado | Guia de estilo visual (576 linhas) | Leitura direta |

---

## 4. Commits relevantes

**Nenhum commit informado ou acessível.** O projeto não possui repositório git (`.git/` não existe). Confirmado via `git log` → `fatal: not a git repository`.

---

## 5. Evidências de build

| Comando | Resultado | Evidência | Status |
|---|---|---|---|
| `npm run build` | Sucesso | `vite v8.0.14 building... ✓ built in 367ms` — `dist/index.html` (0.33 kB) + `dist/assets/index-DjWzOCmj.js` (198.58 kB, gzip 62.68 kB) | Confirmado |
| `npm run preview` | Sucesso | http://localhost:4173 carrega sem erros de console (0 js_errors). MenuScreen renderizada corretamente | Confirmado |
| `npm run dev` | Sucesso | http://localhost:3000 funcional. Navegação menu → levelSelect → AdScreen confirmada via browser snapshots | Confirmado |

---

## 6. Evidências de testes

| Tipo de teste | O que foi testado | Resultado | Evidência | Status |
|---|---|---|---|---|
| Lint (ESLint) | Todos os arquivos `src/` | Sucesso — zero warnings | `eslint src/` → exit 0, sem output | Confirmado |
| Typecheck (tsc) | Todos os arquivos TypeScript | Sucesso — zero erros | `tsc --noEmit` → exit 0, sem output | Confirmado |
| Unitário (Vitest) | `skills.test.ts` — 13 testes | Sucesso — 13/13 | `npx vitest run` output: ✓ 13 tests | Confirmado |
| Unitário (Vitest) | `ads_manager.test.ts` — 8 testes | Sucesso — 8/8 | `npx vitest run` output: ✓ 8 tests | Confirmado |
| Unitário (Vitest) | `level_manager.test.ts` — 4 testes | Sucesso — 4/4 | `npx vitest run` output: ✓ 4 tests | Confirmado |
| Unitário (Vitest) | `sdk_adapter.test.ts` — 7 testes | Sucesso — 7/7 | `npx vitest run` output: ✓ 7 tests (1.5s) | Confirmado |
| Unitário (Vitest) | `progress.test.ts` — 6 testes | Sucesso — 6/6 | `npx vitest run` output: ✓ 6 tests | Confirmado |
| Unitário (Vitest) | `theme.test.ts` — 8 testes | Sucesso — 8/8 | `npx vitest run` output: ✓ 8 tests | Confirmado |
| Unitário (Vitest) | `levels.test.ts` — 5 testes | Sucesso — 5/5 | `npx vitest run` output: ✓ 5 tests | Confirmado |
| Componente (renderToString) | `components.test.tsx` — 19 testes | Sucesso — 19/19 | `npx vitest run` output: ✓ 19 tests | Confirmado |
| Cobertura | Global — 70 testes | 74.34/68.86/76.66/75.34 | `npx vitest run --coverage` output | Confirmado |
| Manual — Navegação | Menu → LevelSelection → Menu | Sucesso | Browser snapshots: ambas as telas renderizam | Confirmado |
| Manual — AdScreen | 2× Debug Win → AdScreen → Fechar | Sucesso | Browser snapshot: AdScreen aparece e fecha | Confirmado |
| Manual — Gameplay | Jogar nível, mover criaturas, vencer/perder | Não executável | GameScreen não existe | Não verificado |

---

## 7. Evidências visuais ou funcionais

| Evidência | Tipo | O que comprova | Status |
|---|---|---|---|
| Browser snapshot — MenuScreen | Observação | Título "Lemmings", botões "Jogar", "Opções", "[Debug] Vitória", "[Debug] Derrota" visíveis | Confirmado |
| Browser snapshot — LevelSelectionScreen | Observação | Título "Selecionar Nível", botão "← Voltar", 5 níveis: Nível 1-2 "Disponível", Nível 3-5 "Bloqueado" | Confirmado |
| Browser snapshot — AdScreen | Observação | Overlay com "Anúncio", placeholder, botão "Sair agora" funcional (fecha overlay) | Confirmado |
| Browser snapshot — Preview build | Observação | Build de produção carrega em http://localhost:4173, zero erros de console | Confirmado |
| Auditoria UI/UX Sprint 12 | Relatório | 0 críticas, 2 médias, 3 sugestões. Alta conformidade com UI_UX_GUIDE | Confirmado |
| Teste manual Sprint 12 | Relatório | 8 etapas testadas. Navegação OK. Gameplay não implementado | Confirmado |
| Cobertura Sprint 12 | Relatório | 74.34% statements — abaixo da meta de 80% | Confirmado |

---

## 8. Funcionalidades fora de escopo identificadas

| Item fora de escopo | Evidência | Risco | Recomendação |
|---|---|---|---|
| Stack React + Vite + TypeScript (web) em vez de Godot/Cocos2d-x | PRD e Plano especificam engine 2D (Godot ou Cocos2d-x). Projeto real é React web app | Alto | Validar com stakeholders — decisão arquitetural divergente do PRD |
| Placeholder de SDK de anúncios (sem AdMob real) | PRD especifica Google AdMob. Código usa `SIMULATED_DELAY_MS = 1500` | Médio | Integrar SDK real antes de release |
| Níveis mockados fixos (sem progressão real) | PRD especifica save/load de progresso. Dados são hardcoded em `levels.ts` | Médio | Conectar `storage/progress.ts` aos níveis |
| Sem assets de pixel art | PRD especifica pixel art 32×32 em `assets/art/`. Pasta não verificada | Baixo | Verificar existência de assets |
| Debug buttons no MenuScreen | `[Debug] Vitória` e `[Debug] Derrota` — aparência técnica, não planejados no PRD | Baixo | Remover antes de release |
| jsdom/happy-dom instalados mas não funcionais | `package.json` contém jsdom e happy-dom. Ambos congelam em Node v22.22.2 | Baixo | Remover ou resolver incompatibilidade |

---

## 9. Pendências conhecidas

| Pendência | Impacto | Evidência | Prioridade |
|---|---|---|---|
| GameScreen / engine não implementada | Jogo não é jogável — apenas navegação funciona | `App.tsx` case `'game'` retorna null. HANDOFF documenta lacuna | Crítica |
| `moveCreatures` não existe | Sem movimentação de criaturas | HANDOFF — documentado como lacuna desde Sprint 10 | Crítica |
| `checkVictory` não existe | Sem feedback de vitória/derrota | HANDOFF — documentado como lacuna desde Sprint 10 | Crítica |
| Persistência não integrada aos níveis | Progresso não é salvo/carregado na UI | `storage/progress.ts` existe mas não conectado ao `levels.ts` | Alta |
| jsdom incompatível com Node v22.22.2 | Impede testes de eventos DOM. Cobertura travada em ~74% | Teste `new JSDOM()` congela. DEC-002 documenta | Alta |
| Bug `skills.ts` linha 61 — SKILL_DEFINITIONS global | Skills customizadas não funcionam | Código usa array global em vez do parâmetro do construtor | Média |
| HUD não integrado ao App.tsx | Componente existe mas não é renderizado em nenhum fluxo | `HUD.tsx` presente, sem import no App.tsx | Média |
| Sem repositório git | Sem histórico de alterações, commits ou diff rastreável | `git log` → fatal: not a git repository | Média |
| Build apenas web (sem iOS/Android/PC) | PRD especifica builds mobile e desktop | Projeto é Vite web-only. Sem Capacitor/Cordova/Electron | Média |
| Cobertura abaixo de 80% | PRD exige ≥ 80%. Real: 74.34% | `npx vitest run --coverage` | Média |
| Button sem estado disabled | Acessibilidade e UX comprometidas | `Button.tsx` não tem prop `disabled` | Baixa |
| Arte pixel art não verificada | PRD especifica pixel art em `assets/art/` | Pasta não acessada nesta auditoria | Não verificado |

---

## 10. Itens não verificados

| Item | Motivo da não verificação | Impacto na auditoria |
|---|---|---|
| Assets de pixel art (`assets/art/`) | Pasta não listada/examinada. Projeto é React web — assets podem não existir | Baixo — arte não bloqueia validação funcional |
| Google AdMob SDK real | Placeholder simulado. Não há chave de API ou integração real | Médio — monetização não funcional |
| Builds iOS/Android/PC | Projeto web-only. Sem configuração de export mobile | Alto — divergência do PRD |
| Performance 60 FPS | Sem game loop para medir. Engine não implementada | Alto — impossível medir sem gameplay |
| Testes de evento DOM (hover, click) | jsdom incompatível. Testes usam renderToString sem eventos | Médio — handlers de mouse não cobertos |
| Salvamento cross-session real | Módulo existe mas não integrado. Sem teste end-to-end | Médio — persistência não validada |

---

## 11. Resumo executivo para auditoria

**O que foi implementado:** Um "shell" de jogo web com React 19 + Vite 8 + TypeScript 6. Contém menu inicial, seleção de nível (5 níveis mockados), HUD (não integrado), sistema de skills com cooldown (4 skills), gerenciador de nível com restart, sistema de anúncios com streaks (2 vitórias/3 derrotas), AdScreen com 3 estados (loading/erro/default), salvamento local com localStorage, tokens de tema conforme UI_UX_GUIDE, ESLint, TypeScript strict, e 70 testes automatizados.

**Evidências existentes:** Execução de lint (zero warnings), typecheck (zero erros), testes (70/70 passando), cobertura (74.34%), build (367ms, preview funcional), browser snapshots de 3 telas, 8 relatórios de auditoria em `auditoria/`, 4 arquivos de continuidade em `docs/agent/`.

**Evidências faltantes:** Commits git (repositório não inicializado), testes de gameplay (engine não implementada), integração real de AdMob (placeholder), builds mobile/desktop (web-only), assets de pixel art (não verificados), persistência integrada ao fluxo de jogo.

**Riscos já visíveis:** (1) Arquiteura divergente do PRD — React web em vez de Godot/Cocos2d-x; (2) Jogo não jogável — faltam moveCreatures, checkVictory e GameScreen; (3) Cobertura 74% vs meta 80%; (4) jsdom quebrado bloqueia testes DOM; (5) Sem git para rastrear alterações.

**Pronto para auditoria final?** Parcialmente. A fundação de UI, navegação, testes e qualidade de código está sólida. A lacuna central é a engine de gameplay — sem ela, o produto não é um jogo. A divergência de stack (React web vs game engine) é uma decisão arquitetural que precisa de validação contra o PRD original.
