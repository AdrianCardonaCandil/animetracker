import { Injectable } from '@angular/core';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { Content, contentProps, parseContent } from '../schemas/Content.scheme';
import Contents from '../models/content.model';
import { Characters, charactersProps, parseCharacters } from '../schemas/Characters.scheme';
import { Episodes } from '../schemas/Episodes.schema';

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
  
  // Finds a content by ID. Returned from the db if finded. Otherwise, returned from api and stored on db.
  findById = (id:number):Promise<Content|null> => {
    return this.dbService.findById(id, "Contents").then(content => {
      if (content) return content;
      return this.apiService.findById(id).then(content => content ? this.dbService.create(<Content>parseContent({...content, id}), "Contents") : null);
    }).then(content => content ? parseContent(content as contentProps) : null);
  }

  // Stores a content in the db. Returns it aswell.
  create = async (content:Content) => this.dbService.create(content, "Contents").then(content => content ? parseContent(content as contentProps) : null);

  // Returns contents queried from the search page as an array of Content.
  search = (params:Object):Promise<Object|[]> => {
    return this.apiService.search(params).then(contents => contents ? {...contents, data:contents.data.map((elem:any) => parseContent(elem))} : null)
    .then(contents => contents ? contents : []);
  }

  // Finds characters from a content by ID. Returned from the db if finded. Otherwise, returned from api and stored on db.
  findCharacters = (id:number):Promise<Characters|null> => {
    return this.dbService.findById(id, "Characters").then(characters => {
      if (characters) return characters;
      return this.apiService.findCharacters(id).then(characters => characters ? this.dbService.create(<Characters>parseCharacters(characters["characters"] as charactersProps, id), "Characters") : null);
    }).then(characters => characters ? parseCharacters(characters["characters"] as charactersProps, id) : null);
  }

  /*
  findEpisodes = (id:number, page:number):Promise<Episodes|null> => {
    return this.dbService.findById(id, "Episodes").then((episodes:any) => {
      if (episodes){
        if (episodes.pages.include(page)) return {...episodes, episodes:episodes.slice(100*(page-1), 100+(page))};
      }
    })
  }
  */
}
