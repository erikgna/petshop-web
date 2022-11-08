export interface IProduto {
  idproduto?: string;
  idcategoriaproduto?: string;
  nome: string;
  foto?: string;
  descricao: string;
  valor: number;
  quantidade: number;
  datareposicao?: Date | string;
  categoriaproduto?: {
    nome: string;
  };
}
