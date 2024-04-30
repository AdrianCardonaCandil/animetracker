import User from "../schemas/User.scheme";

export default interface Users {
  findById: (id: string) => Promise<User | null>
  find: (obj: Object) => Promise<Array<User>>
  findOne: (obj: Object) => Promise<User | null>
  getContentsFromList: (userId: string, listField: string) => Promise<Array<Map<string, any> | null>>
  checkOnList: (userId: string , contentId: string , listField: string) => Promise<boolean>
  trackingList: (userId: string , contentId: string , listField: string) => Promise<boolean>
  isOnList: (userId: string , contentId: string ) => Promise<string | null>
  incrementEpisodesCount: (userId: string , contentId: string ) => Promise<number>
  decrementEpisodesCount: (userId: string , contentId: string ) => Promise<number>
  checkUserExistance:(username:string) => Promise<boolean>
  checkEmailExistance:(email:string) => Promise<boolean>
 }
