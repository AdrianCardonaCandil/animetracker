import { Component, OnInit } from '@angular/core';
import { MaininfoComponent } from './maininfo/maininfo.component';
import { SideinfoComponent } from './sideinfo/sideinfo.component';
import { ContentnavComponent } from './contentnav/contentnav.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ContentsService } from '../../services/contents.service';
import { Content } from '../../schemas/Content.scheme';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaininfoComponent, SideinfoComponent, ContentnavComponent, RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{

  contentService:ContentsService;
  route:ActivatedRoute;
  // Content definition and fallback
  content:Content = {title:'Not Defined', id:0, score:0, season:'Not Defined', duration:'Not Defined', episodes:0, source:'', genres:[], studios:[], synopsis:'', type:'', year:0, status:'', coverimage:'assets/images/frieren.jpg', backgroundimage:'assets/images/frieren.jpg', rating:''};

  constructor(contentService:ContentsService, route:ActivatedRoute){
    this.contentService = contentService;
    this.route = route;
  }

  ngOnInit(){
   this.contentService.findById(Number(this.route.snapshot.paramMap.get('id'))).then(content => content ? this.content = content : null).then(content => console.log(content));
  }
}
