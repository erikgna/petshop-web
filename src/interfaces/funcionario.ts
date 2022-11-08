export interface IFuncionario {
  idfuncionario?: string;
  cpf: string;
  nome: string;
  endereco: string;
  telefone: string;
  salario: number;
  situacao: string;
  funcao: string;
  dataentrada?: Date | string;
}
