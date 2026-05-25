/**
 * ads_manager.ts — Gerenciador de streaks de falhas/vitórias para anúncios intersticiais.
 *
 * Módulo de lógica pura — sem dependências de React, DOM ou SDK externo.
 * Estado singleton em memória (variável de módulo).
 *
 * Dispara exibição de anúncio quando:
 * - failureStreak >= 3 (3 falhas consecutivas)
 * - winStreak >= 2 (2 vitórias consecutivas)
 */

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface StreakState {
  /** Quantidade de falhas consecutivas */
  failureStreak: number;
  /** Quantidade de vitórias consecutivas */
  winStreak: number;
  /** Último resultado registrado. Usado para detectar quebra de streak. */
  lastResult: 'win' | 'lose' | null;
}

// ─── Estado singleton ─────────────────────────────────────────────────────

const state: StreakState = {
  failureStreak: 0,
  winStreak: 0,
  lastResult: null,
};

// ─── API pública ──────────────────────────────────────────────────────────

/**
 * Registra uma vitória.
 * Incrementa winStreak, zera failureStreak (vitória quebra streak de falhas).
 */
export function registrarVitoria(): void {
  state.winStreak += 1;
  state.failureStreak = 0;
  state.lastResult = 'win';
}

/**
 * Registra uma derrota.
 * Incrementa failureStreak, zera winStreak (derrota quebra streak de vitórias).
 */
export function registrarDerrota(): void {
  state.failureStreak += 1;
  state.winStreak = 0;
  state.lastResult = 'lose';
}

/**
 * Retorna true se um anúncio deve ser exibido com base nos streaks atuais.
 *
 * Condições:
 * - failureStreak >= 3 (três derrotas consecutivas)
 * - winStreak >= 2 (duas vitórias consecutivas)
 */
export function deveExibirAnuncio(): boolean {
  return state.failureStreak >= 3 || state.winStreak >= 2;
}

/**
 * Reseta os streaks após a exibição do anúncio.
 * Deve ser chamado quando o jogador fecha o anúncio.
 */
export function resetarAposExibicao(): void {
  state.failureStreak = 0;
  state.winStreak = 0;
  state.lastResult = null;
}

/**
 * Retorna uma cópia do estado atual dos streaks.
 * Útil para debug, testes e renderização condicional na UI.
 */
export function getStreaks(): StreakState {
  return { ...state };
}
