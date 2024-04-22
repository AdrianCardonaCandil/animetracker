import { TestBed } from '@angular/core/testing';

import { ContentsService } from './contents.service';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { FirebaseService } from './firebase.service';
import { parseContent, contentProps } from '../schemas/Content.scheme';
import { charactersProps, parseCharacters } from '../schemas/Characters.scheme';
import { episodesProps, parseEpisodes } from '../schemas/Episodes.schema';
import { characterProps, parseCharacter } from '../schemas/Character.scheme';
import { increment } from 'firebase/firestore/lite';

describe('ContentsService', () => {
  let service: ContentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("shouldDisplayAJikanAnimeSearchById", () => {
    let firebase:FirebaseService = new FirebaseService();
    let jikan:JikanContentService = new JikanContentService();
    let firContent:FirebaseContentService = new FirebaseContentService(firebase);
    firContent.findById(52991, "Episodes").then(episodes => parseEpisodes(episodes as episodesProps)).then(episodes => console.log(episodes))
    
})
})
