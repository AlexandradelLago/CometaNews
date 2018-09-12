import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  email;username;password;
  constructor(private sessionS : SessionService, private router : Router) { }

  ngOnInit() {


  }
  sendSignupForm(myForm){
    this.sessionS.signup(myForm.value)
      .subscribe((session)=> this.router.navigate([`profile/${session._id}`]))
  }
}
