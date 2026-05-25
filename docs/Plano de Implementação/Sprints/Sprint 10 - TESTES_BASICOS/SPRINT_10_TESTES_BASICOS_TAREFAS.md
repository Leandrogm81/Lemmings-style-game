# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome da sprint original:** Sprint 10 — TESTES_BASICOS
- **Objetivo da sprint original:** Implementar testes unitários e de integração para validar core: engine movement, skill cooldown, save/load, ad triggers.
- **Arquivo de origem:** `docs/Plano de Implementação/Sprints/Sprint 10 - TESTES_BASICOS/SPRINT_10_TESTES_BASICOS.md`
- **Resumo do escopo:** Criar diretório `tests/` com testes unitários para módulos criados em sprints anteriores, usando framework de teste padrão do projeto, testando funções críticas (`moveCreatures`, `checkVictory`, `SkillManager.isReady`, `ads_manager.shouldShowAd`), com cobertura >= 80% das linhas novas.

### Ajustes necessários detectados na leitura da codebase

A sprint original referencia funções que **não existem na codebase atual**:

| Referido na sprint | Realidade na codebase |
|---|---|
| `moveCreatures` | Não existe em nenhum arquivo `/src/` |
| `checkVictory` | Não existe em nenhum arquivo `/src/` |
| `SkillManager.isReady` | Método real: `SkillManager.estaDisponivel(skillId)` (Português) |
| `ads_manager.shouldShowAd` | Função real: `ads_manager.deveExibirAnuncio()` (Português) |
| `progress.save/load` | Apenas a interface `ProgressoJogador` existe em `core/progresso_jogador.ts`. Não há módulo de save/load com localStorage ou similar. |
| Testes para `ads_manager` | Já existe `src/ads/ads_manager.test.ts` com 8 cenários cobertos via `console.assert` + runner manual |
| Testes para `level_manager` | Já existe `src/game/level_manager.test.ts` com 4 funções de teste EXPORTADAS mas SEM runner |
| Framework de teste | Nenhum instalado. `package.json` tem `"test": "echo 'test placeholder'"` |

**Decisão:** as tarefas abaixo ajustam o escopo para o que realmente existe na codebase, sem inventar módulos.

---

## Análise da Sprint

### Objetivo da sprint

Instalar Vitest como framework de teste, converter os testes existentes (console.assert manual) para o formato Vitest, e criar testes para o módulo `SkillManager` que ainda não tem cobertura.

### Impacto UI/UX da sprint

**Classificação:** `Não`

**Justificativa:** Testes são puramente lógicos — não envolvem telas, componentes visuais, formulários, mensagens de interface, fluxos de usuário ou qualquer elemento visual. Nenhum arquivo de UI será alterado ou criado.

### Escopo identificado

- Instalar Vitest como framework de teste (compatível com Vite já configurado)
- Converter `src/ads/ads_manager.test.ts` para Vitest (aproveitando os 8 cenários existentes)
- Converter `src/game/level_manager.test.ts` para Vitest (aproveitando os 4 cenários existentes)
- Criar `src/game/skills.test.ts` para o módulo `SkillManager` (cobertura zero hoje)
- Documentar as funções `moveCreatures`, `checkVictory` e save/load como não implementadas — sem criar módulos novos
- Verificar cobertura de linhas para os módulos testados

### Fora do escopo

- Não criar testes para `moveCreatures` (não existe na codebase)
- Não criar testes para `checkVictory` (não existe na codebase)
- Não criar módulo de save/load (não existe — criar seria expansão de escopo)
- Não alterar lógica de produção em nenhum arquivo `.ts`/`.tsx` de funcionalidade
- Não criar testes end-to-end (E2E)
- Não criar testes de regressão visual
- Não refatorar os módulos existentes para "facilitar" os testes
- Não instalar Jest, Mocha ou outro framework — Vitest é a escolha natural para Vite
- Não modificar `tsconfig.json`
- Não modificar `vite.config.ts` a menos que estritamente necessário

### Dependências entre partes

- Tarefa 1 (instalar Vitest) é pré-requisito de TODAS as outras
- Tarefas 2, 3 e 4 são independentes entre si (podem ser executadas em paralelo após a Tarefa 1)
- Tarefa 5 (cobertura + documentação) depende das Tarefas 2, 3 e 4 estarem completas
- A existência de `vitest` no `vite.config.ts` (plugin) não é necessária — Vitest funciona com `vite.config.ts` se ele existir, ou com `vitest.config.ts` próprio

### Riscos principais

1. **Risco de regressão nos testes existentes:** os 8 cenários do `ads_manager.test.ts` e 4 do `level_manager.test.ts` já funcionam. A conversão para Vitest pode introduzir erros de sintaxe ou lógica.
2. **Risco de configuração:** instalar Vitest com versão errada ou incompatível com Vite 8. Verificar compatibilidade.
3. **Risco de cobertura artificial:** `ProgressoJogador` é uma interface sem lógica — não gera cobertura de linhas. Definir meta realista.
4. **Risco de falso negativo:** `SkillManager` depende de `Date.now()`. Testes que verificam cooldown precisam mockar o tempo, senão flaky.
5. **Risco de escopo:** a sprint original promete cobertura >= 80%, mas funções como `moveCreatures` e `checkVictory` não existem — a base de cobertura é menor que o esperado.

### Estratégia de quebra

A sprint será dividida em 5 tarefas sequenciais:

1. **Pré-requisito:** instalar Vitest e configurar o script `test` no `package.json`.
2. **Converter testes existentes de ads** para Vitest (reaproveitar lógica, mudar sintaxe de asserção).
3. **Converter testes existentes de level_manager** para Vitest (adicionar runner que faltava).
4. **Criar testes novos para SkillManager** (módulo sem cobertura).
5. **Validar cobertura e documentar lacunas** (funções que não existem na codebase).

Cada tarefa gera um diff pequeno, revisável e reversível (git checkout do(s) arquivo(s) envolvido(s)).

---

# Tarefas da Sprint

## Tarefa 1 — Instalar Vitest como framework de teste

### Objetivo

Adicionar Vitest como dependência dev do projeto e configurar o script `test` no `package.json` para executar os testes. Vitest é o framework nativo para projetos Vite — aproveita a configuração existente sem necessidade de configurar transpilação separada.

### Tipo da tarefa

Configuração

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Configuração de ferramenta de desenvolvimento. Nenhum arquivo de UI é tocado, nenhuma tela ou componente visual é alterado. Vitest roda apenas em ambiente de desenvolvimento/CI.

### Pré-requisitos

- `package.json` existente e válido
- `npm install` já executado anteriormente (node_modules presente)
- Git configurado no repositório (para reversibilidade)

### Arquivos prováveis

- `package.json` (adicionar `vitest` em `devDependencies` e alterar script `test`)
- `vitest.config.ts` (opcional — Vitest funciona com `vite.config.ts` existente)
- `node_modules/` (atualizado via npm install)

### Passos

1. Executar `npm install -D vitest` no diretório do projeto.
2. Verificar a versão instalada no `package.json`.
3. Alterar o script `"test"` de `"echo 'test placeholder'"` para `"vitest run"`.
4. Adicionar script `"test:watch"` com `"vitest"` (modo watch opcional).
5. Executar `npm test` para confirmar que Vitest inicializa (deve reportar "no test files found" ou similar — é esperado pois ainda não há testes no formato Vitest).
6. Fazer commit com mensagem: `chore: install vitest and configure test script`.

### Critérios de aceite

- `vitest` aparece em `devDependencies` no `package.json`
- Script `"test"` executa `vitest run`
- `npm test` roda sem erros de configuração (pode reportar 0 testes encontrados — é aceitável)
- `npx vitest --version` retorna um número de versão válido
- `npm run build` continua funcionando (a instalação não quebrou o build)

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npm test
npx vitest --version
npm run build
npm run typecheck
```

### Riscos

- Versão do Vitest incompatível com Vite 8. Se falhar, instalar versão específica compatível (`npm install -D vitest@latest`).
- `vitest` pode precisar de configurações adicionais se o `vite.config.ts` não for detectado automaticamente. Nesse caso, criar `vitest.config.ts` mínimo.
- Nenhum risco de regressão em funcionalidades — apenas `devDependencies` e script alterados.

### O que NÃO alterar

- Não alterar `vite.config.ts` a menos que Vitest exija (verificar primeiro se funciona sem)
- Não alterar `tsconfig.json`
- Não alterar nenhum arquivo em `src/`
- Não adicionar nenhuma outra dependência além de `vitest`
- Não alterar scripts `dev`, `build`, `preview`, `typecheck` ou `lint`

### Reversibilidade

Reverter com `git checkout -- package.json` ou `git revert` do commit. Após reverter, executar `npm install` para remover `vitest` do `node_modules`. Totalmente reversível.

### Modelo recomendado

Modelo econômico suficiente.

### Prompt de execução para o coder

```
TAREFA: Instalar Vitest como framework de teste no projeto lemmings-style-game.

SOMENTE esta tarefa. Não avance para a próxima.

O projeto está em /mnt/c/Dev/lemmings-style-game. Use React 19 + Vite 8 + TypeScript 6.
O package.json atual tem "test": "echo 'test placeholder'".

Passos:
1. npm install -D vitest
2. Altere o script "test" para "vitest run"
3. Adicione script "test:watch" com "vitest"
4. Execute npm test para confirmar que inicializa
5. Execute npm run build para confirmar que não quebrou

NÃO altere src/, tsconfig.json ou vite.config.ts.
Apenas package.json deve mudar.

Validação: npm test + npm run build + npx vitest --version
```

---

## Tarefa 2 — Converter ads_manager.test.ts para Vitest

### Objetivo

Converter o arquivo `src/ads/ads_manager.test.ts` do formato `console.assert` + runner manual para o formato Vitest (`describe`/`it`/`expect`). Manter EXATAMENTE os mesmos 8 cenários de teste — nenhum cenário novo, nenhum removido.

### Tipo da tarefa

Testes

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Teste de lógica pura (streaks de vitórias/derrotas para anúncios). Nenhum componente visual, tela ou fluxo de UI é alterado. O módulo `ads_manager.ts` não depende de React ou DOM.

### Pré-requisitos

- Tarefa 1 concluída (Vitest instalado e funcional)
- Leitura do arquivo existente `src/ads/ads_manager.test.ts` para entender a estrutura dos 8 cenários
- Leitura do módulo `src/ads/ads_manager.ts` para confirmar as funções exportadas

### Arquivos prováveis

- `src/ads/ads_manager.test.ts` (reescrito com sintaxe Vitest)

### Passos

1. Ler o arquivo atual `src/ads/ads_manager.test.ts` — identificar os 8 cenários e o runner manual.
2. Reescrever o arquivo usando `describe`, `it` e `expect` do Vitest.
3. Cada cenário existente vira um `it(...)` dentro de um `describe('ads_manager', ...)`.
4. Manter os imports existentes (`registrarVitoria`, `registrarDerrota`, `deveExibirAnuncio`, `resetarAposExibicao`, `getStreaks`).
5. Usar `beforeEach(() => resetarAposExibicao())` para isolar os testes (substitui as chamadas manuais de `resetarAposExibicao()` no início de cada cenário).
6. Executar `npm test` e confirmar que todos os 8 testes passam.
7. Fazer commit com mensagem: `test: convert ads_manager tests to Vitest format`.

### Critérios de aceite

- `npm test` reporta exatamente 8 testes passando (ou o número exato de cenários convertidos)
- Todos os cenários originais estão preservados:
  - Teste 1: 2 vitórias consecutivas disparam anúncio
  - Teste 2: 1 vitória NÃO dispara anúncio
  - Teste 3: 3 derrotas consecutivas disparam anúncio
  - Teste 4: 2 derrotas NÃO disparam anúncio
  - Teste 5: Intercalar V D V nunca dispara anúncio
  - Teste 6: resetarAposExibicao() zera todos os streaks
  - Teste 7: Vitória após derrota zera failureStreak
  - Teste 8: Derrota após vitória zera winStreak
- Nenhuma linha do `src/ads/ads_manager.ts` (produção) foi alterada
- `npm run typecheck` continua passando
- `npm run build` continua funcionando

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npm test
npm run typecheck
npm run build
```

### Riscos

- Erro de sintaxe na conversão — os `expect` do Vitest têm sintaxe diferente de `console.assert`. Revisar cada cenário após a conversão.
- Esquecer de importar `describe`, `it`, `expect`, `beforeEach` do `vitest`. O TypeScript acusará erro de compilação.
- Adicionar cenários novos inadvertidamente — manter foco em converter apenas os 8 existentes.

### O que NÃO alterar

- Não alterar `src/ads/ads_manager.ts` (produção)
- Não adicionar novos cenários de teste
- Não remover cenários existentes
- Não alterar `package.json`, `vite.config.ts`, `tsconfig.json`
- Não alterar nenhum outro arquivo fora de `src/ads/ads_manager.test.ts`

### Reversibilidade

Reverter com `git checkout -- src/ads/ads_manager.test.ts`. O arquivo original com runner manual será restaurado. Totalmente reversível.

### Modelo recomendado

Modelo econômico suficiente.

### Prompt de execução para o coder

```
TAREFA: Converter src/ads/ads_manager.test.ts de console.assert + runner manual para Vitest (describe/it/expect).

SOMENTE esta tarefa. Não avance para a próxima.

Projeto: /mnt/c/Dev/lemmings-style-game (React 19 + Vite 8 + TypeScript 6). Vitest já instalado.

O arquivo atual tem 8 cenários com console.assert + um runner manual que itera sobre um objeto de funções.

Você DEVE:
1. Ler o arquivo original para entender os 8 cenários EXATOS
2. Reescrever usando describe, it, expect do vitest
3. Usar beforeEach para resetar o estado (resetarAposExibicao)
4. Manter imports de src/ads/ads_manager.ts
5. NÃO adicionar cenários novos, NÃO remover existentes
6. NÃO alterar src/ads/ads_manager.ts
7. npm test deve reportar 8 testes passando
8. npm run typecheck deve passar
9. npm run build deve passar

Validação: npm test && npm run typecheck && npm run build
```

---

## Tarefa 3 — Converter level_manager.test.ts para Vitest

### Objetivo

Converter o arquivo `src/game/level_manager.test.ts` do formato atual (funções exportadas com `console.assert`, SEM runner) para o formato Vitest (`describe`/`it`/`expect`). O arquivo já tem 4 cenários de teste definidos — eles precisam de um runner para serem executados.

### Tipo da tarefa

Testes

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Teste de lógica pura do `LevelManager` (instanciação, restart, eventos). Nenhum componente visual, tela ou fluxo de UI é alterado. O módulo `level_manager.ts` não depende de React ou DOM.

### Pré-requisitos

- Tarefa 1 concluída (Vitest instalado e funcional)
- Leitura do arquivo existente `src/game/level_manager.test.ts` para entender os 4 cenários
- Leitura do módulo `src/game/level_manager.ts` para confirmar a API

### Arquivos prováveis

- `src/game/level_manager.test.ts` (reescrito com sintaxe Vitest + runner)

### Passos

1. Ler o arquivo atual `src/game/level_manager.test.ts` — identificar os 4 cenários exportados (mas nunca executados).
2. Reescrever o arquivo usando `describe`, `it` e `expect` do Vitest.
3. Cada função de teste existente vira um `it(...)` dentro de `describe('LevelManager', ...)`.
4. Manter o `MOCK_CONFIG` existente como fixture.
5. Executar `npm test` e confirmar que os 4 testes passam.
6. Fazer commit com mensagem: `test: convert level_manager tests to Vitest format`.

### Critérios de aceite

- `npm test` reporta exatamente 4 testes passando
- Todos os cenários originais estão preservados:
  - Teste 1: LevelManager é instanciável com LvlConfig válido
  - Teste 2: restartLevel() restaura estado ao inicial
  - Teste 3: Evento de reinício é disparado corretamente
  - Teste 4: Múltiplos restarts consecutivos são consistentes
- Nenhuma linha do `src/game/level_manager.ts` (produção) foi alterada
- `npm run typecheck` continua passando
- `npm run build` continua funcionando

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npm test
npm run typecheck
npm run build
```

### Riscos

- O teste 3 usa asserções com `as RestartEvent | null` — garantir que a sintaxe Vitest lida corretamente com tipos.
- O teste 4 testa múltiplos restarts — verificar se o mock de tempo não interfere.
- O arquivo atual importa `LevelRuntimeState` e `RestartEvent` só para tipos — verificar se são realmente necessários após conversão.

### O que NÃO alterar

- Não alterar `src/game/level_manager.ts` (produção)
- Não adicionar novos cenários de teste
- Não remover cenários existentes
- Não alterar `package.json`, `vite.config.ts`, `tsconfig.json`
- Não alterar nenhum outro arquivo fora de `src/game/level_manager.test.ts`

### Reversibilidade

Reverter com `git checkout -- src/game/level_manager.test.ts`. O arquivo original (funções exportadas sem runner) será restaurado. Totalmente reversível.

### Modelo recomendado

Modelo econômico suficiente.

### Prompt de execução para o coder

```
TAREFA: Converter src/game/level_manager.test.ts de funções exportadas sem runner para Vitest (describe/it/expect).

SOMENTE esta tarefa. Não avance para a próxima.

Projeto: /mnt/c/Dev/lemmings-style-game (React 19 + Vite 8 + TypeScript 6). Vitest já instalado.

O arquivo atual tem 4 funções de teste EXPORTADAS (nunca executadas — não tem runner):
- testLevelManagerInstantiation
- testRestartLevelResetsState
- testRestartEventIsEmitted
- testMultipleRestarts

Você DEVE:
1. Ler o arquivo original para entender os 4 cenários EXATOS
2. Reescrever usando describe, it, expect do vitest
3. Manter MOCK_CONFIG como fixture
4. NÃO adicionar cenários novos, NÃO remover existentes
5. NÃO alterar src/game/level_manager.ts
6. npm test deve reportar 4 testes passando
7. npm run typecheck deve passar
8. npm run build deve passar

Validação: npm test && npm run typecheck && npm run build
```

---

## Tarefa 4 — Criar testes para SkillManager (skills.test.ts)

### Objetivo

Criar o arquivo `src/game/skills.test.ts` com testes unitários para a classe `SkillManager` em `src/game/skills.ts`. Este módulo não tem nenhum teste hoje.

**Atenção:** o método mencionado na sprint original como `SkillManager.isReady` chama-se `SkillManager.estaDisponivel(skillId)` na codebase real (Português). Os testes devem usar os nomes reais dos métodos.

### Tipo da tarefa

Testes

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Teste de lógica pura do sistema de cooldown de skills. Nenhum componente visual, tela ou fluxo de UI é alterado. O módulo `skills.ts` é explicitamente marcado como "lógica pura — sem dependências de UI".

### Pré-requisitos

- Tarefa 1 concluída (Vitest instalado e funcional)
- Leitura completa de `src/game/skills.ts` para entender toda a API pública

### Arquivos prováveis

- `src/game/skills.test.ts` (CRIAR — não existe hoje)

### Passos

1. Ler `src/game/skills.ts` e mapear toda a API pública:
   - `SkillManager` class: `constructor`, `iniciarSkill`, `atualizarTimers`, `getEstado`, `getTodosEstados`, `estaDisponivel`, `inscrever`
   - `skillManager` singleton exportado
   - Constantes `SKILL_DEFINITIONS`
   - Tipos `SkillDefinition`, `SkillState`
2. Criar `src/game/skills.test.ts` com `describe('SkillManager', ...)`.
3. Escrever cenários:

   **Instanciação e estado inicial:**
   - `it('deve inicializar com skills padrão disponíveis')` — verifica que todas as 4 skills padrão existem e estão com `disponivel: true`
   - `it('deve aceitar definições customizadas no construtor')` — passa 2 skills, verifica `getTodosEstados().length === 2`

   **iniciarSkill:**
   - `it('deve retornar true e marcar skill como indisponível ao iniciar skill válida')` — inicia `escavar`, verifica `true` e `estaDisponivel('escavar') === false`
   - `it('deve retornar false para skill inexistente')` — chama `iniciarSkill('inexistente')`, espera `false`
   - `it('deve retornar false se skill já está em cooldown')` — inicia 2x seguidas, segunda deve retornar `false`

   **atualizarTimers e cooldown:**
   - `it('deve restaurar disponibilidade após o cooldown expirar')` — inicia skill com `duracaoCooldownMs: 100`, avança tempo 101ms via `atualizarTimers`, verifica `estaDisponivel === true`
   - `it('não deve restaurar antes do cooldown completar')` — inicia skill, avança tempo parcial (`duracaoCooldownMs - 1`), verifica `estaDisponivel === false`

   **getEstado:**
   - `it('deve retornar o estado de uma skill específica')`
   - `it('deve retornar undefined para skill inexistente')`

   **getTodosEstados:**
   - `it('deve retornar array com todas as skills')` — verifica `length` e que cada item tem `skillId`

   **inscrever:**
   - `it('deve notificar callback quando skill muda de estado')` — inscreve, inicia skill, verifica que callback foi chamado com estado atualizado
   - `it('deve retornar função de unsubscribe')` — inscreve, chama unsubscribe, inicia skill, callback NÃO deve ser chamado
   - `it('deve retornar noop para skill inexistente')` — inscreve em skill inválida, chama função retornada, não deve lançar erro

4. **IMPORTANTE:** Para testar cooldown sem depender de `Date.now()` real (que causaria flaky tests), usar `vi.spyOn(Date, 'now')` para mockar o tempo ou usar `vi.advanceTimersByTime()`. Verificar a melhor abordagem para Vitest (fake timers ou spy).

5. Executar `npm test` e confirmar que todos os testes passam.
6. Executar `npm run typecheck` e confirmar.
7. Executar `npm run build` e confirmar.
8. Fazer commit com mensagem: `test: add SkillManager tests`.

### Critérios de aceite

- Arquivo `src/game/skills.test.ts` criado com no mínimo 10 cenários
- `npm test` reporta todos os testes passando (deve incluir os das tarefas 2 e 3 também)
- Todas as funções públicas de `SkillManager` têm pelo menos um teste:
  - `constructor` (com args padrão e customizados)
  - `iniciarSkill` (sucesso, skill inexistente, cooldown ativo)
  - `atualizarTimers` (cooldown expira, cooldown ainda ativo)
  - `estaDisponivel` (disponível e indisponível)
  - `getEstado` (existente e inexistente)
  - `getTodosEstados`
  - `inscrever` (notificação, unsubscribe, skill inexistente)
- Testes de temporização usam mocks (`vi.spyOn` ou `vi.useFakeTimers`) para não serem flaky
- Nenhuma linha do `src/game/skills.ts` (produção) foi alterada
- `npm run typecheck` e `npm run build` passam

### Riscos

- **Flaky tests de tempo:** `SkillManager` usa `Date.now()` internamente. Testes que verificam cooldown vão falhar se o tempo real variar entre execuções. **OBRIGATÓRIO** usar `vi.spyOn(Date, 'now')` ou `vi.useFakeTimers()`.
- **Singleton global:** `skillManager` é exportado como instância singleton. Testes que compartilham o mesmo singleton podem interferir entre si. Solução: testar instâncias isoladas de `new SkillManager(...)` em vez do singleton, OU resetar o singleton entre testes.
- **Cobertura:** `SKILL_DEFINITIONS` e tipos são constantes/tipos — não geram cobertura de linha mensurável. Definir meta de cobertura apenas para métodos da classe.

### O que NÃO alterar

- Não alterar `src/game/skills.ts` (produção) — nem para "facilitar" testes
- Não alterar nenhum outro arquivo de produção
- Não testar o singleton `skillManager` diretamente (testar instâncias isoladas)
- Não adicionar dependências externas
- Não remover os testes das tarefas 2 e 3

### Reversibilidade

Reverter com `git rm src/game/skills.test.ts` ou `git checkout -- src/game/`. Nenhum arquivo de produção foi alterado, então a reversão é segura. Totalmente reversível.

### Modelo recomendado

**Modelo intermediário recomendado** (os testes de cooldown com mock de tempo exigem cuidado com `vi.spyOn`/fake timers, que pode ser tricky para modelo econômico).

Caso o executor seja modelo econômico, os testes de temporização podem ser simplificados para usar `vi.spyOn(Date, 'now')` com valores manuais em vez de fake timers.

### Prompt de execução para o coder

```
TAREFA: Criar src/game/skills.test.ts com testes Vitest para SkillManager.

SOMENTE esta tarefa. Não avance para a próxima.

Projeto: /mnt/c/Dev/lemmings-style-game (React 19 + Vite 8 + TypeScript 6). Vitest já instalado.

Leia src/game/skills.ts primeiro para entender a API completa.

A classe SkillManager tem estes métodos públicos:
- constructor(definitions?: SkillDefinition[]) — usa SKILL_DEFINITIONS como padrão
- iniciarSkill(skillId: string): boolean
- atualizarTimers(agoraMs: number): void
- estaDisponivel(skillId: string): boolean
- getEstado(skillId: string): SkillState | undefined
- getTodosEstados(): SkillState[]
- inscrever(skillId: string, callback): () => void

REGRAS IMPORTANTES:
1. use describe/it/expect do vitest
2. teste instâncias ISOLADAS de SkillManager, não o singleton
3. para cooldown, use vi.spyOn(Date, 'now') para mockar o tempo
4. NÃO altere src/game/skills.ts
5. mínimo 10 cenários cobrindo todos os métodos públicos
6. npm test, npm run typecheck, npm run build devem passar

Esquemas de teste sugeridos:
- Construtor com skills padrão (4 skills disponíveis)
- Construtor com skills customizadas (2 skills)
- iniciarSkill retorna true e marca indisponível
- iniciarSkill retorna false para skill inexistente
- iniciarSkill retorna false se já em cooldown
- atualizarTimers restaura disponibilidade após cooldown
- atualizarTimers não restaura antes do cooldown
- estaDisponivel retorna true/false corretamente
- getEstado retorna estado ou undefined
- inscrever notifica no estado, unsubscribe remove

Validação: npm test && npm run typecheck && npm run build
```

---

## Tarefa 5 — Validar cobertura e documentar lacunas da sprint

### Objetivo

Executar a cobertura de código do Vitest para verificar a taxa de cobertura dos módulos testados. Documentar as funções mencionadas na sprint original que não existem na codebase (`moveCreatures`, `checkVictory`, save/load) como pendências para sprints futuras.

### Tipo da tarefa

Documentação

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Tarefa de medição e documentação. Nenhum arquivo de UI, tela ou componente visual é alterado.

### Pré-requisitos

- Tarefas 2, 3 e 4 concluídas e passando
- `@vitest/coverage-v8` instalado ou configurado (pode ser via np ou plugin)

### Arquivos prováveis

- `package.json` (opcional — adicionar script `"test:coverage"`)
- `vitest.config.ts` (opcional — configurar `coverage.enabled`)
- `src/game/__cobertura_lacunas.md` ou similar (criar documento)

### Passos

1. Instalar `@vitest/coverage-v8` como devDependency se não existir: `npm install -D @vitest/coverage-v8`.
2. Verificar se o Vitest está configurado para gerar relatório de cobertura:
   - Opção A: adicionar `--coverage` ao script `"test:coverage"` no `package.json`.
   - Opção B: configurar `coverage` no `vitest.config.ts`.
3. Executar `npx vitest --coverage` e verificar o relatório.
4. Analisar cobertura por módulo:
   - `src/ads/ads_manager.ts`
   - `src/game/level_manager.ts`
   - `src/game/skills.ts`
   - Ignorar `core/` (apenas tipos/interface — sem lógica executável)
5. Criar arquivo `docs/test-coverage-sprint-10.md` com:
   - Tabela de cobertura por módulo
   - Observações sobre funções não encontradas
   - Recomendações para sprints futuras

### Critérios de aceite

- Relatório de cobertura gerado sem erros
- Arquivo `docs/test-coverage-sprint-10.md` criado com:
  - Data de geração
  - Cobertura de linhas para cada módulo testado
  - Lista de funções que a sprint original esperava mas não existem (`moveCreatures`, `checkVictory`, save/load)
  - Explicação sobre o motivo de não terem sido implementadas (não existem na codebase)
  - Recomendação para criar esses módulos em sprints futuras antes de testá-los
- `npm test` continua passando
- `npm run build` continua funcionando

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npx vitest --coverage
# Ver relatório no terminal e/ou em coverage/
cat docs/test-coverage-sprint-10.md
npm test
npm run build
```

### Riscos

- `@vitest/coverage-v8` pode precisar de dependências nativas. Se falhar, usar `--coverage.provider=v8` ou `istanbul`.
- Cobertura pode ser baixa em `level_manager.ts` (os testes existentes cobrem restart, mas não simulam gameplay). Isso é esperado — documentar.
- Cobertura de `ads_manager.ts` deve ser alta (8 cenários já cobrem todos os fluxos). Documentar.
- `ProgressoJogador` e `Criatura` são interfaces — 0% de cobertura de linha. Isso é normal e não deve ser considerado falha.

### O que NÃO alterar

- Não alterar nenhum arquivo de produção em `src/`
- Não alterar os testes já criados nas tarefas 2, 3 e 4
- Não instalar ferramentas além de `@vitest/coverage-v8`
- Não modificar `tsconfig.json` ou `vite.config.ts` a menos que estritamente necessário para cobertura

### Reversibilidade

Reverter com `git checkout -- docs/test-coverage-sprint-10.md` e `git checkout -- package.json` se scripts foram alterados. Totalmente reversível.

### Modelo recomendado

Modelo econômico suficiente.

### Prompt de execução para o coder

```
TAREFA: Executar cobertura de código Vitest e documentar lacunas da sprint.

SOMENTE esta tarefa. Não avance para a próxima.

Projeto: /mnt/c/Dev/lemmings-style-game. Vitest já instalado com testes.

Passos:
1. npm install -D @vitest/coverage-v8 (se necessário)
2. npx vitest --coverage para gerar relatório
3. Criar docs/test-coverage-sprint-10.md com:
   - Tabela de cobertura (linhas/funções/branches) para:
     - src/ads/ads_manager.ts
     - src/game/level_manager.ts
     - src/game/skills.ts
   - Nota: funções moveCreatures, checkVictory não existem na codebase
   - Nota: módulo save/load não existe (apenas interface ProgressoJogador)
   - Recomendação: criar esses módulos em sprints futuras
4. npm test continua passando
5. npm run build continua funcionando

NÃO altere nenhum arquivo em src/.
```

---

# Ordem recomendada de execução

A execução DEVE ser estritamente sequencial. Pular uma tarefa quebra as tarefas seguintes.

```
Tarefa 1: Instalar Vitest
  ↓ (pré-requisito para tudo)
Tarefa 2: Converter ads_manager.test.ts ←→ Tarefa 3: Converter level_manager.test.ts
  ↓ (paralelo possível, mas evite para coder econômico)  ↓
  ↓                                                       ↓
  └──────────────┬────────────────────────────────────────┘
                 ↓
Tarefa 4: Criar tests SkillManager
                 ↓
Tarefa 5: Validar cobertura + documentar lacunas
```

| Sequência | Tarefa | Depende de | Pode paralelizar |
|---|---|---|---|
| 1 | Instalar Vitest | Nada | Não |
| 2 | Converter ads_manager.test.ts | Tarefa 1 | Com tarefa 3 (recomendado NÃO) |
| 3 | Converter level_manager.test.ts | Tarefa 1 | Com tarefa 2 (recomendado NÃO) |
| 4 | Criar tests SkillManager | Tarefas 2, 3 | Não |
| 5 | Validar cobertura + documentar | Tarefa 4 | Não |

**Checkpoints recomendados:**

1. **Commit após Tarefa 1** — `chore: install vitest and configure test script`
2. **Commit após Tarefa 2** — `test: convert ads_manager tests to Vitest format`
3. **Commit após Tarefa 3** — `test: convert level_manager tests to Vitest format`
4. **Commit após Tarefa 4** — `test: add SkillManager tests`
5. **Commit após Tarefa 5** — `docs: add test coverage report for sprint 10`

Nunca acumular tarefas não commitadas. Cada commit deve ter apenas as alterações de UMA tarefa.

---

# Checklist final da sprint

- [ ] **lint executado** — `npm run lint` (placeholder, mas deve rodar sem erro)
- [ ] **typecheck executado** — `npm run typecheck` deve passar sem erros
- [ ] **build executado** — `npm run build` deve compilar sem erros
- [ ] **testes executados** — `npm test` reporta todos os testes passando (ads: 8 + level_manager: 4 + skills: >= 10 = >= 22 testes)
- [ ] **fluxo manual validado** — não aplicável (sem UI alterada)
- [ ] **responsividade validada** — não aplicável (sem UI alterada)
- [ ] **regressões verificadas** — `npm run build` e `npm run typecheck` confirmam que nada quebrou
- [ ] **arquivos alterados revisados**:
  - `package.json` — script test alterado, vitest adicionado
  - `src/ads/ads_manager.test.ts` — convertido para Vitest
  - `src/game/level_manager.test.ts` — convertido para Vitest
  - `src/game/skills.test.ts` — criado (novo)
  - `docs/test-coverage-sprint-10.md` — criado (novo)
- [ ] **escopo conferido contra a sprint original** — A sprint original pedia testes para `moveCreatures`, `checkVictory`, `SkillManager.isReady`, `ads_manager.shouldShowAd`, `progress.save/load`. Destes:
  - `moveCreatures` → NÃO EXISTE na codebase → documentado
  - `checkVictory` → NÃO EXISTE na codebase → documentado
  - `SkillManager.isReady` → método real é `estaDisponivel()` → testado na Tarefa 4
  - `ads_manager.shouldShowAd` → função real é `deveExibirAnuncio()` → já testada, convertida na Tarefa 2
  - `progress.save/load` → módulo NÃO EXISTE → documentado
- [ ] **nenhuma funcionalidade fora do escopo adicionada** — Verificado: nenhum módulo novo de produção foi criado
- [ ] **UI/UX Gate preenchido** — Todas as tarefas classificadas como `Não` para impacto UI/UX
- [ ] **`docs/design/UI_UX_GUIDE.md` seguido** — Não aplicável (sem impacto visual)

---

# Tarefas que NÃO devem ir para modelo econômico

| Tarefa | Motivo |
|---|---|
| **Tarefa 4 (SkillManager tests)** — testes de cooldown | Os testes de temporização exigem `vi.spyOn(Date, 'now')` ou `vi.useFakeTimers()`. Modelo econômico pode esquecer de mockar o tempo, gerando testes flaky que passam hoje mas quebram amanhã. **Modelo intermediário recomendado.** Se for usar modelo econômico, fornecer explícito no prompt o padrão de mock. |

Nenhuma outra tarefa envolve arquitetura, autenticação, autorização, banco de dados, pagamentos, segurança, performance, refatoração ampla, debugging complexo, fluxos críticos ou decisões sensíveis de UI/UX.

---

# Notas sobre a sprint original

A sprint original (`SPRINT_10_TESTES_BASICOS.md`) foi escrita presumindo funções que ainda não foram implementadas no código. Isso é um sinal de que o plano estava ligeiramente à frente da implementação. Recomenda-se para a sprint 11 (ou equivalente) criar os módulos faltantes:

| Função | Módulo provável | Prioridade |
|---|---|---|
| `moveCreatures` | `src/game/engine.ts` ou `src/game/movement.ts` | Alta — lógica central do jogo |
| `checkVictory` | `src/game/engine.ts` | Alta — necessária para vitória/derrota |
| `saveProgress` / `loadProgress` | `src/game/progress.ts` (com `localStorage`) | Média — necessária para progresso persistente |

Após a criação desses módulos, seus respectivos testes devem ser adicionados em uma sprint de testes subsequente (Sprint 11 ou Testes Avançados).
