# Sprint 05 — HUD_JOGO_UI

## Objetivo
Implementar a HUD do gameplay contendo contador de criaturas, barra de tempo e 4 botoes de habilidades.

## Impacto UI/UX
Sim

## Escopo da sprint
- Criar container HUD fixo na parte superior.
- Incluir texto contador de criaturas (ex.: x5).
- Inserir barra de tempo horizontal que decae com o tempo restante.
- Registrar 4 botoes de habilidades com icones (escavar, construir, bloquear, empurrar) usando cores primarias.
- Garantir que cada botao tenha raio 8-10px e sombra leve.

## Fora do escopo
- Nao integrar ainda a logica de contagem de tempo real.
- Nao conectar botoes a habilidades.

## Arquivos provaveis a criar/alterar
- src/ui/HUD.tsx
- src/ui/TimerBar.tsx
- src/ui/SkillButton.tsx
- src/assets/ui/skill_icon_escavar.png
- ...

## Tarefas em ordem
### Tarefa 5.1 — Ler UI_UX_GUIDE.md secao de HUD e timer
Descricao: Confirmar regras de tipografia e cores para elementos HUD.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 5.2 — Criar componente TimerBar
Descricao: Criar barra horizontal que preenche hasta 100% inicialmente.
Arquivos provaveis: src/ui/TimerBar.tsx
Critério de aceitacao: Barra renderiza com largura 100% e cor #1D4ED8 (primaria).

### Tarefa 5.3 — Criar contador de criaturas
Descricao: Adicionar texto que mostra x{count}.
Arquivos provaveis: Dentro de HUD.tsx

### Tarefa 5.4 — Criar 4 botoes de habilidade
Descricao: Criar 4 botoes usando componentes SkillButton, aplicar cor primaria e raio 8-10px.
Arquivos provaveis: src/ui/SkillButton.tsx (x4)
- src/assets/ui/skill_escavar.png
- ...

### Tarefa 5.5 — Aplicar estilos de HUD
Descricao: Definir estilos de margem, padding, fontes, garantindo contraste.
Arquivos provaveis: src/ui/theme.ts

## Critérios de aceitação
- HUD exibe contador, barra de tempo e 4 botoes.
- Barra de tempo preenchida inicialmente.
- Botoes seguem styles (raio, cor, sombra).

## Riscos
- Omissao de sombra leve pode quebrar visual padrao.
- Botoes fora da area podem ultrapassar a tela.

## O que NÃO deve ser alterado nesta sprint
- Nao conectar a logica de contagem de tempo ou disparo de habilidades.
- Nao implementar efeitos de hover ainda.
