import { Injectable } from '@angular/core';
import {doc, setDoc, Firestore, getDoc, updateDoc, getDocs, query, collection, where} from 'firebase/firestore/lite';
import { Auth, setPersistence,onAuthStateChanged, browserLocalPersistence,createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut } from 'firebase/auth';
import { FirebaseService } from '../firebase.service';
import User from "../../schemas/User.scheme";
import { BehaviorSubject, Observable } from 'rxjs';

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

    this.initAuthStatePersistence();
    this.initAuthState();
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

  private async initAuthState() {
    try {
      onAuthStateChanged(this._auth, async user => {
        if (user) {
          console.log("User signed in:", user.uid);
          const userData = await this.getUserData(<string>user.uid);
          console.log("User data:", userData);
          this._currentUserSubject.next(userData);
        } else {
          console.log("User signed out");
          this._currentUserSubject.next(null);
        }
      });
    } catch (error) {
      console.error("Error initializing auth state:", error);
    }
  }
  private async initAuthStatePersistence() {
    try {
      await setPersistence(this._auth, browserLocalPersistence);
      console.log("Auth persistence set successfully.");
    } catch (error) {
      console.error("Error setting auth persistence:", error);
    }
  }

  async signUp(username: string, email: string, password: string): Promise<User> {
    try {

      const cred = await createUserWithEmailAndPassword(this._auth, email, password);

      // Set the user's document with the username as the document ID
      await setDoc(doc(this._db, this._coll, cred.user.uid), {
        id: cred.user.uid,
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
      });

      const newUser = {
        id: cred.user.uid,
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

      this._currentUserSubject.next(newUser as User);

      return newUser as User;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  }
  async signIn(username: string, password: string): Promise<User | null> {
    try {

      const email = await this.getUserEmailByUsername(username);


      const credentials = await signInWithEmailAndPassword(this._auth, email, password);


      const user = await this.getUserData(credentials.user.uid);

      this._currentUserSubject.next(user);

      return user;
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this._auth.signOut();
      this._currentUserSubject.next(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  }

  private async getUserEmailByUsername(username: string): Promise<string> {
    try {
      const querySnapshot = await getDocs(query(collection(this._db, this._coll), where("username", "==", username)));

      if (querySnapshot.size === 0) {
        console.log('User not found');
        throw new Error('User not found');
      }

      const userDoc = querySnapshot.docs[0];
      return userDoc.get('email');
    } catch (error) {
      console.error("Error getting user email by username:", error);
      throw error;
    }
  }


  private async getUserData(uid: string): Promise<User | null> {
    try {
      const docRef = doc(this._db, this._coll, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        console.log("User document found for username:", uid);
        return userData;
      } else {
        console.log("User document not found for username:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }



}
