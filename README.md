# Lemmings Style Game 🎮

Um jogo web estilo Lemmings construído com **React 19 + Vite 8 + TypeScript**.

Salve suas criaturas guiando-as através de níveis com obstáculos usando habilidades especiais!

## 🎯 Como jogar

```
npm run dev     # Iniciar servidor de desenvolvimento (porta 3000)
npm run build   # Build de produção
npm test        # Rodar testes (121 testes)
npm run typecheck  # Verificar tipos TypeScript
```

1. Clique em **Jogar** no menu principal
2. Selecione um nível disponível
3. Use as habilidades (Escavar, Construir, Bloquear, Empurrar) para ajudar as criaturas a chegar na saída
4. Salve pelo menos 3 de 5 criaturas para vencer!

## 🧱 Nível 1 — Tutorial

- **Objetivo:** Preencher o buraco (gap) na coluna 7 usando a habilidade **Construir**
- Selecione 🧱 Construir e clique no grid sobre o buraco (destacado em vermelho)
- As criaturas andam automaticamente — corra contra o tempo!

## 🏗️ Stack

| Tecnologia | Versão |
|-----------|--------|
| React | 19 |
| Vite | 8 |
| TypeScript | 6 |
| Vitest | 4 |
| ESLint | 10 (flat config) |

## 📁 Estrutura

```
src/
├── game/           # Engine do jogo (grid, skills, spawn)
│   ├── engine.ts   # Game loop, movimentação, vitória/derrota
│   ├── skills.ts   # Gerenciamento de habilidades
│   └── level_manager.ts
├── ui/             # Componentes React
│   ├── MenuScreen.tsx
│   ├── GameScreen.tsx
│   ├── HUD.tsx / TimerBar.tsx
│   ├── VictoryScreen.tsx / DefeatScreen.tsx
│   ├── SkillButton.tsx / Button.tsx
│   ├── LevelSelectionScreen.tsx / LevelItem.tsx
│   └── theme.ts    # Tokens de estilo
├── ads/            # Sistema de anúncios intersticiais
├── storage/        # Persistência (localStorage)
└── core/           # Tipos e interfaces
```

## 🧪 Testes

121 testes em 10 suites — cobrindo engine, componentes, ads e fluxo E2E.

```
npm test            # Todos os testes
npm run test:watch  # Watch mode
npm run test:coverage  # Cobertura
```

## 🎨 Design

Tema escuro com paleta noturna (#1a1a2e), criaturas em estilo pixel-art suave, grid com tiles de terra e destaques visuais para obstáculos e saída.

## 🔗 Links

- [Repositório GitHub](https://github.com/Leandrogm81/Lemmings-style-game)
