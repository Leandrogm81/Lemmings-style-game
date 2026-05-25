import { useState, useCallback, useRef } from 'react'
import MenuScreen from './ui/MenuScreen'
import LevelSelectionScreen from './ui/LevelSelectionScreen'
import AdScreen from './ui/AdScreen'
import {
  registrarVitoria,
  registrarDerrota,
  deveExibirAnuncio,
  resetarAposExibicao,
  getStreaks,
} from './ads/ads_manager'
import { carregarAnuncioIntersticial } from './ads/sdk_adapter'

/** Estado atual da tela do jogo */
type Screen = 'menu' | 'levelSelect' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [showAd, setShowAd] = useState(false)
  const [adLoading, setAdLoading] = useState(false)
  const [adError, setAdError] = useState<string | null>(null)
  const adCloseRef = useRef(false)

  /**
   * Inicia o fluxo de exibição do anúncio:
   * 1. Mostra AdScreen em loading
   * 2. Chama sdk_adapter para carregar
   * 3. Se sucesso: mantém placeholder (futuramente mostrará anúncio real)
   * 4. Se falha: mostra estado de erro no AdScreen
   */
  const iniciarExibicaoAnuncio = useCallback(async () => {
    adCloseRef.current = false
    setAdLoading(true)
    setAdError(null)
    setShowAd(true)

    const resultado = await carregarAnuncioIntersticial()

    // Se o jogador já fechou o anúncio durante o carregamento, ignora
    if (adCloseRef.current) return

    setAdLoading(false)

    if (!resultado.sucesso) {
      setAdError(
        resultado.erro || 'Não foi possível carregar o anúncio. Toque em Fechar para continuar.',
      )
    }
    // Se sucesso, AdScreen mostra o placeholder (futuramente: anúncio real)
  }, [])

  /**
   * Callback chamado quando o jogador fecha o anúncio.
   * Reseta os streaks e volta ao menu.
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
   * NOTIFICAÇÃO DE VITÓRIA
   *
   * Deve ser chamada pelo game loop quando o jogador vencer um nível.
   * Atualmente é chamada manualmente para teste via atalho/simulação.
   *
   * TODO: conectar ao GameScreen quando implementado
   */
  const notifyWin = useCallback(() => {
    registrarVitoria()
    if (deveExibirAnuncio()) {
      iniciarExibicaoAnuncio()
    }
  }, [iniciarExibicaoAnuncio])

  /**
   * NOTIFICAÇÃO DE DERROTA
   *
   * Deve ser chamada pelo game loop quando o jogador perder um nível.
   * Atualmente é chamada manualmente para teste via atalho/simulação.
   *
   * TODO: conectar ao GameScreen quando implementado
   */
  const notifyLose = useCallback(() => {
    registrarDerrota()
    if (deveExibirAnuncio()) {
      iniciarExibicaoAnuncio()
    }
  }, [iniciarExibicaoAnuncio])

  /**
   * RENDERIZAÇÃO DA TELA ATUAL
   *
   * Enquanto não há GameScreen, as opções do menu acionam simulações
   * para validar o fluxo de anúncio.
   */
  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return (
          <MenuScreen
            onPlay={() => {
              setScreen('levelSelect')
            }}
            onDebugWin={() => {
              notifyWin()
              alert(`Streaks: ${JSON.stringify(getStreaks())}`)
            }}
            onDebugLose={() => {
              notifyLose()
              alert(`Streaks: ${JSON.stringify(getStreaks())}`)
            }}
          />
        )

      case 'levelSelect':
        return (
          <LevelSelectionScreen
            onBack={() => setScreen('menu')}
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
