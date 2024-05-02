import { TitleCasePipe } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

export class HeroComponent {
  title = input();
  description = input();
  imageSource = input();
  contentID = input();
  info:InputSignal<({
    id: string;
    value: number;
} | {
    id: string;
    value: string;
})[]> = input([
    {id: 'score', value: 0},
    {id: 'likes', value: 0},
    {id: 'season', value: ''},
    {id: 'year', value:  0}
  ]);
}