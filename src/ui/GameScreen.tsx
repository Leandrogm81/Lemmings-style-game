/**
 * GameScreen — Tela principal de gameplay com visual reformulado.
 *
 * Fundo escuro, tiles de terra com textura, criaturas visíveis,
 * gap destacado, saída brilhante.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { colors, spacing, borderRadius, shadow } from './theme';
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
  type SpawnItem,
  type EngineStatus,
} from '../game/engine';
import type { LvlConfig } from '../core/lvl_config';
import { SKILL_DEFINITIONS } from '../game/skills';

interface GameScreenProps {
  nivel: LvlConfig;
  onVitoria: (criaturasSalvas: number, tempoRestante: number) => void;
  onDerrota: (motivo: string) => void;
}

const TICK_MS = 600;
const COLS = 10;
const ROWS = 6;

// ─── Grid / spawn helpers ──────────────────────────────────────────────

function criarGridNivel1(): TileType[][] {
  const grid: TileType[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: TileType[] = [];
    for (let c = 0; c < COLS; c++) {
      if (r >= 1 && r <= 3) {
        row.push(c === 7 ? 'empty' : 'terrain');
      } else if (r === 0 && c === COLS - 1) {
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

function criarCriaturasIniciais(): CreatureRuntime[] {
  return [{
    id: 'c1', x: 0, y: 0,
    vivo: true, chegouSaida: false,
    efeitoEmpurrar: 0, efeitoBloquear: 0,
  }];
}

function criarFilaSpawn(): SpawnItem[] {
  return [
    { id: 'c2', x: 0, y: 0 },
    { id: 'c3', x: 0, y: 0 },
    { id: 'c4', x: 0, y: 0 },
    { id: 'c5', x: 0, y: 0 },
  ];
}

// ─── Render helpers ──────────────────────────────────────────────────

function corDoTile(tile: TileType): string {
  switch (tile) {
    case 'terrain': return colors.terrain;
    case 'exit': return colors.exit;
    case 'empty': return 'transparent';
  }
}

/** Renderiza uma criatura como um boneco simples */
function CreatureSprite({ criatura, cellSize }: { criatura: CreatureRuntime; cellSize: number }) {
  const size = Math.round(cellSize * 0.5);
  const isDead = !criatura.vivo && !criatura.chegouSaida;
  const isSaved = criatura.chegouSaida;
  const color = isSaved ? colors.creatureSaved : (isDead ? colors.creatureDead : colors.creature);

  return (
    <div
      title={`${criatura.id}${isDead ? ' (morta)' : ''}${isSaved ? ' (salva)' : ''}`}
      style={{
        position: 'relative',
        width: size,
        height: Math.round(size * 1.2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDead ? 0.4 : 1,
        transition: 'transform 0.15s ease, opacity 0.3s ease',
      }}
    >
      {/* Corpo */}
      <div
        style={{
          width: size * 0.7,
          height: size * 0.65,
          borderRadius: `${size * 0.2}px ${size * 0.2}px ${size * 0.1}px ${size * 0.1}px`,
          background: `linear-gradient(180deg, ${color} 0%, ${color}dd 100%)`,
          boxShadow: isSaved ? `0 0 8px ${color}` : 'none',
          display: 'flex',
          justifyContent: 'center',
          gap: size * 0.1,
          paddingTop: size * 0.15,
          position: 'relative',
        }}
      >
        {/* Olhos */}
        <div style={{ width: size * 0.15, height: size * 0.15, borderRadius: '50%', backgroundColor: '#fff' }} />
        <div style={{ width: size * 0.15, height: size * 0.15, borderRadius: '50%', backgroundColor: '#fff' }} />
        {/* Sorriso quando salvo */}
        {isSaved && (
          <div style={{ position: 'absolute', bottom: size * 0.08, width: size * 0.3, height: size * 0.08, borderBottom: `2px solid #fff`, borderRadius: '50%' }} />
        )}
      </div>
      {/* Perninhas */}
      <div style={{ display: 'flex', gap: size * 0.15 }}>
        <div style={{ width: size * 0.18, height: size * 0.2, borderRadius: '0 0 3px 3px', backgroundColor: color, opacity: 0.7 }} />
        <div style={{ width: size * 0.18, height: size * 0.2, borderRadius: '0 0 3px 3px', backgroundColor: color, opacity: 0.7 }} />
      </div>
    </div>
  );
}

function renderTileConteudo(
  tile: TileType,
  rowIdx: number,
  colIdx: number,
  isGap: boolean,
  criaturasNaCelula: CreatureRuntime[],
  cellSize: number,
): React.ReactNode {
  // Gap — abismo com borda vermelha pulsante
  if (isGap && tile === 'empty') {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center, ${colors.error}22 0%, transparent 70%)`,
            border: '2px dashed rgba(239,68,68,0.5)',
            borderRadius: 4,
            pointerEvents: 'none',
            animation: 'gapPulse 2s ease-in-out infinite',
          }}
        />
        {criaturasNaCelula.map((c) => (
          <CreatureSprite key={c.id} criatura={c} cellSize={cellSize} />
        ))}
      </>
    );
  }

  // Saída — glow verde
  if (tile === 'exit') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.exit}33 0%, transparent 70%)`,
          animation: 'exitGlow 2s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: cellSize * 0.4, lineHeight: 1 }}>🚪</span>
      </div>
    );
  }

  return criaturasNaCelula.map((c) => (
    <CreatureSprite key={c.id} criatura={c} cellSize={cellSize} />
  ));
}

// ─── Componente principal ─────────────────────────────────────────────

export default function GameScreen({ nivel, onVitoria, onDerrota }: GameScreenProps) {
  const [engineState, setEngineState] = useState<EngineState | null>(null);
  const [skillSelecionada, setSkillSelecionada] = useState<string | null>(null);
  const [status, setStatus] = useState<EngineStatus>('running');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const animFrameRef = useRef<number>(0);
  const ultimoTickRef = useRef<number>(0);
  const stateRef = useRef<EngineState | null>(null);

  const CELL_SIZE = Math.max(32, Math.min(56, Math.floor((windowWidth - 40) / COLS)));

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inicializa o engine
  useEffect(() => {
    const grid = criarGridNivel1();
    const criaturas = criarCriaturasIniciais();
    const config: EngineConfig = {
      grid, criaturas,
      tempoTotalMs: 90000,
      metaCriaturas: 3,
      filaSpawn: criarFilaSpawn(),
      intervaloSpawn: 4,
      maxCriaturasAtivas: 2,
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
            novo.timerRestanteMs <= 0 ? 'O tempo acabou' : 'Todas as criaturas morreram',
          );
          return;
        }
        ultimoTickRef.current = now;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [engineState !== null, status, onVitoria, onDerrota]);

  const handleSkillClick = useCallback(
    (skillId: string) => {
      if (!stateRef.current || stateRef.current.status !== 'running') return;
      setSkillSelecionada((prev) => (prev === skillId ? null : skillId));
    },
    [],
  );

  const handleGridClick = useCallback(
    (col: number, row: number) => {
      if (!skillSelecionada || !stateRef.current) return;
      if (stateRef.current.status !== 'running') return;
      const novo = aplicarSkill(stateRef.current, skillSelecionada, col, row);
      stateRef.current = novo;
      setEngineState(novo);
      setSkillSelecionada(null);
    },
    [skillSelecionada],
  );

  const hudSkills: HUDSkillState[] = SKILL_DEFINITIONS.map((def) => ({
    id: def.id,
    nome: def.nome,
    disponivel: true,
    cooldownRestanteMs: 0,
  }));

  const criaturasVivas = engineState
    ? engineState.criaturas.filter((c) => c.vivo && !c.chegouSaida).length
    : 1;

  const timerPct = engineState
    ? Math.round((engineState.timerRestanteMs / engineState.tempoTotalMs) * 100)
    : 100;

  const tempoSeg = engineState
    ? Math.ceil(engineState.timerRestanteMs / 1000)
    : 90;

  if (!engineState) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100dvh', background: colors.bg, color: colors.textMuted,
      }}>
        Carregando...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100dvh',
      background: `linear-gradient(180deg, ${colors.bg} 0%, #0f0f23 50%, #0a0a18 100%)`,
      paddingTop: 130,
      boxSizing: 'border-box',
    }}>
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
            padding: '6px 16px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
            color: '#fff',
            borderRadius: borderRadius.button,
            marginTop: spacing.xs,
            marginBottom: spacing.xs,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: `0 0 16px ${colors.primary}40`,
          }}
        >
          {SKILL_DEFINITIONS.find((s) => s.id === skillSelecionada)?.nome ?? skillSelecionada} — clique no grid para usar
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', padding: spacing.sm }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
            gap: 1,
            backgroundColor: colors.abyss,
            border: `2px solid ${colors.primary}30`,
            borderRadius: borderRadius.card,
            overflow: 'hidden',
            boxShadow: `0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          <style>{`
            @keyframes gapPulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            @keyframes exitGlow {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
            .grid-cell {
              transition: background-color 0.15s ease;
            }
            .grid-cell:hover {
              filter: brightness(1.2);
            }
            .grid-cell.skill-active {
              cursor: crosshair;
            }
          `}</style>
          {engineState.grid.map((row, rowIdx) =>
            row.map((tile, colIdx) => {
              const criaturasNaCelula = engineState.criaturas.filter(
                (c) => c.x === colIdx && c.y === rowIdx && (c.vivo || c.chegouSaida),
              );
              const isGap = colIdx === 7 && rowIdx >= 1 && rowIdx <= 3;
              // Terrain tiles with subtle texture
              let tileBg = corDoTile(tile);
              if (tile === 'terrain' && !isGap) {
                tileBg = rowIdx % 2 === colIdx % 2 ? colors.terrain : colors.terrainDark;
              }

              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleGridClick(colIdx, rowIdx)}
                  className={`grid-cell${skillSelecionada ? ' skill-active' : ''}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: tileBg,
                    position: 'relative',
                    cursor: skillSelecionada ? 'crosshair' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                    gap: 1,
                    // Efeito xadrez sutil no terreno
                    ...(tile === 'empty' && !isGap && {
                      background: `radial-gradient(circle at center, ${colors.abyss} 0%, #0a0a14 100%)`,
                    }),
                  }}
                >
                  {renderTileConteudo(tile, rowIdx, colIdx, isGap, criaturasNaCelula, CELL_SIZE)}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
