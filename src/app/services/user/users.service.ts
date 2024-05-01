import { Injectable } from '@angular/core';
import Users from "../../models/user.model";
import { FirebaseUserService } from "./firebase-user.service";
import User from "../../schemas/User.scheme";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Users {

  constructor(private firebaseUserService: FirebaseUserService) {}

  findById = async (id: string): Promise<User | null> => this.firebaseUserService.findById(id);
  // @ts-ignore
  find = async (queryObj: Object): Promise<User[] | null> => this.firebaseUserService.find(queryObj);
  findOne = async (queryObj: Object): Promise<User | null> => this.firebaseUserService.findOne(queryObj);

  checkOnList = async (userId: string, contentId: string, nameList: string): Promise<boolean> =>
    this.firebaseUserService.checkOnList(userId, contentId, nameList);

  trackingList = async (userId: string, contentId: string, listField: string): Promise<boolean> =>
    this.firebaseUserService.trackingList(userId, contentId, listField);

  getContentsFromList = async (userId: string, listField: string): Promise<Array<Map<string, any> | null>> =>
    this.firebaseUserService.getContentsFromList(userId, listField) as Promise<Array<Map<string, any> | null>>;
  isOnList = async (userId: string, contentId: string): Promise<string | null> =>
    this.firebaseUserService.isOnList(userId, contentId);

  incrementEpisodesCount = async (userId: string, contentId: string): Promise<number> =>
    this.firebaseUserService.incrementEpisodesCount(userId, contentId);

  decrementEpisodesCount = async (userId: string, contentId: string): Promise<number> =>
    this.firebaseUserService.decrementEpisodesCount(userId, contentId);

  checkUserExistence = async (username: string): Promise<boolean> =>
    this.firebaseUserService.checkUserExistance(username);
  checkEmailExistence = async (email: string): Promise<boolean> =>
    this.firebaseUserService.checkEmailExistence(email);

  modifyUserDetails = async ( uid: string, username:string, email:string, description:string): Promise<boolean> =>
    this.firebaseUserService.modifyUserDetails( uid, username,email,description);

  updateProfilePicture = async ( userId:string, profileImage: File ): Promise<string> =>
    this.firebaseUserService.updateProfilePicture( userId, profileImage);

  updatePassword = async ( userId:string, password:string): Promise<boolean> =>
    this.firebaseUserService.updatePassword(userId, password);
}
