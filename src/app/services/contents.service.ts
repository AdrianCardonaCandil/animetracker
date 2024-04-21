import { Injectable } from '@angular/core';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { Content } from '../schemas/Content.scheme';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  private apiService:JikanContentService;
  private dbService:FirebaseContentService;

  constructor(apiService:JikanContentService, dbService:FirebaseContentService) {
    this.apiService = apiService;
    this.dbService = dbService;
  }

  search = (params:Object):Promise<Content[]>|[] => {
    this.apiService.search(params).then(contents => console.log(contents));
    return [];
  }
}
