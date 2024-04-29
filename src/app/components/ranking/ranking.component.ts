import { Component, OnInit } from '@angular/core';
import { RankheaderComponent } from './rankheader/rankheader.component';
import { RankpositionComponent } from './rankposition/rankposition.component';
import { ContentsService } from '../../services/contents.service';
import { Content } from '../../schemas/Content.scheme';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RankheaderComponent, RankpositionComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  rankingPositions:Content[] = []

  contentsService:ContentsService;
  constructor(contentsService:ContentsService) {
    this.contentsService = contentsService;
  }
  ngOnInit(): void {
    this.contentsService.find([], {orderBy: {field: 'score', order: 'desc'}, limit:50}).then(contents => {
      this.rankingPositions = <Content[]>contents;
    })
  }
}
