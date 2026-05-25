# Sprint 14 — Polish & QA

**Data:** 2026-05-25
**Objetivo:** Refinar a experiência de jogo, configurar repositório remoto, ajustar balanceamento, adicionar feedback visual e garantir responsividade.

---

## Prioridades

| Prioridade | Item | Esforço | Risco |
|------------|------|---------|-------|
| P0 | GitHub remote + push | 5min | Baixo |
| P0 | Balanceamento de gameplay | 2h | Médio |
| P1 | Animações e feedback visual | 3h | Médio |
| P1 | Responsividade mobile | 2h | Médio |
| P2 | README.md do projeto | 30min | Baixo |

---

## Tarefas

### T1 — Configurar repositório GitHub (P0)

- [ ] Adicionar remote `origin` apontando para `https://github.com/Leandrogm81/Lemmings-style-game`
- [ ] Fazer push da branch atual (`main` ou `master`)
- [ ] Verificar se o repositório remoto está acessível

### T2 — Balanceamento de gameplay (P0)

**Problema:** O gap na coluna 5 exige usar a skill Construir. A velocidade das criaturas (1 coluna/tick a cada 800ms), o timer (60s) e a meta (3 de 5) nunca foram testados com jogadores reais.

**Tarefas:**
- [ ] Rodar `npm run dev` e testar o nível 1 manualmente
- [ ] Ajustar `TICK_MS` em `GameScreen.tsx` (linha 44) se necessário (sugestão: 600-1000ms)
- [ ] Ajustar `tempoTotalMs` (linha 152): 60s pode ser muito curto para aprendizado
- [ ] Ajustar `metaCriaturas` (linha 153): 3 de 5 parece razoável
- [ ] Verificar se o gap na coluna 5 forçou o uso de Construir — se sim, considerar tornar o caminho mais evidente
- [ ] Documentar os parâmetros de balanceamento para níveis futuros
- [ ] Atualizar/adicionar testes se houver mudança na lógica de engine

**Parâmetros a documentar:**
| Parâmetro | Atual | Sugestão inicial |
|-----------|-------|-----------------|
| TICK_MS | 800ms | 600ms (mais dinâmico) |
| tempoTotalMs | 60000 (60s) | 90000 (90s — mais espaço para aprender) |
| metaCriaturas | 3/5 | 3/5 (mantido) |
| Criaturas iniciais | 5 | 5 (mantido) |
| Passos por tick | 1 (2 com empurrar) | 1 (mantido) |

### T3 — Feedback visual e animações (P1)

**Problema atual:** Criaturas são círculos estáticos que somem ao morrer. Sem feedback visual de ações.

**Tarefas:**
- [ ] Adicionar animação CSS de **movimento suave** (transition/transform) nas criaturas ao andar
- [ ] Adicionar **indicador visual de célula alvo** quando uma skill está selecionada (hover highlight)
- [ ] Adicionar **feedback de skill aplicada** (flash/glow na célula alvo)
- [ ] Adicionar animação de **morte da criatura** (fade out + tombo)
- [ ] Adicionar animação de **chegada à saída** (pulo/brilho)
- [ ] Melhorar a renderização das criaturas (círculo → algo com mais personalidade visual, sem exageros)

**Regras do UI_UX_GUIDE (seção 10):**
- Animações não devem ser excessivas
- Devem ter função, não decoração
- Sem gradientes chamativos ou efeitos genéricos

### T4 — Responsividade mobile (P1)

**Problema:** `CELL_SIZE = 48px` fixo. Em telas < 480px, o grid 10×6 ultrapassa a largura da tela.

**Tarefas:**
- [ ] Calcular `CELL_SIZE` dinamicamente baseado no viewport width (via CSS ou JS)
- [ ] Usar `min(48px, (100vw - 32px) / COLS)` como tamanho da célula
- [ ] Garantir que HUD não quebre em telas pequenas
- [ ] Garantir que botões de skill tenham área de toque ≥ 44px (guideline mobile)
- [ ] Testar em viewport 375px (iPhone SE) e 414px (iPhone Plus)
- [ ] Verificar se não há rolagem horizontal indevida

### T5 — README.md do projeto (P2)

- [ ] Criar `README.md` com:
  - Descrição do jogo
  - Stack (React 19 + Vite 8 + TypeScript 6)
  - Como rodar (`npm run dev`, `npm run build`)
  - Estrutura do projeto (resumo)
  - Link para o repositório GitHub

---

## Regras da Sprint

- Toda alteração em `engine.ts` exige novos testes
- Não modificar `skills.ts` (bug já corrigido)
- Não modificar `Button.tsx` (finalizado)
- Não usar `any` ou `@ts-ignore`
- Rodar `npm test` e `npm run typecheck` antes de cada commit
- Testar manualmente com `npm run dev` após cada tarefa

## Critérios de aceite

1. Repositório no GitHub com todo o código
2. Jogo jogável, balanceado e divertido
3. Criaturas com movimento visual suave
4. Grid adaptável a viewport mobile
5. README.md informativo
6. Testes passando (≥ 119), typecheck zero
