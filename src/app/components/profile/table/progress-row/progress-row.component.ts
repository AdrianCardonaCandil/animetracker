import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UsersService } from "../../../../services/user/users.service";

@Component({
  selector: 'app-progress-row',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './progress-row.component.html',
  styleUrls: [ '../normal-row/normal-row.component.css', 'progress-row.component.css' ]
})
export class ProgressRowComponent {
  @Input() rowTitle?: string;
  @Input() rowTotalChapters?: number;
  @Input() rowGenres?: string[];
  @Input() rowContentScore?: number;
  @Input() rowType?: string;
  @Input() rowContentCover?: string;
  @Input() rowContentId?: string;
  @Input() user?: string;
  @Input() episodes?: number;
  @Input() accountId?: string;
  @Output() changeToCompleted = new EventEmitter<string>();
  @Input() rowProgress?: number;




  constructor(private UsersService: UsersService) {
  }

  async incrementEpisodesCount() {
    console.log(this.accountId, this.episodes);
    if (<number>this.rowProgress < <number>this.episodes) {
      if (<number>this.rowProgress + 1 === this.episodes) {
        this.checkProgress();
      } else {
        this.rowProgress = await this.UsersService.incrementEpisodesCount(<string> this.user,<string>  this.rowContentId);

      }
    }
  }
  async decrementEpisodesCount() {
    if (<number>this.rowProgress > 0) {

      this.rowProgress = await this.UsersService.decrementEpisodesCount(<string>this.user,<string> this.rowContentId);
    }
  }

  async checkProgress() {
    if (confirm(`¿Do u want to move ${this.rowTitle} to the completed list?`)) {
      await this.UsersService.trackingList(<string>this.user,<string> this.rowContentId, "completed");
      this.changeToCompleted.emit(this.rowContentId)
    }
  }
}
