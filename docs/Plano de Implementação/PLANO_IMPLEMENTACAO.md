# Plano de Implementacao

## 1. Premissas
- O projeto sera desenvolvido usando engine 2D (Godot ou Cocos2d-x) – ainda a definir.
- O escopo esta limitado ao MVP descrito no PRD_CONSOLIDADO.md.
- A arte sera pixel art clasica; assets ja existem em assets/art/.
- O design visual segue docs/design/UI_UX_GUIDE.md.
- Nenhuma funcionalidade fora do MVP sera implementada nesta rodada.
- Todas as decisoes de UI devem respeitar UI_UX_GUIDE.md.
- Salvar progresso localmente; sem login nem nuvem.
- Monetizacao inicial apenas por anuncios intersticiais via Google AdMob.

## 2. Visao geral das sprints

| Sprint | Nome | Objetivo | Impacto UI/UX | Arquivo |
|---|---|---|---|---|
| Sprint 0 | Preparacao e leitura do projeto | Mapear codebase e validar dependencias | Nao aplicavel | SPRINT_00_PREPARACAO.md |
| Sprint 1 | PROJETO_ESTRUTURA | Criar estrutura basica de pastas, package.json e .env.example | Nao aplicavel | SPRINT_01_PROJETO_ESTRUTURA.md |
| Sprint 2 | ESTRUTURA_DADOS | Definir tipos de dados core (ProgressoJogador, LvlConfig, Criatura) | Indireto | SPRINT_02_ESTRUTURA_DADOS.md |
| Sprint 3 | MENU_INICIAL_UI | Implementar tela de menu inicial com botoes Jogar e Opcoes | Sim | SPRINT_03_MENU_INICIAL_UI.md |
| Sprint 4 | SELECAO_NIVEL_UI | Implementar tela de selecao de niveis com icones desbloqueados | Sim | SPRINT_04_SELECAO_NIVEL_UI.md |
| Sprint 5 | HUD_JOGO_UI | Implementar HUD com contador, barra de tempo e botoes de habilidade | Sim | SPRINT_05_HUD_JOGO_UI.md |
| Sprint 6 | SKILL_COOLDOWN_IMPLEMENT | Implementar sistema de skills com cooldown e regras de uso | Indireto | SPRINT_06_SKILL_COOLDOWN_IMPLEMENT.md |
| Sprint 7 | REINICIO_LEVEL_LOGIC | Implementar reinicio rapido do nivel | Indireto | SPRINT_07_REINICIO_LEVEL_LOGIC.md |
| Sprint 8 | AD_INTEGRATION | Integrar SDK de anuncios intersticiais (ex.: Google AdMob) | Sim | SPRINT_08_AD_INTEGRATION.md |
| Sprint 9 | SAVE_SYSTEM_IMPLEMENT | Implementar salvamento local do progresso | Indireto | SPRINT_09_SAVE_SYSTEM_IMPLEMENT.md |
| Sprint 10 | TESTES_BASICOS | Implementar testes unitarios e de integracao | Nao aplicavel | SPRINT_10_TESTES_BASICOS.md |
| Sprint 11 | VALIDACAO_FINAL | Verificar regressao, responsividade e compliance com UI_UX_GUIDE | Sim | SPRINT_11_VALIDACAO_FINAL.md |

## 3. Ordem de execucao recomendada
1. **Sprint 0** deve ser concluida antes de qualquer outra, pois fornece o mapa da codebase e valida dependencias.
2. **Sprint 1** prepara o ambiente de desenvolvimento; somente apos sua validacao as demais podem ser iniciadas.
3. **Sprint 2** cria a base de dados; depende da estrutura criada em Sprint 1.
4. **Sprint 3-5** sequencialmente implementam as telas de UI; cada uma depende da biblioteca de componentes ja configurada nas sprintas anteriores.
5. **Sprint 6-7** implementam a logica de jogo (movimento, skills, vitoria, reinicio); dependem das estruturas de dados (Sprint 2).
6. **Sprint 8** integra o SDK de anuncios; exige que o fluxo de falha/vitoria ja esteja funcionando (Sprint 7).
7. **Sprint 9** adiciona salvamento local; deve ser testado apos a logica de nivel estar estavel (Sprint 7).
8. **Sprint 10** adiciona testes automatizados; pode ser executado a qualquer momento, mas recomendamos apos as funcionalidades core estarem estaveis.
9. **Sprint 11** realiza a validacao final de UI/UX, responsividade e verificacao de escopo.

Sprint 11 e a unica que pode ser validadas isoladamente, pois reune verificacoes de UI, lint, build, testes e compliance visual.

## 4. Checklist de validacao geral
- lint
- typecheck
- build
- testes unitarios e de integracao
- fluxo manual de jogo (iniciar, jogar, falhar, reiniciar, assistir anuncio)
- responsividade em mobile e desktop (se houver UI)
- regressoes (verificar que funcionalidades ja implementadas nao quebram)
- verificacao de escopo (nao introduzir funcionalidades fora do MVP)
- verificacao de arquivos alterados (garantir que apenas os previstos foram modificados)
- verificacao de variaveis de ambiente (ex.: ADMOB_ID)
- verificacao de seguranca basica
- verificacao contra docs/design/UI_UX_GUIDE.md, quando aplicavel

## 5. Pontos que exigem modelo mais forte
- alteracao arquitetural sensivel – escolher engine final (Godot vs Cocos2d-x) e criar arquitetura de pastas definitiva.
- refatoracao ampla – mover codigo entre modulos ja existentes.
- integracao externa – SDK de anuncios (Google AdMob) e possiveis chaves de API.
- performance – garantir 60 FPS em dispositivos alvo; pode exigir profiling avancado.
- debugging complexo – rastrear bugs de colisao ou fisica de multiplas criaturas.
- alteracoes em fluxo critico – regras de progresso de nivel, contagem de falhas/vitorias para anuncios.
- decisoes sensveis de UX – definir barra de tempo, cooldown visual; impactam percecao do jogador.

## 6. Observacoes finais
- **Escopo** – Nenhuma sprint deve introduzir mecanicas ou recursos nao descritos no PRD_CONSOLIDADO.md.
- **Arquitetura** – Manter separados: UI, Core Engine, Data Structures, Ads Integration.
- **Riscos** – Falha em validar UI_UX_GUIDE pode gerar aparencia generica de IA; sempre checar antes de criar componentes visuais.
- **Dependencias** – Todas as dependencias devem ser declaradas em package.json; variaveis de ambiente devem ser definidas em .env.example.
- **Requerencias de confirmacao** – Decisoes sobre engine, escolhas de asset pipeline e integracao de SDK exigem aprovacao humana antes de avancar.
- **Uso obrigatorio de UI_GUIDE** – Em todas as sprints classificadas como Sim ou Indireto de UI/UX, deve-se incluir leitura previa de docs/design/UI_UX_GUIDE.md e seguir os criterios de aceite visual descritos.
