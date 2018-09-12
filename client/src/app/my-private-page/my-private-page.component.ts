import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { ProfileService } from "../services/profile.service";
import {ApisService} from "../services/apis.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  profile:Object={news:{category:"",sources:[],country:"",language:""},sign:"",quote:""}
  username: string = "";
  email: string = "";
  quote: string = "";
  newsSelector:string="";
  horoscope:string="";
  new:any={title:"",source:{name:""},description:""};
  sign:string="virgo";
  category:string="";
  news = {};
  newsHCC= {};
  newsHS= {};
  newsSearch={};
  newsSLC={};
  sources=[];
  prueba:string='';
  constructor(private session: SessionService, private apiS : ApisService, private profileS: ProfileService) { }

  ngOnInit() {
    
    this.session.loggedIn()
      .subscribe(user => {
        this.email= user.email;
        this.username = user.username;

        this.profileS.get(user._id)
        .subscribe(profile => {
          this.profile= profile;
          this.apiS.getQuote(profile.quote)
          .subscribe(quote =>{
              this.quote=quote.contents.quotes[0].quote;  
          });

          this.apiS.getHoroscope(profile.sign)
          .subscribe(h =>{
            this.horoscope=h.horoscope;
            
          });

// get HCC
        this.apiS.getHeadlinesCountryCategory(profile.news)
        .subscribe(news =>{
          this.newsHCC=news;
          console.log("1 8=======D")
          console.log(this.newsHCC);
        });

        // get HS
        this.apiS.getHeadlinesSources(profile.news)
        .subscribe(news =>{
          this.newsHS=news;
          console.log("3 8=======D")
          console.log(this.newsHS)
        });

       // get SLC
        this.apiS.getSourcesLanguageCategory(profile.news)
        .subscribe(news =>{
          this.newsSLC=news;
          console.log("4 8=======D")
          console.log(this.newsSLC)
        });

      });
  });
}



 searchApi(){
   this.apiS.searchNew(this.prueba)
   .subscribe(news=>{
     this.newsSearch=news;
   });
 };


  selectHCC(){
 
    if ( $('#HCC').css("display")=="block"){
      $('#HCC').css("display","none");
    }else{
      $('#HCC').css("display","block");
      $('#HS').css("display","none");
      $('#searchWord').css("display","none");
      $('#SLC').css("display","none");
    }
   }
  
   search(){
    if ( $('#searchWord').css("display")=="block"){
      $('#searchWord').css("display","none");
    }else{
      $('#searchWord').css("display","block");
      $('#HS').css("display","none");
      $('#SLC').css("display","none");
      $('#HCC').css("display","none");
    }
  }
  
    selectHS(){
      if ( $('#HS').css("display")=="block"){
        $('#HS').css("display","none");
      }else{
        $('#HS').css("display","block");
        $('#SLC').css("display","none");
        $('#searchWord').css("display","none");
        $('#HCC').css("display","none");
      }
    }
  
    selectSLC(){
   
      if ( $('#SLC').css("display")=="block"){
        $('#SLC').css("display","none");
      }else{
        $('#SLC').css("display","block");
        $('#HS').css("display","none");
        $('#searchWord').css("display","none");
        $('#HCC').css("display","none");
      }
    }



}

