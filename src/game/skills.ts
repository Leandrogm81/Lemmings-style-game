/**
 * Definições e tipos para o sistema de skills do jogo
 * Módulo de lógica pura — sem dependências de UI
 */

export interface SkillDefinition {
  /** Identificador único da skill (ex.: "escavar") */
  id: string
  /** Nome exibível (ex.: "Escavar") */
  nome: string
  /** Duração do cooldown em milissegundos */
  duracaoCooldownMs: number
}

export interface SkillState {
  /** ID da skill */
  skillId: string
  /** True se a skill pode ser usada */
  disponivel: boolean
  /** 0 se disponível, > 0 se em cooldown (ms restantes) */
  cooldownRestanteMs: number
  /** Timestamp do último uso, null se nunca usada */
  ultimoUsoTimestamp: number | null
}

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  { id: 'escavar', nome: 'Escavar', duracaoCooldownMs: 3000 },
  { id: 'construir', nome: 'Construir', duracaoCooldownMs: 5000 },
  { id: 'bloquear', nome: 'Bloquear', duracaoCooldownMs: 4000 },
  { id: 'empurrar', nome: 'Empurrar', duracaoCooldownMs: 3000 },
]

type SkillCallback = (state: SkillState) => void

export class SkillManager {
  private estados: Map<string, SkillState>
  private inscricoes: Map<string, Set<SkillCallback>>
  private definitions: SkillDefinition[]

  constructor(definitions: SkillDefinition[] = SKILL_DEFINITIONS) {
    this.definitions = definitions
    this.estados = new Map()
    this.inscricoes = new Map()
    for (const def of definitions) {
      this.estados.set(def.id, {
        skillId: def.id,
        disponivel: true,
        cooldownRestanteMs: 0,
        ultimoUsoTimestamp: null,
      })
      this.inscricoes.set(def.id, new Set())
    }
  }

  /**
   * Tenta iniciar (usar) uma skill.
   * Retorna true se a skill foi ativada, false se está em cooldown ou não existe.
   */
  iniciarSkill(skillId: string): boolean {
    const estado = this.estados.get(skillId)
    if (!estado || !estado.disponivel) return false

    const definition = this.definitions.find((d) => d.id === skillId)
    if (!definition) return false

    const agora = Date.now()
    estado.disponivel = false
    estado.cooldownRestanteMs = definition.duracaoCooldownMs
    estado.ultimoUsoTimestamp = agora

    this.notificar(skillId, estado)
    return true
  }

  /**
   * Atualiza os timers de cooldown de todas as skills.
   * Deve ser chamada a cada frame/intervalo com o timestamp atual.
   */
  atualizarTimers(agoraMs: number): void {
    for (const [skillId, estado] of this.estados) {
      if (estado.disponivel) continue

      const definition = this.definitions.find((d) => d.id === skillId)
      if (!definition || estado.ultimoUsoTimestamp === null) continue

      const decorridoMs = agoraMs - estado.ultimoUsoTimestamp
      const restante = Math.max(0, definition.duracaoCooldownMs - decorridoMs)
      estado.cooldownRestanteMs = restante

      if (restante <= 0 && !estado.disponivel) {
        estado.disponivel = true
        estado.cooldownRestanteMs = 0
        this.notificar(skillId, estado)
      }
    }
  }

  /** Retorna o estado de uma skill, ou undefined se não existir. */
  getEstado(skillId: string): SkillState | undefined {
    return this.estados.get(skillId)
  }

  /** Retorna array com o estado de todas as skills. */
  getTodosEstados(): SkillState[] {
    return Array.from(this.estados.values())
  }

  /** Verifica se uma skill está disponível para uso. */
  estaDisponivel(skillId: string): boolean {
    return this.estados.get(skillId)?.disponivel ?? false
  }

  /**
   * Inscreve um callback para ser chamado quando o estado de uma skill mudar.
   * Retorna uma função para cancelar a inscrição.
   */
  inscrever(skillId: string, callback: SkillCallback): () => void {
    const callbacks = this.inscricoes.get(skillId)
    if (!callbacks) {
      // skill não existe — retorna noop
      return () => {}
    }
    callbacks.add(callback)
    return () => {
      callbacks.delete(callback)
    }
  }

  private notificar(skillId: string, estado: SkillState): void {
    const callbacks = this.inscricoes.get(skillId)
    if (callbacks) {
      for (const cb of callbacks) {
        cb(estado)
      }
    }
  }
}

/** Instância singleton do gerenciador de skills para uso global no jogo. */
export const skillManager = new SkillManager()
