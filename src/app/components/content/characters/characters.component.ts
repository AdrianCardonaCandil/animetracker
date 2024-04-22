import { ChangeDetectionStrategy, Component, InputSignal, OnInit, Signal, input } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '../../../schemas/Characters.scheme';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CharacterComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {

  contentService:ContentsService;
  route:ActivatedRoute;
  characters:Characters = {characters:Array(20).fill({id:0, image:'assets/images/frieren.jpg', name:'Not Defined', role:'Not Defined'}), id:0}

  constructor(contentService:ContentsService, route:ActivatedRoute){
    this.contentService = contentService;
    this.route = route;
  }

  ngOnInit(): void {
    this.contentService.findCharacters(Number(this.route.parent?.snapshot.paramMap.get('id'))).then(characters => characters ? this.characters = characters : null);
  }
  
}
