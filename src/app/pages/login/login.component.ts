import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Common } from 'src/app/common/common';
import { Constants } from 'src/app/constants/Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  static routeName = "login-component";

  public formModel = {
    username: '',
    password: ''
  };

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login(){
    if(Common.IsHasElementStrEmptyInObj(this.formModel, [])){ 
      this.showPopup(Constants.SeverityMsg.Warn, Constants.SummaryMsg.WaringTH, Constants.DetailMsg.EnterFieldsTH);
      return
    };

    console.log('login')
  }

  showPopup(severity = "", summary = "", detail = ""){
    var objMsg = { severity: severity, summary: summary, detail: detail };
    this.messageService.clear();
    this.messageService.add(objMsg);
  }

}
