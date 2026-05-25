# Sprint 06 — SKILL_COOLDOWN_IMPLEMENT

## Objetivo
Implementar o sistema de skills com cooldown visual que impede uso simultaneo e seguir as regras de UI_UX_GUIDE.

## Impacto UI/UX
Indireto

## Escopo da sprint
- Criar modulo game/skills.ts que gerencia estado de cada skill, impede uso simultaneo e controla cooldown visual.
- Expor funcoes para iniciar skill, verificar disponibilidade e atualizar temporizador.
- Nao conectar ainda a UI (os timers serao usados pelos botoes ja criados).

## Fora do escopo
- Nao criar UI de cooldown (ja foi tratada na sprint de HUD/Skill Buttons).
- Nao integrar com anuncios ou save.

## Arquivos provaveis a criar/alterar
- src/game/skills.ts
- src/game/skill_manager.ts (opcional)
- src/game/__tests__/skills.test.ts (stub)

## Tarefas em ordem
### Tarefa 6.1 — Ler UI_UX_GUIDE.md secao de feedback visual para cooldown
Descricao: Confirmar que o cooldown deve ser representado visualmente (ex.: anel ao redor do botao).
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 6.2 — Implementar SkillManager com timer
Descricao: Criar classe/objeto que guarda estado de cada skill, impede uso simultaneo e controla cooldown visual.
Arquivos provaveis: src/game/skills.ts

### Tarefa 6.3 — Definir cooldown visual (anulo)
Descricao: Implementar logica que atualiza timer e sinaliza quando skill fica disponivel novamente.
Arquivos provaveis: src/game/skills.ts

## Critério de aceitação
- SkillManager impoe uso simultaneo inviavel.
- Timer de cooldown diminui corretamente.
- Evento de disponibilidade dispara quando cooldown termina.

## Riscos
- Logica de timer incorreta pode deixar skill sempre indisponivel ou sempre disponivel.
- Falha pode quebrar fluxo de jogo.

## O que NÃO deve ser alterado nesta sprint
- Nao conectar eventos a componentes UI.
- Nao mudar definicoes de habilidades (numero ou nomes) sem necessidade.
