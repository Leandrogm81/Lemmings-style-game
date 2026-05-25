# Sprint quebrada em tarefas menores

## Sprint de origem

- nome da sprint original: Sprint 01 - PROJETO_ESTRUTURA
- objetivo da sprint original: Criar a estrutura básica de pastas do projeto, inicializar package.json e configurar variáveis de ambiente padrão.
- arquivo de origem: /docs/Plano de Implementação/Sprints/Sprint 01 - PROJETO_ESTRUTURA/SPRINT_01_PROJETO_ESTRUTURA.md
- resumo do escopo: Criar diretórios base (assets/, docs/design/, src/, ios/, android/, pc/), inicializar package.json com scripts básicos, adicionar .env.example com placeholders e configurar .gitignore.

## Análise da Sprint

### Objetivo da sprint

Estabelecer a estrutura de pastas e configurações iniciais do projeto para permitir desenvolvimento contínuo, sem criar código de gameplay.

### Impacto UI/UX da sprint

Classificação: Não aplicável.

Justificativa: A sprint envolve apenas criação de estrutura de pastas, arquivos de configuração (package.json, .env.example, .gitignore) e não inclui qualquer tela, componente visual, botão ou fluxo de usuário.

### Escopo identificado

- Criar diretórios: assets/, docs/design/, src/, ios/, android/, pc/
- Criar package.json com scripts de lint, build e test
- Criar .env.example com placeholders para ADMOB_ID
- Criar .gitignore básico
- Executar npm install para instalar dependências dev

### Fora do escopo

- Não criar arquivos de código de gameplay
- Não tocar em UI ainda não implementada
- Não definir engine final (Godot ou Cocos2d-x)

### Dependências entre partes

- As pastas src/, ios/, android/, pc/ devem existir antes de qualquer código ser adicionado (futuro)
- package.json deve existir antes de executar npm install
- .env.example deve existir antes de .gitignore poder referenciá-lo

### Riscos principais

- Criar pastas com nomes diferentes pode quebrar scripts futuros
- Scripts de lint/typecheck mal configurados podem impedir builds futuros

### Estratégia de quebra

A sprint será dividida em tarefas atômicas, cada uma criando um único artefato ou executando uma única ação, permitindo rollback incremental e validação individual.

---

# Tarefas da Sprint

## Tarefa 1 — Criar estrutura de pastas base

### Objetivo

Criar todas as pastas necessárias para a estrutura inicial do projeto.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: A criação de pastas é uma operação de sistema de arquivos e não envolve interface visual.

### Pré-requisitos

- Nenhum

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/assets/
- /mnt/c/Dev/lemmings-style-game/docs/design/
- /mnt/c/Dev/lemmings-style-game/src/
- /mnt/c/Dev/lemmings-style-game/ios/
- /mnt/c/Dev/lemmings-style-game/android/
- /mnt/c/Dev/lemmings-style-game/pc/

### Passos

1. Navegar para a raiz do projeto
2. Criar pasta assets/ usando mkdir -p
3. Criar pasta docs/design/ usando mkdir -p
4. Criar pasta src/ usando mkdir -p
5. Criar pasta ios/ usando mkdir -p
6. Criar pasta android/ usando mkdir -p
7. Criar pasta pc/ usando mkdir -p

### Critérios de aceite

- Todas as pastas listadas acima existem no projeto
- Estrutura de diretórios pode ser visualizada com tree .

### Como validar

```bash
ls -la
find . -type d -name "assets" -o -type d -name "src" -o -type d -name "ios" -o -type d -name "android" -o -type d -name "pc"
```

### Riscos

- Nomes de pasta diferentes dos esperados podem causar inconsistência futura

### O que NÃO alterar

- Não criar arquivos dentro das pastas nesta tarefa
- Não alterar permissões ou propriedades especiais das pastas

### Reversibilidade

Pode ser revertido com `rm -rf assets src ios android pc docs/design/` desde que nada mais tenha sido adicionado.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie as pastas assets/, docs/design/, src/, ios/, android/ e pc/ na raiz do projeto em /mnt/c/Dev/lemmings-style-game/. Não crie arquivos, apenas pastas vazias. Valide que todas existem com um comando de listagem.

---

## Tarefa 2 — Inicializar package.json

### Objetivo

Executar npm init -y para criar package.json básico.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: package.json é um arquivo de configuração de projeto e não afeta interface visual.

### Pré-requisitos

- Node.js e npm instalados no ambiente
- Tarefa 1 concluída

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/package.json

### Passos

1. Navegar para a raiz do projeto
2. Executar npm init -y para gerar package.json padrão

### Critérios de aceite

- package.json existe no projeto
- Contém campo "name", "version" e "main" básicos

### Como validar

```bash
cat package.json
```

### Riscos

- Npm init pode falhar se o diretório não for um projeto Node.js válido

### O que NÃO alterar

- Não adicionar dependências ou scripts customizados nesta tarefa
- Não modificar campos gerados automaticamente

### Reversibilidade

Pode ser revertido removendo o arquivo package.json e package-lock.json se gerado.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: inicialize um package.json usando npm init -y na raiz do projeto. Não adicione dependências ou altere nada. Valide que o arquivo foi criado corretamente.

---

## Tarefa 3 — Adicionar scripts básicos ao package.json

### Objetivo

Adicionar scripts de lint, build e test ao package.json.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: Scripts são definições de comando e não envolvem interface visual direta.

### Pré-requisitos

- package.json deve existir (Tarefa 2 concluída)

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/package.json

### Passos

1. Abrir package.json
2. Adicionar ao objeto "scripts":
   - "lint": "echo 'lint placeholder'"
   - "build": "echo 'build placeholder'"
   - "test": "echo 'test placeholder'"

### Critérios de aceite

- package.json contém a chave "scripts" com os três scripts listados
- npm run lint executa sem erro
- npm run build executa sem erro
- npm run test executa sem erro

### Como validar

```bash
npm run lint
npm run build
npm run test
```

### Riscos

- Modificar errado o JSON pode quebrar o arquivo

### O que NÃO alterar

- Não modificar outros campos do package.json
- Não adicionar dependências reais ainda

### Reversibilidade

Pode ser revertido removendo os scripts adicionados do objeto "scripts" no package.json.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: adicione os scripts "lint", "build" e "test" ao package.json, cada um com comando echo placeholder. Não altere outros campos. Valide que os scripts executam corretamente.

---

## Tarefa 4 — Criar .env.example

### Objetivo

Criar arquivo .env.example com placeholders para variáveis de ambiente.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: .env.example é um arquivo de configuração e não envolve interface visual.

### Pré-requisitos

- Nenhum

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/.env.example

### Passos

1. Criar arquivo .env.example
2. Adicionar linha: ADMOB_ID=your_id_here
3. Adicionar linha vazia no final

### Critérios de aceite

- .env.example existe no projeto
- Contém ADMOB_ID=your_id_here
- Arquivo é legível

### Como validar

```bash
cat .env.example
```

### Riscos

- Colocar valores reais em vez de placeholders pode expor dados sensíveis

### O que NÃO alterar

- Não adicionar outras variáveis que não ADMOB_ID
- Não adicionar comentários complexos

### Reversibilidade

Pode ser revertido removendo o arquivo .env.example.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie .env.example com a linha ADMOB_ID=your_id_here. Não adicione outras variáveis. Valide com cat.

---

## Tarefa 5 — Criar .gitignore

### Objetivo

Criar .gitignore básico para o projeto Node.js.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: .gitignore é um arquivo de configuração de versionamento e não envolve interface visual.

### Pré-requisitos

- Nenhum

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/.gitignore

### Passos

1. Criar arquivo .gitignore
2. Adicionar entradas padrão para Node.js:
   - node_modules/
   - .env (não .env.example)
   - *.log
   - .DS_Store
3. Adicionar entrada para IDEs comuns (opcional)

### Critérios de aceite

- .gitignore existe no projeto
- Contém node_modules/
- Contém .env (não .env.example)

### Como validar

```bash
cat .gitignore
```

### Riscos

- Esquecer node_modules/ pode causar problemas de versionamento

### O que NÃO alterar

- Não adicionar regras específicas de IDE complexas
- Não colocar .env.example no gitignore

### Reversibilidade

Pode ser revertido removendo o arquivo .gitignore.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: crie .gitignore com node_modules/, .env, *.log e .DS_Store. Não adicione regras complexas. Valide com cat.

---

## Tarefa 6 — Executar npm install

### Objetivo

Instalar dependências do projeto.

### Tipo da tarefa

configuração

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: npm install é um processo de instalação e não envolve interface visual.

### Pré-requisitos

- package.json deve existir (Tarefa 2 e 3 concluídas)

### Arquivos prováveis

- /mnt/c/Dev/lemmings-style-game/node_modules/
- /mnt/c/Dev/lemmings-style-game/package-lock.json

### Passos

1. Navegar para a raiz do projeto
2. Executar npm install

### Critérios de aceite

- node_modules/ foi criado
- package-lock.json foi gerado (ou atualizado)
- Comando terminou sem erro

### Como validar

```bash
ls -la node_modules/
cat package-lock.json
```

### Riscos

- Falha na instalação pode indicar problema com Node.js ou permissões

### O que NÃO alterar

- Não instalar dependências extras além das definidas
- Não modificar package.json durante a instalação

### Reversibilidade

Pode ser revertido removendo node_modules/ e package-lock.json.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: rode npm install na raiz do projeto. Não modifique nada. Valide que node_modules foi criado.

---

## Tarefa 7 — Validar estrutura completa

### Objetivo

Verificar que todos os artefatos da sprint foram criados corretamente.

### Tipo da tarefa

validação

### Impacto UI/UX

Classificação: Não aplicável.

Justificativa: Esta é uma tarefa de verificação e não envolve interface visual.

### Pré-requisitos

- Todas as tarefas anteriores concluídas

### Arquivos prováveis

- Todos os arquivos e pastas criados nas tarefas anteriores

### Passos

1. Listar estrutura de pastas
2. Verificar package.json existe e contém scripts
3. Verificar .env.example existe
4. Verificar .gitignore existe
5. Verificar node_modules/ existe

### Critérios de aceite

- Estrutura mostra todas as pastas criadas
- package.json contém scripts lint, build, test
- .env.example contém ADMOB_ID
- .gitignore contém node_modules/
- node_modules/ foi criado

### Como validar

```bash
find . -type d \( -name "assets" -o -name "src" -o -name "ios" -o -name "android" -o -name "pc" \)
cat package.json | grep -A3 '"scripts"'
cat .env.example
cat .gitignore
ls -la node_modules/ | head -5
```

### Riscos

- Tarefas anteriores podem ter falhado silenciosamente

### O que NÃO alterar

- Não modificar arquivos durante a validação
- Não executar alterações adicionais

### Reversibilidade

Não se aplica - tarefa de validação

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

Execute apenas esta tarefa: valide que todas as pastas (assets, src, ios, android, pc), package.json, .env.example, .gitignore e node_modules existem. Não altere nada, apenas verifique.

---

# Ordem recomendada de execução

1. Tarefa 1 (pastas) - isolada, pode executar imediatamente
2. Tarefa 2 (npm init) - depende apenas do ambiente Node.js
3. Tarefa 3 (scripts) - depende de package.json existir
4. Tarefa 4 (.env.example) - isolada
5. Tarefa 5 (.gitignore) - isolada
6. Tarefa 6 (npm install) - depende de package.json existir
7. Tarefa 7 (validação) - depende de todas as anteriores

Tarefas 1, 4 e 5 podem ser executadas em paralelo.
Após Tarefa 2, Tarefas 3 e 6 podem seguir.
Commit/checkpoint recomendado após Tarefa 7.

---

# Checklist final da sprint

- [ ] Estrutura de pastas validada
- [ ] package.json presente com scripts básicos
- [ ] .env.example presente com variáveis básicas
- [ ] .gitignore presente
- [ ] Dependências instaladas sem erros
- [ ] Nenhum arquivo de código de gameplay criado
- [ ] Estrutura pronta para desenvolvimento

---

# Tarefas que NÃO devem ir para modelo econômico

Nenhuma tarefa desta sprint requer modelo mais forte. Todas as tarefas são operações de configuração básica: criação de pastas, inicialização de package.json, criação de arquivos de configuração e instalação de dependênências sem código de negócio.