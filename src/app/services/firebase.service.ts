import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, and, getFirestore, limit, or, orderBy} from 'firebase/firestore/lite';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { __env } from '../environments/env.dev';
import {Auth, getAuth} from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _app: FirebaseApp;
  private _db: Firestore;
  private _storage: FirebaseStorage;
  private _optParser;
  private _auth: Auth;

  constructor() {
    this._app = initializeApp(__env.FIRE_API);
    this._db = getFirestore(this._app);
    this._storage = getStorage(this._app);
    this._optParser = {
      limit: limit,
      orderBy: orderBy,
      join: {
        or: or,
        and: and
      }
    }
    this._auth = getAuth(this._app);
  }

  get app() { return this._app };
  get db() { return this._db }
  get storage() { return this._storage };
  get optParser() {return this._optParser};
  get auth() { return this._auth };

}
