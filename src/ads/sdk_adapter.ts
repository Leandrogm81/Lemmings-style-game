/**
 * sdk_adapter.ts — Adaptador genérico para carregamento de anúncios intersticiais.
 *
 * Fornece uma API abstrata para carregar anúncios de qualquer provider.
 * Atualmente opera em modo placeholder (simulado) até que um SDK real seja
 * definido e integrado.
 *
 * Padrão: Adapter / Strategy — o provider concreto pode ser substituído
 * sem alterar o resto do jogo.
 *
 * SEGURANÇA:
 * - Timeout de 10s para evitar que o jogador fique preso
 * - Fallback para placeholder se o SDK falhar
 * - Nunca trava o jogo (try/catch em toda chamada externa)
 */

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface AdLoadResult {
  /** true se o anúncio foi carregado com sucesso */
  sucesso: boolean;
  /** Mensagem de erro, se houver */
  erro?: string;
}

export interface AdProvider {
  /** Nome do provider (para logs/debug) */
  nome: string;
  /** Carrega um anúncio intersticial. Retorna resultado em até `timeoutMs`. */
  carregarIntersticial(timeoutMs: number): Promise<AdLoadResult>;
}

// ─── Provider padrão: placeholder simulado ────────────────────────────────

const SIMULATED_DELAY_MS = 1500; // 1.5s simula carregamento real

const placeholderProvider: AdProvider = {
  nome: 'placeholder',
  carregarIntersticial: async (_timeoutMs: number): Promise<AdLoadResult> => {
    // Simula latência de rede
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
    return { sucesso: true };
  },
};

// ─── Estado do adaptador ──────────────────────────────────────────────────

let currentProvider: AdProvider = placeholderProvider;
const DEFAULT_TIMEOUT_MS = 10_000; // 10s

// ─── API pública ──────────────────────────────────────────────────────────

/**
 * Define o provider de anúncios a ser usado.
 * Chamar esta função substitui o provider atual (incluindo o placeholder).
 *
 * Exemplo de uso com provider real:
 * ```
 * import { setAdProvider, carregarAnuncioIntersticial } from './sdk_adapter';
 * import { googleAdProvider } from './ads/google_provider';
 *
 * setAdProvider(googleAdProvider);
 * ```
 */
export function setAdProvider(provider: AdProvider): void {
  currentProvider = provider;
}

/**
 * Retorna o provider atual.
 */
export function getAdProvider(): AdProvider {
  return currentProvider;
}

/**
 * Carrega um anúncio intersticial com timeout.
 *
 * - Se o provider responder dentro do timeout, retorna o resultado.
 * - Se exceder o timeout, retorna erro (fallback para placeholder).
 * - Se lançar exceção, captura e retorna erro.
 *
 * @param timeoutMs Tempo máximo de espera em ms (padrão: 10s)
 */
export async function carregarAnuncioIntersticial(
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<AdLoadResult> {
  const inicio = Date.now();

  try {
    // Corrida entre carregamento e timeout
    const resultado = await Promise.race([
      currentProvider.carregarIntersticial(timeoutMs),
      new Promise<AdLoadResult>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout ao carregar anúncio')), timeoutMs),
      ),
    ]);

    const duracao = Date.now() - inicio;
    console.log(`[sdk_adapter] Anúncio carregado em ${duracao}ms via ${currentProvider.nome}`);

    return resultado;
  } catch (erro: unknown) {
    const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido ao carregar anúncio';
    console.warn(`[sdk_adapter] Falha ao carregar anúncio (${currentProvider.nome}):`, mensagem);
    return { sucesso: false, erro: mensagem };
  }
}
