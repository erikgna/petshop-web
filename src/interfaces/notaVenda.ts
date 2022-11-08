export interface INotaVenda {
  idnotavenda?: string;
  idservico?: string;
  idproduto?: string;
  idcliente?: string;
  idfuncionario?: string;
  valor: number;
  quantidade: number;
  data?: Date | string;
  servico?: {
    nome: string;
  };
  produto?: {
    nome: string;
  };
  cliente?: {
    nome: string;
  };
  funcionario?: {
    nome: string;
  };
}

export interface INotaVendaInfo {
  quantidade_servicos: number;
  valor_total: number;
  nome: string;
  data?: string;
}
