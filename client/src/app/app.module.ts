import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//toastr
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// upload files
import { FileUploadModule } from "ng2-file-upload";

// Servicios
import { SessionService } from "./services/session.service";
import { ApisService } from "./services/apis.service";
import { ProfileService } from "./services/profile.service";

//materialize
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

// my components
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { MyPrivatePageComponent } from './my-private-page/my-private-page.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { NavPrivateComponent } from './nav-private/nav-private.component';


import { routes } from './routes/app.routing'
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NewProfileComponent } from './new-profile/new-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    MyPrivatePageComponent,
    HomeComponent,
    MyProfileComponent,
    NavHomeComponent,
    NavPrivateComponent,
    FooterComponent,
    NewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterializeModule,
    FileUploadModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [SessionService,ApisService,ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
