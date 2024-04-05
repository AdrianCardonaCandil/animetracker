import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  numberOfPages = input(5);
  currentPage: number;
  constructor(private route:ActivatedRoute){
    this.currentPage = Number(this.route.snapshot.paramMap.get('page'));
    this.route.params.subscribe(params => this.currentPage = params['page']);
  }
}
