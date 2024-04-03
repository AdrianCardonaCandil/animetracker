import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaininfoComponent } from './maininfo/maininfo.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaininfoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  imageSource = input("../../assets/images/frieren.jpg");
}
