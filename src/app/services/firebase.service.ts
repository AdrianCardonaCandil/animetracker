import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, and, getFirestore, limit, or, orderBy} from 'firebase/firestore/lite';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { __env } from '../../environments/env.dev';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private _app:FirebaseApp;
  private _db:Firestore;
  private _storage:FirebaseStorage;
  private _optParser;
  #auth:any; // What is this, it is not asigned to nothing in the service.

  constructor() {
    this._app = initializeApp(__env.FIRE_API);
    this._db = getFirestore(this.app);
    this._storage = getStorage(this.app);
    this._optParser = {
      limit:limit,
      orderBy:orderBy,
      join: {
        or:or,
        and:and
      }
    }
  }

  get app() {return this._app};
  get db() {return this._db}
  get storage() {return this._storage};
  get optParser() {return this._optParser};
  getAuth() {return this.#auth} // Same, where does this come...
}

