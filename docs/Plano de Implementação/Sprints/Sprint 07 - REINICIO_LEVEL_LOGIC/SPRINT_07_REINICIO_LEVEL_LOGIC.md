# Sprint 07 — REINICIO_LEVEL_LOGIC

## Objetivo
Implementar a logica de reinicio rapido do nivel que recarrega o estado inicial do nivel.

## Impacto UI/UX
Indireto

## Escopo da sprint
- Implementar funcao restartLevel() que restaura todas as variaveis ao estado inicial definido por LvlConfig.
- Garantir que o estado de criaturas, contador, timer e habilidades seja restaurado.
- Expor evento de reinicio para que UI possa escutar (ex.: fechar modal de reinicio).

## Fora do escopo
- Nao criar animacoes de transicao de tela.
- Nao integrar com save ou load ainda.

## Arquivos provaveis a criar/alterar
- src/game/level_manager.ts
- src/game/level_manager.test.ts (stub)

## Tarefas em ordem
### Tarefa 7.1 — Ler UI_UX_GUIDE.md secao de estados de loading e erro
Descricao: Confirmar que o loading deve ser sutil e nao quebrar UI.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 7.2 — Implementar funcao restartLevel
Descricao: Recarrega o estado inicial a partir de LvlConfig e reseta variaveis de gameplay.
Arquivos provaveis: src/game/level_manager.ts

### Tarefa 7.3 — Exportar evento de reinicio
Descricao: Disparar evento que UI pode escutar para fechar telas de pausa ou mostrar mensagem.
Arquivos provaveis: src/game/level_manager.ts

## Critério de aceitação
- restartLevel restaura todas as variaveis ao estado inicial.
- Evento de reinicio e emitido corretamente.

## Riscos
- Falha ao restaurar variaveis pode deixar o jogo em estado inconsistente.
- Evento mal propagado pode impedir que UI responda ao reinicio.

## O que NÃO deve ser alterado nesta sprint
- Nao conectar logica de reinicio a UI de victoria/derrota.
- Nao mudar definicoes de estado de level sem necessidade.
