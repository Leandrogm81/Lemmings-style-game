# Sprint 03 — MENU_INICIAL_UI

## Objetivo
Implementar a tela de menu inicial com botoes Jogar e Opcoes seguindo UI_UX_GUIDE.

## Impacto UI/UX
Sim

## Escopo da sprint
- Criar componente visual do menu (ex.: MenuScreen React component ou Godot Scene).
- Usar cores primarias #1D4ED8 e secundarias #475569.
- Garantir que o botao Jogar tenha raio 8-10px e sombra leve.
- Nao conectar ainda a logica de jogo.

## Fora do escopo
- Nao criar animacoes avancadas.
- Nao criar tela de Opcoes detalhada.

## Arquivos provaveis a criar/alterar
- src/ui/MenuScreen.tsx (ou equivalente)
- src/assets/ui/menu_button.png (se precisar)
- Atualizar src/ui/styles.ts com cores definidas

## Tarefas em ordem
### Tarefa 3.1 — Ler UI_UX_GUIDE.md secao de cores e espacamento
Descricao: Confirmar regras de cores, tipografia e espacamento.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 3.2 — Criar container do menu
Descricao: Criar layout base do menu (flex column).
Arquivos provaveis: src/ui/MenuScreen.tsx

### Tarefa 3.3 — Adicionar botao Jogar
Descricao: Implementar botao com texto Jogar, cor primaria #1D4ED8.
Arquivos provaveis: Dentro de MenuScreen

### Tarefa 3.4 — Adicionar botao Opcoes
Descricao: Implementar botao com texto Opcoes, cor secundaria #475569.
Arquivos provaveis: Dentro de MenuScreen

### Tarefa 3.5 — Aplicar estilos de botao
Descricao: Usar estilos definidos (raio 8-10px, sombra leve).
Arquivos provaveis: src/ui/theme.ts

## Critérios de aceitação da sprint
- Layout do menu contem os dois botoes com cores corretas.
- Botoes respeitam regras de raio e sombra.
- Nenhum outro elemento visual presente.

## Riscos
- Inadvertir uso de cores diferentes pode violar UI_UX_GUIDE.
- Layout de espacamento pode precisar de ajustes de responsividade.

## O que NÃO deve ser alterado nesta sprint
- Nao criar outras telas (ex.: Opcoes detalhadas).
- Nao conectar botoes a funcionalidades de backend.
