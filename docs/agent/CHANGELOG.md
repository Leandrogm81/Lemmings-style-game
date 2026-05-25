# CHANGELOG

## Sprint 14 — Polish & QA (2026-05-25)

### Reforma visual completa
- **theme.ts**: Paleta escura de jogo (#1a1a2e), cores para terreno, abismo, criaturas, saída
- **MenuScreen**: Logo "LEMMINGS" com glow, criaturas animadas com olhos e perninhas, fundo com estrelas e chão
- **LevelSelectionScreen**: Título "Níveis", cards escuros com destaque hover
- **LevelItem**: Cards reformulados com borda dinâmica, ícone 🔒 para bloqueados
- **GameScreen**: Grid com tiles xadrez (terrain/terrainDark), gap com borda vermelha pulsante, saída com glow verde + 🚪
- **Criaturas**: De bolinhas 12px para bonecos com olhos, corpo, perninhas, sorriso (salvas)
- **HUD**: Timer com gradiente dinâmico (verde→amarelo→vermelho), contador 👤
- **SkillButton**: Ícones novos (⛏️🧱🛡️💨), destaque laranja quando selecionado
- **VictoryScreen / DefeatScreen**: Cards escuros com glow, dica na derrota
- **TimerBar**: Gradiente dinâmico com base na porcentagem de tempo
- **Button**: Gradiente laranja, glow hover

### Balanceamento
- Gap movido da coluna 5 → coluna 7 (mais tempo para reagir)
- TICK_MS: 800ms → 600ms (ritmo mais dinâmico)
- Timer: 60s → 90s (mais espaço para aprender)
- Criaturas: spawn escalonado (1 inicial + 4 na fila, a cada 4 ticks, max 2 simultâneas)
- **engine.ts**: Sistema de spawn queue (`filaSpawn`, `intervaloSpawn`, `maxCriaturasAtivas`)

### Correções
- **engine.ts**: Validação de `metaCriaturas` agora conta criaturas da fila de spawn (DEC-011)
- **Responsividade**: CELL_SIZE dinâmico baseado no viewport (`Math.max(32, Math.min(56, viewport/COLS))`)

### Testes
- 121 testes (era 119), 10 suites (era 9)
- Novo teste E2E: fluxo completo Nível 1 (Construir → vitória, sem Construir → derrota)
- Testes de componente atualizados para novo visual

### Documentação
- README.md com instruções, estrutura e stack
- Sprint 14 plan em `docs/planos/Sprint14/`
- GitHub remote configurado: `https://github.com/Leandrogm81/Lemmings-style-game`

### Métricas
- Testes: 121 (era 119)
- Suites: 10 (era 9)
- Typecheck: zero erros
- Build: 903ms
