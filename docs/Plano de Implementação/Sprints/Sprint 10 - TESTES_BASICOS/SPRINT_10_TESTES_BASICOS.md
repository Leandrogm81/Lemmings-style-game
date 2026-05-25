# Sprint 10 — TESTES_BASICOS

## Objetivo
Implementar testes unitarios e de integracao para validadas de core: engine movement, skill cooldown, save/load, ad triggers.

## Impacto UI/UX
Nao aplicavel

## Escopo da sprint
- Criar diretorio tests/ com arquivos de teste para modulos criados nas sprintas anteriores.
- Usar framework de teste padrao do projeto (ex.: Jest ou Godot's built-in test runner).
- Testar funcoes criticas: moveCreatures, checkVictory, SkillManager.isReady, ads_manager.shouldShowAd.
- Garantir que cobertura de teste alcance >= 80% das linhas de codigo novas.

## Fora do escopo
- Nao criar testes end-to-end (E2E) ainda.
- Nao cobrir UI visual (visual regression sera feita na sprint final).

## Arquivos provaveis a criar/alterar
- tests/engine.test.ts
- tests/skills.test.ts
- tests/ads_manager.test.ts
- tests/progress.test.ts

## Tarefas em ordem
### Tarefa 10.1 — Instalar framework de teste
Descricao: Adicionar jest (ou equivalente) como dependencia dev e configurar script test.
Arquivos provaveis: package.json (script test)
Critério de aceitacao: npm run test -- --watchAll inicia runner.

### Tarefa 10.2 — Criar teste para moveCreatures
Descricao: Montar cenario com algumas criaturas e chamar funcao; verificar posicoes esperadas.
Arquivos provaveis: tests/engine.test.ts

### Tarefa 10.3 — Criar teste para SkillManager
Descricao: Verificar se cooldown impede uso simultaneo.
Arquivos provaveis: tests/skills.test.ts

### Tarefa 10.4 — Criar teste para ads_manager
Descricao: Simular incremento de winStreak/failureStreak e verificar disparo de showInterstitial.
Arquivos provaveis: tests/ads_manager.test.ts

### Tarefa 10.5 — Criar teste para progress.save/load
Descricao: Salvar um objeto, entao carregar e comparar igualdade profunda.
Arquivos provaveis: tests/progress.test.ts

## Critério de aceitação
- Todos os testes compilam e nao falham.
- Cobertura de linhas novas >= 80%.

## Riscos
- Configuracao errada do runner impede execucao.
- Falta de mocks pode causar falsos negativos.

## O que NÃO deve ser alterado nesta sprint
- Nao escrever testes de UI visual.
- Nao alterar logica de producao.
