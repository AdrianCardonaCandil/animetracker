import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent {
  @Input() username!: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  isRouteActive(route: string): boolean {
    return this.router.url.endsWith(route);
  }
}
