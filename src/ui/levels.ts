/**
 * Dados de níveis com integração de progresso do jogador.
 *
 * Os níveis são carregados com estado de desbloqueio baseado no
 * progresso salvo via storage/progress.ts.
 */

import { loadProgress } from '../storage/progress';
import type { ProgressoJogador } from '../core/progresso_jogador';

export interface LevelData {
  id: number
  nome: string
  desbloqueado: boolean
}

/** Todos os níveis do jogo (dados base) */
const TODOS_NIVEIS: Omit<LevelData, 'desbloqueado'>[] = [
  { id: 1, nome: 'Nível 1' },
  { id: 2, nome: 'Nível 2' },
  { id: 3, nome: 'Nível 3' },
  { id: 4, nome: 'Nível 4' },
  { id: 5, nome: 'Nível 5' },
];

/**
 * Retorna a lista de níveis com estado de desbloqueio baseado no progresso salvo.
 *
 * Regra: O nível 1 sempre está desbloqueado. Níveis 2+ só estão
 * desbloqueados se aparecem em `niveisDesbloqueados` no progresso.
 * Se não houver progresso salvo, apenas o nível 1 está desbloqueado.
 */
export function getNiveis(): LevelData[] {
  const resultado = loadProgress();
  const progresso: ProgressoJogador | null =
    resultado.sucesso ? resultado.dados : null;

  return TODOS_NIVEIS.map((nivel) => ({
    ...nivel,
    desbloqueado:
      nivel.id === 1 ||
      (progresso?.niveisDesbloqueados?.includes(nivel.id) ?? false),
  }));
}

/**
 * Versão síncrona/estática para uso em testes e renderização SSR.
 * Aceita um ProgressoJogador opcional para controle total.
 *
 * Se nenhum progresso for fornecido, apenas o nível 1 está desbloqueado.
 */
export function getNiveisComProgresso(
  progresso?: ProgressoJogador | null,
): LevelData[] {
  return TODOS_NIVEIS.map((nivel) => ({
    ...nivel,
    desbloqueado:
      nivel.id === 1 ||
      (progresso?.niveisDesbloqueados?.includes(nivel.id) ?? false),
  }));
}

// Mantém compatibilidade com código existente que importa `niveis`
export const niveis: LevelData[] = getNiveis();
