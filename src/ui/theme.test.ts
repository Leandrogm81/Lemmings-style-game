/**
 * Testes do theme — tokens de estilo (cores, espaçamento, fontes, bordas, sombras).
 */

import { describe, it, expect } from 'vitest';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadow } from './theme';

describe('theme', () => {
  describe('colors', () => {
    it('deve ter todas as cores definidas', () => {
      expect(colors.bg).toBe('#1a1a2e');
      expect(colors.surface).toBe('#16213e');
      expect(colors.surfaceElevated).toBe('#1e2a4a');
      expect(colors.textPrimary).toBe('#e8e8e8');
      expect(colors.textSecondary).toBe('#a0a0b0');
      expect(colors.textMuted).toBe('#6a6a7a');
      expect(colors.border).toBe('#2a3a5a');
      expect(colors.primary).toBe('#e87a30');
      expect(colors.primaryHover).toBe('#d46a20');
      expect(colors.success).toBe('#4ade80');
      expect(colors.warning).toBe('#f59e0b');
      expect(colors.error).toBe('#ef4444');
      expect(colors.errorBg).toBe('#2a1a1a');
      expect(colors.successBg).toBe('#1a2a1a');
    });

    it('todas as cores devem ser strings hex com #', () => {
      const values = Object.values(colors);
      expect(values.length).toBeGreaterThan(0);
      for (const v of values) {
        expect(v).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    });
  });

  describe('spacing', () => {
    it('deve ter todos os espaçamentos definidos', () => {
      expect(spacing.xxs).toBe(4);
      expect(spacing.xs).toBe(8);
      expect(spacing.sm).toBe(12);
      expect(spacing.md).toBe(16);
      expect(spacing.lg).toBe(24);
      expect(spacing.xl).toBe(32);
      expect(spacing.xxl).toBe(48);
      expect(spacing.hero).toBe(64);
    });

    it('todos os espaçamentos devem ser números positivos', () => {
      const values = Object.values(spacing);
      expect(values.length).toBeGreaterThan(0);
      for (const v of values) {
        expect(v).toBeGreaterThan(0);
      }
    });
  });

  describe('borderRadius', () => {
    it('deve ter todos os raios definidos', () => {
      expect(borderRadius.button).toBe(8);
      expect(borderRadius.card).toBe(12);
      expect(borderRadius.modal).toBe(16);
      expect(borderRadius.pill).toBe(999);
    });
  });

  describe('fontSize', () => {
    it('deve ter todos os tamanhos definidos', () => {
      expect(fontSize.title).toBe(32);
      expect(fontSize.sectionTitle).toBe(22);
      expect(fontSize.subtitle).toBe(17);
      expect(fontSize.body).toBe(15);
      expect(fontSize.label).toBe(14);
      expect(fontSize.helper).toBe(13);
      expect(fontSize.button).toBe(14);
    });
  });

  describe('fontWeight', () => {
    it('deve ter todos os pesos definidos', () => {
      expect(fontWeight.regular).toBe(400);
      expect(fontWeight.medium).toBe(500);
      expect(fontWeight.semibold).toBe(600);
      expect(fontWeight.bold).toBe(700);
    });
  });

  describe('shadow', () => {
    it('deve ter todas as sombras definidas', () => {
      expect(shadow.button).toContain('rgba');
      expect(shadow.card).toContain('rgba');
      expect(shadow.modal).toContain('rgba');
    });
  });
});
