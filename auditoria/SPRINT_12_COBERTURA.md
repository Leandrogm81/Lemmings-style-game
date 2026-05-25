# Relatório de Cobertura — Sprint 12

## Resumo Global

| Métrica | Percentual | Meta Sprint 12 | Diferença |
|---------|-----------|-----------------|-----------|
| Statements | 74.34% | >= 80% | -5.66% |
| Branches | 68.86% | >= 80% | -11.14% |
| Functions | 76.66% | >= 80% | -3.34% |
| Lines | 75.34% | >= 80% | -4.66% |

**Status:** ABAIXO da meta de 80%. Thresholds atuais em vitest.config.ts: 70/65/70/70 (DEC-002).

## Arquivos com menor cobertura

| Arquivo | Stmts | Branches | Funcs | Lines | Causa |
|---------|-------|----------|-------|-------|-------|
| `src/App.tsx` | 0% | 0% | 0% | 0% | Componente raiz — requer jsdom |
| `src/main.tsx` | 0% | 0% | 100% | 0% | Entry point — requer jsdom |
| `src/core/*.ts` | 0% | 0% | 0% | 0% | Apenas interfaces TypeScript |
| `src/ui/Button.tsx` | 40% | 20% | 33.33% | 40% | Handlers onMouseEnter/Leave requerem DOM |
| `src/ui/SkillButton.tsx` | 66.66% | 80% | 33.33% | 66.66% | Handlers de mouse requerem DOM |
| `src/game/skills.ts` | 95.74% | 82.6% | 100% | 100% | Linhas 62,82,108,129 — branches de fallback |
| `src/storage/progress.ts` | 95.23% | 84.21% | 100% | 100% | Linhas de serialização/desserialização |

## Lacunas principais para atingir 80%

1. **App.tsx + main.tsx (~26% do código):** Requer jsdom funcional para teste. Atualmente incompatível com Node.js v22.22.2.
2. **Button.tsx + SkillButton.tsx:** Handlers `onMouseEnter`/`onMouseLeave` não cobertos por `renderToString`.
3. **core/*.ts:** Tipos puros — cobertura 0% é normal e aceitável (não há lógica executável).

## Conclusão

A meta de 80% NÃO é atingível sem resolver o bloqueio do jsdom (Node.js v22.22.2). 
Os thresholds atuais (70/65/70/70) refletem a cobertura realista (DEC-002). 
Recomendação: testar jsdom em Node.js 20.x ou usar `linkedom` como alternativa antes de elevar thresholds.
