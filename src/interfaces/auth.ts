import { User } from "firebase/auth";
import { ReactNode } from "react";

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
  loading: boolean;
  error: string | null;
  user: User | null;
}
