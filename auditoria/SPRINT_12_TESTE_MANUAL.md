# Teste Manual de Fluxo Completo — Sprint 12

**Data:** 2026-05-24
**Servidor:** Dev (`npm run dev`, porta 3000) + Preview build (`npm run preview`, porta 4173)
**Viewports:** Desktop (1280px) e Mobile (inspeção de código — media queries)

---

## Resumo

**Fluxo testável:** Menu → Seleção de Nível → Anúncio → Menu (ciclo completo de navegação)
**Fluxo NÃO testável:** Jogo (engine não implementada — `moveCreatures`, `checkVictory`, GameScreen não existem)

---

## Etapa 1 — Tela Inicial (MenuScreen)

| Item | Status | Observação |
|------|--------|------------|
| Tela carrega? | ✅ OK | Título "Lemmings" visível |
| Botão "Jogar" visível? | ✅ OK | Leva para LevelSelectionScreen |
| Botão "Opções" visível? | ✅ OK | Presente (funcionalidade placeholder) |
| Debug buttons? | ✅ OK | "[Debug] Vitória" e "[Debug] Derrota" visíveis |
| Texto claro? | ✅ OK | "Jogar", "Opções" — verbos diretos |
| Sem erros de console? | ✅ OK | Zero erros |

---

## Etapa 2 — Seleção de Nível (LevelSelectionScreen)

| Item | Status | Observação |
|------|--------|------------|
| Tela carrega ao clicar "Jogar"? | ✅ OK | Transição imediata |
| Botão "← Voltar" funciona? | ✅ OK | Retorna ao menu |
| Níveis aparecem? | ✅ OK | 5 níveis listados |
| Nível desbloqueado — indicação? | ✅ OK | Accent bar verde, opacity 1, texto "Disponível" |
| Nível bloqueado — indicação? | ✅ OK | Accent bar cinza, opacity 0.5, texto "Bloqueado" |
| Grid responsivo? | ✅ OK | 2 colunas desktop, 1 coluna mobile (media query 639px) |

**Dados:** Nível 1 e 2 desbloqueados, Níveis 3-5 bloqueados (mockados em `levels.ts`)

---

## Etapa 3 — Entrar no Nível (GameScreen)

| Item | Status | Observação |
|------|--------|------------|
| Tela de jogo carrega? | ❌ NÃO TESTADO | **GameScreen não existe.** `App.tsx` case `'game'` não implementado |
| HUD aparece? | ❌ NÃO TESTADO | Componente HUD existe (`src/ui/HUD.tsx`) mas não está integrado ao App.tsx |
| Timer funciona? | ❌ NÃO TESTADO | TimerBar implementado, sem game loop para alimentá-lo |
| Skills visíveis? | ❌ NÃO TESTADO | SkillManager implementado, SkillButtons existem no HUD |

**Causa raiz:** Módulos de gameplay (`moveCreatures`, `checkVictory`) não implementados. Documentado como lacuna desde a Sprint 10 (HANDOFF.md).

---

## Etapa 4 — Jogar (Gameplay)

| Item | Status | Observação |
|------|--------|------------|
| Criaturas se movem? | ❌ NÃO TESTADO | Engine não implementada |
| Timer conta? | ❌ NÃO TESTADO | Sem game loop |
| Skills podem ser usadas? | ❌ NÃO TESTADO | SkillManager não conectado ao jogo |

---

## Etapa 5 — Vitória / Derrota

| Item | Status | Observação |
|------|--------|------------|
| Feedback de vitória? | ❌ NÃO TESTADO | `checkVictory` não implementado |
| Feedback de derrota? | ❌ NÃO TESTADO | Sem lógica de derrota |
| Estatísticas? | ❌ NÃO TESTADO | Sem tracking de stats |

**Simulação disponível:** Debug buttons no menu simulam vitória/derrota para testar streaks de anúncio (única forma de testar o fluxo de anúncio atualmente).

---

## Etapa 6 — Anúncio (AdScreen)

| Item | Status | Observação |
|------|--------|------------|
| AdScreen aparece após 2 vitórias? | ✅ OK | Testado via debug buttons — 2 cliques em "[Debug] Vitória" |
| Loading state? | ✅ OK | Spinner CSS + "Carregando anúncio..." (1.5s simulado) |
| Estado padrão? | ✅ OK | "Anúncio" + placeholder |
| Botão "Sair agora" funciona? | ✅ OK | Fecha overlay, volta ao menu (bug corrigido na Sprint 11) |
| Estado de erro? | ✅ OK | "Fechar" aparece em caso de falha (testado via testes unitários) |

**Fluxo confirmado:** Debug Win × 2 → AdScreen aparece → "Sair agora" → Menu ✅

---

## Etapa 7 — Reiniciar Nível

| Item | Status | Observação |
|------|--------|------------|
| Restart funciona? | ❌ NÃO TESTADO | Sem nível para reiniciar. `LevelManager` tem lógica de restart (100% coberto em testes) |
| Estado volta ao inicial? | ❌ NÃO TESTADO | Não integrado ao fluxo |

---

## Etapa 8 — Salvar Progresso

| Item | Status | Observação |
|------|--------|------------|
| Progresso salvo após vitória? | ❌ NÃO TESTADO | Módulo `storage/progress.ts` existe (95% coberto) mas não integrado |
| Persiste após recarregar? | ❌ NÃO TESTADO | localStorage funcionaria, mas não há trigger de save |
| Nível desbloqueado persiste? | ❌ NÃO TESTADO | Níveis são mockados em `levels.ts` — sempre iguais |

---

## Validação Mobile

| Viewport | MenuScreen | LevelSelection | AdScreen |
|----------|-----------|---------------|----------|
| 375px | ✅ Centralizado | ✅ 1 coluna (media query) | ✅ Modal responsivo |

**Nota:** Validação mobile feita por análise de código (media queries, padding responsivo, minHeight para toque). Teste visual em dispositivo real pendente.

---

## Resumo de Status

| Etapa | Status |
|-------|--------|
| MenuScreen | ✅ OK |
| LevelSelectionScreen | ✅ OK |
| GameScreen | ❌ NÃO IMPLEMENTADO |
| Gameplay (movimento/timer/skills) | ❌ NÃO IMPLEMENTADO |
| Vitória/Derrota | ❌ NÃO IMPLEMENTADO |
| Anúncio (AdScreen) | ✅ OK |
| Reiniciar nível | ❌ NÃO INTEGRADO |
| Salvar progresso | ❌ NÃO INTEGRADO |

---

## Bugs Encontrados

Nenhum bug novo. O bug do Button.onClick foi corrigido na Sprint 11 e confirmado funcional neste teste.

---

## Observações Importantes

1. **O jogo não é jogável.** A engine (`moveCreatures`, `checkVictory`, GameScreen) é a próxima prioridade.
2. **O fluxo de navegação está completo:** Menu → Seleção → Menu, com AdScreen intersticial.
3. **O sistema de streaks funciona** (ads_manager 100% coberto), mas só via debug buttons.
4. **Progresso não persiste** porque `levels.ts` tem dados mockados fixos.
5. **O HUD não está integrado** ao App.tsx — o componente existe mas não é renderizado.
