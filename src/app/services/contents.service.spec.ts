import { TestBed } from '@angular/core/testing';

import { ContentsService } from './contents.service';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { FirebaseService } from './firebase.service';
import { parseContent, contentProps } from '../schemas/Content.scheme';
import { charactersProps, parseCharacters } from '../schemas/Characters.scheme';
import { episodesProps, parseEpisodes } from '../schemas/Episodes.schema';
import { characterProps, parseCharacter } from '../schemas/Character.scheme';

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
    jikan.findCharacter(188176).then(character => parseCharacter(character)).then(character => character ? firContent.create(character, "Character") : null).then(character => parseCharacter(character as characterProps)).then(character => console.log(character))
  })
});
