import { IAddress } from "./address";
import { ICliente } from "./cliente";

export interface INotaVenda {
  idnotavenda: string;
  idcliente: string;
  idBillingAddress: string;
  idShippingAddress: string;
  produtos: {
    id: string;
    total: number;
    quantity: number;
    name: string;
    options: any;
    photo: string;
  }[];
  total: number;
  subtotal: number;
  discount: number;
  delivery: number;
  quantidade: number;
  paymentmethod: string;
  deliverystatus: number;
  data: Date;
}

export interface INotaVendaUser extends INotaVenda {
  billingAddress: IAddress;
  shippingAddress: IAddress;
  cliente: ICliente;
}
