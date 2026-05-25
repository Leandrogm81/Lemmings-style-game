# CHANGELOG.md

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue a lógica de manter mudanças em ordem cronológica, separadas por tipo.

---

## [Unreleased]

### Sprint 12 — VALIDACAO_FINAL (2026-05-24)

- Lint: ESLint flat config, zero warnings ✅
- Typecheck: tsc --noEmit, zero erros ✅
- Testes: 70/70 passando em 8 suites ✅
- Cobertura: 74.34/68.86/76.66/75.34 (meta 80% não atingida — bloqueio jsdom)
- Build: vite build 368ms, dist/ OK, preview sem erros ✅
- Auditoria UI/UX: Alta conformidade, 0 críticas, 2 médias, 3 sugestões
- Teste manual: Fluxo de navegação completo OK; GameScreen/gameplay não implementado
- Relatórios: `auditoria/SPRINT_12_COBERTURA.md`, `auditoria/SPRINT_12_UI_UX_AUDITORIA.md`, `auditoria/SPRINT_12_TESTE_MANUAL.md`
- Auditoria final: `docs/AUDITORIA_FINAL.md` — veredito: Não aprovado (engine ausente)

### Pós-Auditoria (2026-05-24)

- DEC-009: Stack React/Vite/TS documentada como decisão formal
- Bug skills.ts linha 61/81 corrigido — `this.definitions` substitui `SKILL_DEFINITIONS` global
- Button: prop `disabled` implementada com estilo visual (opacity 0.5, cursor not-allowed)
- Git: repositório inicializado, commit `a52c4d9` com 89 arquivos
- Validação pós-correção: 70/70 testes, lint zero, typecheck zero, build OK. Sem regressões

### Added

- Framework de teste Vitest instalado (`vitest@^4.1.7`) com scripts `test`, `test:watch` e `test:coverage` em `package.json`.
- Provider de cobertura `@vitest/coverage-v8` instalado e configurado em `vitest.config.ts` com thresholds: lines 70%, functions 70%, branches 65%, statements 70%.
- ESLint instalado (`eslint@^10.4.0`, `typescript-eslint`, `eslint-plugin-react-hooks`) com flat config em `eslint.config.js`.
- Script `lint` substituído de placeholder (`echo`) para `eslint src/`.
- Campo `"type": "module"` adicionado ao `package.json` para suporte a flat config do ESLint.
- Biblioteca `@testing-library/react`, `@testing-library/jest-dom` e `@testing-library/user-event` instaladas (não utilizadas devido a incompatibilidade do jsdom — ver Notes).
- Testes para `ads_manager.ts` convertidos de `console.assert` + runner manual para Vitest (`describe`/`it`/`expect`) em `src/ads/ads_manager.test.ts`. 8 cenários preservados.
- Testes para `level_manager.ts` convertidos de funções exportadas sem runner para Vitest em `src/game/level_manager.test.ts`. 4 cenários preservados.
- Testes criados para `SkillManager` (`skills.ts`) em `src/game/skills.test.ts`. 13 cenários cobrindo instanciação, `iniciarSkill`, `atualizarTimers`, `estaDisponivel`, `getEstado`, `getTodosEstados` e `inscrever`. Mock de `Date.now()` via `vi.spyOn` para testes de cooldown.
- Testes criados para `sdk_adapter.ts` em `src/ads/sdk_adapter.test.ts`. 7 cenários cobrindo provider padrão, substituição, timeout e falha.
- Testes criados para tokens de tema em `src/ui/theme.test.ts`. 8 cenários validando cores, espaçamento, bordas, fontes e sombras.
- Testes criados para dados de níveis em `src/ui/levels.test.ts`. 5 cenários validando estrutura e estados.
- Testes de renderização criados para componentes de UI em `src/ui/components.test.tsx`. 19 cenários usando `renderToString` para Button, MenuScreen, LevelSelectionScreen, LevelItem, HUD, TimerBar, SkillButton e AdScreen.
- Pasta `auditoria/` com 5 relatórios da Sprint 11: estado inicial, cobertura baseline, compliance UI/UX, teste manual e relatório final de validação.
- Pasta `docs/agent/` com arquivos de continuidade: `HANDOFF.md`, `CURRENT_STATE.md` e `DECISIONS.md`.
- Relatório de cobertura da Sprint 10 em `docs/test-coverage-sprint-10.md`.

### Changed

- **LevelSelectionScreen integrada ao App.tsx:** Placeholder inline do case `'levelSelect'` substituído pelo componente real. Adicionado prop opcional `onBack` ao `LevelSelectionScreen` com botão "← Voltar" usando tokens do tema. Removido `notifyWin()` artificial do botão "Jogar" que disparava anúncio na navegação normal (debug buttons mantidos para teste manual).
- Arquivo `src/ads/sdk_adapter.ts`: parâmetro `timeoutMs` renomeado para `_timeoutMs` para satisfazer regra `@typescript-eslint/no-unused-vars`.
- Arquivo `src/ads/ads_manager.ts`: variável `state` alterada de `let` para `const` (regra `prefer-const` do ESLint).

### Fixed

- **Button.tsx — onClick não propagado (bug raiz do AdScreen):** A interface `ButtonProps` declarava `onClick` mas a desestruturação do componente ignorava a prop e o elemento `<button>` nunca recebia o handler. Corrigido: `onClick` agora é propagado ao DOM. Este era o bug por trás do botão "Sair agora" do AdScreen não responder — **não era limitação da browser tool, era bug real de código.**
- Corrigido falso positivo em teste do `TimerBar` que verificava ausência de "s" no HTML renderizado — o caractere existia no CSS inline (`0.3s ease`). Ajustado para verificar ausência de `>60s<` e `>50s<`.
- Corrigido bug de narrowing do TypeScript no teste de evento do `LevelManager` — substituído bloco `if (eventoRecebido !== null)` por non-null assertions (`eventoRecebido!.tipo`) para evitar erro `Property does not exist on type 'never'`.
- Corrigido `beforeEach` no teste de `sdk_adapter` que substituía o provider placeholder antes do teste que dependia dele. Separado em dois blocos `describe` independentes.

### Security

- Nenhuma alteração de segurança nesta sprint.

### Notes

- **jsdom incompatível:** `jsdom@^29.1.1` e `happy-dom@^20.9.0` foram instalados, mas **não funcionam** com Node.js v22.22.2 — congelam ao criar DOM (`new JSDOM()` / `new Window()`). Causa raiz não investigada. `@testing-library/react` está instalado mas não pode ser usado. Testes de eventos DOM (hover em Button, click em AdScreen) permanecem impossíveis. Arquivo `src/ui/jsdom.test.ts.skip` documenta a tentativa.
- **LevelSelectionScreen integrada:** O componente `src/ui/LevelSelectionScreen.tsx` foi integrado ao `App.tsx` com prop `onBack`. Placeholder removido.
- **AdScreen "Sair agora" corrigido:** O bug era no `Button.tsx` — `onClick` declarado na interface mas não propagado ao DOM. Corrigido.
- **Bug em `skills.ts` (linha 61):** `iniciarSkill` referencia `SKILL_DEFINITIONS` global em vez das definições passadas ao construtor. Não corrigido — sprints de teste proibiam alterar código de produção.
- **Módulos de gameplay ausentes:** `moveCreatures`, `checkVictory` e save/load com localStorage não existem na codebase. Documentados como lacunas.
- **Sem repositório git:** O projeto não possui `.git/`. Commits não foram realizados.

---

## Histórico anterior

Nenhuma entrada anterior. Este é o primeiro changelog do projeto.
