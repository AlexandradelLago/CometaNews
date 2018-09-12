import { Component, OnInit } from '@angular/core';
import categories from '../apiselectors/quoteCategories'
import {ProfileService} from '../services/profile.service'
import {SessionService} from '../services/session.service'
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import zodiac from '../apiselectors/zodiac'
import news from '../apiselectors/news'


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  uploader= new FileUploader({
    
  });
user:any;
quotesCategory:any=[];
  constructor( private sessionS: SessionService,private profileS:ProfileService, private route:Router) { }

  ngOnInit() {
    this.sessionS.loggedIn()
    .subscribe(user => {
      this.user = user._id;
      this.uploader.options.url = `http://localhost:3000/profile/${this.user}/addimg`;
    });

    // this.profileS.get()
  }


}



