/**
 * LevelManager — gerencia o estado runtime de um nível e fornece lógica de reinício.
 *
 * Módulo de lógica pura — sem dependências de UI.
 * O estado inicial é derivado de LvlConfig.
 *
 * DECISÃO DE DESIGN (Tarefa 4):
 * O LevelManager cria sua PRÓPRIA instância de SkillManager (não o singleton de skills.ts)
 * para que restartLevel possa resetar as skills criando uma nova instância,
 * sem precisar modificar skills.ts para adicionar um método reset().
 *
 * Cada instância gerencia UM nível. Para trocar de nível, crie uma nova
 * instância com o LvlConfig correspondente.
 */

import type { LvlConfig } from '../core/lvl_config';
import type { Criatura } from '../core/criatura';
import type { SkillState } from './skills';
import { SkillManager, SKILL_DEFINITIONS } from './skills';

// ─── Constantes ───────────────────────────────────────────────────────────

/** Valor padrão para o timer do nível em ms (2 minutos).
 *  Usado porque LvlConfig não possui campo timerInicialMs.
 *  Pode ser substituído futuramente por valor vindo de LvlConfig. */
const TIMER_PADRAO_MS = 120_000;

// ─── Tipos ────────────────────────────────────────────────────────────────

/**
 * Estado completo do nível em runtime.
 * Restaurado ao estado inicial quando restartLevel() é chamado.
 */
export interface LevelRuntimeState {
  /** Configuração original do nível (imutável durante a partida) */
  config: LvlConfig;
  /** Criaturas ativas no nível no momento */
  criaturas: Criatura[];
  /** Tempo restante em milissegundos */
  timerRestanteMs: number;
  /** Quantas criaturas foram salvas com sucesso */
  criaturasSalvas: number;
  /** Quantas criaturas foram perdidas */
  criaturasPerdidas: number;
  /** Criaturas que ainda precisam ser salvas para vencer */
  criaturasRestantes: number;
  /** Estado atual de todas as skills disponíveis no nível */
  skillStates: SkillState[];
}

/**
 * Evento disparado quando o nível é reiniciado.
 * Consumido pela UI para feedback visual (fechar modais, exibir mensagens).
 */
export interface RestartEvent {
  tipo: 'restart';
  levelId: number;
  timestamp: number;
  sucesso: boolean;
  mensagem?: string;
}

// ─── LevelManager ─────────────────────────────────────────────────────────

/**
 * Gerenciador de estado e reinício de um nível.
 */
export class LevelManager {
  /** Estado runtime atual do nível */
  private state: LevelRuntimeState;

  /** Instância própria de SkillManager (não o singleton) */
  private skillManager: SkillManager;

  /** Callbacks inscritos para evento de reinício */
  private restartCallbacks: Set<(event: RestartEvent) => void>;

  constructor(config: LvlConfig) {
    this.skillManager = this.criarSkillManager(config.listaHabilidadesDisponiveis);
    this.restartCallbacks = new Set();
    this.state = this.buildInitialState(config);
  }

  // ─── API pública ──────────────────────────────────────────────────────

  /**
   * Retorna o estado runtime atual do nível.
   */
  getState(): LevelRuntimeState {
    return this.state;
  }

  /**
   * Reinicia o nível, restaurando todas as variáveis ao estado inicial
   * definido por LvlConfig. Dispara evento de reinício.
   */
  restartLevel(): void {
    const config = this.state.config;

    // Cria nova instância de SkillManager para resetar skills
    this.skillManager = this.criarSkillManager(config.listaHabilidadesDisponiveis);

    // Reconstrói estado inicial
    this.state = this.buildInitialState(config);

    // Notifica UI
    this.notifyRestart();
  }

  /**
   * Inscreve um callback para ser chamado quando o nível for reiniciado.
   * Retorna uma função para cancelar a inscrição.
   */
  subscribe(callback: (event: RestartEvent) => void): () => void {
    this.restartCallbacks.add(callback);
    return () => {
      this.restartCallbacks.delete(callback);
    };
  }

  // ─── Métodos privados ─────────────────────────────────────────────────

  /**
   * Cria uma instância de SkillManager filtrada pelas skills disponíveis
   * no nível (definidas em LvlConfig.listaHabilidadesDisponiveis).
   */
  private criarSkillManager(habilidadesDisponiveis: string[]): SkillManager {
    const definicoes = SKILL_DEFINITIONS.filter((def) =>
      habilidadesDisponiveis.includes(def.id),
    );
    return new SkillManager(definicoes);
  }

  /**
   * Constrói o estado inicial do nível a partir de LvlConfig.
   */
  private buildInitialState(config: LvlConfig): LevelRuntimeState {
    return {
      config,
      criaturas: [],
      timerRestanteMs: TIMER_PADRAO_MS,
      criaturasSalvas: 0,
      criaturasPerdidas: 0,
      criaturasRestantes: config.requisitosCriaturas.length,
      skillStates: this.skillManager.getTodosEstados(),
    };
  }

  /**
   * Dispara o evento de reinício para todos os inscritos.
   */
  private notifyRestart(): void {
    const event: RestartEvent = {
      tipo: 'restart',
      levelId: this.state.config.id,
      timestamp: Date.now(),
      sucesso: true,
      mensagem: 'Nível reiniciado',
    };

    for (const callback of this.restartCallbacks) {
      callback(event);
    }
  }
}
