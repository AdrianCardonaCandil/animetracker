import {Component, Input} from '@angular/core';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    EditProfileComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input() username?: string;
  @Input() description?: string;
  @Input() profilePicture?: string;
  @Input() accountId?: string;
  @Input() userId?: string;

  openEdit: boolean = false;
  openEditWindow() {
    this.openEdit = true;
  }
  closeEditWindow() {
    this.openEdit = false;
  }
}
