import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';
import { ResultsComponent } from './results/results.component';
import { ContentsService } from '../../services/contents.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, TagsComponent, PaginationComponent, ResultsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(contentService:ContentsService){
    effect(()=>{
      console.log(this.options())
    })
  }

  // current and last page declaration
  current_page:number = 1;
  last_page:number|undefined = undefined;

  options:WritableSignal<{Name:string, Genres:string[], Year:number, Season:string, Format:string}> =
  signal({ 
    Name:'',
    Genres:[], 
    Year:0,
    Season:'', 
    Format:''
  });
}
