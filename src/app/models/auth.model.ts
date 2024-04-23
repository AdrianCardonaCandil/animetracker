import { Observable } from "rxjs";
import User from "../schemas/User.scheme";

export default interface Auth {
  signIn: ({ username, password }: { username: string, password: string })  => Promise<Observable<User | null>>;
  signUp: ({ username, email,  password }: { username: string, email: string, password: string }) => Promise<Observable<User | null>>;
  logout: () => Promise<void>;
  isLoggedIn: ()=> Promise<Observable<User | null>>;

  get user(): Observable<User | null>;
}
