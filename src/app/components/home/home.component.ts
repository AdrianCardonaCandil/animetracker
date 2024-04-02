import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SearchbarComponent} from '../sharedComponents/searchbar/searchbar.component'
import { AnimelistComponent } from './animelist/animelist.component';

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
}
