/**
 * Testes unitários para o módulo de storage de progresso
 *
 * Cobre:
 * - saveProgress com sucesso
 * - saveProgress com erro de storage
 * - loadProgress com dados existentes
 * - loadProgress sem dados salvos (null)
 * - loadProgress com JSON inválido
 * - loadProgress com estrutura inválida
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProgress, loadProgress, STORAGE_KEY } from '../progress';
import type { ProgressoJogador } from '../../core/progresso_jogador';

// ─── Mock do localStorage ───────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Substitui o localStorage global pelo mock
vi.stubGlobal('localStorage', localStorageMock);

// ─── Dados de teste ─────────────────────────────────────────────────────────

const dadosValidos: ProgressoJogador = {
  niveisDesbloqueados: [1, 2],
  estrelasPorNivel: { '1': 3, '2': 1 },
  tempoPorNivel: { '1': 45000, '2': 62000 },
  tentativasPorNivel: { '1': 2, '2': 5 },
};

// ─── Testes ─────────────────────────────────────────────────────────────────

describe('saveProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('deve salvar dados válidos no localStorage com a chave correta', () => {
    const resultado = saveProgress(dadosValidos);

    expect(resultado).toEqual({ sucesso: true, dados: undefined });
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify(dadosValidos),
    );
  });

  it('deve retornar erro quando localStorage.setItem lança exceção', () => {
    const erroStorage = new Error('QuotaExceededError: Storage full');
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw erroStorage;
    });

    const resultado = saveProgress(dadosValidos);

    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) {
      expect(resultado.erro).toContain('QuotaExceededError');
    }
  });
});

describe('loadProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('deve carregar dados válidos do localStorage', () => {
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(dadosValidos));

    const resultado = loadProgress();

    expect(resultado.sucesso).toBe(true);
    if (resultado.sucesso) {
      expect(resultado.dados).toEqual(dadosValidos);
    }
    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('deve retornar null quando não há dados salvos', () => {
    const resultado = loadProgress();

    expect(resultado.sucesso).toBe(true);
    if (resultado.sucesso) {
      expect(resultado.dados).toBeNull();
    }
  });

  it('deve retornar erro quando o JSON está corrompido', () => {
    localStorageMock.setItem(STORAGE_KEY, 'isso não é json válido@@');

    const resultado = loadProgress();

    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) {
      expect(resultado.erro).toBeTruthy();
    }
  });

  it('deve retornar erro quando a estrutura do JSON é inválida', () => {
    // Objeto com campos faltando
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));

    const resultado = loadProgress();

    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) {
      expect(resultado.erro).toContain('corrompidos');
    }
  });
});
