import { Injectable } from '@angular/core';
import { __env } from '../../../environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class JikanContentService {
  private contentpath:string;
  private characterpath:string;
  private seasonpath:string;

  private seasons = {
    autumn:{
        start:"10-01",
        end:"12-31"
    },
    summer:{
        start:"07-01",
        end:"09-30"
    },
    spring:{
        start:"04-01",
        end:"06-30"
    },
    winter:{
        start:"01-01",
        end:"03-31"
    }
  }

  constructor() {
    this.contentpath = `${__env.JIKAN_PATH}/anime`;
    this.characterpath = `${__env.JIKAN_PATH}/characters`;
    this.seasonpath = `${__env.JIKAN_PATH}/seasons`;
  }
  
  // Function to get a content by ID in Jikan
  findById = (id:string) => fetch(`${this.contentpath}/${id}`).then(res => res.json()).then(res => res.data); // Works well

  // Function to get the characters of a content finding by ID.
  findCharacters = (id:string) => fetch(`${this.contentpath}/${id}/characters`).then(res => res.json()).then(res => res.data); // Works well

  // Function to get the episodes of a content finding by ID.
  findEpisodes = (id:string, page?:string) => fetch(`${this.contentpath}/${id}/episodes?page=${page}`).then(res => res.json()).then(res => page ? (page <= res.pagination.last_visible_page ? res.data : []) : res.data); // Works well

  // Function to get the images of a content finding by ID.
  findImages = (id:string) => fetch(`${this.contentpath}/${id}/pictures`).then(res => res.json()).then(res => res.data);

  // Function to get a characters description finding by character ID.
  findCharacterDescription = (characterid:string) => fetch(`${this.characterpath}/${characterid}`).then(res => res.json()).then(res => res.data.about ? res.data.about : ''); // Works well

  // Function to get a full content season finding by year and season.
  findSeasonContents = (year:string, season:string, format?:string, page?:string) => fetch(`${this.seasonpath}/${year}/${season}?${format ? `filter=${format}&` : ''}${page ? `page=${page}`: ''}`).then(res => res.json()).then(res => page ? (page <= res.pagination.last_visible_page ? res.data : []) : res.data); // Works well
}