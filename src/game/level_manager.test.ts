/**
 * Testes do LevelManager — instanciação, reinício, eventos.
 *
 * Converteu de funções exportadas com console.assert (sem runner)
 * para Vitest (describe/it/expect).
 */

import { describe, it, expect } from 'vitest';
import { LevelManager } from './level_manager';
import type { RestartEvent } from './level_manager';
import type { LvlConfig } from '../core/lvl_config';

const MOCK_CONFIG: LvlConfig = {
  id: 1,
  nome: 'Nível Teste',
  requisitosCriaturas: ['criatura1', 'criatura2'],
  listaHabilidadesDisponiveis: ['escavar', 'construir', 'bloquear', 'empurrar'],
};

describe('LevelManager', () => {
  it('deve ser instanciável com LvlConfig válido', () => {
    const manager = new LevelManager(MOCK_CONFIG);
    const state = manager.getState();

    expect(state.config.id).toBe(1);
    expect(state.criaturas.length).toBe(0);
    expect(state.criaturasSalvas).toBe(0);
    expect(state.criaturasPerdidas).toBe(0);
    expect(state.criaturasRestantes).toBe(2);
    expect(state.timerRestanteMs).toBeGreaterThan(0);
    expect(state.skillStates.length).toBe(4);

    const todasDisponiveis = state.skillStates.every((s) => s.disponivel);
    expect(todasDisponiveis).toBe(true);
  });

  it('restartLevel deve restaurar estado ao inicial', () => {
    const manager = new LevelManager(MOCK_CONFIG);

    const stateAntes = manager.getState();
    stateAntes.criaturasSalvas = 3;
    stateAntes.criaturasPerdidas = 1;
    stateAntes.timerRestanteMs = 30000;

    manager.restartLevel();
    const stateDepois = manager.getState();

    expect(stateDepois.criaturasSalvas).toBe(0);
    expect(stateDepois.criaturasPerdidas).toBe(0);
    expect(stateDepois.criaturas.length).toBe(0);
    expect(stateDepois.criaturasRestantes).toBe(2);
    expect(stateDepois.timerRestanteMs).toBeGreaterThan(0);

    const todasDisponiveis = stateDepois.skillStates.every((s) => s.disponivel);
    expect(todasDisponiveis).toBe(true);
  });

  it('deve disparar evento de reinício corretamente', () => {
    const manager = new LevelManager(MOCK_CONFIG);
    let eventoRecebido: RestartEvent | null = null;

    const unsubscribe = manager.subscribe((event) => {
      eventoRecebido = event;
    });

    manager.restartLevel();

    expect(eventoRecebido).not.toBeNull();
    expect(eventoRecebido!.tipo).toBe('restart');
    expect(eventoRecebido!.levelId).toBe(1);
    expect(eventoRecebido!.sucesso).toBe(true);
    expect(typeof eventoRecebido!.timestamp).toBe('number');
    expect(eventoRecebido!.timestamp).toBeGreaterThan(0);
    expect(eventoRecebido!.mensagem).toBeDefined();

    unsubscribe();

    // Após unsubscribe, restart não deve chamar o callback
    eventoRecebido = null;
    manager.restartLevel();
    expect(eventoRecebido).toBeNull();
  });

  it('múltiplos restarts consecutivos devem ser consistentes', () => {
    const manager = new LevelManager(MOCK_CONFIG);

    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        const state = manager.getState();
        state.criaturasSalvas = i * 5;
        state.timerRestanteMs = 10000 - i;
      }

      manager.restartLevel();
      const state = manager.getState();

      expect(state.criaturasSalvas).toBe(0);
      expect(state.criaturasPerdidas).toBe(0);
      expect(state.criaturas.length).toBe(0);
      expect(state.criaturasRestantes).toBe(2);
      expect(state.timerRestanteMs).toBeGreaterThan(0);

      const todasDisponiveis = state.skillStates.every((s) => s.disponivel);
      expect(todasDisponiveis).toBe(true);
    }
  });
});
