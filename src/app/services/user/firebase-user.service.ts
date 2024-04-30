import { Injectable } from '@angular/core';
import User, {parse} from "../../schemas/User.scheme"; // Adjust the import statement for User
import {
  getFirestore,
  collection,
  doc,
  arrayUnion,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  and,
  or,
  Firestore
} from 'firebase/firestore/lite';
import { FirebaseService } from '../firebase.service';
import { Auth } from "firebase/auth";
import { BehaviorSubject } from "rxjs"; // Import BehaviorSubject from rxjs

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  private _coll = "Users";
  private _db: Firestore;

  constructor(private firebaseService: FirebaseService) {
    this._db = this.firebaseService.db;
  }

  get db(): Firestore {
    return this._db;
  }

  findById = async (id: string):  Promise<User | null> => {
    const userDoc = await getDoc(doc(this._db, this._coll, `${id}`));
    return userDoc.exists() ? parse(userDoc.data()) : null; // Change User.parse to parseUser
  }

  find = async (queryObj: Object, opt = 'OR'): Promise<User[] | null> => {
    const constrains = [];
    for (const [key, val] of Object.entries(queryObj)) {
      constrains.push(where(String(key), '==', val));
    }

    const querySnapshot = await getDocs(
      query(collection(this._db, this._coll), opt === 'OR' ? or(...constrains) : and(...constrains))
    );

    return (querySnapshot.docs.map(elm => parse(elm.data())) as User[] | null)
  }

  findOne = async (queryObj: Object, opt = 'OR') => {
    const constrains = [];
    for (const [key, val] of Object.entries(queryObj)) {
      constrains.push(where(String(key), '==', val));
    }

    const querySnapshot = await getDocs(
      query(collection(this._db, this._coll), opt === 'OR' ? or(...constrains) : and(...constrains))
    );

    return querySnapshot.docs.length ? parse(querySnapshot.docs[0].data()) : null;
  }

  checkOnList = async (userId: string,contentId: string, nameList: string, ) => {
    try {
      const userDoc = await getDoc(doc(this._db, this._coll, userId));
      if (!userDoc.exists()) {
        console.log('User not found');
        return false;
      }

      const userData = userDoc.data();
      const listField = userData[nameList];
      if (!Array.isArray(listField)) {
        console.log('Invalid list field or it does not contain an array');
        return false;
      }

      return listField.includes(contentId);
    } catch (error) {
      console.error('Error checking content on list:', error);
      return false;
    }
  }

  trackingList = async (userId: string, contentId: string, newListName: string): Promise<boolean> => {
    console.log(`Moving ${contentId} to ${newListName} list`);
    try {
      const userRef = doc(this._db, this._coll, userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log('User not found');
        return false;
      }

      const userData = userDoc.data()!;
      const currentListName = await this.isOnList(userId, contentId);

      if (currentListName && userData[currentListName]) {
        const updatedList = userData[currentListName].filter((item: any) => item !== contentId);
        await updateDoc(userRef, { [currentListName]: updatedList });
      }

      const updatedList = [...(userData[newListName] || []), contentId];
      await updateDoc(userRef, { [newListName]: updatedList });

      if (newListName === "watching") {
        const contentProgress = userData['contentProgress'] || {};
        if (!contentProgress.hasOwnProperty(contentId)) {
          contentProgress[contentId] = 0;
          await updateDoc(userRef, { contentProgress });
        }
      }
      console.log('Content moved to the new list successfully');
      return true;
    } catch (error) {
      console.error('Error moving content to the new list:', error);
      return false;
    }
  }

  isOnList = async (userId: string, contentId: string) => {
    const userRef = doc(this._db, this._coll, userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() || {};
    const trackingLists = ['completed', 'planToWatch', 'dropped', 'watching'];

    for (const listName of trackingLists) {
      if (userData.hasOwnProperty(listName) && Array.isArray(userData[listName])) {
        const list = userData[listName];
        if (list.includes(contentId)) {
          console.log("list name", listName);
          return listName;
        }
      }
    }
    return null;
  }

  getContentsFromList = async (userId: string, listField: string) => {
    try {
      const userDoc = await getDoc(doc(this.db, this._coll, userId));
      if (!userDoc.exists()) {
        console.log('User not found');
        return null;
      }

      const userData: any = userDoc.data(); // Type annotation added
      let references: string[] = userData[listField] || []; // Type annotation added
      const userScores: { [key: string]: any } = userData["userScores"] || {}; // Type annotation added
      const contentProgress: { [key: string]: any } = userData["contentProgress"] || {}; // Type annotation added
      const contentMap: { [key: string]: any } = {}; // Type annotation added

      for (const reference of references) {
        try {
          const contentDoc = await getDoc(doc(this.db, 'Contents', reference));
          const score = userScores[reference] || '-';
          const progress = contentProgress[reference] || 0;

          if (contentDoc.exists()) {
            const contentData = contentDoc.data();
            contentMap[reference] = {
              coverimage: contentData['coverimage'],
              title: contentData['title'],
              score: contentData['score'],
              status: contentData['status'],
              type: contentData['type'],
              year: contentData['year'],
              userScore: score,
              genres: contentData['genres'],
              contentProgress: progress,
              episodes: contentData['episodes']
            };
          } else {
            console.log(`Content with reference ${reference} not found`);
          }
        } catch (error) {
          console.error(`Error processing reference ${reference}:`, error);
        }
      }

      return contentMap;
    } catch (error) {
      console.error('Error getting contents from list:', error);
      return null;
    }
  }

  incrementEpisodesCount = async (userId: string, contentId: string) => {
    try {
      const userRef = doc(this._db, this._coll, userId);
      const userDoc = await getDoc(userRef);

      const contentDoc = await getDoc(doc(this._db, 'Contents', contentId));
      const contentData = contentDoc.data();
      const maxCount = contentData?.['episodes'] || 0;

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data() || {};
      const contentProgress = userData['contentProgress'] || {};
      const episodesCount = contentProgress[contentId] || 0;

      if (episodesCount === maxCount) {
        return episodesCount;
      } else {
        contentProgress[contentId] = episodesCount + 1;
        await updateDoc(userRef, { contentProgress });
        return contentProgress[contentId];
      }
    } catch (error) {
      console.error('Error incrementing episodes count:', error);
      throw error;
    }
  }

  decrementEpisodesCount = async (userId: string, contentId: string) => {
    try {
      const userRef = doc(this._db, this._coll, userId);
      const userDoc = await getDoc(userRef);

      const userData = userDoc.data() || {};
      const contentProgress = userData['contentProgress'] || {};
      const episodesCount = contentProgress[contentId] || 0;

      if (episodesCount === 0) {
        return episodesCount;
      } else {
        contentProgress[contentId] = episodesCount - 1;
        await updateDoc(userRef, { contentProgress });
        return contentProgress[contentId];
      }
    } catch (error) {
      console.error('Error incrementing episodes count:', error);
      throw error;
    }
  }

  checkUserExistance = async (username: string) => {
    const usernameQuery = query(collection(this._db, this._coll), where("username", "==", username));

    const [usernameDocs] = await Promise.all([
      getDocs(usernameQuery),
    ]);

    return (!usernameDocs.empty)
  }
  checkEmailExistence = async (email: string) => {

    const emailQuery = query(collection(this._db, "Users"), where("email", "==", email));

    const [emailDocs] = await Promise.all([
      getDocs(emailQuery),
    ]);

    return (!emailDocs.empty)

  }
}
