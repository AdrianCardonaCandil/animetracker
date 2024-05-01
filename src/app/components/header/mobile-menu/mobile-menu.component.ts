import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Input() userNotLogged!: boolean;
  @Output() mobileSignUpClicked = new EventEmitter();
  @Output() mobileSignInClicked = new EventEmitter();
  @Output() mobileSignOutClicked = new EventEmitter();
  @Input() username!: string | undefined;
  showSignIn() {
    this.mobileSignInClicked.emit()
  }

  showSignUp() {
    this.mobileSignUpClicked.emit()
  }

  logOut() {
    this.mobileSignOutClicked.emit()
  }
}
