import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { link } from 'fs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Common } from 'src/app/common/common';
import { Constants } from 'src/app/constants/Constants';
import { ForumModel } from 'src/app/models/forum/forumModel';
import { ForumsService } from 'src/app/services/forums/forums.service';
import { ForumComponent } from '../forum/forum.component';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  static routeName = "forums-component";

  public forums: Array<ForumModel>;
  //public cols: any[];
  public updateTimeDateFormat = Constants.dateFormat.ddMMyyyyHHmmsssSperateBySlash

  constructor(private forumService: ForumsService,
    private ngxService: NgxUiLoaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();

    this.forumService.getAllForums().subscribe(r => {
      Common.convertTimestampToDateTime(r, Constants.dateFormat.ddMMyyyyHHmmsssSperateBySlash);
      this.forums = r
      this.ngxService.stop();
    });

    // this.cols =  [
    //   { field: 'subject', header: 'Subject' },
    //   { field: 'description', header: 'Description' },
    //   { field: 'update_timeStr', header: 'Update On' },
    //   { field: 'category_id', header: 'Category' }
    // ]
  }

  newForum(): void{
    //console.log('New forum.');
    // this.router.navigate(['/'+ ForumComponent.routeName, { mode: 'new', uuid: null}])
    // this.router.navigate(['/'+ ForumComponent.routeName, 'new', ''])
    //   .then(r => {
    //     debugger
    //     window.open('','_blank');
    //   });
    var commandUrl = ForumComponent.routeName
      +'/'+ 
          Constants.ScreenMode.New // mode
      +'/'+
          Constants.constantValues.defaultUUID // uuid;
    const url = this.router.serializeUrl(this.router.createUrlTree([ commandUrl
    ]))
    window.open(url, '_blank');
  }

  edit(uuid){
    var commandUrl = ForumComponent.routeName
      +'/'+ 
          Constants.ScreenMode.Edit // mode
      +'/'+
      uuid // uuid;
    const url = this.router.serializeUrl(this.router.createUrlTree([ commandUrl
    ]))
    window.open(url, '_blank');
    console.log('Edit : ' + uuid);
  }

  delete(uuid){
    console.log('Delete : ' + uuid);
  }

}
