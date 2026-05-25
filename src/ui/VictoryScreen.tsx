/**
 * VictoryScreen — Tela exibida quando o jogador vence um nível.
 *
 * SEGUE UI_UX_GUIDE.md:
 * - Seção 4.2: usa tokens de theme.ts
 * - Seção 5.1: ação principal clara ("Próximo nível", "Menu")
 * - Seção 6: estado de sucesso com feedback claro
 * - Seção 8: microcopy objetivo
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme';
import Button from './Button';
import type { CSSProperties } from 'react';

// ─── Props ────────────────────────────────────────────────────────────────

interface VictoryScreenProps {
  /** Nome do nível concluído */
  nomeNivel?: string;
  /** Número de criaturas salvas */
  criaturasSalvas?: number;
  /** Tempo restante em segundos */
  tempoRestante?: number;
  /** Callback para ir ao menu */
  onMenu: () => void;
  /** Callback para jogar próximo nível (opcional — se for o último, não aparece) */
  onProximoNivel?: () => void;
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
  backgroundColor: colors.successBg,
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
  color: colors.success,
  margin: 0,
};

const statsStyle: CSSProperties = {
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

export default function VictoryScreen({
  nomeNivel = 'Nível 1',
  criaturasSalvas = 0,
  tempoRestante = 0,
  onMenu,
  onProximoNivel,
}: VictoryScreenProps) {
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <p style={iconStyle}>&#127942;</p>
        <h2 style={titleStyle}>Vitória!</h2>
        <p style={statsStyle}>
          {nomeNivel} concluído<br />
          Criaturas salvas: {criaturasSalvas}<br />
          Tempo restante: {tempoRestante}s
        </p>
        <div style={actionsStyle}>
          {onProximoNivel && (
            <Button variant="primary" onClick={onProximoNivel}>
              Próximo nível
            </Button>
          )}
          <Button variant="secondary" onClick={onMenu}>
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
