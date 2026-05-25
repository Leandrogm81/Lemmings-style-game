/**
 * Testes do levels — dados mockados de níveis.
 */

import { describe, it, expect } from 'vitest';
import { niveis, getNiveisComProgresso } from './levels';
import type { ProgressoJogador } from '../core/progresso_jogador';

describe('levels', () => {
  it('deve ter 5 níveis definidos', () => {
    expect(niveis.length).toBe(5);
  });

  it('cada nível deve ter id, nome e desbloqueado', () => {
    for (const nivel of niveis) {
      expect(typeof nivel.id).toBe('number');
      expect(typeof nivel.nome).toBe('string');
      expect(typeof nivel.desbloqueado).toBe('boolean');
    }
  });

  it('primeiro nível deve estar desbloqueado', () => {
    expect(niveis[0].desbloqueado).toBe(true);
  });

  it('níveis 2 a 5 devem estar bloqueados sem progresso salvo', () => {
    expect(niveis[1].desbloqueado).toBe(false);
    expect(niveis[2].desbloqueado).toBe(false);
    expect(niveis[3].desbloqueado).toBe(false);
    expect(niveis[4].desbloqueado).toBe(false);
  });

  it('ids devem ser sequenciais de 1 a 5', () => {
    for (let i = 0; i < niveis.length; i++) {
      expect(niveis[i].id).toBe(i + 1);
    }
  });
});

describe('getNiveisComProgresso', () => {
  it('deve desbloquear níveis conforme progresso', () => {
    const progresso: ProgressoJogador = {
      niveisDesbloqueados: [1, 2, 3],
      estrelasPorNivel: {},
      tempoPorNivel: {},
      tentativasPorNivel: {},
    };
    const niveis = getNiveisComProgresso(progresso);

    expect(niveis[0].desbloqueado).toBe(true);  // nível 1 sempre
    expect(niveis[1].desbloqueado).toBe(true);  // desbloqueado
    expect(niveis[2].desbloqueado).toBe(true);  // desbloqueado
    expect(niveis[3].desbloqueado).toBe(false); // bloqueado
    expect(niveis[4].desbloqueado).toBe(false); // bloqueado
  });

  it('sem progresso, apenas nível 1 está desbloqueado', () => {
    const niveis = getNiveisComProgresso(null);
    expect(niveis[0].desbloqueado).toBe(true);
    expect(niveis[1].desbloqueado).toBe(false);
  });
});
