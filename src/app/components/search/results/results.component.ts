import { Component, InputSignal, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [AnimecardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  // Contents to represent input
  contents:InputSignal<number[]> = input([].constructor(25));
}
