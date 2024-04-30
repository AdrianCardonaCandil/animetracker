import { Injectable } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';
import User from "../../schemas/User.scheme";
import Auth from "../../models/auth.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import * as console from "console";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Auth {

  constructor(private firebaseAuthService: FirebaseAuthService) {}

  async logout(): Promise<void> {
    try {
      await this.firebaseAuthService.auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  }

  signUp({ username, email, password }: { username: string; email: string; password: string; }): Promise<User | null> {
    return this.firebaseAuthService.signUp(username, email, password).then(user => {
      if (user) {
        return user;
      } else {
        return null;
      }
    }).catch(err => {
      console.error("Signup Error:", err);
      throw err;
    });
  }

  signIn({ username, password }: { username: string; password: string; }): Promise<User | null> {
    return this.firebaseAuthService.signIn(username, password);
  }

  isLoggedIn(): Observable<User | null>{
    return this.firebaseAuthService.currentUser;
  }

  get user(): Observable<User | null> {
    return this.firebaseAuthService.currentUser.pipe(
      map(user => user ? { ...user } : null)
    );
  }
  deleteAccount = async (userId: string): Promise<boolean> =>
    this.firebaseAuthService.deleteAccount(userId);
}
