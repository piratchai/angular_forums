import { Component, OnInit } from '@angular/core';
import { ForumModel } from 'src/app/models/forum/forumModel';
import { ForumsService } from 'src/app/services/forums/forums.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  static routeName = "forums-component";

  public forums: Array<ForumModel>;

  constructor(private forumService: ForumsService) { }

  ngOnInit(): void {
    this.forumService.getAllForums().subscribe(r => this.forums = r);
  }

  newForum(): void{
    console.log('New forum.');
  }

}
