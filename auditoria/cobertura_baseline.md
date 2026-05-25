# Cobertura Baseline — Sprint 11

**Data:** 2026-05-24
**Thresholds configurados:** lines >= 80%, functions >= 80%, branches >= 70%, statements >= 80%

## Cobertura atual (global)

| Métrica | Atual | Threshold | Status |
|---|---|---|---|
| Statements | 41.55% | >= 80% | ❌ |
| Branches | 35.57% | >= 70% | ❌ |
| Functions | 48.33% | >= 80% | ❌ |
| Lines | 41.81% | >= 80% | ❌ |

## Cobertura por módulo (testado)

| Módulo | Stmts | Branch | Funcs | Lines |
|---|---|---|---|---|
| `src/ads/ads_manager.ts` | 100% | 100% | 100% | 100% |
| `src/ads/sdk_adapter.ts` | 0% | 0% | 0% | 0% |
| `src/game/level_manager.ts` | 100% | 100% | 100% | 100% |
| `src/game/skills.ts` | 95.74% | 82.6% | 100% | 100% |
| `src/storage/progress.ts` | 95.23% | 84.21% | 100% | 100% |

## Módulos sem cobertura

| Módulo | Motivo |
|---|---|
| `src/ui/*` (8 componentes) | Requer @testing-library/react + jsdom |
| `src/core/*` (tipos/interfaces) | Apenas tipos, sem lógica executável |
| `src/ads/sdk_adapter.ts` | Lógica executável — pode ser testada |
| `src/ui/theme.ts` | Tokens de estilo — pode ser testada |
| `src/ui/levels.ts` | Dados de níveis — pode ser testada |
| `src/App.tsx` | Componente raiz — requer jsdom |
| `src/main.tsx` | Ponto de entrada — requer jsdom |

## Observação

A cobertura global está baixa principalmente porque os componentes de UI (8 arquivos .tsx) e módulos de infraestrutura não possuem testes. Os módulos de lógica pura (game, ads, storage) têm cobertura >= 95%.

Para a Tarefa 5, recomenda-se focar em:
1. `src/ads/sdk_adapter.ts` — lógica de anúncios
2. `src/ui/theme.ts` — tokens de estilo
3. `src/ui/levels.ts` — dados de nível
