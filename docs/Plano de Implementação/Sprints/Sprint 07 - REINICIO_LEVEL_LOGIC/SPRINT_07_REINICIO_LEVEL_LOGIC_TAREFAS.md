# arquivo: SPRINT_07_REINICIO_LEVEL_LOGIC_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 07 — REINICIO_LEVEL_LOGIC
- **objetivo da sprint original:** Implementar a lógica de reinício rápido do nível que recarrega o estado inicial do nível.
- **arquivo de origem:** `/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 07 - REINICIO_LEVEL_LOGIC/SPRINT_07_REINICIO_LEVEL_LOGIC.md`
- **resumo do escopo:** Criar `src/game/level_manager.ts` com função `restartLevel()` que restaura o estado do nível a partir de `LvlConfig` (criaturas, contador, timer, habilidades) e expõe evento de reinício para a UI escutar. Sem animações de transição, sem integração com save/load, sem alterações na UI.

## Análise da Sprint

### Objetivo da sprint

Criar a camada de lógica de reinício de nível que permite restaurar todo o estado de gameplay ao seu valor inicial definido por `LvlConfig`, sem alterar componentes visuais ou arquitetura existente.

### Impacto UI/UX da sprint

Classificação: **Indireto**.

Justificativa: A sprint não cria ou altera componentes visuais, textos de interface, telas ou fluxos de usuário. Ela implementa a lógica de reinício e expõe eventos que a UI consumirá no futuro (ex.: fechar modal de pausa, mostrar mensagem de "nível reiniciado"). Não há alteração visual direta.

As tarefas com classificação "Indireto" devem:
- ler `docs/design/UI_UX_GUIDE.md` para entender regras de estados de loading/erro e feedback;
- registrar quais informações o módulo lógico precisa expor para viabilizar o feedback visual futuro (ex.: evento de "nível reiniciado" com dados do estado inicial).

### Escopo identificado

- Criar diretório `src/game/` (se não existir) — provavelmente já existe da Sprint 06
- Criar arquivo `src/game/level_manager.ts`
- Implementar função ou classe `LevelManager` com método `restartLevel()`
- `restartLevel()` deve restaurar:
  - Estado das criaturas ao estado inicial definido por `LvlConfig`
  - Contador (ex.: criaturas salvas, criaturas restantes) ao valor inicial
  - Timer ao valor inicial definido pelo nível
  - Habilidades/skills ao estado inicial (todas disponíveis, sem cooldown)
- Expor evento de reinício (`onRestart` ou similar) que UI pode escutar
- O estado inicial é obtido a partir de `LvlConfig` (interface em `src/core/lvl_config.ts`)

### Fora do escopo

- Não criar animações de transição de tela
- Não integrar com save ou load (Sprint futura)
- Não conectar restartLevel a botão ou modal de UI
- Não modificar `src/ui/` (nenhum componente visual)
- Não modificar `src/core/` (interfaces de dados existentes — LvlConfig, Criatura, etc.)
- Não adicionar dependências externas
- Não configurar framework de testes (ainda não existe no projeto; criar apenas stub)
- Não alterar `src/game/skills.ts` (SkillManager existente — usar, não modificar)
- Não implementar sistema de timer real (setInterval/setTimeout) — usar timestamps ou callbacks

### Dependências entre partes

- Tarefa 3 (tipos) é pré-requisito para Tarefa 4 (LevelManager)
- Tarefa 4 depende de Tarefa 3
- Tarefa 5 (stub de teste) depende de Tarefa 4
- Tarefa 6 (validação) depende de todas as anteriores
- Tarefas 1 e 2 (leitura) podem ser executadas isoladamente, em paralelo

### Riscos principais

- Ausência de um game state manager consolidado no projeto — `level_manager.ts` precisará segurar estado que ainda não existe (criaturas ativas, timer rodando, contador), o que pode levar a acoplamento excessivo ou decisões de arquitetura prematuras.
- `skillManager` é singleton em `src/game/skills.ts` — reiniciar o nível requer resetar o estado das skills, mas o singleton não tem método `reset()`. Decisão de design necessária: (a) adicionar `reset()` ao SkillManager, (b) ou o LevelManager criar sua própria instância de SkillManager.
- `LvlConfig` atual é mínimo (id, nome, requisitosCriaturas, listaHabilidadesDisponiveis) — pode não ter campos suficientes para descrever o estado inicial completo (ex.: timer inicial, contagem de criaturas). Se faltarem campos, a tarefa deve sinalizar e não inventar.
- Sem testes automatizados reais — regressão só identificada manualmente.
- Evento de reinício mal projetado pode acoplar LevelManager à UI de forma rígida.

### Estratégia de quebra

Quebrar em 6 tarefas sequenciais, separando leitura (1,2), tipos (3), implementação (4), stub de teste (5) e validação (6):

1. **Mapeamento** — reconhecer codebase e confirmar caminhos, estado do `src/game/`, existência de `level_manager.ts`
2. **Leitura do guia** — extrair regras de feedback visual que o evento de reinício deve viabilizar
3. **Tipos e interfaces do LevelManager** — definir `LevelRuntimeState`, `LevelManagerConfig`, evento `RestartEvent`, contrato da classe/função
4. **Implementar LevelManager com restartLevel** — lógica principal de reinício, reset de estado, exposição de evento
5. **Criar stub de teste level_manager.test.ts** — arquivo placeholder com estrutura de teste vazia
6. **Validação final** — typecheck, build, verificação manual da lógica de restart

---

# Tarefas da Sprint

## Tarefa 1 — Mapear estado atual da codebase e caminhos disponíveis

### Objetivo

Inspecionar a codebase para verificar a estrutura atual de diretórios, confirmar se `src/game/` já existe (deve existir da Sprint 06), verificar o conteúdo de `LvlConfig`, `Criatura`, `skillManager` e `ProgressoJogador`, e confirmar que não há `level_manager.ts` ou gerenciamento de estado de nível existente.

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: A tarefa é apenas de levantamento — nenhum arquivo é alterado ou criado.

### Pré-requisitos

- Sprint 06 concluída (SkillManager implementado em `src/game/skills.ts`)
- Acesso ao repositório do projeto

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/skills.ts` (SkillManager, skillManager singleton)
- `/mnt/c/Dev/lemmings-style-game/src/core/lvl_config.ts` (LvlConfig)
- `/mnt/c/Dev/lemmings-style-game/src/core/criatura.ts` (Criatura)
- `/mnt/c/Dev/lemmings-style-game/src/core/progresso_jogador.ts` (ProgressoJogador)
- `/mnt/c/Dev/lemmings-style-game/src/core/index.ts`
- `/mnt/c/Dev/lemmings-style-game/package.json`
- `/mnt/c/Dev/lemmings-style-game/tsconfig.json`

### Passos

1. Navegar até a raiz do projeto
2. Verificar se o diretório `src/game/` existe e quais arquivos contém
3. Verificar se `src/game/level_manager.ts` já existe (não deve)
4. Ler `src/core/lvl_config.ts` e confirmar os campos exatos de `LvlConfig`
5. Ler `src/core/criatura.ts` e confirmar os campos de `Criatura`
6. Ler `src/core/progresso_jogador.ts` para entender dados persistentes existentes
7. Ler `src/game/skills.ts` e entender:
   - Como SkillManager funciona (construtor, métodos públicos)
   - Se `skillManager` singleton tem método de reset (não deve ter)
   - Se SkillManager pode ser instanciado múltiplas vezes
8. Executar `npx tsc --noEmit` para confirmar que o projeto compila sem erros
9. Executar `npm run build` para confirmar que o build funciona
10. Documentar brevemente o cenário encontrado
11. **Não alterar nenhum arquivo**

### Critérios de aceite

- Estado atual do `src/game/` documentado (arquivos existentes)
- `LvlConfig`, `Criatura`, SkillManager compreendidos
- Projeto compila sem erros (typecheck e build)
- Nenhum arquivo foi alterado

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npx tsc --noEmit 2>&1
npm run build 2>&1
```

### Riscos

- Se `src/game/` não existir, o coder precisará criá-lo (mas deve existir da Sprint 06)
- Se `skillManager` singleton não tiver método de reset, o LevelManager precisará criar sua própria instância ou adicionar método — anotar essa decisão para a Tarefa 4

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não instalar dependências

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inspecione a codebase para verificar se `src/game/` existe, se `src/game/level_manager.ts` NÃO existe, leia `src/core/lvl_config.ts` (LvlConfig), `src/core/criatura.ts` (Criatura), `src/game/skills.ts` (SkillManager). Verifique se o SkillManager singleton tem método reset (não deve ter). Execute `npx tsc --noEmit` e `npm run build` para confirmar compilação. Não altere nenhum arquivo.

---

## Tarefa 2 — Extrair regras do UI_UX_GUIDE.md para estados de loading e erro

### Objetivo

Ler `docs/design/UI_UX_GUIDE.md` e extrair regras de estados visuais (loading, erro, vazio) e feedback de ações (seção 6 — Estados obrigatórios, seção 5.1 — Botões) que informarão o que o evento de reinício precisa expor para a UI futura.

### Tipo da tarefa

documentação

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: A leitura do guia não altera a interface, mas fornece requisitos para o módulo lógico — por exemplo, se a UI futura precisa mostrar uma mensagem "Nível reiniciado" (estado de sucesso) e depois ocultá-la após alguns segundos, o evento precisa carregar dados suficientes para isso.

### Pré-requisitos

- Arquivo `docs/design/UI_UX_GUIDE.md` deve existir (confirmado que sim)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md`

### Passos

1. Ler as seções indicadas do guia:
   - Seção 6 — Estados obrigatórios (loading, vazio, erro, sucesso)
   - Seção 5.1 — Botões (estado disabled, estado loading, impedir clique duplicado)
   - Seção 8 — Microcopy (textos de feedback, mensagens claras)
   - Seção 10 — Padrões proibidos
2. Extrair requisitos para o módulo lógico de reinício:
   - O evento de reinício deve expor pelo menos: `{ tipo: 'restart', levelId: number, timestamp: number, sucesso: boolean }`
   - O evento deve permitir que a UI exiba um estado de transição (carregando) durante o restart, se necessário
   - O evento deve permitir que a UI exiba uma mensagem de sucesso ou erro após o restart
   - O texto associado ao evento deve ser objetivo e direto (seção 8 — Microcopy)
3. **Não alterar nenhum arquivo** — apenas documentar mentalmente para uso na Tarefa 4

### Critérios de aceite

- Regras extraídas cobrem o que o evento de reinício precisa expor para viabilizar feedback visual futuro
- O coder sabe quais dados o evento deve carregar (tipo, levelId, timestamp, sucesso)
- Nenhum arquivo foi alterado

### Como validar

```bash
cat /mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md
```

### Riscos

- Ignorar a regra "não usar cor como único indicador de estado" pode fazer o evento só carregar um booleano, insuficiente para UI acessível

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não copiar trechos do guia para outros arquivos

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: leia `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md` e extraia regras de estados visuais (seção 6), botões (5.1), microcopy (8) e padrões proibidos (10). Liste quais dados o evento de reinício precisa expor para viabilizar feedback visual futuro: tipo do evento, levelId, timestamp, status sucesso/erro. Não altere nenhum arquivo.

---

## Tarefa 3 — Criar tipos e interfaces do LevelManager

### Objetivo

Definir no arquivo `src/game/level_manager.ts` as interfaces de tipo necessárias para o estado de nível em runtime (`LevelRuntimeState`) e para o evento de reinício (`RestartEvent`), além do contrato (assinatura de método) da classe `LevelManager`. Sem lógica de reinício ainda — apenas tipos e contrato.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: **Não**.

Justificativa: Criação de tipos TypeScript puros — nenhum componente visual, texto de interface ou fluxo de usuário é alterado.

### Pré-requisitos

- Tarefa 1 concluída (LvlConfig, Criatura, SkillManager mapeados)
- Tarefa 2 concluída (requisitos de evento extraídos do UI_UX_GUIDE.md)
- Diretório `src/game/` deve existir (confirmado na Tarefa 1)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/level_manager.ts` (novo — criar se não existir)
- `/mnt/c/Dev/lemmings-style-game/src/core/lvl_config.ts` (importar LvlConfig)

### Passos

1. Criar o arquivo `src/game/level_manager.ts` (se não existir)
2. Importar `LvlConfig` de `../core/lvl_config` ou `../core`
3. Importar `Criatura` de `../core/criatura` ou `../core`
4. Importar `SkillState` de `../game/skills`
5. Definir a interface `LevelRuntimeState`:
   - `config: LvlConfig` — configuração original do nível (imutável)
   - `criaturas: Criatura[]` — criaturas ativas no nível
   - `timerRestanteMs: number` — tempo restante em milissegundos
   - `criaturasSalvas: number` — contador de criaturas salvas
   - `criaturasPerdidas: number` — contador de criaturas perdidas
   - `criaturasRestantes: number` — criaturas que ainda precisam ser salvas
   - `skillStates: SkillState[]` — estado atual das skills (no futuro, gerenciado pelo LevelManager ou referência ao SkillManager)
6. Definir a interface `RestartEvent`:
   - `tipo: 'restart'`
   - `levelId: number`
   - `timestamp: number`
   - `sucesso: boolean`
   - `mensagem?: string` — mensagem opcional (ex.: "Nível reiniciado")
7. Definir o contrato da classe `LevelManager` (apenas assinaturas, sem implementação):
   - `getState(): LevelRuntimeState`
   - `restartLevel(): void` — reinicia o estado do nível
   - `onRestart: (event: RestartEvent) => void` — callback de evento (ou método `subscribe`)
8. Exportar interfaces e classe (como declaração vazia ou classe abstrata de contrato)

### Critérios de aceite

- Interface `LevelRuntimeState` definida com todos os campos listados
- Interface `RestartEvent` definida com tipo, levelId, timestamp, sucesso
- Classe `LevelManager` declarada com as assinaturas de método
- Compilação TypeScript passa sem erros (mesmo com implementação vazia, se houver)
- Nenhum arquivo de UI foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
```

### Riscos

- `SkillState` está em `src/game/skills.ts` e importa-la pode criar dependência circular se `skills.ts` importar `level_manager.ts` no futuro — manter importação unidirecional (level_manager -> skills, não o contrário)
- `LevelRuntimeState` pode ser muito específica e precisar de ajustes conforme o jogo evolui — usar interface facilita extensão

### O que NÃO alterar

- Não modificar `src/core/` (LvlConfig, Criatura)
- Não modificar `src/game/skills.ts`
- Não modificar `src/ui/`
- Não adicionar lógica de implementação (apenas tipos e assinaturas)
- Não adicionar dependências externas

### Reversibilidade

Remover o arquivo `src/game/level_manager.ts`. Se o arquivo for removido, nenhum outro módulo depende dele ainda.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie `src/game/level_manager.ts` com as interfaces `LevelRuntimeState` (config: LvlConfig, criaturas: Criatura[], timerRestanteMs: number, criaturasSalvas: number, criaturasPerdidas: number, criaturasRestantes: number, skillStates: SkillState[]) e `RestartEvent` (tipo: 'restart', levelId, timestamp, sucesso, mensagem?). Declare a classe `LevelManager` vazia com assinaturas de métodos: getState(), restartLevel(), onRestart (ou subscribe). Importe LvlConfig, Criatura, SkillState dos módulos corretos em src/core/ e src/game/skills.ts. Valide com `npx tsc --noEmit`. Não implemente lógica — apenas tipos e contrato.

---

## Tarefa 4 — Implementar LevelManager com restartLevel e sistema de eventos

### Objetivo

Implementar na classe `LevelManager` em `src/game/level_manager.ts` a lógica completa de reinício de nível: segurar o estado runtime do nível, fornecer método `restartLevel()` que restaura todas as variáveis ao estado inicial a partir de `LvlConfig`, e expor um sistema de eventos (`subscribe`/`unsubscribe` ou callback) que dispara quando o nível é reiniciado.

### Tipo da tarefa

lógica de negócio

### Impacto UI/UX

Classificação: **Não**.

Justificativa: Implementação de lógica pura (manipulação de estado, reset de dados, emissão de eventos) — nenhum componente visual, texto de interface ou fluxo de usuário é alterado. O evento exposto será consumido pela UI em Sprint futura.

### Pré-requisitos

- Tarefa 3 concluída (tipos LevelRuntimeState, RestartEvent e contrato LevelManager definidos)
- Arquivo `src/game/level_manager.ts` existe com as interfaces

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/level_manager.ts` (implementar classe)
- `/mnt/c/Dev/lemmings-style-game/src/game/skills.ts` (SkillManager — instanciar ou usar singleton)

### Passos

1. Abrir `src/game/level_manager.ts` e implementar a classe `LevelManager`:
   - Construtor recebe `LvlConfig`
   - Inicializa `LevelRuntimeState`:
     - `config` = LvlConfig recebido
     - `criaturas` = array vazio (ou gerado a partir de LvlConfig.requisitosCriaturas se aplicável)
     - `timerRestanteMs` = valor inicial (hipótese: 120000ms = 2 minutos; confirmar com a codebase)
     - `criaturasSalvas` = 0
     - `criaturasPerdidas` = 0
     - `criaturasRestantes` = LvlConfig.requisitosCriaturas.length (se aplicável) ou valor inicial
     - `skillStates` = array de SkillState com todas disponíveis (criado a partir de SKILL_DEFINITIONS ou SkillManager)
   - Implementar `getState(): LevelRuntimeState` — retorna o estado atual
   - Implementar `restartLevel(): void`:
     - **HIPÓTESE**: O LevelManager usa sua própria instância de SkillManager (não o singleton) para evitar contaminação entre níveis. Criar `new SkillManager(SKILL_DEFINITIONS)` e extrair SkillState[].
     - Resetar `criaturas` ao estado inicial (vazio ou gerado de LvlConfig.requisitosCriaturas)
     - Resetar `timerRestanteMs` ao valor inicial
     - Resetar `criaturasSalvas`, `criaturasPerdidas`, `criaturasRestantes`
     - Resetar `skillStates` para todas disponíveis
     - Disparar evento de reinício
   - Implementar sistema de eventos:
     - Propriedade privada `callbacks: Set<(event: RestartEvent) => void>`
     - Método `subscribe(callback: (event: RestartEvent) => void): () => void` — adiciona callback, retorna função unsubscribe
     - Método privado `notificar()` — cria RestartEvent com timestamp atual e chama todos os callbacks
2. Criar uma instância exportada se houver necessidade de singleton, ou manter como classe instanciável
3. Validar que o módulo não importa nada de React ou UI
4. Validar que `restartLevel()` pode ser chamado múltiplas vezes e sempre volta ao mesmo estado inicial

### Decisão de design (documentar como comentário)

- **Uso do SkillManager**: O LevelManager DEVE usar sua própria instância de SkillManager (não o singleton de `skills.ts`) para garantir que cada nível tenha seu próprio estado de skills independente e que restartLevel possa criar uma instância nova sem afetar outros níveis. Se o singleton for usado, restartLevel precisaria de um método `reset()` que não existe.

### Critérios de aceite

- `LevelManager` é instanciável com `new LevelManager(lvlConfig)`
- `getState()` retorna o estado inicial antes de qualquer restart
- `restartLevel()` reseta todos os campos ao estado inicial
- `restartLevel()` pode ser chamado múltiplas vezes — resultado sempre idêntico
- Evento de reinício é disparado com `tipo: 'restart'`, `levelId` correto, `timestamp` real, `sucesso: true`
- Sistema de inscrição: `subscribe` adiciona callback, retorno cancela inscrição
- Compilação TypeScript passa sem erros
- Nenhum arquivo de UI foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Validação manual da lógica via terminal (Node.js inline):
1. Instanciar LevelManager com um LvlConfig mock
2. Chamar `getState()` e verificar valores iniciais
3. Modificar estado (simular mudanças de gameplay)
4. Chamar `restartLevel()`
5. Verificar que `getState()` retornou aos valores iniciais
6. Verificar que callback subscribe foi chamado com RestartEvent correto
7. Chamar restartLevel() novamente e verificar que estado é sempre o mesmo

### Riscos

- **Decisão de arquitetura**: Se o LevelManager usar o singleton `skillManager`, restartLevel não conseguirá resetar as skills sem modificar `skills.ts`. A decisão de criar uma instância própria de SkillManager é a mais segura, mas deve ser validada contra a codebase real.
- Falta de definição clara de "estado inicial" para timer e contagem de criaturas — `LvlConfig` atual pode não ter campos como `timerInicialMs` ou `totalCriaturas`. Se isso acontecer, usar valores padrão (hipótese) e documentar.
- O evento de reinício dispara síncrono dentro de `restartLevel()` — garantir que isso não cause efeitos colaterais inesperados se a UI estiver escutando.
- Múltiplas chamadas a `restartLevel()` seguidas podem gerar eventos em excesso.

### O que NÃO alterar

- Não modificar `src/core/` (LvlConfig, Criatura)
- Não modificar `src/game/skills.ts` (SkillManager existente)
- Não modificar `src/ui/` (nenhum componente visual)
- Não adicionar dependências externas
- Não usar setTimeout/setInterval — estado é puramente computacional
- Não conectar a UI (botões, telas, modais)

### Reversibilidade

Reverter implementação no `level_manager.ts` para o estado da Tarefa 3 (apenas tipos e contrato vazio). Ou remover o arquivo se nenhum outro módulo depender dele.

### Modelo recomendado

modelo intermediário recomendado

Justificativa: Envolve decisão de design (SkillManager singleton vs instância própria), acoplamento entre módulos de game logic, e definição de estado runtime que não existia antes. Modelo econômico pode tomar decisão subótima.

### Prompt de execução para o coder

Execute apenas esta tarefa: implemente a classe `LevelManager` em `src/game/level_manager.ts`. Construtor recebe `LvlConfig` e inicializa `LevelRuntimeState` (criaturas vazio, timer 120000ms, contadores zero, skills todas disponíveis via nova instância de SkillManager). Métodos: `getState()` retorna estado atual, `restartLevel()` reseta todos os campos ao estado inicial e dispara evento, `subscribe(callback)` retorna unsubscribe. Crie UMA instância PRÓPRIA de SkillManager (NÃO use o singleton de `skills.ts`) para que restartLevel possa criar uma nova sem modificar skills.ts. Não importe React/UI. Valide com `npx tsc --noEmit`.

---

## Tarefa 5 — Criar stub de teste level_manager.test.ts

### Objetivo

Criar o arquivo `src/game/level_manager.test.ts` como stub/placeholder para testes futuros do LevelManager. Sem framework de testes configurado, o arquivo deve conter a estrutura de teste comentada ou com funções placeholder que serão preenchidas quando um framework for adicionado.

### Tipo da tarefa

testes

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Criação de stub de teste — nenhum impacto em interface de usuário.

### Pré-requisitos

- Tarefa 4 concluída (LevelManager implementado)
- Arquivo `src/game/level_manager.ts` existe com implementação completa

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/level_manager.test.ts` (novo)
- `/mnt/c/Dev/lemmings-style-game/src/game/level_manager.ts` (referência)

### Passos

1. Criar o arquivo `src/game/level_manager.test.ts`
2. Incluir comentário de cabeçalho explicando que é um placeholder
3. Importar `LevelManager`, `LevelRuntimeState`, `RestartEvent` de `./level_manager`
4. Importar `LvlConfig` de `../core/lvl_config` (ou `../core`)
5. Criar bloco de teste placeholder (TS comentado ou funções exportadas vazias):
   - `testLevelManagerInstantiation` — verifica que LevelManager é instanciável
   - `testRestartLevelResetsState` — verifica que restartLevel reseta estado
   - `testRestartEventIsEmitted` — verifica que evento é disparado
   - `testMultipleRestarts` — verifica consistência após múltiplos restarts
6. Exportar as funções de teste (para uso futuro por test runner)
7. **Não executar testes** — o projeto não tem test runner configurado

### Critérios de aceite

- Arquivo `src/game/level_manager.test.ts` criado com imports corretos
- Estrutura de teste placeholders com funções exportadas
- Compilação TypeScript passa sem erros
- Nenhum arquivo funcional alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
```

### Riscos

- Se os imports estiverem incorretos, o typecheck vai falhar
- O stub pode ficar desatualizado conforme a implementação evolui — mas é placeholder, será reescrito quando houver test runner

### O que NÃO alterar

- Não modificar `level_manager.ts`
- Não modificar `src/core/`, `src/ui/`, `src/game/skills.ts`
- Não adicionar dependências de teste (vitest, jest, etc.)
- Não tentar executar testes

### Reversibilidade

Remover o arquivo `src/game/level_manager.test.ts`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie `src/game/level_manager.test.ts` como stub placeholder. Importe `LevelManager`, `LevelRuntimeState`, `RestartEvent` de `./level_manager` e `LvlConfig` de `../core/lvl_config`. Crie funções exportadas: `testLevelManagerInstantiation`, `testRestartLevelResetsState`, `testRestartEventIsEmitted`, `testMultipleRestarts` — cada uma com corpo vazio e comentário descrevendo o que testar. Não adicione test runner ou execute testes. Valide com `npx tsc --noEmit`.

---

## Tarefa 6 — Validar compilação e lógica do LevelManager

### Objetivo

Executar a validação completa da sprint: compilação TypeScript, build e validação manual da lógica de reinício para garantir que o LevelManager funciona corretamente e o estado é restaurado fielmente ao inicial.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Tarefa de validação técnica — nenhum arquivo é alterado.

### Pré-requisitos

- Todas as tarefas 1 a 5 concluídas
- LevelManager implementado e exportado
- level_manager.test.ts stub criado

### Arquivos prováveis

- `src/game/level_manager.ts`
- `src/game/level_manager.test.ts`

### Passos

1. Executar `npx tsc --noEmit` — verificar zero erros
2. Executar `npm run lint` — verificar sem novos erros (placeholder, aceitar)
3. Executar `npm run build` — verificar build bem-sucedido
4. Validação manual da lógica via terminal (Node.js inline):
   - Criar um `LvlConfig` mock:
     ```js
     const configMock = {
       id: 1,
       nome: 'Nível Teste',
       requisitosCriaturas: ['criatura1', 'criatura2'],
       listaHabilidadesDisponiveis: ['escavar', 'construir', 'bloquear', 'empurrar'],
     };
     ```
   - Instanciar `LevelManager` com o mock
   - Verificar estado inicial:
     - `getState().criaturas` é array vazio (ou conforme lógica)
     - `getState().criaturasSalvas` é 0
     - `getState().timerRestanteMs` é o valor inicial
     - `getState().skillStates` tem 4 skills, todas disponíveis
   - Simular mudanças:
     - Modificar estado diretamente ou via método setter (se existir)
   - Chamar `restartLevel()`
   - Verificar que estado voltou ao inicial
   - Verificar que callback subscribe foi chamado
   - Chamar `restartLevel()` novamente e verificar consistência
5. Confirmar que nenhum arquivo fora de `src/game/` foi alterado

### Critérios de aceite

- `npx tsc --noEmit` → zero erros
- `npm run build` → build bem-sucedido
- Teste manual confirma:
  - Estado inicial correto
  - `restartLevel()` restaura estado ao inicial
  - Múltiplos restarts produzem estado idêntico
  - Evento de reinício dispara com dados corretos
- Nenhum arquivo fora de `src/game/` foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
npm run lint 2>&1
npm run build 2>&1
```

Para validação manual da lógica, executar script Node.js que testa o fluxo completo de restart.

### Riscos

- Se o LevelManager depender de algo não mockado no teste manual (ex.: import de módulo que falha fora do ambiente Vite), o teste pode não executar. Nesse caso, confiar no typecheck + build.
- `npm run lint` é placeholder — não valida qualidade real

### O que NÃO alterar

- Não alterar nenhum arquivo durante a validação
- Não corrigir problemas não relacionados ao escopo da sprint
- Não adicionar novos recursos durante a validação
- Não modificar `src/ui/` em hipótese alguma

### Reversibilidade

Tarefa de validação apenas — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide a sprint completa. Execute `npx tsc --noEmit`, `npm run build`, e validação manual com Node inline: crie LvlConfig mock, instancie LevelManager, verifique estado inicial, modifique estado, chame restartLevel() e confira que tudo voltou ao inicial, verifique evento disparado, teste múltiplos restarts. Não altere nenhum arquivo.

---

# Ordem recomendada de execução

1. **Tarefa 1 — Mapeamento** (primeira, sem dependências)
2. **Tarefa 2 — Leitura UI_UX_GUIDE** (pode executar em paralelo com Tarefa 1)
3. **Tarefa 3 — Tipos/interfaces** (depende de 1 e 2)
4. **Tarefa 4 — Implementar LevelManager** (depende de 3)
5. **Tarefa 5 — Stub de teste** (depende de 4)
6. **Tarefa 6 — Validação final** (depende de todas)

**Checkpoints recomendados:**
- **Commit após Tarefa 3** — tipos e contrato definidos, sem lógica. Ponto seguro para revisão.
- **Commit após Tarefa 4** — implementação completa. Revisão de design (SkillManager, estado inicial).
- **Commit após Tarefa 5** — stub de teste adicionado.
- **Commit final após Tarefa 6** — validação aprovada.

**Auditoria:**
- Após Tarefa 3: revisar se as interfaces cobrem todos os campos que restartLevel precisa restaurar.
- Após Tarefa 4: validar decisão de design (SkillManager instância própria vs singleton) com o usuário antes de prosseguir.
- UI/UX Gate: aplicar somente quando o evento de reinício for consumido pela UI (Sprint futura). Nesta sprint, apenas garantir que o evento expõe dados suficientes.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` executado com zero erros
- [ ] `npm run lint` executado
- [ ] `npm run build` executado com sucesso
- [ ] Validação manual da lógica executada (restartLevel restaura estado, evento dispara)
- [ ] Nenhum arquivo fora de `src/game/` foi alterado
- [ ] Nenhum arquivo de `src/ui/` foi alterado
- [ ] Nenhum arquivo de `src/core/` foi alterado
- [ ] `src/game/skills.ts` não foi modificado
- [ ] Escopo conferido contra a sprint original (apenas restartLevel + evento)
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas (T1: Não aplicável, T2: Indireto, T3: Não, T4: Não, T5: Não aplicável, T6: Não aplicável)
- [ ] `docs/design/UI_UX_GUIDE.md` lido na Tarefa 2 conforme impacto indireto

---

# Tarefas que NÃO devem ir para modelo econômico

| Tarefa | Motivo |
|--------|--------|
| **Tarefa 4 — Implementar LevelManager com restartLevel** | Envolve decisão de design arquitetural (SkillManager singleton vs instância própria), acoplamento entre módulos de game logic, definição de estado runtime que não existia antes, e exposição de sistema de eventos. Modelo econômico pode tomar decisão subótima que gere retrabalho. **Modelo intermediário recomendado.** |

---

# Sprint original

A sprint original está em:
`/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 07 - REINICIO_LEVEL_LOGIC/SPRINT_07_REINICIO_LEVEL_LOGIC.md`
