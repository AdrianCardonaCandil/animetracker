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
      // Aqui es donde se ejecutará la lógica para enviar los datos hacia el servidor
    })
  }

  options:WritableSignal<{Name:string, Genres:String[], Year:string, Season:string, Format:String[]}> =
  signal({ 
    Name:'',
    Genres:[], 
    Year:'',
    Season:'', 
    Format:[]
  });
}
