import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, TagsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  itemsSelected = {Name:"", Genres: new Array<string>, Year:"", Season:"", Format: new Array<string>}

  selectedHandler(option:{class:string, value:String}) {
    if (option.class == 'Genres' || option.class == 'Format'){
      this.itemsSelected[option.class].push(String(option.value));
    }
    if (option.class == 'Name' || option.class == 'Year' || option.class == 'Season'){
      this.itemsSelected[option.class] = String(option.value);
    }
  }
}