import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaininfoComponent } from './maininfo/maininfo.component';
import { SideinfoComponent } from './sideinfo/sideinfo.component';
import { ContentnavComponent } from './contentnav/contentnav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaininfoComponent, SideinfoComponent, ContentnavComponent, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  imageSource = input("../../assets/images/frieren.jpg");
}
