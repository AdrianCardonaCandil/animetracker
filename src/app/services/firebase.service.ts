import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

import { __env } from '../enviroments/env.dev';
import {FirebaseConfig} from "./FirebaseConfig";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  #app;
  #db;
  #storage;
  #auth: any;

  constructor() {
    this.#app = initializeApp(__env.FIRE_API as FirebaseConfig);

    this.#db = getFirestore(this.#app);
    this.#storage = getStorage(this.#app);
  }

  get app() { return this.#app; }

  get db() { return this.#db; }
  get storage() { return this.#storage; }
  get auth() { return this.#auth; }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseService());
