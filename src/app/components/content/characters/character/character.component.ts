import { Component, input } from '@angular/core';
import { ContentsService } from '../../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../../../schemas/Character.scheme';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {

  contentService:ContentsService;
  route:ActivatedRoute;
  character:Character;

  name = input('Not Defined');
  description = input('');
  imageSource = input('assets/images/frieren.jpg');
  characterId = input(0);
  displayName = true;

  constructor(contentService:ContentsService, route:ActivatedRoute){
    this.contentService = contentService;
    this.route = route;
    this.character = {name:this.name(), id:this.characterId(), image:this.imageSource(), about:this.description()}; // Fallback character
  }

  changeDisplay(){
    if (this.character.id == 0) this.contentService.findCharacter(this.characterId()).then(character => character ? this.character = character : null)
    this.displayName=!this.displayName;
  }
}
