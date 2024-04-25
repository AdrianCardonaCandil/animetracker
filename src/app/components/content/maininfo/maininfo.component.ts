import {ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output, SimpleChanges} from '@angular/core';
import {UsersService} from "../../../services/user/users.service";
import {ContentsService} from "../../../services/contents.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-maininfo',
  standalone: true,
  imports: [
    NgClass
  ],
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
  isInFavorites: boolean = false;
  listSelected: boolean = false;
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
    private contentService: ContentsService,
    private userService: UsersService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes || 'id' in changes) {
      this.checkFavorites();
      this.setDefaultSelectedList();
    }
  }

  // lists related methods
  toggleToListDropdown() {
    if (this.user && this.id) {
      this.controlButtons.listClicked = !this.controlButtons.listClicked;
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

  // like related methods

  async checkFavorites(): Promise<void> {
    if (this.user && this.id) {
      this.isInFavorites = await this.userService.checkOnList(this.user, this.id, "favorites");
    } else {
      this.isInFavorites = false;
    }
  }
  likeContent(): void {
    if (this.user) {
      this.contentService.like(this.user, <string>this.id).then(likes => {
        this.likes = likes
        this.likesChanged.emit(likes);
        this.isInFavorites = !this.isInFavorites; // Toggle favorite status
      });
    } else {
      alert('You need to be logged in to give likes.');
    }
  }
  // rate related methods

  toggleRateDropdown() {
    if (this.user && this.id) {
      this.controlButtons.rateClicked = !this.controlButtons.rateClicked;
    }else {
      alert('You need to be logged in to add animes to lists');
    }
  }

}
