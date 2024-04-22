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
      name:'Not Defined',
      synopsis:'Not Defined',
      imageSource:'assets/images/frieren.jpg',
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
