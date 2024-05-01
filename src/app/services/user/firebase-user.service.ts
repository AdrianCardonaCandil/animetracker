import { Injectable } from '@angular/core';
import User, {parse} from "../../schemas/User.scheme"; // Adjust the import statement for User
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  and,
  or,
  Firestore
} from 'firebase/firestore/lite';
import {updateEmail, updatePassword} from 'firebase/auth'
import { FirebaseService } from '../firebase.service';
import { Auth } from "firebase/auth";
import {  ref, uploadBytes, getDownloadURL, FirebaseStorage} from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  private _coll = "Users";
  private _db: Firestore;
  private _auth: Auth;
  private _storage: FirebaseStorage;

  constructor(private firebaseService: FirebaseService) {
    this._db = this.firebaseService.db;
    this._auth = this.firebaseService.auth;
    this._storage = this.firebaseService.storage
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

  trackingList = async (userId: string, contentId: string, newListName: string) => {
    console.log(`Moving ${contentId} to ${newListName} list`);
    try {
      const userRef = doc(this._db, this._coll, userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log('User not found');
        return false;
      }

      const userData = userDoc.data();

      const currentListName = await this.isOnList(userId, contentId);

      // Remove contentId from the current list if it exists
      if (currentListName && userData[currentListName]) {
        const updatedList = userData[currentListName].filter((item: string) => item !== contentId);
        await updateDoc(userRef, { [currentListName]: updatedList });
      }

      // Add contentId to the new list only if it's not already there
      if (newListName !== currentListName) {
        const newList = userData[newListName];
        const alreadyInList = newList && newList.includes(contentId);
        if (!alreadyInList) {
          const updatedList = [...(userData[newListName] || []), contentId];
          await updateDoc(userRef, { [newListName]: updatedList });

          // If the new list is 'watching', add contentProgress
          if (newListName === "watching") {
            const contentProgress = userData["contentProgress"] || {};
            if (!contentProgress.hasOwnProperty(contentId)) {
              contentProgress[contentId] = 0;
              await updateDoc(userRef, { contentProgress });
            }
          }
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

    const emailQuery = query(collection(this._db, this._coll), where("email", "==", email));

    const [emailDocs] = await Promise.all([
      getDocs(emailQuery),
    ]);

    return (!emailDocs.empty)

  }

  async modifyUserDetails(uid: string, username: string, email: string, description: string) {

    const userRef = doc(this._db, this._coll, uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data() || {};

    const usernameData = userData['username'] || '';
    const descriptionData = userData['description'] || '';
    const emailData = userData['email'] || '';

    const isEmailModified = emailData !== email;

    if (isEmailModified) {
      try {
        if (this._auth.currentUser) {
          await Promise.all([
            updateDoc(userRef, {email: email}),
            updateEmail(this._auth.currentUser, email)
          ]);
        }
      } catch (error) {
        console.error('Error updating email:', error);
        throw error;
      }
    }

    // Update other details
    const updates: any = {}; // Object to store updates
    if (usernameData !== username) {
      updates.username = username;
    }
    if (descriptionData !== description) {
      updates.description = description;
    }

    if (Object.keys(updates).length > 0) {
      try {
        await updateDoc(userRef, updates);
        return true;
      } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
      }
    }
    return true;
  }

  async updateProfilePicture(userId: string, profileImage: File | null) {
    if (!profileImage) return Promise.reject(new Error('No image provided'));


    try {


      const storageRef = ref(this._storage, `profilePictures/${userId}`);

      const snapshot = await uploadBytes(storageRef, profileImage);

      const downloadURL = await getDownloadURL(snapshot.ref);

      const userRef = doc(this._db, this._coll, userId);
      await updateDoc(userRef, { profilePicture: downloadURL });

      return downloadURL;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<boolean> {
    try {
      // Update password in authentication system
      const user = this._auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
      } else {
        throw new Error('User not found');
      }

      // Update password in Firestore
      const userRef = doc(this._db, this._coll, userId);
      await updateDoc(userRef, { password: newPassword });

      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

}
