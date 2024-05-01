import { Injectable } from '@angular/core';
import { __env } from '../../../environments/env.dev';
import { genres, genresNames } from './genres';

@Injectable({
  providedIn: 'root'
})
export class JikanContentService {
  private contentpath:string;
  private characterpath:string;
  private seasonpath:string;

  constructor() {
    this.contentpath = `${__env.JIKAN_PATH}/anime`;
    this.characterpath = `${__env.JIKAN_PATH}/characters`;
    this.seasonpath = `${__env.JIKAN_PATH}/seasons`;
  }

  // Function to get a content by ID in Jikan
  findById = (id:number) => fetch(`${this.contentpath}/${id}`).then(res => res.json()).then(res => res.data); // Works

  // Function to get the characters of a content finding by ID.
  findCharacters = (id:number) => fetch(`${this.contentpath}/${id}/characters`).then(res => res.json()).then(res => res.data); // Works

  // Function to get the episodes of a content finding by ID.
  findEpisodes = (id:number, page:number) => fetch(`${this.contentpath}/${id}/episodes?page=${page}`).then(res => res.json()); // Works

  // Function to get the images of a content finding by ID.
  findImages = (id:number) => fetch(`${this.contentpath}/${id}/pictures`).then(res => res.json()).then(res => res.data); // Works

  // Function to get a characters description finding by character ID.
  findCharacter = (characterid:number) => fetch(`${this.characterpath}/${characterid}`).then(res => res.json()).then(res => res.data ? res.data : ''); // Works

  // Function to get the upcoming season of contents from the API section of seasons.
  findupcoming = (limit:number, page?:number) => fetch(`${this.seasonpath}/upcoming?${page ? `page=${page}` : ''}&${limit ? `limit=${limit}` : ''}`).then(res => res.json()); // Works

  // Function to get a full content season finding by year and season.
  private searchSeasonContents = (year:number, season:string, format:string, page:number) => fetch(`${this.seasonpath}/${year}/${season}?${format !== '' ? `filter=${format}&` : ''}${page !== undefined ? `page=${page}`: ''}`).then(res => res.json());

  // Function to search for content based on Name, Genres and other few filters.
  private searchNameGenres = (name:string, genres:number[], format:string, page:number) => fetch(`${this.contentpath}?${name !== "" ? `q=${name}&` : ''}${genres.length !== 0 ? `genres=${genres.join(',')}&` : ''}${format !== '' ? `type=${format}&` : ''}${page !== undefined ? `page=${page}` : ''}`).then(res => res.json());

  search(params:any){
    if(params.Year || params.Season){
      return this.searchSeasonContents(params.Year, params.Season, params.Format, params.Page);
    } else {
      return this.searchNameGenres(params.Name, params.Genres.map((elem:genresNames) => genres[elem]), params.Format, params.Page);
    }
  }
}
