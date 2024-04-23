import { Injectable } from '@angular/core';
import { UserCredential } from '@firebase/auth';
import { FirebaseAuthService } from './firebase-auth.service';

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
      const userCredential = await this.firebaseAuthService.signUp(email, password);
      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }

  async signIn({ email, password }: { email: string; password: string; }): Promise<UserCredential | null> {
    try {
      const userCredential = await this.firebaseAuthService.signIn(email, password);
      return userCredential;
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.firebaseAuthService.currentUser;
  }

  // Other useful methods for authorization can be added here
}
