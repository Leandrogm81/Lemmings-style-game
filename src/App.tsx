import { useState, useCallback, useRef } from 'react'
import MenuScreen from './ui/MenuScreen'
import LevelSelectionScreen from './ui/LevelSelectionScreen'
import GameScreen from './ui/GameScreen'
import VictoryScreen from './ui/VictoryScreen'
import DefeatScreen from './ui/DefeatScreen'
import AdScreen from './ui/AdScreen'
import {
  registrarVitoria,
  registrarDerrota,
  deveExibirAnuncio,
  resetarAposExibicao,
  getStreaks,
} from './ads/ads_manager'
import { carregarAnuncioIntersticial } from './ads/sdk_adapter'
import { saveProgress } from './storage/progress'
import type { ProgressoJogador } from './core/progresso_jogador'
import type { LvlConfig } from './core/lvl_config'

/** Estado atual da tela do jogo */
type Screen = 'menu' | 'levelSelect' | 'game' | 'victory' | 'defeat';

/** Configurações dos níveis (mock — futuramente virá de um arquivo de levels) */
const LEVEL_CONFIGS: Record<number, LvlConfig> = {
  1: {
    id: 1,
    nome: 'Nível 1',
    requisitosCriaturas: ['c1', 'c2', 'c3', 'c4', 'c5'],
    listaHabilidadesDisponiveis: ['escavar', 'construir', 'bloquear', 'empurrar'],
  },
  2: {
    id: 2,
    nome: 'Nível 2',
    requisitosCriaturas: ['c1', 'c2', 'c3', 'c4', 'c5'],
    listaHabilidadesDisponiveis: ['escavar', 'construir', 'bloquear', 'empurrar'],
  },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [nivelAtual, setNivelAtual] = useState<LvlConfig>(LEVEL_CONFIGS[1])
  const [showAd, setShowAd] = useState(false)
  const [adLoading, setAdLoading] = useState(false)
  const [adError, setAdError] = useState<string | null>(null)
  const adCloseRef = useRef(false)

  // Estado da última partida para telas de vitória/derrota
  const [ultimoResultado, setUltimoResultado] = useState<{
    criaturasSalvas: number
    tempoRestante: number
    motivoDerrota?: string
  }>({ criaturasSalvas: 0, tempoRestante: 0 })

  /**
   * Inicia o fluxo de exibição do anúncio intersticial.
   */
  const iniciarExibicaoAnuncio = useCallback(async () => {
    adCloseRef.current = false
    setAdLoading(true)
    setAdError(null)
    setShowAd(true)

    const resultado = await carregarAnuncioIntersticial()

    if (adCloseRef.current) return

    setAdLoading(false)

    if (!resultado.sucesso) {
      setAdError(
        resultado.erro || 'Não foi possível carregar o anúncio. Toque em Fechar para continuar.',
      )
    }
  }, [])

  /**
   * Callback chamado quando o jogador fecha o anúncio.
   */
  const handleAdClose = useCallback(() => {
    adCloseRef.current = true
    resetarAposExibicao()
    setAdLoading(false)
    setAdError(null)
    setShowAd(false)
    setScreen('menu')
  }, [])

  /**
   * Salva progresso: desbloqueia níveis concluídos.
   */
  const salvarProgresso = useCallback((nivelId: number) => {
    const progresso: ProgressoJogador = {
      niveisDesbloqueados: [1],
      estrelasPorNivel: {},
      tempoPorNivel: {},
      tentativasPorNivel: {},
    }

    // Desbloqueia o próximo nível se existir
    const proximoId = nivelId + 1
    if (LEVEL_CONFIGS[proximoId]) {
      progresso.niveisDesbloqueados.push(proximoId)
    }

    // Tenta carregar progresso existente para preservar outros dados
    try {
      const json = localStorage.getItem('lemmings_progresso')
      if (json) {
        const existente = JSON.parse(json) as ProgressoJogador
        // Mescla níveis desbloqueados (união)
        const todos = new Set([...existente.niveisDesbloqueados, ...progresso.niveisDesbloqueados])
        progresso.niveisDesbloqueados = Array.from(todos)
        progresso.estrelasPorNivel = existente.estrelasPorNivel || {}
        progresso.tempoPorNivel = existente.tempoPorNivel || {}
        progresso.tentativasPorNivel = existente.tentativasPorNivel || {}
      }
    } catch {
      // Sem progresso salvo ainda — usa o novo
    }

    saveProgress(progresso)
  }, [])

  /**
   * NOTIFICAÇÃO DE VITÓRIA — chamada pelo GameScreen.
   */
  const notifyWin = useCallback((criaturasSalvas: number, tempoRestante: number) => {
    registrarVitoria()
    setUltimoResultado({ criaturasSalvas, tempoRestante })

    // Salva progresso
    salvarProgresso(nivelAtual.id)

    setScreen('victory')

    if (deveExibirAnuncio()) {
      iniciarExibicaoAnuncio()
    }
  }, [iniciarExibicaoAnuncio, nivelAtual, salvarProgresso])

  /**
   * NOTIFICAÇÃO DE DERROTA — chamada pelo GameScreen.
   */
  const notifyLose = useCallback((motivo: string) => {
    registrarDerrota()
    setUltimoResultado({ criaturasSalvas: 0, tempoRestante: 0, motivoDerrota: motivo })

    setScreen('defeat')

    if (deveExibirAnuncio()) {
      iniciarExibicaoAnuncio()
    }
  }, [iniciarExibicaoAnuncio])

  /**
   * Inicia um nível pelo ID.
   */
  const handleStartLevel = useCallback((levelId: number) => {
    const config = LEVEL_CONFIGS[levelId]
    if (config) {
      setNivelAtual(config)
      setScreen('game')
    }
  }, [])

  /**
   * Reinicia o nível atual.
   */
  const handleRestartLevel = useCallback(() => {
    setScreen('game')
  }, [])

  /**
   * RENDERIZAÇÃO DA TELA ATUAL
   */
  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return (
          <MenuScreen
            onPlay={() => setScreen('levelSelect')}
            onDebugWin={() => {
              registrarVitoria()
              alert(`Streaks: ${JSON.stringify(getStreaks())}`)
            }}
            onDebugLose={() => {
              registrarDerrota()
              alert(`Streaks: ${JSON.stringify(getStreaks())}`)
            }}
          />
        )

      case 'levelSelect':
        return (
          <LevelSelectionScreen
            onBack={() => setScreen('menu')}
            onSelectLevel={handleStartLevel}
          />
        )

      case 'game':
        return (
          <GameScreen
            nivel={nivelAtual}
            onVitoria={(salvas, tempo) => notifyWin(salvas, tempo)}
            onDerrota={(motivo) => notifyLose(motivo)}
          />
        )

      case 'victory':
        return (
          <VictoryScreen
            nomeNivel={nivelAtual.nome}
            criaturasSalvas={ultimoResultado.criaturasSalvas}
            tempoRestante={ultimoResultado.tempoRestante}
            onMenu={() => setScreen('menu')}
            onProximoNivel={
              LEVEL_CONFIGS[nivelAtual.id + 1]
                ? () => handleStartLevel(nivelAtual.id + 1)
                : undefined
            }
          />
        )

      case 'defeat':
        return (
          <DefeatScreen
            nomeNivel={nivelAtual.nome}
            motivo={ultimoResultado.motivoDerrota || 'O tempo acabou'}
            onMenu={() => setScreen('menu')}
            onTentarNovamente={handleRestartLevel}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      {renderScreen()}
      {showAd && (
        <AdScreen
          onClose={handleAdClose}
          isLoading={adLoading}
          error={adError}
        />
      )}
    </>
  )
}
