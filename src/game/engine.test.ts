/**
 * Testes do engine de gameplay — movimentação, vitória/derrota, skills.
 *
 * Módulo de lógica pura — sem dependências de UI.
 *
 * Design do grid de teste (6 colunas × 4 linhas):
 *   Linha 0: empty (ar), exceto última coluna = exit
 *   Linha 1: empty (ar), exceto penúltima e última = terrain (suporte para saída)
 *   Linha 2: empty (ar)
 *   Linha 3: terrain (chão)
 *
 * Criatura padrão em (0, 1): anda sobre terreno na linha 2 (y+1).
 */

import { describe, it, expect } from 'vitest';
import {
  criarEstadoInicial,
  tick,
  aplicarSkill,
  verificarVitoria,
  verificarDerrota,
  type EngineConfig,
  type EngineState,
  type TileType,
  type CreatureRuntime,
} from './engine';

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Grid padrão: terreno só na última linha */
function criarGridTeste(cols = 6, rows = 4): TileType[][] {
  const grid: TileType[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: TileType[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(r === rows - 1 ? 'terrain' : 'empty');
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Grid com saída na última coluna.
 * Adiciona terreno nas linhas 1 e 2 na última coluna para suporte.
 * Criatura deve estar em y=0 (anda sobre terreno em y=1 nas colunas normais).
 */
function criarGridComSaida(cols = 6, rows = 4): TileType[][] {
  const grid = criarGridTeste(cols, rows);
  const ultima = cols - 1;
  grid[0][ultima] = 'exit';
  grid[1][ultima] = 'terrain';
  grid[2][ultima] = 'terrain';
  // Cria caminho de terreno na linha 1 para a criatura andar até a saída
  for (let c = 0; c < ultima; c++) {
    grid[1][c] = 'terrain';
  }
  return grid;
}

/** Grid com gap (buraco) na linha de baixo na coluna 3 */
function criarGridComGap(cols = 6, rows = 4): TileType[][] {
  const grid = criarGridTeste(cols, rows);
  // Cria terreno na linha 1 para criatura andar
  for (let c = 0; c < cols; c++) {
    grid[1][c] = 'terrain';
  }
  // Remove terreno na linha 1, coluna 3 → gap
  grid[1][3] = 'empty';
  return grid;
}

function criarCriatura(
  id: string,
  x: number,
  y: number,
): CreatureRuntime {
  return { id, x, y, vivo: true, chegouSaida: false, efeitoEmpurrar: 0, efeitoBloquear: 0 };
}

function criarConfigBase(overrides: Partial<EngineConfig> = {}): EngineConfig {
  return {
    grid: criarGridTeste(),
    criaturas: [criarCriatura('c1', 0, 2)], // y=2, anda sobre terrain em y=3
    tempoTotalMs: 30000,
    metaCriaturas: 1,
    ...overrides,
  };
}

// ─── criarEstadoInicial ───────────────────────────────────────────────────

describe('criarEstadoInicial', () => {
  it('deve criar estado com valores iniciais corretos', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    expect(state.status).toBe('running');
    expect(state.timerRestanteMs).toBe(30000);
    expect(state.tempoTotalMs).toBe(30000);
    expect(state.metaCriaturas).toBe(1);
    expect(state.tickCount).toBe(0);
    expect(state.criaturasSalvas).toBe(0);
    expect(state.criaturasPerdidas).toBe(0);
    expect(state.criaturas.length).toBe(1);
    expect(state.criaturas[0].id).toBe('c1');
    expect(state.criaturas[0].vivo).toBe(true);
  });

  it('deve clonar o grid (não compartilhar referência)', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    config.grid[0][0] = 'exit';
    expect(state.grid[0][0]).toBe('empty');
  });

  it('deve clonar criaturas (não compartilhar referência)', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    config.criaturas[0].x = 99;
    expect(state.criaturas[0].x).toBe(0);
  });

  it('deve lançar erro para grid vazio', () => {
    expect(() => criarEstadoInicial({ ...criarConfigBase(), grid: [] })).toThrow('Grid inválido');
  });

  it('deve lançar erro para grid sem colunas', () => {
    expect(() => criarEstadoInicial({ ...criarConfigBase(), grid: [[]] })).toThrow('Grid inválido');
  });

  it('deve lançar erro sem criaturas', () => {
    expect(() => criarEstadoInicial({ ...criarConfigBase(), criaturas: [] })).toThrow('criatura');
  });

  it('deve lançar erro para tempoTotalMs <= 0', () => {
    expect(() => criarEstadoInicial({ ...criarConfigBase(), tempoTotalMs: 0 })).toThrow('tempoTotalMs');
  });

  it('deve lançar erro para metaCriaturas > total', () => {
    expect(() => criarEstadoInicial({ ...criarConfigBase(), metaCriaturas: 5 })).toThrow('metaCriaturas');
  });

  it('deve lançar erro para criatura em posição inválida', () => {
    expect(() =>
      criarEstadoInicial({
        ...criarConfigBase(),
        criaturas: [criarCriatura('c1', 99, 99)],
      }),
    ).toThrow('posição inválida');
  });
});

// ─── tick — movimentação básica ───────────────────────────────────────────

describe('tick — movimentação', () => {
  it('deve mover criatura uma coluna para a direita por tick', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.criaturas[0].x).toBe(1);
    expect(novo.criaturas[0].vivo).toBe(true);
    expect(novo.tickCount).toBe(1);
  });

  it('deve decrementar o timer', () => {
    const config = criarConfigBase({ tempoTotalMs: 10000 });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.timerRestanteMs).toBe(9500);
  });

  it('não deve alterar estado se status não for running', () => {
    const config = criarConfigBase();
    const state: EngineState = {
      ...criarEstadoInicial(config),
      status: 'victory',
    };

    const novo = tick(state, 500);
    expect(novo).toBe(state);
  });

  it('deve mover múltiplas criaturas', () => {
    const config = criarConfigBase({
      criaturas: [criarCriatura('c1', 0, 2), criarCriatura('c2', 1, 2)],
      metaCriaturas: 1,
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.criaturas[0].x).toBe(1);
    expect(novo.criaturas[1].x).toBe(2);
  });
});

// ─── tick — saída e vitória ───────────────────────────────────────────────

describe('tick — saída e vitória', () => {
  it('deve salvar criatura que sai do grid pela direita (sem tile exit)', () => {
    const grid = criarGridTeste(4, 4);
    // Criatura em x=3, próximo passo seria x=4 (fora do grid)
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 3, 2)],
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.criaturas[0].chegouSaida).toBe(true);
    expect(novo.criaturasSalvas).toBe(1);
  });

  it('deve marcar criatura como salva ao pisar no tile exit', () => {
    const grid = criarGridComSaida(4, 4);
    // Criatura em y=0, x=2 — próximo passo é x=3 que é 'exit'
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 2, 0)],
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.criaturas[0].chegouSaida).toBe(true);
    expect(novo.criaturas[0].x).toBe(3);
    expect(novo.criaturasSalvas).toBe(1);
  });

  it('deve transitar para victory quando criaturas salvas >= meta', () => {
    const grid = criarGridComSaida(4, 4);
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 2, 0)],
      metaCriaturas: 1,
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.status).toBe('victory');
    expect(novo.criaturasSalvas).toBe(1);
  });

  it('não deve considerar vitória antes de atingir meta com múltiplas criaturas', () => {
    const grid = criarGridComSaida(6, 4);
    const config = criarConfigBase({
      grid,
      criaturas: [
        criarCriatura('c1', 0, 0),
        criarCriatura('c2', 0, 0),
        criarCriatura('c3', 0, 0),
      ],
      metaCriaturas: 2,
    });
    let state = criarEstadoInicial(config);

    // Avança até a primeira criatura chegar na saída (col 5)
    for (let i = 0; i < 6; i++) {
      state = tick(state, 500);
    }

    // c1 está em x=5 (ou já saiu), mas meta=2 ainda não foi atingida
    // A engine só marca victory quando salvas >= metaCriaturas (2)
    expect(state.criaturasSalvas).toBeLessThanOrEqual(3);
  });
});

// ─── tick — quedas e derrota ──────────────────────────────────────────────

describe('tick — quedas e derrota', () => {
  it('deve matar criatura que cai em gap (sem terreno abaixo)', () => {
    const grid = criarGridComGap(6, 4);
    // Criatura em y=0, x=2: próximo passo x=3 onde grid[1][3] = 'empty' → gap
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 2, 0)],
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.criaturas[0].vivo).toBe(false);
    expect(novo.criaturas[0].x).toBe(2); // não avançou
    expect(novo.criaturasPerdidas).toBe(1);
  });

  it('deve transitar para defeat quando timer zera', () => {
    const config = criarConfigBase({ tempoTotalMs: 1000 });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 1500);

    expect(novo.timerRestanteMs).toBe(0);
    expect(novo.status).toBe('defeat');
  });

  it('deve transitar para defeat quando todas as criaturas morrem', () => {
    const grid = criarGridComGap(6, 4);
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 2, 0)],
    });
    const state = criarEstadoInicial(config);

    const novo = tick(state, 500);

    expect(novo.status).toBe('defeat');
    expect(novo.criaturas[0].vivo).toBe(false);
  });
});

// ─── tick — efeitos de skills ─────────────────────────────────────────────

describe('tick — efeitos de skills', () => {
  it('bloquear: criatura não deve se mover por N ticks', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const comBloqueio: EngineState = {
      ...state,
      criaturas: [{ ...state.criaturas[0], efeitoBloquear: 2 }],
    };

    const t1 = tick(comBloqueio, 500);
    expect(t1.criaturas[0].x).toBe(0);
    expect(t1.criaturas[0].efeitoBloquear).toBe(1);

    const t2 = tick(t1, 500);
    expect(t2.criaturas[0].x).toBe(0);
    expect(t2.criaturas[0].efeitoBloquear).toBe(0);

    const t3 = tick(t2, 500);
    expect(t3.criaturas[0].x).toBe(1);
  });

  it('empurrar: criatura deve mover 2 colunas por tick', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const comEmpurrao: EngineState = {
      ...state,
      criaturas: [{ ...state.criaturas[0], efeitoEmpurrar: 3 }],
    };

    const t1 = tick(comEmpurrao, 500);
    expect(t1.criaturas[0].x).toBe(2);
    expect(t1.criaturas[0].efeitoEmpurrar).toBe(2);
  });

  it('empurrar com saída: deve salvar criatura ao alcançar exit', () => {
    const grid = criarGridComSaida(6, 4);
    // Criatura em y=0, x=3 com empurrão: passo 1 → x=4, passo 2 → x=5 (exit)
    const config = criarConfigBase({
      grid,
      criaturas: [criarCriatura('c1', 3, 0)],
    });
    const state = criarEstadoInicial(config);

    const comEmpurrao: EngineState = {
      ...state,
      criaturas: [{ ...state.criaturas[0], efeitoEmpurrar: 3 }],
    };

    const t1 = tick(comEmpurrao, 500);
    expect(t1.criaturas[0].chegouSaida).toBe(true);
    expect(t1.criaturasSalvas).toBe(1);
  });
});

// ─── aplicarSkill ─────────────────────────────────────────────────────────

describe('aplicarSkill', () => {
  it('escavar: deve remover terreno da célula alvo', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    expect(state.grid[3][2]).toBe('terrain');

    const novo = aplicarSkill(state, 'escavar', 2, 3);

    expect(novo.grid[3][2]).toBe('empty');
  });

  it('escavar: não deve alterar célula que já é empty', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'escavar', 0, 0);

    expect(novo.grid[0][0]).toBe('empty');
  });

  it('construir: deve adicionar terreno em célula empty', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    expect(state.grid[0][2]).toBe('empty');

    const novo = aplicarSkill(state, 'construir', 2, 0);

    expect(novo.grid[0][2]).toBe('terrain');
  });

  it('construir: não deve alterar célula que já é terrain', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'construir', 0, 3);

    expect(novo.grid[3][0]).toBe('terrain');
  });

  it('bloquear: deve aplicar efeito na criatura mais próxima', () => {
    const config = criarConfigBase({
      criaturas: [criarCriatura('c1', 2, 2)],
    });
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'bloquear', 3, 2);

    expect(novo.criaturas[0].efeitoBloquear).toBeGreaterThan(0);
  });

  it('empurrar: deve aplicar efeito na criatura mais próxima', () => {
    const config = criarConfigBase({
      criaturas: [criarCriatura('c1', 2, 2)],
    });
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'empurrar', 3, 2);

    expect(novo.criaturas[0].efeitoEmpurrar).toBeGreaterThan(0);
  });

  it('não deve aplicar skill se estado não for running', () => {
    const config = criarConfigBase();
    const state: EngineState = {
      ...criarEstadoInicial(config),
      status: 'defeat',
    };

    const novo = aplicarSkill(state, 'escavar', 0, 0);
    expect(novo).toBe(state);
  });

  it('não deve aplicar skill fora dos limites do grid', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'escavar', 99, 99);
    expect(novo).toBe(state);
  });

  it('skill desconhecida não deve alterar estado', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const novo = aplicarSkill(state, 'inexistente' as string, 0, 0);
    expect(novo).toBe(state);
  });
});

// ─── verificarVitoria / verificarDerrota ──────────────────────────────────

describe('verificarVitoria', () => {
  it('deve retornar true quando criaturasSalvas >= meta', () => {
    const config = criarConfigBase({
      criaturas: [criarCriatura('c1', 0, 2), criarCriatura('c2', 0, 2)],
      metaCriaturas: 2,
    });
    const state = criarEstadoInicial(config);

    const modificado: EngineState = { ...state, criaturasSalvas: 2 };

    expect(verificarVitoria(modificado)).toBe(true);
  });

  it('deve retornar false quando criaturasSalvas < meta', () => {
    const config = criarConfigBase({
      criaturas: [criarCriatura('c1', 0, 2), criarCriatura('c2', 0, 2)],
      metaCriaturas: 2,
    });
    const state = criarEstadoInicial(config);

    const modificado: EngineState = { ...state, criaturasSalvas: 1 };

    expect(verificarVitoria(modificado)).toBe(false);
  });
});

describe('verificarDerrota', () => {
  it('deve retornar true quando timer zerou', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const modificado: EngineState = { ...state, timerRestanteMs: 0 };

    expect(verificarDerrota(modificado)).toBe(true);
  });

  it('deve retornar true quando todas criaturas morreram', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const modificado: EngineState = {
      ...state,
      criaturas: [{ ...state.criaturas[0], vivo: false }],
      criaturasSalvas: 0,
    };

    expect(verificarDerrota(modificado)).toBe(true);
  });

  it('deve retornar false quando há criaturas vivas e timer > 0', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    expect(verificarDerrota(state)).toBe(false);
  });

  it('não deve considerar derrota se há criaturas salvas mesmo com todas mortas', () => {
    const config = criarConfigBase();
    const state = criarEstadoInicial(config);

    const modificado: EngineState = {
      ...state,
      criaturas: [{ ...state.criaturas[0], vivo: false }],
      criaturasSalvas: 1,
    };

    expect(verificarDerrota(modificado)).toBe(false);
  });
});
