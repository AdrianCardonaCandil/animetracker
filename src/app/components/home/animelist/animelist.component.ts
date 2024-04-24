import { ChangeDetectionStrategy, Component, InputSignal, input, signal } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { Content } from '../../../schemas/Content.scheme';

@Component({
  selector: 'app-animelist',
  standalone: true,
  imports: [AnimecardComponent],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  descriptor = input("Anime Row");
  contents:InputSignal<Content[]|undefined> = input();
}
