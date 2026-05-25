/**
 * Interface para configuração de nível do jogo
 */
export interface LvlConfig {
  id: number;
  nome: string;
  requisitosCriaturas: string[];
  listaHabilidadesDisponiveis: string[];
}