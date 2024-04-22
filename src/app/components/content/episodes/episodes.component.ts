import { ChangeDetectionStrategy, Component} from '@angular/core';
import { EpisodeComponent } from './episode/episode.component';
import { PaginationComponent } from '../../sharedComponents/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { ContentsService } from '../../../services/contents.service';
import { Episodes } from '../../../schemas/Episodes.schema';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [EpisodeComponent, PaginationComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  
  route:ActivatedRoute;
  contentService:ContentsService;
  episodes:Episodes = {episodes:[{data:[], page:1}], id:0, pages:[], last_page:1};
  current_page:number = 1;
  last_page:number = 1;

  constructor(route:ActivatedRoute, contentService:ContentsService) {
    this.contentService = contentService;
    this.route = route;
    this.current_page = Number(route.snapshot.paramMap.get('page'));
    route.params.subscribe(params => {this.current_page = Number(params['page']); this.makeSearch()})
  }

  makeSearch = () => {
    this.contentService.findEpisodes(Number(this.route.parent?.snapshot.paramMap.get('id')), this.current_page).then(episodes => {
      this.last_page = Number(episodes?.last_page);
      if (this.current_page > this.last_page) console.log("Aquí podríamos redirreccionar a la ruta comodín");
      episodes ? this.episodes = episodes : null;
    })
  }
}

