# PRD — Lemmings Style Game

## 1\. Resumo executivo

Jogo de puzzle/platformer inspirado em Lemmings, focado em desafio competitivo e nostalgia, acessível a todas as idades, para mobile (iOS/Android) e PC. Monetização inicial via anúncios, progresso salvo localmente.

## 2\. Objetivo do produto

Oferecer experiência nostálgica de Lemmings com mecânicas de controle de multidão, habilidades especiais e nível de dificuldade gradativo, visando alto engajamento e retenção.

## 3\. Problema a resolver

Falta de jogos de puzzle modernos que capturem a essência clássica de Lemmings, atendendo tanto a jogadores casuais quanto entusiastas retro.

## 4\. Público-alvo e personas

* **Persona 1 – Jogador casual de puzzle** (18‑35, mobile/PC, sessões curtas).
* **Persona 2 – Fã de jogos retro** (25‑45, PC/mobile, busca experiência fiel ao original).

## 5\. Escopo do MVP

* Core gameplay: controle de grupo, 4‑5 habilidades básicas, níveis fixos (5‑10).
* Tela inicial, seleção de nível, gameplay, tela de vitória/derrota, pausa.
* Sistema de reinício rápido.
* Integração com SDK de anúncios (intersticial).
* Salvamento local de progresso.

## 6\. Fora de escopo

* Editor de níveis avançado.
* Multiplayer online/cooperativo.
* Loja de itens cosméticos.
* Sincronização de progresso via nuvem.
* Narrativa profunda ou cutscenes.

## 7\. Funcionalidades principais

|Nome|Objetivo|Comportamento esperado|Regras|Critérios de aceite|
|-|-|-|-|-|
|Controle de grupo|Guiar criaturas ao destino|Jogador arrasta/seleciona criaturas e atribui habilidades|Apenas habilidades disponíveis no MVP|Jogador consegue mover todas criaturas em nível simples|
|Habilidades especiais|Permitir superar obstáculos|4‑5 habilidades (escavar, construir, bloquear, empurrar) ativáveis por toque/click|Cada habilidade tem cooldown visual|Cada habilidade funciona conforme descrito e não causa crash|
|Reinício rápido|Permitir nova tentativa instantânea|Botão de reinício recarrega nível sem atraso perceptível|Estado deve ser reiniciado totalmente|Reinício ocorre em ≤ 300 ms|
|Anúncios|Monetização inicial|Exibir anúncio intersticial após 3 falhas ou 2 vitórias|Não bloquear UI|Anúncio carregado e exibido corretamente|
|Salvamento local|Persistir progresso|Salvar níveis desbloqueados e estrelas em storage local|Dados não são enviados ao servidor|progresso persiste após fechar e reabrir app|

## 8\. Funcionalidades secundárias

* Tutorial interativo (ponto de decisão).
* Leaderboards locais (ponto de decisão).
* Loja cosmética (ponto de decisão).

## 9\. Fluxos de usuário

1. **Início** – Abrir app → tela inicial → botão “Jogar”.
2. **Seleção de nível** – Lista linear de níveis → escolher.
3. **Gameplay** – Tela de jogo, HUD com habilidades, controle de criaturas.
4. **Falha** – Exibir tela de derrota → botão “Reiniciar”.
5. **Vitória** – Tela de vitória com estatísticas → desbloquear próximo nível.
6. **Anúncio** – Após 3 falhas ou 2 vitórias, mostrar intersticial.

## 10\. Telas e componentes

* **Tela inicial**: Botões Jogar, Opções, Créditos.
* **Tela de seleção**: Lista ou grade de níveis, ícones de bloqueio/desbloqueio.
* **HUD de gameplay**: Contador de criaturas, botões de habilidades, timer.
* **Tela de pausa**: Resume, Reiniciar, Voltar ao menu.
* **Tela de vitória/derrota**: Estatísticas, botão avançar/reiniciar.
* **Tela de anúncio**: Placeholder de SDK.

## 11\. Dados e entidades

* **ProgressoJogador**: níveisDesbloqueados\[], estrelasPorNivel{}, configAudio{}, configControles{}
* **Nivel**: id, nome, requisitosCriaturas, listaHabilidadesDisponiveis
* **Criatura**: id, tipo, estado (viva/morta)
* **Anuncio**: id, tipo, timestamp

## 12\. Regras de negócio

* O jogador deve salvar progresso somente localmente.
* Cada nível tem número mínimo de criaturas que devem chegar ao destino.
* Habilidades têm cooldown visual e não podem ser usadas simultaneamente.
* Anúncios só podem ser exibidos após 3 falhas ou 2 vitórias (regra de frequência).
* Não é permitido avançar nível sem cumprir requisito mínimo.

## 13\. Permissões e papéis de usuário

* **Visitante**: acesso ao jogo sem login, progresso local.
* **Administrador (ponto de decisão)**: acesso a configurações de anúncios e métricas.

## 14\. Integrações

* SDK de anúncios (ex.: Google AdMob).
* Armazenamento local (AsyncStorage/Web Storage).
* (Ponto de decisão) Integração futura com Supabase para nuvem.

## 15\. Requisitos não funcionais

* **Desempenho**: 60 fps em dispositivos de baixa especificação.
* **Responsividade**: UI adaptada a telas de 4‑7 polegadas (mobile) e desktop.
* **Segurança**: Dados apenas locais, nenhuma comunicação externa além de anúncios.
* **Acessibilidade**: Texto legível, contrastes conforme UI\_UX\_GUIDE, suporte a leitor de tela básico.
* **Confiabilidade**: Reinício de nível sem perda de estado.

## 16\. Critérios de aceite gerais

* Todas as funcionalidades do MVP operam sem crashes.
* Anúncio é exibido nos momentos corretos.
* Progresso persiste após fechar o app.
* UI segue o `UI\_UX\_GUIDE.md`.
* Testes automatizados cobrem 80 % das funções principais.

## 17\. Riscos e mitigação

* **Física/c colisão**: usar engine 2D comprovada (ponto de decisão).
* **Desempenho em mobiles baixos**: otimizar assets, limitar número de entidades simultâneas.
* **Frustração com anúncios**: frequência controlada, opção de “sair agora”.
* **Escopo inflacionado**: manter lista “Fora de escopo” firme, bloquear mudanças sem revisão.

## 18\. Métricas de sucesso

* Retenção de 7 dias > 30 %.
* Média de sessão > 5 min.
* Avaliação média nas lojas ≥ 4 estrelas.
* taxa de falhas crash < 1 %.

## 19\. Pontos de decisão pendentes

* **Objetivo central** (entreter, educar, competir, nostalgia).
* **Público‑alvo principal** (faixa etária, plataformas).
* **Número e tipos de habilidades** no lançamento.
* **Modelo de monetização** definitivo (ads apenas ou incluir compras).
* **Salvamento de progresso**: local apenas vs nuvem.
* **Inclusão de tutorial interativo**.
* **Uso de SDK de anúncios específico**.
* **Permissões de administrador** e painel interno.
* **Engine/language** (ponto de decisão, ainda não definido).

## 20\. Resumo para o agente de implementação

* Construir MVP conforme escopo acima, obedecendo ao UI\_UX\_GUIDE.
* Não avançar além das funcionalidades listadas sem decisão pré‑via.
* Implementar salvamento local, anúncios controlados, e fluxo de níveis.
* Marcar todos os “Ponto de decisão” como TODOs para revisão humana antes de codificar.

\---

**Checklist de qualidade do PRD**

* \[x] Escopo claro
* \[x] Regras claras
* \[x] Critérios de aceite claros
* \[x] Telas definidas
* \[x] Dados definidos
* \[x] Riscos mapeados
* \[x] Fora de escopo definido
* \[x] Pronto para virar plano de implementação

