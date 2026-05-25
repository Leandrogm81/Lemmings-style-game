# Relatório de Cobertura — Sprint 10 (TESTES_BASICOS)

**Data de geração:** 2026-05-24

## Resumo

| Métrica | Valor |
|---|---|
| Testes totais | 31 |
| Arquivos de teste | 4 |
| Cobertura de Statements | 96.96% |
| Cobertura de Branches | 84.09% |
| Cobertura de Funções | 100% |
| Cobertura de Linhas | 100% |

## Cobertura por módulo

| Módulo | Statements | Branches | Funções | Linhas | Linhas não cobertas |
|---|---|---|---|---|---|
| `src/ads/ads_manager.ts` | 100% | 100% | 100% | 100% | — |
| `src/game/level_manager.ts` | 100% | 100% | 100% | 100% | — |
| `src/game/skills.ts` | 95.74% | 82.6% | 100% | 100% | 62, 82, 108, 129 |
| `src/storage/progress.ts` | 95.23% | 84.21% | 100% | 100% | 52, 85-102 |

### Detalhamento de `src/game/skills.ts` (linhas não cobertas)

| Linha | Código | Motivo |
|---|---|---|
| 62 | `if (!definition) return false` | Só executa quando skill existe no Map mas não em SKILL_DEFINITIONS global (cenário improvável) |
| 82 | `if (!definition \|\| ...)` | Mesmo caso acima, no `atualizarTimers` |
| 108 | `return this.estados.get(skillId)?.disponivel ?? false` | Branch do `?? false` para skill que não existe no Map |
| 129 | `if (callbacks)` | Defensive check dentro de `notificar` — sempre true nas condições de teste atuais |

### Detalhamento de `src/storage/progress.ts` (linhas não cobertas)

As linhas 85-102 correspondem a funções auxiliares de serialização de progresso que não são chamadas diretamente pelos testes atuais. O módulo `progress.ts` contém lógica de persistência (localStorage) que requer um ambiente browser ou mock de `localStorage` para ser testada.

## Funções não encontradas na codebase

A sprint original (`SPRINT_10_TESTES_BASICOS.md`) listava testes para as seguintes funções que **não existem** na codebase atual:

| Função esperada | Módulo esperado | Status |
|---|---|---|
| `moveCreatures` | `src/game/engine.ts` ou `src/game/movement.ts` | ❌ Não implementada |
| `checkVictory` | `src/game/engine.ts` | ❌ Não implementada |
| `saveProgress` / `loadProgress` | `src/game/progress.ts` (com localStorage) | ❌ Módulo não existe. Apenas a interface `ProgressoJogador` em `src/core/progresso_jogador.ts` |

### Funções com nome diferente do esperado

| Nome na sprint original | Nome real na codebase | Status |
|---|---|---|
| `SkillManager.isReady` | `SkillManager.estaDisponivel(skillId)` | ✅ Testado |
| `ads_manager.shouldShowAd` | `ads_manager.deveExibirAnuncio()` | ✅ Testado |

## Recomendações para sprints futuras

1. **Criar `src/game/engine.ts` com `moveCreatures` e `checkVictory`** — Funções centrais da lógica do jogo que precisam ser implementadas antes de serem testadas.
2. **Criar módulo de save/load** — `src/game/progress.ts` ou similar, usando `localStorage` para persistência, com interface compatível com `ProgressoJogador`.
3. **Aumentar cobertura de branches** — As branches não cobertas em `skills.ts` (linhas 62, 82, 108, 129) podem ser cobertas com testes adicionais que exercitem caminhos de erro específicos.
4. **Testes de integração** — Após criar o módulo de engine, adicionar testes que exercitem `moveCreatures` em conjunto com `SkillManager` e `LevelManager`.
