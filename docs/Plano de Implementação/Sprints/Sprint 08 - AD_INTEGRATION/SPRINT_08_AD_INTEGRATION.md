# Sprint 08 — AD_INTEGRATION

## Objetivo
Integrar SDK de anuncios intersticiais (ex.: Google AdMob) para exibir anuncios apos 3 falhas consecutivas ou 2 vitorias consecutivas.

## Impacto UI/UX
Sim

## Escopo da sprint
- Criar modulo ads/ads_manager.ts que controla contadores de falhas/vitorias e dispara load de anuncio.
- Exibir intersticial via showInterstitial() que cobre tela inteira.
- Incluir botao Sair agora com cor primaria #1D4ED8.
- Garantir que anuncio so seja carregado quando necessario.
- Nao implementar compra ou outros formatos de anuncio.

## Fora do escopo
- Nao desenvolver experiencia de recompensa por visualizacao completa.
- Nao integrar outras redes de anuncios.

## Arquivos provaveis a criar/alterar
- src/ads/ads_manager.ts
- src/ads/ad_placeholder.tsx (tela fullscreen placeholder)
- src/ui/AdScreen.tsx (tela do intersticial com botao Sair agora)

## Tarefas em ordem
### Tarefa 8.1 — Ler UI_UX_GUIDE.md secao de botoes de anuncio
Descricao: Confirmar cor do botao Sair agora (#1D4ED8) e tamanho.
Arquivos: docs/design/UI_UX_GUIDE.md

### Tarefa 8.2 — Criar contador de falhas/vitorias
Descricao: Manter variaveis em memoria (failureStreak, winStreak) que incrementam conforme gameplay.
Arquivos provaveis: src/ads/ads_manager.ts

### Tarefa 8.3 — Implementar logica de disparo de anuncio
Descricao: Quando failureStreak >= 3 ou winStreak >= 2, carregar anuncio e exibir.
Arquivos provaveis: src/ads/ads_manager.ts

### Tarefa 8.4 — Criar placeholder de anuncio fullscreen
Descricao: Componente que contém imagem placeholder + botao Sair agora.
Arquivos provaveis: src/ui/AdScreen.tsx

### Tarefa 8.5 — Estilizar botao Sair agora
Descricao: Aplicar cor primaria #1D4ED8, raio 8-10px, sombra leve.
Arquivos provaveis: src/ui/AdScreen.tsx

## Critérios de aceitação
- Contadores de falha/vitoria sao atualizados corretamente.
- Anuncio exibe somente quando condicao e satisfeita.
- Botao Sair agora possui cor e estilo corretos.
- Tela de anuncio nao bloqueia interacoes inesperadas.

## Riscos
- Chamadas ao SDK podem falhar; necessidade de tratamento de erro.
- Fluxo de falha/vitoria pode contar incorretamente se eventos forem duplicados.

## O que NÃO deve ser alterado nesta sprint
- Nao alterar a logica de gameplay (contagem de falhas/vitorias ja deve estar no engine).
- Nao criar novos formatos de anuncio.
