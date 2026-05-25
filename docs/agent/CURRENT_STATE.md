# CURRENT_STATE.md

## Status atual
Sprint 12 (VALIDAÇÃO_FINAL) concluída. MVP validado: lint, typecheck, testes, build, cobertura, auditoria UI/UX e teste manual executados. Navegação completa funcional. Gameplay (engine) é a única lacuna restante.

## Última ação executada
Sprint 12 completa (2026-05-24) — 7 tarefas executadas:
1. **Lint:** ESLint flat config, zero warnings ✅
2. **Typecheck:** tsc --noEmit, zero erros ✅
3. **Testes:** 70/70 passando em 8 suites ✅
4. **Cobertura:** 74/68/76/75 — abaixo da meta de 80% (bloqueio jsdom, documentado em DEC-002)
5. **Auditoria UI/UX:** Alta conformidade, 0 críticas (relatório: auditoria/SPRINT_12_UI_UX_AUDITORIA.md)
6. **Build:** vite build 367ms, dist/ OK, preview sem erros ✅
7. **Teste manual:** Navegação menu→seleção→anúncio OK; GameScreen/gameplay NÃO implementado

## Último erro ou bloqueio
jsdom 29 e happy-dom 20 congelam em Node.js v22.22.2 — impede testes de eventos DOM e é a causa raiz de não atingir 80% de cobertura. Bloqueio conhecido desde a Sprint 11.

## Hipótese atual
O MVP está pronto para validação como "shell jogável" — navegação, UI, ads e testes estão sólidos. Falta apenas a engine de gameplay para torná-lo um jogo completo.

## Próxima ação imediata
Sprint de gameplay: implementar `moveCreatures`, `checkVictory`, GameScreen, integração do HUD e persistência real com localStorage. Esta é a última lacuna antes de um MVP verdadeiramente jogável.

## Arquivos relevantes agora
- `src/App.tsx` — navegação menu/levelSelect, sem case 'game'
- `src/ui/HUD.tsx` — componente pronto, não integrado
- `src/game/skills.ts` — SkillManager funcional (bug linha 61 conhecido)
- `src/game/level_manager.ts` — LevelManager pronto (100% coberto)
- `src/storage/progress.ts` — save/load pronto (95% coberto), não integrado
- `src/ads/` — sistema de anúncios completo (100% coberto)
- `auditoria/SPRINT_12_*.md` — 3 relatórios de validação
- `docs/agent/HANDOFF.md` — handoff completo

## Não repetir
- Instalar jsdom ou happy-dom sem antes trocar versão do Node.js ou usar linkedom
- Criar novos componentes de UI sem seguir UI_UX_GUIDE.md e usar tokens de theme.ts
- Modificar skills.ts linha 61 sem discutir o impacto

## Observação crítica
O projeto agora tem 3 relatórios de auditoria em `auditoria/` documentando o estado real do MVP. A cobertura de 80% não é atingível sem resolver o jsdom — os thresholds atuais (70/65/70/70) são realistas (DEC-002). O fluxo de navegação e anúncios está completo e validado.
