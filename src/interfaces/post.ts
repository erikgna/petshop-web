export interface IPost {
  idpost: string;
  idcategoriapost: string;
  idowner: string;
  title: string;
  foto: string;
  description: string;
  date: Date;
}

export interface IPostCategories extends IPost {
  categoriapost: {
    idcategoriapost: string;
    name: string;
  };
}

export interface IPostUser {
  posts: IPostCategories[];
  page: number;
}
