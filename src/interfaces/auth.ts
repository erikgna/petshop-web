import { User } from "firebase/auth";
import { ReactNode } from "react";
import { ICart } from "./cart";
import { ICartProduto } from "./produto";

export type AuthContextProps = {
  children: ReactNode;
};

export interface IAuthContext {
  signUp: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  addToCart: (product: ICartProduto | null) => Promise<void>;
  removeFromCart: (
    productID: string,
    quantity: number,
    amount: number
  ) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
  loading: boolean;
  error: string | null;
  user: User | null;
  cart?: ICart | null;
}
