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
  selectedItems:{Name:string, Genres:String[], Year:string, Season:string, Format:String[]} = 
  { 
    Name:'',
    Genres:[], 
    Year:'',
    Season:'', 
    Format:[]
  }

  setSelectedItems(items:{Name:string, Genres:String[], Year:string, Season:string, Format:String[]}){
    this.selectedItems = items;
  }
}
