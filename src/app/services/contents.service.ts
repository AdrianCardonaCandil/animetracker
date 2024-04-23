import { Injectable } from '@angular/core';
import { JikanContentService } from './content/jikan-content.service';
import filterOptions, { FirebaseContentService } from './content/firebase-content.service';
import { Content, contentAtributeNames, contentProps, parseContent } from '../schemas/Content.scheme';
import Contents from '../models/content.model';
import { Characters, charactersProps, parseCharacters } from '../schemas/Characters.scheme';
import { Episodes, parseEpisodes } from '../schemas/Episodes.schema';
import { DocumentData, WhereFilterOp, arrayUnion, limit } from 'firebase/firestore/lite';
import { Character, characterProps, parseCharacter } from '../schemas/Character.scheme';

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
  create = async (content:Content):Promise<Content|null> => this.dbService.create(content, "Contents").then(content => content ? parseContent(content as contentProps) : null);

  // Returns contents queried from the search page as an array of Content.
  search = (params:Object):Promise<Object|[]> => {
    return this.apiService.search(params).then(contents => contents ? {...contents, data:contents.data.map((elem:any) => parseContent(elem))} : null)
    .then(contents => contents ? contents : []);
  }

  // Finds characters from a content by ID. Returned from the db if finded. Otherwise, returned from api and stored on db.
  findCharacters = (id:number):Promise<Characters|null> => {
    return this.dbService.findById(id, "Characters").then(characters => {
      if (characters) return characters;
      return this.apiService.findCharacters(id).then(characters => characters ? this.dbService.create(<Characters>parseCharacters(characters as charactersProps, id), "Characters") : null);
    }).then(characters => characters ? parseCharacters(characters["characters"] as charactersProps, id) : null);
  }

  
  /* Finds episodes for a content by ID. Works with pagination what it means, returns the page if found in db, if other pages are found 
  adds the new page to the previous ones. If no page is found for the content, creates the first one. */
  findEpisodes = (id:number, page:number):Promise<Episodes|null> => {
    return this.dbService.findById(id, "Episodes").then((episodes:any) => {
      if (episodes){
        if (episodes.pages.includes(page)) return {...episodes, episodes:episodes.episodes.filter((elem:any) => elem.page == page)};
        return this.apiService.findEpisodes(id, page).then(episodes => episodes ? this.dbService.updateEpisodes({
          episodes: arrayUnion({data:episodes.data, page:page}),
          pages: arrayUnion(page)
        }, String(id)) : null).then((episodes:any) => {return {...episodes, episodes:episodes.episodes.filter((elem:any) => elem.page == page)}});
      }
      return this.apiService.findEpisodes(id, page).then(episodes => episodes ? this.dbService.create(<Episodes>parseEpisodes({episodes:[{data:episodes.data, page:page}], id:id, pages:[page], last_page:episodes.pagination.last_visible_page}), "Episodes") : null)
      .then((episodes:any) => {return {...episodes, episodes:episodes.episodes.filter((elem:any) => elem.page == page)}})
    }).then(episodes => episodes ? parseEpisodes(episodes) : null);
  }

  // Finds the upcoming seasons of contents directly from the API used.
  findUpcoming = (limit:number, page?:number) => this.apiService.findupcoming(limit, page ? page : 1).then(contents => {return {...contents, data:contents.data.map((content:any) => parseContent(content))}});
  

  // Finds character information by ID. Returned from the db if finded. Otherwise, returned from api and stored on db.
  findCharacter = (id:number):Promise<Character|null> => {
    return this.dbService.findById(id, "Character").then(character => {
      if (character) return character;
      return this.apiService.findCharacter(id).then(character => character ? this.dbService.create(<Character>parseCharacter(character as characterProps), "Character") : null);
    }).then(character => character ?  parseCharacter(character as characterProps) : null);
  }
  
  // Queries the contents database with a set of parameters and a set of options. Returns the docs founded that satisfies given queries.
  find(params:[contentAtributeNames, WhereFilterOp, string][], option:filterOptions):Promise<(Content | null)[] | null>{
    return this.dbService.find(params, option);
  }
}
