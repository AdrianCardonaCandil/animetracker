import { Injectable } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';
import User from "../../schemas/User.scheme";
import Auth from "../../models/auth.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

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

  signUp({ username, email, password }: { username: string; email: string; password: string; }): Promise<Observable<User | null>> {
    return this.firebaseAuthService.signUp(username, email, password).then(user => {
      if (user) {
        return new Observable<User | null>((observer) => {
          observer.next(user);
          observer.complete();
        });
      } else {
        return new Observable<User | null>((observer) => {
          observer.next(null);
          observer.complete();
        });
      }
    }).catch(err => {
      console.error("Signup Error:", err);
      throw err;
    });
  }

  signIn({ username, password }: { username: string; password: string; }): Promise<Observable<User | null>> {
    return this.firebaseAuthService.signIn(username, password).then(user => {
      if (user) {
        return new Observable<User | null>((observer) => {
          observer.next(user);
          observer.complete();
        });
      } else {
        return new Observable<User | null>((observer) => {
          observer.next(null);
          observer.complete();
        });
      }
    }).catch(err => {
      console.error("Signin Error:", err);
      throw err;
    });
  }

  isLoggedIn(): Promise<Observable<User | null>> {
    return Promise.resolve(this.firebaseAuthService.currentUser.pipe(
      map(user => user ? { ...user } : null)
    ));
  }

  get user(): Observable<User | null> {
    return this.firebaseAuthService.currentUser.pipe(
      map(user => user ? { ...user } : null)
    );
  }
}
