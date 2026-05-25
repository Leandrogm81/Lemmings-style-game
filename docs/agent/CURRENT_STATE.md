# CURRENT_STATE.md

## Status atual
Sprint 14 (Polish & QA) concluída. Reforma visual completa, balanceamento ajustado, GitHub configurado.

## Última ação executada (Sprint 14 — 2026-05-25)
- Reforma visual completa (tema escuro, grid com tiles, criaturas-boneco, HUD reformulado)
- Balanceamento: gap col 7, spawn queue, TICK_MS 600ms, timer 90s
- Engine: spawn queue (filaSpawn, intervaloSpawn, maxCriaturasAtivas)
- README.md, GitHub remote configurado
- Teste E2E de fluxo completo adicionado

## Pendências
- MED-01: PRD desatualizado (referencia Godot/Cocos2d-x)
- MED-02: jsdom incompatível com Node v22.22.2
- LOW-01: Mais níveis (atualmente só Nível 1 tem grid)
- LOW-02: Animações CSS mais elaboradas (transição de movimento das criaturas)
- LOW-03: SDk de anúncios real (placeholder atual)

## Métricas atuais
- 121 testes (era 119), 10 suites
- Typecheck zero, build 903ms
- Cobertura: 63/60/62/64 (thresholds 62/58/58/62)

## Próxima ação recomendada
Sprint 15 — Conteúdo: criar mais níveis com diferentes layouts de grid, obstáculos e combinações de skills.

## O que NÃO fazer
- Não reinstalar jsdom/happy-dom
- Não modificar skills.ts (bug corrigido) ou Button.tsx (finalizado)
- Não implementar multiplayer, editor de níveis, loja
- Não usar `any` ou `@ts-ignore`
