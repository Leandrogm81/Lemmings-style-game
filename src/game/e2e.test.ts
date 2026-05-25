/**
 * Teste E2E do fluxo completo de gameplay.
 * Simula aplicar Construir no gap e verificar vitória.
 */
import { describe, it, expect } from 'vitest';
import {
  criarEstadoInicial,
  tick,
  aplicarSkill,
  type EngineConfig,
  type CreatureRuntime,
  type SpawnItem,
} from '../game/engine';

/** Recria o grid do Nível 1 (mesma função do GameScreen) */
function criarGridNivel1(cols = 10, rows = 6) {
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < cols; c++) {
      if (r >= 1 && r <= 3) {
        row.push(c === 7 ? 'empty' : 'terrain');
      } else if (r === 0 && c === cols - 1) {
        row.push('exit');
      } else if (r === 0 && c === 0) {
        row.push('empty');
      } else {
        row.push('empty');
      }
    }
    grid.push(row);
  }
  return grid;
}

describe('E2E — Fluxo completo Nível 1', () => {
  it('deve vencer aplicando Construir no gap', () => {
    const grid = criarGridNivel1();
    const criaturas: CreatureRuntime[] = [{
      id: 'c1', x: 0, y: 0,
      vivo: true, chegouSaida: false,
      efeitoEmpurrar: 0, efeitoBloquear: 0,
    }];
    const fila: SpawnItem[] = [
      { id: 'c2', x: 0, y: 0 },
      { id: 'c3', x: 0, y: 0 },
      { id: 'c4', x: 0, y: 0 },
      { id: 'c5', x: 0, y: 0 },
    ];

    const config: EngineConfig = {
      grid: grid as any,
      criaturas,
      tempoTotalMs: 90000,
      metaCriaturas: 3,
      filaSpawn: fila,
      intervaloSpawn: 4,
      maxCriaturasAtivas: 2,
    };

    let state = criarEstadoInicial(config);

    // Verifica que o gap está vazio
    expect(state.grid[1][7]).toBe('empty');

    // Aplica Construir no gap (ANTES da criatura chegar lá)
    state = aplicarSkill(state, 'construir', 7, 1);

    // Gap preenchido
    expect(state.grid[1][7]).toBe('terrain');

    // Avança ticks até a vitória ou derrota
    for (let i = 0; i < 100; i++) {
      state = tick(state, 600); // cada tick = 600ms
      if (state.status !== 'running') break;
    }

    // Deve ter vencido (3 criaturas salvas)
    expect(state.status).toBe('victory');
    expect(state.criaturasSalvas).toBeGreaterThanOrEqual(3);
  });

  it('deve perder SEM aplicar Construir no gap', () => {
    const grid = criarGridNivel1();
    const criaturas: CreatureRuntime[] = [{
      id: 'c1', x: 0, y: 0,
      vivo: true, chegouSaida: false,
      efeitoEmpurrar: 0, efeitoBloquear: 0,
    }];
    const fila: SpawnItem[] = [
      { id: 'c2', x: 0, y: 0 },
      { id: 'c3', x: 0, y: 0 },
      { id: 'c4', x: 0, y: 0 },
      { id: 'c5', x: 0, y: 0 },
    ];

    const config: EngineConfig = {
      grid: grid as any,
      criaturas,
      tempoTotalMs: 90000,
      metaCriaturas: 3,
      filaSpawn: fila,
      intervaloSpawn: 4,
      maxCriaturasAtivas: 2,
    };

    let state = criarEstadoInicial(config);

    // Avança ticks até a derrota (SEM aplicar Construir)
    for (let i = 0; i < 100; i++) {
      state = tick(state, 600);
      if (state.status !== 'running') break;
    }

    // Deve ter perdido (criaturas caem no gap)
    expect(state.status).toBe('defeat');
    expect(state.criaturasSalvas).toBe(0);
    expect(state.criaturasPerdidas).toBeGreaterThan(0);
  });
});
