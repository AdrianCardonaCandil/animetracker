import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rankposition',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './rankposition.component.html',
  styleUrl: './rankposition.component.css'
})
export class RankpositionComponent {
  @Input() attributes:Array<number|string> = [1, "Sousou No Frieren", 9.5, "Airing"];
  @Input() rankingBackground:string = '';
  @Input() contentId:number = 0;
}
