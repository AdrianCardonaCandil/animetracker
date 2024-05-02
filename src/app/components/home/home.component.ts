import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SearchbarComponent} from '../sharedComponents/searchbar/searchbar.component'
import { AnimelistComponent } from './animelist/animelist.component';
import { ContentsService } from '../../services/contents.service';
import { Content } from '../../schemas/Content.scheme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SearchbarComponent, AnimelistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  seasonalQuery = {Name:'', Genres:[], Year:new Date().getFullYear(), Season: ['Winter', 'Spring', 'Summer', 'Fall'][Math.floor((new Date().getMonth() / 12 * 4)) % 4], Format:'', Page:''}
  rowNames = ["Top Ranked", "Currently Airing", "Upcoming"];

  hero: Content|null= null;
  ranked: Content[]|undefined = undefined;
  seasonal: Content[]|undefined = undefined;
  upcoming: Content[]|undefined = undefined;
  contentService:ContentsService;

  constructor(contentService:ContentsService){
    this.contentService = contentService;
  }

  ngOnInit(): void {
    this.contentService.find([], {orderBy:{field:"score", order:"desc"}}).then(contents => {
      this.hero = contents ? contents[0] : null;
      this.ranked = contents ? <Content[]>contents.slice(1, 6) : undefined;
    })
    this.contentService.search(this.seasonalQuery).then((contents:any) => contents ? this.seasonal = contents.data.slice(0, 5) : undefined);
    this.contentService.findUpcoming(5).then(contents => contents ? this.upcoming = contents.data : null);
  }
}
