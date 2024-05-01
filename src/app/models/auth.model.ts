import { Observable } from "rxjs";
import User from "../schemas/User.scheme";

export default interface Auth {
  signIn: ({ username, password }: { username: string, password: string })  => Promise<User | null>;
  signUp: ({ username, email,  password }: { username: string, email: string, password: string }) => Promise<User | null>;
  logout: () => Promise<void>;
  isLoggedIn: ()=> Observable<User | null>;
  deleteAccount:(userId: string) => Promise<boolean>
  get user(): Observable<User | null>;
}
