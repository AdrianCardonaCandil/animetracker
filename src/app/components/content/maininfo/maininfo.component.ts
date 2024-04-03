import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './maininfo.component.html',
  styleUrl: './maininfo.component.css'
  
})
export class MaininfoComponent {
  contentLists = ["Completed", "Watching", "Planned To Watch", "Dropped"];
  controlButtons = {
    listClicked:false,
    rateClicked:false
  }
  contentdata = input(
    {
      name:'Sousou No Frieren',
      synopsis:'Lorem ipsum dolor sit amet,\
      consectetur adipiscing elit. In fermentum\
      consectetur turpis vel condimentum. Nulla\
      lacinia sem eu leo interdum, vitae lacinia\
      erat pulvinar. Proin ut tellus metus. Donec\
      id libero vitae ligula sollicitudin porta. Ut\
      id tellus sagittis, suscipit velit at, luctus\
      tellus. Interdum et malesuada fames ac ante\
      ipsum primis in faucibus.',
      imageSource:'../../../../assets/images/frieren.jpg',
      score:5
    }
  );

  toggleToListDropdown() {
    this.controlButtons.listClicked = !this.controlButtons.listClicked;
  }

  toggleRateDropdown() {
    this.controlButtons.rateClicked = !this.controlButtons.rateClicked;
  }
}
