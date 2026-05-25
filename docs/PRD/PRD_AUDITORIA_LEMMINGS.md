# Revisão Crítica do PRD – Lemmings Style Game

## Resumo da avaliação
O PRD define um escopo claro para um jogo de estilo Lemmings com monetização via anúncios e salvamento local. No entanto, existem lacunas críticas relacionadas à ambiguidade em definições técnicas, decisões pendentes fundamentais e falta de detalhes nos critérios de aceite específicos.

## Achados críticos
1. **Referência ao UI_UX_GUIDE.md sem inclusão**
   * Problama: O PRD não replica as diretrizes básicas (paleta, tipografia, componentes). Sem isso, o desenvolvedor pode criar UI genérica ou incorreta.
   * Correção: Incluir trechos essenciais no PRD, como cores primárias, fonte padrão, e tamanhos de botão.

2. **Quantidade de habilidades indefinida**
   * Problema: “4‑5 habilidades básicas” não determina exato niúmero nem seus comportamentos.
   * Correção: Definir 4 habilidades obrigatórias (ex.: escavar, construir, bloquear, empurrar) com cooldowns visuais.

3. **Escolha da engine não resolvida**
   * Problema: “Ponto de decisão” pode gerar retro‑compatibilidade e performance indesejada.
   * Correção: Selecionar motor 2D compatível com mobile, recomendando Godot ou Cocos2d‑x.

4. **Modelo de monetização indefinido**
   * Problema: Anúncios vs compras não são definidos, impactando fluxo de receita e foco.
   * Correção: Definir adições de anúncios intersticiais apenas, sem compras no MVP.

## Achados importantes
1. **Critérios de aceitação de anúncios mal especificados**
   * Problema: Falta clareza sobre contagem (consecutiva, por level ou sessão).
   * Correção: Aplicar regra “após 3 falhas consecutivas ou 2 vitórias em nível concluído”.

2. **Tela de anúncio sem layout definido**
   * Problema: Só há “placeholder de SDK”.
   * Correção: Descrever layout seguindo UI_UX_GUIDE e incluir botão “Sair agora”.

3. **Requisito de vitória sem quantia**
   * Problema: “Número mínimo de criaturas” não tem valores.
   * Correção: Exemplo: Level 1: 5 criaturas, 3 devem chegar ao destino.

## Achados opcionais
1. Fallback de anúncios em caso de timeout.
2. Campos `configAudio{} ` e `configControles{}` não são necessários e podem ser removidos ou detalhados.

## Correções recomendadas
- Incluir no PRD: paleta, fonte, padrões de botões.
- Definir número exato de habilidades e seus cooldowns.
- Escolher motor 2D
- Definir claramente o modelo de monetização.
- Detalhar contagem de anúncios.
- Incluir exemplos de níveis.

## Veredito final
**Parcialmente pronto** – o PRD precisa resolver principalmente decisões técnicas e de UI antes que o cliente possa iniciar desenvolvimento.

---

**Local**: `/home/leandrogm81/PRD_AUDITORIA_LEMMINGS.md`