import { Component } from '@angular/core';

@Component({
  selector: 'app-rankheader',
  standalone: true,
  imports: [],
  templateUrl: './rankheader.component.html',
  styleUrl: './rankheader.component.css'
})
export class RankheaderComponent {
  column_names = ['Position', 'Name', 'Score', 'Status'];
}
