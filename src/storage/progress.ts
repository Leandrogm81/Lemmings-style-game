/**
 * Módulo de armazenamento de progresso do jogador
 *
 * Persiste e recupera o objeto ProgressoJogador no localStorage.
 * A chave de storage é prefixada com o nome do jogo para evitar conflitos.
 *
 * @module storage/progress
 */

import type { ProgressoJogador } from '../core/progresso_jogador';

// ─── Constantes ─────────────────────────────────────────────────────────────

/** Chave do localStorage para o progresso do jogador */
export const STORAGE_KEY = 'lemmings_progresso';

// ─── Tipos de resultado ─────────────────────────────────────────────────────

/**
 * Resultado tipado para operações de storage.
 * Usa união discriminada para permitir type guard nativo (`if (result.sucesso)`).
 */
export type StorageResult<T> =
  | { sucesso: true; dados: T }
  | { sucesso: false; erro: string };

/** Resultado da operação de salvamento (não retorna dados) */
export type SaveProgressResult = StorageResult<void>;

/** Resultado da operação de carregamento (pode retornar null se não houver dados) */
export type LoadProgressResult = StorageResult<ProgressoJogador | null>;

// ─── Funções ────────────────────────────────────────────────────────────────

/**
 * Salva o progresso do jogador no localStorage.
 *
 * Serializa o objeto ProgressoJogador em JSON e persiste na chave STORAGE_KEY.
 * Qualquer erro de serialização ou storage é capturado e retornado como erro.
 *
 * @param data - Objeto de progresso do jogador a ser salvo
 * @returns SaveProgressResult — { sucesso: true } em caso de sucesso,
 *          ou { sucesso: false, erro: string } em caso de falha
 */
export function saveProgress(data: ProgressoJogador): SaveProgressResult {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, json);
    return { sucesso: true, dados: undefined };
  } catch (erro) {
    const mensagem =
      erro instanceof Error
        ? erro.message
        : 'Erro desconhecido ao salvar progresso';
    return { sucesso: false, erro: mensagem };
  }
}

/**
 * Carrega o progresso do jogador do localStorage.
 *
 * Lê o JSON da chave STORAGE_KEY, desserializa e valida a estrutura.
 * Retorna null se não houver dados salvos (primeira execução).
 *
 * @returns LoadProgressResult — { sucesso: true, dados: ProgressoJogador | null }
 *          em caso de sucesso, ou { sucesso: false, erro: string } em caso de falha
 */
export function loadProgress(): LoadProgressResult {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json === null) {
      return { sucesso: true, dados: null };
    }

    const parsed = JSON.parse(json);
    if (!isValidProgresso(parsed)) {
      return {
        sucesso: false,
        erro: 'Dados de progresso corrompidos ou inválidos',
      };
    }
    return { sucesso: true, dados: parsed as ProgressoJogador };
  } catch (erro) {
    const mensagem =
      erro instanceof Error
        ? erro.message
        : 'Erro desconhecido ao carregar progresso';
    return { sucesso: false, erro: mensagem };
  }
}

// ─── Funções auxiliares ─────────────────────────────────────────────────────

/**
 * Valida se um valor desconhecido tem a estrutura esperada de ProgressoJogador.
 * Verifica a presença e o tipo dos 4 campos obrigatórios.
 *
 * @param valor - Valor a ser validado (geralmente de JSON.parse)
 * @returns true se a estrutura for válida
 */
function isValidProgresso(valor: unknown): valor is ProgressoJogador {
  if (typeof valor !== 'object' || valor === null) return false;
  const obj = valor as Record<string, unknown>;
  return (
    Array.isArray(obj.niveisDesbloqueados) &&
    typeof obj.estrelasPorNivel === 'object' &&
    obj.estrelasPorNivel !== null &&
    typeof obj.tempoPorNivel === 'object' &&
    obj.tempoPorNivel !== null &&
    typeof obj.tentativasPorNivel === 'object' &&
    obj.tentativasPorNivel !== null
  );
}
