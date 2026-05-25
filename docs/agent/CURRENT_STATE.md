# CURRENT_STATE.md

## Status atual
Sprint 13 (Gameplay Engine) concluída. Engine funcional, telas implementadas, HUD dinâmico, persistência de níveis integrada.

## Última ação executada
Sprint 13 — Gameplay Engine (2026-05-24):
1. `src/game/engine.ts` — engine de jogo grid-based (moverCriaturas, verificarVitoria, aplicarSkill)
2. `src/game/engine.test.ts` — 38 testes unitários
3. `src/ui/GameScreen.tsx` — tela de jogo com grid, HUD e game loop (requestAnimationFrame)
4. `src/ui/VictoryScreen.tsx` — tela de vitória com estatísticas
5. `src/ui/DefeatScreen.tsx` — tela de derrota com retry
6. `src/ui/HUD.tsx` — refatorado com props dinâmicas
7. `src/ui/LevelItem.tsx` — prop onClick para navegação
8. `src/ui/LevelSelectionScreen.tsx` — prop onSelectLevel
9. `src/ui/levels.ts` — integração com storage/progress.ts (getNiveisComProgresso)
10. `src/App.tsx` — integração completa: menu → levelSelect → game → victory/defeat
11. `vitest.config.ts` — thresholds ajustados: 62/58/58/62
12. Validação: 119 testes (era 70), typecheck zero, build OK, coverage OK

## Pendências críticas
- HIGH-04: SDK de anúncios real (placeholder atual)
- MED-01: PRD desatualizado (ainda referencia Godot/Cocos2d-x)
- MED-02: jsdom incompatível com Node.js v22.22.2 (bloqueia testes de interação DOM)

## Pendências resolvidas nesta sprint
- CRIT-01: Engine (moveCreatures, checkVictory, GameScreen) ✓
- CRIT-02: VictoryScreen / DefeatScreen ✓
- HIGH-02: Persistência integrada aos níveis ✓
- HIGH-03: HUD integrado ao App.tsx ✓

## Arquivos alterados nesta sessão
- `src/game/engine.ts` — novo: engine de gameplay
- `src/game/engine.test.ts` — novo: 38 testes
- `src/ui/GameScreen.tsx` — novo: tela principal de jogo
- `src/ui/VictoryScreen.tsx` — novo: tela de vitória
- `src/ui/DefeatScreen.tsx` — novo: tela de derrota
- `src/ui/HUD.tsx` — refatorado com props dinâmicas
- `src/ui/LevelItem.tsx` — prop onClick
- `src/ui/LevelSelectionScreen.tsx` — prop onSelectLevel
- `src/ui/levels.ts` — integração com progress storage
- `src/ui/levels.test.ts` — novos testes de progresso
- `src/ui/components.test.tsx` — novos testes de telas
- `src/App.tsx` — integração completa de navegação
- `vitest.config.ts` — thresholds 62/58/58/62 (DEC-010)
- `docs/agent/DECISIONS.md` — DEC-010 adicionada

## Próxima ação imediata
Sprint 14 — Polish & QA: testar gameplay manualmente, ajustar balanceamento (velocidade, timer, dificuldade), adicionar feedback visual (animações de morte/chegada), revisar responsividade mobile do grid.

## O que NÃO fazer
- Não alterar engine.ts sem novos testes
- Não elevar thresholds de cobertura sem resolver jsdom
- Não modificar skills.ts (bug corrigido)
- Não modificar Button.tsx (já finalizado)
