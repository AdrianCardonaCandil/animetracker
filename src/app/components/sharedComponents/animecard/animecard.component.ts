import { Component, input } from '@angular/core';

@Component({
  selector: 'app-animecard',
  standalone: true,
  imports: [],
  templateUrl: './animecard.component.html',
  styleUrl: './animecard.component.css'
})
export class AnimecardComponent {
  animeName = input("Shoujo Shuumatsu Ryoukou");
  imageSource = input("../../assets/images/shoujo-shuumatsu.jpeg");
}
