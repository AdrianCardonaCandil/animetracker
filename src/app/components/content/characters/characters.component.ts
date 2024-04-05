import { ChangeDetectionStrategy, Component, InputSignal, Signal, input } from '@angular/core';
import { CharacterComponent } from './character/character.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CharacterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
  characters = input();
}
