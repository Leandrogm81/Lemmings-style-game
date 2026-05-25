# arquivo: SPRINT_06_SKILL_COOLDOWN_IMPLEMENT_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 06 — SKILL_COOLDOWN_IMPLEMENT
- **objetivo da sprint original:** Implementar o sistema de skills com cooldown visual que impede uso simultâneo e seguir as regras de UI_UX_GUIDE.
- **arquivo de origem:** `/mnt/c/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 06 - SKILL_COOLDOWN_IMPLEMENT/SPRINT_06_SKILL_COOLDOWN_IMPLEMENT.md`
- **resumo do escopo:** Criar módulo `src/game/skills.ts` com lógica de gerenciamento de skills (estado, cooldown, prevenção de uso simultâneo) e expor funções para iniciar skill, verificar disponibilidade e atualizar temporizador. Sem conectar à UI. Sem criar interface visual de cooldown.

## Análise da Sprint

### Objetivo da sprint

Criar a camada de lógica de skills (cooldown, disponibilidade, estado) que será consumida futuramente pelos botões da HUD — sem implementar UI ou integrar com componentes visuais.

### Impacto UI/UX da sprint

Classificação: **Indireto**.

Justificativa: A sprint não cria ou altera componentes visuais, textos de interface, telas ou fluxos de usuário. O módulo de lógica será consumido futuramente pelos botões de habilidade para exibir cooldown visual, mas nesta sprint não há alteração de UI.

As tarefas com classificação "Indireto" devem:
- ler `docs/design/UI_UX_GUIDE.md` para entender regras de feedback visual (seção 5.1 — Botões, seção 10 — Padrões proibidos);
- registrar quais informações o módulo lógico precisa expor para viabilizar o feedback visual futuro (ex.: porcentagem de cooldown restante, estado disponível/indisponível).

### Escopo identificado

- Criar diretório `src/game/` (se não existir)
- Criar tipos de dados para SkillDefinition, SkillState
- Criar módulo SkillManager (classe ou módulo de funções) com:
  - Estado de cada skill (disponível/em cooldown)
  - Tempo de cooldown configurável por skill
  - Função `iniciarSkill(skillId)` — marca skill como em uso, retorna false se estiver em cooldown
  - Função `atualizarTimers(timestampMs)` — atualiza cooldowns restantes
  - Função `getEstado(skillId)` — retorna estado atual da skill
  - Função `getTodosEstados()` — retorna array com todas as skills
  - Função `estaDisponivel(skillId)` — verifica disponibilidade
  - Sistema de inscrição/evento para notificar UI quando cooldown terminar
- Usar ms (milissegundos) como unidade de tempo interna

### Fora do escopo

- Não criar UI de cooldown (overlay visual, anel, timer na tela)
- Não conectar aos componentes SkillButton ou HUD
- Não modificar `src/ui/` (nenhum componente visual)
- Não modificar `src/core/` (interfaces de dados existentes)
- Não adicionar dependências externas
- Não implementar sistema de salvamento de estado de skills
- Não integrar com lógica de níveis ou criaturas
- Não criar sistema de inventário/quantidade limitada de skills (apenas cooldown)
- Não configurar framework de testes (ainda não existe no projeto)

### Dependências entre partes

- Tarefa 3 (tipos) é pré-requisito para Tarefa 4 (SkillManager)
- Tarefa 4 depende de Tarefa 3
- Tarefa 1 e 2 (leitura) podem ser executadas isoladamente, em paralelo
- Tarefa 5 depende de todas as anteriores

### Riscos principais

- Lógica de cooldown com temporizador pode ter comportamento inesperado se depender de `requestAnimationFrame` ou `setInterval` — a sprint usa timestamps baseados em `Date.now()` ou parâmetro explícito, sem timer real.
- Erro no cálculo de cooldown pode deixar skill permanentemente indisponível ou sempre disponível
- Sistema de eventos pode ter memory leak se inscrições não forem gerenciadas
- Ausência de testes automatizados (não configurados no projeto) pode permitir regressão

### Estratégia de quebra

Quebrar em 5 tarefas sequenciais, separando tipos/infra (Tarefa 3) da lógica de negócio (Tarefa 4):

1. **Mapeamento** — reconhecer codebase e confirmar caminhos
2. **Leitura do guia** — extrair regras de feedback visual para cooldown
3. **Tipos e constantes** — definir interfaces SkillDefinition, SkillState e array de skills
4. **SkillManager** — implementar classe/módulo com lógica completa de cooldown
5. **Validação final** — typecheck, build, verificação manual da lógica

---

# Tarefas da Sprint

## Tarefa 1 — Mapear estado atual da codebase e caminhos disponíveis

### Objetivo

Inspecionar a codebase para verificar a estrutura atual de diretórios, especialmente se `src/game/` existe, quais tipos estão em `src/core/`, e confirmar que os arquivos da Sprint 05 foram criados corretamente (pois a Sprint 06 depende dos nomes de skills definidos na HUD).

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: A tarefa é apenas de levantamento — nenhum arquivo é alterado ou criado.

### Pré-requisitos

- Sprint 05 concluída (HUD, TimerBar, SkillButton criados)
- Acesso ao repositório do projeto

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/ui/SkillButton.tsx` (confirmar nomes de skills usados)
- `/mnt/c/Dev/lemmings-style-game/src/core/index.ts`
- `/mnt/c/Dev/lemmings-style-game/src/core/criatura.ts`
- `/mnt/c/Dev/lemmings-style-game/package.json`
- `/mnt/c/Dev/lemmings-style-game/tsconfig.json`

### Passos

1. Navegar até a raiz do projeto
2. Verificar se o diretório `src/game/` já existe (não deve existir ainda)
3. Ler `src/ui/SkillButton.tsx` e confirmar os nomes exatos das skills usadas na HUD (Escavar, Construir, Bloquear, Empurrar)
4. Verificar se há algum tipo de skill já definido em `src/core/`
5. Executar `npx tsc --noEmit` para confirmar que o projeto compila sem erros
6. Executar `npm run build` para confirmar que o build funciona
7. Documentar brevemente o cenário encontrado
8. **Não alterar nenhum arquivo**

### Critérios de aceite

- Nomes das skills confirmados na HUD (SkillButton/HUD.tsx)
- Projeto compila sem erros (typecheck e build)
- Nenhum arquivo foi alterado

### Como validar

```bash
cd /mnt/c/Dev/lemmings-style-game
npx tsc --noEmit 2>&1
npm run build 2>&1
```

### Riscos

- Se os nomes das skills na HUD não baterem com os definidos nesta sprint, haverá inconsistência futura

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não instalar dependências

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inspecione a codebase para confirmar que `src/game/` NÃO existe, que os nomes de skills em `src/ui/SkillButton.tsx` são (Escavar, Construir, Bloquear, Empurrar) e que nenhum tipo de skill está definido em `src/core/`. Execute `npx tsc --noEmit` e `npm run build` para confirmar que o projeto compila. Não altere nenhum arquivo.

---

## Tarefa 2 — Extrair regras do UI_UX_GUIDE.md para feedback visual de cooldown

### Objetivo

Ler `docs/design/UI_UX_GUIDE.md` e extrair regras de feedback visual, especialmente as seções de botões (5.1), cores (4.2) e padrões proibidos (10) que informarão o que o módulo de lógica precisa expor para viabilizar o cooldown visual no futuro.

### Tipo da tarefa

documentação

### Impacto UI/UX

Classificação: **Indireto**.

Justificativa: A leitura do guia não altera a interface, mas fornece requisitos para o módulo lógico — por exemplo, se a UI futura precisa de `porcentagemCooldown` (0–100) para exibir um anel de progresso, o módulo deve expor esse dado.

### Pré-requisitos

- Arquivo `docs/design/UI_UX_GUIDE.md` deve existir

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md`

### Passos

1. Ler as seções indicadas do guia:
   - 5.1 Botões (estado disabled, estado loading, impedir clique duplicado)
   - 4.2 Cores (não usar cor como único indicador de estado)
   - 10 Padrões proibidos
2. Extrair requisitos para o módulo lógico:
   - O módulo deve expor um valor numérico (ex.: `cooldownRestanteMs` ou `porcentagemCooldown`) para que a UI possa exibir progresso visual
   - O módulo deve expor um booleano `disponivel` para que a UI possa desabilitar o botão
   - Deve haver um evento/callback disparado quando `disponivel` mudar de `false` para `true` (fim do cooldown)
3. **Não alterar nenhum arquivo** — apenas documentar mentalmente para uso na Tarefa 4

### Critérios de aceite

- As regras extraídas cobrem o que o módulo lógico precisa expor para viabilizar feedback visual
- O coder sabe quais dados o SkillManager deve fornecer (porcentagem, disponível, evento de término)
- Nenhum arquivo foi alterado

### Como validar

```bash
cat /mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md
```

### Riscos

- Ignorar a regra "não usar cor como único indicador de estado" pode levar a uma UI que depende só de cor para cooldown — o módulo deve expor dados suficientes para indicadores alternativos (opacidade, texto, ícone)

### O que NÃO alterar

- Não alterar nenhum arquivo
- Não copiar trechos do guia para outros arquivos

### Reversibilidade

Tarefa apenas de leitura — não há o que reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: leia `/mnt/c/Dev/lemmings-style-game/docs/design/UI_UX_GUIDE.md` e extraia as regras de feedback visual para botões (seção 5.1), cores (4.2) e padrões proibidos (10). Liste quais dados o módulo SkillManager precisa expor para que a UI futura possa exibir cooldown visual: porcentagem restante, booleano disponível, evento de término. Não altere nenhum arquivo.

---

## Tarefa 3 — Criar tipos de Skill e constantes

### Objetivo

Definir as interfaces `SkillDefinition` e `SkillState` e o array estático de skills (Escavar, Construir, Bloquear, Empurrar) no módulo `src/game/skills.ts`. Sem lógica de cooldown ainda — apenas tipos e dados.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: **Não**.

Justificativa: Criação de tipos TypeScript puros e dados estáticos — nenhum componente visual, texto de interface ou fluxo de usuário é alterado.

### Pré-requisitos

- Tarefa 1 concluída (nomes das skills confirmados)
- Diretório `src/game/` precisa ser criado (não existe)

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/skills.ts` (novo — criar diretório `src/game/`)

### Passos

1. Criar o diretório `src/game/` (se não existir)
2. Criar o arquivo `src/game/skills.ts`
3. Definir a interface `SkillDefinition`:
   - `id: string` — identificador único (ex.: "escavar")
   - `nome: string` — nome exibível (ex.: "Escavar")
   - `duracaoCooldownMs: number` — duração do cooldown em milissegundos
4. Definir a interface `SkillState`:
   - `skillId: string`
   - `disponivel: boolean` — true se a skill pode ser usada
   - `cooldownRestanteMs: number` — 0 se disponível, > 0 se em cooldown
   - `ultimoUsoTimestamp: number | null` — timestamp do último uso, null se nunca usada
5. Criar array `SKILL_DEFINITIONS: SkillDefinition[]` com 4 skills:
   - `escavar` — cooldown 3000ms (3 segundos, valor ajustável)
   - `construir` — cooldown 5000ms
   - `bloquear` — cooldown 4000ms
   - `empurrar` — cooldown 3000ms
6. Exportar as interfaces e o array
7. Validar que o arquivo não importa nada de React ou UI

### Critérios de aceite

- Interface `SkillDefinition` definida com `id`, `nome`, `duracaoCooldownMs`
- Interface `SkillState` definida com `skillId`, `disponivel`, `cooldownRestanteMs`, `ultimoUsoTimestamp`
- Array `SKILL_DEFINITIONS` exportado com 4 itens
- Compilação TypeScript passa sem erros
- Nenhum arquivo de UI foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
```

### Riscos

- Valores de cooldown podem precisar de ajuste futuro — usar constantes facilita alteração
- Nomes ou IDs inconsistentes com os usados na HUD podem causar problemas de integração futura

### O que NÃO alterar

- Não modificar `src/core/`
- Não modificar `src/ui/`
- Não criar componentes visuais
- Não adicionar dependências externas
- Não adicionar lógica de cooldown ou estado mutável

### Reversibilidade

Remover o arquivo `src/game/skills.ts`. O diretório `src/game/` pode ficar vazio ou ser removido se não houver outros arquivos.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie o arquivo `src/game/skills.ts` com a interface `SkillDefinition` (id, nome, duracaoCooldownMs), `SkillState` (skillId, disponivel, cooldownRestanteMs, ultimoUsoTimestamp) e array `SKILL_DEFINITIONS` com 4 skills (escavar 3000ms, construir 5000ms, bloquear 4000ms, empurrar 3000ms). Crie o diretório `src/game/` se não existir. Valide com `npx tsc --noEmit`. Não crie lógica de cooldown, não importe React.

---

## Tarefa 4 — Implementar SkillManager com lógica de cooldown

### Objetivo

Implementar no mesmo arquivo `src/game/skills.ts` (ou em arquivo separado `src/game/SkillManager.ts`) a classe/funções que gerenciam o estado de cada skill, controlam cooldown, impedem uso durante cooldown e notificam quando uma skill fica disponível novamente.

### Tipo da tarefa

lógica de negócio

### Impacto UI/UX

Classificação: **Não**.

Justificativa: Implementação de lógica pura (cálculo de tempo, máquina de estados) — nenhum componente visual, texto de interface ou fluxo de usuário é alterado.

### Pré-requisitos

- Tarefa 3 concluída (tipos SkillDefinition e SkillState definidos)
- Arquivo `src/game/skills.ts` existe com as interfaces e array

### Arquivos prováveis

- `/mnt/c/Dev/lemmings-style-game/src/game/skills.ts` (adicionar lógica ao existente)
- ou `/mnt/c/Dev/lemmings-style-game/src/game/SkillManager.ts` (novo, separado)

### Passos

1. Decidir se a lógica fica em `skills.ts` (arquivo único) ou em `SkillManager.ts` (separado)
2. Criar (ou estender) o módulo com:
   - **Classe `SkillManager`** ou módulo de funções com estado interno
   - Construtor: inicializa `SkillState[]` a partir de `SKILL_DEFINITIONS`, todos com `disponivel: true`
   - **`iniciarSkill(skillId: string): boolean`**
     - Se skill não existir ou já estiver em cooldown, retorna `false`
     - Marca skill como indisponível, registra timestamp atual
     - Define `cooldownRestanteMs = duracaoCooldownMs`
     - Retorna `true`
   - **`atualizarTimers(agoraMs: number): void`**
     - Percorre todas as skills
     - Para cada skill em cooldown, calcula tempo decorrido desde `ultimoUsoTimestamp`
     - Atualiza `cooldownRestanteMs = Math.max(0, duracaoCooldownMs - decorridoMs)`
     - Se `cooldownRestanteMs` chegou a 0 e skill estava indisponível, marca como disponível
   - **`getEstado(skillId: string): SkillState | undefined`**
   - **`getTodosEstados(): SkillState[]`**
   - **`estaDisponivel(skillId: string): boolean`**
   - **`inscrever(skillId: string, callback: (state: SkillState) => void): () => void`**
     - Retorna função para cancelar inscrição (unsubscribe)
     - Callback é chamado quando o estado da skill muda (cooldown inicia ou termina)
3. Exportar a classe (ou fábrica de instância) e as funções necessárias
4. Criar uma instância singleton exportada para uso global no jogo (ex.: `export const skillManager = new SkillManager()`)

### Critérios de aceite

- `SkillManager` é instanciável e inicializa 4 skills disponíveis
- `iniciarSkill('escavar')` retorna `true` na primeira vez
- `iniciarSkill('escavar')` retorna `false` imediatamente após (cooldown)
- Após chamar `atualizarTimers(agoraMs)` com tempo suficiente, a skill volta a ficar disponível
- `getEstado` retorna estado correto com cooldownRestanteMs calculado
- `inscrever` dispara callback quando estado muda
- Compilação TypeScript passa sem erros

### Como validar

```bash
npx tsc --noEmit 2>&1
```

Validação manual da lógica: criar um pequeno script de teste no terminal que:
1. Instancia SkillManager
2. Chama iniciarSkill('escavar') e verifica retorno true
3. Chama iniciarSkill('escavar') e verifica retorno false
4. Avança o tempo simulado e chama atualizarTimers
5. Verifica que cooldownRestanteMs diminuiu e skill volta a ficar disponível

### Riscos

- Cálculo incorreto de tempo decorrido pode levar a cooldowns infinitos ou instantâneos
- Singleton pode causar problemas de estado entre níveis/partidas se não for reiniciável
- Sistema de inscrição pode vazar memória se callbacks não forem removidos

### O que NÃO alterar

- Não modificar `src/ui/` (nenhum componente visual)
- Não modificar `src/core/`
- Não modificar `src/game/skills.ts` se criou arquivo separado (SkillManager.ts)
- Não adicionar timer real (setInterval, setTimeout) — usar timestamps passados por parâmetro
- Não adicionar dependências externas

### Reversibilidade

Remover a classe SkillManager do arquivo ou remover o arquivo SkillManager.ts. Se a lógica foi adicionada a skills.ts, reverter para o estado da Tarefa 3.

### Modelo recomendado

modelo econômico suficiente (lógica pura, sem UI, sem banco, sem autenticação)

### Prompt de execução para o coder

Execute apenas esta tarefa: implemente a classe `SkillManager` em `src/game/SkillManager.ts` (ou adicione a `src/game/skills.ts`). Deve gerenciar o estado de 4 skills, com métodos: `iniciarSkill(skillId)` (retorna boolean), `atualizarTimers(agoraMs)` (atualiza cooldowns), `getEstado(skillId)`, `getTodosEstados()`, `estaDisponivel(skillId)`, `inscrever(skillId, callback)`. Use `SKILL_DEFINITIONS` como base. Crie um singleton exportado. Não use setTimeout/setInterval — use timestamps recebidos por parâmetro. Valide com `npx tsc --noEmit`.

---

## Tarefa 5 — Validar compilação e lógica do SkillManager

### Objetivo

Executar a validação completa da sprint: compilação TypeScript, build e validação manual da lógica de cooldown para garantir que o SkillManager funciona corretamente.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: **Não aplicável**.

Justificativa: Tarefa de validação técnica — nenhum arquivo é alterado.

### Pré-requisitos

- Todas as tarefas 1 a 4 concluídas
- SkillManager implementado e exportado

### Arquivos prováveis

- `src/game/SkillManager.ts` e/ou `src/game/skills.ts`

### Passos

1. Executar `npx tsc --noEmit` — verificar zero erros
2. Executar `npm run lint` — verificar sem novos erros (placeholder, aceitar)
3. Executar `npm run build` — verificar build bem-sucedido
4. Validação manual da lógica via terminal:
   - Criar script inline com Node.js que importa o SkillManager e testa:
     - Instancia o gerenciador
     - Chama `iniciarSkill('escavar')` → espera `true`
     - Chama `iniciarSkill('escavar')` imediatamente depois → espera `false`
     - Chama `atualizarTimers(Date.now() + 4000)` para simular 4s → `escavar` deve ficar disponível
     - Verifica `getEstado('escavar').disponivel === true`
     - Verifica `getEstado('escavar').cooldownRestanteMs === 0`
   - Se houver sistema de inscrição, testar se callback é chamado
5. Confirmar que nenhum arquivo fora de `src/game/` foi alterado

### Critérios de aceite

- `npx tsc --noEmit` → zero erros
- `npm run build` → build bem-sucedido
- Teste manual confirma que:
  - Skill inicia disponível
  - Uso bloqueia skill (retorna false se tentar usar de novo)
  - Após cooldown, skill volta a ficar disponível
  - `cooldownRestanteMs` é atualizado corretamente
- Nenhum arquivo fora de `src/game/` foi alterado

### Como validar

```bash
npx tsc --noEmit 2>&1
npm run lint 2>&1
npm run build 2>&1
```

Para validação manual da lógica, executar script Node.js que testa o fluxo de cooldown.

### Riscos

- Se o cálculo de cooldown usar `Date.now()` internamente em vez do parâmetro `agoraMs`, o teste manual pode dar resultados inconsistentes
- Lint é placeholder — não valida qualidade real

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

Execute apenas esta tarefa: valide todo o sprint do sistema de cooldown. Rode `npx tsc --noEmit`, `npm run lint` e `npm run build`. Crie um script Node.js inline que testa: instancia SkillManager, usa skill (deve retornar true), usa novamente (deve retornar false), avança o tempo (deve ficar disponível de novo). Confirme que `cooldownRestanteMs` é calculado corretamente. Não modifique nenhum arquivo durante a validação.

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode ser isolada? | Checkpoint |
|-------|--------|-----------|-------------------|------------|
| 1 | Tarefa 1 (mapeamento) | — | Sim | Commit após Tarefa 1 |
| 2 | Tarefa 2 (leitura do guia) | — | Sim, paralelo à Tarefa 1 | Commit após Tarefa 2 |
| 3 | Tarefa 3 (tipos e constantes) | Tarefa 1 | Não (precisa confirmar nomes) | Commit após Tarefa 3 |
| 4 | Tarefa 4 (SkillManager) | Tarefa 3 | Não (precisa dos tipos) | Commit após Tarefa 4 |
| 5 | Tarefa 5 (validação) | Todas | Não | Commit final da sprint |

**Observações:**
- Tarefas 1 e 2 podem ser executadas em paralelo
- Tarefa 3 cria a base de tipos que Tarefa 4 consome
- A validação manual da lógica (Tarefa 5) é essencial para garantir que o cooldown funciona corretamente
- Não há verificação visual (sem UI) — a validação é puramente técnica
- Recomenda-se fazer commit após cada tarefa (diff pequeno e reversível)

# Checklist final da sprint

- [ ] Tarefa 1 — Mapeamento concluído e documentado
- [ ] Tarefa 2 — UI_UX_GUIDE.md lido e regras extraídas
- [ ] Tarefa 3 — Tipos SkillDefinition, SkillState e SKILL_DEFINITIONS criados em `src/game/skills.ts`
- [ ] Tarefa 4 — SkillManager implementado com lógica de cooldown
- [ ] Tarefa 5 — Validação completa:
  - [ ] `npx tsc --noEmit` passou
  - [ ] `npm run lint` passou (ou sem novos erros)
  - [ ] `npm run build` passou
  - [ ] SkillManager: iniciarSkill retorna true na primeira vez
  - [ ] SkillManager: iniciarSkill retorna false em cooldown
  - [ ] SkillManager: após tempo suficiente, skill volta a ficar disponível
  - [ ] SkillManager: cooldownRestanteMs calculado corretamente
  - [ ] Nenhum arquivo fora de `src/game/` alterado
  - [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas (Sim / Não / Indireto / Não aplicável)
- [ ] `docs/design/UI_UX_GUIDE.md` consultado (Tarefa 2) para entender requisitos de feedback visual

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint exige modelo mais forte. Todas são implementações de tipos TypeScript e lógica pura de negócio (máquina de estados, cálculo de tempo), sem UI, autenticação, banco de dados, pagamentos, segurança, refatoração ampla ou fluxos críticos com muitas dependências. Modelo econômico é suficiente para todas as tarefas.
