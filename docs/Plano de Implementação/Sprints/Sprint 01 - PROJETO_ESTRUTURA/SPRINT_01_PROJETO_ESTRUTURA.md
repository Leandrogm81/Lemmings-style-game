# Sprint 01 — PROJETO_ESTRUTURA

## Objetivo
Criar a estrutura basica de pastas do projeto, inicializar package.json e configurar variaveis de ambiente padrao.

## Impacto UI/UX
Nao aplicavel

## Escopo da sprint
- Gerar diretorios: assets/, docs/design/, src/, ios/, android/, pc/.
- Criar package.json com dependencias minimas (ex.: lint, build, test).
- Adicionar .env.example com placeholders para ADMOB_ID, etc.
- Adicionar .gitignore basico.
- Executar npm install para instalar dependencias de lint e test.
- Verificar que o diretorio esta pronto para receber codigo.

## Fora do escopo
- Nao criar arquivos de codigo de gameplay.
- Nao tocar em UI ainda nao implementada.
- Nao definir engine final (Godot ou Cocos2d-x).

## Arquivos provaveis a criar/alterar
- package.json
- .env.example
- .gitignore
- Pasta /assets/
- Pasta /docs/design/
- Pasta /src/
- Pastas de exportacao /ios/, /android/, /pc/

## Tarefas em ordem
### Tarefa 1.1 — Criar diretorios base
Descricao: Criar as pastas necessarias.
Arquivos provaveis: /assets/, /docs/design/, /src/, /ios/, /android/, /pc/
Critério de aceite: Todas as pastas existem na raiz do projeto.
Validade: Listar com tree e conferir.

### Tarefa 1.2 — Inicializar package.json
Descricao: Executar npm init -y e adicionar scripts de lint, build, test.
Arquivos provaveis: package.json
Critério de aceitacao: package.json contém scripts lint, build, test (pode apontar para placeholders).
Validade: npm run lint -- --check retorna sem erro (mesmo com scripts vazios).

### Tarefa 1.3 — Adicionar .env.example
Descricao: Criar arquivo .env.example com chaves como ADMOB_ID=your_id_here.
Arquivos provaveis: .env.example
Critério de aceitacao: Arquivo contem as variaveis listadas.
Validade: Verificar com cat .env.example.

### Tarefa 1.4 — Configurar lint e typecheck
Descricao: Adicionar dependencias dev (eslint, prettier talvez) e configurar scripts.
Arquivos provaveis: package.json (scripts lint e typecheck apontando para eslint . etc.)
Critério de aceitacao: Scripts existentes no package.json.
Validade: npm run lint -- --max-warnings=0 termina sem erro (pode estar vazio).

### Tarefa 1.5 — Instalar dependencias iniciais
Descricao: Rodar npm install para instalar pacotes dev.
Arquivos provaveis: node_modules/ (gerado)
Critério de aceitacao: Concluido sem erros.

## Critérios de aceitação da sprint
- Todas as pastas criadas.
- package.json presente com scripts basicos.
- .env.example presente com variaveis basicas.
- Dependencias instaladas sem erros.
- Nenhum arquivo de codigo de gameplay criado.

## Riscos
- Criar pastas com nomes diferentes pode quebrar scripts futuros.
- Scripts de lint/typecheck mal configurados podem impedir builds futuros.

## O que NÃO deve ser alterado nesta sprint
- Nao modificar arquivos de codigo de gameplay.
- Nao tocar em UI ainda nao implementada.
- Nao alterar configuracao do engine.
