import { Injectable } from '@angular/core';
import { Firestore } from 'firebase/firestore/lite';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseContentService {

  // Content collection in our firebase database.
  private _coll;

  constructor(private firebase: FirebaseService) {
    this._coll = "Contents";
  }

  public get db():Firestore {return this.firebase.db};
  public get coll() {return this._coll};
  public get opts() {return this.firebase.optParser};

}
