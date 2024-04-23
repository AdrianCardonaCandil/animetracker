import {Injectable} from '@angular/core';
import {Firestore} from 'firebase/firestore/lite';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential} from 'firebase/auth';
import {FirebaseService} from '../firebase.service';
import User from "../../schemas/User.scheme"

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private _coll = "Users";
  private _db: Firestore;
  private _auth: Auth;
  private _currentUser: User | null = null;

  constructor(private firebaseService: FirebaseService) {
    this._db = this.firebaseService.db;
    this._auth = this.firebaseService.auth;

    this._auth.onAuthStateChanged(user => {
      this._currentUser = user ? {
        id: user.uid,
        username: '',
        email: user.email || '',
        password: '',
        description: '',
        country: '',
        profilePicture: '',
        watching: [],
        dropped: [],
        completed: [],
        planToWatch: [],
        favorites: [],
        userScores: new Map<string, number>(),
        contentProgress: new Map<string, number>()
      } : null;
    });
  }

  get db(): Firestore {
    return this._db;
  }

  get auth(): Auth {
    return this._auth;
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this._auth, email, password);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this._auth, email, password);
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  // Other useful methods for authentication can be added here
}
