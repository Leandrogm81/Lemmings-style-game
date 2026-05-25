/**
 * Tokens de estilo do projeto
 * Fonte: docs/design/UI_UX_GUIDE.md
 */

export const colors = {
  /** Fundo principal #F8FAFC */
  background: '#F8FAFC',
  /** Superfície/card #FFFFFF */
  surface: '#FFFFFF',
  /** Texto principal #0F172A */
  textPrimary: '#0F172A',
  /** Texto secundário #475569 */
  textSecondary: '#475569',
  /** Texto discreto #64748B */
  textMuted: '#64748B',
  /** Borda #E2E8F0 */
  border: '#E2E8F0',
  /** Ação primária #1D4ED8 */
  primary: '#1D4ED8',
  /** Primária hover #1E40AF */
  primaryHover: '#1E40AF',
  /** Sucesso #15803D */
  success: '#15803D',
  /** Alerta #B45309 */
  warning: '#B45309',
  /** Erro #B91C1C */
  error: '#B91C1C',
  /** Fundo erro leve #FEF2F2 */
  errorBg: '#FEF2F2',
  /** Fundo sucesso leve #F0FDF4 */
  successBg: '#F0FDF4',
} as const;

export const spacing = {
  /** 4px — microajustes */
  xxs: 4,
  /** 8px — separação pequena */
  xs: 8,
  /** 12px — espaçamento interno compacto */
  sm: 12,
  /** 16px — espaçamento padrão */
  md: 16,
  /** 24px — separação entre grupos */
  lg: 24,
  /** 32px — separação entre seções */
  xl: 32,
  /** 48px — grandes blocos */
  xxl: 48,
  /** 64px — hero / respiro maior */
  hero: 64,
} as const;

export const borderRadius = {
  /** Botões: 8px (faixa 8-10px do guia) */
  button: 8,
  /** Cards: 12px (faixa 12-16px) */
  card: 12,
  /** Modais: 16px */
  modal: 16,
  /** Badges: 999px (pill) */
  pill: 999,
} as const;

export const fontSize = {
  /** Título principal: 32px (faixa 28-36px) */
  title: 32,
  /** Título de seção: 22px (faixa 20-24px) */
  sectionTitle: 22,
  /** Subtítulo: 17px (faixa 16-18px) */
  subtitle: 17,
  /** Corpo: 15px (faixa 14-16px) */
  body: 15,
  /** Label: 14px (faixa 13-14px) */
  label: 14,
  /** Texto auxiliar: 13px (faixa 12-14px) */
  helper: 13,
  /** Botão: 14px (faixa 14-15px) */
  button: 14,
} as const;

export const fontWeight = {
  /** Regular */
  regular: 400,
  /** Medium */
  medium: 500,
  /** Semibold */
  semibold: 600,
  /** Bold */
  bold: 700,
} as const;

/** Sombra leve para botões e cards */
export const shadow = {
  button: '0 1px 3px rgba(0, 0, 0, 0.1)',
  card: '0 2px 6px rgba(0, 0, 0, 0.08)',
  modal: '0 4px 16px rgba(0, 0, 0, 0.12)',
} as const;
