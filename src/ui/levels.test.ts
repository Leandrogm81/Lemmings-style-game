/**
 * Testes do levels — dados mockados de níveis.
 */

import { describe, it, expect } from 'vitest';
import { niveis } from './levels';

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

  it('dois primeiros níveis devem estar desbloqueados', () => {
    expect(niveis[0].desbloqueado).toBe(true);
    expect(niveis[1].desbloqueado).toBe(true);
  });

  it('níveis 3 a 5 devem estar bloqueados', () => {
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
