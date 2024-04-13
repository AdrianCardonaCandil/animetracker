import { TestBed } from '@angular/core/testing';

import { ContentsService } from './contents.service';
import { JikanContentService } from './content/jikan-content.service';
import { FirebaseContentService } from './content/firebase-content.service';
import { FirebaseService } from './firebase.service';
import { parseContent, contentProps } from '../schemas/Content.scheme';

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
    firContent.find([["title", "==", "Sousou No Frieren"]], {limit:1, orderBy:{field:"title", order:"asc"}, join:"or"}).then(docs => docs?.map(elem => parseContent(elem as contentProps))).then(contents => console.log(contents));
  })
});
