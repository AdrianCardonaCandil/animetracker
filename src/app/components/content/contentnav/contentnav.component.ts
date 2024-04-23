import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contentnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contentnav.component.html',
  styleUrl: './contentnav.component.css'
})
export class ContentnavComponent {

}
