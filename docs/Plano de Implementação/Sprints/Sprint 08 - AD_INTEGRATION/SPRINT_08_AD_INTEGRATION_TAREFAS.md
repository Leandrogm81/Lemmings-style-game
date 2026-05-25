# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome da sprint original:** Sprint 08 — AD_INTEGRATION
- **Objetivo da sprint original:** Integrar SDK de anuncios intersticiais (ex.: Google AdMob) para exibir anuncios apos 3 falhas consecutivas ou 2 vitorias consecutivas.
- **Arquivo de origem:** `docs/Plano de Implementação/Sprints/Sprint 08 - AD_INTEGRATION/SPRINT_08_AD_INTEGRATION.md`
- **Resumo do escopo:** Criar módulo de contadores de streak (falha/vitória) em `src/ads/ads_manager.ts`, criar tela fullscreen de anúncio intersticial (`src/ui/AdScreen.tsx`), e disparar o anúncio quando `failureStreak >= 3` ou `winStreak >= 2`. Incluir botão "Sair agora" com cor primária `#1D4ED8`. O anúncio só deve ser carregado quando necessário.

---

## Análise da Sprint

### Objetivo da sprint

Adicionar exibição de anúncio intersticial baseado em streaks de falhas ou vitórias consecutivas no jogo.

### Impacto UI/UX da sprint

**Classificação:** `Sim`

**Justificativa:** A sprint cria uma nova tela fullscreen (intersticial) com botão "Sair agora", que sobrepõe o jogo inteiro. Impacto direto na experiência do jogador. A tela cobre toda a área visível e o botão precisa seguir o guia visual do projeto.

Arquivo a ser consultado obrigatoriamente nas tarefas com UI:
- `docs/design/UI_UX_GUIDE.md`

### Escopo identificado

- Criar módulo `src/ads/ads_manager.ts` com contadores em memória (`failureStreak`, `winStreak`)
- Criar componente `src/ui/AdScreen.tsx` (tela intersticial fullscreen com botão "Sair agora")
- Implementar lógica de disparo: quando `failureStreak >= 3` ou `winStreak >= 2`, carregar anúncio e exibir
- Botão "Sair agora" com cor `#1D4ED8` (primária), raio 8-10px, sombra leve
- Anúncio só deve ser carregado quando a condição for satisfeita
- O `ads_manager` precisa ser importável e integrável com o fluxo de gameplay existente ou futuro

### Fora do escopo

- Não implementar compra ou assinatura
- Não integrar outras redes de anúncios (apenas o SDK mencionado como exemplo)
- Não criar experiência de recompensa por visualização completa do anúncio
- Não alterar a lógica de gameplay (contagem de falhas/vitórias já deve estar no engine)
- Não modificar `LevelManager`, `ProgressoJogador` ou outros módulos existentes a menos que necessário para conectar os eventos
- Não criar novos formatos de anúncio (apenas intersticial)

### Dependências entre partes

- O módulo `ads_manager.ts` não depende de UI — pode ser criado e testado isoladamente.
- O componente `AdScreen.tsx` depende dos tokens de tema (`theme.ts`) e do `Button.tsx`.
- O disparo do anúncio depende do `ads_manager.ts` estar criado e funcional.
- O disparo depende de entender como o jogo comunica vitória/derrota — é necessário ler a codebase para mapear esse fluxo.
- O fluxo de vitória/derrota pode ainda não existir (o projeto parece estar em estágio inicial de desenvolvimento).

### Riscos principais

- **Dependência oculta:** O fluxo de vitória/derrota da gameplay pode ainda não estar implementado ou pode ser diferente do esperado. Se não houver um evento/função clara de fim de nível, a integração precisará de adaptação.
- **Regressão:** O `LevelManager` gerencia o estado runtime do nível. Se houver tentativa de modificar `LevelManager` ou `LevelRuntimeState`, pode quebrar o fluxo existente.
- **SDK externo:** Depender de um SDK de anúncios de terceiros adiciona complexidade de build, configuração, termos de serviço e possíveis blockers.
- **UI bloqueante:** Um intersticial que não funciona corretamente (trava, não fecha, não aparece) bloqueia o jogador de continuar.
- **Contagem incorreta:** Eventos duplicados de vitória/derrota podem inflar os streaks e exibir anúncios indesejados.

### Estratégia de quebra

1. **Mapeamento primeiro:** Antes de qualquer código, ler os arquivos relevantes da codebase para confirmar os pontos de integração.
2. **Módulo puro primeiro:** Criar `ads_manager.ts` como módulo stateless/facade sem dependência de React ou UI.
3. **UI separada:** Criar `AdScreen.tsx` como componente puro de apresentação, reutilizando `Button.tsx` e `theme.ts`.
4. **Integração depois:** Conectar os contadores ao fluxo de gameplay. Esta tarefa depende de confirmações da leitura inicial.
5. **Testes:** Adicionar testes para a lógica pura de contadores.
6. **SDK real por último:** A integração com SDK de terceiros é a tarefa mais arriscada e deve ser feita isoladamente, por último, e com modelo mais forte.

---

# Tarefas da Sprint

## Tarefa 1 — Leitura do UI_UX_GUIDE.md e mapeamento de design tokens

### Objetivo

Ler o guia visual do projeto (`docs/design/UI_UX_GUIDE.md`) e os tokens existentes (`src/ui/theme.ts`) para confirmar cores, raios, sombras e padrões de botão que serão usados no AdScreen.

### Tipo da tarefa

`leitura/mapeamento`

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** É uma tarefa exclusivamente de leitura e documentação. Nenhum código ou componente é alterado.

### Pré-requisitos

- Nenhum. É a primeira tarefa.

### Arquivos prováveis

- `docs/design/UI_UX_GUIDE.md`
- `src/ui/theme.ts`
- `src/ui/Button.tsx` (para confirmar o componente existente)

### Passos

1. Ler `docs/design/UI_UX_GUIDE.md` seção 4.2 (Cores), 4.5 (Bordas/sombras/cantos) e 5.1 (Botões)
2. Ler `src/ui/theme.ts` para confirmar que `colors.primary` é `#1D4ED8`
3. Ler `src/ui/Button.tsx` para verificar se o componente suporta o estilo do botão "Sair agora"
4. Documentar os tokens que serão usados: cor primária, raio de botão, sombra, fontSize de botão
5. Anotar se o `Button.tsx` existente cobre as necessidades ou se precisa de adaptação

### Critérios de aceite

- Seção 4.2 do guia lida e tokens de cor confirmados
- Seção 4.5 lida e valores de borderRadius.button e shadow.button confirmados
- Seção 5.1 lida e padrão de botão primário confirmado
- `Button.tsx` verificado: suporta variante `primary`, cor `#1D4ED8`, padding `12px 32px`, fontSize `14px`, fontWeight `semibold`

### Como validar

- Leitura manual confirmada. Este é um checkpoint de documentação — não há código para executar.
- Verificar no terminal: `cat src/ui/theme.ts | grep -E "(primary|button|shadow)"` para confirmar tokens

### Riscos

- Nenhum. Apenas leitura.

### O que NÃO alterar

- Nenhum arquivo deve ser alterado nesta tarefa.

### Reversibilidade

- Tarefa puramente de leitura — não há o que reverter.

### Modelo recomendado

`modelo econômico suficiente`

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Leitura do UI_UX_GUIDE.md e mapeamento de design tokens.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

OBJETIVO:
Ler docs/design/UI_UX_GUIDE.md (seções 4.2, 4.5, 5.1) e src/ui/theme.ts para confirmar
que colors.primary = #1D4ED8, borderRadius.button = 8, shadow.button existe, Button.tsx
tem variante primary.

NENHUM ARQUIVO DEVE SER ALTERADO.
Saída: resumo dos tokens que serão usados nas tarefas seguintes (cor, raio, sombra,
fontSize, padding do botão "Sair agora").
```

---

## Tarefa 2 — Mapear fluxo de vitória/derrota na codebase

### Objetivo

Ler os arquivos de gameplay para identificar como o jogo comunica vitória e derrota, e onde os contadores de streak devem ser incrementados.

### Tipo da tarefa

`leitura/mapeamento`

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Tarefa exclusivamente de investigação e documentação. Nenhum código é alterado.

### Pré-requisitos

- Nenhum.

### Arquivos prováveis

- `src/game/level_manager.ts`
- `src/game/skills.ts`
- `src/core/lvl_config.ts`
- `src/core/progresso_jogador.ts`
- `src/core/criatura.ts`
- `src/App.tsx`
- Qualquer arquivo que contenha `vitória`, `derrota`, `vitoria`, `derrota`, `win`, `lose`, `gameOver`, `levelComplete`, `falhou`, `completou`

### Passos

1. Ler `src/game/level_manager.ts` — procurar por métodos ou eventos de fim de nível
2. Ler `src/game/skills.ts` — entender se há notificação de sucesso/falha
3. Procurar por funções como `completeLevel`, `failLevel`, `vitoria`, `derrota` em toda a `src/`
4. Verificar se `LevelRuntimeState` tem campos que indicam se o nível foi vencido/perdido
5. Verificar se existe algum sistema de eventos ou callbacks para fim de nível (ex.: `subscribe`, `onComplete`, `onFail`)
6. Documentar hipóteses sobre o ponto de integração
7. Se não houver fluxo de vitória/derrota implementado, reportar que essa é uma dependência não resolvida

### Critérios de aceite

- Mapeamento claro de como vitória/derrota é detectada (ou não)
- Lista de arquivos que precisarão ser modificados para conectar o ads_manager
- Se o fluxo não existir, documento explícito dizendo que a integração depende de implementação futura do game loop

### Como validar

- `grep -rn "vit\\|derrot\\|win\\|lose\\|gameOver\\|complete\\|falh" src/ --include="*.ts" --include="*.tsx"` para confirmar palavras-chave
- Leitura manual confirmada

### Riscos

- Pode não existir um fluxo claro de vitória/derrota. Se for o caso, a sprint inteira pode precisar de reavaliação porque a pré-condição da sprint não está satisfeita.
- A leitura pode revelar que `LevelManager` é lógica pura e a UI consome seu estado via `getState()`, o que não gera eventos — seria necessário polling ou wrapper.

### O que NÃO alterar

- Nenhum arquivo deve ser alterado nesta tarefa.

### Reversibilidade

- Tarefa puramente de leitura — não há o que reverter.

### Modelo recomendado

`modelo econômico suficiente`

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Mapear fluxo de vitória/derrota na codebase.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

OBJETIVO:
Ler src/game/level_manager.ts, src/game/skills.ts e qualquer outro arquivo relevante
para identificar COMO o jogo determina que um nível foi vencido ou perdido.

Use grep para procurar: vit, derrot, win, lose, gameOver, complete, falh, vitoria, derrota
em todos os arquivos .ts/.tsx em src/.

Documente:
- Onde vitória/derrota é detectada
- Se há eventos, callbacks ou polling
- Qual arquivo precisará ser modificado para conectar ads_manager
- Se NÃO houver fluxo, informe explicitamente

NENHUM ARQUIVO DEVE SER ALTERADO.
Saída: relatório de mapeamento.
```

---

## Tarefa 3 — Criar módulo ads/ads_manager.ts com contadores de streak

### Objetivo

Criar o módulo `src/ads/ads_manager.ts` com estado singleton em memória para rastrear streaks de falhas e vitórias consecutivas, e funções de API pública para o resto do jogo interagir.

### Tipo da tarefa

`lógica de negócio`

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Este módulo é lógica pura sem dependência de React, DOM, ou estilos. Contadores em memória que não renderizam nada.

### Pré-requisitos

- Tarefa 1 concluída (leitura do guia — não é dependência técnica, apenas informação)
- Tarefa 2 concluída (mapeamento do fluxo de vitória/derrota — para saber quais funções exportar)

### Arquivos prováveis

- `src/ads/ads_manager.ts` (criação)
- `src/ads/` (pasta, se não existir)

### Passos

1. Criar pasta `src/ads/` se não existir
2. Criar `src/ads/ads_manager.ts`
3. Definir interface `AdState` (ou tipo exportado) com os campos:
   - `failureStreak: number` — contagem de falhas consecutivas
   - `winStreak: number` — contagem de vitórias consecutivas
   - `lastResult: 'win' | 'lose' | null` — último resultado para detectar quebra de streak
4. Criar estado singleton (variável de módulo, não classe/instância) para simplicidade
5. Exportar função `registrarVitoria()` que:
   - Incrementa `winStreak` e zera `failureStreak`
   - Atualiza `lastResult = 'win'`
6. Exportar função `registrarDerrota()` que:
   - Incrementa `failureStreak` e zera `winStreak`
   - Atualiza `lastResult = 'lose'`
7. Exportar função `deveExibirAnuncio()` que:
   - Retorna `true` se `failureStreak >= 3` ou `winStreak >= 2`
8. Exportar função `resetarAposExibicao()` que:
   - Zera ambos os streaks
   - Reseta `lastResult = null`
9. Exportar função `getStreaks()` para debug/testes que retorna o estado atual
10. Garantir que todas as funções são puras o suficiente para serem testáveis
11. Certificar que o módulo **não importa** nada de React, UI ou SDK externo

### Critérios de aceite

- `registrarVitoria()` incrementa winStreak e zera failureStreak
- `registrarDerrota()` incrementa failureStreak e zera winStreak
- Vitória seguida de derrota quebra o streak de vitórias
- `deveExibirAnuncio()` retorna `true` quando `failureStreak >= 3` ou `winStreak >= 2`
- `deveExibirAnuncio()` retorna `false` para streaks menores
- `resetarAposExibicao()` zera ambos os streaks
- Módulo não importa nada de React, ReactDOM, ou qualquer UI
- TypeScript compila sem erros com `tsc --noEmit`

### Como validar

- `npx tsc --noEmit` — sem erros de tipo
- Teste manual no console do Node (ou com import no projeto): chamar sequências de `registrarVitoria`/`registrarDerrota` e verificar `deveExibirAnuncio()`
- Opcional: adicionar `console.log` temporário para verificar comportamento

### Riscos

- Baixo. Lógica pura com estado singleton simples.
- Não usar estado global do React ou Context — manter como variável de módulo para simplicidade.

### O que NÃO alterar

- Não modificar `LevelManager`, `LevelRuntimeState`, `ProgressoJogador`
- Não modificar nenhum arquivo fora de `src/ads/`
- Não adicionar dependências npm
- Não importar nada de React nem de SDK de terceiros

### Reversibilidade

- Remover o arquivo `src/ads/ads_manager.ts` e a pasta `src/ads/` se vazia
- Nenhum outro arquivo é tocado

### Modelo recomendado

`modelo econômico suficiente`

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Criar módulo ads/ads_manager.ts com contadores de streak.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

OBJETIVO:
Criar src/ads/ads_manager.ts com estado singleton em memória.

Funções a exportar:
- registrarVitoria(): void
- registrarDerrota(): void
- deveExibirAnuncio(): boolean (true se failureStreak >= 3 ou winStreak >= 2)
- resetarAposExibicao(): void
- getStreaks(): { winStreak, failureStreak, lastResult }

REGRAS:
- Use variável de módulo (let), não classe, não React state, não Context
- NÃO importe nada de React, UI ou SDK externo
- Vitória consecutiva incrementa winStreak, zera failureStreak
- Derrota consecutiva incrementa failureStreak, zera winStreak
- Mudar de vitória para derrota (ou vice-versa) quebra o streak anterior

VALIDE com: npx tsc --noEmit
```

---

## Tarefa 4 — Criar componente AdScreen (interstitial placeholder fullscreen)

### Objetivo

Criar o componente `src/ui/AdScreen.tsx` que renderiza uma tela fullscreen simulando um anúncio intersticial, com overlay escuro e botão "Sair agora" estilizado segundo o guia visual.

### Tipo da tarefa

`UI/componente`

### Impacto UI/UX

**Classificação:** `Sim`

**Justificativa:** Cria uma nova tela fullscreen que sobrepõe todo o jogo. Impacto direto na experiência do jogador.

**Requisitos obrigatórios:**
- Deve ler `docs/design/UI_UX_GUIDE.md` (seções 4.2, 4.5, 5.1 sobre cores, botões, bordas, sombras)
- Deve validar mobile e desktop (viewport fullscreen, botão com altura de toque >= 48px)
- Deve evitar aparência genérica de IA (não usar gradientes chamativos, não usar textos de marketing, não usar roxo/azul neon)
- Deve prever estado de loading (simular carregamento do anúncio) e estado de erro (se o anúncio não carregar)
- Deve produzir relatório final explicando como a implementação segue o guia

### Pré-requisitos

- Tarefa 1 concluída (mapeamento dos tokens de design)
- Tarefa 3 concluída (ads_manager criado — embora AdScreen não importe ads_manager, é bom ter a API decidida)

### Arquivos prováveis

- `src/ui/AdScreen.tsx` (criação)

### Passos

1. Ler `docs/design/UI_UX_GUIDE.md` seções 4.2 (Cores), 4.5 (Bordas/sombras/cantos), 5.1 (Botões) e 6 (Estados obrigatórios)
2. Criar `src/ui/AdScreen.tsx`
3. Componente deve receber props:
   - `onClose: () => void` — chamado quando o jogador clica "Sair agora"
   - `isLoading?: boolean` — estado opcional de carregamento
   - `error?: string | null` — mensagem de erro opcional
4. Renderizar overlay fullscreen com:
   - Fundo preto/semi-transparente (`rgba(0,0,0,0.85)` ou similar)
   - Área central simulando o anúncio (placeholder visual com fundo branco e texto "Anúncio")
   - Botão "Sair agora" abaixo da área do anúncio, usando importação de `Button` do `./Button` com variante `primary` (que já tem `backgroundColor: colors.primary = #1D4ED8`)
5. Estados visuais:
   - **Padrão:** placeholder do anúncio + botão "Sair agora"
   - **Loading** (se `isLoading = true`): spinner ou texto "Carregando anúncio..."
   - **Erro** (se `error` preenchido): mensagem de erro explicativa + botão "Fechar"
6. Estilo:
   - Usar tokens de `theme.ts` (colors, spacing, fontSize, borderRadius, fontWeight, shadow)
   - Botão "Sair agora" usa `Button` com variante `primary` = já tem cor `#1D4ED8`
   - NÃO usar gradientes chamativos
   - NÃO usar textos genéricos de marketing
   - NÃO usar roxo/azul neon
   - NÃO adicionar ícones aleatórios
   - Garantir `minHeight: 48px` no botão para toque mobile
   - Garantir que overlay cobre 100% da viewport (`position: fixed`, `inset: 0`, `z-index` alto)

### Critérios de aceite

- Componente renderiza overlay fullscreen (`position: fixed; inset: 0; z-index: 9999`)
- Botão "Sair agora" usa `colors.primary = #1D4ED8` como cor de fundo
- Botão tem `borderRadius: borderRadius.button = 8px`
- Botão tem `boxShadow: shadow.button`
- Estado de loading exibe indicador visual diferente do estado normal
- Estado de erro exibe mensagem e botão de fechar
- TypeScript compila sem erros com `tsc --noEmit`
- Em mobile, botão tem altura mínima de toque >= 48px
- Nenhuma importação de SDK de terceiros
- Relatório final explicando como o componente segue o UI_UX_GUIDE.md

### Como validar

- `npx tsc --noEmit` — sem erros de tipo
- `npm run build` — build bem-sucedido
- `npm run dev` — renderizar o componente e inspecionar visualmente:
  - No desktop, verificar overlay fullscreen, cores, botão
  - No mobile (devtools mobile viewport), verificar altura do botão e layout
- Verificar manualmente:
  - Cor do botão é `#1D4ED8` (inspecionar elemento)
  - Overlay cobre toda a tela
  - Estados de loading e erro funcionam passando props

### Riscos

- Baixo: componente novo, não afeta código existente.
- Se `Button.tsx` não for flexível o suficiente (ex.: não aceita `disabled` ou `loading`), pode ser necessário ajustar `Button.tsx` — mas isso está fora do escopo desta tarefa. Alternativa: estilizar botão inline.

### O que NÃO alterar

- Não modificar `ads_manager.ts` nesta tarefa
- Não modificar `theme.ts`
- Não modificar `Button.tsx` a menos que seja estritamente necessário e mesmo assim apenas para adicionar `disabled` se necessário
- Não modificar `App.tsx`, `MenuScreen`, `LevelSelectionScreen` ou qualquer outro arquivo existente
- Não adicionar dependências npm
- Não integrar SDK de terceiros

### Reversibilidade

- Remover `src/ui/AdScreen.tsx`
- Nenhum outro arquivo é tocado

### Modelo recomendado

`modelo econômico suficiente`

**Observação:** Embora a tarefa envolva UI/UX, o componente é simples (overlay + botão) e os tokens já estão mapeados. Modelo econômico dá conta, desde que o prompt inclua a leitura obrigatória do guia.

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Criar componente AdScreen (interstitial placeholder fullscreen).

NÃO AVANCE PARA A PRÓXIMA TAREFA.

APLICAR UI/UX GATE: Este componente tem impacto UI/UX direto (Sim).
LEIA docs/design/UI_UX_GUIDE.md antes de começar.

OBJETIVO:
Criar src/ui/AdScreen.tsx que renderiza overlay fullscreen simulando anúncio intersticial.

Props:
- onClose: () => void
- isLoading?: boolean (opcional)
- error?: string | null (opcional)

REGRAS DE UI (seguir UI_UX_GUIDE.md):
- Overlay: position fixed, inset 0, z-index 9999, fundo rgba(0,0,0,0.85)
- Área central: fundo branco, borderRadius 16px (modal), padding 24px (spacing.lg)
- Botão "Sair agora": usar Button existente (import de ./Button) com variant="primary"
  - Isso já dá cor #1D4ED8, borderRadius 8px, shadow button, fontSize 14px
- Estado loading: exibir texto "Carregando anúncio..." centralizado
- Estado erro: exibir mensagem + botão "Fechar" que chama onClose
- Altura mínima do botão: 48px (para toque mobile)
- NÃO usar gradientes, textos de marketing, ícones, roxo/azul neon
- NÃO importar SDK de terceiros
- NÃO modificar Button.tsx ou theme.ts

VALIDE com: npx tsc --noEmit

RELATÓRIO FINAL: explique como o componente segue cada seção do UI_UX_GUIDE.md
(cores=4.2, bordas=4.5, botões=5.1, estados=6, responsividade=7).
```

---

## Tarefa 5 — Integrar AdScreen ao fluxo do jogo com disparo condicional

### Objetivo

Conectar os contadores do `ads_manager.ts` aos eventos de vitória/derrota do jogo e fazer o `AdScreen` aparecer quando a condição de streak for satisfeita.

### Tipo da tarefa

`estado/integração`

### Impacto UI/UX

**Classificação:** `Indireto`

**Justificativa:** Esta tarefa não cria novos componentes visuais, mas decide QUANDO o AdScreen aparece. Impacto indireto no fluxo do jogador (timing do anúncio, prevenção de anúncio durante gameplay).

**Requisitos obrigatórios:**
- Deve ler `docs/design/UI_UX_GUIDE.md` seções 6 (Estados obrigatórios) para garantir que o timing do anúncio não interrompe o jogador em momento crítico
- Deve validar mobile e desktop (anúncio funciona em ambas as viewports)
- Deve prever estado de erro (se o anúncio não puder ser carregado, o jogo não deve travar)
- Deve evitar que o jogador fique preso (sempre ter botão "Sair agora" disponível)

### Pré-requisitos

- Tarefa 2 concluída (mapeamento do fluxo de vitória/derrota)
- Tarefa 3 concluída (ads_manager.ts criado e funcional)
- Tarefa 4 concluída (AdScreen.tsx criado e funcional)

### Arquivos prováveis

Hipótese (depende da Tarefa 2):
- `src/App.tsx` (provável local para gerenciar estado global e renderizar AdScreen condicionalmente)
- `src/ui/GameScreen.tsx` (se existir ou for criado em outra sprint)
- `src/game/level_manager.ts` (se for necessário conectar via subscribe)
- **IMPORTANTE:** Os caminhos exatos dependem do resultado da Tarefa 2. Confirmar antes de codificar.

### Passos

1. Confirmar com base no resultado da Tarefa 2 onde vitória/derrota é detectada
2. No componente que gerencia a sessão de jogo (provavelmente `App.tsx` ou um futuro `GameScreen`):
   a. Importar funções do `ads_manager`
   b. No callback/momento de vitória, chamar `registrarVitoria()` e depois `deveExibirAnuncio()`
   c. No callback/momento de derrota, chamar `registrarDerrota()` e depois `deveExibirAnuncio()`
3. Se `deveExibirAnuncio()` retornar `true`:
   a. Renderizar `<AdScreen>` no topo da árvore React
   b. Chamar `resetarAposExibicao()` quando o jogador fechar
4. Garantir que o anúncio não aparece durante a gameplay (só entre níveis)
5. Garantir que fechar o anúncio retorna o jogador ao estado anterior (tela de seleção de nível ou menu)

### Critérios de aceite

- Vitórias consecutivas contam e disparam anúncio na 2ª vitória seguida
- Derrotas consecutivas contam e disparam anúncio na 3ª derrota seguida
- Intercalar vitória e derrota NÃO dispara anúncio
- Após exibir anúncio, streaks zeram (não dispara de novo sem novas jogadas)
- Fechar anúncio retorna o jogador ao fluxo normal do jogo
- Se o fluxo de vitória/derrota não existir, a tarefa deve reportar e parar (não inventar game loop)
- TypeScript compila sem erros

### Como validar

- `npx tsc --noEmit`
- `npm run build`
- Jogo manual: jogar 2 vitórias seguidas → ver anúncio aparecer
- Jogo manual: jogar 3 derrotas seguidas → ver anúncio aparecer
- Jogo manual: alternar vitória e derrota → confirmar que anúncio NÃO aparece
- Após fechar anúncio, voltar ao menu/seleção de nível

### Riscos

- **MÉDIO:** Se o fluxo de vitória/derrota não existir, esta tarefa não pode ser concluída. A sprint pode precisar ser suspensa até que o game loop seja implementado.
- **MÉDIO:** Se o evento de vitória/derrota for disparado múltiplas vezes (ex.: animação de fim de nível dispara duas vezes), o streak será incrementado incorretamente. É importante garantir que o registro de resultado só ocorra uma vez por nível.
- **BAIXO:** Se o `LevelRuntimeState` não tiver um campo claro de "nível completo", pode ser necessário ler o `LevelManager` periodicamente.

### O que NÃO alterar

- Não alterar `ads_manager.ts` (já criado e funcional)
- Não alterar `AdScreen.tsx` (já criado e funcional)
- Não alterar `LevelRuntimeState` a menos que seja estritamente necessário (e mesmo assim, apenas para adicionar um campo de status)
- Não alterar o sistema de progresso do jogador (`ProgressoJogador`)
- Não adicionar dependências npm

### Reversibilidade

- Reverter as alterações no arquivo que gerencia a sessão de jogo (ex.: `App.tsx`)
- Remover a renderização condicional do `AdScreen`
- Remover as chamadas a `registrarVitoria()` e `registrarDerrota()`

### Modelo recomendado

`modelo intermediário recomendado`

**Justificativa:** Depende de leitura de codebase para encontrar o ponto de integração, e o fluxo de vitória/derrota pode não existir ou ser diferente do esperado. Requer capacidade de adaptação a código existente.

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Integrar AdScreen ao fluxo do jogo com disparo condicional.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

APLICAR UI/UX GATE: Impacto UI/UX indireto (timing do anúncio).
LEIA docs/design/UI_UX_GUIDE.md seção 6 (Estados obrigatórios).

OBJETIVO:
Conectar ads_manager aos eventos de vitória/derrota do jogo.

PRIMEIRO: Leia o resultado da Tarefa 2 para saber onde vitória/derrota é detectada.
Se o fluxo NÃO existir, REPORTE e PARE — não invente um game loop.

SE o fluxo existir:
1. No arquivo que gerencia a sessão (ex.: App.tsx):
   a. Importar registrarVitoria, registrarDerrota, deveExibirAnuncio, resetarAposExibicao de '../ads/ads_manager'
   b. No callback de vitória: registrarVitoria(); se deveExibirAnuncio() -> mostrar AdScreen
   c. No callback de derrota: registrarDerrota(); se deveExibirAnuncio() -> mostrar AdScreen
2. AdScreen recebe onClose que chama resetarAposExibicao() e esconde o AdScreen
3. AdScreen só aparece ENTRE níveis, nunca durante gameplay

NÃO alterar ads_manager.ts nem AdScreen.tsx.
NÃO adicionar dependências npm.

VALIDE com: npx tsc --noEmit
```

---

## Tarefa 6 — Adicionar testes para ads_manager.ts

### Objetivo

Escrever testes unitários (seguindo o padrão existente do projeto) para verificar o comportamento dos contadores de streak em todos os cenários.

### Tipo da tarefa

`testes`

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Testes unitários de módulo puro sem dependência visual.

### Pré-requisitos

- Tarefa 3 concluída (ads_manager.ts criado e funcional)
- Confirmar framework de testes do projeto (atualmente placeholders com `console.assert`)

### Arquivos prováveis

- `src/ads/ads_manager.test.ts` (criação)
- `src/game/level_manager.test.ts` (referência de padrão)

### Passos

1. Seguir o padrão existente em `src/game/level_manager.test.ts` (funções exportadas com `console.assert`)
2. Criar `src/ads/ads_manager.test.ts`
3. Testar cenários:
   - **Cenário 1:** Vitória consecutiva 2x → `deveExibirAnuncio()` retorna `true`
   - **Cenário 2:** Vitória consecutiva 1x → `deveExibirAnuncio()` retorna `false`
   - **Cenário 3:** Derrota consecutiva 3x → `deveExibirAnuncio()` retorna `true`
   - **Cenário 4:** Derrota consecutiva 2x → `deveExibirAnuncio()` retorna `false`
   - **Cenário 5:** V D V (intercalado) → `deveExibirAnuncio()` sempre retorna `false`
   - **Cenário 6:** Após `resetarAposExibicao()`, streaks zeram
   - **Cenário 7:** Vitória após derrota zera failureStreak
   - **Cenário 8:** Derrota após vitória zera winStreak
4. Garantir que todos os testes podem ser executados com `node --import ./src/ads/ads_manager.test.ts` (ou o comando equivalente)

### Critérios de aceite

- 8 cenários de teste implementados
- Todos passam com `console.assert`
- TypeScript compila sem erros
- Testes não dependem de React, DOM ou browser

### Como validar

- `npx tsc --noEmit`
- `node --import ./src/ads/ads_manager.test.ts` — sem erros de asserção
- Ou conforme o comando de teste definido no projeto

### Riscos

- Baixo. Lógica pura, fácil de testar.
- O projeto não tem test runner configurado (package.json tem `"test": "echo 'test placeholder'"`). Os testes seguem o padrão atual de console.assert, que funciona sem runner.

### O que NÃO alterar

- Não modificar `ads_manager.ts`
- Não modificar `level_manager.test.ts` ou outros testes existentes
- Não adicionar dependências npm de teste
- Não modificar `package.json`

### Reversibilidade

- Remover `src/ads/ads_manager.test.ts`

### Modelo recomendado

`modelo econômico suficiente`

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Adicionar testes para ads_manager.ts.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

OBJETIVO:
Criar src/ads/ads_manager.test.ts seguindo o padrão do projeto
(console.assert em funções exportadas, como em src/game/level_manager.test.ts).

CENÁRIOS OBRIGATÓRIOS:
1. 2 vitórias consecutivas -> deveExibirAnuncio() === true
2. 1 vitória -> deveExibirAnuncio() === false
3. 3 derrotas consecutivas -> deveExibirAnuncio() === true
4. 2 derrotas consecutivas -> deveExibirAnuncio() === false
5. V D V D V (intercalado) -> deveExibirAnuncio() sempre false
6. resetarAposExibicao() zera ambos os streaks
7. Vitória após derrota zera failureStreak
8. Derrota após vitória zera winStreak

NÃO modificar ads_manager.ts, level_manager.test.ts ou package.json.
NÃO adicionar dependências npm.

VALIDE com: npx tsc --noEmit && node src/ads/ads_manager.test.ts
```

---

## Tarefa 7 — Integrar SDK de anúncios de terceiros (ex.: Google AdMob / web ad provider)

### Objetivo

Substituir o placeholder do AdScreen por um anúncio real carregado de um SDK/provider de anúncios web compatível (ou preparar a camada de abstração para isso).

### Tipo da tarefa

`configuração`

### Impacto UI/UX

**Classificação:** `Indireto`

**Justificativa:** A UI do AdScreen não muda (continua sendo fullscreen overlay), mas o conteúdo interno passa de placeholder para anúncio real. O comportamento de carregamento, erro e timeout do SDK pode afetar a experiência.

**Requisitos obrigatórios:**
- Deve ler `docs/design/UI_UX_GUIDE.md` seção 6 (Estados obrigatórios)
- Deve validar mobile e desktop (o SDK precisa funcionar em ambos)
- Deve prever loading, erro e timeout com fallback para placeholder
- Deve evitar que um erro do SDK bloqueie o jogador

### Pré-requisitos

- Tarefa 4 concluída (AdScreen criado com placeholder)
- Definição de qual SDK/provider será usado (depende de decisão externa)

### Arquivos prováveis

- `src/ads/ads_manager.ts` (adição de função `showInterstitial()` ou similar)
- `src/ads/` (pasta pode receber arquivo de configuração do SDK)
- `index.html` (adição de script tag do SDK, se necessário)
- `.env` ou arquivo de configuração (se chave de API for necessária)
- `package.json` (adição de dependência, se houver pacote npm)

### Passos

1. Definir qual SDK/provider será integrado (decisão não técnica — depende de conta, termos, região)
2. Adicionar script/dependência do provider no projeto
3. Criar função `carregarAnuncioIntersticial()` em `ads_manager.ts` ou novo módulo `ads/sdk_adapter.ts`
4. Adaptar `AdScreen` para receber o conteúdo do anúncio real (ou iframe, ou div do provider)
5. Garantir fallback: se o SDK falhar, exibir placeholder + "Sair agora"
6. Garantir timeout: se o anúncio não carregar em X segundos, mostrar fallback
7. Testar em mobile e desktop

### Critérios de aceite

- SDK carrega sem erros
- Anúncio intersticial real exibido no lugar do placeholder
- Se SDK falhar, placeholder é exibido como fallback (jogador nunca fica preso)
- Botão "Sair agora" continua funcional
- TypeScript compila sem erros
- Build produz sem erros
- Testado em mobile e desktop

### Como validar

- `npx tsc --noEmit`
- `npm run build`
- Teste manual: jogar até streak disparar → ver anúncio real
- Teste manual: desconectar internet → ver fallback do placeholder
- Teste mobile: devtools mobile viewport

### Riscos

- **ALTO:** SDK pode exigir HTTPS para funcionar (pode não funcionar em `localhost`) — pode precisar de proxy ou ambiente de staging
- **MÉDIO:** SDK pode usar cookies/localStorage e exigir consentimento GDPR/LGPD
- **MÉDIO:** Adicionar script de terceiros ao `index.html` muda a superfície de segurança
- **MÉDIO:** Se o SDK não for compatível com React/Vite, pode exigir workaround
- **BAIXO:** Chave de API exposta no cliente (pode ser um risco, mas é comum em ad SDKs)

### O que NÃO alterar

- Não alterar a lógica de contadores (`ads_manager.ts` — a não ser para adicionar função de carregamento)
- Não alterar a lógica de vitória/derrota
- Não alterar `theme.ts` ou `Button.tsx`
- Não alterar componentes que não sejam o AdScreen

### Reversibilidade

- Remover script do SDK do `index.html`
- Reverter alterações no `AdScreen.tsx` para usar apenas placeholder
- Remover dependência npm, se adicionada
- Reverter alterações no `ads_manager.ts`

### Modelo recomendado

`modelo forte recomendado`

**Justificativa:** Envolve integração com SDK de terceiros, possível manipulação de DOM imperativa dentro de React, configuração de build, chaves de API, e tratamento de erros assíncronos complexos. Exige capacidade de debugging de dependências externas.

### Prompt de execução para o coder

```
EXECUTAR SOMENTE ESTA TAREFA: Integrar SDK de anúncios de terceiros.

NÃO AVANCE PARA A PRÓXIMA TAREFA.

ATENÇÃO: Esta tarefa EXIGE modelo mais forte (modelo forte recomendado).

APLICAR UI/UX GATE: Impacto UI/UX indireto (placeholder substituído por anúncio real).
LEIA docs/design/UI_UX_GUIDE.md seção 6 (Estados obrigatórios).

OBJETIVO:
Substituir o placeholder do AdScreen por anúncio real via SDK/provider.

PRIMEIRO: Defina qual provider usar (baseado no que estiver disponível).
Crie um módulo src/ads/sdk_adapter.ts que abstrai o carregamento de anúncio.

Requisitos:
1. SDK não trava o jogo se falhar
2. Se o anúncio não carregar em 10s, mostrar fallback (placeholder existente)
3. Botão "Sair agora" sempre funcional
4. Testar em mobile (devtools) e desktop
5. Se o SDK não funcionar em localhost, documentar e manter placeholder como fallback

NÃO alterar contadores de streak.
NÃO alterar lógica de vitória/derrota.
NÃO alterar theme.ts ou Button.tsx.

VALIDE com: npx tsc --noEmit && npm run build
```

---

# Ordem recomendada de execução

1. **Tarefa 1 — Leitura do UI_UX_GUIDE.md** (isolada, sem dependências, sem alteração de código)
   - Checkpoint: documentar tokens usados
2. **Tarefa 2 — Mapear fluxo de vitória/derrota** (isolada, sem alteração de código)
   - Checkpoint: Relatório de mapeamento
   - ⚠️ **Ponto de decisão:** Se não houver fluxo de vitória/derrota, a sprint não pode continuar sem implementação anterior
3. **Tarefa 3 — Criar módulo ads_manager.ts** (depende da Tarefa 2 apenas para saber interface)
   - Pode ser executada isoladamente se a interface básica (registrarVitoria/registrarDerrota) foi decidida
   - Checkpoint: `npx tsc --noEmit`
   - Commit recomendado: `feat(ads): create streak counter module`
4. **Tarefa 4 — Criar componente AdScreen** (independente da Tarefa 3)
   - Pode ser executada em paralelo com a Tarefa 3
   - Checkpoint: `npx tsc --noEmit && npm run build`
   - Commit recomendado: `feat(ads): create AdScreen placeholder component`
5. **Tarefa 5 — Integrar AdScreen ao fluxo do jogo** (depende Tarefas 2, 3 e 4)
   - ⚠️ Revisar resultado da Tarefa 2 antes de começar
   - Checkpoint após integração: `npm run dev` e testar fluxo manualmente
   - Commit recomendado: `feat(ads): wire ad display to win/loss streaks`
6. **Tarefa 6 — Adicionar testes para ads_manager.ts** (depende Tarefa 3)
   - Pode ser executada após a Tarefa 3, antes ou depois da Tarefa 4
   - Checkpoint: `node src/ads/ads_manager.test.ts`
   - Commit recomendado: `test(ads): add streak counter unit tests`
7. **Tarefa 7 — Integrar SDK de anúncios** (depende Tarefa 4, recomendado após Tarefas 5 e 6)
   - ⚠️ Modelo forte recomendado
   - Última tarefa por ser a mais arriscada
   - Commit recomendado: `feat(ads): integrate real ad SDK`

### Dependências visuais

```
Tarefa 1 (leitura guia) ──────► Tarefa 4 (AdScreen)
                                          │
Tarefa 2 (mapear fluxo) ──────► Tarefa 5 (integração)
       │                             │
       ▼                             │
Tarefa 3 (ads_manager) ──────────────┘
       │
       ▼
Tarefa 6 (testes)          Tarefa 7 (SDK real) ──► depende de Tarefa 4
```

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` executado sem erros
- [ ] `npm run build` executado sem erros
- [ ] `npm run lint` executado (placeholders aceitos, sem novos erros)
- [ ] Testes de `ads_manager.ts` executados e passando
- [ ] Fluxo manual validado: 2 vitórias seguidas → anúncio aparece
- [ ] Fluxo manual validado: 3 derrotas seguidas → anúncio aparece
- [ ] Fluxo manual validado: vitórias e derrotas intercaladas → anúncio NÃO aparece
- [ ] Fluxo manual validado: fechar anúncio → retorna ao menu/seleção de nível
- [ ] Responsividade validada: mobile (viewport 375px) e desktop (viewport 1280px)
- [ ] Regressões verificadas: menu principal, seleção de nível, gameplay (se existir)
- [ ] Arquivos alterados revisados (diff pequeno e focado)
- [ ] Escopo conferido contra a sprint original — nada fora do escopo adicionado
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas
- [ ] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (Tarefa 4, Tarefa 5)
- [ ] Relatório final de conformidade com UI_UX_GUIDE.md gerado (Tarefa 4)

---

# Tarefas que NÃO devem ir para modelo econômico

| Tarefa | Motivo | Modelo sugerido |
|--------|--------|-----------------|
| **Tarefa 7 — Integrar SDK de anúncios de terceiros** | Envolve dependência externa, configuração de build, chaves de API, possível manipulação de DOM imperativa, tratamento de erros assíncronos complexos, compatibilidade com React/Vite, debugging de SDK. Tudo isso exige experiência e capacidade de lidar com imprevistos. | Modelo forte recomendado |
| **Tarefa 5 — Integrar AdScreen ao fluxo do jogo** | Depende de leitura de codebase para encontrar ponto de integração. O fluxo de vitória/derrota pode não existir ou ser diferente do esperado. Requer adaptação a código existente não mapeado. | Modelo intermediário recomendado |

### Observações

- **Tarefa 5** é marcada como "modelo intermediário" e não "forte" porque, uma vez que o fluxo de vitória/derrota seja confirmado na Tarefa 2, a integração é mecânica (importar funções, chamar no callback certo, renderizar condicionalmente). Se o fluxo NÃO existir, a tarefa deve parar e reportar — não inventar.
- **Todas as demais tarefas** são adequadas para modelo econômico por serem módulos puros (Tarefa 3, Tarefa 6), componentes isolados (Tarefa 4), ou leitura pura (Tarefa 1, Tarefa 2).
