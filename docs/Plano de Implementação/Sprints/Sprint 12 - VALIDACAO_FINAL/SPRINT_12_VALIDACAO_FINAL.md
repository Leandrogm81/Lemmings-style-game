# Sprint 12 — VALIDACAO_FINAL

## Objetivo
Realizar validacao final do MVP: checar regressao, responsividade, compliance com UI_UX_GUIDE, executar build para mobile e desktop, validar fluxo de jogo completo.

## Impacto UI/UX
Sim

## Escopo da sprint
- Executar npm run lint -> garantir zero warnings.
- Executar npm run typecheck -> garantir sem erros.
- Executar npm run build para web (ou export) e para as pastas ios/android/pc.
- Testar manualmente fluxo completo: iniciar jogo -> selecionar nivel -> jogar ate victoria/derrota -> assistir anuncio -> reiniciar nivel -> verificar salvamento.
- Verificar que todas as telas seguem tokens de estilo (cores, fontes, espacamentos) conforme UI_UX_GUIDE.md.
- Gerar relatorio de cobertura de teste (>= 80%).
- Nao lancar versao de producao ainda.

## Fora do escopo
- Nao publicar nas lojas.
- Nao criar versao de release.

## Arquivos provaveis a verificar
- Todos os arquivos de codigo gerados nas sprintas anteriores.
- package.json (scripts lint, typecheck, build, test)
- docs/design/UI_UX_GUIDE.md (referenciado em todas as telas)
- src/ui/ components (para checar estilos)

## Tarefas em ordem
### Tarefa 12.1 — Verificar lint e typecheck
Descricao: Executar scripts e confirmar ausencia de erros.
Arquivos: package.json (scripts lint, typecheck)

### Tarefa 12.2 — Build para web
Descricao: Rodar npm run build e observar se ha erros.
Arquivos: output da build

### Tarefa 12.3 — Build para ios/android/pc
Descricao: Seguir instrucoes de export especificas da engine (ex.: godot --export-release ou cocos2d-cli).
Arquivos: scripts de export

### Tarefa 12.4 — Teste manual completo
Descricao: Abrir o build, jogar do inicio ao fim, registrar comportamento.
Arquivos: build executavel

### Tarefa 12.5 — Verificar compliance de UI com UI_UX_GUIDE
Descricao: Checar cores, fontes, espacamentos visualmente; usar ferramenta de inspecao.
Arquivos: Navegador devtools ou inspecao no dispositivo

### Tarefa 12.6 — Gerar relatorio de cobertura
Descricao: Rodar npm run test -- --coverage e conferir %.
Arquivos: coverage/ folder

## Critério de aceitação
- Lint e typecheck sem erros.
- Builds completam sem crash.
- Flow completo funciona sem bugs criticos.
- Design visual segue UI_UX_GUIDE.
- Cobertura de teste >= 80%

## Riscos
- Falha em build pode indicar problemas de ambiente ainda nao resolvidos.
- Bugs de UI podem passar despercebidos sem teste visual.

## O que NÃO deve ser alterado nesta sprint
- Nao introduzir novas funcionalidades.
- Nao mudar escopo das funcionalidades ja implementadas.
