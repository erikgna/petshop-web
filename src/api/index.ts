import axios, { AxiosInstance } from "axios";

import { IProduto } from "../interfaces/produto";
import { INotaVenda } from "../interfaces/notaVenda";
import { ICliente } from "../interfaces/cliente";
import { IAddress } from "../interfaces/address";
import { ICart } from "../interfaces/cart";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8030/api/v1",
});

export const APIGet = (route: string) => api.get(`${route}`);

export const APIGetOne = (id: string, route: string) =>
  api.get(`${route}/${id}`);

export const APIGetSearch = (search: string, route: string) =>
  api.get(`${route}/${search}`);

export const APIGetPagination = (page: number, route: string) =>
  api.get(`${route}/${page}`);

export const APIGetCategory = (id: string, page: number, route: string) =>
  api.get(`${route}/${id}/${page}`);

export const APIUserGetPagination = (
  id: string,
  start: number,
  end: number,
  route: string
) => api.get(`${route}/${id}/${start}/${end}`);

export const APICreate = (
  object: IProduto | ICliente | INotaVenda | IAddress | ICart,
  route: string
) => api.post(`${route}`, object);

export const APIUpdate = (
  object: IProduto | ICliente | INotaVenda | IAddress | ICart,
  route: string
) => api.patch(`${route}`, object);

export const APIUpdateClientPost = (object: { id: string }, route: string) =>
  api.patch(`${route}`, object);

export const APIDelete = (id: string, route: string) =>
  api.delete(`${route}/${id}`);

export default api;
