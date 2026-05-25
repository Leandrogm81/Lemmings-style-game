/**
 * Testes de componentes UI usando renderToString (sem necessidade de jsdom/DOM).
 * Verifica que cada componente renderiza sem erro e com conteúdo esperado.
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Button from './Button';
import MenuScreen from './MenuScreen';
import LevelSelectionScreen from './LevelSelectionScreen';
import LevelItem from './LevelItem';
import HUD from './HUD';
import TimerBar from './TimerBar';
import SkillButton from './SkillButton';
import AdScreen from './AdScreen';
import VictoryScreen from './VictoryScreen';
import DefeatScreen from './DefeatScreen';
import GameScreen from './GameScreen';
import type { LevelData } from './levels';
import type { LvlConfig } from '../core/lvl_config';

// ─── Button ───────────────────────────────────────────────────────────

describe('Button', () => {
  it('deve renderizar com texto', () => {
    const html = renderToString(<Button>Jogar</Button>);
    expect(html).toContain('Jogar');
  });

  it('deve renderizar variante primary por padrão', () => {
    const html = renderToString(<Button>Teste</Button>);
    expect(html).toContain('Teste');
    expect(html).toContain('button');
  });
});

// ─── MenuScreen ───────────────────────────────────────────────────────

describe('MenuScreen', () => {
  it('deve renderizar título e botões', () => {
    const html = renderToString(<MenuScreen />);
    expect(html).toContain('Lemmings');
    expect(html).toContain('Jogar');
    expect(html).toContain('Opções');
  });

  it('deve mostrar botões de debug', () => {
    const html = renderToString(<MenuScreen />);
    expect(html).toContain('[Debug] Vitória');
    expect(html).toContain('[Debug] Derrota');
  });
});

// ─── LevelItem ────────────────────────────────────────────────────────

describe('LevelItem', () => {
  const levelUnlocked: LevelData = { id: 1, nome: 'Nível 1', desbloqueado: true };
  const levelLocked: LevelData = { id: 2, nome: 'Nível 2', desbloqueado: false };

  it('deve mostrar nome e status disponível quando desbloqueado', () => {
    const html = renderToString(<LevelItem level={levelUnlocked} />);
    expect(html).toContain('Nível 1');
    expect(html).toContain('Disponível');
  });

  it('deve mostrar status bloqueado quando bloqueado', () => {
    const html = renderToString(<LevelItem level={levelLocked} />);
    expect(html).toContain('Nível 2');
    expect(html).toContain('Bloqueado');
  });
});

// ─── LevelSelectionScreen ─────────────────────────────────────────────

describe('LevelSelectionScreen', () => {
  it('deve renderizar título e lista de níveis', () => {
    const html = renderToString(<LevelSelectionScreen />);
    expect(html).toContain('Selecionar Nível');
    expect(html).toContain('Nível 1');
    expect(html).toContain('Nível 5');
  });
});

// ─── TimerBar ─────────────────────────────────────────────────────────

describe('TimerBar', () => {
  it('deve renderizar com porcentagem', () => {
    const html = renderToString(<TimerBar porcentagem={75} />);
    expect(html).toContain('75');
  });

  it('deve exibir texto de tempo quando tempoRestante for fornecido', () => {
    const html = renderToString(<TimerBar porcentagem={50} tempoRestante={60} />);
    expect(html).toContain('60s');
  });

  it('não deve exibir texto de tempo quando tempoRestante for undefined', () => {
    const html = renderToString(<TimerBar porcentagem={50} />);
    expect(html).not.toContain('>60s<');
    expect(html).not.toContain('>50s<');
  });

  it('deve limitar porcentagem entre 0 e 100', () => {
    const html = renderToString(<TimerBar porcentagem={150} />);
    expect(html).toContain('100');
  });
});

// ─── SkillButton ──────────────────────────────────────────────────────

describe('SkillButton', () => {
  it('deve renderizar nome da skill', () => {
    const html = renderToString(<SkillButton nome="Escavar" />);
    expect(html).toContain('Escavar');
  });

  it('deve renderizar desabilitado quando inativo', () => {
    const html = renderToString(<SkillButton nome="Escavar" ativo={false} />);
    expect(html).toContain('disabled');
  });

  it('deve renderizar habilitado quando ativo', () => {
    const html = renderToString(<SkillButton nome="Escavar" ativo={true} />);
    expect(html).not.toContain('disabled=""');
  });
});

// ─── HUD ──────────────────────────────────────────────────────────────

describe('HUD', () => {
  it('deve renderizar informações do HUD', () => {
    const html = renderToString(<HUD />).replace(/<!-- -->/g, '');
    expect(html).toContain('x5');
    expect(html).toContain('Nível 1');
  });

  it('deve renderizar skills', () => {
    const html = renderToString(<HUD />);
    expect(html).toContain('Escavar');
    expect(html).toContain('Construir');
    expect(html).toContain('Bloquear');
    expect(html).toContain('Empurrar');
  });
});

// ─── AdScreen ─────────────────────────────────────────────────────────

describe('AdScreen', () => {
  it('deve renderizar estado padrão com botão Sair agora', () => {
    const html = renderToString(<AdScreen onClose={() => {}} />);
    expect(html).toContain('Anúncio');
    expect(html).toContain('Sair agora');
  });

  it('deve renderizar estado de loading', () => {
    const html = renderToString(<AdScreen onClose={() => {}} isLoading={true} />);
    expect(html).toContain('Carregando anúncio...');
  });

  it('deve renderizar estado de erro', () => {
    const html = renderToString(<AdScreen onClose={() => {}} error="Falha ao carregar" />);
    expect(html).toContain('Falha ao carregar');
    expect(html).toContain('Fechar');
  });
});

// ─── HUD — props dinâmicas ────────────────────────────────────────────

describe('HUD — props dinâmicas', () => {
  it('deve usar valores padrão quando sem props', () => {
    const html = renderToString(<HUD />).replace(/<!-- -->/g, '');
    expect(html).toContain('x5');
    expect(html).toContain('Nível 1');
  });

  it('deve refletir props personalizadas', () => {
    const html = renderToString(
      <HUD
        criaturasRestantes={3}
        nomeNivel="Nível 2"
        timerPorcentagem={50}
        tempoRestante={30}
      />,
    ).replace(/<!-- -->/g, '');
    expect(html).toContain('x3');
    expect(html).toContain('Nível 2');
    expect(html).toContain('30s');
  });
});

// ─── VictoryScreen ────────────────────────────────────────────────────

describe('VictoryScreen', () => {
  it('deve renderizar mensagem de vitória', () => {
    const html = renderToString(<VictoryScreen onMenu={() => {}} />);
    expect(html).toContain('Vitória!');
    expect(html).toContain('Menu');
  });

  it('deve mostrar estatísticas', () => {
    const html = renderToString(
      <VictoryScreen
        nomeNivel="Nível 3"
        criaturasSalvas={4}
        tempoRestante={25}
        onMenu={() => {}}
      />,
    ).replace(/<!-- -->/g, '');
    expect(html).toContain('Nível 3');
    expect(html).toContain('Criaturas salvas: 4');
    expect(html).toContain('25s');
  });

  it('deve mostrar botão próximo nível quando fornecido', () => {
    const html = renderToString(
      <VictoryScreen onMenu={() => {}} onProximoNivel={() => {}} />,
    );
    expect(html).toContain('Próximo nível');
  });

  it('não deve mostrar botão próximo nível quando ausente', () => {
    const html = renderToString(<VictoryScreen onMenu={() => {}} />);
    expect(html).not.toContain('Próximo nível');
  });
});

// ─── DefeatScreen ─────────────────────────────────────────────────────

describe('DefeatScreen', () => {
  it('deve renderizar mensagem de derrota', () => {
    const html = renderToString(
      <DefeatScreen onMenu={() => {}} onTentarNovamente={() => {}} />,
    );
    expect(html).toContain('Derrota');
    expect(html).toContain('Tentar novamente');
    expect(html).toContain('Menu');
  });

  it('deve mostrar motivo da derrota', () => {
    const html = renderToString(
      <DefeatScreen
        nomeNivel="Nível 2"
        motivo="Todas as criaturas morreram"
        onMenu={() => {}}
        onTentarNovamente={() => {}}
      />,
    );
    expect(html).toContain('Nível 2');
    expect(html).toContain('Todas as criaturas morreram');
  });
});

// ─── GameScreen — renderização inicial ────────────────────────────────

describe('GameScreen', () => {
  const nivelMock: LvlConfig = {
    id: 1,
    nome: 'Nível 1',
    requisitosCriaturas: ['c1', 'c2', 'c3'],
    listaHabilidadesDisponiveis: ['escavar', 'construir', 'bloquear', 'empurrar'],
  };

  it('deve renderizar estado de carregamento inicial (sem DOM)', () => {
    const html = renderToString(
      <GameScreen
        nivel={nivelMock}
        onVitoria={(_salvas, _tempo) => {}}
        onDerrota={(_motivo) => {}}
      />,
    );
    // Sem useEffect (renderToString), o estado inicial é null → mostra loading
    expect(html).toContain('Carregando...');
  });
});
