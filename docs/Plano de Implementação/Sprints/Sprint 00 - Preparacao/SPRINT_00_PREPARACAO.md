# Sprint 0 — Preparacao_e_leitura_do_projeto

## Objetivo
Explore a codebase, identifique arquivos criticos, verifique dependencias e prepare o ambiente para as proximas sprints.

## Impacto UI/UX
Nao aplicavel

## Arquivos a inspecionar
- package.json
- .env.example (se existir)
- .gitignore
- Estrutura de pastas: assets/, docs/design/, src/, ios/, android/, pc/
- src/ui/ (componentes UI ja existentes)
- src/core/ (estruturas de dados)
- docs/design/UI_UX_GUIDE.md
- Tests existentes (se houver)
- scripts de build/lint/typecheck

## Estrutura a mapear
- rotas de UI (ex.: src/ui/*)
- servicos externos (ex.: API de ads)
- banco de dados/local storage (se houver)
- estado global (ex.: Redux, Context)
- estilos/theme.ts ou equivalentes
- fluxos criticos (ex.: flow de anuncios, salvamento)

## Dependencias a verificar
- Bibliotecas de lint/typecheck (eslint, prettier)
- Frameworks de teste (jest, godot-test)
- Integracao de ads SDK (ex.: google-mobile-ads)
- Variaveis de ambiente necessarias (ADMOB_ID)
- Versoes de Node/NPM/Yarn

## Comandos iniciais
- Verificar versao do Node (node --version)
- Instalar dependencias (npm install ou yarn)
- Rodar lint (npm run lint -- --max-warnings=0)
- Rodar typecheck (npm run typecheck)
- Rodar build basico (npm run build ou npm run export)
- Verificar existencia de scripts no package.json

## Tarefas em ordem
### Tarefa 0.1 — Listar e confirmar estrutura de pastas
Descricao: Use tree ou equivalente para confirmar existencia das pastas listadas.
Arquivos provaveis: assets/, docs/design/, src/, ios/, android/, pc/
Critério de aceitacao: Todas as pastas aparecem no listado.
Validade: Visual conferencia.

### Tarefa 0.2 — Analisar package.json
Descricao: Abra package.json e identifique scripts de lint, build, test.
Arquivos provaveis: package.json
Critério de aceitacao: Scripts essenciais presenti (pelo menos lint, build, test).
Validade: npm run <script> retorna ajuda ou erro.

### Tarefa 0.3 — Verificar existencia de UI_UX_GUIDE.md
Descricao: Confirme que docs/design/UI_UX_GUIDE.md existe e abra-o para leitura rapida.
Arquivos provaveis: docs/design/UI_UX_GUIDE.md
Critério de aceitacao: Arquivo encontrado e conteudo acessivel.

### Tarefa 0.4 — Checar configuracao de ambiente
Descricao: Verifique se .env.example existe e quais chaves ela possui.
Arquivos provaveis: .env.example
Critério de aceitacao: Arquivo presente com variaveis basicas (ex.: ADMOB_ID).
Validade: cat .env.example.

## Critérios de aceitação da sprint
- Todas as pastas criadas e conferidas.
- package.json presente com scripts basicos.
- UI_UX_GUIDE.md localizado e lido.
- .env.example presente com variaveis basicas.
- Nenhum erro ao executar comandos de verificacao.

## Riscos
- Pasta errada ou nome incorreto pode quebrar scripts de build.
- Falta de scripts essenciais impede future steps.
- Ausencia de UI_UX_GUIDE pode causar incompatibilidade visual depois.

## O que NÃO deve ser alterado nesta sprint
- Nao criar ou modificar arquivos de codigo de gameplay.
- Nao implementar funcionalidades de UI.
- Nao mudar configuracoes de dependencias sem confirmar com a equipe.
