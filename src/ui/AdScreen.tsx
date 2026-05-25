/**
 * AdScreen — Tela fullscreen simulando anúncio intersticial.
 *
 * SEGUE UI_UX_GUIDE.md:
 * - Seção 4.2 (Cores): usa colors.primary (#1D4ED8) para o botão
 * - Seção 4.5 (Bordas/sombras/cantos): borderRadius.modal (16px) na área do anúncio,
 *   borderRadius.button (8px) no botão, shadow.button no botão
 * - Seção 5.1 (Botões): ação principal clara ("Sair agora"), botão importado do
 *   componente Button com variant="primary"
 * - Seção 6 (Estados obrigatórios): loading, erro e estado padrão
 * - Seção 7 (Responsividade): minHeight 48px no botão para toque mobile,
 *   overlay cobre 100% da viewport em qualquer tamanho de tela
 * - Seção 8 (Microcopy): textos objetivos ("Sair agora", "Carregando anúncio...",
 *   "Não foi possível carregar o anúncio.")
 * - Seção 10 (Padrões proibidos): sem gradientes, sem ícones, sem textos genéricos
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme';
import Button from './Button';
import type { CSSProperties } from 'react';

// ─── Props ────────────────────────────────────────────────────────────────

interface AdScreenProps {
  /** Chamado quando o jogador clica "Sair agora" */
  onClose: () => void;
  /** Se true, exibe estado de loading */
  isLoading?: boolean;
  /** Mensagem de erro. Quando presente, exibe estado de erro */
  error?: string | null;
}

// ─── Estilos ──────────────────────────────────────────────────────────────

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  padding: spacing.md,
  boxSizing: 'border-box',
};

const adCardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 360,
  minHeight: 320,
  backgroundColor: colors.surface,
  borderRadius: borderRadius.modal,
  boxShadow: shadow.modal,
  padding: spacing.lg,
  boxSizing: 'border-box',
  gap: spacing.lg,
};

const adTitleStyle: CSSProperties = {
  fontSize: fontSize.subtitle,
  fontWeight: fontWeight.medium,
  color: colors.textSecondary,
  margin: 0,
  textAlign: 'center',
};

const adTextStyle: CSSProperties = {
  fontSize: fontSize.body,
  fontWeight: fontWeight.regular,
  color: colors.textMuted,
  margin: 0,
  textAlign: 'center',
};

const errorTextStyle: CSSProperties = {
  fontSize: fontSize.body,
  fontWeight: fontWeight.regular,
  color: colors.error,
  margin: 0,
  textAlign: 'center',
};

// ─── Componente ───────────────────────────────────────────────────────────

export default function AdScreen({ onClose, isLoading = false, error = null }: AdScreenProps) {
  const renderContent = () => {
    // Estado de erro
    if (error) {
      return (
        <>
          <p style={errorTextStyle}>{error}</p>
          <Button variant="primary" onClick={onClose}>
            Fechar
          </Button>
        </>
      );
    }

    // Estado de loading
    if (isLoading) {
      return (
        <>
          <p style={adTitleStyle}>Carregando anúncio...</p>
          <div
            style={{
              width: 32,
              height: 32,
              border: `3px solid ${colors.border}`,
              borderTopColor: colors.primary,
              borderRadius: '50%',
              animation: 'ads-spin 0.8s linear infinite',
            }}
          />
          <style>{`@keyframes ads-spin { to { transform: rotate(360deg); } }`}</style>
        </>
      );
    }

    // Estado padrão — placeholder do anúncio
    return (
      <>
        <p style={adTitleStyle}>Anúncio</p>
        <p style={adTextStyle}>
          Espaço reservado para anúncio intersticial.
        </p>
        <Button variant="primary" onClick={onClose}>
          Sair agora
        </Button>
      </>
    );
  };

  return (
    <div style={overlayStyle}>
      <div style={adCardStyle}>
        {renderContent()}
      </div>
    </div>
  );
}
