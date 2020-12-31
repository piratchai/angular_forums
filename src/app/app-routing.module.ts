import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '',   redirectTo: '/' + LoginComponent.routeName, pathMatch: 'full' }, // redirect to `login-component`
  { path: LoginComponent.routeName, component: LoginComponent },
  { path: AboutComponent.routeName, component: AboutComponent },
  { path: RegisterComponent.routeName, component: RegisterComponent },
  { path: ForumsComponent.routeName , component: ForumsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
