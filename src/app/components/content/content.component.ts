import { Component, OnInit } from '@angular/core';
import { MaininfoComponent } from './maininfo/maininfo.component';
import { SideinfoComponent } from './sideinfo/sideinfo.component';
import { ContentnavComponent } from './contentnav/contentnav.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ContentsService } from '../../services/contents.service';
import { Content } from '../../schemas/Content.scheme';
import {AuthService} from "../../services/auth/auth.service";
import User from "../../schemas/User.scheme";
import {Observable} from "rxjs";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaininfoComponent, SideinfoComponent, ContentnavComponent, RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{

  id?: string
  userId?: string;
  loggedInUser: Observable<User | null>

  contentService:ContentsService;
  route:ActivatedRoute;
  // Content definition and fallback
  content:Content = {title:'Not Defined', id:0, score:0, season:'Not Defined', duration:'Not Defined', episodes:0, source:'', genres:[], studios:[], synopsis:'', type:'', year:0, status:'', coverimage:'assets/images/frieren.jpg', backgroundimage:'assets/images/frieren.jpg', rating:'', likes:0};

  constructor(contentService:ContentsService, route:ActivatedRoute, private authService: AuthService,){
    this.contentService = contentService;
    this.route = route;
    this.loggedInUser = this.authService.user
  }

  ngOnInit(){
    this.contentService.findById(Number(this.route.snapshot.paramMap.get('id')))
      .then(content => {
        if (content) {
          this.content = content;
          this.id = String(this.content.id);
        }
      });
   this.authService.user.subscribe((user: User | null) => {
      this.userId = user?.id;
    });

  }

  onLikesChanged(likes: number) {
    this.content.likes = likes;
  }
  protected readonly String = String;
}
