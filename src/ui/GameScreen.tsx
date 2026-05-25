/**
 * GameScreen — Tela principal de gameplay.
 *
 * Integra o engine de jogo, renderiza o grid com criaturas,
 * gerencia seleção de skills e game loop via requestAnimationFrame.
 *
 * SEGUE UI_UX_GUIDE.md:
 * - Seção 4.1: layout organizado, grid centralizado
 * - Seção 4.2: usa tokens de theme.ts para cores
 * - Seção 5.1: botões de skill no HUD com ação clara
 * - Seção 6: estados de running, victory, defeat
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { colors, spacing, borderRadius } from './theme';
import HUD from './HUD';
import type { HUDSkillState } from './HUD';
import {
  criarEstadoInicial,
  tick,
  aplicarSkill,
  type EngineConfig,
  type EngineState,
  type TileType,
  type CreatureRuntime,
  type EngineStatus,
} from '../game/engine';
import type { LvlConfig } from '../core/lvl_config';
import { SKILL_DEFINITIONS } from '../game/skills';

// ─── Props ────────────────────────────────────────────────────────────────

interface GameScreenProps {
  /** Configuração do nível a ser jogado */
  nivel: LvlConfig;
  /** Chamado quando o jogador vence */
  onVitoria: (criaturasSalvas: number, tempoRestante: number) => void;
  /** Chamado quando o jogador perde */
  onDerrota: (motivo: string) => void;
}

// ─── Constantes ───────────────────────────────────────────────────────────

const TICK_MS = 800; // ~1.25 ticks/segundo para um ritmo agradável
const COLS = 10;
const ROWS = 6;
const CELL_SIZE = 48; // px no desktop

/** Gera o grid do Nível 1 */
function criarGridNivel1(): TileType[][] {
  const grid: TileType[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: TileType[] = [];
    for (let c = 0; c < COLS; c++) {
      if (r >= 3) {
        // Linhas 3-5: terreno, com um gap na coluna 5
        row.push(c === 5 && r === 3 ? 'empty' : 'terrain');
      } else if (r === 0 && c === COLS - 1) {
        // Canto superior direito: saída
        row.push('exit');
      } else {
        row.push('empty');
      }
    }
    grid.push(row);
  }
  // Garante terreno abaixo da saída
  grid[1][COLS - 1] = 'terrain';
  grid[2][COLS - 1] = 'terrain';
  // Cria caminho de terreno nas linhas 1-2 nas colunas sem gap
  for (let c = 0; c < COLS; c++) {
    if (c !== 5) {
      grid[1][c] = 'terrain';
      grid[2][c] = 'terrain';
    }
  }
  return grid;
}

function criarCriaturasIniciais(): CreatureRuntime[] {
  const criaturas: CreatureRuntime[] = [];
  for (let i = 0; i < 5; i++) {
    criaturas.push({
      id: `c${i + 1}`,
      x: 0,
      y: 0, // andam na linha 0, terreno abaixo na linha 1
      vivo: true,
      chegouSaida: false,
      efeitoEmpurrar: 0,
      efeitoBloquear: 0,
    });
  }
  return criaturas;
}

// ─── Estilos ──────────────────────────────────────────────────────────────

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100dvh',
  backgroundColor: colors.background,
  paddingTop: 120, // espaço para o HUD fixo
  boxSizing: 'border-box',
};

const gridWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  padding: spacing.md,
};

// ─── Helpers de renderização ──────────────────────────────────────────────

function corDoTile(tile: TileType): string {
  switch (tile) {
    case 'terrain':
      return '#8B7355';
    case 'exit':
      return '#4CAF50';
    case 'empty':
      return 'transparent';
  }
}

function corDaCriatura(viva: boolean, chegou: boolean): string {
  if (chegou) return '#4CAF50';
  if (!viva) return '#B91C1C';
  return '#1D4ED8';
}

// ─── Componente ───────────────────────────────────────────────────────────

export default function GameScreen({ nivel, onVitoria, onDerrota }: GameScreenProps) {
  const [engineState, setEngineState] = useState<EngineState | null>(null);
  const [skillSelecionada, setSkillSelecionada] = useState<string | null>(null);
  const [status, setStatus] = useState<EngineStatus>('running');

  const animFrameRef = useRef<number>(0);
  const ultimoTickRef = useRef<number>(0);
  const stateRef = useRef<EngineState | null>(null);

  // Inicializa o engine
  useEffect(() => {
    const grid = criarGridNivel1();
    const criaturas = criarCriaturasIniciais();

    const config: EngineConfig = {
      grid,
      criaturas,
      tempoTotalMs: 60000, // 1 minuto
      metaCriaturas: 3, // precisa salvar 3 de 5
    };

    const inicial = criarEstadoInicial(config);
    setEngineState(inicial);
    stateRef.current = inicial;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Game loop
  useEffect(() => {
    if (!engineState || status !== 'running') return;

    ultimoTickRef.current = performance.now();

    const loop = (now: number) => {
      const delta = now - ultimoTickRef.current;

      if (delta >= TICK_MS && stateRef.current) {
        const novo = tick(stateRef.current, delta);
        stateRef.current = novo;
        setEngineState(novo);

        if (novo.status === 'victory') {
          setStatus('victory');
          onVitoria(novo.criaturasSalvas, Math.ceil(novo.timerRestanteMs / 1000));
          return;
        }
        if (novo.status === 'defeat') {
          setStatus('defeat');
          onDerrota(
            novo.timerRestanteMs <= 0
              ? 'O tempo acabou'
              : 'Todas as criaturas morreram',
          );
          return;
        }

        ultimoTickRef.current = now;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [engineState !== null, status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handler de skill
  const handleSkillClick = useCallback(
    (skillId: string) => {
      if (!stateRef.current || stateRef.current.status !== 'running') return;

      // Se a skill já está selecionada, desseleciona
      if (skillSelecionada === skillId) {
        setSkillSelecionada(null);
        return;
      }

      setSkillSelecionada(skillId);
    },
    [skillSelecionada],
  );

  // Handler de clique no grid
  const handleGridClick = useCallback(
    (col: number, row: number) => {
      if (!skillSelecionada || !stateRef.current) return;
      if (stateRef.current.status !== 'running') return;

      const novo = aplicarSkill(stateRef.current, skillSelecionada, col, row);
      stateRef.current = novo;
      setEngineState(novo);
      setSkillSelecionada(null); // desseleciona após aplicar
    },
    [skillSelecionada],
  );

  // Constrói dados do HUD
  const hudSkills: HUDSkillState[] = SKILL_DEFINITIONS.map((def) => {
    const engineSkill = engineState?.criaturas
      ? { disponivel: true, cooldownRestanteMs: 0 }
      : { disponivel: true, cooldownRestanteMs: 0 };

    return {
      id: def.id,
      nome: def.nome,
      disponivel: engineSkill.disponivel,
      cooldownRestanteMs: engineSkill.cooldownRestanteMs,
    };
  });

  const criaturasVivas = engineState
    ? engineState.criaturas.filter((c) => c.vivo && !c.chegouSaida).length
    : 5;

  const timerPct = engineState
    ? Math.round((engineState.timerRestanteMs / engineState.tempoTotalMs) * 100)
    : 100;

  const tempoSeg = engineState
    ? Math.ceil(engineState.timerRestanteMs / 1000)
    : 60;

  if (!engineState) {
    return <div style={containerStyle}>Carregando...</div>;
  }

  return (
    <div style={containerStyle}>
      <HUD
        criaturasRestantes={criaturasVivas}
        nomeNivel={nivel.nome}
        timerPorcentagem={timerPct}
        tempoRestante={tempoSeg}
        skills={hudSkills}
        skillSelecionada={skillSelecionada}
        onSkillClick={handleSkillClick}
      />

      {skillSelecionada && (
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: colors.primary,
            color: '#FFF',
            borderRadius: borderRadius.button,
            marginTop: spacing.xs,
            fontSize: 14,
          }}
        >
          Skill: {SKILL_DEFINITIONS.find((s) => s.id === skillSelecionada)?.nome ?? skillSelecionada} —
          clique no grid para usar
        </div>
      )}

      <div style={gridWrapperStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
            gap: 1,
            backgroundColor: '#E2E8F0',
            border: `2px solid ${colors.border}`,
            borderRadius: borderRadius.card,
            overflow: 'hidden',
          }}
        >
          {engineState.grid.map((row, rowIdx) =>
            row.map((tile, colIdx) => {
              // Encontra criaturas nesta célula
              const criaturasNaCelula = engineState.criaturas.filter(
                (c) => c.x === colIdx && c.y === rowIdx && (c.vivo || c.chegouSaida),
              );

              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleGridClick(colIdx, rowIdx)}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: corDoTile(tile),
                    position: 'relative',
                    cursor: skillSelecionada ? 'crosshair' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {criaturasNaCelula.map((criatura) => (
                    <div
                      key={criatura.id}
                      title={criatura.id}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: corDaCriatura(criatura.vivo, criatura.chegouSaida),
                        border: '1px solid rgba(255,255,255,0.5)',
                      }}
                    />
                  ))}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
