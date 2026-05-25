# Auditoria Visual UI/UX — Sprint 12

**Data:** 2026-05-24
**Guia de referência:** `docs/design/UI_UX_GUIDE.md`
**Tokens:** `src/ui/theme.ts`
**Viewports testados:** Desktop (~1280px via browser snapshot), Mobile (via código/media queries)

---

## Resumo Geral

**Conformidade geral:** ALTA. Todos os componentes usam tokens do `theme.ts`, que por sua vez seguem o `UI_UX_GUIDE.md`. 
Microcopy claro em português, botões com verbos de ação, hierarquia visual organizada.

**Discrepâncias encontradas:** 0 críticas, 2 médias, 3 sugestões.

---

## Tela 1 — MenuScreen

**Arquivo:** `src/ui/MenuScreen.tsx`
**Tokens usados:** `colors.background`, `colors.primary`, `fontSize.title`, `fontWeight.bold`, `spacing`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Cores | ✅ | `colors.background` (#F8FAFC), `colors.primary` (#1D4ED8) para botão "Jogar" |
| Tipografia | ✅ | Título com `fontSize.title` (32px), `fontWeight.bold` (700) |
| Espaçamento | ✅ | Padding usa `spacing.md` (16px) |
| Botões | ✅ | "Jogar" (verbo), "Opções" (substantivo, mas aceitável) |
| Debug buttons | ⚠️ MÉDIA | Botões `[Debug] Vitória` e `[Debug] Derrota` com colchetes — aparência técnica. Aceitável para debug, mas devem ser removidos antes de release |
| Ação principal | ✅ | "Jogar" é a ação principal evidente |
| Responsividade | ✅ | Layout centralizado com maxWidth, funciona em mobile |
| Microcopy | ✅ | "Jogar", "Opções" — diretos, sem genéricos de IA |
| Aparência | ✅ | Limpo, profissional, sem decoração excessiva |

**Estados:** Loading (N/A — tela estática), Erro (N/A), Vazio (N/A)

---

## Tela 2 — LevelSelectionScreen

**Arquivo:** `src/ui/LevelSelectionScreen.tsx`
**Tokens usados:** `colors.background`, `colors.textPrimary`, `fontSize.sectionTitle`, `spacing.lg`, `spacing.sm`, `spacing.md`, `spacing.xl`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Cores | ✅ | Fundo `colors.background`, texto `colors.textPrimary` |
| Tipografia | ✅ | Título `fontSize.sectionTitle` (22px), `fontWeight.semibold` (600) |
| Espaçamento | ✅ | Grid gap `spacing.sm` (12px), padding `spacing.md` (16px) |
| Botão voltar | ✅ | "← Voltar" — verbo claro, estilo secondary |
| Grid de níveis | ✅ | 2 colunas desktop, 1 coluna mobile (`@media max-width: 639px`) |
| Cards de nível | ✅ | Nome do nível + status (Disponível/Bloqueado) |
| Responsividade | ✅ | Media query ativa em 639px — reorganiza para 1 coluna |
| Microcopy | ✅ | "Selecionar Nível", "Disponível", "Bloqueado" — claros |
| Aparência | ✅ | Layout em grid organizado, sem poluição visual |

**Estados:** Níveis bloqueados têm indicação visual (texto "Bloqueado" + distinção no LevelItem)

---

## Tela 3 — AdScreen

**Arquivo:** `src/ui/AdScreen.tsx`
**Tokens usados:** `colors.surface`, `colors.primary`, `colors.textSecondary`, `colors.textMuted`, `colors.error`, `colors.border`, `borderRadius.modal`, `shadow.modal`, `spacing`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Cores | ✅ | Overlay escuro `rgba(0,0,0,0.85)`, card `colors.surface` (#FFFFFF) |
| Tipografia | ✅ | `fontSize.subtitle` (17px), `fontSize.body` (15px) |
| Modal | ✅ | `borderRadius.modal` (16px), `shadow.modal`, maxWidth 360px |
| Botão fechar | ✅ | "Sair agora" — verbo claro. Button.onClick corrigido na Sprint 11 |
| Estado loading | ✅ | Spinner CSS + "Carregando anúncio..." |
| Estado erro | ✅ | Texto de erro em `colors.error` + botão "Fechar" |
| Estado padrão | ✅ | "Anúncio" + placeholder "Espaço reservado para anúncio intersticial." |
| Microcopy | ✅ | "Sair agora", "Carregando anúncio...", "Fechar" — diretos |
| Responsividade | ✅ | Overlay cobre 100% viewport, card com maxWidth 360px, padding responsivo |
| Aparência | ✅ | Modal profissional com backdrop escuro, sem decoração |

**Estados testados via browser:** Loading → Default → Fechar ✅ (confirmado funcional)

---

## Componente 4 — Button

**Arquivo:** `src/ui/Button.tsx`
**Tokens usados:** `colors.primary`, `colors.primaryHover`, `colors.textSecondary`, `colors.border`, `borderRadius.button`, `fontSize.button`, `fontWeight.semibold`, `shadow.button`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Variantes | ✅ | Primary e secondary implementados |
| Hover | ✅ | Primary: `colors.primaryHover` (#1E40AF), Secondary: #F1F5F9 |
| Disabled | ⚠️ MÉDIA | **Não implementado.** Botão não tem estilo `:disabled` nem prop `disabled` |
| Loading | ❌ SUGESTÃO | **Não implementado.** Sem estado de loading (impediria clique duplicado) |
| Ação por verbo | ✅ | Uso consistente: "Jogar", "Sair agora", "← Voltar", "Fechar" |
| Cantos | ✅ | `borderRadius.button` (8px) — dentro da faixa 8-10px |
| Sombra | ✅ | `shadow.button` — leve, conforme guia |
| MinHeight | ✅ | 48px para toque mobile confortável |

---

## Componente 5 — SkillButton

**Arquivo:** `src/ui/SkillButton.tsx`
**Tokens usados:** `colors.primary`, `spacing`, `fontSize`, `borderRadius`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Estado ativo/disabled | ✅ | `disabled` nativo do HTML quando `ativo=false` |
| Emoji | ❌ SUGESTÃO | Usa emoji como ícone (⛏️, 🧱, 🚫, 💨). Guia diz "evitar ícones aleatórios", mas emojis são funcionais para skills de jogo |
| Cores | ✅ | Usa `colors.primary` para borda quando ativo |
| Microcopy | ✅ | Nomes de skills em português: "Escavar", "Construir", "Bloquear", "Empurrar" |

---

## Componente 6 — HUD

**Arquivo:** `src/ui/HUD.tsx`
**Tokens usados:** `colors.surface`, `colors.border`, `spacing`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Layout | ✅ | Barra fixa com informações de jogo |
| Timer | ✅ | TimerBar com porcentagem e texto de tempo |
| Skills | ✅ | 4 SkillButtons: Escavar, Construir, Bloquear, Empurrar |
| Contador | ✅ | "x5" para criaturas restantes |
| Responsividade | ❌ SUGESTÃO | HUD fixo pode ocupar espaço excessivo em mobile. Verificar em viewport 375px |

---

## Componente 7 — TimerBar

**Arquivo:** `src/ui/TimerBar.tsx`
**Tokens usados:** `colors.primary`, `colors.border`, `borderRadius`, `spacing`

| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Visual | ✅ | Barra de progresso horizontal com cor primária |
| Clamp | ✅ | Porcentagem limitada entre 0-100 |
| Texto | ✅ | Exibe "Xs" quando `tempoRestante` fornecido |

---

## Componente 8 — LevelItem

**Arquivo:** `src/ui/LevelItem.tsx`
| Critério | Conformidade | Observação |
|----------|-------------|------------|
| Estados | ✅ | Bloqueado vs Disponível com distinção visual |
| Card | ✅ | Nome do nível + status |
| Microcopy | ✅ | "Disponível", "Bloqueado" — diretos |

---

## Tabela de Discrepâncias

| # | Severidade | Componente | Item | Descrição |
|---|-----------|------------|------|-----------|
| 1 | MÉDIA | MenuScreen | Debug buttons | Botões `[Debug]` com colchetes têm aparência técnica. Remover antes de release |
| 2 | MÉDIA | Button | Estado disabled | Sem estilo visual para botão desabilitado (prop `disabled` não implementado) |
| 3 | SUGESTÃO | Button | Estado loading | Sem prevenção de clique duplicado durante carregamento |
| 4 | SUGESTÃO | SkillButton | Emojis | Emojis como ícones — aceitável para jogo, mas documentar decisão |
| 5 | SUGESTÃO | HUD | Mobile | HUD fixo pode precisar de ajuste em telas pequenas |

---

## Validação de Responsividade

| Viewport | MenuScreen | LevelSelection | AdScreen | HUD |
|----------|-----------|---------------|---------|-----|
| Desktop (1280px) | ✅ Centralizado | ✅ Grid 2 colunas | ✅ Modal centralizado | ✅ Barra horizontal |
| Mobile (375px) | ✅ Centralizado | ✅ Grid 1 coluna (media query) | ✅ Modal responsivo | ⚠️ Verificar |

---

## Microcopy — Verificação anti-IA genérica

| Texto | Classificação | Observação |
|-------|--------------|------------|
| "Lemmings" | ✅ | Título do jogo |
| "Jogar" | ✅ | Verbo de ação |
| "Opções" | ✅ | Navegação |
| "Selecionar Nível" | ✅ | Descritivo |
| "Disponível" / "Bloqueado" | ✅ | Estados claros |
| "Sair agora" | ✅ | Verbo + urgência |
| "Carregando anúncio..." | ✅ | Estado claro |
| "Fechar" | ✅ | Ação |
| "← Voltar" | ✅ | Navegação com seta |
| "Escavar" / "Construir" / etc. | ✅ | Ações de gameplay |
| "Espaço reservado para anúncio intersticial." | ✅ | Placeholder honesto |
| "[Debug] Vitória" / "[Debug] Derrota" | ⚠️ | Técnico — OK para dev |

**Nenhum texto genérico de IA detectado.** Todos os textos são funcionais e diretos.

---

## Conclusão

O MVP segue o `UI_UX_GUIDE.md` de forma consistente. Tokens do `theme.ts` são usados em todos os componentes. 
A interface parece um produto real, não um protótipo genérico de IA. 
As 2 discrepâncias médias (debug buttons, Button disabled) são de baixa prioridade para MVP.
As 3 sugestões podem ser tratadas em sprints futuras.

**Aprovado para MVP.** ✅
