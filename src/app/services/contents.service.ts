import { Injectable } from '@angular/core';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { Content, parseContent } from '../schemas/Content.scheme';
import Contents from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentsService implements Contents {

  private apiService:JikanContentService;
  private dbService:FirebaseContentService;

  constructor(apiService:JikanContentService, dbService:FirebaseContentService) {
    this.apiService = apiService;
    this.dbService = dbService;
  }

  search = (params:Object):Promise<Object|[]> => {
    return this.apiService.search(params).then(contents => contents ? {...contents, data:contents.data.map((elem:any) => parseContent(elem))} : null)
    .then(contents => contents ? contents : []);
  }
}
