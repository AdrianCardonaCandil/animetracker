import {ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output} from '@angular/core';
import {UsersService} from "../../../services/user/users.service";

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [],
  templateUrl: './maininfo.component.html',
  styleUrl: './maininfo.component.css'

})
export class MaininfoComponent {
  contentLists = [ 'completed', 'planToWatch', 'dropped', 'watching' ];
  controlButtons = {
    listClicked:false,
    rateClicked:false
  }
  selectedList: string | null = null;

  @Input() id?: string;
  @Input() user?: string;
  @Input() likes?: number;

  @Output() likesChanged = new EventEmitter<number>();

  contentdata = input(
    {
      name:'Not Defined',
      synopsis:'Not Defined',
      imageSource:'assets/images/frieren.jpg',
      score:5
    }
  );
  constructor(
    private userService: UsersService
  ) { }
  toggleToListDropdown() {
    if (this.user && this.id) {
      this.controlButtons.listClicked = !this.controlButtons.listClicked;
    }else {
      alert('You need to be logged in to add animes to lists');
    }
  }

  toggleRateDropdown() {
    if (this.user && this.id) {
      this.controlButtons.rateClicked = !this.controlButtons.rateClicked;
    }else {
      alert('You need to be logged in to add animes to lists');
    }
  }

  private async setDefaultSelectedList(): Promise<void> {
    try {
      if (this.user && this.id) {
        const listName = await this.userService.isOnList(this.user, this.id);
        console.log(listName);
        if (listName) {
          this.selectedList = listName;
        }
      }
    } catch (error) {
      console.error('Error checking list:', error);
    }
  }
  async listSelection(option: string): Promise<void> {

    if (option === this.selectedList) {

      this.selectedList = null;
    } else {
      this.selectedList = option;
      console.log("selectedlist", this.selectedList);
      console.log("id", this.id);
    }
    if (this.user && this.id) {
      await this.userService.trackingList(this.user, this.id, option);
    }
  }

  isListSelected(option: string): boolean {
    return this.selectedList === option;
  }



}
