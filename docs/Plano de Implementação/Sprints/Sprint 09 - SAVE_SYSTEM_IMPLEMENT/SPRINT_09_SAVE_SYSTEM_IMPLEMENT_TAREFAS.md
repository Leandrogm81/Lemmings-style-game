# Sprint quebrada em tarefas menores

## Sprint de origem

- **nome da sprint original:** Sprint 09 — SAVE_SYSTEM_IMPLEMENT
- **objetivo da sprint original:** Implementar salvamento local do progresso (níveis desbloqueados, estrelas, tempo, tentativas) usando localStorage (web).
- **arquivo de origem:** `docs/Plano de Implementação/Sprints/Sprint 09 - SAVE_SYSTEM_IMPLEMENT/SPRINT_09_SAVE_SYSTEM_IMPLEMENT.md`
- **resumo do escopo:**
  - Criar módulo `src/storage/progress.ts` com funções `saveProgress(data)` e `loadProgress()`.
  - Persistir o objeto `ProgressoJogador` no localStorage.
  - Expor API pública para outras partes do código via barrel export.
  - Não alterar UI de salvamento (será chamada via gameplay futuramente).

## Análise da Sprint

### Objetivo da sprint

Criar um módulo de storage local (localStorage) que persista e recupere o progresso do jogador de forma tipada, segura e testável, sem introduzir UI.

### Impacto UI/UX da sprint

**Classificação:** `Indireto`

**Justificativa:** A sprint não cria telas, componentes ou textos de interface. O módulo de storage é puramente camada de dados. O impacto é indireto porque o formato da API e os tipos de retorno determinam como a UI futura consumirá os dados e exibirá estados (carregando, erro, vazio). As tarefas com impacto visual devem seguir:

`docs/design/UI_UX_GUIDE.md`

### Escopo identificado

- Módulo `src/storage/progress.ts` com `saveProgress` e `loadProgress`.
- Tipo de retorno tipado para operações de storage (sucesso/erro).
- Constante de chave do localStorage.
- Barrel export em `src/storage/index.ts`.
- Testes unitários do módulo de storage.
- Leitura e respeito ao `UI_UX_GUIDE.md` (indireto — mensagens de erro e estados).

### Fora do escopo

- UI de salvamento ou carregamento (telas, botões, indicadores visuais).
- Backup na nuvem ou qualquer sincronização remota.
- Tela de "carregar partida".
- Migração de dados entre versões.
- Criptografia dos dados salvos.
- Compressão do JSON armazenado.
- Backup automático ou versões de save.
- Instalação de framework de testes (se não existir, o coder deve instalar antes da Tarefa 6).

### Dependências entre partes

| Dependência | Explicação |
|---|---|
| Tarefa 1 → todas | Mapeamento da codebase e leitura do guia são pré-requisitos para decisões de implementação. |
| Tarefa 2 → Tarefas 3, 4 | Tipos de retorno e constantes precisam existir antes de implementar save/load. |
| Tarefas 3, 4 → Tarefa 5 | As funções precisam existir para serem exportadas no barrel. |
| Tarefas 3, 4, 5 → Tarefa 6 | Testes dependem das funções implementadas e exportadas. |

### Riscos principais

| Risco | Impacto | Mitigação |
|---|---|---|
| Serialização falha corrompe dados salvos | Médio | Try/catch com retorno de erro tipado. |
| Estrutura `ProgressoJogador` muda no futuro e dados antigos quebram | Médio | Validação na desserialização com fallback para null. |
| Testes sem framework instalado (vitest/outro) | Baixo | Instalar dependência de teste antes da Tarefa 6. |
| Chave de storage conflita com outro módulo | Baixo | Usar constante nomeada prefixada com o nome do jogo. |

### Estratégia de quebra

A sprint será dividida em 6 tarefas sequenciais, cada uma focada em uma camada:

1. **Leitura e mapeamento** — conhecer a codebase antes de escrever código.
2. **Tipos e constantes** — definir o contrato antes da implementação (tipo de resultado, chave de storage).
3. **Implementar saveProgress** — escrever apenas a função de salvamento.
4. **Implementar loadProgress** — escrever apenas a função de carregamento.
5. **Barrel export** — criar o ponto de entrada público do módulo.
6. **Testes unitários** — cobrir cenários normais e de borda.

Cada tarefa gera um diff pequeno e revisável. Nenhuma tarefa altera UI, arquitetura ou outros módulos existentes.

---

# Tarefas da Sprint

## Tarefa 1 — Leitura e mapeamento do código existente

### Objetivo

Ler a codebase relevante e o `UI_UX_GUIDE.md` para entender a estrutura de dados existente, o padrão de exports do projeto e as diretrizes visuais (impacto indireto) antes de implementar o módulo de storage.

### Tipo da tarefa

leitura/mapeamento

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** A tarefa é apenas de leitura de código e documentação. Nenhum arquivo é criado ou alterado. Não há impacto visual direto ou indireto.

### Pré-requisitos

Nenhum. Esta é a primeira tarefa.

### Arquivos prováveis

- `src/core/progresso_jogador.ts` — interface `ProgressoJogador`
- `src/core/index.ts` — barrel existente do core
- `src/core/lvl_config.ts` — para entender se `ProgressoJogador` referencia este tipo
- `src/game/level_manager.ts` — se precisar ver como o progresso é usado
- `docs/design/UI_UX_GUIDE.md` — guia de UI/UX (leitura obrigatória por impacto indireto)
- `package.json` — para confirmar scripts de lint, typecheck, build, test
- `tsconfig.json` — configuração de módulos e strict mode
- Estrutura de pastas em `src/` — para entender o padrão de organização

### Passos

1. Ler `src/core/progresso_jogador.ts` e anotar os campos da interface.
2. Ler `src/core/index.ts` para ver o padrão de barrel exports.
3. Ler `docs/design/UI_UX_GUIDE.md` na íntegra (seções de estados, erro, microcopy).
4. Ler `package.json` para confirmar scripts disponíveis.
5. Navegar pela estrutura `src/` para entender a organização de pastas.
6. Registrar observações: se há padrão de nomenclatura, se usa namespaces, se já existe pasta `storage/`.
7. Confirmar que o projeto é web-only (Vite) e não React Native, logo o storage será `localStorage`.
8. Finalizar com um resumo das descobertas antes de prosseguir.

### Critérios de aceite

- Todos os arquivos listados foram lidos e compreendidos.
- O tipo `ProgressoJogador` está mapeado com todos os seus campos.
- O padrão de exports do projeto foi identificado.
- O guia UI/UX foi lido e as seções relevantes identificadas.
- A estratégia de storage (localStorage, web-only) foi confirmada.
- Nenhum arquivo foi criado ou alterado.

### Como validar

- Não há comando de validação. O critério é a leitura completa dos arquivos.
- O coder deve relatar o que encontrou antes de avançar.

### Riscos

- Perder algum detalhe importante da interface `ProgressoJogador` que afete a serialização.
- Não ler o `UI_UX_GUIDE.md` por completo e perder diretrizes sobre mensagens de erro.

### O que NÃO alterar

Nenhum arquivo deve ser criado, modificado ou excluído nesta tarefa.

### Reversibilidade

Não se aplica — nenhuma alteração é feita.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 1 — Leitura e mapeamento do código existente.

Objetivo: Ler toda a codebase relevante antes de escrever qualquer código.

Passos obrigatórios:
1. Leia src/core/progresso_jogador.ts — anote todos os campos de ProgressoJogador.
2. Leia src/core/index.ts — veja o padrão de barrel exports (export type { ... } from '...').
3. Leia docs/design/UI_UX_GUIDE.md na íntegra — foque nas seções 6 (Estados obrigatórios), 8 (Microcopy) e 10 (Padrões proibidos).
4. Leia package.json — confirme scripts: lint, typecheck, build, test.
5. Leia tsconfig.json — confirme strict mode, moduleResolution, include/exclude.
6. Liste a estrutura de pastas dentro de src/ para entender a organização.
7. Confirme que o projeto é web-only (Vite, sem React Native) → storage será localStorage.

Regras:
- NÃO crie, altere ou exclua nenhum arquivo.
- NÃO avance para a Tarefa 2.
- Ao final, produza um resumo do que foi lido.

UI/UX Gate: esta tarefa não tem impacto UI/UX (apenas leitura).
```

---

## Tarefa 2 — Definir constantes e tipo de resultado do storage

### Objetivo

Criar o arquivo `src/storage/progress.ts` com a constante de chave do localStorage e o tipo de retorno tipado para as operações de save/load, antes de implementar as funções.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** A tarefa cria apenas tipos e constantes. Nenhum elemento visual, texto de interface ou estado de UI é introduzido.

### Pré-requisitos

- Tarefa 1 concluída (mapeamento da codebase concluído).

### Arquivos prováveis

- `src/storage/progress.ts` — **criar** (definições de tipos e constantes)
- `src/core/progresso_jogador.ts` — ler (já lido na Tarefa 1, usar como referência)

### Passos

1. Criar a pasta `src/storage/` se não existir.
2. Criar o arquivo `src/storage/progress.ts`.
3. Definir a constante `STORAGE_KEY` com o valor `'lemmings_progresso'` (prefixada com o nome do jogo para evitar conflitos).
4. Definir o tipo `StorageResult<T>` como união discriminada:
   - `{ sucesso: true; dados: T }` para operações bem-sucedidas.
   - `{ sucesso: false; erro: string }` para operações com falha.
5. Definir o tipo `SaveProgressResult` como `StorageResult<void>` (save não retorna dados).
6. Definir o tipo `LoadProgressResult` como `StorageResult<ProgressoJogador | null>` (load retorna null se não houver dados salvos).
7. Garantir que `ProgressoJogador` seja importado de `'../core/progresso_jogador'`.
8. Validar que os tipos compilam com `tsc --noEmit`.
9. **Não implementar `saveProgress` ou `loadProgress` ainda.**

### Critérios de aceite

- `STORAGE_KEY` é uma `const string` com valor prefixado (`'lemmings_progresso'`).
- `StorageResult<T>` é um tipo união discriminada (type guard funcionará com `if (result.sucesso)`).
- `SaveProgressResult` usa `StorageResult<void>`.
- `LoadProgressResult` usa `StorageResult<ProgressoJogador | null>`.
- `ProgressoJogador` é importado do módulo `../core/progresso_jogador`.
- O typecheck passa sem erros.
- Apenas tipos e constantes estão no arquivo — nenhuma função implementada.

### Como validar

```bash
# typecheck
npx tsc --noEmit
```

Se o comando não funcionar, confirmar no `package.json`:

```bash
npm run typecheck
```

### Riscos

- Nome da chave de storage muito genérico pode conflitar com outros módulos no futuro → usar prefixo.
- `StorageResult` muito genérico pode não atender casos de uso futuros → por enquanto é suficiente.

### O que NÃO alterar

- Não alterar `src/core/progresso_jogador.ts` ou `src/core/index.ts`.
- Não adicionar import de `localStorage` ainda.
- Não implementar `saveProgress` ou `loadProgress`.
- Não alterar nenhum outro arquivo existente.

### Reversibilidade

Excluir o arquivo `src/storage/progress.ts` e a pasta `src/storage/` se vazia. Como nenhum outro módulo importa deste arquivo ainda, a reversão é segura e sem efeitos colaterais.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 2 — Definir constantes e tipo de resultado do storage.

Objetivo: Criar src/storage/progress.ts com constantes e tipos APENAS (sem funções).

Passos obrigatórios:
1. Crie a pasta src/storage/ se não existir.
2. Crie o arquivo src/storage/progress.ts.
3. Adicione a constante: `export const STORAGE_KEY = 'lemmings_progresso';`
4. Defina o tipo genérico StorageResult<T>: { sucesso: true; dados: T } | { sucesso: false; erro: string }
5. Defina SaveProgressResult = StorageResult<void>
6. Defina LoadProgressResult = StorageResult<ProgressoJogador | null>
7. Importe ProgressoJogador de '../core/progresso_jogador'
8. Execute `npm run typecheck` ou `npx tsc --noEmit` para confirmar que compila.

Regras:
- NÃO implemente saveProgress ou loadProgress.
- NÃO altere nenhum outro arquivo existente.
- NÃO avance para a Tarefa 3.

UI/UX Gate: esta tarefa não tem impacto UI/UX (apenas tipos e constantes).
```

---

## Tarefa 3 — Implementar função saveProgress

### Objetivo

Implementar a função `saveProgress(data: ProgressoJogador): SaveProgressResult` que serializa o objeto em JSON e armazena no `localStorage`.

### Tipo da tarefa

lógica de negócio

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** A função é puramente camada de dados. Ela persiste um objeto no `localStorage` e retorna um resultado tipado. Não produz HTML, texto de interface ou estado visual. O impacto no usuário é nulo até que uma UI consuma esta função.

### Pré-requisitos

- Tarefa 2 concluída (tipos `StorageResult`, `SaveProgressResult` e `STORAGE_KEY` definidos).
- Tarefa 1 concluída (mapeamento de `ProgressoJogador` concluído — confirmar que é serializável).

### Arquivos prováveis

- `src/storage/progress.ts` — **alterar** (adicionar função)
- `src/core/progresso_jogador.ts` — **ler** (apenas para confirmar campos)

### Passos

1. Abrir `src/storage/progress.ts` (criado na Tarefa 2).
2. Implementar a função `saveProgress(data: ProgressoJogador): SaveProgressResult`.
3. A função deve:
   - Envolver a operação em try/catch.
   - Chamar `JSON.stringify(data)` para serializar.
   - Chamar `localStorage.setItem(STORAGE_KEY, json)` para persistir.
   - Em caso de sucesso, retornar `{ sucesso: true, dados: undefined }`.
   - Em caso de erro (ex: `QuotaExceededError`), retornar `{ sucesso: false, erro: mensagem }`.
4. Garantir que `StorageResult`, `SaveProgressResult` e `STORAGE_KEY` estejam no mesmo arquivo.
5. Executar `tsc --noEmit` para verificar tipos.
6. Executar `npm run lint` se disponível.
7. **Não implementar `loadProgress` ainda.**

### Critérios de aceite

- `saveProgress` é uma função exportada, síncrona, que recebe `ProgressoJogador` e retorna `SaveProgressResult`.
- A serialização usa `JSON.stringify`.
- O armazenamento usa `localStorage.setItem` com `STORAGE_KEY`.
- Erros de serialização (ex: dados circulares) são capturados e retornam `{ sucesso: false, erro: string }`.
- Erros de storage (ex: disco cheio, quota excedida) são capturados e retornam erro legível.
- O typecheck (`tsc --noEmit`) passa sem erros.

### Como validar

```bash
npm run typecheck
```

Validação manual (opcional, pode ser feita nos testes):

```js
// No console do navegador ou em um teste manual:
// saveProgress({ niveisDesbloqueados: [1], estrelasPorNivel: {}, tempoPorNivel: {}, tentativasPorNivel: {} })
// localStorage.getItem('lemmings_progresso') // deve conter JSON
```

### Riscos

- `JSON.stringify` pode lançar `TypeError` se o objeto contiver valores não serializáveis (ex: `BigInt`, funções, referências circulares). O `ProgressoJogador` atual tem apenas números, arrays e records, então é seguro — mas o try/catch protege contra mudanças futuras.
- `localStorage.setItem` pode lançar `QuotaExceededError` se o storage estiver cheio. O try/catch captura e retorna erro legível.
- Ambiente sem `localStorage` (SSR, test runner sem mock) — a função tentará acessar `localStorage` e lançará. O try/catch trata isso.

### O que NÃO alterar

- Não alterar `src/core/progresso_jogador.ts` ou qualquer outro arquivo fora de `src/storage/`.
- Não alterar a interface `ProgressoJogador`.
- Não adicionar formatação, compressão ou criptografia ao JSON.
- Não implementar `loadProgress` (será na Tarefa 4).
- Não adicionar logging, eventos ou hooks.

### Reversibilidade

Reverter o diff da Tarefa 3 (remover a implementação de `saveProgress` e manter apenas os tipos da Tarefa 2). Como nenhum outro módulo chama `saveProgress` ainda, a reversão não quebra nada.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 3 — Implementar função saveProgress.

Objetivo: Adicionar a função saveProgress em src/storage/progress.ts.

Passos obrigatórios:
1. Leia o arquivo src/storage/progress.ts existente (tipos da Tarefa 2 já devem estar lá).
2. Adicione a função:
   ```
   export function saveProgress(data: ProgressoJogador): SaveProgressResult {
     try {
       const json = JSON.stringify(data);
       localStorage.setItem(STORAGE_KEY, json);
       return { sucesso: true, dados: undefined };
     } catch (erro) {
       const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido ao salvar progresso';
       return { sucesso: false, erro: mensagem };
     }
   }
   ```
3. Execute `npm run typecheck` para garantir que compila.
4. NÃO implemente loadProgress.
5. NÃO altere nenhum arquivo fora de src/storage/progress.ts.

UI/UX Gate: esta tarefa não tem impacto UI/UX (camada de dados pura).
```

---

## Tarefa 4 — Implementar função loadProgress

### Objetivo

Implementar a função `loadProgress(): LoadProgressResult` que carrega o JSON do `localStorage`, desserializa e retorna o objeto `ProgressoJogador` ou `null` se não houver dados salvos.

### Tipo da tarefa

lógica de negócio

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** A função é puramente camada de dados. Ela lê do `localStorage`, desserializa e retorna um resultado tipado. Não produz HTML, textos de interface ou estado visual.

### Pré-requisitos

- Tarefas 2 e 3 concluídas (tipos, constantes e `saveProgress` implementados).
- A Tarefa 3 deve estar validada (typecheck passando).

### Arquivos prováveis

- `src/storage/progress.ts` — **alterar** (adicionar função)

### Passos

1. Abrir `src/storage/progress.ts`.
2. Implementar a função `loadProgress(): LoadProgressResult`.
3. A função deve:
   - Envolver a operação em try/catch.
   - Chamar `localStorage.getItem(STORAGE_KEY)` para obter o JSON.
   - Se retornar `null`, retornar `{ sucesso: true, dados: null }` (nenhum progresso salvo).
   - Chamar `JSON.parse(json)` para desserializar.
   - Validar que o objeto resultante tem a estrutura esperada de `ProgressoJogador` (pelo menos os campos `niveisDesbloqueados`, `estrelasPorNivel`, `tempoPorNivel`, `tentativasPorNivel`).
   - Em caso de sucesso, retornar `{ sucesso: true, dados: objeto }`.
   - Em caso de erro (JSON malformado, estrutura inválida, erro de acesso), retornar `{ sucesso: false, erro: mensagem }`.
4. Executar `tsc --noEmit` para verificar tipos.
5. **Validar manualmente o fluxo save → load em sequência (opcional, testes na Tarefa 6 cobrirão).**

### Critérios de aceite

- `loadProgress` é uma função exportada, síncrona, sem parâmetros, que retorna `LoadProgressResult`.
- Se não houver dados no `localStorage` para `STORAGE_KEY`, retorna `{ sucesso: true, dados: null }`.
- Se houver dados válidos, retorna `{ sucesso: true, dados: ProgressoJogador }`.
- Se o JSON estiver corrompido ou a estrutura for inválida, retorna `{ sucesso: false, erro: string }`.
- A validação básica de estrutura verifica a presença dos 4 campos principais como arrays/records.
- O typecheck (`tsc --noEmit`) passa sem erros.

### Como validar

```bash
npm run typecheck
```

### Riscos

- Dados corrompidos ou JSON malformado no `localStorage` fazem `JSON.parse` lançar → capturado pelo try/catch.
- Estrutura de `ProgressoJogador` pode mudar no futuro (adicionar campos) — dados antigos ainda carregam, campos novos ficam como `undefined`. A validação básica só rejeita se campos essenciais (`niveisDesbloqueados`, `estrelasPorNivel`, `tempoPorNivel`, `tentativasPorNivel`) estiverem ausentes ou com tipo errado.
- Ambiente sem `localStorage` (SSR, test runner sem mock) — capturado pelo try/catch.

### O que NÃO alterar

- Não alterar `saveProgress` já implementado.
- Não alterar `src/core/progresso_jogador.ts` ou qualquer outro arquivo.
- Não adicionar cache em memória ou qualquer estado global no módulo.
- Não adicionar polling, eventos ou subscriptions.

### Reversibilidade

Reverter o diff da Tarefa 4 (remover a implementação de `loadProgress`). Como nenhum outro módulo importa esta função ainda, a reversão não quebra nada.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 4 — Implementar função loadProgress.

Objetivo: Adicionar a função loadProgress em src/storage/progress.ts.

Passos obrigatórios:
1. Leia o arquivo src/storage/progress.ts (já deve conter tipos + saveProgress).
2. Adicione a função:
   ```
   export function loadProgress(): LoadProgressResult {
     try {
       const json = localStorage.getItem(STORAGE_KEY);
       if (json === null) {
         return { sucesso: true, dados: null };
       }
       const parsed = JSON.parse(json);
       if (!isValidProgresso(parsed)) {
         return { sucesso: false, erro: 'Dados de progresso corrompidos ou inválidos' };
       }
       return { sucesso: true, dados: parsed as ProgressoJogador };
     } catch (erro) {
       const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido ao carregar progresso';
       return { sucesso: false, erro: mensagem };
     }
   }
   ```
3. Adicione a função auxiliar de validação:
   ```
   function isValidProgresso(valor: unknown): valor is ProgressoJogador {
     if (typeof valor !== 'object' || valor === null) return false;
     const obj = valor as Record<string, unknown>;
     return (
       Array.isArray(obj.niveisDesbloqueados) &&
       typeof obj.estrelasPorNivel === 'object' && obj.estrelasPorNivel !== null &&
       typeof obj.tempoPorNivel === 'object' && obj.tempoPorNivel !== null &&
       typeof obj.tentativasPorNivel === 'object' && obj.tentativasPorNivel !== null
     );
   }
   ```
   Coloque esta função como privada do módulo (não exportada).
4. Execute `npm run typecheck` para garantir que compila.
5. NÃO altere saveProgress.
6. NÃO altere nenhum arquivo fora de src/storage/progress.ts.

UI/UX Gate: esta tarefa não tem impacto UI/UX (camada de dados pura).
```

---

## Tarefa 5 — Criar barrel export do módulo de storage

### Objetivo

Criar o arquivo `src/storage/index.ts` que re-exporta todas as funções e tipos públicos do módulo de storage, seguindo o padrão de barrel exports já existente no projeto.

### Tipo da tarefa

configuração

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** A tarefa cria apenas um barrel de re-exportação. Nenhum elemento visual ou texto de interface é introduzido.

### Pré-requisitos

- Tarefas 2, 3 e 4 concluídas (tipos + `saveProgress` + `loadProgress` implementados e compilando).

### Arquivos prováveis

- `src/storage/index.ts` — **criar** (barrel export)
- `src/storage/progress.ts` — ler (confirmar exports existentes)
- `src/core/index.ts` — ler (confirmar padrão de barrel)

### Passos

1. Ler `src/core/index.ts` para confirmar o padrão de barrel exports usado no projeto.
2. Criar `src/storage/index.ts`.
3. Re-exportar de `'./progress'`:
   - Tipo `StorageResult` (se for útil publicamente)
   - Tipo `SaveProgressResult`
   - Tipo `LoadProgressResult`
   - Função `saveProgress`
   - Função `loadProgress`
4. Seguir o mesmo padrão de `export type { ... } from '...'` para tipos e `export { ... } from '...'` para funções.
5. Executar `tsc --noEmit` para verificar que as re-exportações funcionam.

### Critérios de aceite

- `src/storage/index.ts` existe e re-exporta todos os símbolos públicos.
- O padrão de barrel segue o mesmo estilo de `src/core/index.ts`.
- `import { saveProgress, loadProgress, SaveProgressResult, LoadProgressResult } from '../storage'` funciona.
- O typecheck passa sem erros.

### Como validar

```bash
npm run typecheck
```

Validar manualmente (opcional):

```bash
# Verificar se o barrel tem os exports esperados
grep -E '^export' src/storage/index.ts
```

### Riscos

- Esquecer de exportar algum símbolo público → baixo risco, fácil de corrigir.
- Exportar símbolos internos (como `isValidProgresso`) → médio risco, pode virar API pública acidentalmente.

### O que NÃO alterar

- Não alterar `src/storage/progress.ts` (a não ser que precise adicionar um export que faltou).
- Não alterar `src/core/index.ts` ou qualquer outro barrel existente.
- Não adicionar lógica nova no barrel (apenas re-exportação).

### Reversibilidade

Excluir `src/storage/index.ts`. Nenhum outro módulo importa deste barrel ainda (a sprint não inclui consumo do storage), então a reversão é segura.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 5 — Criar barrel export do módulo de storage.

Objetivo: Criar src/storage/index.ts re-exportando os símbolos públicos de progress.ts.

Passos obrigatórios:
1. Leia src/core/index.ts para ver o padrão de barrel (use o mesmo estilo).
2. Crie src/storage/index.ts com:
   ```
   export type { StorageResult, SaveProgressResult, LoadProgressResult } from './progress';
   export { saveProgress, loadProgress } from './progress';
   ```
3. Execute `npm run typecheck` para confirmar que compila.
4. NÃO exporte funções internas como isValidProgresso.
5. NÃO altere src/storage/progress.ts nem src/core/index.ts.

UI/UX Gate: esta tarefa não tem impacto UI/UX (apenas re-exportação de módulo).
```

---

## Tarefa 6 — Implementar testes unitários do módulo de storage

### Objetivo

Criar testes unitários que cubram as funções `saveProgress` e `loadProgress`, incluindo cenários normais, de borda e de erro.

### Tipo da tarefa

testes

### Impacto UI/UX

**Classificação:** `Não`

**Justificativa:** Testes unitários não produzem interface visual.

### Pré-requisitos

- Tarefas 2 a 5 concluídas (módulo de storage completo com barrel export).
- Framework de testes instalado no projeto (se não houver, o coder deve instalar vitest antes).
- Configuração de mock para `localStorage` (pode ser via `vitest` com `jsdom` ou manual).

### Arquivos prováveis

- `src/storage/__tests__/progress.test.ts` — **criar** (testes)
- `src/storage/progress.ts` — ler (referência para os testes)
- `package.json` — **alterar** (adicionar script de test real, se necessário)
- `vitest.config.ts` — **criar** (se vitest for instalado e precisar de configuração)

### Passos

1. Verificar se o projeto tem framework de testes instalado:
   - Se `vitest` não estiver em `devDependencies`, instalar com `npm install -D vitest @vitest/globals`.
   - Criar `vitest.config.ts` se necessário.
   - Adicionar script `"test": "vitest run"` no `package.json` (substituindo o placeholder existente).
2. Criar a pasta `src/storage/__tests__/`.
3. Criar o arquivo `src/storage/__tests__/progress.test.ts`.
4. Implementar os seguintes testes:
   - **saveProgress com sucesso:** salva dados válidos, verifica que `localStorage.setItem` foi chamado com a chave correta e JSON correto.
   - **loadProgress com dados existentes:** mocka `localStorage.getItem` para retornar JSON válido, verifica que retorna o objeto correto com `sucesso: true`.
   - **loadProgress sem dados salvos:** mocka `localStorage.getItem` para retornar `null`, verifica que retorna `dados: null`.
   - **loadProgress com JSON inválido:** mocka `localStorage.getItem` para retornar string não-JSON, verifica que retorna `sucesso: false`.
   - **loadProgress com estrutura inválida:** mocka `localStorage.getItem` para retornar JSON de objeto sem os campos obrigatórios, verifica que retorna `sucesso: false` com mensagem de dados corrompidos.
   - **saveProgress com erro de storage:** simula falha em `localStorage.setItem` (ex: quota excedida), verifica que retorna `sucesso: false` com mensagem de erro.
5. Executar `npm test` e confirmar que todos os testes passam.

### Critérios de aceite

- Testes cobrem:
  - save com sucesso.
  - load com dados existentes.
  - load sem dados (null).
  - load com JSON malformado.
  - load com estrutura inválida (campos faltando).
  - save com erro de storage.
- `localStorage` é mockado adequadamente (via `vi.fn()` do vitest ou mock manual).
- Todos os testes passam com `npm test`.
- O script de teste no `package.json` foi atualizado se necessário.

### Como validar

```bash
npm test
```

Se vitest foi instalado:

```bash
npx vitest run
```

### Riscos

- Instalar vitest pode alterar o `package-lock.json` e `node_modules` — risco baixo, mas deve ser validado com `npm install`.
- Se o projeto já tiver um framework de teste diferente (Jest, mocha), o coder deve adaptar os testes para o framework existente, não instalar outro.
- Mock de `localStorage` pode vazar entre testes se não for limpo → usar `beforeEach` com `vi.clearAllMocks()` ou `localStorage.clear()`.
- Se `localStorage` não existir no ambiente de teste (ex: node sem `jsdom`), o mock precisa substituir `globalThis.localStorage`.

### O que NÃO alterar

- Não alterar `src/storage/progress.ts` (a não ser que um bug seja descoberto durante os testes).
- Não alterar `src/core/` ou qualquer outro módulo fora de `src/storage/`.
- Não adicionar testes de integração ou e2e — apenas unitários.
- Não testar UI — não há UI para testar.

### Reversibilidade

Reverter a instalação do vitest (`npm uninstall vitest @vitest/globals`), deletar `vitest.config.ts` se criado, reverter `package.json` se alterado, deletar `src/storage/__tests__/`. Como os testes não alteram lógica de produção, a reversão não afeta funcionalidade.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute APENAS a Tarefa 6 — Implementar testes unitários do módulo de storage.

Objetivo: Criar testes unitários para saveProgress e loadProgress em src/storage/__tests__/progress.test.ts.

Passos obrigatórios:
1. Verifique se vitest está nas devDependencies. Se não, instale: `npm install -D vitest @vitest/globals`
2. Crie vitest.config.ts se não existir com:
   ```
   import { defineConfig } from 'vitest/config';
   export default defineConfig({ test: { globals: true, environment: 'jsdom' } });
   ```
3. Atualize o script "test" em package.json de "echo 'test placeholder'" para "vitest run".
4. Crie src/storage/__tests__/progress.test.ts com os seguintes testes:
   a) saveProgress com sucesso — mock localStorage.setItem, verificar se foi chamado com STORAGE_KEY e JSON.
   b) loadProgress com dados existentes — mock localStorage.getItem retornando JSON válido, verificar retorno.
   c) loadProgress sem dados — mock retornando null, verificar dados: null.
   d) loadProgress com JSON inválido — mock retornando string não-JSON, verificar sucesso: false.
   e) loadProgress com estrutura inválida — mock retornando JSON sem campos obrigatórios, verificar sucesso: false.
   f) saveProgress com erro — mock localStorage.setItem para lançar exceção, verificar sucesso: false.
5. Execute `npm test` e garanta que todos passam.
6. NÃO altere src/storage/progress.ts.
7. NÃO crie testes para nenhum outro módulo.

UI/UX Gate: esta tarefa não tem impacto UI/UX (testes unitários).
```

---

# Ordem recomendada de execução

| Ordem | Tarefa | Depende de | Pode executar isoladamente? | Commit/checkpoint |
|---|---|---|---|---|
| 1 | Tarefa 1 — Leitura e mapeamento | Nenhuma | Sim, é leitura pura | Antes da Tarefa 2 (não há alteração para commitar, apenas registro mental) |
| 2 | Tarefa 2 — Tipos e constantes | Tarefa 1 | Não, precisa do mapeamento | Após criar `src/storage/progress.ts` com tipos — `git add -A && git commit -m "feat(storage): add types and constants"` |
| 3 | Tarefa 3 — saveProgress | Tarefa 2 | Não, precisa dos tipos | Após implementar `saveProgress` — `git add -A && git commit -m "feat(storage): implement saveProgress"` |
| 4 | Tarefa 4 — loadProgress | Tarefas 2, 3 | Não, precisa dos tipos e save | Após implementar `loadProgress` — `git add -A && git commit -m "feat(storage): implement loadProgress"` |
| 5 | Tarefa 5 — Barrel export | Tarefas 2, 3, 4 | Não, precisa das funções | Após criar `src/storage/index.ts` — `git add -A && git commit -m "feat(storage): add barrel export"` |
| 6 | Tarefa 6 — Testes | Tarefas 2, 3, 4, 5 | Não, precisa do módulo completo | Após testes passando — `git add -A && git commit -m "test(storage): add unit tests"` |

**Observações:**

- As tarefas são estritamente sequenciais. Nenhuma pode ser executada em paralelo com segurança.
- Recomenda-se revisão e commit ao final de cada tarefa para garantir diffs pequenos e reversíveis.
- Auditoria UI/UX: não se aplica a esta sprint (impacto indireto, nenhuma UI foi criada). A Tarefa 1 já incluiu a leitura do `UI_UX_GUIDE.md` para referência futura.

---

# Checklist final da sprint

| Item | Status esperado |
|---|---|
| lint executado | `npm run lint` (ou `echo 'lint placeholder'` — validar que não há erros) |
| typecheck executado | `npm run typecheck` — zero erros |
| build executado | `npm run build` — zero erros |
| testes executados | `npm test` — todos os testes passam |
| fluxo manual validado | Opcional — abrir jogo, chamar `saveProgress` e `loadProgress` no console do navegador |
| responsividade validada | N/A — sprint sem UI |
| regressões verificadas | `git log` — apenas arquivos em `src/storage/` alterados; `src/core/` e outros módulos intactos |
| arquivos alterados revisados | Apenas `src/storage/progress.ts`, `src/storage/index.ts`, `src/storage/__tests__/progress.test.ts`, `package.json` (script de test), `vitest.config.ts` (se criado) |
| escopo conferido contra a sprint original | Apenas storage — sem UI, sem nuvem, sem criptografia |
| nenhuma funcionalidade fora do escopo adicionada | Confirmado |
| UI/UX Gate preenchido para todas as tarefas | T1: Não, T2: Não, T3: Não, T4: Não, T5: Não, T6: Não |
| `docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual | N/A — nenhuma tarefa tem impacto visual direto; o guia foi lido na Tarefa 1 |

---

# Tarefas que NÃO devem ir para modelo econômico

Todas as 6 tarefas desta sprint podem ser executadas por modelo econômico. Não há:

- alteração de arquitetura;
- autenticação/autorização;
- banco de dados;
- pagamentos;
- segurança sensível;
- refatoração ampla;
- debugging complexo;
- fluxos críticos com muitas dependências;
- decisões sensíveis de UI/UX em fluxo principal.

**Nenhuma tarefa exige modelo mais forte.**
