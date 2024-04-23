import { Injectable } from '@angular/core';
import { doc, setDoc, Firestore, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { FirebaseService } from '../firebase.service';
import User from "../../schemas/User.scheme";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private _coll = "Users";
  private _db: Firestore;
  private _auth: Auth;
  private _currentUserSubject: BehaviorSubject<User | null>; // BehaviorSubject to hold the current user state

  constructor(private firebaseService: FirebaseService) {
    this._db = this.firebaseService.db;
    this._auth = this.firebaseService.auth;
    this._currentUserSubject = new BehaviorSubject<User | null>(null); // Initialize with null

    this._auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await this.getUserData(user.uid);
        this._currentUserSubject.next(userData);
      } else {
        this._currentUserSubject.next(null); // User is logged out, set to null
      }
    });
  }

  get db(): Firestore {
    return this._db;
  }

  get auth(): Auth {
    return this._auth;
  }

  get currentUser(): BehaviorSubject<User | null> {
    return this._currentUserSubject;
  }

  async signUp(username: string, email: string, password: string): Promise<User> {
    try {
      // Create the user with email and password
      await createUserWithEmailAndPassword(this._auth, email, password);

      // Set the user's document with the username as the document ID
      await setDoc(doc(this._db, this._coll, username), {
        username: username,
        email: email,
        password: password,
        // Include any other fields you need to initialize
        description: "",
        country: "",
        profilePicture: "",
        watching: [],
        dropped: [],
        completed: [],
        planToWatch: [],
        favorites: [],
        userScores: new Map<string, number>(),
        contentProgress: new Map<string, number>()
      });

      return {
        username: username,
        email: email,
        password: password,
        description: "",
        country: "",
        profilePicture: "",
        watching: [],
        dropped: [],
        completed: [],
        planToWatch: [],
        favorites: [],
        userScores: new Map<string, number>(),
        contentProgress: new Map<string, number>()
      };
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }

  async signIn(username: string, password: string): Promise<User | null> {
    try {
      // Find the user's email based on the provided username
      const email = await this.getUserEmailByUsername(username);

      // Sign in with email and password
      await signInWithEmailAndPassword(this._auth, email, password);

      // Return the user data
      return await this.getUserData(username);
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  // Method to get user's email based on username
  private async getUserEmailByUsername(username: string): Promise<string> {
    const userRef = doc(this._db, this._coll, username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('User not found');
      throw new Error('User not found');
    }

    return userDoc.get('email');
  }

  // Method to get user data
  private async getUserData(username: string): Promise<User | null> {
    const userRef = doc(this._db, this._coll, username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('User not found');
      return null;
    }

    const userData = userDoc.data() as User;
    return { ...userData };
  }
}
