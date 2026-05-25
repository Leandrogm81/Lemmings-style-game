/**
 * Testes do SkillManager — cooldown, estado e inscrição de skills.
 *
 * Módulo de lógica pura — sem dependências de UI.
 * Usa vi.spyOn(Date, 'now') para mockar o tempo e evitar flaky tests.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillManager, SKILL_DEFINITIONS } from './skills';

describe('SkillManager', () => {
  let mockDateNow: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockDateNow = vi.spyOn(Date, 'now');
    mockDateNow.mockReturnValue(1000);
  });

  // ─── Instanciação e estado inicial ──────────────────────────────────

  it('deve inicializar com skills padrão disponíveis', () => {
    const manager = new SkillManager();
    const estados = manager.getTodosEstados();

    expect(estados.length).toBe(SKILL_DEFINITIONS.length);
    for (const estado of estados) {
      expect(estado.disponivel).toBe(true);
      expect(estado.cooldownRestanteMs).toBe(0);
      expect(estado.ultimoUsoTimestamp).toBeNull();
    }
  });

  it('deve aceitar definições customizadas no construtor', () => {
    const customSkills = [
      { id: 'skill-a', nome: 'Skill A', duracaoCooldownMs: 100 },
      { id: 'skill-b', nome: 'Skill B', duracaoCooldownMs: 200 },
    ];
    const manager = new SkillManager(customSkills);
    const estados = manager.getTodosEstados();

    expect(estados.length).toBe(2);
    expect(estados[0].skillId).toBe('skill-a');
    expect(estados[1].skillId).toBe('skill-b');
  });

  // ─── iniciarSkill ───────────────────────────────────────────────────

  it('deve retornar true e marcar skill como indisponível ao iniciar skill válida', () => {
    const manager = new SkillManager();
    const resultado = manager.iniciarSkill('escavar');

    expect(resultado).toBe(true);
    expect(manager.estaDisponivel('escavar')).toBe(false);
  });

  it('deve retornar false para skill inexistente', () => {
    const manager = new SkillManager();
    expect(manager.iniciarSkill('inexistente')).toBe(false);
  });

  it('deve retornar false se skill já está em cooldown', () => {
    const manager = new SkillManager();

    const primeira = manager.iniciarSkill('escavar');
    expect(primeira).toBe(true);

    const segunda = manager.iniciarSkill('escavar');
    expect(segunda).toBe(false);
  });

  // ─── atualizarTimers e cooldown ─────────────────────────────────────

  it('deve restaurar disponibilidade após o cooldown expirar', () => {
    const manager = new SkillManager();
    const COOLDOWN_MS = 3000; // escavar tem duracaoCooldownMs: 3000

    manager.iniciarSkill('escavar');
    expect(manager.estaDisponivel('escavar')).toBe(false);

    // Avança tempo para depois do cooldown (3000ms + 1ms)
    mockDateNow.mockReturnValue(1000 + COOLDOWN_MS + 1);
    manager.atualizarTimers(1000 + COOLDOWN_MS + 1);

    expect(manager.estaDisponivel('escavar')).toBe(true);
  });

  it('não deve restaurar antes do cooldown completar', () => {
    const manager = new SkillManager();
    const COOLDOWN_MS = 3000; // escavar tem duracaoCooldownMs: 3000

    manager.iniciarSkill('escavar');

    // Avança tempo parcial (2999ms de 3000ms necessários)
    mockDateNow.mockReturnValue(1000 + COOLDOWN_MS - 1);
    manager.atualizarTimers(1000 + COOLDOWN_MS - 1);

    expect(manager.estaDisponivel('escavar')).toBe(false);
    expect(manager.getEstado('escavar')?.cooldownRestanteMs).toBe(1);
  });

  // ─── getEstado ──────────────────────────────────────────────────────

  it('deve retornar o estado de uma skill específica', () => {
    const manager = new SkillManager();
    const estado = manager.getEstado('escavar');

    expect(estado).toBeDefined();
    expect(estado!.skillId).toBe('escavar');
    expect(estado!.disponivel).toBe(true);
  });

  it('deve retornar undefined para skill inexistente', () => {
    const manager = new SkillManager();
    expect(manager.getEstado('fake')).toBeUndefined();
  });

  // ─── getTodosEstados ────────────────────────────────────────────────

  it('deve retornar array com todas as skills', () => {
    const manager = new SkillManager();
    const estados = manager.getTodosEstados();

    expect(Array.isArray(estados)).toBe(true);
    expect(estados.length).toBeGreaterThan(0);
    for (const e of estados) {
      expect(typeof e.skillId).toBe('string');
      expect(typeof e.disponivel).toBe('boolean');
    }
  });

  // ─── inscrever ──────────────────────────────────────────────────────

  it('deve notificar callback quando skill muda de estado', () => {
    const manager = new SkillManager();
    const callback = vi.fn();

    manager.inscrever('escavar', callback);
    manager.iniciarSkill('escavar');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ skillId: 'escavar', disponivel: false }),
    );
  });

  it('deve retornar função de unsubscribe', () => {
    const manager = new SkillManager();
    const callback = vi.fn();

    const unsubscribe = manager.inscrever('escavar', callback);
    unsubscribe();
    manager.iniciarSkill('escavar');

    expect(callback).not.toHaveBeenCalled();
  });

  it('deve retornar noop para skill inexistente', () => {
    const manager = new SkillManager();
    const callback = vi.fn();

    const unsubscribe = manager.inscrever('fake', callback);
    expect(typeof unsubscribe).toBe('function');
    expect(() => unsubscribe()).not.toThrow();
  });
});
