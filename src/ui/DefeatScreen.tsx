/**
 * DefeatScreen — Tela exibida quando o jogador perde um nível.
 *
 * SEGUE UI_UX_GUIDE.md:
 * - Seção 4.2: usa tokens de theme.ts (errorBg, error)
 * - Seção 5.1: ação principal clara ("Tentar novamente", "Menu")
 * - Seção 6: estado de erro com feedback e caminho de recuperação
 * - Seção 8: microcopy objetivo
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme';
import Button from './Button';
import type { CSSProperties } from 'react';

// ─── Props ────────────────────────────────────────────────────────────────

interface DefeatScreenProps {
  /** Nome do nível */
  nomeNivel?: string;
  /** Motivo da derrota */
  motivo?: string;
  /** Callback para ir ao menu */
  onMenu: () => void;
  /** Callback para tentar novamente */
  onTentarNovamente: () => void;
}

// ─── Estilos ──────────────────────────────────────────────────────────────

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: spacing.md,
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 360,
  minHeight: 280,
  backgroundColor: colors.errorBg,
  borderRadius: borderRadius.modal,
  boxShadow: shadow.modal,
  padding: spacing.xl,
  boxSizing: 'border-box',
  gap: spacing.md,
  textAlign: 'center',
};

const iconStyle: CSSProperties = {
  fontSize: 48,
  lineHeight: 1,
  margin: 0,
};

const titleStyle: CSSProperties = {
  fontSize: fontSize.sectionTitle,
  fontWeight: fontWeight.bold,
  color: colors.error,
  margin: 0,
};

const motivoStyle: CSSProperties = {
  fontSize: fontSize.body,
  fontWeight: fontWeight.regular,
  color: colors.textSecondary,
  margin: 0,
  lineHeight: 1.6,
};

const actionsStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  width: '100%',
  maxWidth: 220,
  marginTop: spacing.sm,
};

// ─── Componente ───────────────────────────────────────────────────────────

export default function DefeatScreen({
  nomeNivel = 'Nível 1',
  motivo = 'O tempo acabou',
  onMenu,
  onTentarNovamente,
}: DefeatScreenProps) {
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <p style={iconStyle}>&#128128;</p>
        <h2 style={titleStyle}>Derrota</h2>
        <p style={motivoStyle}>
          {nomeNivel}<br />
          {motivo}
        </p>
        <div style={actionsStyle}>
          <Button variant="primary" onClick={onTentarNovamente}>
            Tentar novamente
          </Button>
          <Button variant="secondary" onClick={onMenu}>
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
