import { Injectable } from '@angular/core';
import { __env } from '../../../environments/env.dev';

type parameters = {Name:string, Genres:string[], Year:string, Season:string, Format:string, Page:string};

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
  findById = (id:string) => fetch(`${this.contentpath}/${id}`).then(res => res.json()).then(res => res.data); // Works

  // Function to get the characters of a content finding by ID.
  findCharacters = (id:string) => fetch(`${this.contentpath}/${id}/characters`).then(res => res.json()).then(res => res.data); // Works

  // Function to get the episodes of a content finding by ID.
  findEpisodes = (id:string, page:string) => fetch(`${this.contentpath}/${id}/episodes?page=${page}`).then(res => res.json()); // Works

  // Function to get the images of a content finding by ID.
  findImages = (id:string) => fetch(`${this.contentpath}/${id}/pictures`).then(res => res.json()).then(res => res.data); // Works

  // Function to get a characters description finding by character ID.
  findCharacterDescription = (characterid:string) => fetch(`${this.characterpath}/${characterid}`).then(res => res.json()).then(res => res.data.about ? res.data.about : ''); // Works

  // Function to get a full content season finding by year and season.
  private findSeasonContents = (year:string, season:string, format:string, page:string) => fetch(`${this.seasonpath}/${year}/${season}?${format !== '' ? `filter=${format}&` : ''}${page !== '' ? `page=${page}`: ''}`).then(res => res.json());

  private findNameGenres = (name:string, genres:string[], format:string, page:string) => fetch(`${this.contentpath}?${name !== "" ? `q=${name}&` : ''}${genres.length !== 0 ? `genres=${genres.join(',')}&` : ''}${format !== '' ? `type=${format}&` : ''}${page !== '' ? `page=${page}` : ''}`).then(res => res.json());

  find({Name, Genres, Year, Season, Format, Page}:parameters){
    if(Year || Season){
      return this.findSeasonContents(Year, Season, Format, Page);
    } else {
      return this.findNameGenres(Name, Genres, Format, Page);
    }
  }
}