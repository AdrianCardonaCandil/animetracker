import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sideinfo',
  standalone: true,
  imports: [],
  templateUrl: './sideinfo.component.html',
  styleUrl: './sideinfo.component.css'
})
export class SideinfoComponent {
  contentdata = input([
    {id:'Type', value:'TV'},
    {id:'Source',value:'Manga'},
    {id:'Episodes',value:'28'},
    {id:'Duration',value:'24 minutes per ep'},
    {id:'Status',value:'Finished Airing'},
    {id:'Season',value:'fall'},
    {id:'Year',value:'2023'},
    {id:'Studios',value:'Madhouse'},
    {id:'Genres',value:['Adventure', 'Drama', 'Fantasy']},
    {id:'Rating',value:'PG-13 - Teens 13 or older'}
  ])

  isArray(item: any){
    return typeof item === 'string';
  }
}
