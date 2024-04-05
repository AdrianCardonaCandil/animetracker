import { Component} from '@angular/core';
import { EpisodeComponent } from './episode/episode.component';
import { PaginationComponent } from '../../sharedComponents/pagination/pagination.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [EpisodeComponent, PaginationComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  
}
