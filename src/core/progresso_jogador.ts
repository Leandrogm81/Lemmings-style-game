/**
 * Interface para o progresso do jogador
 */
export interface ProgressoJogador {
  niveisDesbloqueados: number[];
  estrelasPorNivel: Record<string, number>;
  tempoPorNivel: Record<string, number>;
  tentativasPorNivel: Record<string, number>;
}