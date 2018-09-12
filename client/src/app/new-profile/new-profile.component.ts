import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
//importo los valores de seleccion de mis apis
import categories from '../apiselectors/quoteCategories'
import zodiac from '../apiselectors/zodiac'
import news from '../apiselectors/news'
import {ProfileService} from '../services/profile.service'
import {SessionService} from '../services/session.service'
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

//import $ from 'jquery';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  checkbox:Array<boolean>=[];
  
  news=news;

 
  languages:any=[];
  sources:any=[]
  uploadFile:boolean=false;
  step:number=1;
  show:boolean=false;
  header:string='';
  quotesCategory:Array<string>= categories;
  zodiacSign: Array<string>=zodiac;
  
  sourcesCounter=0;
  sourcesMax=3;
  selectedSources=[];
  sourcesCheckBOX=[
    {acronim:"abc-news",checked:false},
    {acronim:"the-new-york-times",checked:false},
    {acronim:"the-huffington-post",checked:false},
    {acronim:"the-washington-post",checked:false},
    {acronim:"fox-news",checked:false},
    {acronim:"bbc-news",checked:false},
    {acronim:"bleacher-report",checked:false},
    {acronim:"cbs-news",checked:false},
    {acronim:"daily-mail",checked:false},
    {acronim:"cnn",checked:false},
    {acronim:"cnn-es",checked:false},
    {acronim:"buzzfeed",checked:false},
    {acronim:"mashable",checked:false},
    {acronim:"mtv-news",checked:false},
    {acronim:"vice-news",checked:false},
    {acronim:"spiegel",checked:false},
    {acronim:"bbc-sport",checked:false},
    {acronim:"espn",checked:false},
    {acronim:"fox-sport",checked:false},
    {acronim:"marca",checked:false},
    {acronim:"nfl-news",checked:false},
    {acronim:"ign",checked:false},
    {acronim:"techradar",checked:false},
    {acronim:"business-insider",checked:false},
    {acronim:"the-wall-street-journal",checked:false},
    {acronim:"wired",checked:false},
    {acronim:"bloomberg",checked:false}
 ];
 uploader= new FileUploader({
    
});
  user: any;
  constructor( private sessionS: SessionService,private profileS:ProfileService, private route:Router) { }


  ngOnInit() {
  
    this.sessionS.loggedIn()
      .subscribe(user => {
        this.user = user._id;
        this.uploader.options.url = `http://localhost:3000/profile/${this.user}/addimg`;
      });
  }

toPrivate(){
 this.sessionS.loggedIn()
  .subscribe(user=>{
    this.route.navigate(['private'])
  })


}

  addNews(){
    this.show=true;
  }

  addNewstoProfile(){
    console.log("entro en addNews")
  }

  checkedSources(value){
    this.sourcesCheckBOX.forEach(s=>{
      if (s.acronim==value){
         if(s.checked==true){
            s.checked=false;
            this.sourcesCounter--;
            console.log("entre al click de deschecar algo"+this.sourcesCounter);
          }else if (s.checked==false&&this.sourcesCounter<this.sourcesMax){
            s.checked=true;
            this.sourcesCounter++;
            console.log("entre al click de checar algo"+this.sourcesCounter);
          }
      }
    });
  }

  submitFormNoFile(newFormNoFile){
    console.log(newFormNoFile.value);
    this.sourcesCheckBOX.forEach(e=>{
      if(e.checked){
        this.selectedSources.push(e.acronim);
      }
    })
    this.profileS.newProfileNoPic(newFormNoFile.value,this.selectedSources,this.user)
    .subscribe(res=>console.log("ESTOY AQUI"))
  }

uploadFileBoolean(){
  this.uploadFile=true;
}
updatePhoto(){
  this.uploader.queue[0].method="PATCH"
    console.log("voy a subir archivo")
    //form es un objeto interno de la instancia FileUploader
  this.uploader.uploadAll();
  this.uploader.onCompleteItem = () => this.route.navigate(['private']);
}
}
