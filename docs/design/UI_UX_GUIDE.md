# Guia UI/UX do Projeto

## 1. Objetivo do guia

Este documento define a direção visual, os princípios de UX e os critérios de aceite visual do projeto.

Ele deve ser usado por qualquer agente, modelo ou desenvolvedor que implemente telas, componentes, formulários, tabelas, menus, textos de interface, estados visuais ou fluxos de usuário.

O objetivo principal é garantir uma interface:

- bonita;
- elegante;
- profissional;
- consistente;
- responsiva;
- clara;
- funcional;
- sem aparência genérica de IA.

Este guia deve ser tratado como fonte obrigatória sempre que houver impacto direto ou indireto em UI/UX.

---

## 2. Personalidade visual do produto

A interface deve transmitir:

- profissionalismo;
- confiança;
- clareza;
- organização;
- sobriedade;
- precisão;
- facilidade de uso;
- sensação de produto real e maduro.

A interface NÃO deve parecer:

- template genérico de SaaS;
- dashboard artificial criado por IA;
- landing page chamativa sem propósito;
- protótipo improvisado;
- painel poluído;
- sistema cheio de cards decorativos;
- interface com excesso de gradientes, sombras ou ícones aleatórios.

A estética deve ser moderna, mas discreta. O foco é utilidade, legibilidade e consistência.

---

## 3. Princípios de UX

Toda tela ou fluxo deve seguir estes princípios:

1. Clareza acima de decoração.
2. Uma ação principal evidente por tela ou seção.
3. Hierarquia visual fácil de entender.
4. Pouca carga cognitiva.
5. Textos objetivos e úteis.
6. Feedback claro para ações do usuário.
7. Estados vazios explicativos.
8. Mensagens de erro compreensíveis.
9. Responsividade real, não apenas tela encolhida.
10. Consistência entre componentes.
11. Fluxos previsíveis.
12. Ações destrutivas sempre devem exigir cuidado visual.
13. Informações importantes devem ter prioridade visual.
14. Elementos decorativos só devem existir se ajudarem a compreensão.

---

## 4. Direção visual

### 4.1 Layout

O layout deve ser organizado, espaçado e previsível.

Regras:

- usar alinhamento consistente;
- evitar blocos soltos sem relação visual;
- agrupar informações relacionadas;
- usar áreas em branco para melhorar leitura;
- evitar excesso de elementos na primeira dobra;
- evitar excesso de cards;
- evitar telas com tudo competindo por atenção;
- manter largura máxima confortável para leitura;
- priorizar grids simples;
- manter fluxo visual de cima para baixo e da esquerda para direita;
- destacar apenas o que realmente importa.

Recomendações:

- páginas de conteúdo: largura máxima entre `960px` e `1200px`;
- dashboards: grid responsivo com colunas claras;
- formulários: largura confortável, sem campos comprimidos;
- telas mobile: uma coluna principal;
- ações principais: próximas ao contexto da decisão.

---

### 4.2 Cores

A paleta deve ser sóbria e profissional.

Quando o projeto ainda não tiver paleta definida, use uma base semelhante a esta:

| Uso | Cor sugerida | Observação |
|---|---|---|
| Fundo principal | `#F8FAFC` | claro, neutro |
| Superfície/card | `#FFFFFF` | superfície principal |
| Texto principal | `#0F172A` | alta legibilidade |
| Texto secundário | `#475569` | apoio visual |
| Texto discreto | `#64748B` | metadados e ajuda |
| Borda | `#E2E8F0` | separação leve |
| Primária | `#1D4ED8` | ação principal |
| Primária hover | `#1E40AF` | interação |
| Sucesso | `#15803D` | confirmação |
| Alerta | `#B45309` | atenção |
| Erro | `#B91C1C` | erro/destrutivo |
| Fundo erro leve | `#FEF2F2` | mensagens de erro |
| Fundo sucesso leve | `#F0FDF4` | mensagens positivas |

Regras:

- não usar muitas cores principais;
- não usar gradientes chamativos sem função;
- não usar roxo/azul neon como padrão automático de IA;
- não misturar paletas diferentes;
- não usar cor como único indicador de estado;
- garantir contraste adequado entre texto e fundo.

---

### 4.3 Tipografia

A tipografia deve priorizar leitura.

Regras:

- títulos devem ser claros e objetivos;
- subtítulos devem explicar contexto, não enfeitar;
- corpo de texto deve ter tamanho confortável;
- labels devem ser visíveis e diretos;
- placeholders não substituem labels;
- evitar frases longas em botões;
- evitar textos genéricos de marketing.

Escala sugerida:

| Elemento | Tamanho sugerido | Peso |
|---|---:|---:|
| Título principal | 28–36px | 600–700 |
| Título de seção | 20–24px | 600 |
| Subtítulo | 16–18px | 400–500 |
| Corpo | 14–16px | 400 |
| Label | 13–14px | 500 |
| Texto auxiliar | 12–14px | 400 |
| Botão | 14–15px | 500–600 |

---

### 4.4 Espaçamento

Use uma escala consistente:

| Valor | Uso |
|---:|---|
| 4px | microajustes, ícones próximos de texto |
| 8px | separação pequena entre elementos relacionados |
| 12px | espaçamento interno compacto |
| 16px | espaçamento padrão entre campos e blocos |
| 24px | separação entre grupos |
| 32px | separação entre seções |
| 48px | grandes blocos ou respiro superior |
| 64px | hero, páginas institucionais ou separações maiores |

Regras:

- não usar espaçamentos aleatórios;
- não comprimir formulários;
- não deixar cards grudados;
- não criar telas com excesso de espaço vazio sem função;
- manter consistência entre telas semelhantes.

---

### 4.5 Bordas, sombras e cantos

Regras:

- bordas devem ser leves e funcionais;
- sombras devem ser discretas;
- cantos arredondados devem ser consistentes;
- evitar sombra forte em todos os cards;
- evitar bordas arredondadas exageradas em todos os elementos.

Sugestões:

| Elemento | Raio | Sombra |
|---|---:|---|
| Botões | 8–10px | nenhuma ou muito leve |
| Inputs | 8–10px | nenhuma |
| Cards | 12–16px | leve, se necessário |
| Modais | 16–20px | média e discreta |
| Badges | 999px | nenhuma |

Sombra recomendada para cards, quando necessária:

- suave;
- baixa opacidade;
- sem efeito flutuante exagerado.

---

## 5. Componentes principais

### 5.1 Botões

Tipos esperados:

- primário;
- secundário;
- destrutivo;
- fantasma;
- link/terciário.

Regras:

- cada tela deve ter uma ação principal clara;
- botões primários não devem competir entre si;
- ações secundárias devem ser discretas;
- ações destrutivas devem ter cor e texto claros;
- estado disabled deve ser visualmente evidente;
- estado loading deve impedir clique duplicado;
- texto do botão deve começar com verbo.

Exemplos bons:

- `Criar orçamento`
- `Salvar alterações`
- `Adicionar cliente`
- `Enviar pedido`
- `Cancelar`
- `Excluir item`

Exemplos ruins:

- `Começar agora`
- `Explorar possibilidades`
- `Transformar experiência`
- `Desbloquear potencial`
- `Gerenciar tudo`

---

### 5.2 Inputs e formulários

Regras:

- todo campo deve ter label;
- placeholder deve ser apenas ajuda complementar;
- mensagens de erro devem explicar o problema;
- campos obrigatórios devem ser identificáveis;
- grupos de campos devem ter lógica visual;
- formulários longos devem ser divididos por seções;
- validação deve ser clara;
- não usar apenas cor para indicar erro;
- inputs devem ter altura confortável para mobile.

Cada formulário relevante deve prever:

- estado inicial;
- preenchimento parcial;
- erro de validação;
- envio em andamento;
- sucesso;
- falha de envio;
- cancelamento, quando aplicável.

---

### 5.3 Cards

Cards devem ser usados apenas para agrupar informações relacionadas.

Usar card para:

- resumo de uma entidade;
- bloco de formulário;
- agrupamento de métricas úteis;
- item de lista com ações;
- painel de informação.

Não usar card para:

- decoração vazia;
- preencher espaço;
- criar aparência de dashboard sem necessidade;
- repetir informações sem função.

Regras:

- card deve ter título claro;
- card deve ter conteúdo útil;
- ações devem ficar próximas ao contexto;
- evitar vários cards com o mesmo peso visual;
- evitar cards excessivamente coloridos.

---

### 5.4 Tabelas e listas

Tabelas devem ser legíveis e funcionais.

Regras:

- cabeçalhos claros;
- alinhamento consistente;
- ações por linha discretas;
- estado vazio útil;
- paginação ou rolagem quando necessário;
- em mobile, considerar cards/lista em vez de tabela espremida;
- evitar colunas demais;
- valores importantes devem ter destaque moderado.

Estados obrigatórios:

- carregando;
- vazio;
- erro;
- sem resultados após filtro;
- dados parciais, quando aplicável.

---

### 5.5 Modais

Modais devem ser usados com moderação.

Regras:

- título direto;
- descrição curta;
- ação principal clara;
- ação de cancelar disponível;
- foco visual no conteúdo;
- não usar modal para tudo;
- ações destrutivas devem exigir confirmação clara;
- modal deve funcionar bem em mobile.

---

### 5.6 Navegação

Regras:

- menu deve ser previsível;
- item ativo deve ser visível;
- nomes devem ser objetivos;
- evitar excesso de níveis;
- evitar ícones sem texto quando isso prejudicar clareza;
- mobile deve ter navegação adaptada;
- páginas internas podem usar breadcrumbs quando necessário.

---

## 6. Estados obrigatórios

Toda tela relevante deve considerar:

- carregando;
- vazio;
- erro;
- sucesso;
- permissão negada;
- dados incompletos;
- primeira utilização;
- sem resultados;
- offline ou falha de rede, quando aplicável;
- mobile;
- desktop.

Estados não devem ser genéricos. Eles precisam orientar o usuário.

Exemplo ruim:

`Erro inesperado.`

Exemplo melhor:

`Não foi possível carregar os orçamentos. Verifique sua conexão e tente novamente.`

---

## 7. Responsividade

A interface deve funcionar bem em:

- mobile;
- tablet;
- desktop;
- telas largas.

Regras:

- não apenas reduzir a tela;
- reorganizar layout quando necessário;
- formulários em mobile devem usar uma coluna;
- botões devem ter área de toque confortável;
- tabelas devem se adaptar;
- menus devem ser utilizáveis no toque;
- textos não devem quebrar de forma ruim;
- ações importantes não devem sumir no mobile.

Critérios mínimos:

- nenhuma rolagem horizontal indevida;
- botões clicáveis em telas pequenas;
- textos legíveis;
- campos acessíveis;
- navegação funcional;
- estados de erro visíveis.

---

## 8. Microcopy

Textos da interface devem ser claros, diretos e úteis.

Regras:

- usar verbos de ação;
- evitar frases vagas;
- evitar linguagem exageradamente comercial;
- evitar frases típicas de template IA;
- mensagens de erro devem orientar correção;
- textos vazios devem dizer o que fazer;
- botões devem dizer exatamente a ação.

Exemplos ruins:

- `Transforme sua experiência`
- `Gerencie tudo em um só lugar`
- `Desbloqueie seu potencial`
- `Dashboard inteligente e poderoso`
- `Comece sua jornada`
- `Experiência fluida e moderna`

Exemplos bons:

- `Criar orçamento`
- `Adicionar cliente`
- `Salvar alterações`
- `Ver pedidos pendentes`
- `Corrigir campos obrigatórios`
- `Nenhum orçamento encontrado`
- `Cadastrar primeiro produto`

---

## 9. Acessibilidade básica

Regras mínimas:

- contraste adequado;
- labels visíveis;
- foco de teclado perceptível;
- botões com texto claro;
- não depender apenas de cor;
- mensagens de erro associadas ao campo;
- ordem de navegação lógica;
- áreas clicáveis confortáveis;
- textos legíveis em mobile.

---

## 10. Padrões proibidos

O agente ou desenvolvedor NÃO deve:

- usar gradientes chamativos sem necessidade;
- criar cards decorativos sem função;
- usar ícones aleatórios;
- usar textos genéricos de marketing;
- criar dashboard artificial;
- usar animações excessivas;
- misturar estilos visuais;
- alterar paleta sem autorização;
- criar componentes duplicados se já existir padrão;
- sacrificar legibilidade por estética;
- usar sombra forte em todos os elementos;
- usar roxo/azul neon como estética padrão de IA;
- criar telas visualmente bonitas, mas confusas;
- esconder ações importantes;
- ignorar mobile;
- ignorar estados vazios, loading e erro;
- inventar componentes fora do padrão do projeto.

---

## 11. Critérios de aceite visual

Uma tela só deve ser considerada aprovada se:

- a hierarquia visual for clara;
- houver uma ação principal evidente;
- o espaçamento for consistente;
- os componentes seguirem o mesmo padrão;
- os estados de erro, loading e vazio existirem quando aplicáveis;
- a tela funcionar em mobile;
- a tela funcionar em desktop;
- não houver poluição visual;
- não houver textos genéricos;
- não houver elementos decorativos inúteis;
- a interface parecer produto real, não protótipo IA;
- os botões tiverem rótulos claros;
- formulários tiverem labels;
- mensagens de erro forem úteis;
- cores e tipografia estiverem consistentes.

---

## 12. Checklist para cada nova tela

Antes de aprovar uma tela, verificar:

- [ ] título claro;
- [ ] descrição curta, se necessária;
- [ ] ação principal visível;
- [ ] ações secundárias discretas;
- [ ] formulário com labels claros;
- [ ] feedback de erro;
- [ ] feedback de sucesso;
- [ ] loading state;
- [ ] empty state;
- [ ] responsividade mobile;
- [ ] responsividade desktop;
- [ ] acessibilidade básica;
- [ ] consistência com componentes existentes;
- [ ] ausência de aparência genérica de IA.

---

## 13. Instruções para agentes coders

Antes de criar ou alterar qualquer elemento visual, o agente deve:

1. Ler este guia.
2. Verificar componentes existentes.
3. Reutilizar padrões visuais já existentes.
4. Evitar criar novo estilo sem necessidade.
5. Não implementar decoração gratuita.
6. Validar mobile e desktop.
7. Registrar no relatório final como a UI segue este guia.
8. Explicar qualquer desvio.

Se a tarefa não tiver impacto visual, o agente deve registrar:

`Impacto UI/UX: Não aplicável.`

Se houver impacto direto ou indireto, o agente deve registrar:

- quais regras do guia foram aplicadas;
- quais estados foram tratados;
- como a responsividade foi validada;
- se há risco visual restante.

---

## 14. Referências internas

- Telas aprovadas: Não informado.
- Componentes aprovados: Não informado.
- Screenshots de referência: Não informado.
- Decisões visuais anteriores: Não informado.
- Biblioteca de componentes usada: Não informado.