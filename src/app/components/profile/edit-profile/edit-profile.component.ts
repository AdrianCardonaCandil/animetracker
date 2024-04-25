import { Component } from '@angular/core';
import {UserInfoComponent} from "../user-info/user-info.component";
import {TableComponent} from "../table/table.component";
import {ProfileNavComponent} from "../profile-nav/profile-nav.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    UserInfoComponent,
    TableComponent,
    ProfileNavComponent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
