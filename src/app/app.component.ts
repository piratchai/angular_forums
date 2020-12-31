import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
import { AboutComponent } from './pages/about/about.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  //title = 'forums-primeng';

  public items: MenuItem[];

  constructor(
    //private firestore: AngularFirestore
    ){

    // var userCollection = this.firestore.collection('/users').valueChanges();

    // userCollection.subscribe(u => console.log(u));

  }

  ngOnInit(){
    this.items = [
      {
        label: 'Sign In',
        icon:'pi pi-user',
        routerLink: ['/' + LoginComponent.routeName]
      },
      {
        label: 'Sign Up',
        icon:'pi pi-sign-in',
        routerLink: ['/' + RegisterComponent.routeName]
      },
      {
        label: 'About',
        icon:'pi pi-info-circle',
        routerLink: ['/' + AboutComponent.routeName]
      },
      {
        label: 'Forums',
        icon:'pi pi-align-justify',
        routerLink: [ '/' + ForumsComponent.routeName]
      },
    ]
  }
}
