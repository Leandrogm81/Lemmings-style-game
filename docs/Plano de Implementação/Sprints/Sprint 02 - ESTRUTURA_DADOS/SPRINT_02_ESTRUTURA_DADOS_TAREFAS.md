# arquivo: SPRINT_02_ESTRUTURA_DADOS_TAREFAS.md

# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 02 - ESTRUTURA_DADOS
- objetivo da sprint original: Definir os tipos de dados core: ProgressoJogador, LvlConfig, Criatura.
- arquivo de origem: /C:/Dev/lemmings-style-game/docs/Plano de Implementação/Sprints/Sprint 02 - ESTRUTURA_DADOS/SPRINT_02_ESTRUTURA_DADOS.md
- resumo do escopo: Criar arquivos TypeScript com interfaces para ProgressoJogador, LvlConfig e Criatura, e exportá-las via index.ts.

## Análise da Sprint

### Objetivo da sprint

Definir e implementar interfaces TypeScript para as estruturas de dados centrais do jogo (ProgressoJogador, LvlConfig, Criatura) sem conectar a UI ou salvamento.

### Impacto UI/UX da sprint

Classificação: Indireto.

Justificativa: A criação de tipos de dados é de infraestrutura, mas os dados influenciarão futuramente na UI. Apesar de indireto, não há criação de componentes visuais nesta sprint.

### Escopo identificado

- Criar interface ProgressoJogador com niveisDesbloqueados, estrelasPorNivel, tempoPorNivel, tentativasPorNivel
- Criar interface LvlConfig com id, nome, requisitosCriaturas, listaHabilidadesDisponiveis
- Criar interface Criatura com id, tipo, estado
- Criar index.ts exportando todas as interfaces

### Fora do escopo

- Não implementar visualização das estruturas
- Não integrar com UI ou salvamento

### Dependências entre partes

- Tarefas 2.1, 2.2, 2.3 podem ser executadas em paralelo
- Tarefa 2.4 depende das três primeiras estarem concluídas

### Riscos principais

- Erros de tipagem podem impedir código futuro
- Nomenclatura incorreta gera confusão

### Estratégia de quebra

Criar cada interface em um arquivo separado, depois criar o index.ts de exportação. Manter tipos simples e documentados.

---

# Tarefas da Sprint

## Tarefa 1 — Criar interface ProgressoJogador

### Objetivo

Definir interface TypeScript para o progresso do jogador com propriedades de níveis, estrelas, tempo e tentativas.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: Indireto.

Justifique: A interface define estrutura de dados que será usada pela UI em sprints futuras, mas não cria diretamente componentes visuais.

### Pré-requisitos

- Pasta src/core/ deve existir (Sprint 01 concluída)

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/src/core/progresso_jogador.ts

### Passos

1. Criar pasta src/core/ se não existir
2. Criar arquivo progresso_jogador.ts
3. Definir interface ProgressoJogador
4. Adicionar propriedades: niveisDesbloqueados (number[]), estrelasPorNivel (Record<string, number>), tempoPorNivel (Record<string, number>), tentativasPorNivel (Record<string, number>)
5. Exportar interface

### Critérios de aceite

- Interface ProgressoJogador está definida
- Propriedades têm tipos corretos
- Arquivo compila sem erro com tsc

### Como validar

```bash
npx tsc --noEmit src/core/progresso_jogador.ts
```

Se tsc não estiver configurado, usar:
```bash
npx tsc --noEmit --skipLibCheck
```

### Riscos

- Tipos mal definidos podem causar problemas em sprints futuras

### O que NÃO alterar

- Não implementar lógica de salvamento
- Não conectar a UI
- Não mudar estrutura de pastas

### Reversibilidade

Remover o arquivo src/core/progresso_jogador.ts.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie src/core/progresso_jogador.ts com interface ProgressoJogador contendo niveisDesbloqueados (number[]), estrelasPorNivel (Record<string, number>), tempoPorNivel (Record<string, number>), tentativasPorNivel (Record<string, number>). Exporte a interface. Valide com tsc.

---

## Tarefa 2 — Criar interface LvlConfig

### Objetivo

Definir interface TypeScript para configuração de nível com id, nome, requisitos e habilidades.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: Indireto.

Justifique: Interface de dados que influenciará a UI futura, mas não cria componentes visuais diretamente.

### Pré-requisitos

- Pasta src/core/ deve existir (Sprint 01 concluída)

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/src/core/lvl_config.ts

### Passos

1. Criar arquivo lvl_config.ts
2. Definir interface LvlConfig
3. Adicionar propriedades: id (number), nome (string), requisitosCriaturas (string[]), listaHabilidadesDisponiveis (string[])
4. Exportar interface

### Critérios de aceite

- Interface LvlConfig está definida
- Propriedades têm tipos corretos
- Arquivo compila sem erro

### Como validar

```bash
npx tsc --noEmit src/core/lvl_config.ts
```

### Riscos

- Nomenclatura incorreta pode gerar confusão futura

### O que NÃO alterar

- Não implementar lógica de seleção de habilidades
- Não adicionar dependências externas

### Reversibilidade

Remover o arquivo src/core/lvl_config.ts.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie src/core/lvl_config.ts com interface LvlConfig contendo id (number), nome (string), requisitosCriaturas (string[]), listaHabilidadesDisponiveis (string[]). Exporte a interface. Valide com tsc.

---

## Tarefa 3 — Criar interface Criatura

### Objetivo

Definir interface TypeScript para criatura com id, tipo e estado.

### Tipo da tarefa

modelo/tipos

### Impacto UI/UX

Classificação: Indireto.

Justifique: Dados de criatura serão usados na UI futura, mas esta tarefa é apenas definição de tipos.

### Pré-requisitos

- Pasta src/core/ deve existir (Sprint 01 concluída)

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/src/core/criatura.ts

### Passos

1. Criar arquivo criatura.ts
2. Definir interface Criatura
3. Adicionar propriedades: id (string), tipo (string), estado (string)
4. Exportar interface

### Critérios de aceite

- Interface Criatura está definida
- Propriedades têm tipos corretos
- Arquivo compila sem erro

### Como validar

```bash
npx tsc --noEmit src/core/criatura.ts
```

### Riscos

- Tipos muito genéricos podem precisar de refatoração futura

### O que NÃO alterar

- Não implementar comportamento de criatura
- Não adicionar métodos ou classes

### Reversibilidade

Remover o arquivo src/core/criatura.ts.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie src/core/criatura.ts com interface Criatura contendo id (string), tipo (string), estado (string). Exporte a interface. Valide com tsc.

---

## Tarefa 4 — Criar index.ts de exportação

### Objetivo

Criar arquivo index.ts que re-exporta todas as interfaces do módulo core.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Indireto.

Justifique: Exportação facilitará importação futura em componentes UI, mas não cria UI diretamente.

### Pré-requisitos

- Tarefas 1, 2, 3 concluídas
- Os arquivos progresso_jogador.ts, lvl_config.ts, criatura.ts devem existir

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/src/core/index.ts

### Passos

1. Criar arquivo index.ts em src/core/
2. Importar e re-exportar ProgressoJogador de './progresso_jogador'
3. Importar e re-exportar LvlConfig de './lvl_config'
4. Importar e re-exportar Criatura de './criatura'

### Critérios de aceite

- index.ts exporta todas as interfaces
- Importação funciona: `import { ProgressoJogador, LvlConfig, Criatura } from './core'`
- Compila sem erro

### Como validar

```bash
npx tsc --noEmit src/core/index.ts
```

### Riscos

- Erro de importação pode quebrar código que consome o módulo

### O que NÃO alterar

- Não adicionar novas exportações não previstas
- Não mudar estrutura de diretórios

### Reversibilidade

Remover ou substituir o conteúdo de src/core/index.ts.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie src/core/index.ts que exporta ProgressoJogador, LvlConfig e Criatura. Valide com tsc.

---

## Tarefa 5 — Validar compilação completa

### Objetivo

Verificar que todas as interfaces compõem um módulo TypeScript válido.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: Não aplicável.

Justifique: Esta é uma tarefa de validação técnica, não envolve interface visual.

### Pré-requisitos

- Todas as tarefas anteriores concluídas

### Arquivos prováveis

- Todos os arquivos criados nas tarefas anteriores

### Passos

1. Executar npx tsc --noEmit na pasta src/
2. Verificar que não há erros de compilação
3. Verificar que as interfaces podem ser importadas

### Critérios de aceite

- Compilação completada sem erros
- Todas as interfaces são exportáveis

### Como validar

```bash
npx tsc --noEmit
```

### Riscos

- Erros silenciosos podem passar se tsc não estiver configurado corretamente

### O que NÃO alterar

- Não modificar arquivos durante a validação

### Reversibilidade

Não se aplica - tarefa de validação

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide que todas as interfaces compilam corretamente com `npx tsc --noEmit`. Não altere arquivos, apenas verifique.

---

# Ordem recomendada de execução

1. Tarefa 1 (ProgressoJogador) - isolada
2. Tarefa 2 (LvlConfig) - isolada
3. Tarefa 3 (Criatura) - isolada
4. Tarefa 4 (index.ts) - depende das anteriores
5. Tarefa 5 (validação) - depende de todas

Tarefas 1, 2 e 3 podem ser executadas em paralelo. Commit recomendado após Tarefa 5.

---

# Checklist final da sprint

- [ ] Interface ProgressoJogador criada e compilando
- [ ] Interface LvlConfig criada e compilando
- [ ] Interface Criatura criada e compilando
- [ ] index.ts exportando todas as interfaces
- [ ] Compilação TypeScript completa sem erros
- [ ] Nenhuma integração com UI realizada
- [ ] Nenhum salvamento implementado

---

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint requer modelo mais forte. Todas são definições de interfaces TypeScript simples, sem autenticação, banco de dados, pagamentos ou fluxos críticos complexos.