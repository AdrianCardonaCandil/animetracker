import {User} from "./user.model";

export default interface Auth {
  signup: ({ username, password, email }: { username: string, password: string, email: string }) => Promise<User | null>
  login: ({ username, password }: { username: string, password: string }) => Promise<User | null>
  logout: () => Promise<void>


}
