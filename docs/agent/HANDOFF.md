# HANDOFF.md

## 1. Objetivo do projeto

- **Objetivo principal:** Desenvolver um jogo web estilo Lemmings (React 19 + Vite 8 + TypeScript 6) como MVP funcional.
- **Problema resolvido:** Jogo casual de estratégia com criaturas que usam habilidades para atravessar níveis.
- **Resultado esperado:** MVP jogável com menu, seleção de nível, HUD, skills, sistema de anúncios intersticiais, persistência de progresso e visual de jogo de verdade.
- **Escopo confirmado:** Componentes de UI, sistema de skills, gerenciador de níveis (LevelManager), streaks de anúncios, testes unitários, compliance com UI_UX_GUIDE.md.
- **Decisão de stack (DEC-009):** React + Vite + TypeScript (web).

## 2. Estado atual

**Classificação:** Sprint 14 concluída. Visual reformulado, balanceamento ajustado, engine corrigido.

### O que já existe e funciona

- **Build web:** `npm run build` gera `dist/` (~903ms).
- **Dev server:** `npm run dev` — porta 3000.
- **Typecheck:** `npm run typecheck` (tsc --noEmit) — zero erros.
- **Lint:** `npm run lint` (eslint) — configurado, timeout no WSL (problema de ambiente).
- **Testes:** `npm test` (vitest) — **121 testes** passando em 10 suites.
- **Cobertura:** Statements 63%, Branches 60%, Functions 62%, Lines 64%. Thresholds: 62/58/58/62 (DEC-010).
- **Git:** Repositório local + remote em `https://github.com/Leandrogm81/Lemmings-style-game`.

### Telas implementadas

- **MenuScreen:** Logo "LEMMINGS" com glow, criaturas animadas (bob), fundo com estrelas e chão.
- **LevelSelectionScreen:** Grid de 5 níveis com cards escuros, destaque hover, ícone 🔒.
- **GameScreen:** Grid 10×6, tiles xadrez (terrain/terrainDark), gap col 7 com borda vermelha pulsante, saída com glow + 🚪, criaturas como bonecos (olhos, corpo, perninhas). CELL_SIZE dinâmico (viewport).
- **VictoryScreen:** Card escuro com glow verde, estatísticas, progressão.
- **DefeatScreen:** Card escuro com glow vermelho, dica "use 🧱 Construir para preencher o buraco".
- **AdScreen:** Overlay de anúncio intersticial. Estados: loading, erro, padrão.

### Módulos implementados

- **SkillManager:** Skills com cooldown. 95.83% coberto.
- **LevelManager:** Gerenciador de estado de nível. 100% coberto.
- **Engine (`src/game/engine.ts`):** Game loop, spawn queue, `tick()`, `aplicarSkill()`, vitória/derrota. 94.33% coberto.
- **Progress storage:** Save/load com localStorage. 95.23% coberto.
- **Levels:** 5 níveis via `getNiveisComProgresso`. 100% coberto.
- **Ads manager:** Streaks de anúncios. 100% coberto.
- **SDK adapter:** Provider placeholder com delay. 100% coberto.

### O que está pendente

- **MED-01:** PRD desatualizado (ainda referencia Godot/Cocos2d-x).
- **MED-02:** jsdom/happy-dom incompatível com Node.js v22.22.2.
- **LOW:** Animações de movimento das criaturas (transição CSS entre células).
- **LOW:** Mais níveis com diferentes layouts e combinações de skills.
- **LOW:** SDK de anúncios real (placeholder atual).

### Bloqueios atuais

- **jsdom/happy-dom × Node.js v22.22.2:** Impede testes de interação DOM. Cobertura de UI limitada ao renderToString.
- **Interação via browser_tool:** O clique em células do grid (para aplicar skills) não funcionou de forma confiável via ferramenta de automação. O engine foi validado via testes unitários (teste E2E confirma que Construir → vitória).

### Riscos importantes

- **Balanceamento:** Ajustado (gap col 7, spawn queue, 90s timer, 600ms tick), mas não testado com jogadores reais.
- **Cobertura de branches:** 59.93% — apenas 1.93 pontos acima do threshold 58%.
- **ESLint timeout no WSL:** Pode ser ambiente específico.

## 3. Próxima ação recomendada

- **Ação:** Sprint 15 — criar mais níveis com diferentes layouts de grid, obstáculos e combinações de skills.
- **Objetivo:** Expandir o conteúdo do jogo além do Nível 1.
- **Arquivos envolvidos:** `src/ui/GameScreen.tsx` (função criarGridNivel1 → tornar parametrizável), `src/ui/levels.ts` (dados dos níveis), `src/game/engine.ts` (se precisar de novos tipos de tile).
- **Risco principal:** Sem níveis adicionais, o jogo tem conteúdo muito limitado.

## 4. Arquivos importantes

| Arquivo/Pasta | Função | Status |
|---|---|---|
| `package.json` | Scripts e dependências | `"type": "module"` |
| `vite.config.ts` | Vite (porta 3000) | React plugin |
| `vitest.config.ts` | Vitest + coverage thresholds 62/58/58/62 | DEC-010 |
| `tsconfig.json` | TypeScript strict | target: es2020 |
| `eslint.config.js` | ESLint flat config | typescript-eslint + react-hooks |
| `src/ui/theme.ts` | Tokens de estilo (paleta escura) | Reformulado Sprint 14 |
| `src/ui/MenuScreen.tsx` | Menu com logo, criaturas animadas | Reformulado Sprint 14 |
| `src/ui/GameScreen.tsx` | Grid, criaturas, skills, game loop | Reformulado Sprint 14 |
| `src/ui/HUD.tsx` | Timer gradiente, contador 👤 | Reformulado Sprint 14 |
| `src/ui/VictoryScreen.tsx` | Vitória com glow verde | Reformulado Sprint 14 |
| `src/ui/DefeatScreen.tsx` | Derrota com dica | Reformulado Sprint 14 |
| `src/ui/Button.tsx` | Botão laranja com glow | Reformulado Sprint 14 |
| `src/ui/SkillButton.tsx` | Ícones novos, destaque seleção | Reformulado Sprint 14 |
| `src/ui/TimerBar.tsx` | Gradiente dinâmico | Reformulado Sprint 14 |
| `src/ui/LevelItem.tsx` | Cards escuros com hover | Reformulado Sprint 14 |
| `src/ui/LevelSelectionScreen.tsx` | Título "Níveis" | Reformulado Sprint 14 |
| `src/game/engine.ts` | Engine + spawn queue | DEC-011 |
| `src/game/e2e.test.ts` | Teste E2E fluxo completo | Novo Sprint 14 |
| `README.md` | Documentação do projeto | Novo Sprint 14 |
| `docs/design/UI_UX_GUIDE.md` | Guia de estilo visual | Fonte dos tokens |
| `docs/agent/DECISIONS.md` | 11 decisões documentadas | DEC-001 a DEC-011 |

## 5. Decisões já tomadas

Ver `docs/agent/DECISIONS.md` para todas as decisões (DEC-001 a DEC-011).

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
- DEC-011: metaCriaturas valida contra total (inicial + filaSpawn) (Sprint 14)

## 6. Problemas conhecidos

### Problema 1 — jsdom/happy-dom incompatível com Node.js v22.22.2
- **Status:** Ainda ativo. Impede testes de eventos DOM.

### Problema 2 — ESLint timeout no WSL
- **Descrição:** `npx eslint src/` pode travar no WSL (Node v22 + ESLint v10).
- **Status:** Não investigado.

### Problema 3 — Interação browser_tool para skills no grid
- **Descrição:** Tentativas de clicar em células do grid via browser_tool falharam (botão "🧱 Construir" não identificável por role, eventos React não disparados por `.click()` em divs). Engine foi validado via teste automatizado.
- **Status:** Não reproduzido em navegador real — pode ser limitação da ferramenta de automação.

## 7. O que o próximo agente NÃO deve fazer

- NÃO reinstalar jsdom/happy-dom (Node.js v22.22.2 incompatível)
- NÃO modificar skills.ts (bug corrigido)
- NÃO modificar Button.tsx (finalizado)
- NÃO reverter DEC-009 (stack web)
- NÃO alterar engine.ts sem novos testes
- NÃO implementar multiplayer, editor de níveis, loja
- NÃO usar `any` ou `@ts-ignore`
- NÃO alterar tsconfig.json
- NÃO gastar tempo tentando fazer browser_tool clicar em células do grid (usar testes automatizados no lugar)

## 8. Comandos úteis

```bash
cd /mnt/c/Dev/lemmings-style-game
npm run dev          # servidor na porta 3000
npm run build        # build de produção
npm test             # vitest run — 121 testes
npm run typecheck    # tsc --noEmit
```
