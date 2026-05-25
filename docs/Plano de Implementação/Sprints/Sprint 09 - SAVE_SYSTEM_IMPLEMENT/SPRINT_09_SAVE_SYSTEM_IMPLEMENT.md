# Sprint 09 — SAVE_SYSTEM_IMPLEMENT

## Objetivo
Implementar salvamento local do progresso (niveis desbloqueados, estrelas, tempo, tentativas) usando AsyncStorage (mobile) ou localStorage (PC).

## Impacto UI/UX
Indireto

## Escopo da sprint
- Criar modulo storage/progress.ts com funcoes saveProgress(data) e loadProgress().
- Persistir objeto ProgressoJogador no storage.
- Expor API para outras partes do codigo.
- Nao alterar UI de salvamento (sera chamada via gameplay).

## Fora do escopo
- Nao implementar backup na nuvem.
- Nao criar UI de carregar partida ainda.

## Arquivos provaveis a criar/alterar
- src/storage/progress.ts
- src/storage/__tests__/progress.test.ts (stub)

## Tarefas em ordem
### Tarefa 9.1 — Ler UI_UX_GUIDE.md secao de estados vazios e loading
Descricao: Confirmar que mensagens de loading devem ser sutis e nao romper UI.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 9.2 — Implementar funcao saveProgress
Descricao: Serializar ProgressoJogador em JSON e armazenar em AsyncStorage (react-native) ou localStorage (web).
Arquivos provaveis: src/storage/progress.ts

### Tarefa 9.3 — Implementar funcao loadProgress
Descricao: Carregar dados do storage, transformar em objeto; retornar null se inexistente.
Arquivos provaveis: src/storage/progress.ts

### Tarefa 9.4 — Exportar API de storage
Descricao: Exportar saveProgress e loadProgress no indice src/storage/index.ts.
Arquivos provaveis: src/storage/index.ts

## Critério de aceitação
- Dados sao gravados sem erros.
- Dados sao carregados corretamente apos reiniciar a aplicacao.
- Estrutura JSON corresponde ao esperado pelo gameplay.

## Riscos
- Serializacao falha pode corromper dados.
- Incompatibilidade entre mobile e PC pode gerar bugs de caminho.

## O que NÃO deve ser alterado nesta sprint
- Nao alterar UI de carregamento ou tela de progresso.
- Nao mudar chave de storage sem necessidade.
