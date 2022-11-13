export interface ISimpleProduto {
  idproduto?: string;
  nome: string;
  foto?: string;
  descricao: string;
  valor: number;
  categoriaproduto?: {
    nome: string;
  };
}

export interface IProduto extends ISimpleProduto {
  idcategoriaproduto?: string;
  quantidade: number;
  datareposicao?: Date | string;
  options: { nome: string; value: { name: string; subtotal: number }[] }[];
}

export interface ICartProduto extends ISimpleProduto {
  options: { nome: string; value: string }[];
  quantity: number;
}
