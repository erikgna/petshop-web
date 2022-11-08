export interface IServico {
  idservico?: string;
  idcategoriaservico?: string;
  nome: string;
  foto?: string;
  descricao: string;
  valor: number;
  categoriaservico?: {
    nome: string;
  };
}
