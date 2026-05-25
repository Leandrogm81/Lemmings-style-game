/**
 * Dados mockados de níveis para a tela de seleção
 * Uso temporário — substituir por dados reais de progresso na Sprint 09
 */

export interface LevelData {
  id: number
  nome: string
  desbloqueado: boolean
}

export const niveis: LevelData[] = [
  { id: 1, nome: 'Nível 1', desbloqueado: true },
  { id: 2, nome: 'Nível 2', desbloqueado: true },
  { id: 3, nome: 'Nível 3', desbloqueado: false },
  { id: 4, nome: 'Nível 4', desbloqueado: false },
  { id: 5, nome: 'Nível 5', desbloqueado: false },
]
