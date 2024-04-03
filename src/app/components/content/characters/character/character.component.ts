import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  name = input('Name');
  description = input('Lorem ipsum dolor sit amet,\
  consectetur adipiscing elit. Donec ligula libero,\
  dignissim eu erat id, bibendum molestie nisl. In\
  facilisis, ante non rhoncus dignissim, nisi eros\
  lobortis elit, a laoreet sapien eros et nunc.');
  imageSource = input('../../../../assets/images/frieren.jpg');
  displayName = true;

  changeDisplay(){
    this.displayName=!this.displayName;
  }
}
