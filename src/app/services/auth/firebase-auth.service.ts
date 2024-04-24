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
  private _currentUserSubject: BehaviorSubject<User | null>;

  constructor(private firebaseService: FirebaseService) {
    this._db = this.firebaseService.db;
    this._auth = this.firebaseService.auth;
    this._currentUserSubject = new BehaviorSubject<User | null>(null);

    this._auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await this.getUserData(user.uid);
        this._currentUserSubject.next(userData);
      } else {
        this._currentUserSubject.next(null);
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
        description: "",
        country: "",
        profilePicture: "",
        watching: [],
        dropped: [],
        completed: [],
        planToWatch: [],
        favorites: [],
        userScores: {}, // Initialize as empty object
        contentProgress: {} // Initialize as empty object
      });

      const newUser = {
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
        userScores: {},
        contentProgress: {}
      };

      // Update currentUserSubject with the new user
      this._currentUserSubject.next(newUser as User);

      return newUser as User;
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
      const userCredential = await signInWithEmailAndPassword(this._auth, email, password);

      // Return the user data
      const user = await this.getUserData(username);

      // Update currentUserSubject with the signed-in user
      this._currentUserSubject.next(user);

      return user;
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  private async getUserEmailByUsername(username: string): Promise<string> {
    const userRef = doc(this._db, this._coll, username);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('User not found');
      throw new Error('User not found');
    }

    return userDoc.get('email');
  }

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
