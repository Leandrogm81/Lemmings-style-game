# CURRENT_STATE.md

## Status atual
Sprint 14 concluída. Visual reformulado (tema escuro, criaturas visíveis, grid com tiles), balanceamento ajustado (gap col 7, spawn queue, timer 90s), GitHub configurado. Engine corrigido (metaCriaturas valida contra total incluindo fila de spawn).

## Última ação executada
Reforma visual completa de todos os componentes de UI. Correção da validação de metaCriaturas no engine (DEC-011). Teste E2E adicionado que comprova: com Construir → vitória, sem → derrota. A interação via browser_tool para aplicar skills no grid não funcionou de forma confiável; o engine foi verificado via testes automatizados.

## Pendências
- MED-01: PRD desatualizado (referencia Godot/Cocos2d-x)
- MED-02: jsdom incompatível com Node v22.22.2
- LOW: Animações de movimento das criaturas (transição CSS)
- LOW: Mais níveis (só Nível 1 tem grid próprio)
- LOW: SDK de anúncios real (placeholder atual)

## Métricas
- 121 testes, 10 suites, typecheck zero, build 903ms
- Cobertura: 63/60/62/64 (thresholds 62/58/58/62)

## Próxima ação recomendada
Sprint 15 — criar mais níveis com diferentes layouts e combinações de skills.

## O que NÃO fazer
- Não reinstalar jsdom/happy-dom
- Não modificar skills.ts ou Button.tsx (finalizados)
- Não implementar multiplayer, editor de níveis, loja
- Não usar `any` ou `@ts-ignore`
- Não alterar engine.ts sem novos testes
