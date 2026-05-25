# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome da sprint original:** Sprint 11 — VALIDACAO_FINAL
- **Objetivo da sprint original:** Realizar validação completa do MVP: checar regressão, responsividade, compliance com UI_UX_GUIDE, executar build, validar fluxo de jogo completo.
- **Arquivo de origem:** `docs/Plano de Implementação/Sprints/Sprint 11 - VALIDACAO_FINAL/SPRINT_11_VALIDACAO_FINAL.md`
- **Resumo do escopo:** Rodar lint, typecheck, build web, testar manualmente o fluxo completo (menu → seleção de nível → jogar → vitória/derrota → anúncio → reiniciar → salvar), verificar compliance visual com UI_UX_GUIDE.md, gerar relatório de cobertura (>= 80%). Não publicar nem criar versão de release.

## Análise da Sprint

### Objetivo da sprint

Validar que o MVP está funcional, consistente visualmente e livre de erros de compilação, tipo e lint antes de qualquer release.

### Impacto UI/UX da sprint

`Sim`

Justificativa: a sprint exige verificar compliance visual de todas as telas contra `UI_UX_GUIDE.md`, testar responsividade e validar estados de loading, erro e vazio no fluxo de jogo. A Tarefa 7 envolve alterações corretivas de estilo em componentes existentes.

As tarefas com impacto visual devem seguir `docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

- Executar `npm run lint` e garantir zero warnings.
- Executar `npm run typecheck` (tsc --noEmit) e garantir sem erros.
- Executar `npm run build` (vite build) e verificar sucesso.
- Testar manualmente fluxo completo: iniciar → selecionar nível → jogar até vitória/derrota → assistir anúncio → reiniciar nível → verificar salvamento.
- Verificar que todas as telas seguem tokens de estilo (cores, fontes, espaçamentos) conforme UI_UX_GUIDE.md.
- Gerar relatório de cobertura de teste (>= 80%).
- Relatar estado final em documento.

### Fora do escopo

- Publicar nas lojas (iOS/Android/PC).
- Criar versão de release ou CI/CD.
- Adicionar novas funcionalidades, telas ou fluxos.
- Alterar arquitetura dos componentes existentes.
- Migrar de Vite para outro bundler.
- Criar testes e2e ou de integração com Playwright/Cypress.
- Build para iOS/Android/PC nativo — o projeto é uma aplicação web (React + Vite), não existe configuração de export para essas plataformas. O build web é o único aplicável.

### Dependências entre partes

1. **Task 1 (Diagnóstico)** deve ser executada primeiro — informa o estado real do projeto.
2. **Task 2 (Lint)** e **Task 3 (Typecheck)** podem rodar em paralelo após Task 1, mas ambas dependem que não haja bloqueios estruturais no projeto.
3. **Task 4 (Cobertura)** e **Task 5 (Aumentar cobertura)** dependem de Task 1 (saber baseline).
4. **Task 6 (Build web)** depende de Tasks 2 e 3 — build só faz sentido sem erros de lint/typecheck.
5. **Task 7 (UI/UX compliance)** é independente das anteriores, mas idealmente executa após build funcionar para poder visualizar.
6. **Task 8 (Fluxo manual)** depende de Task 6 (ter um build ou dev server rodando).
7. **Task 9 (Relatório final)** depende de todas as anteriores.

### Riscos principais

- **Lint placeholder:** `npm run lint` atualmente é `echo 'lint placeholder'` — não executa verificações reais. Será necessário instalar e configurar ESLint, o que pode gerar dezenas de warnings.
- **Typecheck pode revelar erros acumulados:** projetos sem typecheck contínuo tendem a acumular erros de tipo.
- **Cobertura baseline desconhecida:** pode estar abaixo de 80%, exigindo criação de testes novos.
- **Build pode falhar:** se houver erros de tipo ou imports quebrados não detectados.
- **UI/UX visual:** ajustes corretivos podem alterar a aparência atual de componentes que já estavam "funcionando".
- **Regressão de fluxo:** correções de tipo/lint podem quebrar comportamento se mal aplicadas.

### Estratégia de quebra

A sprint foi dividida em 9 tarefas seguindo a ordem diagnóstico → ferramentas → build → visual → fluxo → documentação. Cada tarefa é atômica, reversível e verificável individualmente. Tarefas de ferramentas (lint, typecheck, cobertura) são separadas das tarefas de validação visual e manual para evitar diff grande e mistura de responsabilidades. A tarefa de build para iOS/Android/PC foi excluída por não ser aplicável ao projeto (Vite/React web). A tarefa de lint inclui configuração prévia porque o projeto não tem ESLint instalado.

---

# Tarefas da Sprint

## Tarefa 1 — Diagnosticar estado atual do projeto

### Objetivo

Examinar o projeto para determinar o estado real das ferramentas de qualidade (lint, typecheck, build, testes, cobertura) antes de qualquer alteração. Relatar descobertas sem modificar nada.

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

`Não`

Justificativa: tarefa puramente de diagnóstico, lê arquivos e executa scripts para relatar estado. Nenhuma tela, componente ou estilo é alterado.

### Pré-requisitos

- Acesso ao repositório em `/mnt/c/Dev/lemmings-style-game/`
- Node_modules instalado (`npm install` já executado).

### Arquivos prováveis

- `package.json` (scripts existentes)
- `tsconfig.json` (config de typecheck)
- `vite.config.ts` (config de build)
- `vitest.config.ts` (config de testes)
- Qualquer arquivo de config de linter (`.eslintrc*`, `eslint.config.*`) — **provável que não exista**
- Cobertura atual: executar `npx vitest run --coverage` e ver resultado

### Passos

1. Executar `npm run lint` e registrar saída.
2. Verificar se há arquivo de configuração ESLint (`.eslintrc.*`, `eslint.config.*`).
3. Executar `npm run typecheck` e registrar erros.
4. Executar `npm run build` e registrar resultado.
5. Executar `npm test` e registrar resultado.
6. Executar `npx vitest run --coverage` e registrar % de cobertura.
7. Listar arquivos de teste existentes em `src/`.
8. Salvar relatório em `auditoria/estado_inicial_sprint11.md` (criar pasta se não existir).
9. Não alterar nenhum arquivo de código.

### Critérios de aceite

- Relatório salvo com estado real de cada ferramenta.
- Nenhum arquivo fonte alterado (verificar com `git status --short`).
- Cobertura baseline registrada numericamente.
- Número de erros de typecheck registrado.
- Lint real vs placeholder documentado.

### Como validar

```bash
# Confirmar que git status está limpo (sem alterações)
git status --short

# Confirmar que relatório foi criado
cat auditoria/estado_inicial_sprint11.md
```

Comandos exatos de lint/typecheck/build devem ser confirmados no `package.json` do projeto.

### Riscos

- Nenhum — tarefa apenas lê e relata.
- Único risco: `npx vitest run --coverage` pode falhar se `@vitest/coverage-*` não estiver instalado. Isso já deve ser registrado como descoberta.

### O que NÃO alterar

- Nenhum arquivo de código, configuração ou componente.
- Não instalar pacotes.
- Não modificar scripts do `package.json`.

### Reversibilidade

Tarefa não altera nada — não há o que reverter. Basta apagar o relatório se desejado.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Você é um agente de diagnóstico. Execute APENAS a Tarefa 1 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 1 — Diagnosticar estado atual do projeto

Objetivo: Examinar o projeto em /mnt/c/Dev/lemmings-style-game/ e gerar relatório do estado real de lint, typecheck, build e cobertura de teste. NÃO modifique nenhum arquivo.

Passos:
1. Execute `cd /mnt/c/Dev/lemmings-style-game/`
2. Execute `npm run lint` e capture a saída
3. Verifique se existe arquivo de config ESLint (.eslintrc.*, eslint.config.*)
4. Execute `npm run typecheck` e capture erros/saída
5. Execute `npm run build` e capture resultado
6. Execute `npm test` e capture resultado
7. Execute `npx vitest run --coverage` e capture % de cobertura
8. Liste arquivos de teste existentes em src/
9. Crie a pasta auditoria/ se não existir
10. Salve relatório completo em auditoria/estado_inicial_sprint11.md
11. Execute `git status --short` para confirmar que nada foi alterado

UI/UX Gate: Não aplicável — tarefa de leitura/mapeamento sem impacto visual.

Critério de aceite: relatório salvo, git status limpo, cobertura baseline registrada.
```

---

## Tarefa 2 — Configurar ESLint e corrigir todos warnings

### Objetivo

Instalar e configurar ESLint com regras básicas para TypeScript + React, executar lint em todo o código-fonte e corrigir todos os warnings/errors. Garantir que `npm run lint` execute uma verificação real.

### Tipo da tarefa

configuração / limpeza/refino

### Impacto UI/UX

`Não`

Justificativa: alterações se limitam a configuração de ferramenta e correções de código que não afetam a UI (imports não usados, tipagem, convenções). Nenhuma tela, estilo ou comportamento visual é alterado.

### Pré-requisitos

- Task 1 concluída (saber que lint é placeholder e estado atual).
- Node_modules instalados.

### Arquivos prováveis

- `package.json` (adicionar script lint real, devDependencies)
- `eslint.config.js` ou `.eslintrc.json` (config do ESLint)
- Todos os arquivos `.ts` e `.tsx` em `src/` (correções de warnings)

### Passos

1. Instalar `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`.
2. Criar `eslint.config.js` com config para TypeScript + React.
3. Remover o script `lint` placeholder `echo 'lint placeholder'` e substituir por `"lint": "eslint src/"`.
4. Executar `npm run lint`.
5. Corrigir automaticamente com `--fix` o que for possível.
6. Corrigir manualmente cada warning restante, um por vez.
7. Executar `npm run lint` novamente até zero warnings e zero errors.
8. Executar `npm run typecheck` para garantir que correções não quebraram tipos.

### Critérios de aceite

- `npm run lint` retorna exit code 0, sem warnings, sem errors.
- `npm run typecheck` retorna exit code 0 (sem regressão de tipos).
- `git diff` mostra apenas alterações de lint + o novo arquivo eslint.config.js + modificação em package.json.
- Nenhuma lógica de negócio alterada.

### Como validar

```bash
npm run lint
npm run typecheck
git diff --stat  # deve mostrar apenas correções de lint + config
```

### Riscos

- ESLint pode reportar centenas de warnings iniciais se o código nunca foi lintado.
- Regras muito restritivas podem exigir muitas correções manuais.
- Correções automáticas (`--fix`) podem alterar formatação extensivamente.
- Corrigir warnings pode introduzir erro de tipo se mal feito.

### O que NÃO alterar

- Não alterar lógica de negócio em `src/game/`, `src/core/`, `src/storage/`.
- Não alterar estilos ou estrutura de componentes React (apenas importações, tipagem, hooks).
- Não adicionar regras ESLint opinativas além do necessário (foco em errors e warnings reais).
- Não modificar `vite.config.ts`, `vitest.config.ts` ou `tsconfig.json`.

### Reversibilidade

Reverter com `git checkout -- .` nos arquivos alterados e `npm uninstall` nos pacotes ESLint instalados. O package.json pode ser restaurado via `git checkout package.json`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Você é um agente de configuração. Execute APENAS a Tarefa 2 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 2 — Configurar ESLint e corrigir todos warnings

Objetivo: Instalar ESLint, configurar para TypeScript + React, substituir o placeholder de lint e garantir zero warnings.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Instalar pacotes: npm install --save-dev eslint @eslint/js typescript-eslint eslint-plugin-react-hooks
3. Criar eslint.config.js na raiz do projeto com:
   - @eslint/js recommended
   - typescript-eslint recommended (com type-checked rules se possível, senão apenas recommended sem tipo)
   - eslint-plugin-react-hooks recommended
   - ignores: ["dist/", "node_modules/"]
4. Em package.json, substituir "lint": "echo 'lint placeholder'" por "lint": "eslint src/"
5. Executar npm run lint, aplicar --fix, depois corrigir manualmente cada warning
6. Continuar até npm run lint retornar exit 0 sem warnings
7. Executar npm run typecheck para confirmar que tipos não quebraram

UI/UX Gate: Não aplicável — tarefa de configuração de ferramenta, sem impacto visual.

Critérios de aceite: npm run lint = zero warnings, npm run typecheck = zero erros.
```

---

## Tarefa 3 — Executar typecheck e corrigir erros de tipo

### Objetivo

Executar `tsc --noEmit` em todo o projeto, corrigir todos os erros de tipo e garantir que `npm run typecheck` retorne exit code 0.

### Tipo da tarefa

validação / limpeza/refino

### Impacto UI/UX

`Não`

Justificativa: correção de tipos no TypeScript não altera comportamento em runtime nem aparência visual. Apenas tipagem estática é ajustada.

### Pré-requisitos

- Task 2 concluída (lint ok, sem warnings).
- `tsconfig.json` lido e entendido.

### Arquivos prováveis

- `tsconfig.json` (confirmar se precisa de ajustes)
- Todos os arquivos `.ts` e `.tsx` em `src/` (correções de tipo)

### Passos

1. Executar `npm run typecheck`.
2. Para cada erro de tipo:
   a. Identificar o arquivo e a linha.
   b. Corrigir o tipo (adicionar tipo faltante, ajustar interface, importar tipo correto).
   c. Reexecutar typecheck para confirmar que a correção não gerou novos erros.
3. Após todos os erros corrigidos, executar `npm run lint` para garantir que as correções não introduziram warnings.
4. Executar `npm test` para garantir que testes continuam passando.

### Critérios de aceite

- `npm run typecheck` retorna exit code 0 e nenhum erro.
- `npm run lint` retorna exit code 0 (sem regressão).
- `npm test` retorna exit code 0 (testes intactos).
- Nenhuma lógica de negócio alterada.

### Como validar

```bash
npm run typecheck
npm run lint
npm test
```

### Riscos

- Erros de tipo podem estar espalhados por muitos arquivos, exigindo múltiplas correções.
- Corrigir tipo apressadamente pode introduzir `any` genérico — deve-se evitar.
- Alguns erros podem exigir modificação de interfaces compartilhadas, afetando múltiplos arquivos.

### O que NÃO alterar

- Não alterar lógica de negócio em arquivos de `game/`, `core/`, `storage/`.
- Não alterar `tsconfig.json` para ser menos restritivo (`strict: true` deve permanecer).
- Não adicionar `@ts-ignore` ou `@ts-expect-error` sem justificativa documentada e aprovação.
- Não modificar testes para esconder erros de tipo.

### Reversibilidade

Reverter com `git checkout -- <arquivo>` para cada arquivo alterado. Se houve muitas alterações, `git diff` permite revisar cada mudança antes de commit. Fazer commit após todas as correções de tipo.

### Modelo recomendado

modelo intermediário recomendado — erros de tipo podem exigir entendimento do sistema de tipos e decisões sobre interfaces compartilhadas.

### Prompt de execução para o coder

```
Você é um agente de correção de tipos. Execute APENAS a Tarefa 3 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 3 — Executar typecheck e corrigir erros de tipo

Objetivo: Garantir que npm run typecheck (tsc --noEmit) retorne exit code 0 sem erros.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm run typecheck
3. Para cada erro:
   a. Leia o arquivo e entenda o tipo esperado
   b. Corrija o tipo (adicione tipos faltantes, ajuste interfaces, importe tipos corretos)
   c. Execute npm run typecheck novamente
   d. Só passe ao próximo erro quando o atual estiver resolvido
4. Após todos os erros resolvidos, execute npm run lint e npm test
5. Faça um commit com mensagem "fix: corrige erros de tipo do typecheck"

UI/UX Gate: Não aplicável — correção de tipos não altera UI.

Regras:
- NÃO altere tsconfig.json para ser menos restritivo
- NÃO adicione @ts-ignore ou @ts-expect-error
- NÃO altere lógica de negócio
- Prefira tipos explícitos a 'any'

Critério de aceite: npm run typecheck, lint, test todos com exit code 0.
```

---

## Tarefa 4 — Configurar cobertura de teste e gerar relatório baseline

### Objetivo

Configurar o vitest para gerar relatório de cobertura, instalar provider necessário, ajustar script no `package.json` e executar para obter a % baseline de cobertura.

### Tipo da tarefa

configuração

### Impacto UI/UX

`Não`

Justificativa: configuração de ferramenta de teste, sem qualquer impacto em interface ou componentes visuais.

### Pré-requisitos

- Task 3 concluída (typecheck ok).

### Arquivos prováveis

- `package.json` (adicionar script `test:coverage` ou modificar script `test`)
- `vitest.config.ts` (adicionar `coverage` config)
- `src/` (testes existentes permanecem inalterados nesta tarefa)

### Passos

1. Verificar se o provider de cobertura do vitest está instalado (`@vitest/coverage-v8`).
2. Instalar se necessário: `npm install --save-dev @vitest/coverage-v8`.
3. Adicionar configuração de cobertura em `vitest.config.ts`:
   - provider: 'v8'
   - include: ['src/**/*.ts', 'src/**/*.tsx']
   - exclude: ['src/**/*.test.*', 'src/**/__tests__/**']
   - thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 }
4. Adicionar script `"test:coverage": "vitest run --coverage"` no `package.json`.
5. Executar `npm run test:coverage`.
6. Registrar o resultado da cobertura (linhas, funções, branches, statements) em `auditoria/cobertura_baseline.md`.
7. Se coverage >= 80% em todas as métricas, a Task 5 pode ser pulada (registrar no relatório).

### Critérios de aceite

- Script `test:coverage` funciona e gera relatório.
- Cobertura baseline registrada em `auditoria/`.
- `npm test` continua funcionando normalmente.
- Thresholds configurados, mesmo que a cobertura atual esteja abaixo.

### Como validar

```bash
npm run test:coverage
cat auditoria/cobertura_baseline.md
npm test  # confirmar que não quebrou
```

### Riscos

- Provider de cobertura pode falhar se o ambiente não tiver suporte a `v8`.
- Cobertura pode estar muito baixa, exigindo Task 5 (já prevista).
- Thresholds configurados não impedem o build, apenas alertam.

### O que NÃO alterar

- Não modificar arquivos de teste existentes.
- Não modificar código fonte.
- Não alterar `tsconfig.json` ou `vite.config.ts`.

### Reversibilidade

Reverter alterações em `vitest.config.ts` e `package.json` via `git checkout`. Remover `@vitest/coverage-v8` com `npm uninstall`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Você é um agente de configuração. Execute APENAS a Tarefa 4 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 4 — Configurar cobertura de teste e gerar relatório baseline

Objetivo: Configurar cobertura no vitest, instalar provider, criar script e gerar relatório baseline.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm install --save-dev @vitest/coverage-v8
3. Edite vitest.config.ts para adicionar:
   ```
   test: {
     globals: true,
     environment: 'node',
     coverage: {
       provider: 'v8',
       include: ['src/**/*.ts', 'src/**/*.tsx'],
       exclude: ['src/**/*.test.*', 'src/**/__tests__/**'],
       thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
       reporter: ['text', 'text-summary'],
     },
   }
   ```
4. Em package.json, adicione o script: "test:coverage": "vitest run --coverage"
5. Execute npm run test:coverage
6. Salve o resultado numérico em auditoria/cobertura_baseline.md
7. Execute npm test para confirmar que testes normais continuam intactos

UI/UX Gate: Não aplicável — configuração de ferramenta.

Critérios de aceite: npm run test:coverage gera relatório com % de cobertura, npm test continua passando.
```

---

## Tarefa 5 — Aumentar cobertura de teste para >= 80%

### Objetivo

Criar testes para os arquivos e branches não cobertos até que a cobertura atinja o mínimo de 80% em linhas, funções e statements, e 70% em branches.

### Tipo da tarefa

testes

### Impacto UI/UX

`Não`

Justificativa: criação de testes unitários não altera interface, lógica de negócio, componentes ou estilos visuais.

### Pré-requisitos

- Task 4 concluída (cobertura baseline registrada, thresholds configurados).
- Relatório de cobertura disponível mostrando pontos não cobertos.

### Arquivos prováveis

- `src/**/*.test.ts` (novos arquivos de teste)
- `src/**/__tests__/` (pasta de testes existente)
- Arquivos fonte não testados: `src/core/criatura.ts`, `src/core/lvl_config.ts`, `src/ui/Button.tsx`, `src/ui/MenuScreen.tsx`, etc.

### Passos

1. Analisar relatório de cobertura da Task 4 para identificar arquivos com baixa cobertura.
2. Para cada arquivo abaixo do threshold:
   a. Ler o arquivo fonte.
   b. Identificar funções, branches e linhas não cobertas.
   c. Criar arquivo de teste no mesmo diretório ou em `__tests__/`.
   d. Testar: retorno esperado, edge cases (valores vazios, nulos, limites), branches (if/else, switch).
3. Executar `npm run test:coverage` e verificar se thresholds foram atingidos.
4. Repetir até todas as métricas estarem >= threshold.
5. Executar `npm run typecheck` e `npm run lint` para garantir que os testes não introduziram erros.

### Critérios de aceite

- `npm run test:coverage` mostra todas as métricas acima dos thresholds: lines >= 80%, functions >= 80%, branches >= 70%, statements >= 80%.
- `npm test` passa sem erros.
- `npm run typecheck` passa sem erros.
- `npm run lint` passa sem warnings.
- Cada arquivo fonte que recebeu testes novos tem cobertura adequada.

### Como validar

```bash
npm run test:coverage
npm test
npm run typecheck
npm run lint
```

### Riscos

- Dependências externas (anúncios, storage) podem ser difíceis de mockar, gerando testes frágeis.
- Testes de componentes React podem exigir `@testing-library/react` e `jsdom` (vitest já tem jsdom instalado como dependência, mas o environment está como 'node').
- Pode ser necessário alterar o `environment` no vitest.config.ts para `jsdom` em alguns testes de componente.
- Testes mal escritos podem testar apenas o caminho feliz e ignorar branches.

### O que NÃO alterar

- Não modificar código fonte para "facilitar" o teste — testes devem testar o código real.
- Não criar testes artificiais que não testam lógica real.
- Não alterar `vitest.config.ts` além do necessário para suportar jsdom se necessário.
- Não remover testes existentes.

### Reversibilidade

Reverter com `git checkout -- <novos arquivos de teste>`. Cada arquivo de teste é independente, permitindo remoção seletiva.

### Modelo recomendado

modelo econômico suficiente — testes unitários simples não exigem modelo forte. Se houver componente React complexo com mocking de ads/storage, considerar intermediário.

### Prompt de execução para o coder

```
Você é um agente de testes. Execute APENAS a Tarefa 5 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 5 — Aumentar cobertura de teste para >= 80%

Objetivo: Adicionar testes unitários até que todas as métricas de cobertura atinjam lines >= 80%, functions >= 80%, branches >= 70%, statements >= 80%.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm run test:coverage para ver o relatório atual
3. Identifique os arquivos com menor cobertura
4. Para cada arquivo abaixo do threshold:
   a. Leia o arquivo fonte
   b. Crie arquivo .test.ts ao lado (ou em __tests__/)
   c. Teste funções exportadas, branches (if/else), edge cases
   d. Execute npm run test:coverage e veja se melhorou
5. Para componentes React, se precisar de @testing-library/react, instale e use jsdom no vitest.config.ts:
   - npm install --save-dev @testing-library/react @testing-library/jest-dom
   - Em vitest.config.ts, defina environment: 'jsdom' nos testes de componente
   - Teste renderização, interação básica e estados (loading, vazio, erro)
6. Continue até todas as métricas de cobertura baterem os thresholds
7. Execute npm run typecheck e npm run lint para confirmar que não quebrou nada

UI/UX Gate: Não aplicável — tarefa de criação de testes, sem impacto visual.

Regras:
- NÃO modifique código fonte para facilitar teste
- NÃO crie testes genéricos que não testam nada
- Teste branches, não apenas caminho feliz
- Mock dependências externas (ads, storage) quando necessário

Critério de aceite: npm run test:coverage mostra todas métricas >= thresholds.
```

---

## Tarefa 6 — Build web e verificar

### Objetivo

Executar `npm run build` (vite build) com sucesso, verificar que o bundle gerado está funcional e que não há erros de build.

### Tipo da tarefa

validação

### Impacto UI/UX

`Não`

Justificativa: o build é puramente mecânico — empacota o código existente. Nenhuma alteração visual ou de comportamento é feita. A validação de funcionamento do build pode incluir abrir o preview, mas isso é verificação, não alteração.

### Pré-requisitos

- Tasks 2 e 3 concluídas (lint e typecheck sem erros).
- Nenhum erro estrutural no projeto.

### Arquivos prováveis

- `index.html` (ponto de entrada)
- `vite.config.ts` (não deve ser alterado nesta tarefa)
- `dist/` (pasta gerada pelo build)

### Passos

1. Executar `npm run build`.
2. Se houver erros de build, corrigi-los (um por vez, reexecutando build).
3. Se o build for bem-sucedido, executar `npm run preview` para verificar que o servidor de preview sobe.
4. Verificar que `dist/` contém `index.html` e `assets/` com os arquivos empacotados.
5. Não modificar código fonte.

### Critérios de aceite

- `npm run build` retorna exit code 0, sem erros, sem warnings.
- `dist/` gerada com index.html + assets.
- `npm run preview` sobe sem erros (pode ser encerrado após confirmação).

### Como validar

```bash
npm run build
ls dist/
npm run preview  # encerrar com Ctrl+C após confirmar que subiu
```

### Riscos

- Erros de build podem surgir de correções de tipo/lint mal aplicadas nas tasks anteriores.
- Warnings de build (se houver) devem ser investigados.

### O que NÃO alterar

- Não modificar `vite.config.ts`.
- Não modificar `index.html`.
- Não modificar código fonte para "fazer o build passar" sem entender a causa.
- Não alterar `tsconfig.json`.

### Reversibilidade

O build gera `dist/` que está no `.gitignore`. Basta apagar `dist/` e reverter qualquer correção de emergência feita no código.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Você é um agente de build. Execute APENAS a Tarefa 6 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 6 — Build web e verificar

Objetivo: Executar npm run build com sucesso e verificar que o bundle gerado está funcional.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm run build
3. Se houver erro, leia a mensagem, corrija o arquivo apontado e rebuild
4. Após build bem-sucedido, execute: ls dist/
5. Execute npm run preview (só para confirmar que sobe, pode Ctrl+C depois)
6. NÃO modifique código fonte desnecessariamente

UI/UX Gate: Não aplicável — build mecânico, sem alterações visuais.

Regras:
- Se precisar corrigir algo para o build passar, faça a correção mínima necessária
- NÃO altere vite.config.ts ou tsconfig.json
- NÃO adicione pacotes

Critério de aceite: npm run build retorna exit code 0, dist/ gerada corretamente.
```

---

## Tarefa 7 — Revisar e corrigir compliance visual com UI_UX_GUIDE.md

### Objetivo

Percorrer todos os componentes de UI do projeto, comparar com os tokens definidos em `src/ui/theme.ts` e com o guia `docs/design/UI_UX_GUIDE.md`, e corrigir desvios de cores, fontes, espaçamentos, bordas, sombras e estados visuais.

### Tipo da tarefa

UI/componente

### Impacto UI/UX

`Sim`

Justificativa: altera diretamente a aparência de componentes visuais (botões, cards, telas, menus) para alinhar com o guia de estilo. Impacta todas as telas do jogo.

Deve:
- ler `docs/design/UI_UX_GUIDE.md` antes de qualquer alteração;
- ler `src/ui/theme.ts` para entender os tokens já mapeados;
- validar visualmente em mobile e desktop;
- prever loading, erro e vazio quando aplicável;
- evitar aparência genérica de IA;
- gerar relatório ao final explicando como cada alteração segue o guia.

### Pré-requisitos

- Task 6 concluída (build funcional para visualizar alterações).
- `docs/design/UI_UX_GUIDE.md` lido e entendido.
- `src/ui/theme.ts` lido — os tokens de estilo já estão definidos.

### Arquivos prováveis

- `src/ui/theme.ts` (já implementa os tokens do guia — provavelmente não precisa alterar)
- `src/ui/Button.tsx` (verificar cores, bordas, padding, hover, disabled)
- `src/ui/MenuScreen.tsx` (verificar layout, espaçamento, título)
- `src/ui/LevelSelectionScreen.tsx` (verificar grid, cards, estados)
- `src/ui/LevelItem.tsx` (verificar card, cores, texto)
- `src/ui/HUD.tsx` (verificar layout, fontes, contraste)
- `src/ui/TimerBar.tsx` (verificar cores, altura, feedback visual)
- `src/ui/SkillButton.tsx` (verificar padding, ícone, active/disabled, cooldown)
- `src/ui/AdScreen.tsx` (verificar layout, texto, botão de fechar/pular)

### Passos

1. Ler `docs/design/UI_UX_GUIDE.md` na íntegra.
2. Ler `src/ui/theme.ts` para conhecer os tokens disponíveis.
3. Para cada componente de UI:
   a. Verificar se usa tokens de `theme.ts` (cores, spacing, borderRadius, fontSize, fontWeight, shadow).
   b. Verificar se há valores hardcoded que deveriam usar tokens.
   c. Verificar se segue as regras do guia (botão com verbo, label visível, contraste, etc.).
   d. Verificar estados: loading, vazio, erro, disabled (quando aplicável ao componente).
   e. Verificar responsividade básica (mobile e desktop).
4. Corrigir cada desvio encontrado, um componente por vez.
5. Para cada correção, registrar qual regra do UI_UX_GUIDE está sendo seguida.
6. Após todas as correções, executar `npm run build` e `npm run typecheck` para garantir que as alterações não quebraram nada.
7. Gerar relatório em `auditoria/compliance_ui_ux_sprint11.md` listando:
   - Cada componente revisado.
   - Desvios encontrados.
   - Correções aplicadas.
   - Regra do guia correspondente.

### Critérios de aceite

- Todos os componentes de UI usam tokens de `theme.ts` (sem valores hardcoded de cor, fonte ou espaçamento).
- Botões seguem as regras do guia (verbo no texto, disabled visível, hover funcional, padding adequado).
- Cards seguem o guia (borda sutil, sombra leve, sem decoração excessiva).
- Navegação entre telas funciona (Menu → LevelSelection → Game).
- Cores, fontes e espaçamentos consistentes entre telas.
- `npm run typecheck` e `npm run build` passam.
- Relatório de compliance gerado em `auditoria/compliance_ui_ux_sprint11.md`.

### Como validar

```bash
npm run dev  # visualizar cada tela manualmente
# Verificar mobile (F12 -> toggle device toolbar) e desktop
npm run typecheck
npm run build
npm run lint
cat auditoria/compliance_ui_ux_sprint11.md
```

### Riscos

- Alterações de estilo podem quebrar layout se não testadas em mobile e desktop.
- Correções de padding podem desalinhar elementos.
- Substituir valores hardcoded por tokens pode alterar levemente a aparência atual (esperado).
- Componentes com animação ou transição podem precisar de ajuste adicional.

### O que NÃO alterar

- Não alterar lógica de jogo (`src/game/`, `src/core/`, `src/storage/`).
- Não alterar `theme.ts` a menos que um token esteja claramente errado (e nesse caso, documentar).
- Não adicionar novas animações, gradientes ou decorações.
- Não alterar HTML da página (`index.html`).
- Não alterar estrutura de componentes (props, estado, hooks) — apenas estilo.
- Não criar novos componentes.
- Não alterar testes existentes.

### Reversibilidade

Cada componente alterado pode ser revertido individualmente com `git checkout -- src/ui/<componente>.tsx`. Recomenda-se fazer commits separados por componente ou por grupo lógico.

### Modelo recomendado

modelo intermediário recomendado — decisões de estilo requerem discernimento visual e consistência entre componentes, mas não exigem raciocínio arquitetural profundo.

### Prompt de execução para o coder

```
Você é um agente de UI. Execute APENAS a Tarefa 7 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 7 — Revisar e corrigir compliance visual com UI_UX_GUIDE.md

Objetivo: Garantir que todos os componentes de UI sigam o docs/design/UI_UX_GUIDE.md e usem os tokens de src/ui/theme.ts.

UI/UX Gate: SIM — esta tarefa tem impacto visual direto.

Passos obrigatórios antes de qualquer alteração:
1. Leia docs/design/UI_UX_GUIDE.md na íntegra
2. Leia src/ui/theme.ts para conhecer os tokens disponíveis

Para cada componente em src/ui/, faça:

| Componente | O que verificar |
|---|---|
| Button.tsx | Usa theme tokens? Texto começa com verbo? Disabled/hover visível? Padding adequado? |
| MenuScreen.tsx | Layout centralizado? Título claro? Botão principal evidente? |
| LevelSelectionScreen.tsx | Grid de níveis? Cards seguem guia? Estado vazio se sem níveis? |
| LevelItem.tsx | Card com borda sutil? Sombra leve? Texto legível? |
| HUD.tsx | Informações claras? Contraste adequado? Fontes do theme? |
| TimerBar.tsx | Cor de progresso visível? Altura adequada? Alerta visual quando baixo? |
| SkillButton.tsx | Ícone + texto? Disabled/cooldown visível? Padding confortável? |
| AdScreen.tsx | Layout limpo? Botão de fechar/pular visível? Texto claro? |

Regras:
- Substitua valores hardcoded por tokens de theme.ts (cores, spacing, borderRadius, fontSize, fontWeight, shadow)
- Siga as regras de botão (seção 5.1), card (5.3), navegação (5.6), microcopy (8)
- Todos os textos de botão devem começar com verbo (Criar, Selecionar, Jogar, Voltar, etc.)
- Evite aparência genérica de IA (seção 10 — padrões proibidos)
- Verifique mobile e desktop usando devtools
- NÃO altere lógica de negócio, props, estado ou hooks
- NÃO crie novos componentes

Após corrigir todos os componentes:
1. Execute npm run typecheck, npm run lint, npm run build
2. Gere relatório em auditoria/compliance_ui_ux_sprint11.md:
   - Lista cada componente revisado
   - Desvios encontrados
   - Correções aplicadas
   - Regra do UI_UX_GUIDE correspondente
   - Prints/comentários sobre mobile vs desktop

Critério de aceite: todos componentes usam theme.ts tokens, typecheck/lint/build passam, relatório gerado.
```

---

## Tarefa 8 — Testar manualmente fluxo completo do jogo

### Objetivo

Executar o jogo, percorrer o fluxo completo de usuário (menu → selecionar nível → jogar → vitória/derrota → anúncio → reiniciar → salvar), registrar comportamento observado e relatar bugs ou problemas.

### Tipo da tarefa

validação

### Impacto UI/UX

`Indireto`

Justificativa: a tarefa não altera UI, mas valida o comportamento visual e funcional do fluxo. Se bugs forem encontrados, eles podem exigir correções que impactam UI/UX.

Deve:
- ler `docs/design/UI_UX_GUIDE.md` para referência de comportamento esperado;
- validar mobile e desktop;
- verificar loading, erro e vazio no fluxo;
- evitar tratar bugs como "comportamento esperado".

### Pré-requisitos

- Task 7 concluída (UI revisada e corrigida).
- Build funcional (Task 6) OU dev server rodando.

### Arquivos prováveis

- Nenhum arquivo é alterado. Esta é uma tarefa de validação manual.
- Relatório será salvo em `auditoria/teste_manual_sprint11.md`.

### Passos

1. Iniciar `npm run dev`.
2. Testar cada etapa do fluxo:
   a. **MenuScreen:** carrega? Botão "Jogar" / "Selecionar nível" funciona?
   b. **LevelSelectionScreen:** lista de níveis carrega? Níveis bloqueados vs disponíveis têm distinção visual?
   c. **Selecionar nível:** clicar em um nível inicia o jogo?
   d. **HUD durante jogo:** timer, skills, contagem de lemmings visíveis? Funcionais?
   e. **Vitória:** tela de vitória aparece? Mensagem clara? Botão de próximo nível/próximo?
   f. **Derrota:** tela de derrota aparece? Opção de reiniciar?
   g. **Anúncio:** tela de anúncio (AdScreen) aparece? Botão de pular/fechar funciona? Timer de espera?
   h. **Reiniciar nível:** após vitória/derrota, reiniciar volta ao início do nível?
   i. **Salvamento:** progresso é salvo? Ao recarregar o jogo, o progresso anterior aparece?
   j. **Estado vazio:** sem níveis disponíveis? Sem salvamento?
3. Testar em mobile (devtools -> toggle device toolbar) e desktop.
4. Registrar cada etapa: passou/falhou, descrição do comportamento, screenshots se necessário.
5. Se encontrar bugs, registrar em `auditoria/teste_manual_sprint11.md` com:
   - Descrição do bug
   - Passos para reproduzir
   - Comportamento esperado vs observado
   - Severidade (baixa/média/alta/crítica)
6. Ao final, resumo geral: quantos testes passaram, quantos falharam.

### Critérios de aceite

- Relatório de teste manual salvo em `auditoria/teste_manual_sprint11.md`.
- Cada etapa do fluxo documentada (passou/falhou/comportamento observado).
- Bugs encontrados registrados com passos de reprodução.
- Fluxo completo executado sem travamentos ou erros fatais.

### Como validar

```bash
npm run dev  # servidor de desenvolvimento
# Navegar manualmente para http://localhost:3000
```

### Riscos

- Bugs encontrados podem exigir correções que não estavam no escopo.
- Fluxo de anúncios pode depender de SDK externo que não funciona em dev.
- Salvamento pode depender de localStorage ou IndexedDB — verificar se funciona.

### O que NÃO alterar

- Não corrigir bugs encontrados nesta tarefa — apenas registrar.
- Não alterar código fonte.
- Não pular etapas do fluxo.
- Não ignorar bugs pequenos.

### Reversibilidade

Tarefa não altera código — apenas gera relatório. Nada a reverter.

### Modelo recomendado

modelo econômico suficiente (apenas para navegar e relatar)

### Prompt de execução para o coder

```
Você é um agente de QA. Execute APENAS a Tarefa 8 descrita abaixo. NÃO avance para tarefas seguintes.

Tarefa 8 — Testar manualmente fluxo completo do jogo

Objetivo: Percorrer todo o fluxo do jogo e documentar comportamento, bugs e problemas.

UI/UX Gate: SIM (indireto) — validar comportamento visual sem alterar código. Antes de testar, leia docs/design/UI_UX_GUIDE.md para entender o comportamento visual esperado.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm run dev
3. Abra http://localhost:3000 no navegador
4. Teste cada etapa e registre:

Fluxo:
a. MenuScreen carrega? Botão funciona?
b. LevelSelectionScreen mostra níveis? Bloqueados vs disponíveis?
c. Selecionar nível inicia o jogo?
d. HUD: timer, skills, contagem de lemmings funcionais?
e. Vitória: tela aparece? Mensagem? Botão de próximo?
f. Derrota: tela aparece? Opção de reiniciar?
g. Anúncio (AdScreen): aparece? Timer? Botão pular?
h. Reiniciar: volta ao início do nível?
i. Salvamento: progresso persiste após recarregar?
j. Estados vazios: como o jogo se comporta sem dados?

5. Teste em mobile (F12 -> toggle device toolbar) e desktop
6. Para cada etapa: PASS ou FAIL + descrição
7. Para cada bug: descrição + passos para reproduzir + severidade
8. Salve relatório completo em auditoria/teste_manual_sprint11.md

Regras:
- NÃO corrija bugs — apenas registre
- NÃO pule etapas
- Relate comportamento exato, não suposições

Critério de aceite: relatório em auditoria/teste_manual_sprint11.md com todas as etapas documentadas.
```

---

## Tarefa 9 — Gerar relatório final de validação

### Objetivo

Consolidar todos os resultados das tarefas anteriores em um único relatório de validação da sprint, documentando o estado final de cada critério de aceite.

### Tipo da tarefa

documentação

### Impacto UI/UX

`Não aplicável`

Justificativa: tarefa puramente documental. Nenhum código, tela ou componente é alterado ou visualizado.

### Pré-requisitos

- Todas as Tasks 1 a 8 concluídas.
- Relatórios parciais em `auditoria/`.

### Arquivos prováveis

- `auditoria/relatorio_validacao_sprint11.md` (novo arquivo, consolidado)
- `auditoria/estado_inicial_sprint11.md` (da Task 1)
- `auditoria/cobertura_baseline.md` (da Task 4)
- `auditoria/compliance_ui_ux_sprint11.md` (da Task 7)
- `auditoria/teste_manual_sprint11.md` (da Task 8)

### Passos

1. Ler todos os relatórios parciais em `auditoria/`.
2. Verificar o estado atual de cada ferramenta executando-as novamente:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
   - `npm run test:coverage`
3. Escrever relatório consolidado com:
   - **Resumo executivo:** sprint validada? (sim/não/parcial)
   - **Status por ferramenta:** lint (✅/❌), typecheck (✅/❌), build (✅/❌), cobertura (✅/❌ + %)
   - **UI/UX Compliance:** quantos componentes revisados, quantos corrigidos, status geral
   - **Teste manual:** quantas etapas passaram, quantas falharam, bugs encontrados
   - **Regressões:** houve regressão? Quais?
   - **Riscos residuais:** o que ainda pode ser problema
   - **Recomendações:** o que fazer antes de uma release real

### Critérios de aceite

- Relatório consolidado salvo em `auditoria/relatorio_validacao_sprint11.md`.
- Todas as ferramentas executadas e seus resultados registrados.
- Status final claro (aprovado/reprovado/parcial).
- Print dos comandos de validação no relatório ou referência a eles.

### Como validar

```bash
cat auditoria/relatorio_validacao_sprint11.md
# Confirmar que cada ferramenta foi executada e registrada
```

### Riscos

- Nenhum — tarefa apenas compila informações existentes.
- Único risco: esquecer de reexecutar as ferramentas para confirmar estado final.

### O que NÃO alterar

- Não alterar código fonte.
- Não modificar relatórios parciais.
- Não adicionar opiniões subjetivas sem dados.

### Reversibilidade

Relatório pode ser apagado ou regerado. Nenhum código afetado.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Você é um agente de documentação. Execute APENAS a Tarefa 9 descrita abaixo. NÃO avance.

Tarefa 9 — Gerar relatório final de validação

Objetivo: Consolidar todos os resultados em um relatório final de validação da Sprint 11.

Passos:
1. cd /mnt/c/Dev/lemmings-style-game/
2. Execute npm run lint, npm run typecheck, npm run build, npm run test:coverage
3. Leia todos os relatórios em auditoria/
4. Escreva auditoria/relatorio_validacao_sprint11.md com:

Estrutura do relatório:
# Relatório de Validação — Sprint 11

## Resumo Executivo
[Aprovado / Reprovado / Parcial]

## Status das Ferramentas
| Ferramenta | Status | Detalhes |
|---|---|---|
| Lint | ✅/❌ | warnings: X |
| Typecheck | ✅/❌ | erros: X |
| Build | ✅/❌ | |
| Cobertura | ✅/❌ | lines X%, funcs X%, branches X%, stmts X% |

## UI/UX Compliance
- Componentes revisados: X
- Corrigidos: X
- Status: [OK / Parcial / Pendente]
- Relatório detalhado: auditoria/compliance_ui_ux_sprint11.md

## Teste Manual
- Etapas testadas: X
- Aprovadas: X
- Falhas: X
- Bugs críticos: X
- Relatório: auditoria/teste_manual_sprint11.md

## Regressões
[Listar regressões encontradas, se houver]

## Riscos Residuais
[Listar riscos que ainda existem]

## Recomendações
[O que fazer antes de uma release]

UI/UX Gate: Não aplicável — tarefa de documentação.

Critério de aceite: relatório completo salvo em auditoria/relatorio_validacao_sprint11.md.
```

---

# Ordem recomendada de execução

```
Tarefa 1 (Diagnóstico)
  └── commit/checkpoint: relatório do estado inicial
      │
      ├── Tarefa 2 (Lint) ──────── pode rodar em paralelo com ──────── Tarefa 3 (Typecheck)
      │                                (mas é mais seguro: Task 2 → Task 3)
      └── commit/checkpoint: lint e typecheck ok
              │
              ├── Tarefa 4 (Cobertura baseline)
              └── Tarefa 5 (Aumentar cobertura)
                  commit/checkpoint: cobertura >= 80%
                      │
                      └── Tarefa 6 (Build web)
                          commit/checkpoint: build funcional
                              │
                              └── Tarefa 7 (UI/UX Compliance)
                                  commit/checkpoint: UI revisada
                                      │
                                      └── Tarefa 8 (Teste Manual)
                                          commit/checkpoint: relatório de QA
                                              │
                                              └── Tarefa 9 (Relatório Final)
                                                  commit/checkpoint: sprint validada
```

**Checkpoints recomendados:**
- Após Task 1 (relatório de diagnóstico salvo)
- Após Tasks 2+3 (lint e typecheck verdes)
- Após Task 5 (cobertura >= 80%)
- Após Task 7 (UI revisada — ponto de auditoria visual)
- Após Task 9 (sprint completa)

**Auditoria UI/UX:** obrigatória após Task 7. Recomenda-se revisão humana do relatório `auditoria/compliance_ui_ux_sprint11.md` antes de prosseguir para Task 8.

**Tarefas que podem rodar isoladamente (com ressalvas):**
- Tarefa 2 e Tarefa 3: podem rodar em paralelo, mas tarefa 3 pode ser mais fácil se a tarefa 2 já removeu imports não usados e padronizou código.

**Tarefas que DEPENDEM de outras:**
- Tarefa 6 depende de 2 e 3 (build com erros de lint/typecheck não deve ser considerado válido).
- Tarefa 7 idealmente após 6 (para visualizar alterações).
- Tarefa 8 depende de 6 ou de dev server.
- Tarefa 9 depende de todas.

---

# Checklist final da sprint

- [x] lint executado — zero warnings
- [x] typecheck executado — zero erros
- [x] build executado — sucesso
- [x] testes executados — passando
- [x] cobertura >= 80% (lines, functions, statements) e >= 70% (branches)
- [x] fluxo manual validado — relatório em auditoria/teste_manual_sprint11.md
- [x] responsividade validada (mobile + desktop) — na Task 7 e 8
- [x] regressões verificadas — relatório consolidado
- [x] arquivos alterados revisados — diff revisado antes do merge
- [x] escopo conferido contra a sprint original — nenhum extra adicionado
- [x] nenhuma funcionalidade fora do escopo adicionada
- [x] UI/UX Gate preenchido para todas as tarefas (ver tabela abaixo)
- [x] `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual (Task 7)

**Tabela UI/UX Gate por tarefa:**

| Tarefa | Impacto UI/UX | Observação |
|---|---|---|
| Tarefa 1 | Não | Diagnóstico, sem alteração visual |
| Tarefa 2 | Não | Configuração de ferramenta |
| Tarefa 3 | Não | Correção de tipos |
| Tarefa 4 | Não | Configuração de cobertura |
| Tarefa 5 | Não | Criação de testes |
| Tarefa 6 | Não | Build mecânico |
| Tarefa 7 | Sim | Altera componentes visuais |
| Tarefa 8 | Indireto | Valida fluxo visual sem alterar |
| Tarefa 9 | Não aplicável | Documentação |

---

# Tarefas que NÃO devem ir para modelo econômico

- **Tarefa 3 (Typecheck)** — modelo **intermediário recomendado**. Erros de tipo podem exigir entendimento de interfaces compartilhadas e decisões sobre tipagem. Um modelo econômico pode sugerir `any` ou `@ts-ignore` para resolver rápido, o que comprometeria a qualidade do código.
- **Tarefa 7 (UI/UX Compliance)** — modelo **intermediário recomendado**. Decisões de estilo exigem discernimento visual, consistência entre componentes e aderência a um guia de estilo. Um modelo econômico pode produzir ajustes genéricos ou inconsistentes.
- **Tarefa 5 (Cobertura)** — modelo **econômico suficiente**, com ressalva: se os componentes React exigirem `@testing-library/react` com mocks de ads/storage, pode ser necessário modelo intermediário.

**Tarefas seguras para modelo econômico:** Tarefas 1, 2, 4, 6, 8, 9 — são tarefas de configuração, leitura, build mecânico ou documentação, que não exigem decisões arquiteturais ou visuais complexas.
