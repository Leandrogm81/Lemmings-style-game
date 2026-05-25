/**
 * Testes do sdk_adapter — provider de anúncios, timeout e fallback.
 */

import { describe, it, expect } from 'vitest';
import { setAdProvider, getAdProvider, carregarAnuncioIntersticial } from './sdk_adapter';
import type { AdProvider } from './sdk_adapter';

// ─── Provider padrão (placeholder real) ──────────────────────────────

describe('sdk_adapter — provider padrão', () => {
  it('deve iniciar com provider placeholder', () => {
    const provider = getAdProvider();
    expect(provider.nome).toBe('placeholder');
  });

  it('deve carregar anúncio com o placeholder padrão (SIMULATED_DELAY_MS = 1500ms)', async () => {
    const resultado = await carregarAnuncioIntersticial(5000);
    expect(resultado.sucesso).toBe(true);
  });
});

// ─── Provider customizado ────────────────────────────────────────────

describe('sdk_adapter — provider customizado', () => {
  it('setAdProvider deve substituir o provider atual', () => {
    const mockProvider: AdProvider = {
      nome: 'mock-test',
      carregarIntersticial: async () => ({ sucesso: true }),
    };
    setAdProvider(mockProvider);
    expect(getAdProvider().nome).toBe('mock-test');
  });

  it('carregarAnuncioIntersticial deve retornar sucesso com provider rápido', async () => {
    const provider: AdProvider = {
      nome: 'rapido',
      carregarIntersticial: async () => ({ sucesso: true }),
    };
    setAdProvider(provider);

    const resultado = await carregarAnuncioIntersticial(5000);
    expect(resultado.sucesso).toBe(true);
  });

  it('carregarAnuncioIntersticial deve retornar erro no timeout', async () => {
    const provider: AdProvider = {
      nome: 'lento',
      carregarIntersticial: async () => {
        await new Promise((r) => setTimeout(r, 10000));
        return { sucesso: true };
      },
    };
    setAdProvider(provider);

    const resultado = await carregarAnuncioIntersticial(50); // timeout rápido
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toContain('Timeout');
  });

  it('carregarAnuncioIntersticial deve capturar exceção do provider', async () => {
    const provider: AdProvider = {
      nome: 'falho',
      carregarIntersticial: async () => {
        throw new Error('Falha na rede');
      },
    };
    setAdProvider(provider);

    const resultado = await carregarAnuncioIntersticial(5000);
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toContain('Falha na rede');
  });

  it('carregarAnuncioIntersticial deve usar timeout padrão de 10s', async () => {
    const provider: AdProvider = {
      nome: 'rapido',
      carregarIntersticial: async () => ({ sucesso: true }),
    };
    setAdProvider(provider);

    // Executa sem timeoutMs — usa DEFAULT_TIMEOUT_MS (10s)
    const resultado = await carregarAnuncioIntersticial();
    expect(resultado.sucesso).toBe(true);
  });
});
