import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Router} from "@angular/router"

@Component({
  selector: 'app-normal-row',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './normal-row.component.html',
  styleUrl: './normal-row.component.css'
})
export class NormalRowComponent{
  @Input() rowTitle?: string = "text";
  @Input() rowUserScore?: number = 0
  @Input() rowContentScore?: number = 0;
  @Input() rowType?: string = "text";
  @Input() rowGenre?: string[] ;
  @Input() rowYear?: number= 0;
  @Input() rowContentCover?: string = "text";
  @Input() isDropped?: boolean = false;
  @Input() rowContentId?: string = "1111";

}
