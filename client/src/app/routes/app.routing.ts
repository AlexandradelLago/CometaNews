import { Routes } from '@angular/router'

import { AppComponent } from '../app.component';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthSignupComponent } from '../auth-signup/auth-signup.component';
import { MyPrivatePageComponent } from '../my-private-page/my-private-page.component';;
import { HomeComponent } from '../home/home.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { NavHomeComponent } from '../nav-home/nav-home.component';
import { NavPrivateComponent } from '../nav-private/nav-private.component';
import { NewProfileComponent } from '../new-profile/new-profile.component';


export const routes:Routes = [
    {path:"", component:HomeComponent},
    {path:"login" , component:AuthLoginComponent},
    {path:"signup" , component:AuthSignupComponent},
    {path:"private", component:MyPrivatePageComponent},
    {path:"profile", component:MyProfileComponent},
    {path:"profile/:id", component:NewProfileComponent},

]


