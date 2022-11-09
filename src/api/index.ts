import axios, { AxiosInstance } from "axios";

import { IFuncionario } from "../interfaces/funcionario";
import { IEspecie } from "../interfaces/especie";
import { IRaca } from "../interfaces/raca";
import { IFornecedor } from "../interfaces/fornecedor";
import { IProduto } from "../interfaces/produto";
import { IServico } from "../interfaces/servico";
import { INotaCompra } from "../interfaces/notaCompra";
import { INotaVenda } from "../interfaces/notaVenda";
import { ICliente } from "../interfaces/cliente";
import { IAnimal } from "../interfaces/animal";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8030/api/v1",
});

export const APIGet = (route: string) => api.get(`${route}`);

export const APIGetOne = (id: string, route: string) =>
  api.get(`${route}/${id}`);

export const APIGetPagination = (start: number, end: number, route: string) =>
  api.get(`${route}/${start}/${end}`);

export const APICreate = (
  object:
    | IFornecedor
    | IFuncionario
    | IEspecie
    | IRaca
    | INotaCompra
    | IServico
    | IProduto
    | IAnimal
    | ICliente
    | INotaVenda,
  route: string
) => api.post(`${route}`, object);

export const APIUpdate = (
  object:
    | IFornecedor
    | IFuncionario
    | IEspecie
    | IRaca
    | INotaCompra
    | IServico
    | IProduto
    | IAnimal
    | ICliente
    | INotaVenda,
  route: string
) => api.patch(`${route}`, object);

export const APIDelete = (id: string, route: string) =>
  api.delete(`${route}/${id}`);

export default api;
