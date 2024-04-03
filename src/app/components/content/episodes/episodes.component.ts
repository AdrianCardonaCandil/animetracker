import { Component} from '@angular/core';
import { EpisodeComponent } from './episode/episode.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [EpisodeComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  
}
