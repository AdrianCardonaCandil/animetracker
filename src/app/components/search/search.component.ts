import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, TagsComponent, PaginationComponent, ResultsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(){
    effect(()=>{
      console.log(this.options());
    })
  }

  options:WritableSignal<{Name:string, Genres:string[], Year:string, Season:string, Format:string}> =
  signal({ 
    Name:'',
    Genres:[], 
    Year:'',
    Season:'', 
    Format:''
  });
}
