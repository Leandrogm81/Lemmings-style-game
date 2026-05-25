/**
 * Engine do jogo — game loop, movimentação de criaturas, verificação de vitória/derrota.
 *
 * Módulo de lógica pura — sem dependências de UI ou DOM.
 * Projetado para ser testável: a função tick() é síncrona e recebe deltaMs.
 * O game loop (requestAnimationFrame) fica no componente React (GameScreen).
 *
 * Arquitetura:
 * - Grid 2D de tiles (colunas × linhas). Linha 0 = topo, última linha = chão.
 * - Criaturas caminham da esquerda para a direita sobre tiles 'terrain'.
 * - Se uma criatura não tem 'terrain' abaixo da próxima posição, cai e morre.
 * - Tile 'exit' marca a saída — criatura que pisa nele é salva.
 * - Vitória: N criaturas alcançam a saída (>= metaCriaturas).
 * - Derrota: timer zera ou todas as criaturas morrem sem nenhuma salva.
 *
 * @module game/engine
 */

// ─── Tipos ────────────────────────────────────────────────────────────────

/** Tipo de tile no grid */
export type TileType = 'terrain' | 'empty' | 'exit';

/** Estado runtime de uma criatura no grid */
export interface CreatureRuntime {
  id: string;
  /** Coluna atual no grid (0-based) */
  x: number;
  /** Linha atual no grid (0-based) */
  y: number;
  /** false se a criatura morreu (caiu em espaço vazio) */
  vivo: boolean;
  /** true se a criatura alcançou a saída */
  chegouSaida: boolean;
  /** Ticks restantes do efeito Empurrar (move 2 colunas por tick) */
  efeitoEmpurrar: number;
  /** Ticks restantes do efeito Bloquear (não se move) */
  efeitoBloquear: number;
}

/** Status do engine */
export type EngineStatus = 'running' | 'victory' | 'defeat';

/** Item na fila de spawn — criatura que ainda não entrou no jogo */
export interface SpawnItem {
  id: string;
  x: number;
  y: number;
}

/** Configuração inicial do engine */
export interface EngineConfig {
  /** Grid: grid[linha][coluna] */
  grid: TileType[][];
  /** Criaturas iniciais */
  criaturas: CreatureRuntime[];
  /** Tempo total do nível em ms */
  tempoTotalMs: number;
  /** Quantas criaturas precisam alcançar a saída para vencer */
  metaCriaturas: number;
  /** Fila de criaturas que entram no jogo gradualmente */
  filaSpawn?: SpawnItem[];
  /** Ticks entre cada spawn da fila (padrão: 3) */
  intervaloSpawn?: number;
  /** Máximo de criaturas ativas simultâneas (padrão: 3) */
  maxCriaturasAtivas?: number;
}

/** Estado completo do engine em um dado momento */
export interface EngineState {
  grid: TileType[][];
  criaturas: CreatureRuntime[];
  timerRestanteMs: number;
  tempoTotalMs: number;
  metaCriaturas: number;
  status: EngineStatus;
  tickCount: number;
  criaturasSalvas: number;
  criaturasPerdidas: number;
  /** Fila de criaturas aguardando spawn */
  filaSpawn: SpawnItem[];
  /** Ticks entre cada spawn */
  intervaloSpawn: number;
  /** Máximo de criaturas ativas simultâneas */
  maxCriaturasAtivas: number;
  /** Contador de ticks desde o último spawn */
  ticksDesdeUltimoSpawn: number;
}

// ─── Funções auxiliares ───────────────────────────────────────────────────

function cloneGrid(grid: TileType[][]): TileType[][] {
  return grid.map((row) => [...row]);
}

function cloneCriaturas(criaturas: CreatureRuntime[]): CreatureRuntime[] {
  return criaturas.map((c) => ({ ...c }));
}

// ─── API Pública ──────────────────────────────────────────────────────────

/**
 * Cria o estado inicial do engine a partir da configuração.
 */
export function criarEstadoInicial(config: EngineConfig): EngineState {
  if (!config.grid.length || !config.grid[0].length) {
    throw new Error('Grid inválido: deve ter pelo menos 1 linha e 1 coluna');
  }
  if (config.criaturas.length === 0) {
    throw new Error('Deve haver pelo menos 1 criatura');
  }
  if (config.tempoTotalMs <= 0) {
    throw new Error('tempoTotalMs deve ser positivo');
  }
  const totalCriaturas = config.criaturas.length + (config.filaSpawn?.length ?? 0);
  if (config.metaCriaturas <= 0 || config.metaCriaturas > totalCriaturas) {
    throw new Error('metaCriaturas deve estar entre 1 e o total de criaturas');
  }

  // Valida que todas as criaturas começam em posições válidas
  const rows = config.grid.length;
  const cols = config.grid[0].length;
  for (const c of config.criaturas) {
    if (c.x < 0 || c.x >= cols || c.y < 0 || c.y >= rows) {
      throw new Error(`Criatura ${c.id} em posição inválida: (${c.x}, ${c.y})`);
    }
  }

  return {
    grid: cloneGrid(config.grid),
    criaturas: cloneCriaturas(config.criaturas),
    timerRestanteMs: config.tempoTotalMs,
    tempoTotalMs: config.tempoTotalMs,
    metaCriaturas: config.metaCriaturas,
    status: 'running',
    tickCount: 0,
    criaturasSalvas: 0,
    criaturasPerdidas: 0,
    filaSpawn: (config.filaSpawn ?? []).map((s) => ({ ...s })),
    intervaloSpawn: config.intervaloSpawn ?? 3,
    maxCriaturasAtivas: config.maxCriaturasAtivas ?? 3,
    ticksDesdeUltimoSpawn: 0,
  };
}

/**
 * Executa um tick do jogo.
 *
 * A cada tick:
 * 1. Decrementa o timer
 * 2. Move cada criatura viva para a direita
 * 3. Verifica quedas e chegadas à saída
 * 4. Verifica condições de vitória/derrota
 *
 * @param state - Estado atual (não é mutado)
 * @param deltaMs - Milissegundos a decrementar do timer
 * @returns Novo estado após o tick
 */
export function tick(state: EngineState, deltaMs: number): EngineState {
  if (state.status !== 'running') return state;

  const novoTimer = Math.max(0, state.timerRestanteMs - deltaMs);
  const novasCriaturas = cloneCriaturas(state.criaturas);
  const cols = state.grid[0]?.length ?? 0;
  const rows = state.grid.length;

  // ─── Spawn da fila ──────────────────────────────────────────────
  let fila = [...state.filaSpawn];
  let ticksSpawn = state.ticksDesdeUltimoSpawn + 1;

  if (fila.length > 0 && ticksSpawn >= state.intervaloSpawn) {
    const ativas = novasCriaturas.filter((c) => c.vivo && !c.chegouSaida).length;
    if (ativas < state.maxCriaturasAtivas) {
      const proximo = fila.shift()!;
      novasCriaturas.push({
        id: proximo.id,
        x: proximo.x,
        y: proximo.y,
        vivo: true,
        chegouSaida: false,
        efeitoEmpurrar: 0,
        efeitoBloquear: 0,
      });
      ticksSpawn = 0;
    }
  }

  let salvas = state.criaturasSalvas;
  let perdidas = state.criaturasPerdidas;

  for (const c of novasCriaturas) {
    if (!c.vivo || c.chegouSaida) continue;

    // Bloquear: não se move neste tick
    if (c.efeitoBloquear > 0) {
      c.efeitoBloquear--;
      continue;
    }

    // Empurrar: move 2 colunas em vez de 1
    const passos = c.efeitoEmpurrar > 0 ? 2 : 1;
    if (c.efeitoEmpurrar > 0) c.efeitoEmpurrar--;

    for (let p = 0; p < passos; p++) {
      if (!c.vivo || c.chegouSaida) break;

      const proxX = c.x + 1;

      // Saiu do grid pela direita → vitória
      if (proxX >= cols) {
        c.chegouSaida = true;
        salvas++;
        break;
      }

      // Tile de saída
      if (state.grid[c.y]?.[proxX] === 'exit') {
        c.x = proxX;
        c.chegouSaida = true;
        salvas++;
        break;
      }

      // Verifica terreno abaixo da próxima posição
      const yAbaixo = c.y + 1;
      const temTerrenoAbaixo =
        yAbaixo < rows && state.grid[yAbaixo]?.[proxX] === 'terrain';

      if (!temTerrenoAbaixo) {
        // Caiu no vazio → morre
        c.vivo = false;
        perdidas++;
        break;
      }

      // Anda para a direita
      c.x = proxX;
    }
  }

  // Determina novo status
  let novoStatus: EngineStatus = 'running';

  if (salvas >= state.metaCriaturas) {
    novoStatus = 'victory';
  } else if (novoTimer <= 0) {
    novoStatus = 'defeat';
  } else {
    // Derrota se todas as criaturas estão mortas e nenhuma foi salva
    const algumaViva = novasCriaturas.some((c) => c.vivo && !c.chegouSaida);
    if (!algumaViva && salvas === 0) {
      novoStatus = 'defeat';
    }
  }

  return {
    ...state,
    criaturas: novasCriaturas,
    timerRestanteMs: novoTimer,
    status: novoStatus,
    tickCount: state.tickCount + 1,
    criaturasSalvas: salvas,
    criaturasPerdidas: perdidas,
    filaSpawn: fila,
    ticksDesdeUltimoSpawn: ticksSpawn,
  };
}

/**
 * Aplica uma skill no grid ou em criaturas próximas.
 *
 * @returns Novo estado com a skill aplicada, ou o mesmo estado se a skill falhar
 */
export function aplicarSkill(
  state: EngineState,
  skillId: string,
  coluna: number,
  linha: number,
): EngineState {
  if (state.status !== 'running') return state;

  const cols = state.grid[0]?.length ?? 0;
  const rows = state.grid.length;

  if (coluna < 0 || coluna >= cols || linha < 0 || linha >= rows) {
    return state;
  }

  const novoGrid = cloneGrid(state.grid);
  const novasCriaturas = cloneCriaturas(state.criaturas);

  switch (skillId) {
    case 'escavar':
      if (novoGrid[linha][coluna] === 'terrain') {
        novoGrid[linha][coluna] = 'empty';
      }
      break;

    case 'construir':
      if (novoGrid[linha][coluna] === 'empty') {
        novoGrid[linha][coluna] = 'terrain';
      }
      break;

    case 'bloquear':
      aplicarEfeitoEmCriaturaProxima(novasCriaturas, coluna, linha, 'bloquear', 3);
      break;

    case 'empurrar':
      aplicarEfeitoEmCriaturaProxima(novasCriaturas, coluna, linha, 'empurrar', 5);
      break;

    default:
      return state;
  }

  return { ...state, grid: novoGrid, criaturas: novasCriaturas };
}

/**
 * Verifica vitória: criaturasSalvas >= metaCriaturas.
 */
export function verificarVitoria(state: EngineState): boolean {
  return state.criaturasSalvas >= state.metaCriaturas;
}

/**
 * Verifica derrota: timer zerou ou todas criaturas mortas sem salva.
 */
export function verificarDerrota(state: EngineState): boolean {
  if (state.timerRestanteMs <= 0) return true;

  const algumaViva = state.criaturas.some((c) => c.vivo && !c.chegouSaida);
  return !algumaViva && state.criaturasSalvas === 0;
}

// ─── Helpers internos ─────────────────────────────────────────────────────

function aplicarEfeitoEmCriaturaProxima(
  criaturas: CreatureRuntime[],
  coluna: number,
  linha: number,
  efeito: 'bloquear' | 'empurrar',
  duracao: number,
): void {
  let melhor: CreatureRuntime | null = null;
  let menorDist = Infinity;

  for (const c of criaturas) {
    if (!c.vivo || c.chegouSaida) continue;
    const dist = Math.abs(c.x - coluna) + Math.abs(c.y - linha);
    if (dist < menorDist) {
      menorDist = dist;
      melhor = c;
    }
  }

  if (melhor) {
    if (efeito === 'bloquear') {
      melhor.efeitoBloquear = duracao;
    } else {
      melhor.efeitoEmpurrar = duracao;
    }
  }
}
