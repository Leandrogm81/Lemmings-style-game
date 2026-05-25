# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome da sprint original:** Sprint 12 — VALIDACAO_FINAL
- **Objetivo da sprint original:** Realizar validação final do MVP: checar regressão, responsividade, compliance com UI_UX_GUIDE, executar build para web, validar fluxo de jogo completo.
- **Arquivo de origem:** `docs/Plano de Implementação/Sprints/Sprint 12 - VALIDACAO_FINAL/SPRINT_12_VALIDACAO_FINAL.md`
- **Resumo do escopo:** Executar lint, typecheck, build web, testes manuais de fluxo completo, verificar UI contra guia de estilo, gerar relatório de cobertura de testes (>= 80%). Sem lançamento de produção.

### Ajustes necessários detectados na leitura da codebase

| Item da sprint original | Realidade na codebase |
|---|---|
| Build para ios/android/pc | **Não aplicável.** O projeto é React + Vite + TypeScript (web apenas). Não há Capacitor, Cordova ou qualquer configuração de export mobile/desktop. O único build disponível é `vite build` (web). |
| `npm run lint` | Script atual é `echo 'lint placeholder'` — placeholder, não há ESLint configurado. A tarefa se limita a executar e confirmar que o placeholder não quebra. |
| Cobertura >= 80% | Apenas `storage/__tests__/progress.test.ts` usa vitest (6 cenários). `ads/ads_manager.test.ts` e `game/level_manager.test.ts` usam runner manual com `console.assert` — não são detectados pelo vitest. Cobertura real provavelmente muito abaixo de 80%. |
| `npm run typecheck` | Usa `tsc --noEmit`. É a única verificação real de qualidade de código. |

---

## Análise da Sprint

### Objetivo da sprint

Validar que o MVP está funcional, consistente visualmente e livre de erros de compilação, tipo e regressão antes de considerar a versão testável pronta.

### Impacto UI/UX da sprint

**Sim.**

Justificativa: a sprint inclui verificação de todas as telas contra o `UI_UX_GUIDE.md`, validação de responsividade mobile/desktop, e teste manual de fluxo visual completo (iniciar jogo, selecionar nível, jogar, ver anúncio, reiniciar). Tarefas visuais devem obrigatoriamente seguir `docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

- Executar lint (placeholder, apenas verificar que não quebra)
- Executar typecheck e corrigir erros de tipo (tsc --noEmit)
- Executar testes existentes (vitest) e verificar passagem
- Gerar relatório de cobertura de testes
- Executar build de produção (vite build) sem erros
- Validar visualmente todas as telas contra UI_UX_GUIDE (cores, fontes, espaçamentos, tokens do theme.ts)
- Teste manual de fluxo completo: iniciar → selecionar nível → jogar → vitória/derrota → anúncio → reiniciar → verificar salvamento
- Verificar responsividade mobile e desktop
- Relatar discrepâncias encontradas sem alterar código de UI/UX sem autorização

### Fora do escopo

- Publicar nas lojas
- Criar versão de release oficial
- Adicionar novas funcionalidades
- Mudar escopo de funcionalidades já implementadas
- Configurar ESLint real (não faz parte da sprint e não há config)
- Adicionar Capacitor/Cordova/Electron para build mobile/desktop
- Reescrever testes customizados (ads_manager, level_manager) para vitest
- Corrigir problemas visuais encontrados na auditoria (apenas relatar)
- Refatorar código
- Alterar arquivos de UI/UX sem aprovação explícita (a auditoria apenas documenta)

### Dependências entre partes

| Tarefa | Depende de |
|---|---|
| Typecheck | Nenhuma |
| Testes | Nenhuma |
| Cobertura | Testes passando |
| Build web | Typecheck passando |
| Auditoria UI/UX | Nenhuma (pode rodar em paralelo com typecheck e testes) |
| Teste manual | Build web concluído |
| Lint | Nenhuma (isolada, placeholder) |

### Riscos principais

- **Typecheck pode quebrar** se sprints anteriores deixaram erros de tipo não detectados (o script `typecheck` é `tsc --noEmit` real).
- **Build pode quebrar** se houver dependências faltando ou sintaxe inválida acumulada.
- **Cobertura pode estar muito abaixo de 80%** — apenas o storage tem testes vitest reais. O sprint original pressupõe cobertura de testes que ainda não foi implementada.
- **Auditoria UI/UX pode encontrar discrepâncias** que exigem decisão de design. O risco é parar a sprint sem correção ou tomar decisão visual não autorizada.
- **Teste manual depende de interpretação humana** — comportamento de anúncio (streak) pode não ser visível em build local se não houver SDK real.

### Estratégia de quebra

A sprint será dividida em 7 tarefas pequenas e independentes, maximizando paralelismo:

1. Tarefas sem dependência entre si (lint, testes, auditoria UI/UX, typecheck) podem rodar em paralelo.
2. Build e cobertura dependem de resultados anteriores e vêm depois.
3. Teste manual é o último passo, pois precisa do build pronto.
4. Cada tarefa gera um relatório/documento — nenhuma altera código-fonte sem autorização explícita.
5. Tarefas que exigem decisão visual (auditoria) são isoladas como relatório, não como correção.

---

# Tarefas da Sprint

## Tarefa 1 — Verificar script de lint

### Objetivo

Executar `npm run lint` e confirmar que o script atual (placeholder) executa sem erro. Não há ESLint configurado no projeto, portanto não há warnings reais a corrigir.

### Tipo da tarefa

validação

### Impacto UI/UX

**Não aplicável.**

Justificativa: o lint atual é um placeholder (`echo 'lint placeholder'`) que não analisa nenhum arquivo de código. Não há impacto visual, estrutural ou funcional.

### Pré-requisitos

Nenhum. Pode ser executada primeiro ou em paralelo com qualquer outra tarefa.

### Arquivos prováveis

- `package.json` (script `lint`)

### Passos

1. Abrir terminal na raiz do projeto.
2. Executar `npm run lint`.
3. Observar a saída. O comando atual é `echo 'lint placeholder'` e deve exibir essa mensagem e sair com código 0.
4. Confirmar que o exit code foi 0.

### Critérios de aceite

- `npm run lint` executa sem erro (exit code 0).
- Nenhuma modificação em arquivos é necessária.

### Como validar

```bash
npm run lint
echo "Exit code: $?"
```

### Riscos

- Nenhum. O script é um placeholder que sempre passa.
- Se no futuro um ESLint real for adicionado, esta tarefa precisará ser revisada.

### O que NÃO alterar

- Não adicionar ESLint config.
- Não modificar `package.json`.
- Não alterar nenhum arquivo de código.

### Reversibilidade

Tarefa puramente de verificação. Não altera nenhum arquivo. Reverter não se aplica.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Verificar script de lint" da sprint 12.

Objetivo: executar `npm run lint` na raiz do projeto e confirmar que o script placeholder executa sem erro (exit code 0). O script atual é `echo 'lint placeholder'`.

NÃO modifique nenhum arquivo. NÃO adicione ESLint ou qualquer configuração. Execute o comando e reporte o resultado.

Critério de aceite: npm run lint executa e retorna exit code 0.

UI/UX Gate: Não aplicável — nenhum arquivo de código é tocado.
```

---

## Tarefa 2 — Executar typecheck e corrigir erros de tipo

### Objetivo

Executar `npm run typecheck` (tsc --noEmit), identificar todos os erros de tipo TypeScript e corrigi-los com o mínimo de alteração possível, sem mudar lógica de negócio, sem refatorar e sem adicionar funcionalidades.

### Tipo da tarefa

validação

### Impacto UI/UX

**Indireto.**

Justificativa: typecheck não altera UI diretamente, mas pode exigir correções em arquivos de interface que afetam a compilação de componentes visuais. As correções devem preservar a aparência e comportamento atuais.

### Pré-requisitos

Nenhum. Pode executar em paralelo com tarefas 1, 3 e 4.

### Arquivos prováveis

- `tsconfig.json` (configuração do typecheck)
- `src/**/*.ts`, `src/**/*.tsx` (arquivos que podem conter erros de tipo)

**Hipótese:** os erros mais prováveis são em:
- `src/ads/sdk_adapter.ts` (SDK externo sem tipos)
- `src/storage/progress.ts` (tipos genéricos)
- Arquivos que usam `any` implícito ou importam tipos ausentes

Os arquivos exatos com erros devem ser determinados executando `tsc --noEmit` e lendo a saída.

### Passos

1. Executar `npm run typecheck` (ou `npx tsc --noEmit`).
2. Capturar toda a lista de erros.
3. Agrupar erros por arquivo e tipo.
4. Para cada erro:
   - Se for tipo faltando em dependência externa: adicionar declaração mínima ou `// @ts-expect-error` com justificativa.
   - Se for tipo incorreto em código próprio: corrigir o tipo ou a asserção, mantendo a lógica intacta.
   - Se for import não resolvido: verificar se o módulo existe e corrigir o caminho.
5. Reexecutar typecheck até zero erros.
6. Não modificar lógica de negócio, não refatorar, não renomear.

### Critérios de aceite

- `npm run typecheck` retorna exit code 0 com zero erros.
- Nenhuma lógica de negócio foi alterada.
- Nenhuma funcionalidade foi adicionada ou removida.
- Arquivos alterados se limitam a correções de tipo (asserções, tipos, imports).

### Como validar

```bash
npm run typecheck
echo "Exit code: $?"
```

### Riscos

- Corrigir tipo com `any` ou `@ts-ignore` pode mascarar problemas reais.
- `@ts-expect-error` sem justificativa acumula dívida técnica.
- Se houver muitos erros (>20), o tempo de correção pode ser alto para modelo econômico.
- Erros em cascata (um tipo quebrado causa 20 erros em outros arquivos) podem parecer piores do que são.

### O que NÃO alterar

- Não alterar lógica de negócio.
- Não refatorar arquivos.
- Não adicionar novas funcionalidades.
- Não modificar `tsconfig.json` (strict mode).
- Não mudar nomes de funções, componentes ou variáveis.
- Não alterar CSS, estilos ou classes.
- Não remover código — apenas adicionar tipos onde faltam.

### Reversibilidade

Cada correção de tipo é uma alteração pequena e localizada. Reverter com `git diff` para ver as alterações e `git checkout` nos arquivos modificados se uma correção estiver errada.

### Modelo recomendado

modelo econômico suficiente para erros triviais (tipos faltando, imports). Se houver mais de 10 erros ou erros complexos de generic, marcar para revisão.

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Executar typecheck e corrigir erros de tipo" da sprint 12.

Objetivo: executar `npm run typecheck` (tsc --noEmit), capturar TODOS os erros de tipo, e corrigir APENAS os tipos (asserções, imports, declarações) sem alterar lógica de negócio, sem refatorar, sem adicionar funcionalidades.

Passos:
1. Execute `npm run typecheck` e capture todos os erros.
2. Para cada erro, aplique a correção mínima necessária:
   - Tipo faltando em dependência: `// @ts-expect-error` com comentário justificando.
   - Tipo incorreto: corrija a asserção de tipo ou o tipo da variável.
   - Import não resolvido: corrija o caminho do import.
3. NÃO use `any` sem necessidade. NÃO use `// @ts-ignore` (prefira `@ts-expect-error`).
4. Reexecute typecheck até zero erros.

NÃO altere lógica de negócio. NÃO refatore. NÃO adicione funcionalidades. NÃO mude tsconfig.json.

Critério de aceite: `npm run typecheck` passa com exit code 0 e zero erros.

UI/UX Gate: Indireto — correções de tipo podem estar em arquivos de UI, mas não devem alterar aparência ou comportamento. Preserve a saída visual exata.
```

---

## Tarefa 3 — Executar testes vitest e validar passagem

### Objetivo

Executar `npm run test` (vitest run) e confirmar que todos os testes existentes passam sem falhas. Relatar quais testes existem, quantos passaram e quantos falharam.

### Tipo da tarefa

validação

### Impacto UI/UX

**Não.**

Justificativa: os testes existentes cobrem storage/progress (vitest) e não envolvem renderização de componentes, DOM ou aspectos visuais.

### Pré-requisitos

Nenhum. Pode executar em paralelo com tarefas 1, 2 e 4.

### Arquivos prováveis

- `src/storage/__tests__/progress.test.ts` — único teste vitest detectável
- `vitest.config.*` (se existir) — confirmar caminho
- `package.json` (script `test`)

### Passos

1. Executar `npm run test` (ou `npx vitest run`).
2. Observar a saída: quantos testes, quantos passaram, quantos falharam.
3. Se houver falhas, identificar a causa e relatar sem modificar os testes.
4. Confirmar que o exit code é 0.

### Critérios de aceite

- `npm run test` executa sem erros.
- Todos os testes passam (exit code 0).
- Nenhum arquivo de teste ou código foi modificado.

### Como validar

```bash
npm run test
echo "Exit code: $?"
```

### Riscos

- Testes podem depender de módulos que foram alterados em sprints anteriores e quebraram.
- Testes de storage usam `localStorage` mock (vi.stubGlobal) — se a API do vitest mudou, pode falhar.
- Como os testes usam `describe/it/expect` do vitest, a versão do vitest (4.1.7) pode ter diferenças.

### O que NÃO alterar

- Não modificar arquivos de teste existentes.
- Não adicionar novos testes.
- Não alterar lógica de produção para fazer teste passar.
- Não converter testes customizados (ads_manager, level_manager) para vitest.

### Reversibilidade

Tarefa puramente de verificação. Não altera nenhum arquivo. Reverter não se aplica.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Executar testes vitest e validar passagem" da sprint 12.

Objetivo: executar `npm run test` (vitest run) na raiz do projeto e confirmar que todos os testes existentes passam com exit code 0.

Passos:
1. Execute `npm run test` (ou `npx vitest run`).
2. Capture a saída completa: número de testes, passaram, falharam.
3. Se houver falhas, REPORTE mas NÃO modifique código para corrigir.
4. Confirme o exit code.

NÃO modifique nenhum arquivo de teste. NÃO adicione novos testes. NÃO altere código de produção.

Critério de aceite: vitest run retorna exit code 0 com todos os testes passando.

UI/UX Gate: Não aplicável. Testes não envolvem UI.
```

---

## Tarefa 4 — Gerar relatório de cobertura de testes

### Objetivo

Executar `npm run test -- --coverage` (vitest run --coverage) para gerar relatório de cobertura. Verificar se a cobertura atinge >= 80%. Se não, relatar as lacunas sem criar novos testes — a decisão de criar testes adicionais fica para revisão humana.

### Tipo da tarefa

validação

### Impacto UI/UX

**Não.**

Justificativa: geração de relatório de cobertura é uma tarefa de infraestrutura/validação que não altera nem analisa visualmente componentes de UI.

### Pré-requisitos

- Tarefa 3 concluída (testes passando).
- `@vitest/coverage-v8` ou `@vitest/coverage-istanbul` instalado como devDependency (verificar).

### Arquivos prováveis

- `package.json` (dependências de coverage)
- `coverage/` (pasta gerada)
- `src/storage/__tests__/progress.test.ts` (única fonte de cobertura vitest)

### Passos

1. Verificar se existe dependência de coverage instalada (`@vitest/coverage-v8` ou similar).
2. Se não existir, relatar que não é possível gerar cobertura sem instalar pacote adicional. Parar aqui.
3. Se existir, executar `npx vitest run --coverage`.
4. Capturar a saída com percentuais por arquivo e total.
5. Comparar total com a meta de 80%.
6. Relatar:
   - Percentual global.
   - Arquivos com menor cobertura.
   - Diferença para a meta de 80%.
   - Recomendação de quais módulos precisam de testes.

### Critérios de aceite

- Relatório de cobertura foi gerado (ou justificativa de por que não foi possível).
- Percentual global documentado.
- Diferença para meta de 80% calculada.

### Como validar

```bash
# Verificar se pacote de coverage existe
npm ls @vitest/coverage-v8 2>/dev/null || npm ls @vitest/coverage-istanbul 2>/dev/null || echo "Nenhum pacote de coverage instalado"

# Se existir, executar
npx vitest run --coverage
```

### Riscos

- Pacote de coverage pode não estar instalado (sprint anterior pode não ter incluído).
- Vitest 4.1.7 pode ter API de coverage diferente.
- Cobertura provavelmente será baixa porque apenas um módulo (`storage/progress.ts`) tem testes vitest.
- Os testes em `ads/ads_manager.test.ts` e `game/level_manager.test.ts` usam runner manual e não contam para cobertura vitest.

### O que NÃO alterar

- Não instalar pacotes de coverage (a decisão de adicionar dependências é do planejamento).
- Não adicionar novos testes.
- Não modificar código de produção.
- Não modificar configuração do vitest.

### Reversibilidade

Tarefa puramente de verificação. Não altera nenhum arquivo. Se for preciso instalar pacote, reverter com `npm uninstall`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Gerar relatório de cobertura de testes" da sprint 12.

Objetivo: verificar se é possível gerar relatório de cobertura com vitest e documentar o percentual atual.

Passos:
1. Execute `npm ls @vitest/coverage-v8 2>/dev/null || npm ls @vitest/coverage-istanbul 2>/dev/null` para verificar se pacote de coverage está instalado.
2. Se NÃO estiver instalado: reporte que a cobertura não pode ser gerada sem instalar `@vitest/coverage-v8`. NÃO instale — apenas reporte.
3. Se estiver instalado: execute `npx vitest run --coverage` e capture os percentuais.
4. Compare com a meta de 80%.

NÃO instale pacotes. NÃO adicione testes. NÃO modifique nenhum arquivo.

Critério de aceite: relatório gerado com percentuais documentados.

UI/UX Gate: Não aplicável.
```

---

## Tarefa 5 — Auditoria visual de UI/UX contra UI_UX_GUIDE

### Objetivo

Percorrer todas as telas do jogo, inspecionar visualmente no navegador (desktop e mobile), e verificar conformidade com `docs/design/UI_UX_GUIDE.md` e com os tokens definidos em `src/ui/theme.ts`. NÃO alterar código — apenas documentar discrepâncias em um relatório.

### Tipo da tarefa

documentação

### Impacto UI/UX

**Sim.**

Justificativa: a tarefa consiste em inspecionar visualmente todos os componentes de UI do jogo (MenuScreen, LevelSelectionScreen, HUD, TimerBar, SkillButton, Button, AdScreen) e verificar se seguem o guia de estilo. O resultado é um relatório, não alteração de código.

Requisitos obrigatórios:
- Deve ler `docs/design/UI_UX_GUIDE.md` antes de começar.
- Deve validar mobile e desktop (viewport 375px e 1280px).
- Deve prever estados de loading, erro e vazio quando aplicáveis (telas carregando, lista vazia de níveis, etc.).
- Deve verificar ausência de aparência genérica de IA.
- Relatório final deve explicar como cada tela segue ou desvia do guia.

### Pré-requisitos

Nenhum. Pode executar em paralelo com tarefas 1, 2 e 3. Precisa do servidor dev rodando para inspecionar as telas.

### Arquivos prováveis

- `docs/design/UI_UX_GUIDE.md` — guia de referência
- `src/ui/theme.ts` — tokens de estilo (cores, espaçamentos, fontes, bordas, sombras)
- `src/ui/MenuScreen.tsx`
- `src/ui/LevelSelectionScreen.tsx`
- `src/ui/HUD.tsx`
- `src/ui/TimerBar.tsx`
- `src/ui/SkillButton.tsx`
- `src/ui/Button.tsx`
- `src/ui/AdScreen.tsx`
- `src/ui/LevelItem.tsx`

### Passos

1. Ler `docs/design/UI_UX_GUIDE.md` na íntegra.
2. Iniciar servidor dev (`npm run dev`).
3. Abrir no navegador em desktop (viewport ~1280px).
4. Percorrer cada tela e verificar:
   - **Cores:** os tokens do `theme.ts` estão sendo usados? As cores reais correspondem ao guia?
   - **Tipografia:** os tamanhos e pesos seguem a escala do guia?
   - **Espaçamentos:** seguem a escala do `theme.ts`?
   - **Bordas, sombras e cantos:** estão dentro do especificado?
   - **Botões:** têm rótulo com verbo? Estado disabled/loading visível?
   - **Cards:** têm título claro? Conteúdo útil?
   - **Estados vazios, loading e erro:** existem onde deveriam?
   - **Microcopy:** textos são claros e diretos, sem tom genérico de IA?
   - **Aparência geral:** parece produto real, não protótipo de IA?
5. Abrir no navegador em mobile (viewport ~375px) e repetir.
6. Documentar cada tela em formato de relatório.
7. Para cada discrepância, classificar como: crítica, média, sugestão.

### Critérios de aceite

- Relatório gerado cobrindo todas as telas do jogo.
- Cada tela avaliada contra itens do guia (cores, tipografia, espaçamento, bordas, botões, cards, estados, microcopy).
- Validação mobile e desktop documentada.
- Discrepâncias classificadas por severidade.
- Relatório final explica como cada tela segue ou desvia do guia.

### Como validar

```bash
# Iniciar servidor
npm run dev

# Abrir no navegador:
# Desktop: http://localhost:3000 (viewport 1280px)
# Mobile: Chrome DevTools -> toggle device toolbar (viewport 375px)
```

### Riscos

- O servidor dev pode não iniciar se houver erros não detectados (depende de typecheck).
- A interpretação visual é subjetiva — o relatório deve ser factual (ex: "botão usa cor #XXXX, guia especifica #YYYY") e não opinativo sem evidência.
- Pode haver muitos desvios, gerando relatório longo.

### O que NÃO alterar

- **NÃO modificar nenhum arquivo de código.**
- **NÃO alterar CSS, estilos ou componentes.**
- **NÃO gerar commits de correção visual.**
- A tarefa é exclusivamente de auditoria e documentação.

### Reversibilidade

Tarefa de documentação pura. Não altera código. Reverter não se aplica.

### Modelo recomendado

modelo intermediário recomendado (precisa de visão para inspecionar componentes e comparar com guia de 576 linhas).

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Auditoria visual de UI/UX contra UI_UX_GUIDE" da sprint 12.

Esta tarefa é EXCLUSIVAMENTE de auditoria e documentação. NÃO altere código.

Passos:
1. Leia `docs/design/UI_UX_GUIDE.md` na íntegra.
2. Leia `src/ui/theme.ts` para conhecer os tokens de estilo.
3. Inicie o servidor dev com `npm run dev`.
4. Use o navegador para inspecionar cada tela do jogo em viewport desktop (~1280px) e mobile (~375px):
   - MenuScreen
   - LevelSelectionScreen
   - HUD (dentro do jogo)
   - TimerBar
   - SkillButton
   - Button (componente base)
   - AdScreen
   - LevelItem
5. Para cada tela, verifique e documente:
   - Cores usadas vs. guia e theme.ts
   - Tipografia (tamanho, peso) vs. guia
   - Espaçamentos vs. guia
   - Bordas, sombras, cantos vs. guia
   - Botões: rótulo com verbo, disabled, loading
   - Cards: título claro, conteúdo útil
   - Estados: loading, erro, vazio existem?
   - Microcopy: sem textos genéricos de IA
   - Aparência: produto real ou protótipo IA?
6. Gere relatório em markdown com:
   - Resumo geral
   - Tabela por tela com conformidade/não conformidade
   - Discrepâncias classificadas (crítica, média, sugestão)
   - Conclusão sobre responsividade

SALVE o relatório como `auditoria/SPRINT_12_UI_UX_AUDITORIA.md`.

UI/UX Gate: Sim. Leia o UI_UX_GUIDE.md. Valide mobile e desktop. Evite aparência genérica de IA. Verifique loading, erro e vazio.

NÃO altere código. NÃO corrija discrepâncias. Apenas documente.
```

---

## Tarefa 6 — Build de produção para web

### Objetivo

Executar `npm run build` (vite build) e confirmar que o projeto compila sem erros para produção web. Verificar se a saída da build está íntegra (arquivos gerados, sem warnings).

### Tipo da tarefa

validação

### Impacto UI/UX

**Indireto.**

Justificativa: o build não altera UI, mas uma build com erros pode truncar ou omitir partes da interface. A tarefa inclui verificar se o HTML, JS e CSS gerados carregam sem erros no navegador.

### Pré-requisitos

- Tarefa 2 concluída (typecheck passando), para garantir que não há erros de tipo que impeçam a compilação.

### Arquivos prováveis

- `dist/` (pasta de saída do vite build)
- `vite.config.ts` (configuração do build)
- `index.html` (entrada)

### Passos

1. Executar `npm run build`.
2. Verificar se o exit code é 0 e não há erros no terminal.
3. Verificar se a pasta `dist/` foi criada com os arquivos esperados (index.html, assets/).
4. Opcional: iniciar servidor de preview (`npm run preview`) e abrir no navegador para confirmar que a interface carrega.
5. Relatar tamanho total dos assets e warnings (se houver).

### Critérios de aceite

- `npm run build` retorna exit code 0.
- Pasta `dist/` existe com `index.html` e `assets/`.
- Navegador carrega o build sem erros no console.
- Nenhum warning crítico no terminal.

### Como validar

```bash
npm run build
echo "Exit code: $?"
ls -la dist/
npm run preview  # Testar no navegador
```

### Riscos

- Build pode falhar se houver erros de sintaxe ou dependências ausentes que o typecheck não capturou.
- Warnings do Vite podem indicar problemas de performance (bundles grandes, imports não utilizados).

### O que NÃO alterar

- Não modificar `vite.config.ts`.
- Não otimizar configuração de build.
- Não adicionar plugins.
- Não alterar código para eliminar warnings (apenas relatar).

### Reversibilidade

Build gera apenas a pasta `dist/`, que não está no repositório (deve estar em `.gitignore`). Reverter não se aplica — basta deletar `dist/`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Build de produção para web" da sprint 12.

Objetivo: executar `npm run build` na raiz do projeto e confirmar que o Vite compila sem erros.

Passos:
1. Execute `npm run build`.
2. Capture o exit code e a saída completa.
3. Verifique se `dist/` foi criada com `index.html` e `assets/`.
4. Opcional: execute `npm run preview`, abra no navegador e verifique se não há erros no console.

NÃO modifique nenhum arquivo. NÃO altere configurações de build. NÃO otimize. Apenas valide.

Critério de aceite: build concluído com exit code 0, pasta dist/ gerada, preview carrega sem erros.

UI/UX Gate: Indireto — verificar se o build gera a interface completa no navegador, sem partes faltando ou quebradas.
```

---

## Tarefa 7 — Teste manual de fluxo completo

### Objetivo

Executar o jogo (build ou dev server) e percorrer manualmente o fluxo completo do jogador: iniciar o jogo, selecionar nível, jogar até vitória/derrota, assistir anúncio (quando aplicável), reiniciar nível, verificar salvamento de progresso. Documentar comportamento observado.

### Tipo da tarefa

validação

### Impacto UI/UX

**Sim.**

Justificativa: a tarefa testa o fluxo de usuário completo, que envolve navegação entre telas, feedback visual de ações, estados de carregamento, mensagens de erro/sucesso e responsividade.

Requisitos obrigatórios:
- Deve ler `docs/design/UI_UX_GUIDE.md` antes de começar (princípios de UX, microcopy, estados obrigatórios).
- Deve validar mobile e desktop.
- Deve verificar loading, erro e estado vazio em cada etapa do fluxo.
- Deve verificar que mensagens de erro são compreensíveis e não genéricas.
- Relatório final deve explicar como o fluxo segue ou desvia do guia.

### Pré-requisitos

- Tarefa 5 concluída (build funcionando) — ou usar `npm run dev` como alternativa.
- Tarefa 6 (auditoria UI/UX) concluída — serve como referência de conformidade visual.

### Arquivos prováveis

- Build em `dist/` ou servidor dev em localhost:3000
- `docs/design/UI_UX_GUIDE.md` (princípios de UX e microcopy)

### Passos

1. Iniciar o servidor dev (`npm run dev`) ou preview do build (`npm run preview`).
2. Abrir no navegador (desktop, 1280px).
3. Executar o seguinte fluxo e documentar cada etapa:
   - **Tela inicial (MenuScreen):** carrega? Botões aparecem? Texto claro?
   - **Selecionar nível (LevelSelectionScreen):** níveis aparecem? Nível bloqueado tem indicação visual?
   - **Entrar no nível:** o level carrega? HUD aparece com timer, skills, contadores?
   - **Jogar:** movimentação de criaturas funciona? Timer conta? Skills podem ser usadas?
   - **Vitória:** mensagem de vitória aparece? Estatísticas mostradas?
   - **Derrota:** mensagem de derrota aparece? Opção de reiniciar?
   - **Anúncio (streak):** após 2 vitórias consecutivas ou 3 derrotas, a tela de anúncio aparece?
   - **Reiniciar nível:** restart funciona? Estado volta ao inicial?
   - **Salvar progresso:** após vitória, progresso salvo? Ao recarregar, nível desbloqueado persiste?
4. Repetir o fluxo em mobile (viewport 375px).
5. Documentar:
   - O que funcionou.
   - O que não funcionou (bugs).
   - O que está diferente do esperado.
   - Problemas de UX (texto confuso, fluxo quebrado, falta de feedback).
6. Se encontrar bugs, descrever passos para reproduzir e comportamento esperado vs. real.

### Critérios de aceite

- Relatório de teste manual gerado com todas as etapas do fluxo documentadas.
- Cada etapa tem status (ok, falha, não testado).
- Bugs ou problemas de UX descritos com passos de reprodução.
- Validação mobile e desktop registrada.
- Comportamento de anúncio verificado (mesmo que o SDK real não exista, documentar o comportamento simulado).

### Como validar

```bash
# Terminal 1: servidor
npm run dev

# Navegador:
# Abrir http://localhost:3000
# Fluxo completo em desktop e mobile (F12 -> toggle device)
```

### Riscos

- **Anúncio pode não funcionar sem SDK real.** O comportamento de streak (deveExibirAnuncio) existe no código, mas a tela de anúncio (AdScreen) pode não ser chamada se a integração não estiver completa. Documentar o que ocorre.
- **Salvamento depende de localStorage.** Pode ser limpo ao recarregar a página em modo de desenvolvimento.
- **Comportamento do jogo pode variar.** O loop de jogo, movimentação de criaturas e detecção de vitória/derrota podem não estar completos (depende do que foi implementado nas sprints anteriores).
- **Teste é manual e subjetivo.** Dois testers podem ter experiências diferentes.

### O que NÃO alterar

- **NÃO modificar código para corrigir bugs encontrados.**
- **NÃO alterar fluxo, textos ou comportamento.**
- Apenas documentar o que foi observado.

### Reversibilidade

Tarefa de documentação pura. Não altera código. Reverter não se aplica.

### Modelo recomendado

modelo econômico suficiente (a tarefa é de observação e documentação, não de correção)

### Prompt de execução para o coder

```
Execute APENAS a tarefa "Teste manual de fluxo completo" da sprint 12.

Esta tarefa é EXCLUSIVAMENTE de validação manual e documentação. NÃO altere código.

Passos:
1. Inicie o servidor dev com `npm run dev`.
2. Abra http://localhost:3000 no navegador em viewport desktop (~1280px).
3. Execute este fluxo e documente cada etapa com status (ok/falha/não testado):
   - Tela inicial carrega? Botões visíveis e com textos claros?
   - Seleção de nível: níveis aparecem? Bloqueados têm indicação visual?
   - Carregar nível: HUD aparece com timer, skills, contadores?
   - Jogar: criaturas se movem? Timer conta? Skills funcionam?
   - Vitória/derrota: feedback aparece? Estatísticas visíveis?
   - Anúncio: após streaks o AdScreen aparece?
   - Reiniciar: estado volta ao inicial?
   - Salvamento: progresso persiste após recarregar?
4. Repita tudo em mobile (viewport 375px).
5. Gere relatório em `auditoria/SPRINT_12_TESTE_MANUAL.md`.

UI/UX Gate: Sim. Leia o UI_UX_GUIDE.md. Valide mobile e desktop. Verifique loading, erro, vazio, microcopy. Documente se textos são genéricos de IA ou úteis.

NÃO altere código. NÃO corrija bugs. Apenas documente.
```

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode rodar em paralelo com |
|---|---|---|---|
| 1 | T1 — Verificar lint | Nada | T2, T3, T4, T5 |
| 2 | T2 — Typecheck | Nada | T1, T3, T4, T5 |
| 3 | T3 — Testes vitest | Nada | T1, T2, T4, T5 |
| 4 | T4 — Cobertura | T3 (testes precisam passar) | — |
| 5 | T5 — Auditoria UI/UX | Nada (precisa de dev server) | T1, T2, T3 |
| 6 | T6 — Build web | T2 (typecheck precisa passar) | — |
| 7 | T7 — Teste manual | T6 (build pronto) ou dev server | — |

**Observações:**

- T1, T2, T3, T5 podem ser executadas em paralelo total.
- T4 só pode ser executada depois de T3 (precisa dos testes passando).
- T6 só pode ser executada depois de T2 (precisa de typecheck limpo).
- T7 é a última e pode usar tanto o build (T6) quanto o dev server.
- **Não há necessidade de commits intermediários** porque nenhuma tarefa altera código-fonte (apenas relatórios de documentação são gerados).
- Se T2 encontrar erros de tipo e corrigi-los, fazer commit com mensagem `chore: fix type errors for sprint 12 validation` antes de prosseguir para T6.
- Se T5 ou T7 gerarem relatórios com bugs críticos, pausar para revisão antes de encerrar a sprint.

---

# Checklist final da sprint

- [ ] Lint executado (T1) — `npm run lint` sem erro
- [ ] Typecheck executado (T2) — `npm run typecheck` sem erros
- [ ] Testes executados (T3) — `npm run test` passando
- [ ] Cobertura gerada (T4) — relatório salvo em `auditoria/`
- [ ] Auditoria UI/UX concluída (T5) — relatório salvo em `auditoria/UI_UX_AUDITORIA.md`
- [ ] Build executado (T6) — `npm run build` com exit code 0
- [ ] Fluxo manual validado (T7) — relatório salvo em `auditoria/TESTE_MANUAL.md`
- [ ] Responsividade validada (T5 e T7) — mobile e desktop documentados
- [ ] Regressões verificadas (T7) — fluxo completo sem bugs críticos não documentados
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] Nenhum arquivo de código alterado sem necessidade
- [ ] UI/UX Gate preenchido para todas as tarefas (ver seção de cada tarefa)
- [ ] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (T5, T7)
- [ ] Relatórios salvos em `auditoria/` para revisão

---

# Tarefas que NÃO devem ir para modelo econômico

| Tarefa | Motivo | Modelo recomendado |
|---|---|---|
| T5 — Auditoria visual UI/UX | Requer leitura de guia de 576 linhas, comparação visual de múltiplas telas, tomada de decisão sobre conformidade. Exige capacidade de interpretar design system real. | modelo intermediário recomendado |

**Todas as demais tarefas** (T1, T2, T3, T4, T6, T7) são puramente de validação e documentação sem alteração de código, adequadas para modelo econômico.

**Nota sobre T2 (typecheck):** se houver mais de 10 erros de tipo ou erros envolvendo genéricos complexos, a tarefa pode exigir modelo intermediário. Iniciar com modelo econômico e escalar se necessário.
