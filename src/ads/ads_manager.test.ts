/**
 * Testes do ads_manager — streaks de falhas/vitórias.
 *
 * Converteu de console.assert + runner manual para Vitest (describe/it/expect).
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  registrarVitoria,
  registrarDerrota,
  deveExibirAnuncio,
  resetarAposExibicao,
  getStreaks,
} from './ads_manager';

describe('ads_manager', () => {
  beforeEach(() => {
    resetarAposExibicao();
  });

  it('2 vitórias consecutivas disparam anúncio', () => {
    registrarVitoria();
    registrarVitoria();
    expect(deveExibirAnuncio()).toBe(true);
  });

  it('1 vitória NÃO dispara anúncio', () => {
    registrarVitoria();
    expect(deveExibirAnuncio()).toBe(false);
  });

  it('3 derrotas consecutivas disparam anúncio', () => {
    registrarDerrota();
    registrarDerrota();
    registrarDerrota();
    expect(deveExibirAnuncio()).toBe(true);
  });

  it('2 derrotas NÃO disparam anúncio', () => {
    registrarDerrota();
    registrarDerrota();
    expect(deveExibirAnuncio()).toBe(false);
  });

  it('intercalar V D V nunca dispara anúncio', () => {
    // V
    registrarVitoria();
    expect(deveExibirAnuncio()).toBe(false);

    // D (quebra streak de V)
    registrarDerrota();
    expect(deveExibirAnuncio()).toBe(false);

    // D (segunda derrota consecutiva — ainda < 3)
    registrarDerrota();
    expect(deveExibirAnuncio()).toBe(false);

    // V (quebra streak de D)
    registrarVitoria();
    expect(deveExibirAnuncio()).toBe(false);
  });

  it('resetarAposExibicao zera todos os streaks', () => {
    registrarVitoria();
    registrarVitoria();
    expect(deveExibirAnuncio()).toBe(true);

    resetarAposExibicao();
    const state = getStreaks();
    expect(state.failureStreak).toBe(0);
    expect(state.winStreak).toBe(0);
    expect(state.lastResult).toBeNull();
  });

  it('vitória após derrota zera failureStreak', () => {
    registrarDerrota();
    registrarDerrota();
    registrarVitoria(); // quebra streak de derrotas

    const state = getStreaks();
    expect(state.failureStreak).toBe(0);
    expect(state.winStreak).toBe(1);
    expect(state.lastResult).toBe('win');
  });

  it('derrota após vitória zera winStreak', () => {
    registrarVitoria();
    registrarVitoria();
    registrarDerrota(); // quebra streak de vitórias

    const state = getStreaks();
    expect(state.winStreak).toBe(0);
    expect(state.failureStreak).toBe(1);
    expect(state.lastResult).toBe('lose');
  });
});
