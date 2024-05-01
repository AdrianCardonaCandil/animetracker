import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Input() userNotLogged!: boolean;
  @Output() mobileSignUpClicked = new EventEmitter();
  @Output() mobileSignInClicked = new EventEmitter();
  showSignIn() {
    this.mobileSignInClicked.emit()
  }

  showSignUp() {
    this.mobileSignUpClicked.emit()
  }
}
