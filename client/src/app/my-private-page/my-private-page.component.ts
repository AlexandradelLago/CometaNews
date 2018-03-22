import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { ProfileService } from "../services/profile.service";
import {ApisService} from "../services/apis.service";

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  username: string = "";
  email: string = "";
  quote: string = "";
  newsSelector:string="";
  horoscope:string="";
  profile:Object={};
  sign:string="virgo";
  category:string="";
  news = {};
  newsSourceLC= {};
  newsHCC= {};
  newsHS= {};
  newsSearch={};
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
          console.log(this.profile);
          this.apiS.getQuote(profile.quote)
          .subscribe(quote =>{
              this.quote=quote.contents.quotes[0].quote;  
          });

          this.apiS.getHoroscope(profile.sign)
          .subscribe(h =>{
            this.horoscope=h.horoscope;
            
          });


              // headlines country category-HECHO
        this.apiS.getHeadlinesCountryCategory(profile.news)
        .subscribe(news =>{
          this.newsHCC=news;
          console.log("8=======D")
          console.log(this.newsHCC);
        });

        // HACER BUSCADOR
       
       

        // HECHP
        this.apiS.getHeadlinesSources(profile.news)
        .subscribe(news =>{
          this.newsHS=news;
          console.log(this.newsHS)
        });


       // sources language country-ME FALTAAA
        this.apiS.getSourcesLanguageCategory(profile.news)
        .subscribe(news =>{
          this.newsSourceLC=news;
          console.log("TENGO QUE VER AQUI!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          console.log(this.newsSourceLC)
        });

    

      });
  });
}

searchApi(prueba){
  this.apiS.searchNew(prueba)
  .subscribe(news=>{
    this.newsSearch=news;
    console.log(this.newsSearch);
  })
}

selectHCC(){
  console.log(this.profile);
   this.newsSelector="HCC";
 }

 search(){
  this.newsSelector="search";
}

  selectHS(){
    this.newsSelector="HS";
  }

  selectSLC(){
    this.newsSelector=="SLC";
  }



}

