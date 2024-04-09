import { Injectable } from '@angular/core';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { FirebaseService } from './firebase.service';
import { parseContent } from '../schemas/Content.schema';

@Injectable({
  providedIn: 'root'
})

export class FirebaseContentService {
  private collectionName: string = "Contents";
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  private get db() {
    return this.firebaseService.db;
  }

  private get collection() {
    return this.collectionName;
  }

  findById = async (id: string) => {
    const document = await getDoc(doc(this.db, this.collection, id));
    const data = document.data();
    return data ? parseContent(data) : null;
  }

  create = async (content: any) => {
    if (await this.findById(content.id)) return null;

    await setDoc(doc(this.db, this.collection, content.id), content);

    return await this.findById(content.id);
  }
}
