import { Injectable } from '@angular/core';
import Users from "../../models/user.model";
import { FirebaseUserService } from "./firebase-user.service";
import User from "../../schemas/User.scheme";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Users {

  constructor(private firebaseAuthService: FirebaseUserService) {}

  findById = async (id: string): Promise<User | null> => this.firebaseAuthService.findById(id);
  // @ts-ignore
  find = async (queryObj: Object): Promise<User[] | null> => this.firebaseAuthService.find(queryObj);
  findOne = async (queryObj: Object): Promise<User | null> => this.firebaseAuthService.findOne(queryObj);

  checkOnList = async (userId: string, contentId: string, nameList: string): Promise<boolean> =>
    this.firebaseAuthService.checkOnList(userId, contentId, nameList);

  trackingList = async (userId: string, contentId: string, listField: string): Promise<boolean> =>
    this.firebaseAuthService.trackingList(userId, contentId, listField);

  getContentsFromList = async (userId: string, listField: string): Promise<Array<Map<string, any> | null>> =>
    this.firebaseAuthService.getContentsFromList(userId, listField) as Promise<Array<Map<string, any> | null>>;
  isOnList = async (userId: string, contentId: string): Promise<string | null> =>
    this.firebaseAuthService.isOnList(userId, contentId);

  incrementEpisodesCount = async (userId: string, contentId: string): Promise<number> =>
    this.firebaseAuthService.incrementEpisodesCount(userId, contentId);

  decrementEpisodesCount = async (userId: string, contentId: string): Promise<number> =>
    this.firebaseAuthService.decrementEpisodesCount(userId, contentId);
}
