import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Common } from 'src/app/common/common';
import { Constants } from 'src/app/constants/Constants';
import { UserModel } from 'src/app/models/user/userModel';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  static routeName = "register-component";

  public formModel= {
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    phone: '',
    address: ''
  }

  constructor(private registerService: RegisterService, private messageService: MessageService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  register(){

    this.ngxService.start();

    if(Common.IsHasElementStrEmptyInObj(this.formModel, ['phone', 'address'])) {
      this.showPopup(Constants.SeverityMsg.Warn, Constants.SummaryMsg.WaringTH, Constants.DetailMsg.EnterFieldsTH);
      this.ngxService.stop();
      return;
    } 
      

    if(this.ValidPassword()) {
      this.showPopup(Constants.SeverityMsg.Warn, Constants.SummaryMsg.WaringTH, Constants.DetailMsg.PasswordDoNotMatchTH);
      this.ngxService.stop();
      return
    };

    this.registerService.getAllUser().subscribe(userData => {
      console.log(userData);

      var userLst: Array<UserModel>;
      userLst = userData;
      var user = new UserModel;

      user.firstname = this.formModel.firstname;
      user.lastname = this.formModel.lastname;
      user.username = this.formModel.username;
      user.password = this.formModel.password;
      user.phone = this.formModel.phone;
      user.address = this.formModel.address;

      if(this.isDuplicateUsername(user, userLst)){
        this.ngxService.stop();
        return;
      };

      this.registerService.addUser(user).then(r => {
        // show popup success //
        //console.log('add user successfully.');

        this.ngxService.stop();

        this.showPopup(Constants.SeverityMsg.Success, Constants.SummaryMsg.InfoTH, Constants.DetailMsg.AddDataSuccessTH)
        this.clearFormFields();
      })
      .catch(e => {
        // show popup failed //
        //console.log('add user failed.')

        this.ngxService.stop();
        
        this.showPopup(Constants.SeverityMsg.error, Constants.SummaryMsg.ErrorTH, Constants.DetailMsg.AddDataFailedTH)
      })

      //console.log('not duplicate!!')
    })


    //console.log('Registered.');
  }

  //#region Private Function
  private ValidPassword(){
    if(this.formModel.password !== this.formModel.confirmPassword){
      return true;
    }

    return false;
  }

  private isDuplicateUsername(user: UserModel, userLst: Array<UserModel>){
    for(var i = 0; i < userLst.length; i++){
      if(userLst[i].username == user.username){
        return true;
      }
    }

    return false;
  }

  private clearFormFields(){
    this.formModel.address = '';
    this.formModel.username = '';
    this.formModel.firstname = '';
    this.formModel.lastname = '';
    this.formModel.phone = '';
    this.formModel.password = '';
    this.formModel.confirmPassword = '';
  }

  private showPopup(severity = "", summary = "", detail = ""){
    var objMsg = { severity: severity, summary: summary, detail: detail };
    this.messageService.clear();
    this.messageService.add(objMsg);
  }

  //#endregion
}
