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
    {id:'Type', value:'Not Defined'},
    {id:'Source',value:'Not Defined'},
    {id:'Episodes',value:'0'},
    {id:'Duration',value:'Not Defined'},
    {id:'Status',value:'Not Defined'},
    {id:'Season',value:'Not Defined'},
    {id:'Year',value:'Not Defined'},
    {id:'Studios',value:['Not Defined']},
    {id:'Genres',value:['Not Defined']},
    {id:'Rating',value:'Not Defined'}
  ])

  isString(item: any){
    return typeof item === 'string';
  }
}
