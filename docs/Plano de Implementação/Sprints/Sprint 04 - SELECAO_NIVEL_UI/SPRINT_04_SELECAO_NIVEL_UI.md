# Sprint 04 — SELECAO_NIVEL_UI

## Objetivo
Implementar tela de selecao de nivel com lista linear de icones, desbloqueio por progresso.

## Impacto UI/UX
Sim

## Escopo da sprint
- Criar layout de selecao de nivel.
- Cada nivel exibido como icone; icones bloqueados em cinza, desbloqueados em verde #15803D.
- Respeitar espacamento de 8px, 12px, 16px conforme UI_UX_GUIDE.
- Nao conectar ainda a logica de desbloqueio.

## Fora do escopo
- Nao gerar icones de nivel ainda.
- Nao implementar scroll infinito.

## Arquivos provaveis a criar/alterar
- src/ui/LevelSelectionScreen.tsx
- src/assets/ui/level_icon.png
- Atualizar src/ui/theme.ts se necessario

## Tarefas em ordem
### Tarefa 4.1 — Ler UI_UX_GUIDE.md secao de cores e espacamento
Descricao: Confirmar regras de cores, uso de verde #15803D para desbloqueado.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 4.2 — Criar container de selecao
Descricao: Criar layout vertical de itens.
Arquivos provaveis: src/ui/LevelSelectionScreen.tsx

### Tarefa 4.3 — Adicionar lista de niveis estaticos (hardcoded)
Descricao: Inserir 5 itens de nivel como placeholders.
Arquivos provaveis: Dentro de LevelSelectionScreen

### Tarefa 4.4 — Estilizar icone desbloqueado
Descricao: Aplicar cor verde #15803D a icones desbloqueados.
Arquivos provaveis: src/ui/LevelSelectionScreen.tsx, src/assets/ui/level_icon.png

### Tarefa 4.5 — Aplicar estilos de espacamento em branco
Descricao: Usar espacamento de 12px entre itens.
Arquivos provaveis: src/ui/LevelSelectionScreen.tsx

## Critérios de aceitação
- Tela apresenta lista de icones.
- Icones bloqueados aparecem cinza; desbloqueados verde #15803D.
- Espacamento entre itens segue UI_UX_GUIDE.

## Riscos
- Incorrect spacing pode violar design tokens.
- Cor verde nao deve ser usada em elementos nao desbloqueados.

## O que NÃO deve ser alterado nesta sprint
- Nao conectar lista a dados de progresso real.
- Nao criar animacoes de desbloqueio.
