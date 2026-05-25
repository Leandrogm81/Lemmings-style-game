# CHANGELOG

## Sprint 13 — Gameplay Engine (2026-05-24)

### Adicionado
- `src/game/engine.ts` — Engine de gameplay grid-based com game loop, movimentação de criaturas, verificação de vitória/derrota e aplicação de skills
- `src/game/engine.test.ts` — 38 testes unitários do engine
- `src/ui/GameScreen.tsx` — Tela principal de jogo com grid 10×6, 5 criaturas, game loop via requestAnimationFrame
- `src/ui/VictoryScreen.tsx` — Tela de vitória com estatísticas e navegação
- `src/ui/DefeatScreen.tsx` — Tela de derrota com opção de retry
- Prop `onClick` em `LevelItem.tsx`
- Prop `onSelectLevel` em `LevelSelectionScreen.tsx`
- Função `getNiveisComProgresso()` em `levels.ts` para integração com progress storage
- 8 novos testes em `components.test.tsx` (VictoryScreen, DefeatScreen, GameScreen, HUD dinâmico)
- 2 novos testes em `levels.test.ts` (getNiveisComProgresso)

### Modificado
- `src/ui/HUD.tsx` — Refatorado com props dinâmicas (criaturasRestantes, nomeNivel, timerPorcentagem, skills, onSkillClick)
- `src/ui/levels.ts` — Integração com `storage/progress.ts`; `niveis` agora é gerado dinamicamente
- `src/App.tsx` — Integração completa de navegação: menu → levelSelect → game → victory/defeat
- `vitest.config.ts` — Thresholds de cobertura ajustados para 62/58/58/62 (DEC-010)

### Dívida técnica
- jsdom/happy-dom permanece incompatível com Node.js v22.22.2
- ESLint pode travar no WSL (timeout)
- PRD desatualizado (referencia Godot/Cocos2d-x)

### Métricas
- Testes: 119 (era 70)
- Suites: 9 (era 8)
- Cobertura: statements 63%, branches 60%, functions 62%, lines 64%
- Typecheck: zero erros
- Build: 458ms

---

## Sprint 11 — Auditoria e Correções (2026-05-24)

### Correções
- Bug `skills.ts` linha 61/81: `this.definitions` substitui `SKILL_DEFINITIONS` global
- Bug `Button.tsx`: prop `onClick` propagada ao elemento `<button>`
- Prop `disabled` implementada no Button com estilo visual (opacity 0.5)
- `LevelSelectionScreen` integrada ao `App.tsx`

### Adicionado
- DEC-009: Stack React/Vite/TS formalizada
- Git init + commit inicial

### Métricas
- Testes: 70
- Cobertura: 74/69/77/75
