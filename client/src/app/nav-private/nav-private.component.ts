import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-private',
  templateUrl: './nav-private.component.html',
  styleUrls: ['./nav-private.component.css']
})
export class NavPrivateComponent implements OnInit {

  constructor( private sessionS : SessionService, private route : Router) { }

  ngOnInit() {
  }
  logout(){
    this.sessionS.logout()
    .subscribe(res => this.route.navigate([""]))
  }

  editProfile(){
    this.sessionS.loggedIn()
      .subscribe((session)=> this.route.navigate([`profile/${session._id}`]))
  }
}

