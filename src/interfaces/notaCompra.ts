export interface INotaCompra {
  idnotacompra?: string;
  idproduto?: string;
  idfornecedor?: string;
  idfuncionario?: string;
  valor: number;
  quantidade: number;
  datapedido?: Date | string;
  dataentrega?: Date | string;
  produto?: {
    nome: string;
  };
  fornecedor?: {
    nome: string;
  };
  funcionario?: {
    nome: string;
  };
}

export interface INotaCompraInfo {
  quantidade_total: number;
  valor_total: number;
  nome: string;
  datapedido?: string;
}
