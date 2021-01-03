import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { AboutComponent } from './pages/about/about.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';

// -- NgxUiLoader Module -- //
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { ForumComponent } from './pages/forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForumsComponent,
    AboutComponent,
    ForumComponent
  ],
  imports: [
    // -- Angular Module -- //
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // -- AngularFire Module -- //
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    // -- PrimeNG Module -- //
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    EditorModule,

    NgxUiLoaderModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
