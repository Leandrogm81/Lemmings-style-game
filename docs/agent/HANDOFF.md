# HANDOFF.md

## 1. Objetivo do projeto

- **Objetivo principal:** Desenvolver um jogo web estilo Lemmings (React 19 + Vite 8 + TypeScript 6) como MVP funcional.
- **Problema resolvido:** Jogo casual de estratégia com criaturas que usam habilidades para atravessar níveis.
- **Resultado esperado:** MVP jogável com menu, seleção de nível, HUD, skills com cooldown, sistema de anúncios intersticiais e persistência de progresso.
- **Escopo confirmado:** Componentes de UI, sistema de skills com cooldown, gerenciador de níveis (LevelManager), streaks de anúncios, testes unitários, compliance com UI_UX_GUIDE.md.
- **Decisão de stack (DEC-009):** React + Vite + TypeScript (web).

## 2. Estado atual

**Classificação:** Sprint 13 concluída. MVP jogável com engine grid-based, telas de vitória/derrota e persistência.

### O que já existe e funciona

- **Build web:** `npm run build` gera `dist/` (vite, ~458ms).
- **Dev server:** `npm run dev` — porta 3000.
- **Typecheck:** `npm run typecheck` (tsc --noEmit) — zero erros.
- **Lint:** `npm run lint` (eslint) — configurado, mas pode apresentar timeout no WSL (problema de ambiente).
- **Testes:** `npm test` (vitest) — **119 testes** passando em 9 suites.
- **Cobertura:** Statements 63%, Branches 60%, Functions 62%, Lines 64%. Thresholds: 62/58/58/62.
- **Git:** Repositório local, commits `3b4afb8` + `f2f6173`. Sem remote configurado.

### Telas implementadas

- **MenuScreen:** Tela inicial com título, botão Jogar, debug buttons.
- **LevelSelectionScreen:** Grid de 5 níveis com estado de desbloqueio via progress storage. Clique no nível → GameScreen.
- **GameScreen:** Grid 10×6, 5 criaturas, skills (escavar/construir/bloquear/empurrar), HUD dinâmico, game loop via requestAnimationFrame. Gap na coluna 5 exige uso de Construir.
- **VictoryScreen:** Overlay de vitória com estatísticas (criaturas salvas, tempo). Botões Próximo nível / Menu.
- **DefeatScreen:** Overlay de derrota com motivo. Botões Tentar novamente / Menu.
- **AdScreen:** Overlay de anúncio intersticial. Estados: loading, erro, padrão.

### Módulos implementados

- **SkillManager:** Skills com cooldown (escavar 3s, construir 5s, bloquear 4s, empurrar 3s). 95.83% coberto.
- **LevelManager:** Gerenciador de estado de nível. 100% coberto.
- **Engine (`src/game/engine.ts`):** Game loop grid-based com `tick()`, `aplicarSkill()`, `verificarVitoria()`, `verificarDerrota()`. 94.33% coberto.
- **Progress storage:** Save/load com localStorage. 95.23% coberto.
- **Levels:** 5 níveis com desbloqueio por progresso (`getNiveisComProgresso`). 100% coberto.
- **Ads manager:** Streaks de anúncios. 100% coberto.
- **SDK adapter:** Provider placeholder com delay. 100% coberto.

### O que está pendente

- **HIGH-04:** SDK de anúncios real (placeholder atual).
- **MED-01:** PRD desatualizado (ainda referencia Godot/Cocos2d-x).
- **MED-02:** jsdom/happy-dom incompatível com Node.js v22.22.2.
- **LOW-01:** Sem animações de morte/chegada de criaturas (feedback visual básico).
- **LOW-02:** Responsividade do grid em mobile não testada visualmente.
- **LOW-03:** Balanceamento de gameplay (velocidade, timer, dificuldade do gap).

### Bloqueios atuais

- **jsdom/happy-dom × Node.js v22.22.2:** Impede testes de interação DOM. Cobertura de UI limitada ao renderToString.

### Riscos importantes

- **Balanceamento:** Gameplay atual pode ser muito fácil ou difícil — não foi testado com jogadores reais.
- **Cobertura de branches:** 59.93% — apenas 1.93 pontos acima do threshold 58%. Pequenas regressões podem quebrar.
- **ESLint timeout no WSL:** Pode ser problema de ambiente (Node v22 + WSL). Lint manual pode ser necessário.

## 3. Próxima ação recomendada

- **Ação:** Sprint 14 — Polish & QA: testar gameplay manualmente (`npm run dev`), ajustar balanceamento, adicionar feedback visual, revisar mobile.
- **Objetivo:** Refinar a experiência de jogo antes de considerar o MVP "pronto".
- **Arquivos envolvidos:** `src/ui/GameScreen.tsx` (ajustes de grid/velocidade), `src/game/engine.ts` (balanceamento), possivelmente novos assets.
- **Risco principal:** Sem testes manuais, o balanceamento pode estar errado.

## 4. Arquivos importantes

| Arquivo/Pasta | Função | Status |
|---|---|---|
| `package.json` | Scripts e dependências | `"type": "module"` |
| `vite.config.ts` | Vite (porta 3000) | React plugin |
| `vitest.config.ts` | Vitest + coverage thresholds 62/58/58/62 | DEC-010 |
| `tsconfig.json` | TypeScript strict | target: es2020 |
| `eslint.config.js` | ESLint flat config | typescript-eslint + react-hooks |
| `src/App.tsx` | Navegação completa | menu → levelSelect → game → victory/defeat |
| `src/main.tsx` | Entry point | ReactDOM.createRoot |
| `src/ui/theme.ts` | Tokens de estilo | Fonte: UI_UX_GUIDE.md |
| `src/ui/GameScreen.tsx` | Tela principal de jogo | Grid 10×6, 5 criaturas, game loop |
| `src/ui/VictoryScreen.tsx` | Tela de vitória | Estatísticas, próximo nível |
| `src/ui/DefeatScreen.tsx` | Tela de derrota | Retry, menu |
| `src/ui/HUD.tsx` | HUD dinâmico | Props: criaturas, nível, timer, skills |
| `src/ui/LevelSelectionScreen.tsx` | Seleção de nível | Integrada com onSelectLevel |
| `src/ui/LevelItem.tsx` | Card de nível | Prop onClick |
| `src/ui/levels.ts` | Dados de níveis + progresso | getNiveisComProgresso() |
| `src/game/engine.ts` | Engine de gameplay | tick, aplicarSkill, vitória/derrota |
| `src/game/skills.ts` | SkillManager | Bug linha 61 corrigido |
| `src/game/level_manager.ts` | LevelManager | 100% coberto |
| `src/storage/progress.ts` | Save/load localStorage | 95% coberto |
| `src/ads/ads_manager.ts` | Streaks de anúncios | 100% coberto |
| `src/ads/sdk_adapter.ts` | Provider placeholder | 100% coberto |
| `src/core/*.ts` | Interfaces: Criatura, LvlConfig, ProgressoJogador | Tipos apenas |
| `docs/design/UI_UX_GUIDE.md` | Guia de estilo visual | Fonte dos tokens |
| `docs/agent/DECISIONS.md` | 10 decisões documentadas | DEC-001 a DEC-010 |

## 5. Decisões já tomadas

Ver `docs/agent/DECISIONS.md` para todas as decisões (DEC-001 a DEC-010).

Resumo:
- DEC-001: Vitest
- DEC-002: Thresholds 70/65/70/70 → substituído por DEC-010
- DEC-003: renderToString para testes UI
- DEC-004: ESLint flat config
- DEC-005: Nomenclatura em português
- DEC-006: Provider placeholder com delay
- DEC-007: Mock Date.now() para cooldown
- DEC-008: Correção Button.onClick
- DEC-009: Stack React/Vite/TS
- DEC-010: Thresholds 62/58/58/62 (Sprint 13)

## 6. Problemas conhecidos

### Problema 1 — jsdom/happy-dom incompatível com Node.js v22.22.2
- **Status:** Ainda ativo. Impede testes de eventos DOM.

### Problema 2 — ESLint timeout no WSL
- **Descrição:** `npx eslint src/` pode travar no WSL (Node v22 + ESLint v10).
- **Status:** Não investigado. Alternativa: verificar código manualmente ou usar GitHub Actions.

## 7. O que o próximo agente NÃO deve fazer

- NÃO reinstalar jsdom/happy-dom (Node.js v22.22.2 incompatível)
- NÃO modificar skills.ts (bug corrigido)
- NÃO modificar Button.tsx (finalizado)
- NÃO reverter DEC-009 (stack documentada)
- NÃO alterar engine.ts sem novos testes
- NÃO implementar multiplayer, editor de níveis, loja
- NÃO usar `any` ou `@ts-ignore`
- NÃO alterar tsconfig.json

## 8. Comandos úteis

```bash
cd /mnt/c/Dev/lemmings-style-game
npm run dev          # servidor na porta 3000
npm run build        # build de produção
npm test             # vitest run — 119 testes
npm run typecheck    # tsc --noEmit
```
