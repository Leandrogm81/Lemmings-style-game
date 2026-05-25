# Diagnóstico Inicial — Sprint 11 (VALIDACAO_FINAL)

**Data:** 2026-05-24
**Projeto:** /mnt/c/Dev/lemmings-style-game

---

## 1. Lint

| Item | Status |
|---|---|
| Script `npm run lint` | Placeholder: `echo 'lint placeholder'` |
| Config ESLint (.eslintrc.* / eslint.config.*) | ❌ Nenhum arquivo encontrado |
| Lint real | ❌ Não executado — não há ESLint instalado nem configurado |

**Observação:** O projeto não possui ESLint. O comando `npm run lint` atualmente
apenas exibe "lint placeholder". Para a Sprint 11 será necessário instalar e
configurar ESLint como parte da Tarefa 2.

---

## 2. Typecheck

| Item | Status |
|---|---|
| Script `npm run typecheck` | `tsc --noEmit` |
| Erros | **0** ✅ |

**Observação:** Typecheck passa sem nenhum erro. Nenhuma correção de tipo é
necessária neste momento.

---

## 3. Build

| Item | Status |
|---|---|
| Script `npm run build` | `vite build` |
| Resultado | ✅ Sucesso (383ms) |
| Arquivos em `dist/` | `index.html`, `assets/index-BYDc0cUD.js` (196.76 KB gzip: 62.25 KB) |
| Warnings | Nenhum |

**Observação:** Build web funciona perfeitamente.

---

## 4. Testes

| Item | Valor |
|---|---|
| Script `npm test` | `vitest run` |
| Suites | 4 passed |
| Testes | **31 passed** (0 falhas) |
| Framework | Vitest 4.1.7 |

### Arquivos de teste existentes

| Arquivo | Tests | Formato |
|---|---|---|
| `src/ads/ads_manager.test.ts` | 8 | Vitest (describe/it/expect) |
| `src/game/level_manager.test.ts` | 4 | Vitest |
| `src/game/skills.test.ts` | 13 | Vitest |
| `src/storage/__tests__/progress.test.ts` | 6 | Vitest |

---

## 5. Cobertura de Teste (baseline)

| Métrica | % Atual | Threshold desejado (Sprint 11) | Status |
|---|---|---|---|
| Statements | 96.96% | >= 80% | ✅ |
| Branches | 84.09% | >= 70% | ✅ |
| Functions | 100% | >= 80% | ✅ |
| Lines | 100% | >= 80% | ✅ |

### Cobertura por módulo

| Módulo | Stmts | Branch | Funcs | Lines | Linhas não cobertas |
|---|---|---|---|---|---|
| `src/ads/ads_manager.ts` | 100% | 100% | 100% | 100% | — |
| `src/game/level_manager.ts` | 100% | 100% | 100% | 100% | — |
| `src/game/skills.ts` | 95.74% | 82.6% | 100% | 100% | 62, 82, 108, 129 |
| `src/storage/progress.ts` | 95.23% | 84.21% | 100% | 100% | 52, 85-102 |

**Observação:** Cobertura já está acima dos thresholds da Sprint 11 (80% lines,
80% functions, 80% statements, 70% branches). **Tarefa 5 (aumentar cobertura)
pode ser pulada** — registrar no relatório final.

---

## 6. Git

| Item | Status |
|---|---|
| Repositório git | ❌ Não existe (não é um repositório git) |
| `git status --short` | Não aplicável |

**Observação:** O projeto não possui repositório git. Commits não podem ser
feitos. Recomenda-se inicializar um repositivo git antes de alterações.

---

## 7. Resumo do estado atual

| Ferramenta | Estado | Ação necessária na Sprint 11 |
|---|---|---|
| Lint | Placeholder | Instalar e configurar ESLint (Tarefa 2) |
| Typecheck | ✅ Zero erros | Nenhuma (já ok) |
| Build | ✅ Funcional | Nenhuma (já ok) |
| Testes | ✅ 31/31 passando | Nenhuma |
| Cobertura | ✅ > 80% | Tarefa 5 pode ser pulada |
| Git | ❌ Não existe | Inicializar repositório (opcional) |
