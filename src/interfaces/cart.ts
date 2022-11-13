import { IAddress } from "./address";
import { ICartProduto } from "./produto";

export interface ICart {
  idcart: string;
  idcliente: string;
  idpayment: string;
  iddeliveryaddress: string;
  idbillingaddress: string;
  produtos: ICartProduto[];
  total: number;
  subtotal: number;
  discount: number;
  delivery: number;
  address_addressTocart_idbillingaddress: IAddress;
  address_addressTocart_iddeliveryaddress: IAddress;
}
