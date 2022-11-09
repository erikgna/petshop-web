import { User } from "firebase/auth";

export interface IAuthContext {
  //   user: User | null;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  //   signWithGoogle: (callback: VoidFunction) => Promise<void>;
  //   signOut: () => Promise<void>;
  //   recoverPassword: (email: string) => Promise<void>;
  loading: boolean;
}
