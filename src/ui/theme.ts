/**
 * Tokens de estilo do projeto
 * Fonte: docs/design/UI_UX_GUIDE.md
 */

export const colors = {
  /** Fundo escuro de jogo */
  bg: '#1a1a2e',
  /** Fundo de painéis/cards */
  surface: '#16213e',
  /** Fundo de superfície elevada */
  surfaceElevated: '#1e2a4a',
  /** Texto principal claro */
  textPrimary: '#e8e8e8',
  /** Texto secundário */
  textSecondary: '#a0a0b0',
  /** Texto discreto */
  textMuted: '#6a6a7a',
  /** Borda sutil */
  border: '#2a3a5a',
  /** Ação primária — laranja vibrante */
  primary: '#e87a30',
  /** Primary hover */
  primaryHover: '#d46a20',
  /** Sucesso — verde */
  success: '#4ade80',
  /** Alerta */
  warning: '#f59e0b',
  /** Erro */
  error: '#ef4444',
  /** Fundo erro leve */
  errorBg: '#2a1a1a',
  /** Fundo sucesso leve */
  successBg: '#1a2a1a',
  /** Terreno — marrom */
  terrain: '#8B7355',
  /** Terreno claro */
  terrainLight: '#a0896a',
  /** Terreno escuro */
  terrainDark: '#6d5a3e',
  /** Vazio/abismo */
  abyss: '#0d0d1a',
  /** Saída — verde brilhante */
  exit: '#22c55e',
  /** Criatura viva — azul */
  creature: '#60a5fa',
  /** Criatura na saída — verde */
  creatureSaved: '#4ade80',
  /** Criatura morta — vermelho */
  creatureDead: '#ef4444',
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
