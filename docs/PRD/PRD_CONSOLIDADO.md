# PRD — Lemmings Style Game – Versão Consolidada

## 1. Escopo
- **Plataformas**: Mobile (iOS/Android) e PC/desktop.
- **Monetização**: Anúncios intersticiais (ex.: Google AdMob); futura loja cosmética opcional.
- **Progresso**: Salvo localmente (AsyncStorage para mobile, localStorage para PC). Sem login ou nuvem.
- **MVP**: 6–10 níveis fixos, 4 habilidades básicas, tela de painel, reinício rápido, HUD, telas de vitória/derrota.
- **Arte**: **Pixel art clássica** (referência visual em `assets/art/` – sprites em 32 × 32 px, paleta limitada).
- **UI/UX**: Todas as telas seguem **UI_UX_GUIDE.md**.
- **Tempo**: Indicador visual **barra horizontal** na HUD.
- **Design responsivo**: Mobile 4‑7"; desktop base 720p.

## 2. Requisitos Principais (MVP)
| Recurso | Objetivo | Comportamento | Regras | Critério de Aceite |
|---|---|---|---|---|
| Controle de grupo | Guiar criaturas ao objetivo | Seleção + atribuição de habilidade. | 4 habilidades (escavar, construir, bloquear, empurrar). | Todas as criaturas podem ser movimentadas e chegarem ao destino em nível simples. |
| Habilidades especiais | Superar obstáculos | Ativáveis por toque ou clique. | Cooldown visual 2 s; não simultâneas. | Cada habilidade funciona conforme descrito e não causa crash. |
| Reinício rápido | Nova tentativa instantânea | Botão “Reiniciar” recarrega nível imediatamente. | Estado reinicial completo. | Reinício ≤ 300 ms. |
| Anúncios | Monetização | Intersticial após 3 falhas **consecutivas** ou 2 vitórias **consecutivas**. | Não bloqueia UI. | Anúncio carregado e exibido corretamente. |
| Salvamento local | Persistir progresso | Salva níveis desbloqueados, estrelas, tempo, tentativas. | Armazenamento em AsyncStorage/localStorage. | Progresso persiste após fechar e reabrir app. |

## 3. Telas (com especificações UI_UX)
| Tela | Finalidade | Elementos obrigatórios | Observação |
|---|---|---|---|
| Menu inicial | Acesso ao jogo | Botões: Jogar, Opções. | UI_UX: Botão primário #1D4ED8, secundário #475569. |
| Seleção de nível | Escolher fase | Lista linear de ícones; bloqueios graficamente cinza. | Ícone desbloqueado: verde #15803D. |
| Gameplay | Tela de jogo | HUD: contador de criaturas, barra de tempo, 4 botões de habilidade. | Botões: cor primária, raio 8‑10 px, sombra leve. |
| Pausa | Suspender | Menu: Reiniciar, Voltar, Ajustes. | UI_UX: opções secundárias, ícones simples. |
| Vitória/Derrota | Feedback | Estatísticas (criaturas salvas, tempo, estrelas) + botões Avançar/Reiniciar. | Anúncio não bloqueia progresso. |
| Anúncio | Intersticial | Tela cheia placeholder + botão “Sair agora”. | Botão azul #1D4ED8, segue UI_UX. |

## 4. Dados e Entidades
- **ProgressoJogador** – `niveisDesbloqueados[]`, `estrelasPorNivel{}`, `tempoPorNivel{}`, `tentativasPorNivel{}`.
- **LvlConfig** – `id`, `nome`, `requisitosCriaturas = 3`, `listaHabilidadesDisponiveis = [escavar, construir, bloquear, empurrar]`.
- **Criatura** – `id`, `tipo`, `estado` (viva/morta).
- **Anuncio** – `id`, `tipo`, `timestamp`.

## 5. Regras de Negócio
1. Salvar apenas localmente; sem envio ao servidor.
2. Nível só avança ao alcançar o **mínimo de criaturas** definido em `LvlConfig`.
3. Habilidades não simultâneas; cooldown visual 2 s.
4. Anúncio intersticial apenas após 3 falhas ou 2 vitórias consecutivas.
5. Reinício rápido recarrega **todas as entidades** ao estado inicial.
6. Música de fundo opcional; níveis sem incremento de dificuldade não exigem áudio.

## 6. Critérios de Aceite Gerais
- Nenhum crash em sessões de 5 minutos.
- Todas as telas acessíveis em mobile (toque) e PC (mouse/teclado).
- Anúncio não interrompe a UI e exibe botão “Sair agora”.
- Progresso restaurado corretamente em qualquer dispositivo.
- HUD exibe barra de tempo, cores conforme UI_UX (verde sucesso, vermelho falha).
- Desempenho: **60 fps** em dispositivos 2‑3 GHz, 2 GB RAM.
- Cobertura de testes automatizados **≥ 80 %**.

## 7. Estrutura de Pastas do Projeto
```
le­mmings‑style‑game/
│   README.md
│   PRD_CONSOLIDADO.md
│   package.json          # dependências (ex.: Godot export, scripts)
│
├─ docs/
│   └─ design/
│        UI_UX_GUIDE.md
│
├─ assets/
│   ├─ art/               # pixel sprites (PNG 32x32), tilesets
│   ├─ audio/             # efeitos, música opcional
│   └─ fonts/            # tipografia recomendada
│
├─ src/
│   ├─ core/             # lógica de física, entidades
│   ├─ ui/               # telas HUD, menus (respeita UI_UX_GUIDE)
│   └─ game/             # níveis, configuração LvlConfig
│
├─ ios/   (export do Godot / Cocos2d‑x)
├─ android/
└─ pc/    (build desktop)
```
- **`assets/`** contém apenas recursos pixel art (não há arquivos vetoriais).
- **`src/`** mantém código‑fonte separado por camada (core, ui, game).
- Cada plataforma tem sua pasta de exportação gerada pela engine escolhida.

## 8. Compatibilidade de Plataforma
- **Builds específicos**: gerar exportações separadas para **iOS**, **Android** e **PC** (Windows/macOS/Linux). Cada build inclui apenas os assets necessários para a plataforma alvo.
- **Mono‑bundle** opcional: utilizar exportação *WebAssembly* (HTML5) que pode rodar em navegadores modernos; não será o foco inicial, mas a estrutura de pastas suporta essa opção.

## 9. Riscos Técnicos Mitigados
- **Física/colisão**: usar motor 2D testado (Godot Physics2D) e limitar criaturas ativas a 50.
- **Performance em baixa spec**: assets otimizados, sprite atlases, limitar partículas.
- **SDK de anúncios**: abstração que permite troca de fornecedor sem refatoração.

## 10. Checklist de Mudanças Realizadas
- ✅ Arte definida como **pixel art clássica** e estrutura de assets criada.
- ✅ Indicador de tempo implementado como **barra horizontal**.
- ✅ Estrutura de pastas do projeto especificada.
- ✅ Decisão de builds: gerar **builds específicos** por plataforma (iOS, Android, PC) com suporte opcional a mono‑bundle.
- ✅ Regras de negócio, critérios de aceite, telas e entidades atualizados.
- ✅ Removido ponto de decisão sobre engine; preferência declarada (Godot ou Cocos2d‑x) permanece.

## 11. Pontos de Decisão Ainda Pendentes
- **Engine escolhida**: Godot 4.x ou Cocos2d‑x 7.x (deve ser confirmado).
- **Métrica de desempenho exata**: FPS alvo > 60, uso de memória < 150 MB; detalhar nos testes.
- **Estratégia de pós‑lançamento**: atualizações de conteúdo, eventos sazonais.

---

**Arquivo salvo em:** `PRD_CONSOLIDADO.md`