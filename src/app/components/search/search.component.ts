import { Component, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';
import { ResultsComponent } from './results/results.component';
import { ContentsService } from '../../services/contents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from '../../schemas/Content.scheme';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, TagsComponent, PaginationComponent, ResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  route:ActivatedRoute;
  router:Router;
  contentService:ContentsService;
  
  constructor(contentService:ContentsService, route:ActivatedRoute, router:Router){
    this.route = route;
    this.router = router;
    this.contentService = contentService;

    this.current_page = Number(route.snapshot.paramMap.get('page'));
    route.params.subscribe(params => {this.current_page = Number(params['page']); this.options.set({...this.options()})});
    this.route.url.subscribe(() =>{
      this.options.set(localStorage.getItem('options') ? JSON.parse(<string>localStorage.getItem('options')) : this.options());
      localStorage.clear();
    });

    effect(() => {
      if (this.current_page == this.options().Page && this.options().Page !== 1){
        this.router.navigate(['../', 1], {relativeTo:route}); return;
      } else {
        // Búsqueda antigua
        this.options().Page = this.current_page;
      }
      this.contentService.search(this.options()).then((contents:any) => {
        this.contents = contents.data;
        this.last_page = contents.pagination.last_visible_page;
      })
    })
  }

  // current and last page declaration
  current_page:number = 1;
  last_page:number|undefined = 10;

  // Content array based on search results
  contents:Content[]|[] = [];

  options:WritableSignal<{Name:string, Genres:string[], Year:number, Season:string, Format:string, Page:number}> =
  signal({ 
    Name:'',
    Genres:[], 
    Year:0,
    Season:'', 
    Format:'',
    Page:1
  });
}
