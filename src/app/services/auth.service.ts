import { Injectable } from '@angular/core';
import Auth from "../models/auth.model";
import firebase from "firebase/compat";
import User = firebase.User;
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Auth{

  constructor() { }

  isLoggedIn(): Promise<User | null> {
    // @ts-ignore
    return Promise.resolve(undefined);
  }

  login({username, password}: { username: string; password: string }): Promise<Observable<User> | null> {
    // @ts-ignore
    return Promise.resolve(undefined);
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }

  signup({username, password, email}: { username: string; password: string; email: string }): Promise<User | null> {
    // @ts-ignore
    return Promise.resolve(undefined);
  }
}
