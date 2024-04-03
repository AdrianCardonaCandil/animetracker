import { DatePipe, NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [DatePipe, NgStyle],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode = input({number:0, title:'', date:''});

  status = computed(() => {
    let now = new Date(Date.now());
    let aired = new Date(this.episode().date);
    let endedAiring = new Date(aired);
    const averageEpisodeMinutes = 25;
    endedAiring.setMinutes(endedAiring.getMinutes() + averageEpisodeMinutes);
    return now < aired ? "Yet To Air" : now > endedAiring ? "Aired" : "Airing";
  })
}
