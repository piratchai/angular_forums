import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Common } from 'src/app/common/common';
import { Constants } from 'src/app/constants/Constants';
import { ForumModel } from 'src/app/models/forum/forumModel';
import { ForumsService } from 'src/app/services/forums/forums.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [MessageService]
})
export class ForumComponent implements OnInit {

  static routeName = "forum-component";

  public formModel = {
    subject: '',
    description: ''
  };

  public forumModel: ForumModel;

  private params = {
    mode: '',
    uuid: null
  }

  constructor(
    private messageService: MessageService,
    private activeRoute: ActivatedRoute,
    private forumService: ForumsService,
    private ngxService: NgxUiLoaderService) { }

  saveForum(){
    if(Common.IsHasElementStrEmptyInObj(this.formModel, ['description'])){ 
      this.showPopup(Constants.SeverityMsg.Warn, Constants.SummaryMsg.WaringTH, Constants.DetailMsg.EnterFieldsTH);
      return
    };

    this.ngxService.start();
    debugger

    if(this.params.mode == Constants.ScreenMode.New){ // New Forum
      // -- set data to save -- //
      this.forumModel = new ForumModel();
      this.forumModel.subject = this.formModel.subject;
      this.forumModel.description = this.formModel.description;

      this.forumService.addForum(this.forumModel).then(r => {
        this.ngxService.stop();
        this.showPopup(Constants.SeverityMsg.Success, Constants.SummaryMsg.InfoTH, Constants.DetailMsg.AddDataSuccessTH);

        setTimeout(function(){
          window.close();
        }, 1000)
      })
      .catch(e => {
        this.ngxService.stop();
        this.showPopup(Constants.SeverityMsg.error, Constants.SummaryMsg.ErrorTH, Constants.DetailMsg.AddDataFailedTH);
      })
    }
    else if (this.params.mode == Constants.ScreenMode.Edit){
      this.forumModel.subject = this.formModel.subject;
      this.forumModel.description = this.formModel.description;

      this.forumService.updateForum(this.forumModel).then(r => {
        this.ngxService.stop();
        this.showPopup(Constants.SeverityMsg.Success, Constants.SummaryMsg.InfoTH, Constants.DetailMsg.EditDataSuccessTH);

        setTimeout(function(){
          window.close();
        }, 1000)
      })
      .catch(e => {
        this.ngxService.stop();
        this.showPopup(Constants.SeverityMsg.error, Constants.SummaryMsg.ErrorTH, Constants.DetailMsg.EditDataFailedTH);
      })
    }

    
  }

  ngOnInit(): void {
    this.ngxService.start();

    this.activeRoute.params.subscribe(p => {
      this.params.mode = p['mode'];
      this.params.uuid = Common.setUUIDValue(p['uuid']);
      this.loadData();
    })
  }

  showPopup(severity = "", summary = "", detail = ""){
    var objMsg = { severity: severity, summary: summary, detail: detail };
    this.messageService.clear();
    this.messageService.add(objMsg);
  }

  loadData(){
    if(this.params.mode == Constants.ScreenMode.New){ // new Mode
      // -- 
      this.ngxService.stop();
    }
    else if (this.params.mode == Constants.ScreenMode.Edit){ // edit mode
      this.forumService.getForum(this.params.uuid).subscribe(r => {
        this.forumModel = r.data() as ForumModel

        // -- set data to model -- //
        this.formModel.subject = this.forumModel.subject as string;
        this.formModel.description = this.forumModel.description as string;
        this.ngxService.stop();
      })
    }
  }

  clearForm(){
    this.formModel.subject = '';
    this.formModel.description = '';
  }

}
