import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Common } from 'src/app/common/common';
import { Constants } from 'src/app/constants/Constants';
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
  public cols: any[];

  constructor(private forumService: ForumsService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();

    this.forumService.getAllForums().subscribe(r => {
      Common.convertTimestampToDateTime(r, Constants.dateFormat.ddMMyyyyHHmmsssSperateBySlash);
      this.forums = r
      this.ngxService.stop();
    });

    this.cols =  [
      { field: 'subject', header: 'Subject' },
      { field: 'description', header: 'Description' },
      { field: 'update_timeStr', header: 'Update On' },
      { field: 'category_id', header: 'Category' }
    ]
  }

  newForum(): void{
    console.log('New forum.');
  }

}
