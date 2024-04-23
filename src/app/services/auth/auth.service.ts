import { Injectable } from '@angular/core';
import { UserCredential } from '@firebase/auth';
import { FirebaseAuthService } from './firebase-auth.service';
import User from "../../schemas/User.scheme"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuthService: FirebaseAuthService) {}

  async logout(): Promise<void> {
    try {
      await this.firebaseAuthService.auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  }

  async signup({ email, password }: { email: string; password: string; }): Promise<UserCredential | null> {
    try {
      return await this.firebaseAuthService.signUp(email, password);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }

  async signIn({ email, password }: { email: string; password: string; }): Promise<UserCredential | null> {
    try {
      return await this.firebaseAuthService.signIn(email, password);
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.firebaseAuthService.currentUser;
  }

}
