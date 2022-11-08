export interface IAnimal {
  idanimal?: string;
  idraca?: string;
  idcliente?: string;
  nome: string;
  genero: string;
  foto?: string;
  cor: string;
  datanascimento: Date | string;
  raca?: {
    nome: string;
  };
}

export interface IAnimalInfo {
  quantidade_animais: number;
  nome: string;
}
