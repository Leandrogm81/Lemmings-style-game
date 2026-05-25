# Sprint 02 — ESTRUTURA_DADOS

## Objetivo
Definir os tipos de dados core: ProgressoJogador, LvlConfig, Criatura.

## Impacto UI/UX
Indireto

## Escopo da sprint
- Criar arquivos TypeScript/JS (ou GDScript) que exportam interfaces/classes para as estruturas de dados.
- Implementar exportacoes de exemplo (ex.: progresso_jogador.ts).
- Nao conectar ainda a UI ou salvamento.

## Fora do escopo
- Nao implementar visualizacao das estruturas.
- Nao integrar com UI ou salvamento.

## Arquivos provaveis a criar/alterar
- src/core/progresso_jogador.ts
- src/core/lvl_config.ts
- src/core/criatura.ts
- src/core/index.ts (exporta todas as interfaces)

## Tarefas em ordem
### Tarefa 2.1 — Criar interface ProgressoJogador
Descricao: Definir interface com propriedades: niveisDesbloqueados, estrelasPorNivel, tempoPorNivel, tentativasPorNivel.
Arquivos provaveis: src/core/progresso_jogador.ts
Critério de aceitacao: Interface exportada com tipos corretos.
Validade: Compilar/tsc mostra sem erro.

### Tarefa 2.2 — Criar interface LvlConfig
Descricao: Definir interface contendo id, nome, requisitosCriaturas, listaHabilidadesDisponiveis.
Arquivos provaveis: src/core/lvl_config.ts
Critério de aceitacao: Interface exportada corretamente.

### Tarefa 2.3 — Criar interface Criatura
Descricao: Definir tipo para criatura com id, tipo, estado.
Arquivos provaveis: src/core/criatura.ts

### Tarefa 2.4 — Exportar modulo de dados
Descricao: Criar um index.ts que exporta todas as interfaces.
Arquivos provaveis: src/core/index.ts

## Critérios de aceitação da sprint
- Todas as interfaces foram criadas e exportam sem erros.
- Compilacao TypeScript passa.
- Arquivos estao nas pastas esperadas.

## Riscos
- Erros de tipagem podem impedir codigo futuro.
- Nomenclatura incorreta gera confusion.

## O que NÃO deve ser alterado nesta sprint
- Nao conectar essas interfaces a UI ou a motor.
- Nao criar implementacoes completas de salvamento.
