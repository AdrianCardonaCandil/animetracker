import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SearchbarComponent} from '../sharedComponents/searchbar/searchbar.component'
import { AnimelistComponent } from './animelist/animelist.component';
import { ContentsService } from '../../services/contents.service';
import { Content } from '../../schemas/Content.scheme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SearchbarComponent, AnimelistComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rowNumbers = [1, 2, 3];

  heroContent: Content|undefined = undefined;
  mostRanked: Content[]|undefined = undefined;
  seasonal: Content[]|undefined = undefined;
  upComing: Content[]|undefined = undefined;
  contentService:ContentsService;
  constructor(contentService:ContentsService){
    this.contentService = contentService;
  }


}
