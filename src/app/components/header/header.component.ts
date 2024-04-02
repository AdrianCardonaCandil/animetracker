import { ChangeDetectionStrategy, Component, EventEmitter, Output, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // isUser input -> display header depeding on userRegistration
  isUser = input(false, {
    transform:booleanAttribute
  });
  // isUser event -> inform the app about userRegistration
  @Output() isUserChange = new EventEmitter<boolean>();

  // logo source
  logo_src = "../../assets/logo.webp";
}
