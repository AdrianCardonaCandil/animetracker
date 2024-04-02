import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';

@Component({
  selector: 'app-animelist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimecardComponent],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  descriptor = input("Anime Row");
}
